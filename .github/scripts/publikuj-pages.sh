#!/usr/bin/env bash
# Publikuje jeden priečinok webu na GitHub Pages do vetvy gh-pages.
#
#   publikuj-pages.sh <priečinok> <build>   nahradí <priečinok>/ obsahom adresára <build>
#   publikuj-pages.sh <priečinok>           zmaže <priečinok>/
#
# Každé spustenie prepíše aj koreň webu: index.html (presmerovanie na main/), 404.html a .nojekyll.
# Vetva má vždy jediný commit, aby história nerástla s každým nasadením. Push ide cez
# --force-with-lease voči commitu, z ktorého beh vyšiel, takže dve súbežné nasadenia sa
# neprepíšu: to pomalšie si vetvu stiahne znova a skúsi to ešte raz.
#
# Premenné prostredia: PAGES_BRANCH (predvolene gh-pages), PAGES_BASE_PATH (predvolene /<názov repa>/).
set -euo pipefail

priecinok=${1:?použitie: publikuj-pages.sh <priečinok> [build]}
build=${2:-}
vetva=${PAGES_BRANCH:-gh-pages}
repo=${GITHUB_REPOSITORY:-$(basename "$(git rev-parse --show-toplevel)")}
base_path=${PAGES_BASE_PATH:-/${repo#*/}/}
sablony=$(cd "$(dirname "${BASH_SOURCE[0]}")/../pages" && pwd)

if [[ ! $priecinok =~ ^[A-Za-z0-9][A-Za-z0-9._-]*$ ]]; then
  echo "Neplatný názov priečinka: $priecinok" >&2
  exit 1
fi
if [[ -n $build ]]; then
  build=$(cd "$build" && pwd)
  akcia="Publikuj $priecinok"
else
  akcia="Zmaž $priecinok"
fi

export GIT_AUTHOR_NAME="github-actions[bot]" GIT_COMMITTER_NAME="github-actions[bot]"
export GIT_AUTHOR_EMAIL="41898282+github-actions[bot]@users.noreply.github.com"
export GIT_COMMITTER_EMAIL=$GIT_AUTHOR_EMAIL

web=$(mktemp -d)
zmaz_web() {
  git worktree remove --force "$web" >/dev/null 2>&1 || true
  rm -rf "$web"
}
trap zmaz_web EXIT

for pokus in 1 2 3 4 5 6; do
  zmaz_web
  if git fetch --quiet --depth=1 origin "+refs/heads/$vetva:refs/remotes/origin/$vetva" 2>/dev/null; then
    zaklad=$(git rev-parse "refs/remotes/origin/$vetva")
    git worktree add --quiet --detach "$web" "$zaklad"
  else
    zaklad=""
    git worktree add --quiet --detach "$web"
    git -C "$web" rm -rq --cached . >/dev/null
    git -C "$web" clean -fdxq
  fi

  rm -rf "${web:?}/$priecinok"
  if [[ -n $build ]]; then
    mkdir -p "$web/$priecinok"
    cp -R "$build/." "$web/$priecinok/"
  fi
  cp "$sablony/index.html" "$web/index.html"
  sed "s|__BASE_PATH__|$base_path|g" "$sablony/404.html" > "$web/404.html"
  touch "$web/.nojekyll"

  git -C "$web" add -A
  strom=$(git -C "$web" write-tree)
  if [[ -n $zaklad && $strom == "$(git rev-parse "$zaklad^{tree}")" ]]; then
    echo "$akcia: bez zmeny."
    exit 0
  fi
  commit=$(git -C "$web" commit-tree "$strom" -m "$akcia")
  if git push --quiet --force-with-lease="refs/heads/$vetva:$zaklad" origin "$commit:refs/heads/$vetva"; then
    echo "$akcia: pushnuté do $vetva."
    exit 0
  fi
  echo "$akcia: $vetva sa medzitým zmenila (pokus $pokus), skúšam znova." >&2
  sleep $((pokus * 2))
done

echo "$akcia: vzdávam to po opakovaných konfliktoch na $vetva." >&2
exit 1

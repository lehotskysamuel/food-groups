/// <reference types="vite/client" />
/**
 * Webové zobrazenie stromu potravín. Číta priamo src/data/strom.ts. Druhá stránka, plánovač jedál
 * (#planovac), je v planovac.ts.
 *
 * Dev server (npm run dev) beží v edit móde: klik na štítok dostupnosti ho posunie
 * (bežné → menej bežné → exotické → bežné) a zapíše zmenu do src/data/strom.ts. Build (npm run build) je len na prezeranie.
 */
import { subory } from "../src/data/plany";
import { strom } from "../src/data/strom";
import { DOSTUPNOST, DOSTUPNOSTI, UROVNE, ZNACKY } from "../src/strom.types";
import { dalsia } from "../src/uprava";
import type { List, Strom } from "../src/strom.types";
import { Kruh } from "./kruh";
import { Planovac } from "./planovac";
import { DRUH, PREDVOLENA_DOST, RISE, SEP, TRIEDA, el, norm, nulovePocty, pocetEl, postav, prepinajDostupnosti, sklon, sucet, vsetky, znacka, zobraz } from "./spolocne";
import type { Nastavenia, Uzol, VUzol } from "./spolocne";

type Pohlad = "strom" | "kruh";

let koren: readonly Uzol[] = postav(strom as unknown as Strom);

const EDIT = import.meta.env.DEV;

// ---------- stav ----------

const nast: Nastavenia = { dost: new Set(PREDVOLENA_DOST), q: "", detail: false };
/** Zbalené uzly. Predvolene je celý strom rozbalený. */
let zbalene = new Set<string>();
/** Počas hľadania sa používa samostatná množina, výsledky sú rozbalené. */
let zbaleneHladanie = new Set<string>();

const aktivneZbalene = (): Set<string> => (nast.q ? zbaleneHladanie : zbalene);

function vnutorne(hranica: number): Set<string> {
  const s = new Set<string>();
  for (const u of vsetky(koren)) if (!u.dostupnost && u.uroven >= hranica) s.add(u.id);
  return s;
}

// ---------- DOM ----------

const $ = <T extends HTMLElement>(sel: string): T => document.querySelector(sel) as T;

const stromEl = $<HTMLDivElement>("#strom");
const infoEl = $<HTMLParagraphElement>("#info");
const kruh = new Kruh($<HTMLDivElement>("#diagram"));
/** Strom alebo kruhový diagram; kruh si pamätá adresa (#kruh). */
let rezim: Pohlad = "strom";

function nazovEl(u: Uzol, zhoda: boolean): HTMLElement {
  const s = el("span", "nazov");
  if (u.znacka) {
    const { znak, pozn } = znacka(u);
    s.append(el("span", u.nazov === ZNACKY.TBD ? "chip tbd" : "znak", znak), el("span", "pozn", pozn));
    return s;
  }
  const i = zhoda ? u.hladat.indexOf(nast.q) : -1;
  if (i >= 0 && u.hladat.length === u.nazov.length) {
    const m = el("mark", undefined, u.nazov.slice(i, i + nast.q.length));
    s.append(u.nazov.slice(0, i), m, u.nazov.slice(i + nast.q.length));
  } else if (zhoda) {
    s.append(el("mark", undefined, u.nazov));
  } else {
    s.textContent = u.nazov;
  }
  return s;
}

function dostupnostEl(id: string, d: List): HTMLElement {
  const chip = el(EDIT ? "button" : "span", `chip ${TRIEDA[d]}`, d);
  chip.title = DOSTUPNOST[d];
  if (chip instanceof HTMLButtonElement) {
    chip.type = "button";
    chip.dataset["id"] = id;
    chip.dataset["z"] = d;
    chip.title += ` – klik prepne na ${dalsia(d)} a zapíše to do src/data/strom.ts`;
  }
  return chip;
}

function uzolEl(v: VUzol, zb: Set<string>): HTMLElement {
  const { u } = v;
  if (u.dostupnost) {
    const row = el("div", "list");
    row.append(el("span", "bod"), nazovEl(u, v.zhoda));
    row.append(dostupnostEl(u.id, u.dostupnost));
    return row;
  }
  const d = el("details");
  d.dataset["id"] = u.id;
  d.open = !zb.has(u.id);
  if (u.znacka) d.classList.add("znacka-uzol");
  if (u.uroven === 0) d.classList.add(`risa-${Math.max(0, RISE.indexOf(u.nazov))}`);
  const s = el("summary");
  const vrch = v.retazec[0];
  const nazovUrovne = vrch ? `${UROVNE[vrch.uroven] ?? ""} – ${UROVNE[u.uroven] ?? ""}` : (UROVNE[u.uroven] ?? "");
  const uroven = el("span", "uroven", nazovUrovne);
  if (vrch) s.title = [...v.retazec, u].map((x) => `${x.nazov} (${UROVNE[x.uroven] ?? ""})`).join(" › ");
  s.append(el("span", "caret"), nazovEl(u, v.zhoda), uroven, pocetEl(v));
  const deti = el("div", "deti");
  const ciara = el("button", "ciara");
  ciara.type = "button";
  ciara.dataset["nazov"] = u.nazov;
  ciara.dataset["uroven"] = nazovUrovne;
  ciara.setAttribute("aria-label", `Prejsť na ${u.nazov}`);
  deti.append(ciara);
  for (const c of v.deti) deti.append(uzolEl(c, zb));
  d.append(s, deti);
  return d;
}

function vykresli(): void {
  const pohlad = koren.flatMap((u) => zobraz(u, nast));
  if (rezim === "kruh") {
    stromEl.replaceChildren();
    kruh.nastav(pohlad, koren);
  } else {
    const zb = aktivneZbalene();
    stromEl.replaceChildren(...pohlad.map((v) => uzolEl(v, zb)));
  }

  const spolu = pohlad.reduce((a, v) => a + sucet(v.pocty), 0);
  if (pohlad.length === 0) {
    infoEl.textContent = nast.q
      ? `Pre „${hladatEl.value.trim()}“ sa nenašla žiadna potravina ani taxón.`
      : "Žiadna potravina nezodpovedá filtru.";
  } else if (nast.q || nast.dost.size < DOSTUPNOSTI.length) {
    infoEl.textContent = `Zobrazených ${spolu} ${sklon(spolu)}.`;
  } else {
    infoEl.textContent = "";
  }
  infoEl.hidden = infoEl.textContent === "";
}

function statistiky(): void {
  const dl = $<HTMLDListElement>("#statistiky");
  const pocty = nulovePocty();
  let uzly = 0;
  for (const u of vsetky(koren)) {
    uzly++;
    if (u.dostupnost) pocty[u.dostupnost]++;
  }
  /** [názov, hodnota, CSS trieda] */
  const polozky: [string, string, string?][] = [
    ["potraviny", String(sucet(pocty))],
    ...DOSTUPNOSTI.map((d): [string, string, string] => [d, String(pocty[d]), TRIEDA[d]]),
    ["uzly stromu", uzly.toLocaleString("sk-SK")],
  ];
  koren.forEach((r, i) => {
    let n = 0;
    for (const u of vsetky([r])) if (u.dostupnost) n++;
    polozky.push([r.nazov, String(n), `risa risa-${Math.max(0, RISE.indexOf(r.nazov))}${i === 0 ? " prva-risa" : ""}`]);
  });
  dl.replaceChildren(
    ...polozky.map(([k, h, trieda]) => {
      const w = el("div", trieda);
      w.append(el("dt", undefined, k), el("dd", undefined, h));
      return w;
    }),
  );
}

// ---------- udalosti ----------

stromEl.addEventListener(
  "toggle",
  (e) => {
    const d = e.target;
    if (!(d instanceof HTMLDetailsElement) || !d.dataset["id"]) return;
    const s = aktivneZbalene();
    if (d.open) s.delete(d.dataset["id"]);
    else s.add(d.dataset["id"]);
  },
  true,
);

stromEl.addEventListener("click", (e) => {
  const s = (e.target as Element).closest("summary");
  if (!s || !(e.shiftKey || e.altKey)) return;
  e.preventDefault();
  const d = s.parentElement as HTMLDetailsElement;
  const open = !d.open;
  d.open = open;
  d.querySelectorAll("details").forEach((x) => (x.open = open));
});

// ---------- čiary: klik skočí na rodiča, hover ukáže jeho názov ----------

const nastrojeEl = $<HTMLDivElement>("#stranka-strom .nastroje");
const bublina = el("div", "bublina");
bublina.hidden = true;
bublina.setAttribute("role", "tooltip");
document.body.append(bublina);
const editPasik = (): number => document.querySelector<HTMLElement>(".edit-mod-pasik")?.offsetHeight ?? 0;
const bezPohybu = window.matchMedia("(prefers-reduced-motion: reduce)");

stromEl.addEventListener("click", (e) => {
  const c = (e.target as Element).closest<HTMLButtonElement>(".ciara");
  if (!c) return;
  const summary = c.parentElement?.previousElementSibling;
  if (!(summary instanceof HTMLElement)) return;
  const top = summary.getBoundingClientRect().top + window.scrollY - nastrojeEl.offsetHeight - editPasik() - 8;
  window.scrollTo({ top, behavior: bezPohybu.matches ? "auto" : "smooth" });
  summary.classList.remove("ciel");
  void summary.offsetWidth;
  summary.classList.add("ciel");
  bublina.hidden = true;
});

/** Čiara, pre ktorú používateľ bublinu zavrel cez Escape (znova sa ukáže až po opustení čiary). */
let zavretaPre: Element | null = null;

stromEl.addEventListener("mousemove", (e) => {
  const c = (e.target as Element).closest<HTMLButtonElement>(".ciara");
  if (c !== zavretaPre) zavretaPre = null;
  if (!c || c === zavretaPre) {
    bublina.hidden = true;
    return;
  }
  if (bublina.dataset["pre"] !== c.dataset["nazov"] + (c.dataset["uroven"] ?? "")) {
    bublina.dataset["pre"] = c.dataset["nazov"] + (c.dataset["uroven"] ?? "");
    bublina.replaceChildren(el("b", undefined, c.dataset["nazov"] ?? ""), el("span", undefined, c.dataset["uroven"] ?? ""));
  }
  bublina.hidden = false;
  const x = Math.min(e.clientX + 14, window.innerWidth - bublina.offsetWidth - 8);
  bublina.style.transform = `translate(${x}px, ${e.clientY + 14}px)`;
});
stromEl.addEventListener("mouseleave", () => (bublina.hidden = true));
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape" || bublina.hidden) return;
  bublina.hidden = true;
  zavretaPre = document.querySelector(".ciara:hover");
});
window.addEventListener("scroll", () => (bublina.hidden = true), { passive: true });

function nastavVsetky(open: boolean): void {
  const s = aktivneZbalene();
  if (open) {
    s.clear();
  } else {
    for (const u of vsetky(koren)) if (!u.dostupnost) s.add(u.id);
  }
  stromEl.querySelectorAll("details").forEach((x) => (x.open = open));
}

$<HTMLButtonElement>("#rozbalit-vsetko").addEventListener("click", () => nastavVsetky(true));
$<HTMLButtonElement>("#zbalit-vsetko").addEventListener("click", () => nastavVsetky(false));

const poEl = $<HTMLSelectElement>("#rozbalit-po");
const poVyzva = poEl.options[0] as HTMLOptionElement;
/** Jednoduchý pohľad nezobrazuje úrovne medzi druhom a potravinou, preto ich neponúka. */
function naplnUrovne(): void {
  poEl.replaceChildren(poVyzva);
  UROVNE.forEach((nazov, i) => {
    if (i === 0 || (!nast.detail && i > DRUH && nazov !== "potravina")) return;
    const o = el("option", undefined, nazov);
    o.value = String(i);
    poEl.append(o);
  });
}
poEl.addEventListener("change", () => {
  const hranica = Number(poEl.value);
  poEl.value = "";
  if (!hranica) return;
  if (nast.q) {
    hladatEl.value = "";
    nast.q = "";
  }
  zbalene = vnutorne(hranica);
  vykresli();
});

const hladatEl = $<HTMLInputElement>("#hladat");
let hladatCasovac = 0;
hladatEl.addEventListener("input", () => {
  clearTimeout(hladatCasovac);
  hladatCasovac = window.setTimeout(() => {
    nast.q = norm(hladatEl.value);
    zbaleneHladanie = new Set();
    vykresli();
  }, 120);
});
hladatEl.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && hladatEl.value) {
    hladatEl.value = "";
    nast.q = "";
    vykresli();
  }
});

prepinajDostupnosti($("#stranka-strom .dostupnosti"), nast.dost, (dost) => {
  nast.dost = dost;
  vykresli();
});

const detailEl = $<HTMLInputElement>("#detailny");
detailEl.addEventListener("change", () => {
  nast.detail = detailEl.checked;
  naplnUrovne();
  vykresli();
});

const strankaStrom = $<HTMLDivElement>("#stranka-strom");
const pohladTlacidla = strankaStrom.querySelectorAll<HTMLButtonElement>("[data-pohlad]");
/** Odkaz na stránku stromu v navigácii vracia do posledného režimu (strom alebo kruh). */
const odkazStrom = $<HTMLAnchorElement>('[data-stranka="strom"]');
/** Prepne strom / kruh: ukáže prvky s data-pre="<režim>" a skryje ostatné. */
function nastavRezim(r: Pohlad): void {
  rezim = r;
  pohladTlacidla.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset["pohlad"] === r)));
  strankaStrom.querySelectorAll<HTMLElement>("[data-pre]").forEach((e) => (e.hidden = e.dataset["pre"] !== r));
  bublina.hidden = true;
  odkazStrom.href = r === "kruh" ? "#kruh" : "#";
  if ((location.hash === "#kruh") !== (r === "kruh")) {
    history.replaceState(null, "", r === "kruh" ? "#kruh" : location.pathname + location.search);
  }
  vykresli();
}
pohladTlacidla.forEach((b) => b.addEventListener("click", () => nastavRezim((b.dataset["pohlad"] ?? "strom") as Pohlad)));

// ---------- stránky: strom potravín (#, #kruh) a plánovač jedál (#planovac/…) ----------

const strankaPlanovac = $<HTMLDivElement>("#stranka-planovac");
const planovac = new Planovac(strankaPlanovac, koren, subory);

const dekoduj = (s: string): string => {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
};

function trasa(): void {
  const casti = location.hash.slice(1).split("/");
  const plan = casti[0] === "planovac";
  strankaStrom.hidden = plan;
  strankaPlanovac.hidden = !plan;
  document.querySelectorAll<HTMLAnchorElement>("[data-stranka]").forEach((a) => {
    if ((a.dataset["stranka"] === "planovac") === plan) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  document.title = plan ? "Plánovač jedál" : "Strom potravín";
  // Edit mód (zápis dostupnosti) sa týka len stránky stromu.
  document.documentElement.classList.toggle("edit-mod", EDIT && !plan);
  const pasik = document.querySelector<HTMLElement>(".edit-mod-pasik");
  if (pasik) pasik.hidden = plan;
  bublina.hidden = true;
  if (plan) planovac.zobraz(casti.slice(1).filter(Boolean).map(dekoduj));
  else nastavRezim(casti[0] === "kruh" ? "kruh" : "strom");
}
window.addEventListener("hashchange", trasa);

// ---------- edit mód (len dev server) ----------

if (EDIT) {
  const pasik = el("div", "edit-mod-pasik");
  pasik.append(el("b", undefined, "EDIT MÓD"), el("span", undefined, "klik na štítok: bežné → menej bežné → exotické, zapíše sa do src/data/strom.ts"));
  document.body.prepend(pasik);
  document.documentElement.classList.add("edit-mod");

  stromEl.addEventListener("click", async (e) => {
    const chip = (e.target as Element).closest<HTMLButtonElement>("button.chip[data-id]");
    if (!chip || chip.disabled) return;
    const id = chip.dataset["id"] ?? "";
    const z = chip.dataset["z"] as List;
    chip.disabled = true;
    try {
      const odpoved = await fetch("/__edit/prepni", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cesta: id.split(SEP), z }),
      });
      const telo = (await odpoved.json()) as { dostupnost?: List; chyba?: string };
      if (!odpoved.ok || !telo.dostupnost) throw new Error(telo.chyba ?? `HTTP ${odpoved.status}`);
      // Kým nepríde HMR s novým stromom, ukáž novú hodnotu aspoň na štítku.
      const novy = dostupnostEl(id, telo.dostupnost);
      chip.replaceWith(novy);
      novy.focus();
    } catch (err) {
      chip.disabled = false;
      infoEl.textContent = `Zmenu sa nepodarilo zapísať: ${err instanceof Error ? err.message : String(err)}`;
      infoEl.hidden = false;
    }
  });

  // Po zmene src/data/strom.ts (klikom aj ručnou úpravou) sa strom prekreslí bez straty stavu.
  import.meta.hot?.accept("../src/data/strom", (m) => {
    if (!m) return;
    const fokus = document.activeElement instanceof HTMLElement ? document.activeElement.dataset["id"] : undefined;
    koren = postav((m as unknown as { strom: Strom }).strom);
    statistiky();
    vykresli();
    planovac.nastavKoren(koren);
    if (fokus) stromEl.querySelector<HTMLButtonElement>(`button.chip[data-id="${CSS.escape(fokus)}"]`)?.focus();
  });

  // Nový, upravený alebo zmazaný súbor jedla v src/data/plany sa v plánovači prejaví hneď.
  import.meta.hot?.accept("../src/data/plany", (m) => {
    if (m) planovac.nastavSubory((m as unknown as { subory: Readonly<Record<string, unknown>> }).subory);
  });
}

// ---------- štart ----------

detailEl.checked = nast.detail;
naplnUrovne();
statistiky();
trasa();

/**
 * Webové zobrazenie stromu potravín. Číta priamo src/data/strom.ts.
 */
import { strom } from "../src/data/strom";
import { DOSTUPNOST, UROVNE, ZNACKY } from "../src/strom.types";
import type { List, Strom } from "../src/strom.types";

type Dost = "vsetko" | List;

interface Uzol {
  readonly id: string;
  readonly nazov: string;
  /** 0 = ríša … 16 = potravina */
  readonly uroven: number;
  readonly deti: readonly Uzol[];
  readonly dostupnost: List | undefined;
  readonly znacka: boolean;
  readonly hladat: string;
}

/** Uzol v aktuálnom pohľade (po filtri a zlúčení značiek). */
interface VUzol {
  readonly u: Uzol;
  readonly deti: readonly VUzol[];
  readonly bezne: number;
  readonly exoticke: number;
  readonly zhoda: boolean;
  /** Predkovia zlúčení do tohto riadku (reťaz uzlov s jediným dieťaťom), od najvyššieho. */
  readonly retazec: readonly Uzol[];
}

interface Nastavenia {
  dost: Dost;
  q: string;
}

const SEP = "␟";
const ZNACKY_SET = new Set<string>(Object.values(ZNACKY));
const RISE = ["rastliny", "huby", "živočíchy"];

const norm = (s: string): string => s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().trim();

function postav(obj: { readonly [k: string]: unknown }, uroven: number, rodic: string): Uzol[] {
  return Object.entries(obj).map(([nazov, hodnota]) => {
    const id = rodic ? rodic + SEP + nazov : nazov;
    const list = typeof hodnota === "string";
    return {
      id,
      nazov,
      uroven,
      znacka: ZNACKY_SET.has(nazov),
      hladat: norm(nazov),
      dostupnost: list ? (hodnota as List) : undefined,
      deti: list ? [] : postav(hodnota as { readonly [k: string]: unknown }, uroven + 1, id),
    };
  });
}

const koren: readonly Uzol[] = postav(strom as unknown as Strom, 0, "");

function* vsetky(uzly: readonly Uzol[]): Generator<Uzol> {
  for (const u of uzly) {
    yield u;
    yield* vsetky(u.deti);
  }
}

// ---------- stav ----------

/** Index úrovne „druh“. Pod druhom sa zobrazujú priamo potraviny (listy). */
const DRUH = UROVNE.indexOf("druh");

const nast: Nastavenia = { dost: "vsetko", q: "" };
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

// ---------- pohľad (len prezentácia, dáta sa nemenia) ----------

/**
 * - uzly „-“ sa preskočia, ich potomkovia sa zobrazia o úroveň vyššie,
 * - pod druhom sa zobrazia priamo potraviny (varieta, kultivar a jedlá časť sa preskočia),
 * - druh „*“ sa preskočí, potraviny sa zobrazia priamo pod rodom,
 * - reťaz uzlov, kde každý má jediné dieťa, sa zlúči do jedného riadku s názvom najspodnejšieho
 *   (okrem ríše, tá zostáva vždy samostatne).
 */
function zobraz(u: Uzol, pokryte: boolean, ploche: boolean): VUzol[] {
  const zhoda = nast.q !== "" && u.hladat.includes(nast.q);
  const pok = pokryte || zhoda || nast.q === "";
  if (u.dostupnost) {
    if (!pok || (nast.dost !== "vsetko" && u.dostupnost !== nast.dost)) return [];
    const b = u.dostupnost === "bežné" ? 1 : 0;
    return [{ u, deti: [], bezne: b, exoticke: 1 - b, zhoda, retazec: [] }];
  }
  const deti = u.deti.flatMap((d) => zobraz(d, pok, ploche || u.uroven >= DRUH));
  if (deti.length === 0) return [];
  const skryty =
    ploche || u.nazov === ZNACKY.NEEXISTUJE || (u.uroven === DRUH && u.nazov === ZNACKY.NEROZLISENE);
  if (skryty) return deti;
  const jedine = deti.length === 1 ? deti[0] : undefined;
  if (jedine && !jedine.u.dostupnost && u.uroven > 0) {
    return [{ ...jedine, zhoda: zhoda || jedine.zhoda, retazec: [u, ...jedine.retazec] }];
  }
  let bezne = 0;
  let exoticke = 0;
  for (const d of deti) {
    bezne += d.bezne;
    exoticke += d.exoticke;
  }
  return [{ u, deti, bezne, exoticke, zhoda, retazec: [] }];
}

// ---------- DOM ----------

const $ = <T extends HTMLElement>(sel: string): T => document.querySelector(sel) as T;
const el = <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  cls?: string,
  text?: string,
): HTMLElementTagNameMap[K] => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
};

const stromEl = $<HTMLDivElement>("#strom");
const infoEl = $<HTMLParagraphElement>("#info");

function nazovEl(u: Uzol, zhoda: boolean): HTMLElement {
  const s = el("span", "nazov");
  if (u.znacka) {
    if (u.nazov === ZNACKY.TBD) {
      s.append(el("span", "chip tbd", "TBD"), el("span", "pozn", "nedoplnené"));
    } else if (u.nazov === ZNACKY.NEEXISTUJE) {
      s.append(el("span", "znak", "–"), el("span", "pozn", "neexistuje"));
    } else {
      s.append(el("span", "znak", "∗"), el("span", "pozn", "nerozlíšené"));
    }
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

function pocetEl(v: VUzol): HTMLElement {
  const spolu = v.bezne + v.exoticke;
  const p = el("span", "pocet");
  p.title = `${spolu} potravín: ${v.bezne} bežných, ${v.exoticke} exotických`;
  const bar = el("i");
  bar.style.setProperty("--b", `${(v.bezne / spolu) * 100}%`);
  p.append(el("b", undefined, String(spolu)), bar);
  return p;
}

function uzolEl(v: VUzol, zb: Set<string>): HTMLElement {
  const { u } = v;
  if (u.dostupnost) {
    const row = el("div", "list");
    row.append(el("span", "bod"), nazovEl(u, v.zhoda));
    const chip = el("span", `chip ${u.dostupnost === "bežné" ? "bezne" : "exoticke"}`, u.dostupnost);
    chip.title = DOSTUPNOST[u.dostupnost];
    row.append(chip);
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
  const pohlad = koren.flatMap((u) => zobraz(u, false, false));
  const zb = aktivneZbalene();
  stromEl.replaceChildren(...pohlad.map((v) => uzolEl(v, zb)));

  const spolu = pohlad.reduce((a, v) => a + v.bezne + v.exoticke, 0);
  if (pohlad.length === 0) {
    infoEl.textContent = nast.q
      ? `Pre „${hladatEl.value.trim()}“ sa nenašla žiadna potravina ani taxón.`
      : "Žiadna potravina nezodpovedá filtru.";
  } else if (nast.q || nast.dost !== "vsetko") {
    infoEl.textContent = `Zobrazených ${spolu} ${sklon(spolu)}.`;
  } else {
    infoEl.textContent = "";
  }
  infoEl.hidden = infoEl.textContent === "";
}

const sklon = (n: number): string => (n === 1 ? "potravina" : n >= 2 && n <= 4 ? "potraviny" : "potravín");

function statistiky(): void {
  const dl = $<HTMLDListElement>("#statistiky");
  let bezne = 0;
  let exoticke = 0;
  let uzly = 0;
  for (const u of vsetky(koren)) {
    uzly++;
    if (u.dostupnost === "bežné") bezne++;
    else if (u.dostupnost === "exotické") exoticke++;
  }
  const polozky: [string, string][] = [
    ["potraviny", String(bezne + exoticke)],
    ["bežné", String(bezne)],
    ["exotické", String(exoticke)],
    ["uzly stromu", uzly.toLocaleString("sk-SK")],
  ];
  for (const r of koren) {
    let n = 0;
    for (const u of vsetky([r])) if (u.dostupnost) n++;
    polozky.push([r.nazov, String(n)]);
  }
  dl.replaceChildren(
    ...polozky.map(([k, h], i) => {
      const w = el("div", i === 2 ? "exot" : i >= 4 ? `risa risa-${i - 4}` : undefined);
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

const nastrojeEl = $<HTMLDivElement>(".nastroje");
const bublina = el("div", "bublina");
bublina.hidden = true;
bublina.setAttribute("role", "tooltip");
document.body.append(bublina);
const bezPohybu = window.matchMedia("(prefers-reduced-motion: reduce)");

stromEl.addEventListener("click", (e) => {
  const c = (e.target as Element).closest<HTMLButtonElement>(".ciara");
  if (!c) return;
  const summary = c.parentElement?.previousElementSibling;
  if (!(summary instanceof HTMLElement)) return;
  const top = summary.getBoundingClientRect().top + window.scrollY - nastrojeEl.offsetHeight - 8;
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
UROVNE.forEach((nazov, i) => {
  if (i === 0 || (i > DRUH && nazov !== "potravina")) return;
  const o = el("option", undefined, nazov);
  o.value = String(i);
  poEl.append(o);
});
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

const dostTlacidla = document.querySelectorAll<HTMLButtonElement>("[data-dost]");
function oznacDost(): void {
  dostTlacidla.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset["dost"] === nast.dost)));
}
dostTlacidla.forEach((b) =>
  b.addEventListener("click", () => {
    nast.dost = (b.dataset["dost"] ?? "vsetko") as Dost;
    oznacDost();
    vykresli();
  }),
);


// ---------- štart ----------

oznacDost();
statistiky();
vykresli();

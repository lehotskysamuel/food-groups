/**
 * Typy a pomocné funkcie, ktoré zdieľa zobrazenie stromu (main.ts), kruhový diagram (kruh.ts)
 * a plánovač jedál (planovac.ts).
 */
import { DOSTUPNOST, DOSTUPNOSTI, UROVNE, ZNACKY } from "../src/strom.types";
import type { List } from "../src/strom.types";

export interface Uzol {
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
export interface VUzol {
  readonly u: Uzol;
  readonly deti: readonly VUzol[];
  /** Počet potravín v podstrome podľa dostupnosti. */
  readonly pocty: Pocty;
  readonly zhoda: boolean;
  /** Predkovia zlúčení do tohto riadku (reťaz uzlov s jediným dieťaťom), od najvyššieho. */
  readonly retazec: readonly Uzol[];
}

export type Pocty = Readonly<Record<List, number>>;

export interface Nastavenia {
  /** Zobrazené dostupnosti; potraviny s inou dostupnosťou sa skryjú. */
  dost: ReadonlySet<List>;
  /** Hľadaný text po `norm`, prázdny = bez hľadania. */
  q: string;
  /** Detailný pohľad: nič sa nepreskakuje ani nezlučuje (pozri zobraz). */
  detail: boolean;
}

/** Oddeľovač názvov v id uzla (cesta od ríše). */
export const SEP = "␟";
const ZNACKY_SET = new Set<string>(Object.values(ZNACKY));

export const norm = (s: string): string => s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().trim();

/** Uzly stromu z dát (src/data/strom.ts). */
export function postav(obj: { readonly [k: string]: unknown }, uroven = 0, rodic = ""): Uzol[] {
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

export function* vsetky(uzly: readonly Uzol[]): Generator<Uzol> {
  for (const u of uzly) {
    yield u;
    yield* vsetky(u.deti);
  }
}

/** Index úrovne „druh“. Pod druhom sa zobrazujú priamo potraviny (listy). */
export const DRUH = UROVNE.indexOf("druh");

/**
 * Jednoduchý pohľad (predvolený):
 * - uzly „-“ sa preskočia, ich potomkovia sa zobrazia o úroveň vyššie,
 * - pod druhom sa zobrazia priamo potraviny (varieta, kultivar a jedlá časť sa preskočia),
 * - druh „*“ sa preskočí, potraviny sa zobrazia priamo pod rodom,
 * - reťaz uzlov, kde každý má jediné dieťa, sa zlúči do jedného riadku s názvom najspodnejšieho
 *   (okrem ríše, tá zostáva vždy samostatne).
 *
 * Detailný pohľad zobrazí všetky uzly tak, ako sú v dátach (filter a hľadanie platia v oboch).
 * Pohľad je len prezentácia, dáta sa nemenia.
 */
export function zobraz(u: Uzol, nast: Nastavenia, pokryte = false, ploche = false): VUzol[] {
  const zhoda = nast.q !== "" && u.hladat.includes(nast.q);
  const pok = pokryte || zhoda || nast.q === "";
  if (u.dostupnost) {
    if (!pok || !nast.dost.has(u.dostupnost)) return [];
    return [{ u, deti: [], pocty: { ...nulovePocty(), [u.dostupnost]: 1 }, zhoda, retazec: [] }];
  }
  const deti = u.deti.flatMap((d) => zobraz(d, nast, pok, ploche || u.uroven >= DRUH));
  if (deti.length === 0) return [];
  if (!nast.detail) {
    const skryty =
      ploche || u.nazov === ZNACKY.NEEXISTUJE || (u.uroven === DRUH && u.nazov === ZNACKY.NEROZLISENE);
    if (skryty) return deti;
    const jedine = deti.length === 1 ? deti[0] : undefined;
    if (jedine && !jedine.u.dostupnost && u.uroven > 0) {
      return [{ ...jedine, zhoda: zhoda || jedine.zhoda, retazec: [u, ...jedine.retazec] }];
    }
  }
  const pocty = nulovePocty();
  for (const d of deti) for (const k of DOSTUPNOSTI) pocty[k] += d.pocty[k];
  return [{ u, deti, pocty, zhoda, retazec: [] }];
}

export const RISE = ["rastliny", "huby", "živočíchy", "chromisty", "baktérie"];

/** CSS trieda pre každú dostupnosť. */
export const TRIEDA: Readonly<Record<List, string>> = { bežné: "bezne", "menej bežné": "menej", exotické: "exoticke" };

export const nulovePocty = (): Record<List, number> => ({ bežné: 0, "menej bežné": 0, exotické: 0 });
export const sucet = (p: Pocty): number => DOSTUPNOSTI.reduce((a, d) => a + p[d], 0);

/** Tvar slova podľa počtu: [1, 2–4, 0 a 5+], napr. ["jedlo", "jedlá", "jedál"]. */
export const sklonuj = (n: number, [jeden, dva, pat]: readonly [string, string, string]): string =>
  n === 1 ? jeden : n >= 2 && n <= 4 ? dva : pat;

export const sklon = (n: number): string => sklonuj(n, ["potravina", "potraviny", "potravín"]);

export const nazovUrovne = (u: Uzol): string => UROVNE[u.uroven] ?? "";

/** Krátky text značky („–“, „∗“, „TBD“) a jej význam. */
export function znacka(u: Uzol): { znak: string; pozn: string } {
  if (u.nazov === ZNACKY.TBD) return { znak: "TBD", pozn: "nedoplnené" };
  if (u.nazov === ZNACKY.NEEXISTUJE) return { znak: "–", pozn: "neexistuje" };
  return { znak: "∗", pozn: "nerozlíšené" };
}

/**
 * Prepínače dostupnosti: checkboxy s `data-dost` v `skupina`, každý sa dá zapnúť a vypnúť zvlášť.
 * Nastaví ich podľa `dost` a pri každej zmene zavolá `zmena` s množinou zapnutých dostupností.
 */
export function prepinajDostupnosti(
  skupina: ParentNode,
  dost: ReadonlySet<List>,
  zmena: (dost: ReadonlySet<List>) => void,
): void {
  const boxy = [...skupina.querySelectorAll<HTMLInputElement>("input[data-dost]")];
  const hodnota = (b: HTMLInputElement): List => b.dataset["dost"] as List;
  for (const b of boxy) {
    b.checked = dost.has(hodnota(b));
    const label = b.closest("label");
    if (label) label.title = DOSTUPNOST[hodnota(b)];
    b.addEventListener("change", () => zmena(new Set(boxy.filter((x) => x.checked).map(hodnota))));
  }
}

export const el = <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  cls?: string,
  text?: string,
): HTMLElementTagNameMap[K] => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
};

/** Počet potravín a pruh s pomerom bežné / menej bežné / exotické. */
export function pocetEl(v: VUzol): HTMLElement {
  const { pocty } = v;
  const spolu = sucet(pocty);
  const p = el("span", "pocet");
  p.title = `${spolu} ${sklon(spolu)}: ${pocty["bežné"]} bežné, ${pocty["menej bežné"]} menej bežné, ${pocty["exotické"]} exotické`;
  const bar = el("i");
  bar.style.setProperty("--b", `${(pocty["bežné"] / spolu) * 100}%`);
  bar.style.setProperty("--m", `${((pocty["bežné"] + pocty["menej bežné"]) / spolu) * 100}%`);
  p.append(el("b", undefined, String(spolu)), bar);
  return p;
}

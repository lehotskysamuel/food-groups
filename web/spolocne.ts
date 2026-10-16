/**
 * Typy a pomocné funkcie, ktoré zdieľa zobrazenie stromu (main.ts) a kruhového diagramu (kruh.ts).
 */
import { DOSTUPNOSTI, UROVNE, ZNACKY } from "../src/strom.types";
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

export const RISE = ["rastliny", "huby", "živočíchy", "chromisty", "baktérie"];

/** CSS trieda pre každú dostupnosť. */
export const TRIEDA: Readonly<Record<List, string>> = { bežné: "bezne", "menej bežné": "menej", exotické: "exoticke" };

export const nulovePocty = (): Record<List, number> => ({ bežné: 0, "menej bežné": 0, exotické: 0 });
export const sucet = (p: Pocty): number => DOSTUPNOSTI.reduce((a, d) => a + p[d], 0);

export const sklon = (n: number): string => (n === 1 ? "potravina" : n >= 2 && n <= 4 ? "potraviny" : "potravín");

export const nazovUrovne = (u: Uzol): string => UROVNE[u.uroven] ?? "";

/** Krátky text značky („–“, „∗“, „TBD“) a jej význam. */
export function znacka(u: Uzol): { znak: string; pozn: string } {
  if (u.nazov === ZNACKY.TBD) return { znak: "TBD", pozn: "nedoplnené" };
  if (u.nazov === ZNACKY.NEEXISTUJE) return { znak: "–", pozn: "neexistuje" };
  return { znak: "∗", pozn: "nerozlíšené" };
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

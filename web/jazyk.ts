/**
 * Jazyk webu. Predvolená je slovenčina, ?lang=en v adrese zapne angličtinu. Prepínač s vlajkami v hornej
 * lište mení jazyk bez načítania stránky a zapíše ho do adresy, takže odkaz aj obnovenie stránky ho zachovajú.
 *
 * `jazyk` a `t` (texty aktuálneho jazyka) sú živé väzby: po zmene jazyka ich importy vidia novú hodnotu.
 * Statické texty v index.html majú atribút data-t="cesta.k.textu" (textContent) alebo
 * data-t-aria-label / data-t-title / data-t-placeholder (atribút); cesta vedie do `Texty` v src/texty.ts.
 */
import { PREDVOLENY_JAZYK, jazykZAdresy, jeJazyk } from "../src/preklad";
import type { Jazyk } from "../src/preklad";
import { TEXTY } from "../src/texty";
import type { Texty } from "../src/texty";

export let jazyk: Jazyk = jazykZAdresy(location.search);
export let t: Texty = TEXTY[jazyk];

const posluchaci: (() => void)[] = [];

/** `fn` sa zavolá po každej zmene jazyka (v poradí registrácie). */
export const priZmeneJazyka = (fn: () => void): void => void posluchaci.push(fn);

const ATRIBUTY = ["aria-label", "title", "placeholder"] as const;

/** Text podľa cesty „strom.rozbalitVsetko“; neexistujúca cesta je chyba v index.html. */
function textPodlaCesty(cesta: string): string {
  let x: unknown = t;
  for (const k of cesta.split(".")) x = typeof x === "object" && x !== null ? (x as Record<string, unknown>)[k] : undefined;
  if (typeof x !== "string") throw new Error(`Text „${cesta}“ v src/texty.ts neexistuje.`);
  return x;
}

/** Preloží statické texty (data-t…) v `koren` do aktuálneho jazyka. */
export function prelozStranku(koren: ParentNode = document): void {
  koren.querySelectorAll<HTMLElement>("[data-t]").forEach((e) => (e.textContent = textPodlaCesty(e.dataset["t"] ?? "")));
  for (const a of ATRIBUTY) {
    koren.querySelectorAll(`[data-t-${a}]`).forEach((e) => e.setAttribute(a, textPodlaCesty(e.getAttribute(`data-t-${a}`) ?? "")));
  }
}

/** Formát čísla podľa jazyka (1 330 / 1,330). */
export const cislo = (n: number): string => n.toLocaleString(t.jazyk.locale);

/** Porovnanie textov podľa abecedy aktuálneho jazyka. */
export const abeceda = (a: string, b: string): number => a.localeCompare(b, jazyk);

function oznacPrepinac(): void {
  document.querySelectorAll<HTMLButtonElement>("[data-jazyk]").forEach((b) => {
    b.setAttribute("aria-pressed", String(b.dataset["jazyk"] === jazyk));
  });
}

/** Zmení jazyk: texty stránky, <html lang>, parameter ?lang v adrese a všetko, čo sa registrovalo cez priZmeneJazyka. */
export function nastavJazyk(j: Jazyk): void {
  if (j === jazyk) return;
  jazyk = j;
  t = TEXTY[j];
  const adresa = new URL(location.href);
  if (j === PREDVOLENY_JAZYK) adresa.searchParams.delete("lang");
  else adresa.searchParams.set("lang", j);
  history.replaceState(history.state, "", adresa);
  zobrazJazyk();
  for (const fn of posluchaci) fn();
}

function zobrazJazyk(): void {
  document.documentElement.lang = jazyk;
  prelozStranku();
  oznacPrepinac();
}

/** Prepínač jazyka v hornej lište a preklad statických textov podľa ?lang pri štarte. */
export function spustiJazyk(): void {
  document.querySelectorAll<HTMLButtonElement>("[data-jazyk]").forEach((b) => {
    const j = b.dataset["jazyk"];
    if (!jeJazyk(j)) return;
    // Názov jazyka v ňom samom (Slovenčina, English), nemení sa s jazykom stránky.
    b.title = TEXTY[j].jazyk.nazov;
    b.addEventListener("click", () => nastavJazyk(j));
  });
  zobrazJazyk();
}

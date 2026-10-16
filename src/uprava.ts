/**
 * Úprava zdrojového textu src/data/strom.ts (používa ju edit mód dev servera).
 *
 * Mení len hodnotu jedného listu, zvyšok súboru (formátovanie, poradie) zostáva bajt po bajte rovnaký.
 */
import { DOSTUPNOSTI, type List } from "./strom.types";
import { TEXTY, type KodChybyUpravy } from "./texty";

/** Údaje k chybe zápisu, z ktorých si web zostaví správu vo svojom jazyku. */
export interface UdajeChybyUpravy {
  /** Pri „ina-hodnota“: názov potraviny, jej hodnota v súbore a očakávaná hodnota. */
  readonly kluc?: string;
  readonly hodnota?: string;
  readonly z?: string;
  /** Pri „nenaslo“: cesta k potravine. */
  readonly cesta?: readonly string[];
}

/** Chyba zápisu s kódom (správa je slovensky, web ju podľa kódu ukáže vo svojom jazyku). */
export class ChybaUpravy extends Error {
  constructor(
    readonly kod: KodChybyUpravy,
    readonly udaje: UdajeChybyUpravy = {},
  ) {
    const c = TEXTY.sk.edit.chyby;
    super(
      kod === "ina-hodnota"
        ? c[kod]({ kluc: udaje.kluc ?? "", hodnota: udaje.hodnota ?? "", z: udaje.z ?? "" })
        : kod === "nenaslo"
          ? c[kod]({ cesta: (udaje.cesta ?? []).join(" › ") })
          : c[kod](),
    );
  }
}

/** Nasledujúca hodnota listu v kruhu bežné → menej bežné → exotické → bežné. */
export const dalsia = (d: List): List => DOSTUPNOSTI[(DOSTUPNOSTI.indexOf(d) + 1) % DOSTUPNOSTI.length] ?? d;

/**
 * Posunie list na ceste `cesta` (názvy uzlov od ríše po potravinu) z hodnoty `z` na nasledujúcu.
 * Hodí ChybaUpravy, ak list neexistuje alebo už nemá hodnotu `z` (napr. súbor sa medzitým zmenil).
 */
export function prepniList(text: string, cesta: readonly string[], z: List): string {
  const zaciatok = text.indexOf("{", text.indexOf("export const strom"));
  if (zaciatok < 0) throw new ChybaUpravy("neplatny-subor");

  const zasobnik: string[] = [];
  let kluc: string | undefined;
  let i = zaciatok;
  for (; i < text.length; i++) {
    const c = text[i];
    if (c === "{") {
      if (i !== zaciatok) {
        if (kluc === undefined) throw new ChybaUpravy("neplatny-subor");
        zasobnik.push(kluc);
      }
      kluc = undefined;
    } else if (c === "}") {
      if (zasobnik.length === 0) break;
      zasobnik.pop();
    } else if (c === '"') {
      const koniec = koniecRetazca(text, i);
      const hodnota = JSON.parse(text.slice(i, koniec + 1)) as string;
      const dalsi = text.slice(koniec + 1).match(/^\s*(.)/)?.[1];
      if (dalsi === ":") {
        kluc = hodnota;
      } else if (kluc !== undefined && rovnake(zasobnik, kluc, cesta)) {
        if (hodnota !== z) throw new ChybaUpravy("ina-hodnota", { kluc, hodnota, z });
        return text.slice(0, i) + JSON.stringify(dalsia(z)) + text.slice(koniec + 1);
      }
      i = koniec;
    }
  }
  throw new ChybaUpravy("nenaslo", { cesta });
}

function koniecRetazca(text: string, zaciatok: number): number {
  for (let i = zaciatok + 1; i < text.length; i++) {
    if (text[i] === "\\") i++;
    else if (text[i] === '"') return i;
  }
  throw new ChybaUpravy("neplatny-subor");
}

function rovnake(zasobnik: readonly string[], kluc: string, cesta: readonly string[]): boolean {
  return (
    cesta.length === zasobnik.length + 1 &&
    cesta[zasobnik.length] === kluc &&
    zasobnik.every((k, j) => k === cesta[j])
  );
}

/**
 * Jazyky webu a preklad dát. Zdrojový jazyk dát je slovenčina: názvy uzlov v src/data/strom.ts, jednoduchý
 * pohľad v src/data/zjednodusene.ts aj texty jedál v src/data/plany. Anglické názvy uzlov sú
 * v src/data/strom.en.ts, jednoduchého pohľadu v src/data/zjednodusene.en.ts, texty jedál môžu mať preklad
 * priamo v JSON súbore (typ `Text`). Texty rozhrania sú v src/texty.ts.
 */
import { en } from "./data/strom.en";
import { en as enZjednodusene } from "./data/zjednodusene.en";
import { ZNACKY } from "./strom.types";

/** Podporované jazyky; prvý je predvolený. */
export const JAZYKY = ["sk", "en"] as const;
export type Jazyk = (typeof JAZYKY)[number];
export const PREDVOLENY_JAZYK: Jazyk = "sk";

export const jeJazyk = (x: unknown): x is Jazyk => (JAZYKY as readonly unknown[]).includes(x);

/** Jazyk z parametra adresy (?lang=en). Chýbajúci alebo neznámy jazyk = slovenčina. */
export function jazykZAdresy(search: string): Jazyk {
  const lang = new URLSearchParams(search).get("lang")?.trim().toLowerCase();
  return jeJazyk(lang) ? lang : PREDVOLENY_JAZYK;
}

/**
 * Text dát, ktorý môže mať preklad: samotný reťazec je slovensky, objekt má slovenčinu a voliteľne
 * ďalšie jazyky, napr. { "sk": "hrsť", "en": "a handful" }.
 */
export type Text = string | ({ readonly sk: string } & { readonly [J in Jazyk]?: string });

/** Text v jazyku `jazyk`; bez prekladu slovenský originál. */
export const text = (t: Text, jazyk: Jazyk): string => (typeof t === "string" ? t : (t[jazyk] ?? t.sk));

/**
 * Preklady názvov uzlov stromu pre každý jazyk okrem slovenčiny. Ten istý slovenský názov môže na rôznych
 * úrovniach znamenať niečo iné (cibuľa: potravina „onion“, jedlá časť „bulb“), preto má každý jazyk štyri
 * tabuľky podľa úrovne, v ktorých sú názvy jednoznačné (pozri src/kontrola.ts).
 */
export interface PrekladStromu {
  /** Úrovne 1–14 (ríša až varieta): taxón je v strome len raz. */
  readonly taxony: Readonly<Record<string, string>>;
  /** Úroveň 15: kultivar / plemeno. */
  readonly kultivary: Readonly<Record<string, string>>;
  /** Úroveň 16: jedlá časť. */
  readonly casti: Readonly<Record<string, string>>;
  /** Úroveň 17: potravina (list). */
  readonly potraviny: Readonly<Record<string, string>>;
}

export const PREKLADY_STROMU: Readonly<Record<Exclude<Jazyk, "sk">, PrekladStromu>> = { en };

/** Tabuľka prekladu pre úroveň s indexom `uroven` v UROVNE (0 = ríša … 16 = potravina). */
export function tabulkaUrovne(preklad: PrekladStromu, uroven: number): Readonly<Record<string, string>> {
  if (uroven >= 16) return preklad.potraviny;
  if (uroven === 15) return preklad.casti;
  if (uroven === 14) return preklad.kultivary;
  return preklad.taxony;
}

const ZNACKY_SET = new Set<string>(Object.values(ZNACKY));

/**
 * Názov uzla stromu v jazyku `jazyk`, napr. prelozUzol("cibuľa", 16, "en") → "onion",
 * prelozUzol("cibuľa", 15, "en") → "bulb". `uroven` je index v UROVNE (0 = ríša … 16 = potravina).
 * Značky (-, *, TBD) sa neprekladajú; názov bez prekladu zostane slovenský.
 */
export function prelozUzol(nazov: string, uroven: number, jazyk: Jazyk): string {
  if (jazyk === "sk" || ZNACKY_SET.has(nazov)) return nazov;
  return tabulkaUrovne(PREKLADY_STROMU[jazyk], uroven)[nazov] ?? nazov;
}

/** Preklad názvov jednoduchého pohľadu (src/data/zjednodusene.ts) do jedného jazyka. */
export interface PrekladZjednodusenych {
  /** Zjednodušené potraviny (hruška, bravčové mäso). */
  readonly zjednodusene: Readonly<Record<string, string>>;
  /** Podkategórie rastlín (jadroviny, hlúbová zelenina). */
  readonly podkategorie: Readonly<Record<string, string>>;
  /** Triedy zobrazené spolu (ryby). */
  readonly triedy: Readonly<Record<string, string>>;
}

export const PREKLADY_ZJEDNODUSENYCH: Readonly<Record<Exclude<Jazyk, "sk">, PrekladZjednodusenych>> = { en: enZjednodusene };

/**
 * Názov z jednoduchého pohľadu v jazyku `jazyk`, napr. prelozZjednodusene("jadroviny", "podkategorie", "en") →
 * "pome fruit". Názov bez prekladu zostane slovenský.
 */
export function prelozZjednodusene(nazov: string, druh: keyof PrekladZjednodusenych, jazyk: Jazyk): string {
  if (jazyk === "sk") return nazov;
  return PREKLADY_ZJEDNODUSENYCH[jazyk][druh][nazov] ?? nazov;
}

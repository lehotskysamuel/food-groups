/**
 * Plány jedál: src/data/plany/<plán>/<jedlo>.json.
 *
 * Každý priečinok v src/data/plany je jeden plán (napr. týždeň), každý JSON súbor v ňom je jedno jedlo.
 * Suroviny jedla odkazujú na potraviny (listy) stromu podľa slovenského názvu, ktorý je v strome unikátny.
 * Texty jedla (názov, popis, forma, množstvo) môžu mať preklad: { "sk": "hrsť", "en": "a handful" }.
 */
import { JAZYKY, PREDVOLENY_JAZYK, type Jazyk, type Text } from "./preklad";
import type { Strom } from "./strom.types";
import { TEXTY, type Texty } from "./texty";

/** Jedna surovina jedla. */
export interface Surovina {
  /** Názov potraviny (listu) v strome, presne ako v src/data/strom.ts, napr. "ovčie mlieko". */
  readonly potravina: string;
  /**
   * Produkt, v ktorom je potravina v jedle, ak to nie je samotná potravina: "bryndza", "údená slanina",
   * "hladká múka". Spracovanie do stromu nepatrí, preto bryndza odkazuje na ovčie mlieko a tofu na sójové bôby.
   * Zobrazuje sa namiesto názvu potraviny.
   */
  readonly forma?: Text;
  /** Množstvo ako voľný text, napr. "250 g", "2 ks", "hrsť". */
  readonly mnozstvo?: Text;
}

/** Jedlo: obsah jedného JSON súboru. */
export interface Jedlo {
  readonly nazov: Text;
  readonly popis?: Text;
  /** Aspoň jedna surovina. Viac surovín môže odkazovať na tú istú potravinu (tofu aj sójová omáčka). */
  readonly suroviny: readonly Surovina[];
}

/** Jedlo načítané zo súboru. */
export interface NacitaneJedlo {
  /** Názov súboru bez .json. */
  readonly id: string;
  readonly jedlo: Jedlo;
}

/** Plán: jeden priečinok s jedlami. */
export interface Plan {
  /** Názov priečinka, zobrazuje sa ako názov plánu. */
  readonly id: string;
  readonly jedla: readonly NacitaneJedlo[];
}

const KLUCE_JEDLA = new Set(["nazov", "popis", "suroviny"]);
const KLUCE_SUROVINY = new Set(["potravina", "forma", "mnozstvo"]);

const poradie = (a: string, b: string): number => a.localeCompare(b, "sk", { numeric: true });

/** Názvy všetkých potravín (listov) stromu. */
export function nazvyPotravin(strom: Strom): Set<string> {
  const nazvy = new Set<string>();
  const prejdi = (uzol: { readonly [k: string]: unknown }): void => {
    for (const [nazov, hodnota] of Object.entries(uzol)) {
      if (typeof hodnota === "string") nazvy.add(nazov);
      else prejdi(hodnota as { readonly [k: string]: unknown });
    }
  };
  prejdi(strom);
  return nazvy;
}

const jeObjekt = (x: unknown): x is Record<string, unknown> => typeof x === "object" && x !== null && !Array.isArray(x);

/** Chyby textu `hodnota` pod kľúčom `k`: reťazec alebo objekt { sk, en? } s reťazcami. */
function overText(hodnota: unknown, k: string, t: Texty["chybyJedla"]): string[] {
  if (typeof hodnota === "string") return [];
  if (!jeObjekt(hodnota)) return [t.musiBytText(k)];
  const chyby: string[] = [];
  for (const [j, v] of Object.entries(hodnota)) {
    if (!(JAZYKY as readonly string[]).includes(j)) chyby.push(t.neznamyJazyk(k, j));
    else if (typeof v !== "string") chyby.push(t.musiBytText(k));
  }
  if (hodnota["sk"] === undefined) chyby.push(t.chybaSk(k));
  return chyby;
}

/** Text má neprázdnu slovenskú verziu. */
const neprazdny = (x: unknown): boolean =>
  typeof x === "string" ? x.trim() !== "" : jeObjekt(x) && typeof x["sk"] === "string" && x["sk"].trim() !== "";

/** Overí tvar jedného jedla. Vráti jedlo (ak sa dá zobraziť) a zoznam chýb v jazyku `jazyk`. */
function overJedlo(json: unknown, potraviny: ReadonlySet<string>, jazyk: Jazyk): { jedlo?: Jedlo; chyby: string[] } {
  const t = TEXTY[jazyk].chybyJedla;
  const chyby: string[] = [];
  if (!jeObjekt(json)) return { chyby: [t.obsah] };
  for (const k of Object.keys(json)) if (!KLUCE_JEDLA.has(k)) chyby.push(t.neznamyKluc(k));
  const { nazov, popis, suroviny } = json;
  const chybyNazvu = nazov === undefined ? [] : overText(nazov, "nazov", t);
  if (chybyNazvu.length === 0 && !neprazdny(nazov)) chybyNazvu.push(t.chybaNazov);
  chyby.push(...chybyNazvu);
  if (popis !== undefined) chyby.push(...overText(popis, "popis", t));
  if (!Array.isArray(suroviny) || suroviny.length === 0) {
    chyby.push(t.suroviny);
    return { chyby };
  }
  suroviny.forEach((s, i) => {
    const kde = t.surovina(i + 1);
    if (!jeObjekt(s)) {
      chyby.push(`${kde}: ${t.surovinaObjekt}`);
      return;
    }
    for (const k of Object.keys(s)) if (!KLUCE_SUROVINY.has(k)) chyby.push(`${kde}: ${t.neznamyKluc(k)}`);
    if (typeof s["potravina"] !== "string") chyby.push(`${kde}: ${t.chybaPotravina}`);
    else if (!potraviny.has(s["potravina"])) chyby.push(`${kde}: ${t.potravinaNieJe(s["potravina"])}`);
    for (const k of ["forma", "mnozstvo"]) {
      if (s[k] !== undefined) chyby.push(...overText(s[k], k, t).map((c) => `${kde}: ${c}`));
    }
  });
  if (chybyNazvu.length > 0) return { chyby };
  return { jedlo: json as unknown as Jedlo, chyby };
}

/**
 * Plány zo súborov (kľúč = cesta končiaca „<plán>/<jedlo>.json“, hodnota = obsah JSON).
 * Jedlo s chybnou surovinou sa zobrazí (chybná surovina sa v grafe neoznačí), jedlo bez názvu
 * alebo surovín sa vynechá. Všetky chyby sú v `chyby` v jazyku `jazyk`, `npm run kontrola` pri nich zlyhá.
 */
export function nacitajPlany(
  subory: Readonly<Record<string, unknown>>,
  potraviny: ReadonlySet<string>,
  jazyk: Jazyk = PREDVOLENY_JAZYK,
): { plany: Plan[]; chyby: string[] } {
  const chyby: string[] = [];
  const plany = new Map<string, NacitaneJedlo[]>();
  for (const cesta of Object.keys(subory).sort(poradie)) {
    const m = /([^/]+)\/([^/]+)\.json$/.exec(cesta);
    if (!m?.[1] || !m[2]) continue;
    const [plan, id] = [m[1].normalize("NFC"), m[2].normalize("NFC")];
    const { jedlo, chyby: c } = overJedlo(subory[cesta], potraviny, jazyk);
    chyby.push(...c.map((ch) => `${plan}/${id}.json: ${ch}`));
    const jedla = plany.get(plan) ?? [];
    if (jedlo) jedla.push({ id, jedlo });
    plany.set(plan, jedla);
  }
  return {
    plany: [...plany].sort(([a], [b]) => poradie(a, b)).map(([id, jedla]) => ({ id, jedla })),
    chyby,
  };
}

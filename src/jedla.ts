/**
 * Plány jedál: src/data/plany/<plán>/<jedlo>.json.
 *
 * Každý priečinok v src/data/plany je jeden plán (napr. týždeň), každý JSON súbor v ňom je jedno jedlo.
 * Suroviny jedla odkazujú na potraviny (listy) stromu podľa názvu, ktorý je v strome unikátny.
 */
import type { Strom } from "./strom.types";

/** Jedna surovina jedla. */
export interface Surovina {
  /** Názov potraviny (listu) v strome, presne ako v src/data/strom.ts, napr. "ovčie mlieko". */
  readonly potravina: string;
  /**
   * Produkt, v ktorom je potravina v jedle, ak to nie je samotná potravina: "bryndza", "údená slanina",
   * "hladká múka". Spracovanie do stromu nepatrí, preto bryndza odkazuje na ovčie mlieko a tofu na sójové bôby.
   * Zobrazuje sa namiesto názvu potraviny.
   */
  readonly forma?: string;
  /** Množstvo ako voľný text, napr. "250 g", "2 ks", "hrsť". */
  readonly mnozstvo?: string;
}

/** Jedlo: obsah jedného JSON súboru. */
export interface Jedlo {
  readonly nazov: string;
  readonly popis?: string;
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

/** Overí tvar jedného jedla. Vráti jedlo (ak sa dá zobraziť) a zoznam chýb. */
function overJedlo(json: unknown, potraviny: ReadonlySet<string>): { jedlo?: Jedlo; chyby: string[] } {
  const chyby: string[] = [];
  if (!jeObjekt(json)) return { chyby: ["obsah musí byť objekt { nazov, suroviny }"] };
  for (const k of Object.keys(json)) if (!KLUCE_JEDLA.has(k)) chyby.push(`neznámy kľúč „${k}“`);
  const { nazov, popis, suroviny } = json;
  if (typeof nazov !== "string" || !nazov.trim()) chyby.push("chýba „nazov“");
  if (popis !== undefined && typeof popis !== "string") chyby.push("„popis“ musí byť text");
  if (!Array.isArray(suroviny) || suroviny.length === 0) {
    chyby.push("„suroviny“ musí byť neprázdny zoznam");
    return { chyby };
  }
  suroviny.forEach((s, i) => {
    const kde = `surovina ${i + 1}`;
    if (!jeObjekt(s)) {
      chyby.push(`${kde}: musí byť objekt { potravina }`);
      return;
    }
    for (const k of Object.keys(s)) if (!KLUCE_SUROVINY.has(k)) chyby.push(`${kde}: neznámy kľúč „${k}“`);
    if (typeof s["potravina"] !== "string") chyby.push(`${kde}: chýba „potravina“`);
    else if (!potraviny.has(s["potravina"])) chyby.push(`${kde}: potravina „${s["potravina"]}“ nie je v strome`);
    for (const k of ["forma", "mnozstvo"]) {
      if (s[k] !== undefined && typeof s[k] !== "string") chyby.push(`${kde}: „${k}“ musí byť text`);
    }
  });
  if (typeof nazov !== "string" || !nazov.trim()) return { chyby };
  return { jedlo: json as unknown as Jedlo, chyby };
}

/**
 * Plány zo súborov (kľúč = cesta končiaca „<plán>/<jedlo>.json“, hodnota = obsah JSON).
 * Jedlo s chybnou surovinou sa zobrazí (chybná surovina sa v grafe neoznačí), jedlo bez názvu
 * alebo surovín sa vynechá. Všetky chyby sú v `chyby`, `npm run kontrola` pri nich zlyhá.
 */
export function nacitajPlany(
  subory: Readonly<Record<string, unknown>>,
  potraviny: ReadonlySet<string>,
): { plany: Plan[]; chyby: string[] } {
  const chyby: string[] = [];
  const plany = new Map<string, NacitaneJedlo[]>();
  for (const cesta of Object.keys(subory).sort(poradie)) {
    const m = /([^/]+)\/([^/]+)\.json$/.exec(cesta);
    if (!m?.[1] || !m[2]) continue;
    const [plan, id] = [m[1].normalize("NFC"), m[2].normalize("NFC")];
    const { jedlo, chyby: c } = overJedlo(subory[cesta], potraviny);
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

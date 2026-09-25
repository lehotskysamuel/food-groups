/**
 * Kontroly stromu, ktoré typy nezachytia (spúšťa ich `npm run kontrola`).
 *
 * 1. Taxón (úrovne 1–14) je v strome len raz: ten istý názov nesmie byť na dvoch cestách ani na dvoch úrovniach.
 * 2. Názov potraviny (list) je v celom strome unikátny.
 * 3. Rad, čeľaď, podčeľaď a tribus sú na správnej úrovni podľa typickej prípony názvu.
 */
import { UROVNE, ZNACKY, type List, type Strom } from "./strom.types";

type Uzol = { readonly [nazov: string]: Uzol | List };

const ZNACKY_SET = new Set<string>(Object.values(ZNACKY));

/** Posledná úroveň so skutočnými taxónmi (varieta); kultivary a jedlé časti sa medzi druhmi opakujú. */
const POSLEDNY_TAXON = 14;

/** Prípony, podľa ktorých sa dá určiť úroveň uzla. Poradie je dôležité: -aceae a -oideae pred -eae. */
const PRIPONY: readonly (readonly [RegExp, number])[] = [
  [/(tvaré|ales|iformes)$/, 8],
  [/(ité|ití|aceae|idae)$/, 9],
  [/(oideae|inae)$/, 10],
  [/(eae|ini)$/, 11],
];

const urovenPodlaPripony = (nazov: string): number | undefined => PRIPONY.find(([re]) => re.test(nazov))?.[1];

const popis = (uroven: number): string => `${uroven} (${UROVNE[uroven - 1] ?? "?"})`;

/** Vráti zoznam porušení; prázdny zoznam znamená, že strom je v poriadku. */
export function skontroluj(strom: Strom): string[] {
  const chyby: string[] = [];
  /** Názov taxónu → miesta (úroveň a cesta k rodičovi), kde sa vyskytuje. */
  const taxony = new Map<string, Set<string>>();
  /** Názov listu → cesty, na ktorých je. */
  const listy = new Map<string, string[]>();

  const prejdi = (uzol: Uzol, cesta: readonly string[]): void => {
    const uroven = cesta.length + 1;
    for (const [nazov, hodnota] of Object.entries(uzol)) {
      if (typeof hodnota === "string") {
        const cesty = listy.get(nazov) ?? [];
        listy.set(nazov, [...cesty, cesta.join(" › ")]);
        continue;
      }
      if (!ZNACKY_SET.has(nazov)) {
        if (uroven <= POSLEDNY_TAXON) {
          const miesta = taxony.get(nazov) ?? new Set<string>();
          taxony.set(nazov, miesta.add(`úroveň ${popis(uroven)} pod ${cesta.join(" › ") || "koreňom"}`));
        }
        const podla = urovenPodlaPripony(nazov);
        if (uroven >= 8 && uroven <= 11 && podla !== undefined && podla !== uroven) {
          chyby.push(`[3] „${nazov}“ je na úrovni ${popis(uroven)}, prípona patrí úrovni ${popis(podla)}: ${cesta.join(" › ")}`);
        }
      }
      prejdi(hodnota, [...cesta, nazov]);
    }
  };
  prejdi(strom as unknown as Uzol, []);

  for (const [nazov, miesta] of taxony) {
    if (miesta.size > 1) chyby.push(`[1] taxón „${nazov}“ je na viacerých miestach:\n    ${[...miesta].join("\n    ")}`);
  }
  for (const [nazov, cesty] of listy) {
    if (cesty.length > 1) chyby.push(`[2] potravina „${nazov}“ je v strome ${cesty.length}×:\n    ${cesty.join("\n    ")}`);
  }
  return chyby;
}

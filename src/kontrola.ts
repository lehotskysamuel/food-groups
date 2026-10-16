/**
 * Kontroly stromu, ktoré typy nezachytia (spúšťa ich `npm run kontrola`).
 *
 * 1. Taxón (úrovne 1–14) je v strome len raz: ten istý názov nesmie byť na dvoch cestách ani na dvoch úrovniach.
 * 2. Názov potraviny (list) je v celom strome unikátny.
 * 3. Rad, čeľaď, podčeľaď a tribus sú na správnej úrovni podľa typickej prípony názvu.
 *
 * `skontrolujZjednodusene` kontroluje jednoduchý pohľad (src/data/zjednodusene.ts):
 * 4. Potravina je v strome a patrí najviac do jednej zjednodušenej potraviny.
 * 5. Všetky potraviny jednej zjednodušenej potraviny sú v tej istej čeľadi.
 * 6. Každá potravina rastlín je (cez svoju zjednodušenú potravinu) práve v jednej podkategórii svojej čeľade.
 * 7. Triedy zobrazené spolu (ryby) sú triedy zo stromu.
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

const CELAD = UROVNE.indexOf("čeľaď");

const TRIEDA = UROVNE.indexOf("trieda");

/**
 * Vráti zoznam porušení pravidiel 4 až 7. `zjednodusene`: názov → potraviny stromu, `podkategorie`: čeľaď →
 * podkategória → zjednodušené potraviny, `triedy`: názov → triedy stromu.
 */
export function skontrolujZjednodusene(
  strom: Strom,
  zjednodusene: Readonly<Record<string, readonly string[]>>,
  podkategorie: Readonly<Record<string, Readonly<Record<string, readonly string[]>>>>,
  triedy: Readonly<Record<string, readonly string[]>>,
): string[] {
  const chyby: string[] = [];
  /** Názov potraviny → jej čeľaď. */
  const celade = new Map<string, string>();
  /** Potraviny rastlín v poradí stromu. */
  const rastliny: string[] = [];
  const triedyStromu = new Set<string>();
  const prejdi = (uzol: Uzol, cesta: readonly string[]): void => {
    for (const [nazov, hodnota] of Object.entries(uzol)) {
      if (typeof hodnota === "string") {
        celade.set(nazov, cesta[CELAD] ?? "");
        if (cesta[0] === "rastliny") rastliny.push(nazov);
      } else {
        if (cesta.length === TRIEDA) triedyStromu.add(nazov);
        prejdi(hodnota, [...cesta, nazov]);
      }
    }
  };
  prejdi(strom as unknown as Uzol, []);

  /** Potravina → zjednodušená potravina, do ktorej už patrí. */
  const skupina = new Map<string, string>();
  for (const [nazov, potraviny] of Object.entries(zjednodusene)) {
    const vCeladiach = new Map<string, string[]>();
    for (const p of potraviny) {
      const celad = celade.get(p);
      if (celad === undefined) chyby.push(`[4] „${p}“ v zjednodušenej potravine „${nazov}“ nie je v strome`);
      const ina = skupina.get(p);
      if (ina !== undefined) chyby.push(`[4] „${p}“ je v zjednodušených potravinách „${ina}“ aj „${nazov}“`);
      skupina.set(p, nazov);
      if (celad !== undefined) vCeladiach.set(celad, [...(vCeladiach.get(celad) ?? []), p]);
    }
    if (vCeladiach.size > 1) {
      const kde = [...vCeladiach].map(([c, ps]) => `${c}: ${ps.join(", ")}`).join("\n    ");
      chyby.push(`[5] zjednodušená potravina „${nazov}“ má potraviny z viacerých čeľadí:\n    ${kde}`);
    }
  }

  /** Čeľaď a zjednodušená potravina („čeľaď › názov“) → podkategórie, v ktorých je. */
  const zaradenie = new Map<string, string[]>();
  for (const [celad, kategorie] of Object.entries(podkategorie)) {
    for (const [kategoria, polozky] of Object.entries(kategorie)) {
      for (const p of polozky) {
        const kluc = `${celad} › ${p}`;
        zaradenie.set(kluc, [...(zaradenie.get(kluc) ?? []), kategoria]);
      }
    }
  }
  /** Zaradenia, ktoré patria nejakej potravine rastlín. */
  const pouzite = new Set<string>();
  for (const p of rastliny) {
    const kluc = `${celade.get(p) ?? ""} › ${skupina.get(p) ?? p}`;
    pouzite.add(kluc);
    const k = zaradenie.get(kluc) ?? [];
    if (k.length !== 1) {
      chyby.push(`[6] potravina „${p}“ (${kluc}) je v ${k.length} podkategóriách${k.length ? `: ${k.join(", ")}` : ""}`);
    }
  }
  for (const kluc of zaradenie.keys()) {
    if (!pouzite.has(kluc)) chyby.push(`[6] v podkategóriách je „${kluc}“, taká potravina rastlín v tej čeľadi nie je`);
  }

  for (const [nazov, t] of Object.entries(triedy)) {
    for (const x of t) if (!triedyStromu.has(x)) chyby.push(`[7] „${x}“ v „${nazov}“ nie je trieda zo stromu`);
  }
  return chyby;
}

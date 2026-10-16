/**
 * Všetky texty rozhrania webu v každom jazyku. Slovenčina (`sk`) určuje tvar, ostatné jazyky ho musia
 * mať celý (typ `Texty`), takže chýbajúci preklad je chyba typecheck. Statické texty v web/index.html
 * odkazujú na kľúče cez data-t="cesta.ku.textu" (pozri web/jazyk.ts).
 *
 * Názvy uzlov stromu sa prekladajú inde (src/preklad.ts, src/data/strom.en.ts).
 */
import type { Jazyk } from "./preklad";
import { DOSTUPNOST, type List } from "./strom.types";

/** Slovenský tvar slova podľa počtu: 1, 2–4, 0 a 5+. */
const sk3 =
  (jeden: string, dva: string, pat: string) =>
  (n: number): string =>
    n === 1 ? jeden : n >= 2 && n <= 4 ? dva : pat;

/** Anglický tvar slova podľa počtu: 1, inak množné číslo. */
const en2 =
  (one: string, many: string) =>
  (n: number): string =>
    n === 1 ? one : many;

const sk = {
  jazyk: { nazov: "Slovenčina", kod: "SK", locale: "sk-SK" },
  prepinacJazyka: "Jazyk",
  stranky: { aria: "Stránky", strom: "Strom potravín", planovac: "Plánovač jedál" },

  /** Názvy úrovní stromu v poradí UROVNE. */
  urovne: [
    "ríša",
    "oddelenie / kmeň",
    "pododdelenie / podkmeň",
    "trieda",
    "nadklad",
    "klad",
    "podklad",
    "rad",
    "čeľaď",
    "podčeľaď",
    "tribus",
    "rod",
    "druh",
    "varieta / poddruh / skupina odrôd",
    "kultivar / plemeno",
    "jedlá časť",
    "potravina",
  ],
  dostupnost: { bežné: "bežné", "menej bežné": "menej bežné", exotické: "exotické" } satisfies Record<List, string>,
  /** Popis dostupnosti (title štítku), slovensky priamo z definície v src/strom.types.ts. */
  dostupnostPopis: DOSTUPNOST as Readonly<Record<List, string>>,
  /** Tlačidlá filtra dostupnosti. */
  filter: { aria: "Dostupnosť", bežné: "Bežné", "menej bežné": "Menej bežné", exotické: "Exotické" },
  /** Prepínač pohľadu Jednoduchý / Komplexný / Detailný. */
  podrobnost: {
    aria: "Podrobnosť",
    jednoduchy: "Jednoduchý",
    komplexny: "Komplexný",
    detailny: "Detailný",
    jednoduchyPopis: (urovne: string) => `Zjednodušené potraviny (všetky hrušky ako jedna hruška), úrovne: ${urovne}`,
    komplexnyPopis: "Celý strom bez uzlov „–“ a „∗“ a úrovní pod druhom, reťaze uzlov s jediným dieťaťom sú zlúčené",
    detailnyPopis: "Všetky uzly: aj „–“ a „∗“, úrovne pod druhom a reťaze uzlov s jediným dieťaťom",
    ostatneRise: "ostatné ríše",
    /** Úroveň jednoduchého pohľadu medzi čeľaďou a potravinou rastlín. */
    podkategoria: "podkategória",
    /** Položka „Rozbaliť po úroveň“ v jednoduchom pohľade. */
    hlbka: (i: number, nazvy: string) => `${i}. úroveň: ${nazvy}`,
  },
  znacky: { tbd: "nedoplnené", neexistuje: "neexistuje", nerozlisene: "nerozlíšené" },
  potraviny: sk3("potravina", "potraviny", "potravín"),
  /** „3 z 12 v jedle“ */
  zPoctu: (k: number, n: number, kde: string) => `${k} z ${n} ${kde}`,
  zBezCisla: (n: number) => ` z ${n}`,
  pocetTitul: (n: number, b: number, m: number, e: number) =>
    `${n} ${sk3("potravina", "potraviny", "potravín")(n)}: ${b} bežné, ${m} menej bežné, ${e} exotické`,

  strom: {
    titul: "Strom potravín",
    eyebrow: "food-groups · 17 taxonomických úrovní",
    nadpis: "Strom potravín",
    klikPred: "Klik na uzol ho zbalí alebo rozbalí, so",
    klikPo: "celý podstrom.",
    kruhPodtitul: "Veľkosť výseku zodpovedá počtu potravín. Klik na výsek ho priblíži, klik do stredu oddiali.",
    nastrojeAria: "Ovládanie stromu",
    pohladAria: "Zobrazenie",
    pohladStrom: "Strom",
    pohladKruh: "Kruh",
    rozbalitVsetko: "Rozbaliť všetko",
    zbalitVsetko: "Zbaliť všetko",
    rozbalitPo: "Rozbaliť po úroveň",
    rozbalitPoVyzva: "Rozbaliť po úroveň…",
    hladat: "Hľadať",
    hladatVyzva: "Hľadať potravinu alebo taxón…",
    legendaTbd: "úroveň existuje, ešte nie je doplnená",
    legendaPomer: "počet potravín, pomer",
    nenaslo: (q: string) => `Pre „${q}“ sa nenašla žiadna potravina ani taxón.`,
    nicVoFiltri: "Žiadna potravina nezodpovedá filtru.",
    zobrazene: (n: number) =>
      `${sk3("Zobrazená", "Zobrazené", "Zobrazených")(n)} ${n} ${sk3("potravina", "potraviny", "potravín")(n)}.`,
    statPotraviny: "potraviny",
    statUzly: "uzly stromu",
    prejstNa: (nazov: string) => `Prejsť na ${nazov}`,
  },

  kruh: {
    aria:
      "Kruhový diagram potravín. Šípky vľavo a vpravo vyberajú výsek v prstenci, hore a dole prechádzajú na rodiča a dieťa, Enter výsek priblíži, Escape oddiali o úroveň, Home ukáže celý graf.",
    celyGraf: "Celý graf",
    celyGrafTitul: "Späť na celý graf (Home)",
    vsetkyRise: "Všetky ríše",
    cestaAria: "Priblížená časť diagramu",
    klikPriblizi: "klik priblíži",
  },

  planovac: {
    titul: "Plánovač jedál",
    eyebrow: "food-groups · plánovač jedál",
    omrvinkyAria: "Kde som",
    nadpis: "Plánovač jedál",
    jedlaAria: "Jedlá plánu",
    nastrojeAria: "Ovládanie grafu",
    pohladAria: "Zobrazenie",
    pohladKruh: "Kruh",
    pohladStrom: "Strom",
    rozbalitVsetko: "Rozbaliť všetko",
    lenSuroviny: "Rozbaliť len suroviny",
    surovinyAria: "Suroviny",
    vJedle: "v jedle",
    vPlane: "v pláne",
    ostatne: "ostatné potraviny stromu",
    planNeexistuje: (plan: string) => `Plán „${plan}“ neexistuje.`,
    jedloNeexistuje: (jedlo: string, plan: string) => `Jedlo „${jedlo}“ v pláne „${plan}“ neexistuje.`,
    chybySuborov: "Niektoré súbory jedál majú chyby:",
    vsetkyPlany: "Všetky plány",
    podtitulPlan: (n: number) =>
      `${n} ${sk3("jedlo", "jedlá", "jedál")(n)}. Celý plán ukáže suroviny všetkých jedál naraz, klik na jedlo len jeho.`,
    podtitul:
      "Každý plán je priečinok v src/data/plany, každé jedlo v ňom samostatný JSON súbor. Suroviny jedál sú v strome potravín zelené.",
    ziadnyPlan: "Zatiaľ tu nie je žiadny plán. Vytvor priečinok src/data/plany/<plán>/ a v ňom JSON súbor pre každé jedlo.",
    jedla: sk3("jedlo", "jedlá", "jedál"),
    suroviny: sk3("surovina", "suroviny", "surovín"),
    celyPlan: "Celý plán",
    celyPlanPopis: "Suroviny všetkých jedál v jednom grafe",
    vsetkySuroviny: (n: number, plan: string) => `Všetky suroviny ${n} ${sk3("jedla", "jedál", "jedál")(n)} plánu ${plan}.`,
    statPotraviny: "potraviny",
    statDruhy: "druhy",
    statCelade: "čeľade",
    nieJeVStrome: (potravina: string) => `„${potravina}“ nie je v strome`,
    nicVoFiltri: "Žiadna potravina nezodpovedá filtru dostupnosti.",
    skrytaFiltrom: "V grafe ju skrýva filter dostupnosti.",
  },

  /** Chyby v súboroch jedál (src/jedla.ts); ukazuje ich plánovač a `npm run kontrola`. */
  chybyJedla: {
    obsah: "obsah musí byť objekt { nazov, suroviny }",
    neznamyKluc: (k: string) => `neznámy kľúč „${k}“`,
    chybaNazov: "chýba „nazov“",
    musiBytText: (k: string) => `„${k}“ musí byť text alebo objekt s prekladmi { "sk": …, "en": … }`,
    chybaSk: (k: string) => `„${k}“: chýba slovenský text „sk“`,
    neznamyJazyk: (k: string, j: string) => `„${k}“: neznámy jazyk „${j}“`,
    suroviny: "„suroviny“ musí byť neprázdny zoznam",
    surovina: (i: number) => `surovina ${i}`,
    surovinaObjekt: "musí byť objekt { potravina }",
    chybaPotravina: "chýba „potravina“",
    potravinaNieJe: (p: string) => `potravina „${p}“ nie je v strome`,
  },

  edit: {
    pasik: "EDIT MÓD",
    pasikPopis: "klik na štítok: bežné → menej bežné → exotické, zapíše sa do src/data/strom.ts",
    prepne: (na: string) => ` – klik prepne na ${na} a zapíše to do src/data/strom.ts`,
    nepodarilo: (sprava: string) => `Zmenu sa nepodarilo zapísať: ${sprava}`,
    /** Chyby zápisu (src/uprava.ts, vite.config.ts) podľa kódu. */
    chyby: {
      zakazane: () => "Edit mód prijíma len lokálne požiadavky z vlastnej stránky.",
      neplatne: () => "Neplatná požiadavka.",
      "neplatny-subor": () => "Súbor src/data/strom.ts sa nedá prečítať.",
      "ina-hodnota": (u: { kluc: string; hodnota: string; z: string }) =>
        `„${u.kluc}“ má hodnotu „${u.hodnota}“, nie „${u.z}“.`,
      nenaslo: (u: { cesta: string }) => `Potravina ${u.cesta} sa v strome nenašla.`,
    },
  },
};

export type Texty = typeof sk;
/** Kód chyby zápisu v edit móde. */
export type KodChybyUpravy = keyof Texty["edit"]["chyby"];

const en: Texty = {
  jazyk: { nazov: "English", kod: "EN", locale: "en-GB" },
  prepinacJazyka: "Language",
  stranky: { aria: "Pages", strom: "Food tree", planovac: "Meal planner" },

  urovne: [
    "kingdom",
    "division / phylum",
    "subdivision / subphylum",
    "class",
    "superclade",
    "clade",
    "subclade",
    "order",
    "family",
    "subfamily",
    "tribe",
    "genus",
    "species",
    "variety / subspecies / cultivar group",
    "cultivar / breed",
    "edible part",
    "food",
  ],
  dostupnost: { bežné: "common", "menej bežné": "less common", exotické: "exotic" },
  dostupnostPopis: {
    bežné: "in practically every supermarket",
    "menej bežné": "only in larger stores and hypermarkets, or only occasionally",
    exotické: "not available, or only in a specialist shop or catering wholesaler",
  },
  filter: { aria: "Availability", bežné: "Common", "menej bežné": "Less common", exotické: "Exotic" },
  podrobnost: {
    aria: "Level of detail",
    jednoduchy: "Simple",
    komplexny: "Full",
    detailny: "Detailed",
    jednoduchyPopis: (urovne) => `Simplified foods (all pears as one pear), levels: ${urovne}`,
    komplexnyPopis: "The whole tree without “–” and “∗” nodes and the levels below species; chains of single-child nodes are merged",
    detailnyPopis: "All nodes: including “–” and “∗”, the levels below species and chains of single-child nodes",
    ostatneRise: "other kingdoms",
    podkategoria: "subcategory",
    hlbka: (i, nazvy) => `level ${i}: ${nazvy}`,
  },
  znacky: { tbd: "not filled in", neexistuje: "does not exist", nerozlisene: "not distinguished" },
  potraviny: en2("food", "foods"),
  zPoctu: (k, n, kde) => `${k} of ${n} ${kde}`,
  zBezCisla: (n) => ` of ${n}`,
  pocetTitul: (n, b, m, e) => `${n} ${en2("food", "foods")(n)}: ${b} common, ${m} less common, ${e} exotic`,

  strom: {
    titul: "Food tree",
    eyebrow: "food-groups · 17 taxonomic levels",
    nadpis: "Food tree",
    klikPred: "Click a node to collapse or expand it; with",
    klikPo: "its whole subtree.",
    kruhPodtitul: "Segment size matches the number of foods. Click a segment to zoom in, click the centre to zoom out.",
    nastrojeAria: "Tree controls",
    pohladAria: "View",
    pohladStrom: "Tree",
    pohladKruh: "Sunburst",
    rozbalitVsetko: "Expand all",
    zbalitVsetko: "Collapse all",
    rozbalitPo: "Expand to level",
    rozbalitPoVyzva: "Expand to level…",
    hladat: "Search",
    hladatVyzva: "Search for a food or taxon…",
    legendaTbd: "level exists, not filled in yet",
    legendaPomer: "number of foods, ratio",
    nenaslo: (q) => `No food or taxon matches “${q}”.`,
    nicVoFiltri: "No food matches the filter.",
    zobrazene: (n) => `Showing ${n} ${en2("food", "foods")(n)}.`,
    statPotraviny: "foods",
    statUzly: "tree nodes",
    prejstNa: (nazov) => `Go to ${nazov}`,
  },

  kruh: {
    aria:
      "Sunburst chart of foods. Left and right arrows select a segment in the ring, up and down move to the parent and child, Enter zooms in, Escape zooms out one level, Home shows the whole chart.",
    celyGraf: "Whole chart",
    celyGrafTitul: "Back to the whole chart (Home)",
    vsetkyRise: "All kingdoms",
    cestaAria: "Zoomed-in part of the chart",
    klikPriblizi: "click to zoom in",
  },

  planovac: {
    titul: "Meal planner",
    eyebrow: "food-groups · meal planner",
    omrvinkyAria: "You are here",
    nadpis: "Meal planner",
    jedlaAria: "Meals in the plan",
    nastrojeAria: "Chart controls",
    pohladAria: "View",
    pohladKruh: "Sunburst",
    pohladStrom: "Tree",
    rozbalitVsetko: "Expand all",
    lenSuroviny: "Expand ingredients only",
    surovinyAria: "Ingredients",
    vJedle: "in the meal",
    vPlane: "in the plan",
    ostatne: "other foods in the tree",
    planNeexistuje: (plan) => `Plan “${plan}” does not exist.`,
    jedloNeexistuje: (jedlo, plan) => `Meal “${jedlo}” does not exist in plan “${plan}”.`,
    chybySuborov: "Some meal files have errors:",
    vsetkyPlany: "All plans",
    podtitulPlan: (n) =>
      `${n} ${en2("meal", "meals")(n)}. The whole plan shows the ingredients of all meals at once; click a meal to see only its own.`,
    podtitul:
      "Each plan is a folder in src/data/plany, each meal a separate JSON file in it. The meals’ ingredients are green in the food tree.",
    ziadnyPlan: "There are no plans yet. Create a folder src/data/plany/<plan>/ with one JSON file per meal.",
    jedla: en2("meal", "meals"),
    suroviny: en2("ingredient", "ingredients"),
    celyPlan: "Whole plan",
    celyPlanPopis: "Ingredients of all meals in one chart",
    vsetkySuroviny: (n, plan) => `All ingredients of the ${n} ${en2("meal", "meals")(n)} in plan ${plan}.`,
    statPotraviny: "foods",
    statDruhy: "species",
    statCelade: "families",
    nieJeVStrome: (potravina) => `“${potravina}” is not in the tree`,
    nicVoFiltri: "No food matches the availability filter.",
    skrytaFiltrom: "Hidden in the chart by the availability filter.",
  },

  chybyJedla: {
    obsah: "content must be an object { nazov, suroviny }",
    neznamyKluc: (k) => `unknown key “${k}”`,
    chybaNazov: "“nazov” is missing",
    musiBytText: (k) => `“${k}” must be text or an object with translations { "sk": …, "en": … }`,
    chybaSk: (k) => `“${k}”: the Slovak text “sk” is missing`,
    neznamyJazyk: (k, j) => `“${k}”: unknown language “${j}”`,
    suroviny: "“suroviny” must be a non-empty list",
    surovina: (i) => `ingredient ${i}`,
    surovinaObjekt: "must be an object { potravina }",
    chybaPotravina: "“potravina” is missing",
    potravinaNieJe: (p) => `food “${p}” is not in the tree`,
  },

  edit: {
    pasik: "EDIT MODE",
    pasikPopis: "click a label: common → less common → exotic, saved to src/data/strom.ts",
    prepne: (na) => ` – click to switch to ${na} and save it to src/data/strom.ts`,
    nepodarilo: (sprava) => `Could not save the change: ${sprava}`,
    chyby: {
      zakazane: () => "Edit mode only accepts local requests from its own page.",
      neplatne: () => "Invalid request.",
      "neplatny-subor": () => "The file src/data/strom.ts cannot be read.",
      "ina-hodnota": (u) => `“${u.kluc}” has the value “${u.hodnota}”, not “${u.z}”.`,
      nenaslo: (u) => `Food ${u.cesta} was not found in the tree.`,
    },
  },
};

export const TEXTY: Readonly<Record<Jazyk, Texty>> = { sk, en };

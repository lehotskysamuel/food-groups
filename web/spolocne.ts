/**
 * Typy a pomocné funkcie, ktoré zdieľa zobrazenie stromu (main.ts), kruhový diagram (kruh.ts)
 * a plánovač jedál (planovac.ts).
 */
import { podkategorie, triedy, zjednodusene } from "../src/data/zjednodusene";
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
  /** Názov úrovne uzla, ktorý nie je z UROVNE (jednoduchý pohľad: podkategória). */
  readonly urovenNazov?: string;
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
  /** Jednoduchý pohľad: potraviny stromu zlúčené do tejto zjednodušenej potraviny (src/data/zjednodusene.ts). */
  readonly clenovia?: readonly Uzol[];
}

export type Pocty = Readonly<Record<List, number>>;

export interface Nastavenia {
  /** Zobrazené dostupnosti; potraviny s inou dostupnosťou sa skryjú. */
  dost: ReadonlySet<List>;
  /** Hľadaný text po `norm`, prázdny = bez hľadania. */
  q: string;
  /** Jednoduchý, komplexný alebo detailný pohľad (pozri zobraz). */
  podrobnost: Podrobnost;
}

/** Úroveň jednoduchého pohľadu medzi ríšou a zjednodušenou potravinou: úroveň stromu alebo podkategória rastlín. */
type JednoduchaUroven = "trieda" | "čeľaď" | "podkategória";

/**
 * Jednoduchý pohľad: úrovne medzi ríšou a zjednodušenou potravinou, `ostatné` pre ríše, ktoré nie sú uvedené
 * (huby, chromisty a baktérie sú malé, stačí im čeľaď).
 */
const JEDNODUCHE_UROVNE: { readonly [risa: string]: readonly JednoduchaUroven[]; readonly ostatné: readonly JednoduchaUroven[] } = {
  živočíchy: ["trieda", "čeľaď"],
  rastliny: ["čeľaď", "podkategória"],
  ostatné: ["čeľaď"],
};

/** Pohľady na strom (pozri zobraz), v poradí prepínača. */
export const PODROBNOSTI = {
  jednoduchy: {
    nazov: "Jednoduchý",
    popis: `Zjednodušené potraviny (všetky hrušky ako jedna hruška), úrovne: ${Object.entries(JEDNODUCHE_UROVNE)
      .map(([risa, u]) => [risa === "ostatné" ? "ostatné ríše" : risa, ...u, "potravina"].join(" › "))
      .join("; ")}`,
  },
  komplexny: { nazov: "Komplexný", popis: "Celý strom bez uzlov „–“ a „∗“ a úrovní pod druhom, reťaze uzlov s jediným dieťaťom sú zlúčené" },
  detailny: { nazov: "Detailný", popis: "Všetky uzly: aj „–“ a „∗“, úrovne pod druhom a reťaze uzlov s jediným dieťaťom" },
} as const satisfies Record<string, { readonly nazov: string; readonly popis: string }>;

export type Podrobnost = keyof typeof PODROBNOSTI;

/** Jednoduchý pohľad: názvy úrovní pod ríšou podľa hĺbky (index 0 = 2. úroveň), napr. ["trieda, čeľaď", …, "potravina"]. */
export function hlbkyJednoduche(): string[] {
  const urovne = Object.values(JEDNODUCHE_UROVNE);
  const hlbka = Math.max(...urovne.map((u) => u.length)) + 1;
  return Array.from({ length: hlbka }, (_, i) => [...new Set(urovne.map((u) => u[i] ?? "potravina"))].join(", "));
}

/** Prepínač pohľadu: naplní `skupina` tlačidlami (ako Strom / Kruh), zapne `hodnota` a pri zmene zavolá `zmena`. */
export function prepinajPodrobnost(skupina: HTMLElement, hodnota: Podrobnost, zmena: (p: Podrobnost) => void): void {
  const tlacidla = (Object.keys(PODROBNOSTI) as Podrobnost[]).map((p) => {
    const b = el("button", undefined, PODROBNOSTI[p].nazov);
    b.type = "button";
    b.title = PODROBNOSTI[p].popis;
    b.dataset["podrobnost"] = p;
    return b;
  });
  const nastav = (p: Podrobnost): void => tlacidla.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset["podrobnost"] === p)));
  skupina.replaceChildren(...tlacidla);
  nastav(hodnota);
  skupina.addEventListener("click", (e) => {
    const b = (e.target as Element).closest<HTMLButtonElement>("button[data-podrobnost]");
    if (!b || b.getAttribute("aria-pressed") === "true") return;
    const p = b.dataset["podrobnost"] as Podrobnost;
    nastav(p);
    zmena(p);
  });
}

/** Predvolene zapnuté dostupnosti: exotické potraviny sú skryté, kým ich používateľ nezapne. */
export const PREDVOLENA_DOST: readonly List[] = DOSTUPNOSTI.filter((d) => d !== "exotické");

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
 * Jednoduchý pohľad (predvolený): ríša, úrovne z JEDNODUCHE_UROVNE pre danú ríšu a zjednodušená potravina.
 * Potraviny sa zlúčia do zjednodušených potravín (všetky hrušky → hruška), zjednodušená potravina má
 * dostupnosť svojej najdostupnejšej potraviny a počíta sa ako jedna. Úrovne:
 * - trieda a čeľaď sú zo stromu; triedy z `triedy` sa zobrazia spolu (kostnaté a chrupkokostnaté → ryby),
 *   značku zastúpi najbližší pomenovaný predok pod predchádzajúcou zobrazenou úrovňou, inak sa vynechá,
 * - podkategória rastlín (jadroviny, hlúbová zelenina…) je z `podkategorie`.
 * Všetko je v src/data/zjednodusene.ts.
 *
 * Komplexný pohľad:
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
  if (nast.podrobnost === "jednoduchy") return jednoduchy(u, nast, JEDNODUCHE_UROVNE[u.nazov] ?? JEDNODUCHE_UROVNE.ostatné);
  const zhoda = nast.q !== "" && u.hladat.includes(nast.q);
  const pok = pokryte || zhoda || nast.q === "";
  if (u.dostupnost) {
    if (!pok || !nast.dost.has(u.dostupnost)) return [];
    return [{ u, deti: [], pocty: { ...nulovePocty(), [u.dostupnost]: 1 }, zhoda, retazec: [] }];
  }
  const deti = u.deti.flatMap((d) => zobraz(d, nast, pok, ploche || u.uroven >= DRUH));
  if (deti.length === 0) return [];
  if (nast.podrobnost !== "detailny") {
    const skryty =
      ploche || u.nazov === ZNACKY.NEEXISTUJE || (u.uroven === DRUH && u.nazov === ZNACKY.NEROZLISENE);
    if (skryty) return deti;
    const jedine = deti.length === 1 ? deti[0] : undefined;
    if (jedine && !jedine.u.dostupnost && u.uroven > 0) {
      return [{ ...jedine, zhoda: zhoda || jedine.zhoda, retazec: [u, ...jedine.retazec] }];
    }
  }
  return [{ u, deti, pocty: spocitaj(deti), zhoda, retazec: [] }];
}


/** Zjednodušená potravina: uzol, ktorý ju zobrazuje, a potraviny stromu, ktoré zastupuje. */
interface Skupina {
  readonly u: Uzol;
  readonly clenovia: readonly Uzol[];
}

/** Názov potraviny → názov zjednodušenej potraviny. */
const SKUPINA_POTRAVINY = new Map<string, string>(
  Object.entries(zjednodusene).flatMap(([skupina, potraviny]) => potraviny.map((p): [string, string] => [p, skupina])),
);

/** Trieda → názov, pod ktorým sa zobrazí spolu s inými triedami (kostnaté → ryby). */
const SKUPINA_TRIEDY = new Map<string, string>(
  Object.entries(triedy).flatMap(([skupina, t]) => t.map((x): [string, string] => [x, skupina])),
);

/** Zaradenie zjednodušenej potraviny do podkategórie; poradie je poradie v dátach (podkategórie aj potraviny v nej). */
interface Zaradenie {
  readonly kategoria: string;
  readonly poradieKategorie: number;
  readonly poradie: number;
}

/** Čeľaď → (zjednodušená potravina → zaradenie). */
const PODKATEGORIE = new Map<string, ReadonlyMap<string, Zaradenie>>(
  Object.entries(podkategorie as Readonly<Record<string, Readonly<Record<string, readonly string[]>>>>).map(
    ([celad, kategorie]) => [
      celad,
      new Map(
        Object.entries(kategorie).flatMap(([kategoria, polozky], poradieKategorie) =>
          polozky.map((p, poradie): [string, Zaradenie] => [p, { kategoria, poradieKategorie, poradie }]),
        ),
      ),
    ],
  ),
);

const CELAD = UROVNE.indexOf("čeľaď");

const skupinyPodstromu = new WeakMap<Uzol, ReadonlyMap<string, Skupina>>();

/** Názov potraviny → jej zjednodušená potravina, pre potraviny v podstrome `koren` (raz pre každý strom, aj po HMR). */
function skupiny(koren: Uzol): ReadonlyMap<string, Skupina> {
  const hotove = skupinyPodstromu.get(koren);
  if (hotove) return hotove;
  const clenovia = new Map<string, Uzol[]>();
  for (const x of vsetky([koren])) {
    const nazov = x.dostupnost ? SKUPINA_POTRAVINY.get(x.nazov) : undefined;
    if (nazov !== undefined) clenovia.set(nazov, [...(clenovia.get(nazov) ?? []), x]);
  }
  const m = new Map<string, Skupina>();
  for (const [nazov, listy] of clenovia) {
    const prvy = listy[0];
    const dostupnost = DOSTUPNOSTI.find((d) => listy.some((l) => l.dostupnost === d));
    if (!prvy || !dostupnost) continue;
    const u: Uzol = { id: `${prvy.id}${SEP}≡${nazov}`, nazov, uroven: prvy.uroven, deti: [], dostupnost, znacka: false, hladat: norm(nazov) };
    const skupina: Skupina = { u, clenovia: listy };
    for (const l of listy) m.set(l.nazov, skupina);
  }
  skupinyPodstromu.set(koren, m);
  return m;
}

/** Uzol, ktorý v strome nie je (ryby, podkategória); id je pod `rodic`, aby sa nezrazilo so skutočným uzlom. */
const umely = (rodic: Uzol, nazov: string, uroven: number, urovenNazov?: string): Uzol => ({
  id: `${rodic.id}${SEP}≡${nazov}`,
  nazov,
  uroven,
  deti: [],
  dostupnost: undefined,
  znacka: false,
  hladat: norm(nazov),
  ...(urovenNazov === undefined ? {} : { urovenNazov }),
});

/** Zjednodušená potravina pred zaradením do pohľadu. */
interface Potravina {
  readonly u: Uzol;
  readonly clenovia: readonly Uzol[] | undefined;
  /** Cesta od ríše k jej prvej potravine (všetky sú v tej istej čeľadi). */
  readonly cesta: readonly Uzol[];
  /** Niektorá jej potravina alebo jej predok zodpovedá hľadaniu. */
  pokryta: boolean;
  /** Názov zjednodušenej potraviny alebo niektorej jej potraviny zodpovedá hľadaniu. */
  zhoda: boolean;
}

/** Vetva jednoduchého pohľadu počas stavania. */
interface Vetva {
  readonly u: Uzol;
  readonly deti: Map<string, Vetva>;
  /** Potraviny a ich poradie (v podkategórii podľa dát, inak 0, teda v poradí stromu). */
  readonly potraviny: [VUzol, number][];
  /** Poradie medzi súrodencami (podkategórie podľa dát, inak 0, teda v poradí stromu). */
  readonly poradie: number;
}

/** Jednoduchý pohľad jednej ríše (pozri zobraz). */
function jednoduchy(risa: Uzol, nast: Nastavenia, urovne: readonly JednoduchaUroven[]): VUzol[] {
  const q = nast.q;
  const sk = skupiny(risa);
  const potraviny = new Map<string, Potravina>();
  const prejdi = (u: Uzol, cesta: readonly Uzol[], pokryte: boolean): void => {
    const pok = pokryte || (q !== "" && u.hladat.includes(q));
    if (!u.dostupnost) {
      for (const d of u.deti) prejdi(d, [...cesta, d], pok);
      return;
    }
    const s = sk.get(u.nazov);
    const kluc = s ? s.u.id : u.id;
    const p = potraviny.get(kluc) ?? { u: s ? s.u : u, clenovia: s?.clenovia, cesta, pokryta: false, zhoda: false };
    p.pokryta ||= pok;
    p.zhoda ||= q !== "" && (u.hladat.includes(q) || p.u.hladat.includes(q));
    potraviny.set(kluc, p);
  };
  prejdi(risa, [risa], q === "");

  const zaradenie = (p: Potravina): Zaradenie | undefined => PODKATEGORIE.get(p.cesta[CELAD]?.nazov ?? "")?.get(p.u.nazov);

  /** Uzol zjednodušenej potraviny na úrovni `uroven` (undefined = úroveň sa v tejto vetve vynechá). */
  const uzolNaUrovni = (p: Potravina, uroven: JednoduchaUroven, predosla: number): Uzol | undefined => {
    if (uroven === "podkategória") {
      const celad = p.cesta[CELAD];
      const z = zaradenie(p);
      return celad && z ? umely(celad, z.kategoria, CELAD + 1, "podkategória") : undefined;
    }
    const i = UROVNE.indexOf(uroven);
    // Značku zastúpi najbližší pomenovaný predok pod predchádzajúcou zobrazenou úrovňou.
    for (let j = i; j > predosla; j--) {
      const u = p.cesta[j];
      if (!u || u.znacka) continue;
      const skupina = j === i ? SKUPINA_TRIEDY.get(u.nazov) : undefined;
      return skupina && uroven === "trieda" ? umely(risa, skupina, i) : u;
    }
    return undefined;
  };

  const koren: Vetva = { u: risa, deti: new Map(), potraviny: [], poradie: 0 };
  for (const p of potraviny.values()) {
    const dost = p.u.dostupnost;
    if (!dost || !nast.dost.has(dost)) continue;
    const z = zaradenie(p);
    let vetva = koren;
    let predosla = 0;
    let vPodkategorii = false;
    let pokryta = p.pokryta || p.zhoda;
    for (const uroven of urovne) {
      const u = uzolNaUrovni(p, uroven, predosla);
      if (uroven !== "podkategória") predosla = UROVNE.indexOf(uroven);
      if (!u) continue;
      vPodkategorii = uroven === "podkategória";
      pokryta ||= q !== "" && u.hladat.includes(q);
      const dalsia = vetva.deti.get(u.id) ?? { u, deti: new Map(), potraviny: [], poradie: vPodkategorii ? (z?.poradieKategorie ?? 0) : 0 };
      vetva.deti.set(u.id, dalsia);
      vetva = dalsia;
    }
    if (!pokryta) continue;
    const v: VUzol = { u: p.u, deti: [], pocty: { ...nulovePocty(), [dost]: 1 }, zhoda: p.zhoda, retazec: [] };
    vetva.potraviny.push([p.clenovia ? { ...v, clenovia: p.clenovia } : v, vPodkategorii ? (z?.poradie ?? 0) : 0]);
  }

  const vuzol = (vetva: Vetva): VUzol | undefined => {
    const deti = [
      ...[...vetva.deti.values()].sort((a, b) => a.poradie - b.poradie).flatMap((d) => vuzol(d) ?? []),
      ...vetva.potraviny.sort((a, b) => a[1] - b[1]).map(([v]) => v),
    ];
    if (deti.length === 0) return undefined;
    return { u: vetva.u, deti, pocty: spocitaj(deti), zhoda: q !== "" && vetva.u.hladat.includes(q), retazec: [] };
  };
  const v = vuzol(koren);
  return v ? [v] : [];
}

function spocitaj(deti: readonly VUzol[]): Pocty {
  const pocty = nulovePocty();
  for (const d of deti) for (const k of DOSTUPNOSTI) pocty[k] += d.pocty[k];
  return pocty;
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

export const nazovUrovne = (u: Uzol): string => u.urovenNazov ?? UROVNE[u.uroven] ?? "";

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

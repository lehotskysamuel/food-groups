/**
 * Botanický, mykologický a zoologický strom potravín.
 *
 * Strom má pevnú hĺbku 17 úrovní. Kľúč objektu je názov uzla na danej úrovni,
 * hodnota je objekt s uzlami nasledujúcej úrovne. Hodnota listu (úroveň 17) hovorí,
 * aká dostupná je potravina na slovenskom trhu: bežná, menej bežná alebo exotická (pozri DOSTUPNOST).
 * Z hĺbky uzla vyplýva jeho rank, preto ho netreba ukladať.
 *
 * Názvy uzlov: slovensky > česky > latinsky.
 */

/** Špeciálne názvy uzlov pre úrovne bez skutočného taxónu. */
export const ZNACKY = {
  /** Úroveň pre túto líniu neexistuje (napr. žiadny pomenovaný klad medzi triedou a radom). */
  NEEXISTUJE: "-",
  /** Úroveň existuje, ale ešte nie je doplnená. */
  TBD: "TBD",
  /** Úroveň existuje, ale nerozlišujeme ju (všeobecná potravina, napr. akákoľvek brokolica). */
  NEROZLISENE: "*",
} as const;

export type Znacka = (typeof ZNACKY)[keyof typeof ZNACKY];

/** Objekt, ktorého kľúče sú názvy uzlov jednej úrovne a hodnoty sú uzly nasledujúcej úrovne. */
type Uzly<Dalsia> = { readonly [nazov: string]: Dalsia };

/**
 * Hodnoty listu: ako ľahko sa potravina zoženie v bežnom supermarkete na Slovensku, v poradí
 * od najdostupnejšej. Hodnotí sa v akejkoľvek podobe, v ktorej je hlavnou zložkou (čerstvá, sušená,
 * mrazená, sterilizovaná…), sezónna potravina v sezóne. „Menej bežné“ hovorí o dostupnosti, nie
 * o pôvode, patria sem aj domáce potraviny, ktoré sa ťažko zháňajú (egreš). Pravidlá sú v README.
 */
export const DOSTUPNOST = {
  bežné: "v podstate v každom supermarkete",
  "menej bežné": "len vo väčších predajniach, hypermarketoch, e-shopoch a podobne",
  exotické: "nedá sa kúpiť alebo len v špecializovanom obchode",
} as const;

/** Hodnota listu: dostupnosť potraviny. */
export type List = keyof typeof DOSTUPNOST;

/** Hodnoty listu v poradí bežné → menej bežné → exotické. */
export const DOSTUPNOSTI = Object.keys(DOSTUPNOST) as readonly List[];

/** 17 – potravina (list). Názov musí byť skutočná potravina, nie značka. */
export type U17_Potravina = Uzly<List> & { readonly [Z in Znacka]?: never };
/** 16 – jedlá časť (plod, semeno, list, koreň, súkvetie…). */
export type U16_JedlaCast = Uzly<U17_Potravina>;
/** 15 – kultivar / plemeno (aj neformálna skupina odrôd, napr. podľa farby). */
export type U15_Kultivar = Uzly<U16_JedlaCast>;
/** 14 – varieta, poddruh alebo formálna skupina odrôd. */
export type U14_Varieta = Uzly<U15_Kultivar>;
/** 13 – druh. */
export type U13_Druh = Uzly<U14_Varieta>;
/** 12 – rod. */
export type U12_Rod = Uzly<U13_Druh>;
/** 11 – tribus. */
export type U11_Tribus = Uzly<U12_Rod>;
/** 10 – podčeľaď. */
export type U10_Podcelad = Uzly<U11_Tribus>;
/** 9 – čeľaď. */
export type U09_Celad = Uzly<U10_Podcelad>;
/** 8 – rad. */
export type U08_Rad = Uzly<U09_Celad>;
/** 7 – podklad (napr. fabidy, malvidy, lamiidy, kampanulidy). */
export type U07_Podklad = Uzly<U08_Rad>;
/** 6 – klad (napr. rosidy, asteridy, komelinidy). */
export type U06_Klad = Uzly<U07_Podklad>;
/** 5 – nadklad (napr. superrosidy, superasteridy). */
export type U05_Nadklad = Uzly<U06_Klad>;
/** 4 – trieda. */
export type U04_Trieda = Uzly<U05_Nadklad>;
/** 3 – pododdelenie / podkmeň. */
export type U03_Pododdelenie = Uzly<U04_Trieda>;
/** 2 – oddelenie / kmeň. */
export type U02_Oddelenie = Uzly<U03_Pododdelenie>;
/** 1 – ríša. */
export type U01_Risa = Uzly<U02_Oddelenie>;

/** Celý strom: objekt, ktorého kľúče sú ríše. */
export type Strom = U01_Risa;

/** Zjednotenie názvov všetkých listov (potravín) konkrétneho stromu. */
export type Potravina<T> = T extends List
  ? never
  : { [K in keyof T & string]: T[K] extends List ? K : Potravina<T[K]> }[keyof T & string];

/** Názvy úrovní v poradí od koreňa (index 0 = úroveň 1). */
export const UROVNE = [
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
] as const;

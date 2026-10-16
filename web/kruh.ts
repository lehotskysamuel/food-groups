/**
 * Kruhový diagram (sunburst) aktuálneho pohľadu: každý prstenec je jedna úroveň, veľkosť výseku
 * zodpovedá počtu potravín. Hover (aj výber šípkami) ukáže bublinu s názvom výseku a všetkých jeho
 * predkov. Klik na výsek ho priblíži (stane sa stredom), klik do stredu oddiali o úroveň.
 *
 * Farba: ríša dáva odtieň (rovnaké tokeny ako strom), hĺbka svetlosť a poloha v ríši jemný posun
 * odtieňa. Poloha sa počíta z celého stromu, takže filter ani hľadanie farby neprefarbia.
 * So zvýraznením (plánovač jedál) sú zelené výseky, ktoré obsahujú zvýraznenú potravinu, ostatné sivé.
 */
import { ZNACKY } from "../src/strom.types";
import { RISE, TRIEDA, el, nazovUrovne, pocetEl, sklon, sucet, znacka } from "./spolocne";
import type { Uzol, VUzol } from "./spolocne";

const SVG = "http://www.w3.org/2000/svg";
const TAU = Math.PI * 2;
const FARBY_RIS = ["--risa-rastliny", "--risa-huby", "--risa-zivocichy", "--risa-chromisty", "--risa-bakterie"];

/** Písmo štítkov; musí sedieť s CSS (.kruh text), lebo šírka sa meria na canvase. */
const PISMO = {
  bezne: { font: "500 11.5px 'IBM Plex Sans', system-ui, sans-serif", px: 11.5 },
  risa: { font: "600 15px Spectral, Georgia, serif", px: 15 },
} as const;

const bezPohybu = window.matchMedia("(prefers-reduced-motion: reduce)");

/** Zvýraznené potraviny (suroviny jedla alebo plánu). */
export interface Zvyraznenie {
  /** Id zvýraznených listov (Uzol.id). */
  readonly listy: ReadonlySet<string>;
  /** Čo zvýraznenie znamená, napr. „v jedle“. */
  readonly popis: string;
  /** Text k zvýraznenej potravine do bubliny (napr. „bryndza · 250 g“). */
  readonly detail?: (id: string) => string | undefined;
}

interface Vysek {
  readonly i: number;
  readonly v: VUzol;
  readonly rodic: Vysek | undefined;
  readonly deti: Vysek[];
  /** Prstenec: 0 = ríša. */
  readonly hlbka: number;
  /** Rozsah výseku ako podiel všetkých zobrazených potravín. */
  readonly x0: number;
  readonly x1: number;
  /** Index ríše v RISE (farba) a jej názov (rozptyl odtieňa). */
  readonly risa: number;
  readonly kral: string;
  /** Najväčšia hĺbka v podstrome. */
  spodok: number;
  /** Počet zvýraznených potravín v podstrome. */
  zvyraznene: number;
  farba: string;
  /** Výsek je svetlý, text na ňom má byť tmavý. */
  tmavyText: boolean;
}

/** Zobrazená časť: rozsah [a0, a1] sa roztiahne na celý kruh, prstenec h0 je najvnútornejší. */
interface Okno {
  a0: number;
  a1: number;
  h0: number;
  hrubka: number;
}

interface Tvar {
  a0: number;
  a1: number;
  r0: number;
  r1: number;
}

const clamp = (x: number, min: number, max: number): number => Math.min(max, Math.max(min, x));
const f = (n: number): string => String(Math.round(n * 100) / 100);

/** sRGB hex → OKLCH [L, C, H°]. */
function oklch(hex: string): [number, number, number] {
  const m = /^#([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m?.[1]) return [0.55, 0.08, 170];
  const n = parseInt(m[1], 16);
  const lin = (c: number): number => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const [r, g, b] = [lin(n >> 16), lin((n >> 8) & 255), lin(n & 255)];
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const mm = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * mm - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * mm + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * mm - 0.808675766 * s;
  return [L, Math.hypot(A, B), ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360];
}

/** SVG cesta výseku medzikružia (uhly od 12 hodín v smere hodín). */
function obluk({ a0, a1, r0, r1 }: Tvar): string {
  if (a1 - a0 >= TAU - 1e-6) {
    // Celý prstenec: vonkajší kruh v smere hodín, vnútorný proti nemu (diera).
    return (
      `M0,${f(-r1)}A${f(r1)},${f(r1)} 0 1 1 0,${f(r1)}A${f(r1)},${f(r1)} 0 1 1 0,${f(-r1)}` +
      `M0,${f(-r0)}A${f(r0)},${f(r0)} 0 1 0 0,${f(r0)}A${f(r0)},${f(r0)} 0 1 0 0,${f(-r0)}Z`
    );
  }
  const v = a1 - a0 > Math.PI ? 1 : 0;
  const [s0, c0, s1, c1] = [Math.sin(a0), Math.cos(a0), Math.sin(a1), Math.cos(a1)];
  return (
    `M${f(r1 * s0)},${f(-r1 * c0)}A${f(r1)},${f(r1)} 0 ${v} 1 ${f(r1 * s1)},${f(-r1 * c1)}` +
    `L${f(r0 * s1)},${f(-r0 * c1)}A${f(r0)},${f(r0)} 0 ${v} 0 ${f(r0 * s0)},${f(-r0 * c0)}Z`
  );
}

const svg = <K extends keyof SVGElementTagNameMap>(tag: K, cls?: string): SVGElementTagNameMap[K] => {
  const e = document.createElementNS(SVG, tag);
  if (cls) e.setAttribute("class", cls);
  return e;
};

/** Text výseku: názov, pri značke jej znak. */
const stitok = (u: Uzol): string => (u.znacka ? znacka(u).znak : u.nazov);

export class Kruh {
  private readonly plocha: SVGSVGElement;
  private readonly gVyseky = svg("g", "vyseky");
  private readonly gZhody = svg("g", "zhody");
  private readonly gStitky = svg("g", "stitky");
  private readonly gStred = svg("g", "stred");
  private readonly obrys = svg("path", "obrys");
  private readonly navigacia = el("nav", "kruh-cesta");
  /** Návrat na celý graf (stred vracia len o úroveň vyššie). */
  private readonly domov = el("button", "kruh-domov");
  private readonly bublina = el("div", "kruh-bublina");
  private readonly meradlo = document.createElement("canvas").getContext("2d");

  private vyseky: Vysek[] = [];
  private cesty: SVGPathElement[] = [];
  private texty = new Map<number, SVGTextElement>();
  private zhody: [Vysek, SVGPathElement][] = [];
  /** Najväčšia hĺbka celého pohľadu. */
  private spodok = 0;
  private spolu = 0;

  private fokus: Vysek | undefined;
  /** Id uzla v strede; prežije prekreslenie (filter, hľadanie, HMR). */
  private fokusId: string | undefined;
  private okno: Okno = { a0: 0, a1: 1, h0: 0, hrubka: 0 };
  private animacia = 0;
  private R = 0;
  private diera = 0;

  /** Výsek pod myšou alebo vybraný šípkami (zvýraznený s predkami, má bublinu). */
  private aktivny: Vysek | undefined;
  private dotyk = false;

  private koren: readonly Uzol[] | undefined;
  private zvyraznenie: Zvyraznenie | undefined;
  /** Stred podstromu uzla v rámci jeho ríše (0–1) podľa celého stromu. */
  private poloha = new Map<string, number>();
  /** Rozptyl odtieňa ríše v stupňoch (väčšia ríša, väčší rozptyl). */
  private rozptyl = new Map<string, number>();

  constructor(private readonly kontajner: HTMLElement) {
    this.plocha = svg("svg");
    this.plocha.setAttribute("tabindex", "0");
    this.plocha.setAttribute(
      "aria-label",
      "Kruhový diagram potravín. Šípky vľavo a vpravo vyberajú výsek v prstenci, hore a dole prechádzajú na rodiča a dieťa, Enter výsek priblíži, Escape oddiali o úroveň, Home ukáže celý graf.",
    );
    this.plocha.append(this.gVyseky, this.gZhody, this.obrys, this.gStitky, this.gStred);
    this.bublina.hidden = true;
    this.bublina.setAttribute("role", "tooltip");
    this.bublina.setAttribute("aria-live", "polite");
    this.domov.type = "button";
    this.domov.setAttribute("aria-label", "Celý graf");
    this.domov.append(el("span", undefined, "⤒"), el("span", "text", "Celý graf"));
    this.domov.hidden = true;
    this.domov.title = "Späť na celý graf (Home)";
    const obal = el("div", "kruh-obal");
    obal.append(this.plocha, this.domov);
    kontajner.append(this.navigacia, obal);
    document.body.append(this.bublina);

    this.plocha.addEventListener("pointerdown", (e) => (this.dotyk = e.pointerType !== "mouse"));
    this.plocha.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      const s = this.ciel(e.target);
      if (s) this.aktivuj(s, e.clientX, e.clientY);
      else this.aktivuj(undefined);
    });
    this.plocha.addEventListener("pointerleave", (e) => {
      if (e.pointerType === "mouse") this.aktivuj(undefined);
    });
    this.plocha.addEventListener("click", (e) => this.klik(e));
    this.plocha.addEventListener("keydown", (e) => this.klaves(e));
    this.plocha.addEventListener("focus", () => {
      // Len fokus z klávesnice vyberie prvý výsek, klik myšou nie.
      if (this.aktivny || !this.plocha.matches(":focus-visible")) return;
      const prvy = this.viditelne().find((s) => s.hlbka === this.okno.h0);
      if (prvy) this.aktivuj(prvy);
    });
    this.plocha.addEventListener("blur", () => this.aktivuj(undefined));
    this.domov.addEventListener("click", () => {
      // Tlačidlo po kliknutí zmizne, fokus prejde na diagram.
      const fokusovane = document.activeElement === this.domov;
      this.priblizit(undefined);
      if (fokusovane) this.plocha.focus();
    });
    this.navigacia.addEventListener("click", (e) => {
      const b = (e.target as Element).closest<HTMLButtonElement>("button[data-i]");
      if (!b) return;
      const i = Number(b.dataset["i"]);
      this.priblizit(i < 0 ? undefined : this.vyseky[i]);
    });
    window.addEventListener("scroll", () => this.aktivuj(undefined), { passive: true });
    // Na dotyku bublinu zavrie ťuknutie mimo diagramu.
    document.addEventListener("pointerdown", (e) => {
      if (!(e.target instanceof Node && this.plocha.contains(e.target))) this.aktivuj(undefined);
    });
    new ResizeObserver(() => this.rozmer()).observe(this.plocha);
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => this.prefarbi());
    void document.fonts.ready.then(() => {
      this.stitky();
      this.stred();
    });
  }

  /**
   * Nový pohľad (po filtri, hľadaní, prepnutí detailu alebo zmene dát). Priblíženie sa zachová, ak uzol ešte existuje.
   * So zvýraznením sú zelené výseky so zvýraznenými potravinami a ostatné sivé.
   */
  nastav(pohlad: readonly VUzol[], koren: readonly Uzol[], zvyraznenie?: Zvyraznenie): void {
    if (koren !== this.koren) {
      this.koren = koren;
      this.spocitajPolohy(koren);
    }
    this.zvyraznenie = zvyraznenie;
    cancelAnimationFrame(this.animacia);
    this.plocha.classList.remove("prechod");
    this.aktivuj(undefined);
    this.rozloz(pohlad);

    const id = this.fokusId;
    this.fokus = id === undefined ? undefined : this.vyseky.find((s) => s.v.u.id === id || s.v.retazec.some((u) => u.id === id));
    if (this.fokus && this.fokus.deti.length === 0) this.fokus = this.fokus.rodic;
    this.fokusId = this.fokus?.v.u.id;

    this.cesty = this.vyseky.map((s) => {
      const p = svg("path", s.deti.length ? undefined : "list");
      p.dataset["i"] = String(s.i);
      return p;
    });
    this.gVyseky.replaceChildren(...this.cesty);
    this.zhody = this.vyseky.filter((s) => s.v.zhoda).map((s) => [s, svg("path")]);
    this.gZhody.replaceChildren(...this.zhody.map(([, p]) => p));
    // Nič nezodpovedá filtru: diagram zmizne, správu ukáže #info.
    this.kontajner.classList.toggle("prazdny", this.vyseky.length === 0);

    this.prefarbi();
    this.rozmer();
  }

  // ---------- rozloženie ----------

  private rozloz(pohlad: readonly VUzol[]): void {
    const vyseky: Vysek[] = [];
    const celkom = pohlad.reduce((a, v) => a + sucet(v.pocty), 0);
    const spolu = celkom || 1;
    let x = 0;
    const pridaj = (v: VUzol, rodic: Vysek | undefined, hlbka: number, kral: string): Vysek => {
      const n = sucet(v.pocty);
      const s: Vysek = {
        i: vyseky.length,
        v,
        rodic,
        deti: [],
        hlbka,
        x0: x / spolu,
        x1: (x + n) / spolu,
        risa: Math.max(0, RISE.indexOf(kral)),
        kral,
        spodok: hlbka,
        zvyraznene: v.deti.length === 0 && this.zvyraznenePotraviny(v).length ? 1 : 0,
        farba: "",
        tmavyText: false,
      };
      vyseky.push(s);
      if (v.deti.length === 0) x += n;
      for (const d of v.deti) {
        const c = pridaj(d, s, hlbka + 1, kral);
        s.deti.push(c);
        s.spodok = Math.max(s.spodok, c.spodok);
        s.zvyraznene += c.zvyraznene;
      }
      return s;
    };
    for (const v of pohlad) pridaj(v, undefined, 0, v.u.nazov);
    this.vyseky = vyseky;
    this.spolu = celkom;
    this.spodok = vyseky.reduce((a, s) => Math.max(a, s.hlbka), 0);
  }

  private spocitajPolohy(koren: readonly Uzol[]): void {
    this.poloha.clear();
    this.rozptyl.clear();
    const listy = (u: Uzol): number => (u.dostupnost ? 1 : u.deti.reduce((a, d) => a + listy(d), 0));
    const pocty = koren.map(listy);
    const vsetky = pocty.reduce((a, n) => a + n, 0) || 1;
    koren.forEach((r, j) => {
      const n = pocty[j] || 1;
      this.rozptyl.set(r.nazov, Math.min(70, (140 * n) / vsetky));
      let x = 0;
      const prejdi = (u: Uzol): void => {
        const x0 = x;
        if (u.dostupnost) x += 1;
        else u.deti.forEach(prejdi);
        this.poloha.set(u.id, (x0 + x) / 2 / n);
      };
      prejdi(r);
    });
  }

  /**
   * Farby podľa toho, čo je v strede: najvnútornejší viditeľný prstenec má farbu ríše, smerom von
   * svetlejšie (v tmavom režime tmavšie), aby aj priblížená časť mala kontrast medzi prstencami.
   */
  private prefarbi(): void {
    const css = getComputedStyle(document.documentElement);
    const tmave = oklch(css.getPropertyValue("--bg"))[0] < 0.5;
    const zaklad = FARBY_RIS.map((p) => oklch(css.getPropertyValue(p)));
    const zelena = oklch(css.getPropertyValue("--v-jedle"));
    const h0 = this.fokus ? this.fokus.hlbka + 1 : 0;
    const prstence = Math.max(1, (this.fokus ? this.fokus.spodok : this.spodok) - h0);
    for (const s of this.vyseky) {
      const t = clamp((s.hlbka - h0) / prstence, 0, 1);
      let [L, C, H] = zaklad[s.risa] ?? zaklad[0] ?? [0.55, 0.08, 170];
      if (!this.zvyraznenie) {
        H += (this.polohaUzla(s.v) - 0.5) * (this.rozptyl.get(s.kral) ?? 0);
        L = clamp(L + (tmave ? -0.3 : 0.33) * t, 0.3, 0.88);
        C *= 1.15 * (1 - 0.3 * t);
      } else if (s.zvyraznene) {
        [L, C, H] = zelena;
        L = clamp(L + (tmave ? -0.25 : 0.3) * t, 0.3, 0.86);
        C *= 1 - 0.35 * t;
      } else {
        // Sivá s nádychom zelenej, vnútorné prstence o niečo tmavšie (v tmavom režime svetlejšie).
        [C, H] = [0.006, zelena[2]];
        L = tmave ? 0.34 - 0.08 * t : 0.87 + 0.06 * t;
      }
      s.farba = `oklch(${L.toFixed(3)} ${C.toFixed(3)} ${H.toFixed(1)})`;
      s.tmavyText = L > 0.63;
      const mimo = !!this.zvyraznenie && !s.zvyraznene;
      this.cesty[s.i]?.style.setProperty("fill", s.farba);
      this.texty.get(s.i)?.classList.toggle("tmavy", s.tmavyText);
      this.texty.get(s.i)?.classList.toggle("svetly", !s.tmavyText);
      this.texty.get(s.i)?.classList.toggle("mimo", mimo);
    }
    if (this.aktivny) this.naplnBublinu(this.aktivny);
  }

  /** Veľkosť podľa CSS (štvorec), potom prekreslenie bez animácie. */
  private rozmer(): void {
    const d = this.plocha.clientWidth;
    if (!d) return;
    this.plocha.setAttribute("viewBox", `${-d / 2} ${-d / 2} ${d} ${d}`);
    this.R = d / 2 - 2;
    this.diera = Math.max(54, this.R * 0.2);
    cancelAnimationFrame(this.animacia);
    this.plocha.classList.remove("prechod");
    this.okno = this.cielOkna(this.fokus);
    this.rozmiestni();
    this.stitky();
    this.stred();
    this.navigaciaPrekresli();
  }

  private cielOkna(fokus: Vysek | undefined): Okno {
    const h0 = fokus ? fokus.hlbka + 1 : 0;
    const prstence = Math.max(1, (fokus ? fokus.spodok : this.spodok) - h0 + 1);
    return { a0: fokus?.x0 ?? 0, a1: fokus?.x1 ?? 1, h0, hrubka: (this.R - this.diera) / prstence };
  }

  private tvar(s: Vysek, o: Okno = this.okno): Tvar | undefined {
    const sirka = o.a1 - o.a0;
    const a0 = clamp((s.x0 - o.a0) / sirka, 0, 1) * TAU;
    const a1 = clamp((s.x1 - o.a0) / sirka, 0, 1) * TAU;
    const r0 = Math.max(this.diera, this.diera + (s.hlbka - o.h0) * o.hrubka);
    const r1 = Math.min(this.R, this.diera + (s.hlbka - o.h0 + 1) * o.hrubka);
    if (a1 - a0 < 1e-4 || r1 - r0 < 0.5) return undefined;
    return { a0, a1, r0, r1 };
  }

  private viditelne(): Vysek[] {
    return this.vyseky.filter((s) => s.hlbka >= this.okno.h0 && this.tvar(s));
  }

  private rozmiestni(): void {
    for (const s of this.vyseky) {
      const t = this.tvar(s);
      this.cesty[s.i]?.setAttribute("d", t ? obluk(t) : "");
    }
    for (const [s, p] of this.zhody) {
      const t = this.tvar(s);
      p.setAttribute("d", t ? obluk(t) : "");
    }
    const t = this.aktivny && this.tvar(this.aktivny);
    this.obrys.setAttribute("d", t ? obluk(t) : "");
  }

  // ---------- štítky a stred ----------

  private sirka(text: string, font: string): number {
    if (!this.meradlo) return text.length * 7;
    this.meradlo.font = font;
    return this.meradlo.measureText(text).width;
  }

  /**
   * Štítok sa kreslí len tam, kde sa celý zmestí, radiálne alebo pozdĺž oblúka, podľa toho, ktorý text je
   * bližšie k vodorovnému. Radiálny je vodorovný pri 3 a 9 hodinách, pozdĺž oblúka pri 12 a 6. Text pozdĺž
   * oblúka sa preto vo výseku posunie čo najbližšie k 12 alebo 6 hodinám; ak by aj tak bol naklonený o viac
   * ako 45° (na boku kruhu by bol takmer zvislý), pozdĺž oblúka sa nekreslí.
   */
  private stitky(): void {
    this.texty.clear();
    if (!this.R) return;
    const defs = svg("defs");
    const vysledok: SVGElement[] = [defs];
    for (const s of this.vyseky) {
      const t = s.hlbka >= this.okno.h0 ? this.tvar(s) : undefined;
      if (!t) continue;
      // „–“ (úroveň neexistuje) by bol len šum, v bubline je vysvetlený.
      if (s.v.u.nazov === ZNACKY.NEEXISTUJE) continue;
      const hrubka = t.r1 - t.r0;
      // Ríša má väčšie písmo, ak sa zmestí do prstenca.
      const pismo = s.hlbka === 0 && PISMO.risa.px + 6 <= hrubka ? PISMO.risa : PISMO.bezne;
      const text = stitok(s.v.u);
      const w = this.sirka(text, pismo.font);
      const h = pismo.px;
      const uhol = t.a1 - t.a0;
      const rm = (t.r0 + t.r1) / 2;
      const am = (t.a0 + t.a1) / 2;
      const mimo = this.zvyraznenie && !s.zvyraznene ? " mimo" : "";
      const e = svg("text", `${pismo === PISMO.risa ? "risa " : ""}${s.tmavyText ? "tmavy" : "svetly"}${mimo}`);
      e.dataset["i"] = String(s.i);
      /** Pozdĺž oblúka: stred textu čo najbližšie k vodorovnej polohe, ktorá sa ešte zmestí do výseku. */
      const oblukStred = (): number | undefined => {
        if (h + 4 > hrubka || w + 10 > rm * uhol) return undefined;
        // Celý prstenec má štítok hore.
        if (uhol >= TAU - 1e-6) return 0;
        const polText = (w + 10) / rm / 2;
        const [od, po] = [t.a0 + polText, t.a1 - polText];
        const stred = [0, TAU, Math.PI]
          .map((a) => clamp(a, od, po))
          .reduce((a, b) => (Math.abs(Math.sin(b)) < Math.abs(Math.sin(a)) - 1e-9 ? b : a));
        return Math.abs(Math.sin(stred)) <= Math.SQRT1_2 ? stred : undefined;
      };
      const radialne = w + 10 <= hrubka && h + 2 <= t.r0 * uhol;
      const stredOblukom = oblukStred();
      // Náklon od vodorovnej (0 = vodorovne, 1 = zvislo).
      const ao = stredOblukom !== undefined && (!radialne || Math.abs(Math.sin(stredOblukom)) < Math.abs(Math.cos(am)))
        ? stredOblukom
        : undefined;
      if (ao !== undefined) {
        // Pozdĺž oblúka; v dolnej polovici opačným smerom, aby text nebol hore nohami.
        const dole = ao > Math.PI / 2 && ao < (3 * Math.PI) / 2;
        const r = rm + (dole ? 0.35 : -0.35) * h;
        // Najdlhší oblúk súmerný okolo stredu textu, ktorý je celý vo výseku (startOffset 50 % = stred).
        const pol = uhol >= TAU - 1e-6 ? Math.PI - 0.01 : Math.min(ao - t.a0, t.a1 - ao);
        const [z, k] = dole ? [ao + pol, ao - pol] : [ao - pol, ao + pol];
        const oblukText = svg("path");
        oblukText.id = `kruh-t${s.i}`;
        oblukText.setAttribute(
          "d",
          `M${f(r * Math.sin(z))},${f(-r * Math.cos(z))}A${f(r)},${f(r)} 0 ${pol * 2 > Math.PI ? 1 : 0} ${dole ? 0 : 1} ${f(r * Math.sin(k))},${f(-r * Math.cos(k))}`,
        );
        defs.append(oblukText);
        const tp = svg("textPath");
        tp.setAttribute("href", `#kruh-t${s.i}`);
        tp.setAttribute("startOffset", "50%");
        tp.textContent = text;
        e.append(tp);
      } else if (radialne) {
        // Radiálne, čitateľné zľava doprava na oboch stranách.
        const st = (am * 180) / Math.PI;
        const otoc = am > Math.PI ? st + 90 : st - 90;
        e.setAttribute("transform", `rotate(${f(otoc)}) translate(${f(am > Math.PI ? -rm : rm)},0)`);
        e.setAttribute("dy", "0.35em");
        e.textContent = text;
      } else {
        continue;
      }
      this.texty.set(s.i, e);
      vysledok.push(e);
    }
    this.gStitky.replaceChildren(...vysledok);
    this.gStitky.style.removeProperty("display");
    if (this.aktivny) this.zvyrazni(this.aktivny);
  }

  /** Text, ktorý sa zmestí do šírky (inak skrátený s „…“). */
  private skrat(text: string, font: string, max: number): string {
    if (this.sirka(text, font) <= max) return text;
    let t = text;
    while (t.length > 1 && this.sirka(t + "…", font) > max) t = t.slice(0, -1);
    return t.trimEnd() + "…";
  }

  private stred(): void {
    if (!this.R) return;
    const s = this.fokus;
    const kruh = svg("circle");
    kruh.setAttribute("r", f(this.diera - 3));
    const riadky: [string, string][] = [];
    const max = this.diera * 1.6;
    const z = this.zvyraznenie;
    if (s) {
      const n = sucet(s.v.pocty);
      riadky.push(
        ["s-hore", "↑"],
        ["s-nazov", this.skrat(stitok(s.v.u), PISMO.risa.font, max)],
        ["s-uroven", this.skrat(nazovUrovne(s.v.u), "400 10.5px 'IBM Plex Mono', monospace", max)],
        ["s-pocet", z ? `${s.zvyraznene} z ${n} ${z.popis}` : `${n} ${sklon(n)}`],
      );
    } else if (z) {
      const n = this.vyseky.reduce((a, v) => a + (v.hlbka === 0 ? v.zvyraznene : 0), 0);
      riadky.push(["s-cislo", String(n)], ["s-uroven", sklon(n)], ["s-pocet", z.popis]);
    } else {
      riadky.push(["s-cislo", String(this.spolu)], ["s-uroven", sklon(this.spolu)]);
    }
    const vysky: Record<string, number> = { "s-hore": 14, "s-nazov": 19, "s-uroven": 15, "s-pocet": 15, "s-cislo": 32 };
    const spolu = riadky.reduce((a, [k]) => a + (vysky[k] ?? 15), 0);
    let y = -spolu / 2;
    const texty = riadky.map(([k, t]) => {
      const v = vysky[k] ?? 15;
      const e = svg("text", k);
      e.setAttribute("y", f(y + v / 2));
      e.setAttribute("dy", "0.35em");
      e.textContent = t;
      y += v;
      return e;
    });
    this.gStred.classList.toggle("spat", !!s);
    this.gStred.replaceChildren(kruh, ...texty);
  }

  /** Drobčeková navigácia: kde v strome je stred diagramu. */
  private navigaciaPrekresli(): void {
    const cesta: Vysek[] = [];
    for (let c = this.fokus; c; c = c.rodic) cesta.unshift(c);
    const polozky: Node[] = [];
    const tlacidlo = (i: number, text: string): HTMLButtonElement => {
      const b = el("button", undefined, text);
      b.type = "button";
      b.dataset["i"] = String(i);
      return b;
    };
    if (cesta.length === 0) {
      polozky.push(el("span", "aktualne", "Všetky ríše"));
    } else {
      polozky.push(tlacidlo(-1, "Všetky ríše"));
      cesta.forEach((c, j) => {
        polozky.push(el("span", "odd", "›"));
        if (j === cesta.length - 1) {
          const a = el("span", "aktualne", stitok(c.v.u));
          a.setAttribute("aria-current", "location");
          polozky.push(a);
        } else polozky.push(tlacidlo(c.i, stitok(c.v.u)));
      });
    }
    this.navigacia.setAttribute("aria-label", "Priblížená časť diagramu");
    this.navigacia.replaceChildren(...polozky);
    this.domov.hidden = !this.fokus;
  }

  // ---------- priblíženie ----------

  private priblizit(fokus: Vysek | undefined): void {
    if (fokus === this.fokus) return;
    this.fokus = fokus;
    this.fokusId = fokus?.v.u.id;
    this.aktivuj(undefined);
    this.navigaciaPrekresli();
    this.stred();
    this.prefarbi();
    cancelAnimationFrame(this.animacia);
    const z = this.okno;
    const k = this.cielOkna(fokus);
    if (bezPohybu.matches || !this.R) {
      this.okno = k;
      this.rozmiestni();
      this.stitky();
      return;
    }
    this.gStitky.style.display = "none";
    // Farby prechádzajú plynulo len pri priblížení (nové výseky by inak prechádzali z čiernej).
    this.plocha.classList.add("prechod");
    const start = performance.now();
    const krok = (cas: number): void => {
      const p = Math.min(1, (cas - start) / 550);
      const e = p < 0.5 ? 4 * p ** 3 : 1 - (-2 * p + 2) ** 3 / 2;
      const m = (a: number, b: number): number => a + (b - a) * e;
      this.okno = { a0: m(z.a0, k.a0), a1: m(z.a1, k.a1), h0: m(z.h0, k.h0), hrubka: m(z.hrubka, k.hrubka) };
      this.rozmiestni();
      if (p < 1) {
        this.animacia = requestAnimationFrame(krok);
      } else {
        this.plocha.classList.remove("prechod");
        this.stitky();
      }
    };
    this.animacia = requestAnimationFrame(krok);
  }

  // ---------- hover, bublina, klávesnica ----------

  private ciel(t: EventTarget | null): Vysek | undefined {
    if (!(t instanceof Element)) return undefined;
    if (t.closest(".stred")) return this.fokus;
    const p = t.closest<SVGPathElement>("path[data-i]");
    return p ? this.vyseky[Number(p.dataset["i"])] : undefined;
  }

  private klik(e: MouseEvent): void {
    const vStrede = e.target instanceof Element && e.target.closest(".stred");
    if (vStrede) {
      this.priblizit(this.fokus?.rodic);
      return;
    }
    const s = this.ciel(e.target);
    if (!s) return;
    // Dotyk nemá hover: prvé ťuknutie ukáže bublinu, druhé priblíži.
    if (this.dotyk && this.aktivny !== s) {
      this.aktivuj(s, e.clientX, e.clientY);
      return;
    }
    if (s.deti.length) this.priblizit(s);
  }

  private klaves(e: KeyboardEvent): void {
    const a = this.aktivny;
    let novy: Vysek | undefined;
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      const prstenec = this.viditelne().filter((s) => s.hlbka === (a?.hlbka ?? this.okno.h0));
      const j = a ? prstenec.indexOf(a) : -1;
      const n = prstenec.length;
      if (n) novy = prstenec[(j + (e.key === "ArrowRight" ? 1 : n - 1) + (j < 0 ? 1 : 0)) % n];
    } else if (e.key === "ArrowUp") {
      if (a?.rodic && a.rodic.hlbka >= this.okno.h0) novy = a.rodic;
    } else if (e.key === "ArrowDown") {
      novy = a?.deti[0];
    } else if (e.key === "Enter" || e.key === " ") {
      if (a?.deti.length) this.priblizit(a);
      else if (!a) return;
    } else if (e.key === "Home") {
      if (!this.fokus) return;
      this.priblizit(undefined);
    } else if (e.key === "Escape" || e.key === "Backspace") {
      if (!this.fokus) {
        if (!a) return;
        this.aktivuj(undefined);
      } else {
        const predosly = this.fokus;
        this.priblizit(this.fokus.rodic);
        this.aktivuj(predosly);
      }
    } else {
      return;
    }
    e.preventDefault();
    if (novy) this.aktivuj(novy);
  }

  /** Zvýrazní výsek s predkami a ukáže bublinu (pri myši na jej pozícii, inak pri výseku). */
  private aktivuj(s: Vysek | undefined, x?: number, y?: number): void {
    if (s !== this.aktivny) {
      this.aktivny = s;
      this.zvyrazni(s);
      const t = s && this.tvar(s);
      this.obrys.setAttribute("d", t ? obluk(t) : "");
      if (s) this.naplnBublinu(s);
    }
    this.bublina.hidden = !s;
    if (!s) return;
    if (x === undefined || y === undefined) {
      const t = this.tvar(s);
      const r = this.plocha.getBoundingClientRect();
      const am = t ? (t.a0 + t.a1) / 2 : 0;
      const rm = t ? (t.r0 + t.r1) / 2 : 0;
      const mierka = r.width / (this.plocha.viewBox.baseVal.width || r.width);
      x = r.left + r.width / 2 + Math.sin(am) * rm * mierka;
      y = r.top + r.height / 2 - Math.cos(am) * rm * mierka;
    }
    const w = this.bublina.offsetWidth;
    const h = this.bublina.offsetHeight;
    let bx = x + 16;
    if (bx + w > window.innerWidth - 8) bx = x - 16 - w;
    let by = y + 16;
    if (by + h > window.innerHeight - 8) by = y - 16 - h;
    bx = clamp(bx, 8, Math.max(8, window.innerWidth - w - 8));
    by = clamp(by, 8, Math.max(8, window.innerHeight - h - 8));
    this.bublina.style.transform = `translate(${Math.round(bx)}px, ${Math.round(by)}px)`;
  }

  private zvyrazni(s: Vysek | undefined): void {
    this.plocha.querySelectorAll(".cesta").forEach((e) => e.classList.remove("cesta"));
    this.plocha.classList.toggle("hover", !!s);
    for (let c = s; c; c = c.rodic) {
      this.cesty[c.i]?.classList.add("cesta");
      this.texty.get(c.i)?.classList.add("cesta");
    }
  }

  /** Bublina: výsek a všetci predkovia (aj uzly zlúčené do jedného výseku), dole počet alebo dostupnosť. */
  private naplnBublinu(s: Vysek): void {
    const cesta: Vysek[] = [];
    for (let c: Vysek | undefined = s; c; c = c.rodic) cesta.unshift(c);
    const ol = el("ol");
    for (const c of cesta) {
      for (const u of [...c.v.retazec, c.v.u]) {
        const li = el("li", u === s.v.u ? "tento" : undefined);
        li.style.setProperty("--f", c.farba);
        const n = el("span", "n");
        if (u.znacka) {
          const z = znacka(u);
          n.append(el("span", "znak", z.znak), " ", el("i", undefined, z.pozn));
        } else {
          n.textContent = u.nazov;
        }
        li.append(n, el("span", "l", nazovUrovne(u)));
        ol.append(li);
      }
    }
    const pata = el("div", "pata");
    const d = s.v.u.dostupnost;
    const z = this.zvyraznenie;
    if (d) {
      if (z && s.zvyraznene) pata.append(el("span", "chip zelena", z.popis));
      pata.append(el("span", `chip ${TRIEDA[d]}`, d));
    } else {
      const n = sucet(s.v.pocty);
      pata.append(pocetEl(s.v), el("span", undefined, z ? `${sklon(n)}, ${s.zvyraznene} ${z.popis}` : sklon(n)));
      if (s.deti.length) pata.append(el("span", "rada", "klik priblíži"));
    }
    const clenovia = s.v.clenovia ? [el("p", "clenovia", s.v.clenovia.map((c) => c.nazov).join(", "))] : [];
    const detail = d && z && s.zvyraznene
      ? this.zvyraznenePotraviny(s.v)
          .map((c) => {
            const t = z.detail?.(c.id);
            return s.v.clenovia && t ? `${c.nazov}: ${t}` : t;
          })
          .filter(Boolean)
          .join("; ")
      : undefined;
    this.bublina.replaceChildren(ol, ...clenovia, pata, ...(detail ? [el("p", "detail", detail)] : []));
  }

  /**
   * Poloha uzla v ríši (0–1) pre odtieň. Uzol, ktorý v strome nie je (zjednodušená potravina, ryby,
   * podkategória), má polohu stredu svojich potravín alebo detí.
   */
  private polohaUzla(v: VUzol): number {
    const p = this.poloha.get(v.u.id);
    if (p !== undefined) return p;
    const prvy = v.clenovia?.[0] ?? v.deti[0];
    const posledny = v.clenovia?.at(-1) ?? v.deti.at(-1);
    if (!prvy || !posledny) return 0.5;
    const poloha = (x: Uzol | VUzol): number => ("u" in x ? this.polohaUzla(x) : (this.poloha.get(x.id) ?? 0.5));
    return (poloha(prvy) + poloha(posledny)) / 2;
  }

  /** Zvýraznené potraviny stromu, ktoré list zobrazuje (zjednodušená potravina ich môže mať viac). */
  private zvyraznenePotraviny(v: VUzol): readonly Uzol[] {
    const z = this.zvyraznenie;
    return z ? (v.clenovia ?? [v.u]).filter((c) => z.listy.has(c.id)) : [];
  }
}

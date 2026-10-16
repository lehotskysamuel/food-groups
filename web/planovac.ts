/**
 * Plánovač jedál (#planovac): plány zo src/data/plany, ich jedlá a suroviny v strome potravín.
 * Suroviny vybraného jedla (alebo všetkých jedál plánu) sú v strome aj v kruhu zelené, ostatné potraviny sivé.
 *
 * Adresy: #planovac – zoznam plánov, #planovac/<plán> – jedlá a súhrn plánu, #planovac/<plán>/<jedlo> – jedno jedlo.
 */
import { nacitajPlany } from "../src/jedla";
import type { NacitaneJedlo, Plan, Surovina } from "../src/jedla";
import { DOSTUPNOST, DOSTUPNOSTI, UROVNE, ZNACKY } from "../src/strom.types";
import type { List } from "../src/strom.types";
import { Kruh } from "./kruh";
import type { Zvyraznenie } from "./kruh";
import { DRUH, RISE, SEP, TRIEDA, el, nazovUrovne, prepinajDostupnosti, sklon, sklonuj, sucet, vsetky, znacka, zobraz } from "./spolocne";
import type { Uzol, VUzol } from "./spolocne";

type Pohlad = "strom" | "kruh";

/** Surovina spolu s jedlom, z ktorého je. */
interface Pouzitie {
  readonly s: Surovina;
  readonly jedlo: NacitaneJedlo;
}

/** Čo je zobrazené v grafe: celý plán (súhrn) alebo jedno jedlo. */
interface Vyber {
  readonly suhrn: boolean;
  readonly jedla: readonly NacitaneJedlo[];
  /** Id potraviny (listu) → suroviny, ktoré na ňu odkazujú, v poradí zo súborov. */
  readonly potraviny: ReadonlyMap<string, readonly Pouzitie[]>;
  /** Suroviny s potravinou, ktorá v strome nie je. */
  readonly nezname: readonly Pouzitie[];
}

const CELAD = UROVNE.indexOf("čeľaď");

/** Adresa stránky plánovača, napr. adresa("demo-plan", "poke-bowl-s-tofu") → #planovac/demo-plan/poke-bowl-s-tofu. */
export const adresa = (...casti: readonly string[]): string =>
  "#" + ["planovac", ...casti].map(encodeURIComponent).join("/");

const jedal = (n: number): string => sklonuj(n, ["jedlo", "jedlá", "jedál"]);

/** „bryndza · 250 g“; bez formy len množstvo. */
const formaAMnozstvo = (s: Surovina): string => [s.forma, s.mnozstvo].filter(Boolean).join(" · ");

export class Planovac {
  private koren: readonly Uzol[] = [];
  /** Pohľad na celý strom: jednoduchý alebo detailný, s filtrom dostupnosti, rovnako ako na stránke Strom potravín. */
  private pohlad: VUzol[] = [];
  private detailny = false;
  private dost: ReadonlySet<List> = new Set(DOSTUPNOSTI);
  /** Názov potraviny → list stromu. */
  private listy = new Map<string, Uzol>();
  private subory: Readonly<Record<string, unknown>> = {};
  private plany: Plan[] = [];
  private chyby: string[] = [];

  private cesta: readonly string[] = [];
  private rezim: Pohlad = "kruh";
  /** Ručne rozbalené (true) a zbalené (false) uzly; predvolene sú rozbalené len vetvy so surovinami. */
  private prepnute = new Map<string, boolean>();
  /** Plán a jedlo, ku ktorým patrí `prepnute`. */
  private prepnutePre = "";

  private readonly $: <T extends HTMLElement>(sel: string) => T;
  private readonly kruh: Kruh;
  private readonly stromEl: HTMLDivElement;

  constructor(
    private readonly stranka: HTMLElement,
    koren: readonly Uzol[],
    subory: Readonly<Record<string, unknown>>,
  ) {
    this.$ = <T extends HTMLElement>(sel: string): T => stranka.querySelector(sel) as T;
    this.kruh = new Kruh(this.$("#plan-diagram"));
    this.stromEl = this.$("#plan-strom");
    this.koren = koren;
    this.subory = subory;
    this.prepocitaj();

    stranka.querySelectorAll<HTMLButtonElement>("[data-plan-pohlad]").forEach((b) =>
      b.addEventListener("click", () => {
        this.rezim = b.dataset["planPohlad"] === "strom" ? "strom" : "kruh";
        this.vykresli();
      }),
    );
    this.$<HTMLButtonElement>("#plan-rozbalit").addEventListener("click", () => {
      for (const u of vsetky(this.koren)) if (!u.dostupnost) this.prepnute.set(u.id, true);
      this.stromEl.querySelectorAll("details").forEach((d) => (d.open = true));
    });
    prepinajDostupnosti(this.$(".dostupnosti"), this.dost, (dost) => {
      this.dost = dost;
      this.pohlad = this.pohladStromu();
      this.vykresli();
    });
    const detailEl = this.$<HTMLInputElement>("#plan-detailny");
    detailEl.checked = this.detailny;
    detailEl.addEventListener("change", () => {
      this.detailny = detailEl.checked;
      this.pohlad = this.pohladStromu();
      this.vykresli();
    });
    this.$<HTMLButtonElement>("#plan-len-suroviny").addEventListener("click", () => {
      this.prepnute.clear();
      this.vykresli();
    });
    this.stromEl.addEventListener(
      "toggle",
      (e) => {
        const d = e.target;
        if (d instanceof HTMLDetailsElement && d.dataset["id"]) this.prepnute.set(d.dataset["id"], d.open);
      },
      true,
    );
    // Shift (alebo Alt) + klik zbalí alebo rozbalí celý podstrom, ako na stránke Strom potravín.
    this.stromEl.addEventListener("click", (e) => {
      const s = (e.target as Element).closest("summary");
      if (!s || !(e.shiftKey || e.altKey)) return;
      e.preventDefault();
      const d = s.parentElement as HTMLDetailsElement;
      const open = !d.open;
      d.open = open;
      d.querySelectorAll("details").forEach((x) => (x.open = open));
    });
  }

  /** Nový strom (HMR zo src/data/strom.ts). */
  nastavKoren(koren: readonly Uzol[]): void {
    this.koren = koren;
    this.prepocitaj();
    if (!this.stranka.hidden) this.vykresli();
  }

  /** Nové súbory plánov (HMR zo src/data/plany). */
  nastavSubory(subory: Readonly<Record<string, unknown>>): void {
    this.subory = subory;
    this.prepocitaj();
    if (!this.stranka.hidden) this.vykresli();
  }

  /** Zobrazí stránku podľa adresy: [] = zoznam plánov, [plán] = súhrn plánu, [plán, jedlo] = jedno jedlo. */
  zobraz(cesta: readonly string[]): void {
    this.cesta = cesta;
    this.vykresli();
  }

  private pohladStromu(): VUzol[] {
    return this.koren.flatMap((u) => zobraz(u, { dost: this.dost, q: "", detail: this.detailny }));
  }

  private prepocitaj(): void {
    this.pohlad = this.pohladStromu();
    this.listy = new Map();
    for (const u of vsetky(this.koren)) if (u.dostupnost) this.listy.set(u.nazov, u);
    ({ plany: this.plany, chyby: this.chyby } = nacitajPlany(this.subory, new Set(this.listy.keys())));
  }

  private vyber(jedla: readonly NacitaneJedlo[], suhrn: boolean): Vyber {
    const potraviny = new Map<string, Pouzitie[]>();
    const nezname: Pouzitie[] = [];
    for (const jedlo of jedla) {
      for (const s of jedlo.jedlo.suroviny) {
        const id = this.listy.get(s.potravina)?.id;
        if (id === undefined) {
          nezname.push({ s, jedlo });
          continue;
        }
        potraviny.set(id, [...(potraviny.get(id) ?? []), { s, jedlo }]);
      }
    }
    return { suhrn, jedla, potraviny, nezname };
  }

  // ---------- vykreslenie ----------

  private vykresli(): void {
    const [planId, jedloId] = this.cesta.map((c) => c.normalize("NFC"));
    const plan = planId === undefined ? undefined : this.plany.find((p) => p.id === planId);
    const jedlo = plan && jedloId !== undefined ? plan.jedla.find((j) => j.id === jedloId) : undefined;

    let info = "";
    if (planId !== undefined && !plan) info = `Plán „${planId}“ neexistuje.`;
    else if (jedloId !== undefined && !jedlo) info = `Jedlo „${jedloId}“ v pláne „${planId}“ neexistuje.`;
    const infoEl = this.$<HTMLParagraphElement>("#plan-info");
    infoEl.textContent = info;
    infoEl.hidden = !info;

    const chybyEl = this.$<HTMLDivElement>("#plan-chyby");
    chybyEl.hidden = this.chyby.length === 0;
    if (this.chyby.length) {
      const ul = el("ul");
      ul.append(...this.chyby.map((c) => el("li", undefined, c)));
      chybyEl.replaceChildren(el("b", undefined, "Niektoré súbory jedál majú chyby:"), ul);
    }

    this.omrvinky(plan, jedlo);
    this.$("#plan-zoznam").hidden = !!plan;
    this.$("#plan-detail").hidden = !plan;
    if (plan) this.detail(plan, jedlo);
    else this.zoznam();
  }

  private omrvinky(plan: Plan | undefined, jedlo: NacitaneJedlo | undefined): void {
    const nav = this.$("#plan-omrvinky");
    const odkaz = (text: string, href: string): HTMLAnchorElement => {
      const a = el("a", undefined, text);
      a.href = href;
      return a;
    };
    const casti: Node[] = [];
    if (plan) {
      casti.push(odkaz("Všetky plány", adresa()), el("span", "odd", "›"));
      if (jedlo) casti.push(odkaz(plan.id, adresa(plan.id)), el("span", "odd", "›"));
      const posledne = el("span", "aktualne", jedlo ? jedlo.jedlo.nazov : plan.id);
      posledne.setAttribute("aria-current", "page");
      casti.push(posledne);
    }
    nav.hidden = casti.length === 0;
    nav.replaceChildren(...casti);
    this.$("#plan-nadpis").textContent = plan ? plan.id : "Plánovač jedál";
    this.$("#plan-podtitul").textContent = plan
      ? `${plan.jedla.length} ${jedal(plan.jedla.length)}. Celý plán ukáže suroviny všetkých jedál naraz, klik na jedlo len jeho.`
      : "Každý plán je priečinok v src/data/plany, každé jedlo v ňom samostatný JSON súbor. Suroviny jedál sú v strome potravín zelené.";
  }

  /** Zoznam plánov. */
  private zoznam(): void {
    const zoznam = this.$("#plan-zoznam");
    if (this.plany.length === 0) {
      zoznam.replaceChildren(
        el("p", "info", "Zatiaľ tu nie je žiadny plán. Vytvor priečinok src/data/plany/<plán>/ a v ňom JSON súbor pre každé jedlo."),
      );
      return;
    }
    zoznam.replaceChildren(
      ...this.plany.map((p) => {
        const n = this.vyber(p.jedla, true).potraviny.size;
        return this.karta(adresa(p.id), p.id, `${p.jedla.length} ${jedal(p.jedla.length)} · ${n} ${sklon(n)}`, p.jedla.map((j) => j.jedlo.nazov).join(", "), false);
      }),
    );
  }

  private karta(href: string, nazov: string, meta: string, popis: string, aktualna: boolean, trieda = ""): HTMLAnchorElement {
    const a = el("a", `karta ${trieda}`.trim());
    a.href = href;
    if (aktualna) a.setAttribute("aria-current", "page");
    a.append(el("span", "karta-nazov", nazov), el("span", "karta-meta", meta));
    if (popis) a.append(el("span", "karta-popis", popis));
    return a;
  }

  /** Plán: karty jedál, popis výberu, suroviny a graf. */
  private detail(plan: Plan, jedlo: NacitaneJedlo | undefined): void {
    const suhrn = this.vyber(plan.jedla, true);
    const v = jedlo ? this.vyber([jedlo], false) : suhrn;

    this.$("#plan-jedla").replaceChildren(
      this.karta(adresa(plan.id), "Celý plán", `${plan.jedla.length} ${jedal(plan.jedla.length)} · ${suhrn.potraviny.size} ${sklon(suhrn.potraviny.size)}`, "Suroviny všetkých jedál v jednom grafe", !jedlo, "suhrn"),
      ...plan.jedla.map((j) => {
        const n = this.vyber([j], false).potraviny.size;
        return this.karta(adresa(plan.id, j.id), j.jedlo.nazov, `${j.jedlo.suroviny.length} ${sklonuj(j.jedlo.suroviny.length, ["surovina", "suroviny", "surovín"])} · ${n} ${sklon(n)}`, j.jedlo.popis ?? "", j === jedlo);
      }),
    );

    this.$("#vyber-nadpis").textContent = jedlo ? jedlo.jedlo.nazov : "Celý plán";
    const popis = jedlo ? (jedlo.jedlo.popis ?? "") : `Všetky suroviny ${plan.jedla.length} ${sklonuj(plan.jedla.length, ["jedla", "jedál", "jedál"])} plánu ${plan.id}.`;
    this.$("#vyber-popis").textContent = popis;
    this.$("#legenda-v").textContent = jedlo ? "v jedle" : "v pláne";
    this.statistiky(v);
    this.suroviny(v);

    const kluc = `${plan.id}${SEP}${jedlo?.id ?? ""}`;
    if (kluc !== this.prepnutePre) {
      this.prepnute.clear();
      this.prepnutePre = kluc;
    }
    this.stranka.querySelectorAll<HTMLButtonElement>("[data-plan-pohlad]").forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset["planPohlad"] === this.rezim)),
    );
    this.$("#plan-strom-nastroje").hidden = this.rezim !== "strom";
    this.$("#plan-prazdne").hidden = this.pohlad.length > 0;
    this.stromEl.hidden = this.rezim !== "strom";
    this.$("#plan-diagram").hidden = this.rezim !== "kruh";
    if (this.rezim === "kruh") {
      this.stromEl.replaceChildren();
      this.kruh.nastav(this.pohlad, this.koren, this.zvyraznenie(v));
    } else {
      this.strom(v);
    }
  }

  /** Počet rôznych potravín, druhov, čeľadí a potravín v každej ríši. */
  private statistiky(v: Vyber): void {
    const druhy = new Set<string>();
    const celade = new Set<string>();
    const risePocty = new Map<string, number>();
    for (const id of v.potraviny.keys()) {
      const casti = id.split(SEP);
      druhy.add(casti.slice(0, DRUH + 1).join(SEP));
      celade.add(casti.slice(0, CELAD + 1).join(SEP));
      const r = casti[0] ?? "";
      risePocty.set(r, (risePocty.get(r) ?? 0) + 1);
    }
    /** [názov, hodnota, CSS trieda] */
    const polozky: [string, number, string?][] = [
      ["potraviny", v.potraviny.size, "zelena"],
      ["druhy", druhy.size],
      ["čeľade", celade.size],
    ];
    const rise = [...risePocty].sort(([a], [b]) => RISE.indexOf(a) - RISE.indexOf(b));
    rise.forEach(([r, n], i) => polozky.push([r, n, `risa risa-${Math.max(0, RISE.indexOf(r))}${i === 0 ? " prva-risa" : ""}`]));
    this.$("#vyber-statistiky").replaceChildren(
      ...polozky.map(([k, h, trieda]) => {
        const w = el("div", trieda);
        w.append(el("dt", undefined, k), el("dd", undefined, String(h)));
        return w;
      }),
    );
  }

  /** Zoznam surovín: pri jedle v poradí zo súboru, pri celom pláne každá potravina raz s jedlami, v ktorých je. */
  private suroviny(v: Vyber): void {
    const ol = this.$<HTMLOListElement>("#suroviny");
    const riadok = (nazov: string, pod: string, vpravo: string, trieda?: string, titul?: string): HTMLLIElement => {
      const li = el("li", trieda);
      li.append(el("span", "bod"), el("span", "s-nazov", nazov), el("span", "s-mnozstvo", vpravo));
      if (pod) li.append(el("span", "s-pod", pod));
      const skryta = trieda === "skryta" ? "V grafe ju skrýva filter dostupnosti." : "";
      if (titul || skryta) li.title = [titul, skryta].filter(Boolean).join("\n");
      return li;
    };
    const nezname = v.nezname.map(({ s }) =>
      riadok(s.forma ?? s.potravina, `„${s.potravina}“ nie je v strome`, s.mnozstvo ?? "", "chyba"),
    );
    if (!v.suhrn) {
      ol.replaceChildren(
        ...v.jedla.flatMap((j) => j.jedlo.suroviny).flatMap((s) => {
          if (!this.listy.has(s.potravina)) return [];
          return [riadok(s.forma ?? s.potravina, s.forma ? s.potravina : "", s.mnozstvo ?? "", this.skryta(s.potravina))];
        }),
        ...nezname,
      );
      return;
    }
    const potraviny = [...v.potraviny].map(([id, pouzitia]) => {
      const jedla = [...new Set(pouzitia.map((p) => p.jedlo))];
      return { nazov: id.split(SEP).at(-1) ?? id, jedla, pouzitia };
    });
    potraviny.sort((a, b) => b.jedla.length - a.jedla.length || a.nazov.localeCompare(b.nazov, "sk"));
    ol.replaceChildren(
      ...potraviny.map((p) =>
        riadok(
          p.nazov,
          p.jedla.map((j) => j.jedlo.nazov).join(", "),
          p.jedla.length > 1 ? `${p.jedla.length}×` : "",
          this.skryta(p.nazov),
          p.pouzitia.map(({ s, jedlo }) => `${jedlo.jedlo.nazov}: ${formaAMnozstvo(s) || s.potravina}`).join("\n"),
        ),
      ),
      ...nezname,
    );
  }

  /** Trieda suroviny, ktorú graf neukazuje, lebo jej dostupnosť je vo filtri vypnutá. */
  private skryta(potravina: string): "skryta" | undefined {
    const d = this.listy.get(potravina)?.dostupnost;
    return d && !this.dost.has(d) ? "skryta" : undefined;
  }

  private zvyraznenie(v: Vyber): Zvyraznenie {
    return {
      listy: new Set(v.potraviny.keys()),
      popis: v.suhrn ? "v pláne" : "v jedle",
      detail: (id) => this.detailPotraviny(v, id),
    };
  }

  /** Text k zvýraznenej potravine: pri jedle forma a množstvo, pri pláne jedlá, v ktorých je. */
  private detailPotraviny(v: Vyber, id: string): string | undefined {
    const pouzitia = v.potraviny.get(id) ?? [];
    if (v.suhrn) return [...new Set(pouzitia.map((p) => p.jedlo.jedlo.nazov))].join(", ") || undefined;
    return pouzitia.map((p) => formaAMnozstvo(p.s)).filter(Boolean).join("; ") || undefined;
  }

  // ---------- strom ----------

  private strom(v: Vyber): void {
    const listy = new Set(v.potraviny.keys());
    const pocty = new Map<VUzol, number>();
    const pocet = (x: VUzol): number => {
      let n = pocty.get(x);
      if (n === undefined) {
        n = x.deti.length ? x.deti.reduce((a, d) => a + pocet(d), 0) : listy.has(x.u.id) ? 1 : 0;
        pocty.set(x, n);
      }
      return n;
    };
    const uzolEl = (x: VUzol): HTMLElement => {
      const { u } = x;
      const n = pocet(x);
      const trieda = n ? "v-jedle" : "mimo";
      if (u.dostupnost) {
        const row = el("div", `list ${trieda}`);
        row.append(el("span", "bod"), el("span", "nazov", u.nazov));
        const detail = n ? this.detailPotraviny(v, u.id) : undefined;
        if (detail) row.append(el("span", "s-detail", detail));
        const chip = el("span", `chip ${TRIEDA[u.dostupnost]}`, u.dostupnost);
        chip.title = DOSTUPNOST[u.dostupnost];
        row.append(chip);
        return row;
      }
      const d = el("details", trieda);
      d.dataset["id"] = u.id;
      d.open = this.prepnute.get(u.id) ?? n > 0;
      if (u.uroven === 0) d.classList.add(`risa-${Math.max(0, RISE.indexOf(u.nazov))}`);
      if (u.znacka) d.classList.add("znacka-uzol");
      const s = el("summary");
      const nazov = el("span", "nazov");
      if (u.znacka) {
        const z = znacka(u);
        nazov.append(el("span", u.nazov === ZNACKY.TBD ? "chip tbd" : "znak", z.znak), el("span", "pozn", z.pozn));
      } else {
        nazov.textContent = u.nazov;
      }
      const vrch = x.retazec[0];
      const uroven = el("span", "uroven", vrch ? `${nazovUrovne(vrch)} – ${nazovUrovne(u)}` : nazovUrovne(u));
      if (vrch) s.title = [...x.retazec, u].map((y) => `${y.nazov} (${nazovUrovne(y)})`).join(" › ");
      const spolu = sucet(x.pocty);
      const p = el("span", "pocet-v");
      p.title = `${n} z ${spolu} ${sklon(spolu)} ${v.suhrn ? "v pláne" : "v jedle"}`;
      if (n) p.append(el("b", undefined, String(n)), ` z ${spolu}`);
      else p.textContent = String(spolu);
      s.append(el("span", "caret"), nazov, uroven, p);
      const deti = el("div", "deti");
      deti.append(...x.deti.map(uzolEl));
      d.append(s, deti);
      return d;
    };
    this.stromEl.replaceChildren(...this.pohlad.map(uzolEl));
  }
}

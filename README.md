# food-groups

Botanický, mykologický a zoologický strom potravín. Slúži na hodnotenie diverzity
vlastného jedálnička: čím širšie pokrytie stromu, tým diverzifikovanejšia strava.

## Príkazy

```
npm install          # jednorazovo
npm run typecheck    # overí typy, strom aj mapovanie zdrojov (tsc --noEmit)
npm run dev          # web: rozbaľovací strom na http://localhost:5173 (číta src/data/strom.ts)
npm run build        # statický web do dist/ (npm run preview ho spustí)
```

## Štruktúra

- `src/strom.types.ts` – typy pre 17 úrovní stromu (`U01_Risa` … `U17_Potravina`), značky,
  názvy úrovní a typ `Potravina<T>` (zjednotenie názvov všetkých listov stromu)
- `src/data/strom.ts` – samotný strom (`as const satisfies Strom`), zdroj pravdy
- `src/data/zdroje/tesco-2026-09-24.ts` – 422 produktov z Tesco (Ovocie, zelenina)
  a potraviny zo stromu, na ktoré sa mapujú. Typecheck overí, že každá potravina v strome existuje.
- `src/data/zdroje/kosik-2026-09-24.ts` – 483 produktov z Košík.sk (Ovocie, Zelenina, Huby,
  Bylinky a korenie) a ich mapovanie na potraviny, rovnako overené typecheckom.
- `web/` – webové zobrazenie stromu (Vite, bez frameworku): rozbaľovanie uzlov, rozbaliť/zbaliť všetko,
  rozbalenie po zvolenú úroveň, hľadanie, filter bežné/exotické, skrytie značiek `-`, `*`, `TBD`
- `test/strom.types.test.ts` – typové testy: overujú, že typy odmietnu chybný strom

## Model

Strom je jeden vnorený objekt s pevnou hĺbkou 17. Kľúč = názov uzla, hodnota =
uzly nasledujúcej úrovne. Hodnota listu (úroveň 17) hovorí, či je potravina na slovenskom
trhu **`"bežné"`** alebo **`"exotické"`**. Rank uzla vyplýva z hĺbky.

**Verzia 1 je heuristika:** čo má Tesco v kategórii Ovocie, zelenina (vrátane pôvodnej ukážky),
je `"bežné"` (156 potravín); čo pribudlo až z Košíka, je `"exotické"` (118). Predpoklad: ak to
Tesco nemá, je to pravdepodobne exotické. Kategóriu treba ručne prejsť a opraviť podľa skúsenosti.
Povolené hodnoty sú v `DOSTUPNOST` v `src/strom.types.ts`.

| # | Úroveň | Príklad (brokolica) |
|---|---|---|
| 1 | ríša | rastliny |
| 2 | oddelenie / kmeň | semenné |
| 3 | pododdelenie / podkmeň | krytosemenné |
| 4 | trieda | pravé dvojklíčnolistové |
| 5 | nadklad | superrosidy |
| 6 | klad | rosidy |
| 7 | podklad | malvidy |
| 8 | rad | kapustotvaré |
| 9 | čeľaď | kapustovité |
| 10 | podčeľaď | TBD |
| 11 | tribus | Brassiceae |
| 12 | rod | kapusta |
| 13 | druh | kapusta obyčajná |
| 14 | varieta / poddruh / skupina odrôd | brokolica |
| 15 | kultivar / plemeno | * |
| 16 | jedlá časť | súkvetie |
| 17 | potravina (list) | brokolica |

Úrovne 5–7 sú klady podľa APG IV (rastliny). Pri živočíchoch a hubách slúžia ako
medzistupne medzi triedou a radom.

**Varieta vs. kultivar:** úroveň 14 je pre botanické variety, poddruhy a formálne skupiny
odrôd (brokolica, karfiol, cherry paradajky). Úroveň 15 je pre konkrétne odrody (Gala,
Granny Smith) a neformálne skupiny, ktoré sa na trhu rozlišujú (napr. červené / zelené
jablká, biele / červené hrozno).

**Jedlá časť** rozlišuje rôzne potraviny z toho istého organizmu (citrón – plod vs.
citrónová kôra; petržlen – koreň vs. vňať).

### Značky

| Značka | Význam |
|---|---|
| `-` | úroveň pre túto líniu **neexistuje** |
| `TBD` | úroveň existuje, **ešte nie je doplnená** |
| `*` | úroveň existuje, ale potravinu **nerozlišujeme** (všeobecná, napr. akákoľvek brokolica) |

Všetky tri značky môžu mať súrodencov. Napr. pod „pravé dvojklíčnolistové“ je `-`
(mak a makadamia nepatria do žiadneho nadkladu) vedľa „superrosidy“ a „superasteridy“.

### Názvy

Poradie preferencie: **slovensky > česky > latinsky**. Latinský názov len vtedy,
keď spoľahlivý slovenský ani český neexistuje. Zdroje na overenie: BioLib.cz
(slovenské a české názvy), POWO / APG IV (botanika), FishBase (ryby), Index Fungorum (huby).

### Mimo stromu

Spracovanie (surové, varené, fermentované, sušené…) a pôvod (divý vs. chovaný…) do stromu
nepatria. Budú samostatná os. Preto napr. kvasená kapusta, hrozienka či džús sú v mapovaní
zdrojov zaradené na tú istú potravinu ako čerstvá surovina.

## Zdroje

### Tesco – Ovocie, zelenina (24. 9. 2026)

Stránky 9 → 1 kategórie Ovocie, zelenina, 422 produktov. Každý produkt má stav:

- **zaradené** – všetky zložky z názvu sú v strome,
- **neúplné** – zmes, kde časť zložiek názov nešpecifikuje („sušené ovocie“, „škrupinové plody“),
- **vylúčené** – kvety, ozdobná tekvica alebo produkt, ktorého zloženie z názvu nevyčítame
  (čalamády, šalátové mixy, lečo, multivitamínové džúsy).

### Košík.sk – Ovocie, Zelenina, Huby, Bylinky a korenie (24. 9. 2026)

Uložené stránky kategórií, 483 produktov (počty sedia s počtami na stránkach; niektoré produkty
sú vo viacerých kategóriách, preto 463 unikátnych názvov). Stavy rovnaké ako pri Tescu.
Vylúčené sú šalátové a polievkové zmesi, čalamády, zmesi sušených húb a byliniek
a ovocné pyré bez určeného zloženia.

### Pravidlá mapovania

Berieme len suroviny uvedené v názve produktu. Príchute, korenie
v náleve a čokoládové polevy ignorujeme.

## Manuálne overenie

`npm run typecheck` stráži **tvar** stromu (hĺbka 17, list = `"bežné"` / `"exotické"`, značka nie je názvom
potraviny) a to, že mapovanie zdrojov odkazuje len na existujúce potraviny. Nasledujúce veci
typy nezachytia a **pri každej zmene dát ich treba overiť manuálne**:

1. **Taxón je v strome len raz.** Ten istý rod, čeľaď atď. nesmie byť na dvoch
   rôznych cestách (napr. rod `kapusta` pod dvoma rôznymi čeľaďami).
2. **Názov potraviny (list) je v celom strome unikátny.**
3. **Uzol je na správnej úrovni.** Napr. tribus nesmie byť v slote podčeľade.
4. **Taxonómia je vecne správna** (overiť v zdrojoch vyššie).
5. **Názov dodržiava poradie jazykov** slovensky > česky > latinsky.
6. **Jedlá časť je skutočná časť** rastliny/huby/živočícha (plod, súkvetie, hlávka, svalovina…),
   nie spôsob úpravy.
7. **Mapovanie zdrojov** priradilo produkt k správnym potravinám.
8. **Kategória bežné / exotické** zodpovedá realite (verzia 1 je len heuristika podľa Tesca).

### Otvorené body na overenie

- **Česky, lebo slovenský názov nepoznáme:** superrosidy, superasteridy, rosidy, asteridy,
  fabidy, malvidy, lamiidy, kampanulidy, komelinidy, magnoliidy, kostnatí, hrušeň písečná,
  ořechovec (pekan), ledvinovníkovité / ledvinovník západní (kešu), lilek rajče (paradajka),
  brusnice chocholičnatá (čučoriedky), lubenice obecná (melón vodový), hlíva máčková
  (hliva kráľovská), paprika čínská (habanero), čekanka endivie (frisée), voňatka citronová
  (citrónová tráva).
- **Slovenský názov so strednou istotou:** viničotvaré, vrbicovité (Lythraceae),
  povojník batátový, papája melónová, artičoka kardová, šalvia hispánska, ľuľok baklažánový,
  tekvica obrovská, tekvica muškátová, kapusta repová, kapusta repková, egreš obyčajný,
  majorán záhradný, húževnatec jedlý (shiitake), trsovnica lupeňovitá (maitake),
  plamienka zamatová (enoki), kuriatkotvaré, uchovcotvaré, kysličkotvaré.
- **Latinsky:** podčeľade a tribusy, rod *Citrus* a jeho druhy, *Musa acuminata* (banán),
  *Selenicereus* (dračie ovocie), *Averrhoa carambola*, *Euterpe oleracea* (acai),
  *Vigna radiata* / *angularis* (mungo, azuki), *Hypsizygus tessulatus* (shimeji),
  *Thymus × citriodorus*, vyššie taxóny a niektoré čeľade húb a rýb.
- **Taxonomické neistoty:** rukola (rod *Eruca* alebo *Diplotaxis*, preto `TBD`);
  grapefruit Sweetie je kríženec pomela a grapefruitu, zaradený pod grapefruit;
  jarná cibuľka môže byť aj *Allium fistulosum*; melón gália zaradený do skupiny Reticulatus;
  podčeľaď tekvicovitých, kapustovitých a ďalšie `TBD`; chilli Rawit a zmesi chilli sú pod
  rodom paprika bez určeného druhu; biela a zelená špargľa sú jedna potravina (rozdiel je
  v spôsobe pestovania, nie v taxóne ani časti rastliny).

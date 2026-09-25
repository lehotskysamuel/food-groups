# food-groups

Botanický, mykologický a zoologický strom potravín. Slúži na hodnotenie diverzity
vlastného jedálnička: čím širšie pokrytie stromu, tým diverzifikovanejšia strava.

## Príkazy

```
npm install          # jednorazovo
npm run typecheck    # overí typy a tvar stromu (tsc --noEmit)
npm run dev          # web v edit móde na http://localhost:5173 (číta aj zapisuje src/data/strom.ts)
npm run build        # web vo view móde: jeden súbor dist/index.html, otvorí sa aj bez servera
npm run preview      # dist/ cez lokálny server (nepovinné)
```

### Módy webu

- **View mód** (`npm run build`) – len prezeranie. Výsledok je jediný `dist/index.html` so zabudovaným
  JS, CSS aj dátami, takže stačí ho otvoriť dvojklikom (písma sa načítajú z Google Fonts, ak je sieť).
- **Edit mód** (`npm run dev`) – navrchu stránky je pás **EDIT MÓD**. Klik na štítok dostupnosti ho posunie
  v poradí `bežné` → `menej bežné` → `exotické` → `bežné` a zmenu zapíše priamo do `src/data/strom.ts` (mení sa len hodnota toho listu).
  Strom sa hneď prekreslí bez straty rozbalenia a filtra, rovnako aj pri ručnej úprave súboru.
  Zápis prijíma len dev server a len požiadavky z tohto počítača; do buildu sa edit kód nedostane.

## Štruktúra

- `src/strom.types.ts` – typy pre 17 úrovní stromu (`U01_Risa` … `U17_Potravina`), značky,
  názvy úrovní a typ `Potravina<T>` (zjednotenie názvov všetkých listov stromu)
- `src/data/strom.ts` – samotný strom (`as const satisfies Strom`), zdroj pravdy
- `src/uprava.ts` – prepnutie jedného listu v texte `strom.ts` (používa ho edit mód, `vite.config.ts`)
- `web/` – webové zobrazenie stromu (Vite, bez frameworku): rozbaľovanie uzlov, rozbaliť/zbaliť všetko,
  rozbalenie po zvolenú úroveň, hľadanie, filter bežné / menej bežné / exotické. Predvolený je jednoduchý
  pohľad (preskočí uzly `-`, druh `*` a úrovne pod druhom, zlúči reťaze uzlov s jediným dieťaťom),
  prepínač **Detailný pohľad** zobrazí celý strom bez skrývania
- `test/strom.types.test.ts` – typové testy: overujú, že typy odmietnu chybný strom

## Model

Strom je jeden vnorený objekt s pevnou hĺbkou 17. Kľúč = názov uzla, hodnota =
uzly nasledujúcej úrovne. Hodnota listu (úroveň 17) hovorí, či je potravina na slovenskom
trhu **`"bežné"`**, **`"menej bežné"`** alebo **`"exotické"`**. Rank uzla vyplýva z hĺbky.

- **bežné** (sivé) – kúpi sa v bežnom supermarkete,
- **menej bežné** (oranžové) – dá sa kúpiť, ale nie v každom obchode alebo nie vždy (napr. egreš).
  Ide o dostupnosť, nie o pôvod, patria sem aj domáce potraviny, ktoré sa ťažko zháňajú,
- **exotické** (červené) – exotické, na slovenskom trhu ťažko dostupné.

**Verzia 1 je heuristika:** čo má Tesco v kategórii Ovocie, zelenina (vrátane pôvodnej ukážky),
je `"bežné"` (156 potravín); čo pribudlo až z Košíka, je `"exotické"` (118). Predpoklad: ak to
Tesco nemá, je to pravdepodobne exotické. Kategóriu treba ručne prejsť a opraviť podľa skúsenosti
(úroveň `"menej bežné"` pribudla neskôr, heuristika ju nepriraďuje).
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
medzistupne medzi triedou a radom, pri riasach a siniciach je na úrovni 5 podtrieda.

**Varieta vs. kultivar:** úroveň 14 je pre botanické variety, poddruhy a formálne skupiny
odrôd (brokolica, karfiol, cherry paradajky). Úroveň 15 je pre konkrétne odrody (Gala,
Granny Smith) a neformálne skupiny, ktoré sa na trhu rozlišujú (napr. červené / zelené
jablká, biele / červené hrozno).

**Jedlá časť** rozlišuje rôzne potraviny z toho istého organizmu (citrón – plod vs.
citrónová kôra; petržlen – koreň vs. vňať). Pri živočíchoch je to časť tela, lebo zloženie
sa medzi nimi líši: kuracie prsia vs. stehná vs. pečeň, bravčové karé vs. bok vs. tuk vs. koža.
Patria sem aj produkty živočícha (mlieko, vajce, med, ikry, sépiový atrament) a vnútornosti
(jazyk, držky, črevá). Jedlá časť `*` znamená mäso bez určenej
časti (celé kurča, mleté mäso, „bravčové mäso“ v zložení salámy) a pri mäkkýšoch, ktoré sa jedia
celé (slávky, ustrice, kalmáre, chobotnice). Pri zverine je karé chrbát a močing nožina.
Pri riasach sa je stielka (wakame, kombu, nori). Jednobunkové chlorella a spirulina majú
jedlú časť `*`, lebo sa jedia celé bunky.

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
keď spoľahlivý slovenský ani český neexistuje. Slovenské a české názvy sa overujú v BioLib.cz.

### Zdroj taxonómie

Platné mená a zaradenie sa riadia **jedným zdrojom pre každú ríšu**:

| Ríša | Zdroj | Čo z neho berieme |
|---|---|---|
| rastliny | **WCVP** – World Checklist of Vascular Plants (Kew), na webe ako [POWO](https://powo.science.kew.org/) | druh, rod, čeľaď |
| rastliny, vyššie úrovne | **APG IV** | rad, klady (úrovne 5–8) |
| huby | **Species Fungorum / Index Fungorum** (Kew) | druh, rod, čeľaď, rad |
| živočíchy | **Catalogue of Life** ([ChecklistBank](https://www.checklistbank.org/dataset/3LR), aktuálne vydanie) | druh, rod, tribus, podčeľaď, čeľaď, rad, trieda |
| živočíchy, klady | ryby: Nelson et al. 2016 (*Fishes of the World*, 5. vyd.); mäkkýše: Catalogue of Life; cicavce, vtáky, hmyz, kôrovce: ustálená fylogenéza | úrovne 5–7 |
| riasy a sinice | **WoRMS** – World Register of Marine Species ([API](https://www.marinespecies.org/rest/)) | ríša, oddelenie až druh |

Riasy nie sú jedna príbuzná skupina a WoRMS ich rozdeľuje do troch ríš: hnedé riasy (wakame,
kombu) sú v ríši **chromisty**, červené a zelené riasy (nori, chlorella) v ríši **rastliny**
ako samostatné oddelenia vedľa semenných a spirulina je sinica v ríši **baktérie**. WCVP pokrýva
len cievnaté rastliny a Catalogue of Life riasy takmer nemá (hnedé vôbec, nori len po rod),
preto aj riasy v ríši rastliny idú podľa WoRMS.

Podčeľade a tribusy WCVP neuvádza, preberajú sa z fylogenetických štúdií. Catalogue of Life
ich uvádza len pri časti živočíchov (Bovinae/Bovini, Antilopinae/Caprini, Cervinae/Cervini,
Capreolinae/Capreolini, Scombrinae, Salmoninae, Pleuronectinae, Apinae/Apini, podčeľade
mäkkýšov…). Ostatné sú doplnené z literatúry (Suinae/Suini, Phasianinae/Gallini, Phasianini,
Anatinae/Anatini, Anserinae/Anserini, Thunnini, Scombrini, Cyprinini, Oreochromini,
Pleuronectini, Hippoglossini, Acipenserinae), inak `TBD`. Čeľade, ktoré podčeľade nemajú
(sumcovité, zubaticovité, Penaeidae…), majú na úrovniach 10 a 11 `-`.

Úrovne 5–7 pri živočíchoch: ryby pododdiel / nadrad / séria (Euteleostei > Acanthopterygii >
Percomorpha), cicavce Eutheria > Boreoeutheria > Laurasiatheria / Euarchontoglires,
vtáky Neognathae > Galloanserae, hmyz Pterygota > Neoptera > Holometabola,
kôrovce Eumalacostraca > Eucarida, lastúrniky Autobranchia > vláskožiabrovce (Pteriomorphia) /
Heteroconchia > Imparidentia, hlavonožce dvojžiabrovce > desaťramenné / osemramenné dvojžiabrovce.
Jesetery (trieda chrupkokostnaté) majú na úrovniach 5–7 `-`.

Catalogue of Life vedie **kostnatých (Teleostei) ako triedu**, preto sú ryby zaradené priamo pod
triedou „kostnatí“ (predtým lúčoplutvé > kostnatí). Domáca sviňa je samostatný druh *Sus domesticus*
(sviňa domáca), kura je *Gallus gallus* (kur bankivský), kačica *Anas platyrhynchos* (kačica divá),
hus *Anser anser* (hus divá), králik *Oryctolagus cuniculus* (králik divý). Diviak lesný
(*Sus scrofa*) je iný druh v tom istom rode ako sviňa domáca. Domáce formy bez
poddruhu v Catalogue of Life majú na úrovni 14 `-`, plemeno je na úrovni 15 (mangalica, iberico,
wagyu). Plemeno sa zapisuje len vtedy, keď sa mäso zložením výrazne líši (tuk, mramorovanie),
preto Angus nie je samostatné plemeno.

Ďalšie rozhodnutia Catalogue of Life, ktoré strom preberá: jesetery sú samostatná trieda
Chondrostei (chrupkokostnaté), nie kostnatí. Sardinka je v čeľadi Alosidae, oddelenej od
sleďovitých. Mečúň patrí do radu Carangiformes. Keď Catalogue of Life čeľaď nezaradí do žiadneho
radu (mořčákovití, Latidae, zubaticovité, osmonohovité), rad je `-`. Tichomorská ustrica je
*Magallana gigas* (predtým *Crassostrea gigas*), pangas je v rode *Pangasianodon* (obchodne *Pangasius*),
kreveta bielonohá v rode *Penaeus* (predtým *Litopenaeus vannamei*).

Keď zdroj presunie druh do iného rodu, druh si ponechá zaužívaný slovenský názov:
rozmarín lekársky v rode šalvia, hrach siaty v rode hrachor (*Lathyrus oleraceus*),
hadomor španielsky v rode *Pseudopodospermum*, valeriánka poľná v rode valeriána,
šošovica jedlá v rode vika (*Vicia lens*).

Keď zdroj zlúči kultúrne rastliny do jedného druhu, rozlišujú sa na úrovni 14 ako skupiny odrôd
alebo variety: pomaranč a grapefruit v *Citrus × aurantium*, citrón a bergamot v *C. × limon*,
kiwi a kiwi Gold ako variety *deliciosa* a *chinensis* aktinídie čínskej. Reďkev je
*Raphanus raphanistrum* subsp. *sativus* (reďkev ohnicová). Poddruh sa nevypisuje, lebo iný
v strome nie je, a úroveň 14 nesie skupiny odrôd (reďkovka, reďkev čierna, daikon).
Tvrdá pšenica je poddruh *Triticum turgidum* subsp. *durum*, na úrovni 14 ako „durum“.
Repka olejná je na úrovni 14 kapusty repkovej vedľa kvaky.

### Mimo stromu

Spracovanie (surové, varené, fermentované, sušené, údené…) a pôvod (divý vs. chovaný…) do stromu
nepatria. Budú samostatná os. Preto napr. kvasená kapusta, hrozienka či džús patria k tej istej
potravine ako čerstvá surovina. Rovnako údené, sušené či varené mäso
patrí k surovej časti tela (šunka k stehnu, slanina k boku alebo tuku), syr k mlieku a olej k semenu.
Do stromu nepatrí ani vek či pohlavie zvieraťa:
teľacie je hovädzie, sliepka aj kurča sú kura.

## Manuálne overenie

`npm run typecheck` stráži **tvar** stromu (hĺbka 17, list = `"bežné"` / `"menej bežné"` / `"exotické"`, značka nie je názvom
potraviny). Nasledujúce veci
typy nezachytia a **pri každej zmene dát ich treba overiť manuálne**:

1. **Taxón je v strome len raz.** Ten istý rod, čeľaď atď. nesmie byť na dvoch
   rôznych cestách (napr. rod `kapusta` pod dvoma rôznymi čeľaďami).
2. **Názov potraviny (list) je v celom strome unikátny.**
3. **Uzol je na správnej úrovni.** Napr. tribus nesmie byť v slote podčeľade.
4. **Taxonómia je vecne správna** (overiť v zdrojoch vyššie).
5. **Názov dodržiava poradie jazykov** slovensky > česky > latinsky.
6. **Jedlá časť je skutočná časť** rastliny/huby/živočícha (plod, súkvetie, hlávka, svalovina,
   stehno, pečeň…), nie spôsob úpravy.
7. **Kategória bežné / menej bežné / exotické** zodpovedá realite (verzia 1 je len heuristika podľa Tesca).

Body 1–4 sú prejdené pre celý strom (274 potravín) k 24. 9. 2026. Platnosť mien druhov
a čeľade sú porovnané s WCVP (rastliny) a Species Fungorum (huby), cez ich kópie na GBIF.
K 25. 9. 2026 pribudlo 83 potravín (spolu 357): živočíchy porovnané s Catalogue of Life
(API ChecklistBank, dataset `3LR`), nové rastliny s WCVP. Všetky nové potraviny majú zatiaľ
`"bežné"`, lebo sú v Tescu (rovnaká heuristika ako pri ovocí a zelenine).
Neskôr v ten istý deň pribudlo 77 živočíšnych potravín (spolu 434, živočíchov 150) z kategórií
mäso, hydina, ryby, morské plody a divina na Košíku. Nové sú mäkkýše, kôrovce, jesetery, divina
(daniel, srnec, diviak, bažant), ikry a ďalšie časti tela. Druh rýb a morských plodov je podľa
latinského názvu na produkte (povinné označenie v EÚ), každý druh je porovnaný s Catalogue of Life.
Dostupnosť tu nie je podľa Tesca, ale odhad: 11 bežné, 50 menej bežné (mäsiarstvo, Metro,
e-shop), 16 exotické. Treba ju ručne prejsť.
Potom pribudli riasy, sinica a slanorožec (6 potravín, spolu 440). Wakame a slanorožec sú
z Košíka. Nori, kombu, chlorella a spirulina sú doplnené ako bežne predávané jedlé riasy mimo
týchto zdrojov. Riasy a sinica sú porovnané s WoRMS, slanorožec s WCVP.

### Otvorené body na overenie

- **Česky, lebo slovenský názov nepoznáme:** superrosidy, superasteridy, rosidy, asteridy,
  fabidy, malvidy, lamiidy, kampanulidy, komelinidy, magnoliidy, kostnatí, hrušeň písečná,
  ořechovec (pekan), ledvinovníkovité / ledvinovník západní (kešu), lilek rajče (paradajka),
  brusnice chocholičnatá (čučoriedky), lubenice obecná (melón vodový), hlíva máčková
  (hliva kráľovská), paprika čínská (habanero), čekanka endivie (frisée), voňatka citronová
  (citrónová tráva), pšenice naduřelá (*Triticum turgidum*, tvrdá pšenica), mořčákovití,
  pangasovití, pangas / pangas spodnooký, keříčkovcovití, platýsovití, pakambalovití / pakambala,
  ústřicovití, manitolka japonská (kombu).
- **Slovenský názov so strednou istotou:** viničotvaré, vrbicovité (Lythraceae),
  povojník batátový, papája melónová, artičoka kardová, šalvia hispánska, ľuľok baklažánový,
  tekvica obrovská, tekvica muškátová, kapusta repová, kapusta repková, egreš obyčajný,
  majorán záhradný, húževnatec jedlý (shiitake), trsovnica lupeňovitá (maitake),
  plamienka zamatová (enoki), kuriatkotvaré, uchovcotvaré, kysličkotvaré, placentovce (Eutheria),
  zúbkozobce (Anseriformes), makrelotvaré (Scombriformes), sleďotvaré, treskotvaré, sardelovité,
  tolstolobik biely, kapor obyčajný, zubáč veľkoústy, tilápia nílska, olivovník európsky.
  Živočíchy z 25. 9. 2026 (BioLib bol za kontrolou proti robotom, mená sú zo slovenskej Wikipédie,
  Wikidat a zo slovenských obchodných názvov na obaloch): srnec lesný (staršie srnec hôrny),
  bažant obyčajný (aj bažant poľovný), okúň branzino (obchodne morský vlk), sumec veľký
  (Wikipédia: sumec západný), sumček africký, ostriež nílsky, pražma zlatá, zubaticovité,
  platesa obyčajná, halibut grónsky / atlantický, kambala veľká, mečúň obyčajný (aj mečiar),
  hranáč sivý, obloplutváčovité, sardinka európska, kalmár peruánsky, kalmár obyčajný, gordan,
  osmonoh obyčajný (staršie chobotnica obyčajná), pošvica americká, kreveta bielonohá, krab kamčatský.
  Riasy: chromisty, hnedé riasy, červené riasy, zelené riasy, chlorela, sinice, slanorožec
  bylinný (česky slanorožec evropský).
- **Latinsky:** podčeľade a tribusy, rod *Citrus* a jeho druhy, *Musa acuminata* (banán),
  *Selenicereus* (dračie ovocie), *Averrhoa carambola*, *Euterpe oleracea* (acai),
  *Vigna radiata* / *angularis* (mungo, azuki), *Hypsizygus tessulatus* (shimeji),
  *Thymus × citriodorus*, *Pseudopodospermum* (čierny koreň), variety *deliciosa* / *chinensis*
  (kiwi), vyššie taxóny a niektoré čeľade húb a rýb, klady živočíchov (Boreoeutheria,
  Laurasiatheria, Euarchontoglires, Neognathae, Galloanserae, Otomorpha, Clupei, Ostariophysi,
  Euteleostei, Protacanthopterygii, Paracanthopterygii, Acanthopterygii, Percomorpha, Pterygota,
  Neoptera, Holometabola), rad Cichliformes, rody *Oncorhynchus*, *Katsuwonus*, *Oreochromis*,
  poddruh *durum*. Zo živočíchov 25. 9. 2026: klady Eumalacostraca, Eucarida, Autobranchia,
  Heteroconchia, Imparidentia; rady Carangiformes, Mytilida, Ostreida, Pectinida, Venerida,
  Oegopsida, Myopsida; čeľade Alosidae, Latidae, Mytilidae, Pectinidae, Veneridae, Pharidae,
  Penaeidae, Lithodidae; rody *Clarias*, *Pollachius*, *Dicentrarchus*, *Lates*, *Hippoglossus*,
  *Reinhardtius*, *Cyclopterus*, *Magallana*, *Placopecten*, *Ruditapes*, *Dosidicus*, *Illex*,
  *Amphioctopus*, *Penaeus*, *Metapenaeus*, *Paralithodes*; druhy *Magallana gigas*,
  *Placopecten magellanicus* (hrebenatka), *Ruditapes decussatus* (vongole), *Illex argentinus*,
  *Todarodes pacificus*, *Amphioctopus membranaceus* (baby chobotnica), *Penaeus monodon*
  (tigrie krevety), *Metapenaeus monoceros*. Listy *Magallana gigas*, *Illex argentinus*,
  *Todarodes pacificus* a *Metapenaeus monoceros* sú latinsky, lebo slovenský názov potraviny
  by ich neodlíšil od príbuzných druhov (ustrice, kalamáre, krevety). Riasy a sinica: Ochrophyta,
  Fucophycidae, Laminariales, Alariaceae, Laminariaceae, *Undaria pinnatifida* (wakame),
  *Saccharina*, Eurhodophytina, Bangiophyceae, Bangiophycidae, Bangiales, Bangiaceae,
  *Pyropia yezoensis* (nori), Chlorophytina, Trebouxiophyceae, Chlorellales, Chlorellaceae,
  *Chlorella vulgaris*, Cyanophyceae, Oscillatoriophycidae, Oscillatoriales, Microcoleaceae,
  *Arthrospira platensis* (spirulina); podčeľaď a tribus slanorožca (Salicornioideae, Salicornieae).
- **Taxonomické neistoty:** rukola (rod *Eruca* alebo *Diplotaxis*, preto `TBD`);
  grapefruit Sweetie je kríženec pomela a grapefruitu, zaradený pod grapefruit;
  jarná cibuľka môže byť aj *Allium fistulosum*; melón gália zaradený do skupiny Reticulatus;
  podčeľaď tekvicovitých, kapustovitých a ďalšie `TBD`; chilli Rawit a zmesi chilli sú pod
  rodom paprika bez určeného druhu; biela a zelená špargľa sú jedna potravina (rozdiel je
  v spôsobe pestovania, nie v taxóne ani časti rastliny).
- **Živočíchy:** tribus moriaka je `TBD`; tribus lososa aj pstruha je Salmonini;
  treskovité ryby, tuniak a makrela sú všeobecné potraviny, lebo produkty druh neuvádzajú;
  jelenie mäso zaradené pod jeleňa lesného; vykŕmená kačacia pečeň (Piroska) býva
  z kríženca mulard (pižmovka × kačica), zaradená pod kačicu; brusnice v paštétach zaradené
  na brusnice veľkoplodé (Bruselská paštéta ich tak uvádza, Májka len „brusnice“);
  olivy zelené / čierne sú neformálne skupiny na úrovni 15 (zrelosť, nie odroda).
- **Živočíchy z Košíka (25. 9. 2026):** ustrice Fines de Claire sú na produkte označené ako
  *Ostrea edulis*, hoci bývajú *Magallana gigas*, zaradené podľa obalu; ikry z divého lososa
  druh neuvádzajú, sú pod rodom *Oncorhynchus* bez druhu (divý atlantický losos sa takmer
  nepredáva); sépiový atrament je pod rodom sépia bez druhu, jeden z produktov uvádza atrament
  z kalmárov; *Metapenaeus monoceros* sa predáva ako „tigrie krevety“; ikry hranáča sa predávajú
  ako „kaviár“ (nemecký, červený), pravý kaviár je len jeseterový; jahňací predoček je plece,
  hrebienok karé; hanger, Denver, picanha, T-bone a podobné steaky patria k existujúcim častiam
  alebo k `*`. Nezaradené: zmesi (polievkové zmesi, morské šaláty, koktejl z morských plodov,
  mleté mäso mix, čevabčiči), surimi (krabie tyčinky), napodobeniny kaviáru (perly s 5 % vývaru
  z jesetera, vegetariánsky kaviár, čierny kaviár bez zloženia).
- **Riasy:** nori sa vyrába aj z *Pyropia tenera*, zaradené je pod *P. yezoensis*; AlgaeBase
  vedie *P. yezoensis* v rode *Neopyropia* a novšie práce radia komerčné kmene spiruliny do rodu
  *Limnospira*, strom sa drží WoRMS (*Pyropia*, *Arthrospira platensis*); kombu môže byť aj
  z iných druhov *Saccharina* či *Laminaria*;
  *Laminaria hyperborea* z vegetariánskeho kaviáru nie je zaradená (je ho v produkte 4 %).

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
| 10 | podčeľaď | Brassicoideae |
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
citrónová kôra; petržlen – koreň vs. vňať). Je to skutočná časť organizmu, nie produkt ani
spôsob úpravy: reďkovka, repa a zeler majú buľvu, mikrozelenina klíčnu rastlinu, liči a
marakuja miešok (arillus). Pri živočíchoch je to časť tela, lebo zloženie
sa medzi nimi líši: kuracie prsia vs. stehná vs. pečeň, bravčové karé vs. bok vs. tuk vs. koža.
Obchodný rez je len v názve potraviny, jedlá časť je anatomická a pri všetkých druhoch rovnaká:
karé a roštenka sú chrbát, krkovička krk, panenka sviečkovica, koleno a močing nožina.
Patria sem aj produkty živočícha (mlieko, vajce, med, ikry, sépiový atrament) a vnútornosti
(jazyk, držky, črevá). Jedlá časť `*` znamená mäso bez určenej
časti (celé kurča, mleté mäso, „bravčové mäso“ v zložení salámy) a pri mäkkýšoch, ktoré sa jedia
celé (slávky, ustrice, kalmáre, chobotnice).
Pri riasach sa je stielka (wakame, kombu, nori). Jednobunkové chlorella a spirulina majú
jedlú časť `*`, lebo sa jedia celé bunky.

### Značky

| Značka | Význam |
|---|---|
| `-` | úroveň pre túto líniu **neexistuje** |
| `TBD` | úroveň existuje, **ešte nie je doplnená** |
| `*` | úroveň existuje, ale potravinu **nerozlišujeme** (všeobecná, napr. akákoľvek brokolica) |

Všetky tri značky môžu mať súrodencov. Napr. pod „pravé dvojklíčnolistové“ je `-`
(mak a makadámia nepatria do žiadneho nadkladu) vedľa „superrosidy“ a „superasteridy“.

### Názvy

Poradie preferencie: **slovensky > česky > latinsky**. Latinský názov len vtedy,
keď spoľahlivý slovenský ani český neexistuje. Pri taxónoch má prednosť úradné slovenské meno pred
hovorovým, aj keď je dvojslovné (rod *Thymus* je materina dúška) alebo menej zaužívané
(rajčiak jedlý, zemiak obyčajný). Listy sú bežné obchodné názvy potravín (zázvor pod rodom ďumbier,
mečúň pod mečiarom veľkým).

Zdroje slovenských mien: rastliny SlovPlantList / Pladias.sk (mená schválené Nomenklatorickou
komisiou Slovenskej botanickej spoločnosti), rady a čeľade Hrabovský, Zahradníková, Mičieta 2016
(*Acta Botanica Universitatis Comenianae* 51: 9–21, slovenské mená pre APG IV); ryby Hensel
(slovenské menoslovie rýb); ostatné živočíchy systém zoológie PriF UK a sk Wikipédia; huby nahuby.sk;
české mená BioLib.cz a Pladias. BioLib a jazykový portál SAV skripty blokujú.

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

Podčeľade a tribusy WCVP neuvádza, preberajú sa z aktuálnej fylogenetickej klasifikácie čeľade
(napr. Brassicoideae podľa German et al. 2023, Amherstieae pri tamarinde podľa de la Estrella
et al. 2018, Agaricoideae pri šampiňónoch podľa Li et al. 2025). Keď aktuálna klasifikácia čeľade
podčeľade alebo tribusy nepoužíva (tekvicovité, vavrínovité, pupencovité, kaparovité, tribusy
obličkovcovitých a bukovitých), je tam `-`. Catalogue of Life
ich uvádza len pri časti živočíchov (Bovinae/Bovini, Antilopinae/Caprini, Cervinae/Cervini,
Capreolinae/Capreolini, Scombrinae, Salmoninae, Pleuronectinae, Apinae/Apini, podčeľade
mäkkýšov…). Ostatné sú doplnené z literatúry (Suinae/Suini, Phasianinae/Gallini, Phasianini,
Tetraonini pri morke, Anatinae/Anatini, Anserinae/Anserini, Thunnini, Scombrini, Luciopercini,
Cyclopterinae, Oreochromini, Pleuronectini, Hippoglossini, Acipenserinae). Čeľade, ktoré podčeľade
nemajú (sleďovité, sumcovité, zubaticovité, Penaeidae…), majú na úrovniach 10 a 11 `-`. Kapor má
tribus `-`, lebo podčeľaď Cyprininae v užšom zmysle, ako ju vedie Catalogue of Life, je totožná
s tribusom Cyprinini.

Úrovne 5–7 pri živočíchoch: ryby pododdiel / nadrad / séria (Euteleostei > Acanthopterygii >
Percomorpha), cicavce placentovce > Boreoeutheria > Laurasiatheria / Euarchontoglires,
vtáky letce > Galloanserae, hmyz krídlatce > novokrídlatce > holometabolný hmyz,
kôrovce pravé rakovce > panciernaté rakovce, lastúrniky Autobranchia > vláskožiabrovce (Pteriomorphia) /
Heteroconchia > Imparidentia, hlavonožce dvojžiabrovce > desaťramenné / osemramenné dvojžiabrovce.
Jesetery (trieda chrupkokostnaté) majú na úrovniach 5–7 `-`. Ucho Judášovo je v podtriede
Auriculariomycetidae (úroveň 5), ostatné huby v Agaricomycetidae alebo `-`.

Catalogue of Life vedie **kostnaté (Teleostei) ako triedu**, preto sú ryby zaradené priamo pod
triedou „kostnaté“ (predtým lúčoplutvé > kostnatí). Domáca sviňa je samostatný druh *Sus domesticus*
(sviňa domáca), kura je *Gallus gallus* (kura divá), morka *Meleagris gallopavo* (morka divá),
kačica *Anas platyrhynchos* (kačica divá),
hus *Anser anser* (hus divá), králik *Oryctolagus cuniculus* (králik divý). Diviak lesný
(*Sus scrofa*) je iný druh v tom istom rode ako sviňa domáca. Úroveň 14 je pri živočíchoch `*`,
keď má druh v Catalogue of Life poddruhy, ktoré nerozlišujeme (diviak, jeleň, králik, vtáky,
slávka jedlá), inak `-`. Plemeno je na úrovni 15 (mangalica, iberico,
wagyu). Plemeno sa zapisuje len vtedy, keď sa mäso zložením výrazne líši (tuk, mramorovanie),
preto Angus nie je samostatné plemeno.

Ďalšie rozhodnutia Catalogue of Life, ktoré strom preberá: jesetery sú samostatná trieda
Chondrostei (chrupkokostnaté), nie kostnaté. Sardinka je v čeľadi Alosidae, oddelenej od
sleďovitých. Mečiar veľký (mečúň) patrí do radu Carangiformes. Keď Catalogue of Life čeľaď nezaradí do žiadneho
radu (mořčákovití, Latidae, zubaticovité, osmonohovité), rad je `-`. Tichomorská ustrica je
*Magallana gigas* (predtým *Crassostrea gigas*), pangas je v rode *Pangasianodon* (obchodne *Pangasius*),
kreveta bielonohá v rode *Penaeus* (predtým *Litopenaeus vannamei*).
Druh rýb a morských plodov je podľa latinského názvu na produkte (povinné označenie v EÚ).

Keď zdroj presunie druh do iného rodu, druh si ponechá zaužívaný slovenský názov:
rozmarín lekársky v rode šalvia, hrach siaty v rode hrachor (*Lathyrus oleraceus*),
hadomor španielsky v rode *Pseudopodospermum*, valeriánka poľná v rode valeriána,
šošovica jedlá v rode vika (*Vicia lens*).

Keď zdroj zlúči kultúrne rastliny do jedného druhu, rozlišujú sa na úrovni 14 ako skupiny odrôd
alebo variety: pomaranč, grapefruit a mandarínka v *Citrus × aurantium* (mandarínky sú vo WCVP
f. *deliciosa*, *C. reticulata* je len planý druh), citrón a bergamot v *C. × limon*,
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
Do stromu nepatria ani zmesi (polievkové zmesi, morské šaláty, koktejl z morských plodov, mleté
mäso mix, čevabčiči), surimi (krabie tyčinky) a napodobeniny kaviáru.

## Manuálne overenie

`npm run typecheck` stráži **tvar** stromu (hĺbka 17, list = `"bežné"` / `"menej bežné"` / `"exotické"`, značka nie je názvom
potraviny). Ručne treba ešte prejsť **dostupnosť**: kategória bežné / menej bežné / exotické
musí zodpovedať realite. Zatiaľ je to len heuristika. Ovocie a zelenina: čo má Tesco, je
`"bežné"`, čo pribudlo až z Košíka, je `"exotické"`. Ďalších 83 potravín (ostatné rastliny a prvé
živočíchy) má `"bežné"`, lebo sú v Tescu. 77 živočíšnych potravín z Košíka (mäkkýše, kôrovce,
jesetery, divina, ikry a ďalšie časti tela) má odhad: 11 bežné, 50 menej bežné (mäsiarstvo, Metro,
e-shop), 16 exotické. Riasy, sinica a slanorožec (6 potravín) sú doplnené ako bežne predávané.

### Otvorené body na overenie

- **Česky, lebo slovenský názov nepoznáme:** vigna zlatá / vigna hranatá (mungo, azuki),
  karambola obecná, banánovník zašpičatělý (banán), euterpe brazilská (acai), pšenice naduřelá
  (*Triticum turgidum*, tvrdá pšenica), voňatka / voňatka citronová (citrónová tráva), manitolka
  japonská (kombu), mořčákovití, pangasovití, pangas / pangas spodnooký, platýsovití,
  pakambalovití / pakambala, ústřicovití.
- **Slovenský názov so strednou istotou:**
  - rastliny: hruška hruškolistá (nashi), tamarind indický, jahoda ananásová, liči čínske
    (sk Wikipédia: dvojslivka čínska), melón cukrový (aj uhorka žltá), pistácia pravá, mangovník
    indický, papája melónová, mučenka jedlá, kapara tŕnitá, citrónovník pravý / horký / obrovský,
    tekvica obrovská, kapusta repková, reďkev ohnicová (Pladias: reďkev poľná), hruškovec americký
    (avokádo, aj perzea americká), ananás pestovaný, euterpa, kurkuma dlhá (sk Wikipédia: kurkuma
    pravá), vanilka pravá (aj vanilka voňavá), kokosovník orechový, artičoka kardová, majorán
    záhradný, opuncia figová (aj opuncia mexická), sezam indický, slanorožec bylinný,
    kaktusovité (sk Wikipédia: opunciovité), olivovité (Wikidata: olivovníkovité)
  - huby: húževnatec jedlý (shiitake), trsovnica lupeňovitá (maitake), plamienka zimná (enoki),
    hliva kotúčová (hliva kráľovská), mramorovec rozpukaný (shimeji), kuriatkotvaré, uchovcotvaré
  - živočíchy: placentovce, kura divá (možno kura bankivská), morka divá, makrelotvaré,
    sleďotvaré, treskotvaré, sardelovité, tolstolobik biely, kapor obyčajný, zubáč veľkoústy,
    srnec lesný (staršie srnec hôrny), bažant obyčajný (aj bažant poľovný), okúň branzino
    (obchodne morský vlk), sumec veľký (Wikipédia: sumec západný), ostriež nílsky, pražma zlatá,
    zubaticovité, platesa obyčajná, treska škvrnitá, halibut atlantický / grónsky (Beliana: halibut
    svetlý / tmavý), kambala veľká, hranáč / hranáč sivý, obloplutváčovité, sardinka európska,
    ustrica tichomorská (aj ustrica veľká), kalmár peruánsky, kalmár obyčajný, kalmarovité (rod je
    kalmár), gordan, osmonoh obyčajný (staršie chobotnica obyčajná), pošvica americká, kreveta
    bielonohá, krab kamčatský
  - konkurenčné slovenské názvy: rod sviňa a čeľaď sviňovité (sk Wikipédia: diviak, diviakovité),
    kurotvaré (aj hrabavce), zajacotvaré (aj dvojitozubce), cichlidovité (Hensel: cichlovité),
    Acanthopterygii (aj tŕňoplutvovce)
  - riasy: chromisty, hnedé riasy, červené riasy, zelené riasy, chlorela, sinice
- **Latinsky:**
  - rastliny: podčeľade a tribusy, rod *Pseudopodospermum* (čierny koreň), *Selenicereus*
    (dračie ovocie), *Thymus × citriodorus*, *Citrus × latifolia*, *C. japonica*,
    *C. × microcarpa*, *C. × junos*, variety kiwi *deliciosa* / *chinensis*, epitety na úrovni 14
    (foliosum, crispum, scolymus, durum, azoricum), skupiny odrôd melóna Inodorus, Cantalupensis,
    Reticulatus
  - huby: Agaricomycotina, Agaricomycetes, Agaricomycetidae, Auriculariomycetidae, Omphalotaceae,
    Lyophyllaceae, Physalacriaceae, Grifolaceae
  - živočíchy: klady Boreoeutheria, Laurasiatheria, Euarchontoglires, Galloanserae, Otomorpha,
    Clupei, Ostariophysi, Euteleostei, Protacanthopterygii, Paracanthopterygii, Acanthopterygii,
    Percomorpha, Autobranchia, Heteroconchia, Imparidentia; rady Carangiformes, Cichliformes,
    Mytilida, Ostreida, Pectinida, Venerida, Oegopsida, Myopsida; čeľade Alosidae, Latidae,
    Mytilidae, Pectinidae, Veneridae, Pharidae, Penaeidae, Lithodidae; rody *Oncorhynchus*,
    *Pollachius*, *Katsuwonus*, *Hippoglossus*, *Reinhardtius*, *Dicentrarchus*, *Lates*,
    *Oreochromis*, *Penaeus*, *Metapenaeus*, *Paralithodes*, *Magallana*, *Placopecten*,
    *Ruditapes*, *Dosidicus*, *Illex*, *Amphioctopus*; druhy *Penaeus monodon* (tigrie krevety),
    *Metapenaeus monoceros*, *Placopecten magellanicus* (hrebenatka), *Ruditapes decussatus*
    (vongole), *Amphioctopus membranaceus* (baby chobotnica). List *Metapenaeus monoceros* je
    latinsky, lebo sa predáva ako „tigrie krevety“, čo už nesie *P. monodon*.
  - riasy a sinica: všetky taxóny pod úrovňou oddelenia (*Undaria pinnatifida* – wakame,
    *Saccharina* – kombu, *Pyropia yezoensis* – nori, *Chlorella vulgaris*, *Arthrospira platensis* –
    spirulina…), podčeľaď a tribus slanorožca (Salicornioideae, Salicornieae).
- **Rastliny, rozhodnutia na posúdenie:**
  - rukola je pod *Diplotaxis tenuifolia* (dvojradovka tenkolistá), lebo balená rukola na
    slovenskom trhu je takmer celá tento druh. *Eruca sativa* sa predáva zriedka a obal druh neuvádza;
  - mandarínka je pod *C. × aurantium*, limeta pod *C. × latifolia* (mexická limeta sa predáva zriedka);
  - karfiol je pod *B. oleracea*, hoci WCVP vedie meno var. *botrytis* ako synonymum *B. cretica*;
  - ringlota je pod slivkou domácou: WCVP presúva subsp. *italica* do *Prunus insititia*, ale
    ringloty (var. *claudiana*) nechá v *P. domestica*;
  - tribusy a podčeľade, ktoré nie všetky súčasné prehľady používajú: Coryleae (lieska),
    Valerianeae (valeriánka), Punicoideae (Lythroideae je parafyletická);
  - cherry paradajky (var. *cerasiforme*) a thajská bazalka (var. *thyrsiflorum*) sú na úrovni 14
    ako skupiny odrôd, hoci ich WCVP ako variety neuznáva. Witloof a Radicchio sú na úrovni 15,
    hoci sú to formálne skupiny odrôd, lebo úroveň 14 nesie var. *foliosum*;
  - druh `*`: rebarbora (*Rheum × hybridum* alebo *R. rhabarbarum*), goji (*Lycium barbarum* alebo
    *L. chinense*), dračie ovocie, makadámia, černice;
  - grapefruit Sweetie je kríženec pomela a grapefruitu, zaradený pod grapefruit; jarná cibuľka môže
    byť aj *Allium fistulosum*; melón gália je v skupine Reticulatus; chilli Rawit a zmesi chilli sú
    pod rodom paprika bez určeného druhu; biela a zelená špargľa sú jedna potravina (rozdiel je
    v spôsobe pestovania, nie v taxóne ani časti rastliny).
- **Huby:** pestované enoki býva *Flammulina filiformis*, sušené ucho Judášovo z Ázie *Auricularia
  heimuer* alebo *A. cornea* a shimeji aj *Hypsizygus marmoreus*. Strom ich zaraďuje podľa mena
  na obale (*F. velutipes*, *A. auricula-judae*, *H. tessulatus*).
- **Živočíchy:**
  - tribus lososa aj pstruha je Salmonini a jesetery majú podčeľaď Acipenserinae, hoci ich
    Catalogue of Life ani Catalog of Fishes nepoužívajú;
  - treskovité ryby, tuniak a makrela sú všeobecné potraviny, lebo produkty druh neuvádzajú;
    jelenie mäso je zaradené pod jeleňa lesného; vykŕmená kačacia pečeň (Piroska) býva z kríženca
    mulard (pižmovka × kačica), zaradená pod kačicu; brusnice v paštétach sú zaradené na kľukvu
    veľkoplodú (Bruselská paštéta ich tak uvádza, Májka len „brusnice“); olivy zelené / čierne sú
    neformálne skupiny na úrovni 15 (zrelosť, nie odroda);
  - ustrice Fines de Claire sú na produkte označené ako *Ostrea edulis*, hoci bývajú
    *Magallana gigas*, zaradené podľa obalu; ikry z divého lososa druh neuvádzajú, sú pod rodom
    *Oncorhynchus* bez druhu; sépiový atrament je pod rodom sépia bez druhu, jeden z produktov
    uvádza atrament z kalmárov; pošvica americká je *Ensis directus*, v Európe sa dnes vedie ako
    *E. leei* a predávajú sa aj *E. siliqua* a *E. ensis*;
  - ikry hranáča sa predávajú ako „kaviár“ (nemecký, červený), pravý kaviár je len jeseterový.
    List „jeseterový kaviár“ je obchodný názov, jedlá časť sú ikry;
  - jahňací predoček je plece, hrebienok chrbát (karé); hanger, Denver, picanha, T-bone a podobné
    steaky patria k existujúcim častiam alebo k `*`;
  - obchodné názvy rýb a morských plodov neboli porovnané s úradným Zoznamom obchodných názvov
    produktov rybolovu a akvakultúry (MPRV SR).
- **Riasy:** WoRMS vedie ako platné *Pyropia yezoensis* aj novší *Neopyropia yezoensis*. Strom sa drží
  *Pyropia* a nori sa vyrába aj z *P. tenera*. Novšie práce radia komerčné kmene spiruliny do rodu
  *Limnospira*, strom sa drží *Arthrospira platensis*. Kombu môže byť aj z iných druhov *Saccharina*
  či *Laminaria*.

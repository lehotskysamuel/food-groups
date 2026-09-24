import type { Potravina } from "../../strom.types";
import type { strom } from "../strom";

/**
 * Produkty z kategórie Ovocie, zelenina na potravinydomov.itesco.sk (24. 9. 2026, strany 9 → 1, 422 produktov)
 * a potraviny zo stromu, na ktoré sa mapujú. Typecheck overí, že každá potravina v strome existuje.
 */
export type StavProduktu = "zaradené" | "neúplné" | "vylúčené";

export interface ProduktTesco {
  readonly nazov: string;
  readonly stav: StavProduktu;
  readonly potraviny?: readonly Potravina<typeof strom>[];
  readonly dovod?: string;
}

export const ZDROJ = "https://potravinydomov.itesco.sk/shop/sk-SK/browse/ovocie-zelenina/all?sortBy=price-descending&count=48";

export const produkty = [
  {
    "nazov": "Nektárinky",
    "potraviny": [
      "nektárinky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Broskyne skladané",
    "potraviny": [
      "broskyne"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Uhorka šalátová ks",
    "potraviny": [
      "uhorka šalátová"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Kiwi ks",
    "potraviny": [
      "kiwi"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Jablká Cosmic Crisp",
    "potraviny": [
      "jablko Cosmic Crisp"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tekvica maslová voľná",
    "potraviny": [
      "tekvica maslová"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Slnečnicové semená lúpané pražené 100 g",
    "potraviny": [
      "slnečnicové semená"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Limety ks",
    "potraviny": [
      "limeta"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tekvica ozdobná voľná",
    "stav": "vylúčené",
    "dovod": "ozdobná tekvica – nie potravina"
  },
  {
    "nazov": "The Grower's Harvest Cibuľa žltá 1 kg",
    "potraviny": [
      "cibuľa žltá"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Grapefruit červený voľný",
    "potraviny": [
      "grapefruit červený"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Jablká Granny Smith ukladané",
    "potraviny": [
      "jablko Granny Smith"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Petržlen voľný",
    "potraviny": [
      "petržlen koreň"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Hrušky Conference ukladané",
    "potraviny": [
      "hruška Conference"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Kapusta pekingská voľná",
    "potraviny": [
      "kapusta pekingská"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Kápia paprika",
    "potraviny": [
      "paprika kápia"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Hrušky červené ukladané",
    "potraviny": [
      "hruška červená"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Jablká Golden delicious ukladané",
    "potraviny": [
      "jablko Golden Delicious"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Uhorky nakladačky voľné",
    "potraviny": [
      "uhorky nakladačky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Hrušky Xenia ukladané",
    "potraviny": [
      "hruška Xenia"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Hrušky zelené ukladané",
    "potraviny": [
      "hruška zelená"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Paradajky",
    "potraviny": [
      "paradajky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Zemiaky voľné skoré",
    "potraviny": [
      "zemiaky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Jablká Gala ukladané",
    "potraviny": [
      "jablko Gala"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Cesnak voľný",
    "potraviny": [
      "cesnak"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Banány voľné",
    "potraviny": [
      "banán"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Jablká Jonaprice ukladané",
    "potraviny": [
      "jablko Jonaprince"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Slivky voľné",
    "potraviny": [
      "slivky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Cibuľa červená voľná",
    "potraviny": [
      "cibuľa červená"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Citróny voľné",
    "potraviny": [
      "citrón"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Jablká červené voľné",
    "potraviny": [
      "jablko červené"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Cibuľa biela voľná",
    "potraviny": [
      "cibuľa biela"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Paprika biela voľná",
    "potraviny": [
      "paprika biela"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Zemiaky červené konzumné voľné",
    "potraviny": [
      "zemiaky červené"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Cibuľa voľná",
    "potraviny": [
      "cibuľa"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Repa červená voľná",
    "potraviny": [
      "červená repa"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Mrkva voľná",
    "potraviny": [
      "mrkva"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Šampiňóny voľné",
    "potraviny": [
      "šampiňón biely"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Hrozienka Sultana 200 g",
    "potraviny": [
      "hrozno biele"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Kapusta červená voľná",
    "potraviny": [
      "kapusta červená"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Andaco Červená kvasená kapusta 500 g",
    "potraviny": [
      "kapusta červená"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Chrumkavý šalát 130 g",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "nazov": "Tesco Coleslaw šalát 180 g",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "nazov": "Tesco Červená repa rezaná 510 g",
    "potraviny": [
      "červená repa"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Slnečnicové semená lúpané 200 g",
    "potraviny": [
      "slnečnicové semená"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tekvica voľná",
    "potraviny": [
      "tekvica"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Sezamové semená 200 g",
    "potraviny": [
      "sezamové semená"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Sušené jablkové lupienky s jahodovou príchuťou 20 g",
    "potraviny": [
      "jablko"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Cibuľky v sladkokyslom náleve 300 g",
    "potraviny": [
      "cibuľa"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Ľadový šalát",
    "potraviny": [
      "šalát ľadový"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Zmes pražených arašidov a sušených hrozienok 60 g",
    "potraviny": [
      "hrozno",
      "arašidy"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Zmes jadier suchých škrupinových plodov a sušených zlatých hrozienok 60 g",
    "potraviny": [
      "hrozno biele"
    ],
    "stav": "neúplné",
    "dovod": "zmes s nešpecifikovanými zložkami"
  },
  {
    "nazov": "Tesco Zmes jadier suchých škrupinových plodov a sušených hrozienok 60 g",
    "potraviny": [
      "hrozno"
    ],
    "stav": "neúplné",
    "dovod": "zmes s nešpecifikovanými zložkami"
  },
  {
    "nazov": "Pór ks",
    "potraviny": [
      "pór"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Zmes jadier mandlí a pražených kešu orechov 60 g",
    "potraviny": [
      "mandle",
      "kešu"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Pražené blanšírované jadrá mandlí 60 g",
    "potraviny": [
      "mandle"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Arašidy jadrá blanšírované pražené nesolené 200 g",
    "potraviny": [
      "arašidy"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Sušené jablkové lupienky 40 g",
    "potraviny": [
      "jablko"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Petržlen vňaťový 100 g",
    "potraviny": [
      "petržlenová vňať"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Uhorky poľné voľné",
    "potraviny": [
      "uhorky poľné"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Paprika žltá voľná",
    "potraviny": [
      "paprika žltá"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Baklažán voľný",
    "potraviny": [
      "baklažán"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Zmes pretlakov a štiav z viacerých druhov ovocia s kokosovým mliekom 250 ml",
    "potraviny": [
      "kokos"
    ],
    "stav": "neúplné",
    "dovod": "zmes s nešpecifikovanými zložkami"
  },
  {
    "nazov": "Tesco 100% šťava z jabĺk lisovaná za studena a cvikly 200 ml",
    "potraviny": [
      "jablko",
      "červená repa"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Zmes štiav a pretlakov z viacerých druhov ovocia 250 ml",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "nazov": "Tesco 100% pomarančová šťava lisovaná za studena, s dužinou 200 ml",
    "potraviny": [
      "pomaranč"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Zmes štiav a pretlakov z viacerých druhov ovocia 250 ml",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "nazov": "Reďkovka červená zväzok",
    "potraviny": [
      "reďkovka červená"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Pražené slnečnicové semená nelúpané 200 g",
    "potraviny": [
      "slnečnicové semená"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Mrkva zväzok ks",
    "potraviny": [
      "mrkva"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Koriander 20 g",
    "potraviny": [
      "koriandrová vňať"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Zemiaky sladké voľné",
    "potraviny": [
      "sladké zemiaky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Paprika červená voľná",
    "potraviny": [
      "paprika červená"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Semená tekvice bezšupkovej pražené 60 g",
    "potraviny": [
      "tekvicové semená"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Jednoporciový šalát 100 g",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "nazov": "Tesco Ľanové semená 200 g",
    "potraviny": [
      "ľanové semená"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Mäta pieporná 20 g",
    "potraviny": [
      "mäta pieporná"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Cibuľka lahôdková zväzok",
    "potraviny": [
      "jarná cibuľka"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Kaleráb ks",
    "potraviny": [
      "kaleráb"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Grapefruit Sweeti voľný",
    "potraviny": [
      "grapefruit Sweetie"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Zeler voľný",
    "potraviny": [
      "zeler buľvový"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Pomaranče voľné",
    "potraviny": [
      "pomaranč"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Figy čerstvé ks",
    "potraviny": [
      "figy"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Semená šalvie aztéckej 100 g",
    "potraviny": [
      "chia semená"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Fenikel voľný",
    "potraviny": [
      "fenikel"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Mandarínky voľné",
    "potraviny": [
      "mandarínka"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Biela kapusta v náleve 670 g",
    "potraviny": [
      "kapusta biela"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Strúhaný kokos 200 g",
    "potraviny": [
      "kokos"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Konopné semená lúpané 100 g",
    "potraviny": [
      "konopné semená"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Pfanner Bio jablkovo-zázvorovo-citrónová šťava 150 ml",
    "potraviny": [
      "jablko",
      "citrón",
      "zázvor"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tekvica Hokkaido voľná",
    "potraviny": [
      "tekvica Hokkaido"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Polabská zelenina Baby špenát praný 125 g",
    "potraviny": [
      "špenát"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Paradajky cherry 250 g",
    "potraviny": [
      "paradajky cherry"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Mrkva balená 1 kg",
    "potraviny": [
      "mrkva"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Sladký šalátový mix 170 g",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "nazov": "Tesco Family šalát mix 350 g",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "nazov": "Polabská zelenina Rukola praná 125 g",
    "potraviny": [
      "rukola"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Baby mrkva 300 g",
    "potraviny": [
      "mrkva"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Rauch Juice Bar 100% pomarančovo-mangovo-mrkvová šťava 330 ml",
    "potraviny": [
      "mrkva",
      "pomaranč",
      "mango"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Sladký chrumkavý šalát 180 g",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "nazov": "Polabská zelenina Valeriána poľná praný 125 g",
    "potraviny": [
      "valeriánka poľná"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Rauch Juice Bar 99,9% ananás-pomaranč-marakuja 330 ml",
    "potraviny": [
      "pomaranč",
      "ananás",
      "marakuja"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Zemiaky konzumné neskoré prané varný typ B 2 kg",
    "potraviny": [
      "zemiaky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Ady Kôpor 240 g",
    "potraviny": [
      "kôpor"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Šťava z kvasenej bielej kapusty 500 ml",
    "potraviny": [
      "kapusta biela"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Slovatys Mrkva 220 g",
    "potraviny": [
      "mrkva"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Zmes kandizovanej papáje a pomarančovej kôry 100 g",
    "potraviny": [
      "pomarančová kôra",
      "papája"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Andros Shot Energy 55 ml",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "nazov": "Andros Shot Immunity 55 ml",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "nazov": "Hrušky Nashi ks",
    "potraviny": [
      "hruška Nashi"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "The Grower's Harvest Hrozno červené bezkôstkové 500 g",
    "potraviny": [
      "hrozno červené"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Andaco Kvasená kapusta v slanom náleve 1 kg",
    "potraviny": [
      "kapusta biela"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Pomarančová kôra kandizovaná 100 g",
    "potraviny": [
      "pomarančová kôra"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Zmes kandizovanej pomarančovej a citrónovej kôry 100 g",
    "potraviny": [
      "pomarančová kôra",
      "citrónová kôra"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Brokolica 500 g",
    "potraviny": [
      "brokolica"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Kvasená biela kapusta 700 g",
    "potraviny": [
      "kapusta biela"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Banán fritovaný kandizovaný plátky 100 g",
    "potraviny": [
      "banán"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "efko Zeler jemne rezaný 330 g",
    "potraviny": [
      "zeler buľvový"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Grill Master Šampiňóny hnedé 250 g",
    "potraviny": [
      "šampiňón hnedý"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Stockwell & Co. Uhorky 6-9 cm v sladkokyslom náleve 670 g",
    "potraviny": [
      "uhorky nakladačky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Kešu orechy jadrá 60 g",
    "potraviny": [
      "kešu"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Mandle jadrá 60 g",
    "potraviny": [
      "mandle"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Bazalka 20 g",
    "potraviny": [
      "bazalka"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Jablková šťava lisovaná za studena so zázvorom a s vitamínom C 180 ml",
    "potraviny": [
      "jablko",
      "zázvor"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Pistácie v škrupine pražené 50 g",
    "potraviny": [
      "pistácie"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Cibuľa šalotka 250 g",
    "potraviny": [
      "šalotka"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Zmes pražených suchých škrupinových plodov lúpaných 55 g",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "nazov": "Tesco Zmes suchých škrupinových plodov lúpaných, hrozienok a kandizovaných brusníc 55 g",
    "potraviny": [
      "hrozno",
      "brusnice"
    ],
    "stav": "neúplné",
    "dovod": "zmes s nešpecifikovanými zložkami"
  },
  {
    "nazov": "Tesco Šalát s červenou repou 140 g",
    "potraviny": [
      "červená repa"
    ],
    "stav": "neúplné",
    "dovod": "zmes s nešpecifikovanými zložkami"
  },
  {
    "nazov": "Tesco Sušené mango 35 g",
    "potraviny": [
      "mango"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Zmes suchých škrupinových plodov lúpaných, hrozienok v horkej čokoláde a brusníc 60 g",
    "potraviny": [
      "hrozno",
      "brusnice"
    ],
    "stav": "neúplné",
    "dovod": "zmes s nešpecifikovanými zložkami"
  },
  {
    "nazov": "Mango ks",
    "potraviny": [
      "mango"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Reďkovka červená 300 g",
    "potraviny": [
      "reďkovka červená"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco 100% ananásová šťava lisovaná za studena 180 ml",
    "potraviny": [
      "ananás"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "efko Červená kapusta 500 g",
    "potraviny": [
      "kapusta červená"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "efko Kvasená kapusta 500 g",
    "potraviny": [
      "kapusta biela"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Jablková šťava 1 l",
    "potraviny": [
      "jablko"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Bio cibuľa žltá 500 g",
    "potraviny": [
      "cibuľa žltá"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Zeler stopkový ks",
    "potraviny": [
      "zeler stopkový"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Grill Master Šampiňón záhradný 500 g",
    "potraviny": [
      "šampiňón biely"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Šalát rímsky",
    "potraviny": [
      "šalát rímsky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Polievková zmes 600 g",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "nazov": "Kapusta biela voľná",
    "potraviny": [
      "kapusta biela"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Ovocňák Raw ovocné plátky jablko & čierne ríbezle 20 g",
    "potraviny": [
      "jablko",
      "čierne ríbezle"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Zmes lúpaných suchých škrupinových plodov a sušeného ananásu 100 g",
    "potraviny": [
      "ananás"
    ],
    "stav": "neúplné",
    "dovod": "zmes s nešpecifikovanými zložkami"
  },
  {
    "nazov": "Tesco Zeleninový šalát v octovom náleve 850 g",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "nazov": "Tesco Zmes kešu orechov, hrozienok, sušených plodov kustovnice čínskej a moruše bielej 100 g",
    "potraviny": [
      "hrozno",
      "kešu",
      "goji",
      "moruše biele"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Zmes lúpaných suchých škrupinových plodov 100 g",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "nazov": "Tesco Petržlen kučeravý",
    "potraviny": [
      "petržlenová vňať kučeravá"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Zeleninárska Kráľovská cibuľa 1,5 kg",
    "potraviny": [
      "cibuľa"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Hamé Hrášok s karotkou v mierne slanom náleve 330 g",
    "potraviny": [
      "mrkva",
      "hrášok"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Petržlen zväzok ks",
    "potraviny": [
      "petržlen koreň"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Slovatys Melónový mix gália, cantaloupe 150 g",
    "potraviny": [
      "melón gália",
      "melón cantaloupe"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Citróny 500 g",
    "potraviny": [
      "citrón"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "H+H Lahôdková čalamáda v sladkokyslom náleve 700 g",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "nazov": "Tesco Paradajky cherry na stonke 250 g",
    "potraviny": [
      "paradajky cherry"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Zeler s vňaťou ks",
    "potraviny": [
      "zeler buľvový"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Hliva ustricová 250 g",
    "potraviny": [
      "hliva ustricová"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Hrozno stolové biele, voľné",
    "potraviny": [
      "hrozno biele"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Dr. Ensa Gaštany pečené lúpané 100 g",
    "potraviny": [
      "jedlé gaštany"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "The Grower's Harvest Paprika pálivá 180 g",
    "potraviny": [
      "čili papričky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Hrozienka Jumbo 200 g",
    "potraviny": [
      "hrozno"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Zmes spracovaného ovocia a kokosových lupienkov 100 g",
    "potraviny": [
      "kokos"
    ],
    "stav": "neúplné",
    "dovod": "zmes s nešpecifikovanými zložkami"
  },
  {
    "nazov": "Tesco Bio uhorky",
    "potraviny": [
      "uhorka"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Zmes sušeného ovocia, jadier suchých škrupinových plodov a tekvicových semien 60 g",
    "potraviny": [
      "tekvicové semená"
    ],
    "stav": "neúplné",
    "dovod": "zmes s nešpecifikovanými zložkami"
  },
  {
    "nazov": "Šalát hlávkový ks",
    "potraviny": [
      "šalát hlávkový"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Zmes sušeného ovocia, jadier makadamových orechov a kokosových plátkov 55 g",
    "potraviny": [
      "kokos",
      "makadamové orechy"
    ],
    "stav": "neúplné",
    "dovod": "zmes s nešpecifikovanými zložkami"
  },
  {
    "nazov": "Tesco Zmes sušených hrozienok, jadier suchých škrupinových plodov a kokosových plátkov 50 g",
    "potraviny": [
      "hrozno",
      "kokos"
    ],
    "stav": "neúplné",
    "dovod": "zmes s nešpecifikovanými zložkami"
  },
  {
    "nazov": "Slovatys Granátové jablko 80 g",
    "potraviny": [
      "granátové jablko"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Pažítka kvetináč",
    "potraviny": [
      "pažítka"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Mletý mak modrý s cukrom 200 g",
    "potraviny": [
      "mak modrý"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Červená kapusta v náleve 670 g",
    "potraviny": [
      "kapusta červená"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Finest Zemiaky Sissi konzumné 1 kg",
    "potraviny": [
      "zemiaky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Šalát Little gem",
    "potraviny": [
      "šalát Little Gem"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Slovatys Kokos 80 g",
    "potraviny": [
      "kokos"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Zmes jadier suchých škrupinových plodov, sójových bôbov edamame a tekvicových semien 50 g",
    "potraviny": [
      "tekvicové semená",
      "edamame"
    ],
    "stav": "neúplné",
    "dovod": "zmes s nešpecifikovanými zložkami"
  },
  {
    "nazov": "Tesco Mak modrý celý 200 g",
    "potraviny": [
      "mak modrý"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Mletý mak modrý 200 g",
    "potraviny": [
      "mak modrý"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Bazalka",
    "potraviny": [
      "bazalka"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Zmes sušeného ovocia a tekvicových semien 40 g",
    "potraviny": [
      "tekvicové semená"
    ],
    "stav": "neúplné",
    "dovod": "zmes s nešpecifikovanými zložkami"
  },
  {
    "nazov": "Pfanner Bio pomarančovo-zázvorovo-citrónovo-kurkumová šťava 150 ml",
    "potraviny": [
      "citrón",
      "pomaranč",
      "zázvor",
      "kurkuma"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Kvasená kapusta náleve 670 g",
    "potraviny": [
      "kapusta biela"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Bio mrkva 500 g",
    "potraviny": [
      "mrkva"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Znojmia Uhorky sterilizované 30-60 mm 340 g",
    "potraviny": [
      "uhorky nakladačky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Giana Červená repa kocky v sladkokyslom náleve 660 g",
    "potraviny": [
      "červená repa"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Chilli mix 70 g",
    "potraviny": [
      "čili papričky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Pomelo červené ks",
    "potraviny": [
      "pomelo červené"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Mandle jadrá pražené v horkej čokoláde 120 g",
    "potraviny": [
      "mandle"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Pražené jadrá lieskových orechov v mliečnej čokoláde 120 g",
    "potraviny": [
      "lieskové orechy"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Hrozienka v mliečnej čokoláde 120 g",
    "potraviny": [
      "hrozno"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Granátové jablko ks",
    "potraviny": [
      "granátové jablko"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Grill Master Šampiňóny mix 500 g",
    "potraviny": [
      "šampiňón biely",
      "šampiňón hnedý"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Pražené jadrá arašidov v mliečnej čokoláde 120 g",
    "potraviny": [
      "arašidy"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Višne kandizované v horkej čokoláde 120 g",
    "potraviny": [
      "višne"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Slovatys Ovocný mix jablko, pomaranč, hrozno 150 g",
    "potraviny": [
      "hrozno",
      "jablko",
      "pomaranč"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Hamé Moravanka sterilizovaná pikantná zmes v korenenom sladkokyslom náleve 330 g",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "nazov": "Tesco Sušené kokosové plátky so šupkou 100 g",
    "potraviny": [
      "kokos"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Slovatys Ovocný mix hrozno, cantaloupe 150 g",
    "potraviny": [
      "hrozno",
      "melón cantaloupe"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Arašidy jadrá blanšírované pražené nesolené 500 g",
    "potraviny": [
      "arašidy"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Ady Pikantná čalamáda 620 g",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "nazov": "Franz Josef Kaiser Exclusive Kapary v slanokyslom náleve 100 g",
    "potraviny": [
      "kapary"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Slovatys Ovocný mix ananás, mango, čučoriedky 150 g",
    "potraviny": [
      "mango",
      "ananás",
      "čučoriedky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Pražené jadrá mandlí v mliečnej čokoláde 120 g",
    "potraviny": [
      "mandle"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Brusnica veľkoplodá presladená 200 g",
    "potraviny": [
      "brusnice"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Spracované banánové plátky v bielej a mliečnej čokoláde 120 g",
    "potraviny": [
      "banán"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Ady Cibuľka v korenenom sladkokyslom náleve 330 g",
    "potraviny": [
      "cibuľa"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Giana Uhorky 6-9 cm 670 g",
    "potraviny": [
      "uhorky nakladačky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Cesnak 3 ks",
    "potraviny": [
      "cesnak"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Mandle jadrá pražené v mliečnej čokoláde a škorici 120 g",
    "potraviny": [
      "mandle"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Ady Červená repa jemne rezaná 500 g",
    "potraviny": [
      "červená repa"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Karfiol ks",
    "potraviny": [
      "karfiol"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Ady Pikantná čalamáda 320 g",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "nazov": "Tesco Vykôstkované slivky 200 g",
    "potraviny": [
      "slivky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Ady Dunajská čalamáda 620 g",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "nazov": "Slovatys Ananás 150 g",
    "potraviny": [
      "ananás"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Pražené jadrá kešu orechov v mliečnej čokoláde 120 g",
    "potraviny": [
      "kešu"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Lúpané tekvicové semienka 200 g",
    "potraviny": [
      "tekvicové semená"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Slovatys Ovocný mix jahody, cantaloupe, čučoriedky 150 g",
    "potraviny": [
      "melón cantaloupe",
      "jahody",
      "čučoriedky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Kandizované brusnice v horkej čokoláde 120 g",
    "potraviny": [
      "brusnice"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Slovatys Mango 150 g",
    "potraviny": [
      "mango"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "The Grower's Harvest Hrušky balené 1 kg",
    "potraviny": [
      "hruška"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Pražené jadrá lieskových orieškov v mliečnej čokoláde a škorici 120 g",
    "potraviny": [
      "lieskové orechy"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Cuketa voľná",
    "potraviny": [
      "cuketa"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Maliny 125 g",
    "potraviny": [
      "maliny"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Hamé Červená kapusta pasterizovaná v korenenom sladkokyslom náleve s cibuľou 510 g",
    "potraviny": [
      "cibuľa",
      "kapusta červená"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Finest Avokádo zrelé ks",
    "potraviny": [
      "avokádo"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Bio cherry paradajky 250 g",
    "potraviny": [
      "paradajky cherry"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Šalát kučeravý biely Lollo Biondo ks",
    "potraviny": [
      "šalát Lollo Biondo"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Červená repa plátky v sladkokyslom náleve 700 g",
    "potraviny": [
      "červená repa"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Vykôstkované datle 200 g",
    "potraviny": [
      "datle"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Bonitas Mrazom sušené jahody, dračie ovocie a mango 30 g",
    "potraviny": [
      "mango",
      "jahody",
      "dračie ovocie"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Zmes presladených brusníc a jadier kešu orieškov 200 g",
    "potraviny": [
      "kešu",
      "brusnice"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "The Grower's Harvest Jablká červené 2 kg",
    "potraviny": [
      "jablko červené"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Rio Cold Press 100% jablko marhuľa 1 l",
    "potraviny": [
      "jablko",
      "marhule"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Bio hrozno biele 500 g",
    "potraviny": [
      "hrozno biele"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Paprika sladká mini 250 g",
    "potraviny": [
      "paprika mini"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Zmes sušeného a kandizovaného ovocia a škrupinových plodov s kokosovými vločkami 200 g",
    "potraviny": [
      "kokos"
    ],
    "stav": "neúplné",
    "dovod": "zmes s nešpecifikovanými zložkami"
  },
  {
    "nazov": "Bonitas Mrazom sušené mango 30 g",
    "potraviny": [
      "mango"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Bonitas Mrazom sušené jahody, čučoriedky, broskyne a višne 30 g",
    "potraviny": [
      "broskyne",
      "višne",
      "jahody",
      "čučoriedky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Rio Cold Press 100% jablko cvikla 1 l",
    "potraviny": [
      "jablko",
      "červená repa"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Bonitas Mrazom sušené jahody 30 g",
    "potraviny": [
      "jahody"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Hrozno biele bezkôstkové 500 g",
    "potraviny": [
      "hrozno biele"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Paradajky žlté koktejlové 400 g",
    "potraviny": [
      "paradajky žlté"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Rio Cold Press 100% jablko 1 l",
    "potraviny": [
      "jablko"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "efko Feferóny štipľavé 300 g",
    "potraviny": [
      "feferóny"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Ady Uhorky s cibuľkou 660 g",
    "potraviny": [
      "uhorky nakladačky",
      "cibuľa"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Komvida Bio fermentovaný nápoj z čaju 250 ml",
    "potraviny": [
      "čaj"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Mango kúsky 100 g",
    "potraviny": [
      "mango"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Natur Farm Paprika jabĺčková 660 g",
    "potraviny": [
      "paprika jabĺčková"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Melón žltý voľný",
    "potraviny": [
      "melón žltý"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Paradajky kokteilové na stonke 400 g",
    "potraviny": [
      "paradajky koktejlové"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Grill Master Paprika Kalifornia mix 500 g",
    "potraviny": [
      "paprika červená",
      "paprika žltá"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Giana Červená repa strúhaná v sladkokyslom náleve 480 g",
    "potraviny": [
      "červená repa"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Baby paradajky podlhovasté 250 g",
    "potraviny": [
      "paradajky podlhovasté"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Brusnice celé, presladené 200 g",
    "potraviny": [
      "brusnice"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Hamé Zeleninová zmes na prípravu zemiakového šalátu v sladkokyslom náleve 530 g",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "nazov": "Veselá paradajka Paradajky cherry San Marzano 250 g",
    "potraviny": [
      "paradajky cherry San Marzano"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Papája kocky 150 g",
    "potraviny": [
      "papája"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Zmes štiav a pretlakov z viacerých druhov ovocia 750 ml",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "nazov": "Tesco Zmes štiav a pretlakov z viacerých druhov ovocia 750 ml",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "nazov": "Tesco Finest Paradajky cherry extra sladké 250 g",
    "potraviny": [
      "paradajky cherry"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Hamé Paprika červená rezaná 340 g",
    "potraviny": [
      "paprika červená"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Zemiaky A konzumné neskoré prané A 2 kg",
    "potraviny": [
      "zemiaky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Čučoriedky balené 125 g",
    "potraviny": [
      "čučoriedky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Hamé Cibuľka v korenenom sladkokyslom náleve s cukrom a sladidlom 330 g",
    "potraviny": [
      "cibuľa"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Ady Cibuľka pikantná 250 g",
    "potraviny": [
      "cibuľa"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Zemiaky na pečenie 1,5 kg",
    "potraviny": [
      "zemiaky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Zeleninový šalát v octovom náleve 850 g",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "nazov": "Ady Ruby čalamáda 640 g",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "nazov": "Reďkovka biela zväzok",
    "potraviny": [
      "reďkovka biela"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Hamé Feferóny guľaté v korenenom sladkokyslom náleve s cukrom a sladidlami 320 g",
    "potraviny": [
      "feferóny"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Kandizovaný zázvor 150 g",
    "potraviny": [
      "zázvor"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Finest Datle sušené s kôstkou odroda kholas 150 g",
    "potraviny": [
      "datle"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Hamé Hradišťanka pasterizovaná pikantná zmes v korenenom sladkokyslom náleve 330 g",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "nazov": "Natur Farm Uhorky 6-9 cm 680 g",
    "potraviny": [
      "uhorky nakladačky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Paradajky podlhovasté 500 g",
    "potraviny": [
      "paradajky podlhovasté"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Grill Master Šampiňón hnedý Portobello 280 g",
    "potraviny": [
      "šampiňón hnedý"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Giana Čalamáda v sladkokyslom náleve 650 g",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "nazov": "Tesco Zmes štiav z mandarínok, pomarančov a grapefruitov 1 l",
    "potraviny": [
      "grapefruit",
      "mandarínka",
      "pomaranč"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Bio paprika červená 400 g",
    "potraviny": [
      "paprika červená"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Rauch Juice Bar Pink Dragon 800 ml",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "nazov": "Rauch Juice Bar 100% pomarančovo-mangovo-mrkvová šťava 800 ml",
    "potraviny": [
      "mrkva",
      "pomaranč",
      "mango"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Giana Baranie rohy v sladkokyslom náleve 660 g",
    "potraviny": [
      "baranie rohy"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Kešu orechy jadrá nepražené 200 g",
    "potraviny": [
      "kešu"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Bio zemiaky sladké 750 g",
    "potraviny": [
      "sladké zemiaky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Arašidy nelúpané pražené 500 g",
    "potraviny": [
      "arašidy"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Mandle jadrá 200 g",
    "potraviny": [
      "mandle"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Rauch Juice Bar 99,9% ananás-pomaranč-marakuja 800 ml",
    "potraviny": [
      "pomaranč",
      "ananás",
      "marakuja"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Znojmia Uhorky pasterizované 50-70 mm 520 g",
    "potraviny": [
      "uhorky nakladačky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Nektarinky 1000 g",
    "potraviny": [
      "nektárinky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Finest Mango ks",
    "potraviny": [
      "mango"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Finest Szentesi paprika 500 g",
    "potraviny": [
      "paprika"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Zmes hrozienok, lúpaných škrupinových plodov, kandizovaných brusníc a čerešní 200 g",
    "potraviny": [
      "hrozno",
      "brusnice",
      "čerešne"
    ],
    "stav": "neúplné",
    "dovod": "zmes s nešpecifikovanými zložkami"
  },
  {
    "nazov": "Tesco Pomarančová šťava 1 l",
    "potraviny": [
      "pomaranč"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Rio Cold Press Jablko zázvor 1 l",
    "potraviny": [
      "jablko",
      "zázvor"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "efko Detské uhorky 330 g",
    "potraviny": [
      "uhorky nakladačky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Finest Čučoriedky 125 g",
    "potraviny": [
      "čučoriedky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Hamé Zeleninové lečo v sladkokyslom náleve 240 g",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "nazov": "Tesco Hrozienka 500 g",
    "potraviny": [
      "hrozno"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "efko Uhorky delikates 3-6 cm 330 g",
    "potraviny": [
      "uhorky nakladačky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Mandle blanšírované sekané 100 g",
    "potraviny": [
      "mandle"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Mandle jadrá blanšírované plátky 100 g",
    "potraviny": [
      "mandle"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Zmes štiav z viacerých druhov ovocia, mangového a marakujového pretlaku 1 l",
    "potraviny": [
      "mango",
      "marakuja"
    ],
    "stav": "neúplné",
    "dovod": "zmes s nešpecifikovanými zložkami"
  },
  {
    "nazov": "Tesco Perfectly Imperfect paprika biela 700 g",
    "potraviny": [
      "paprika biela"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Ananás kandizovaný plátky 200 g",
    "potraviny": [
      "ananás"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Ady Kvasená kapusta 620 g",
    "potraviny": [
      "kapusta biela"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Natur Farm Mrkva s hráškom 470 g",
    "potraviny": [
      "mrkva",
      "hrášok"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Hrozno bezkôstkové červené 500 g",
    "potraviny": [
      "hrozno červené"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Uhorky 6-9 cm v sladkokyslom náleve 670 g",
    "potraviny": [
      "uhorky nakladačky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Giana Špargľa v slanom náleve 180 g",
    "potraviny": [
      "špargľa"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Datle vykôstkované 200 g",
    "potraviny": [
      "datle"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Zmes hrozienok, pražených jadier arašidov a lúpaných suchých škrupinových plodov 200 g",
    "potraviny": [
      "hrozno",
      "arašidy"
    ],
    "stav": "neúplné",
    "dovod": "zmes s nešpecifikovanými zložkami"
  },
  {
    "nazov": "The Grower's Harvest Hrozno bezkôstkové mix 500 g",
    "potraviny": [
      "hrozno biele",
      "hrozno červené"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Natur Farm Jalapeño 335 g",
    "potraviny": [
      "jalapeño"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Ady Červená paprika rezy 630 g",
    "potraviny": [
      "paprika červená"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "The Grower's Harvest Hrozno bezkôstkové biele 500 g",
    "potraviny": [
      "hrozno biele"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Hamé Hrášok s karotkou v slanom náleve 510 g",
    "potraviny": [
      "mrkva",
      "hrášok"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Hamé Červená repa sterilizovaná v sladkokyslom náleve 330 g",
    "potraviny": [
      "červená repa"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Bio citróny 500 g",
    "potraviny": [
      "citrón"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "NOVOFRUCT Zámocké lečo zeleninové 670 g",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "nazov": "Kel voľný",
    "potraviny": [
      "kel"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "The Grower's Harvest Jablká zelené 2 kg",
    "potraviny": [
      "jablko zelené"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Bonitas Mrazom sušené maliny 30 g",
    "potraviny": [
      "maliny"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Bonitas Mrazom sušené jahody, mango a kiwi 30 g",
    "potraviny": [
      "kiwi",
      "mango",
      "jahody"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Finest Starlisher paradajky 200 g",
    "potraviny": [
      "paradajky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Ruža v kvetináči 12 cm",
    "stav": "vylúčené",
    "dovod": "kvety – nie potravina"
  },
  {
    "nazov": "Tesco Organic Bio mandle blanšírované 150 g",
    "potraviny": [
      "mandle"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Baby paradajky podlhovasté 500 g",
    "potraviny": [
      "paradajky podlhovasté"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Rio Cold Press 100% pomaranč Costa Rica s dužinou 1 l",
    "potraviny": [
      "pomaranč"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Organic Bio kešu orechy 150 g",
    "potraviny": [
      "kešu"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Vlašské orechy 200 g",
    "potraviny": [
      "vlašské orechy"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "efko Uhorky delikates 3-6 cm 670 g",
    "potraviny": [
      "uhorky nakladačky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "efko Uhorky delikates 5-8 cm 670 g",
    "potraviny": [
      "uhorky nakladačky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Lieskové orechy jadrá blanšírované 100 g",
    "potraviny": [
      "lieskové orechy"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Dr. Ensa Lieskovce v mliečnej čokoláde 250 g",
    "potraviny": [
      "lieskové orechy"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Mandle jadrá blanšírované 200 g",
    "potraviny": [
      "mandle"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Andros Brusnicový nápoj 1 l",
    "potraviny": [
      "brusnice"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Andros Marakuja ovocný nápoj 1 l",
    "potraviny": [
      "marakuja"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Natur Farm Kápia štvrťky 680 g",
    "potraviny": [
      "paprika kápia"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Zmes jadier lúpaných sušených škrupinových plodov so sušeným a presladeným ovocím 200 g",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "nazov": "Tesco Strúhaný kokos 500 g",
    "potraviny": [
      "kokos"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Natur Farm Prémium uhorky 3-6 cm 680 g",
    "potraviny": [
      "uhorky nakladačky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Carpe Diem Kombucha 0,75 l",
    "potraviny": [
      "čaj"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tekvica na pečenie voľná",
    "potraviny": [
      "tekvica"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Palermo paprika 500 g",
    "potraviny": [
      "paprika Palermo"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Zmes jadier suchých šupinových plodov 200 g",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "nazov": "Tesco Finest Hrozno bezkôstkové tmavé 400 g",
    "potraviny": [
      "hrozno tmavé"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Seeberger Datle odkôstkované 200 g",
    "potraviny": [
      "datle"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Hamé Uhorky v sladkokyslom náleve 7-9 cm 680 g",
    "potraviny": [
      "uhorky nakladačky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Natur Farm Prémium uhorky v sladkokyslom korenenom náleve s horčicou 640 g",
    "potraviny": [
      "uhorky nakladačky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Natur Farm Prémium uhorky v sladkokyslom korenenom náleve s cesnakom a kôprom 640 g",
    "potraviny": [
      "uhorky nakladačky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Dr. Ensa Choco & Toy Minions sušené hrozienka jumbo v mliečnej čokoláde 40 g",
    "potraviny": [
      "hrozno"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Hamé Feferóny baranie rohy v korenenom sladkokyslom náleve 500 g",
    "potraviny": [
      "baranie rohy"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Ananás ks",
    "potraviny": [
      "ananás"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Zeleninárska Kráľovské zemiaky červené 2,5 kg",
    "potraviny": [
      "zemiaky červené"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Giana Červená paprika rezy 650 g",
    "potraviny": [
      "paprika červená"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Pekanové orechy jadrá 150 g",
    "potraviny": [
      "pekanové orechy"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Ananásová šťava 1 l",
    "potraviny": [
      "ananás"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Ady Feferóny guľaté pikant 610 g",
    "potraviny": [
      "feferóny"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Pomarančová šťava s dužinou 1 l",
    "potraviny": [
      "pomaranč"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Mandarínková šťava s dužinou 1 l",
    "potraviny": [
      "mandarínka"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Giana Fazuľové struky krájané v slanokyslom náleve 680 g",
    "potraviny": [
      "fazuľové struky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Šťava z ružového grapefruitu s dužinou 1 l",
    "potraviny": [
      "grapefruit červený"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Zeleninárska Kráľovské zemiaky 2,5 kg",
    "potraviny": [
      "zemiaky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Kytica chryzantémy 4 ks",
    "stav": "vylúčené",
    "dovod": "kvety – nie potravina"
  },
  {
    "nazov": "Kytica ruží 7 stoniek",
    "stav": "vylúčené",
    "dovod": "kvety – nie potravina"
  },
  {
    "nazov": "Rauch Juice Bar 100% pomarančová šťava 800 ml",
    "potraviny": [
      "pomaranč"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Pomelo ks",
    "potraviny": [
      "pomelo"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Mandle jadrá blanšírované mleté 200 g",
    "potraviny": [
      "mandle"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Žltomasé broskyne 1 kg",
    "potraviny": [
      "broskyne žltomäsé"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Vlašské orechy mleté 200 g",
    "potraviny": [
      "vlašské orechy"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Hrozienka zlaté Jumbo 200 g",
    "potraviny": [
      "hrozno biele"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Karafiáty veľké",
    "stav": "vylúčené",
    "dovod": "kvety – nie potravina"
  },
  {
    "nazov": "Tesco Paradajky cherry na stonke 500 g",
    "potraviny": [
      "paradajky cherry"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Kytica luxury",
    "stav": "vylúčené",
    "dovod": "kvety – nie potravina"
  },
  {
    "nazov": "Rainbow kytica ruží",
    "stav": "vylúčené",
    "dovod": "kvety – nie potravina"
  },
  {
    "nazov": "Deluxe kytica ruží a ľalií",
    "stav": "vylúčené",
    "dovod": "kvety – nie potravina"
  },
  {
    "nazov": "Deluxe kytica",
    "stav": "vylúčené",
    "dovod": "kvety – nie potravina"
  },
  {
    "nazov": "Kytica ruží deluxe",
    "stav": "vylúčené",
    "dovod": "kvety – nie potravina"
  },
  {
    "nazov": "Tesco Pistáciové oriešky v škrupine pražené solené 500 g",
    "potraviny": [
      "pistácie"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Zantedeschia mix kvetináč 12 cm",
    "stav": "vylúčené",
    "dovod": "kvety – nie potravina"
  },
  {
    "nazov": "Tesco Mandle jadrá 500 g",
    "potraviny": [
      "mandle"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Kešu orechy jadrá pražené, solené 500 g",
    "potraviny": [
      "kešu"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Kešu orechy jadrá nepražené 500 g",
    "potraviny": [
      "kešu"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Pražené jadrá arašidov v mliečnej čokoláde 500 g",
    "potraviny": [
      "arašidy"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Kokosové kocky v mliečnej čokoláde 500 g",
    "potraviny": [
      "kokos"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Dr. Ensa Slivky v horkej čokoláde 500 g",
    "potraviny": [
      "slivky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Kytica ruže a ľalie",
    "stav": "vylúčené",
    "dovod": "kvety – nie potravina"
  },
  {
    "nazov": "Kytica passion",
    "stav": "vylúčené",
    "dovod": "kvety – nie potravina"
  },
  {
    "nazov": "Kytica ruží fairtrade",
    "stav": "vylúčené",
    "dovod": "kvety – nie potravina"
  },
  {
    "nazov": "Seeberger Sušené figy 200 g",
    "potraviny": [
      "figy"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Kytica jemnosť",
    "stav": "vylúčené",
    "dovod": "kvety – nie potravina"
  },
  {
    "nazov": "Tesco Pistácie pražené, solené 200 g",
    "potraviny": [
      "pistácie"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Pistácie pražené nesolené 200 g",
    "potraviny": [
      "pistácie"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Seeberger Zmes sladených sušených brusníc v horkosladkej poleve 150 g",
    "potraviny": [
      "brusnice"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Lieskové oriešky jadrá 200 g",
    "potraviny": [
      "lieskové orechy"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Čučoriedky 300 g",
    "potraviny": [
      "čučoriedky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Finest Zmes škrupinových plodov a brusníc s príchuťou camembert, cibule a pažítky 150 g",
    "potraviny": [
      "brusnice"
    ],
    "stav": "neúplné",
    "dovod": "zmes s nešpecifikovanými zložkami"
  },
  {
    "nazov": "Seeberger Sušené prúžky manga 100 g",
    "potraviny": [
      "mango"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "The Grower's Harvest Zemiaky konzumné 5 kg",
    "potraviny": [
      "zemiaky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Finest Jadrá mandlí, orechov solené karamelizované 150 g",
    "potraviny": [
      "mandle"
    ],
    "stav": "neúplné",
    "dovod": "zmes s nešpecifikovanými zložkami"
  },
  {
    "nazov": "Tesco Finest Lúpané suché škrupinové plody údené solené 150 g",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "nazov": "Tesco Finest Lúpané suché škrupinové plody s kešu orieškami 150 g",
    "potraviny": [
      "kešu"
    ],
    "stav": "neúplné",
    "dovod": "zmes s nešpecifikovanými zložkami"
  },
  {
    "nazov": "Tesco Jahody 500 g",
    "potraviny": [
      "jahody"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Finest Mandle jadrá v bielej čokoláde s príchuťou smotanového syra a citrónu 150 g",
    "potraviny": [
      "mandle"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Ruže veľké 11 stoniek",
    "stav": "vylúčené",
    "dovod": "kvety – nie potravina"
  },
  {
    "nazov": "Tesco Pistácie jadrá nesolené 100 g",
    "potraviny": [
      "pistácie"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Matyšák 100% hroznová šťava biela 0,75 l",
    "potraviny": [
      "hrozno biele"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Seeberger Sušené odkôstkované slivky 200 g",
    "potraviny": [
      "slivky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Seeberger Zmes orechov a sušeného ovocia 150 g",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "nazov": "Matyšák 100% hroznová šťava červená 0,75 l",
    "potraviny": [
      "hrozno červené"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Vykôstkované slivky 500 g",
    "potraviny": [
      "slivky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Franz Josef Kaiser Exclusive Artičoky štvrťky v slanom náleve 400 g",
    "potraviny": [
      "artičoky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Brusnice krájané sušené 400 g",
    "potraviny": [
      "brusnice"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "efko Chilli uhorky 670 g",
    "potraviny": [
      "uhorky nakladačky"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Seeberger Zmes pražených a solených orechov, sušeného ovocia, rebarbory, banánových lupienkov 150 g",
    "potraviny": [
      "banán",
      "rebarbora"
    ],
    "stav": "neúplné",
    "dovod": "zmes s nešpecifikovanými zložkami"
  },
  {
    "nazov": "Rio Cold Press 100% Costa Rica ananás 1 l",
    "potraviny": [
      "ananás"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Goji 200 g",
    "potraviny": [
      "goji"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Tesco Makadamové orechy 150 g",
    "potraviny": [
      "makadamové orechy"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Seeberger Zmes sušeného ovocia 200 g",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "nazov": "Tesco Organic Bio mandle jadrá 150 g",
    "potraviny": [
      "mandle"
    ],
    "stav": "zaradené"
  },
  {
    "nazov": "Rio Cold Press 100% pomarančová šťava s dužinou 750 ml",
    "potraviny": [
      "pomaranč"
    ],
    "stav": "zaradené"
  }
] as const satisfies readonly ProduktTesco[];

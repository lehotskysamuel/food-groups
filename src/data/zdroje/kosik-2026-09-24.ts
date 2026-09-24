import type { Potravina } from "../../strom.types";
import type { strom } from "../strom";
import type { StavProduktu } from "./tesco-2026-09-24";

/**
 * Produkty z Košík.sk, kategórie Ovocie, Zelenina, Huby, Bylinky a korenie (uložené stránky, 24. 9. 2026,
 * 483 produktov; niektoré sú vo viacerých kategóriách) a potraviny zo stromu, na ktoré sa mapujú.
 */
export type KategoriaKosik = "Ovocie" | "Zelenina" | "Huby" | "Bylinky a korenie";

export interface ProduktKosik {
  readonly kategoria: KategoriaKosik;
  readonly nazov: string;
  readonly stav: StavProduktu;
  readonly potraviny?: readonly Potravina<typeof strom>[];
  readonly dovod?: string;
}

export const produkty = [
  {
    "kategoria": "Ovocie",
    "nazov": "Metro Chef Citrón Primofiori, 1ks",
    "potraviny": [
      "citrón Primofiori"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Metro Chef Limeta, 1 ks",
    "potraviny": [
      "limeta"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Banán",
    "potraviny": [
      "banán"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Čučoriedky kanadské, vanička",
    "potraviny": [
      "čučoriedky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Jablko Evelina 1ks",
    "potraviny": [
      "jablko Evelina"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Avokádo Hass Ready to eat, 2 ks",
    "potraviny": [
      "avokádo Hass"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Citróny",
    "potraviny": [
      "citrón"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Pomaranče Gearsac",
    "potraviny": [
      "pomaranč"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Jahody, vanička",
    "potraviny": [
      "jahody"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Jablko Gala, 1ks",
    "potraviny": [
      "jablko Gala"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "BIO Banány",
    "potraviny": [
      "banán"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Broskyne ploché bielomäsité, vanička",
    "potraviny": [
      "broskyne ploché"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Citrón Primofiori",
    "potraviny": [
      "citrón Primofiori"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Maliny, vanička",
    "potraviny": [
      "maliny"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Kiwi, 1 ks",
    "potraviny": [
      "kiwi"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Metro Chef Avokádo Hass Ready to eat",
    "potraviny": [
      "avokádo Hass"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Hruška zelená Lucas, 1ks",
    "potraviny": [
      "hruška Lucas"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Hrozno biele cotton candy, bez jadierok",
    "potraviny": [
      "hrozno Cotton Candy"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Jablká Evelina",
    "potraviny": [
      "jablko Evelina"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Mango Ready To Eat",
    "potraviny": [
      "mango"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "BIO Citróny, sieťka",
    "potraviny": [
      "citrón"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Passionfruit twinpack",
    "potraviny": [
      "marakuja"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Jablko Golden Delicious, 1ks",
    "potraviny": [
      "jablko Golden Delicious"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Jablko Granny Smith, 1ks",
    "potraviny": [
      "jablko Granny Smith"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Ríbezle červené, vanička",
    "potraviny": [
      "červené ríbezle"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "BIO Avokádo, na dozretie",
    "potraviny": [
      "avokádo"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Jablká červené, vrecko",
    "potraviny": [
      "jablko červené"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Melón cukrový žltý",
    "potraviny": [
      "melón žltý"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "BIO Pomaranče",
    "potraviny": [
      "pomaranč"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Avokádo, 1 ks",
    "potraviny": [
      "avokádo"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Mandarínky, sieť",
    "potraviny": [
      "mandarínka"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Granátové jablko 1ks",
    "potraviny": [
      "granátové jablko"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Metro Chef Avokádo Hass Ready to eat, 1 ks",
    "potraviny": [
      "avokádo Hass"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Ringloty modré, vanička",
    "potraviny": [
      "ringloty"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "BIO Jablká červené, 4ks",
    "potraviny": [
      "jablko červené"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Grapefruit červený, 1ks",
    "potraviny": [
      "grapefruit červený"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Prémiové jahody, vanička",
    "potraviny": [
      "jahody"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Melón Cantaloupe, 1ks",
    "potraviny": [
      "melón cantaloupe"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Jablko Golden Delicious",
    "potraviny": [
      "jablko Golden Delicious"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Ananás Extra sweet",
    "potraviny": [
      "ananás"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Limety, tácka",
    "potraviny": [
      "limeta"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Černice, vanička",
    "potraviny": [
      "černice"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Ananás valec",
    "potraviny": [
      "ananás"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Jablko Šampion, 1ks",
    "potraviny": [
      "jablko Šampion"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Mochyňa/Physalis",
    "potraviny": [
      "mochyňa"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Metro Chef Ovocné pyré mango Alphonso",
    "potraviny": [
      "mango Alphonso"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Metro Chef Pomaranče džúsové",
    "potraviny": [
      "pomaranč"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Jablká Mix, 4 ks",
    "potraviny": [
      "jablko"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Hrušky Guyot",
    "potraviny": [
      "hruška Guyot"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Melón Galia",
    "potraviny": [
      "melón gália"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Kiwi Ready to eat, 4 ks",
    "potraviny": [
      "kiwi"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Metro Chef Ovocné pyré jahoda",
    "potraviny": [
      "jahody"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Grapefruity červené",
    "potraviny": [
      "grapefruit červený"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Hruška Nashi",
    "potraviny": [
      "hruška Nashi"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Jablka Golden Delicious, vrecko",
    "potraviny": [
      "jablko Golden Delicious"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Kiwi, vanička",
    "potraviny": [
      "kiwi"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Metro Chef Ovocné pyré malina William",
    "potraviny": [
      "maliny"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Ponthier Pyré coulis jahoda",
    "potraviny": [
      "jahody"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Ponthier Pyré coulis",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Pitahaya červená",
    "potraviny": [
      "dračie ovocie"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Metro Chef Ovocné pyré passion fruit",
    "potraviny": [
      "marakuja"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Ponthier Pyré ovocné Coulis malina",
    "potraviny": [
      "maliny"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Metro Chef Ovocné pyré kokos",
    "potraviny": [
      "kokos"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Metro Chef Citróny džúsové",
    "potraviny": [
      "citrón"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Kumquat",
    "potraviny": [
      "kumquat"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Papája Formosa",
    "potraviny": [
      "papája Formosa"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Papája čerstvá",
    "potraviny": [
      "papája"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Mladý kokos",
    "potraviny": [
      "mladý kokos"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Ponthier Pyré ovocné marhule Bergeron",
    "potraviny": [
      "marhule Bergeron",
      "marhule"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Ponthier Pyré ovocné Coulis exotické ovocie",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Metro Chef Avokádo dužina",
    "potraviny": [
      "avokádo"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Ponthier Pyré ovocné Exotic",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Ponthier Pyré ovocné mandarínka 100%",
    "potraviny": [
      "mandarínka"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Ponthier Pyré ovocné granátové jablko",
    "potraviny": [
      "granátové jablko"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Ponthier Pyré ovocné ananás",
    "potraviny": [
      "ananás"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Ponthier Pyré ovocné mix červené plody",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Ponthier Pyré ovocné červený pomaranč 100%",
    "potraviny": [
      "pomaranč krvavý"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Metro Chef Malina pyré",
    "potraviny": [
      "maliny"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Kokos",
    "potraviny": [
      "kokos"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Jahody, vanička",
    "potraviny": [
      "jahody"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Ponthier Pyré ovocné čučoriedka",
    "potraviny": [
      "čučoriedky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Ponthier Pyré ovocné banán",
    "potraviny": [
      "banán"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Ponthier Pyré ovocné Čerešňa Oblacinska Morello",
    "potraviny": [
      "višne Oblačinské"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Gaštany predvarené",
    "potraviny": [
      "jedlé gaštany"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Ponthier Pyré ovocné limeta",
    "potraviny": [
      "limeta"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Ponthier Pyré ovocné biela broskyňa",
    "potraviny": [
      "broskyne bielomäsé"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Ponthier Pyré ovocné žltý citrón",
    "potraviny": [
      "citrón"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Ponthier Pyré ovocné opuncia",
    "potraviny": [
      "opuncia"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Figa kaktusová (opuncia), ks",
    "potraviny": [
      "opuncia"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Ponthier Ovocné pyré mojito",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Ponthier Pyré ovocné liči",
    "potraviny": [
      "liči"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Ponthier Pyré ovocné acai",
    "potraviny": [
      "acai"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Ponthier Pyré ovocné Calamansi 100%",
    "potraviny": [
      "calamansi"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Ponthier Pyré ovocné černice",
    "potraviny": [
      "černice"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Ponthier Pyré ovocné brusnica",
    "potraviny": [
      "brusnice"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Metro Chef Jahoda pyré",
    "potraviny": [
      "jahody"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Ponthier Pyré ovocné Bergamot",
    "potraviny": [
      "bergamot"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Ponthier Pyré červená rebarbora",
    "potraviny": [
      "rebarbora"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Metro Chef Mango pyré",
    "potraviny": [
      "mango"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Metro Chef Passion fruit pyré",
    "potraviny": [
      "marakuja"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Ponthier Pyré ovocné kokos s mliečnym proteínom",
    "potraviny": [
      "kokos"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Ponthier Pyré ovocné yuzu",
    "potraviny": [
      "yuzu"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Banány",
    "potraviny": [
      "banán"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Hrozno biele bezsemenné, vanička",
    "potraviny": [
      "hrozno biele"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Hrozno červené bezsemenné, vanička",
    "potraviny": [
      "hrozno červené"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Slivky, vanička",
    "potraviny": [
      "slivky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Melón vodový bezsemenný",
    "potraviny": [
      "melón vodový"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Jahody vanička",
    "potraviny": [
      "jahody"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Nektarínky žltomäsité, vanička",
    "potraviny": [
      "nektárinky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Broskyne žltomäsité",
    "potraviny": [
      "broskyne žltomäsé"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Melón vodový bezsemenný",
    "potraviny": [
      "melón vodový"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Melón vodový bezsemenný",
    "potraviny": [
      "melón vodový"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Kiwi Gold",
    "potraviny": [
      "kiwi Gold"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Papája",
    "potraviny": [
      "papája"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Mango Palmer/Kent, čerstvé, 2ks",
    "potraviny": [
      "mango Palmer",
      "mango Kent"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Limety čerstvé, balenie",
    "potraviny": [
      "limeta"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "BIO Kokos \"Drink&Eat\", čerstvý, 1 ks",
    "potraviny": [
      "mladý kokos"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Melón Piel de Sapo",
    "potraviny": [
      "melón Piel de Sapo"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Broskyne žltomäsité vanička",
    "potraviny": [
      "broskyne žltomäsé"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Karambola",
    "potraviny": [
      "karambola"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Titbit Granátové jablko vylúpané",
    "potraviny": [
      "granátové jablko"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Tamarind čerstvý",
    "potraviny": [
      "tamarind"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Avokádo mini čerstvé 4 ks, na dozretie, tácka",
    "potraviny": [
      "avokádo"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Kiwi ready to eat, tácka",
    "potraviny": [
      "kiwi"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Mango \"Ready to Eat\"",
    "potraviny": [
      "mango"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Ríbezle červené, vanička",
    "potraviny": [
      "červené ríbezle"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Melón vodový so semenami",
    "potraviny": [
      "melón vodový"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Marhule, vanička",
    "potraviny": [
      "marhule"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Hrozno červené so semenami, vanička",
    "potraviny": [
      "hrozno červené"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Jablká Pink Lady, 6 ks",
    "potraviny": [
      "jablko Pink Lady"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Egreš, vanička",
    "potraviny": [
      "egreš"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Granátové jablko",
    "potraviny": [
      "granátové jablko"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Gaštany jedlé, sieť",
    "potraviny": [
      "jedlé gaštany"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Mango Palmer by air čerstvé",
    "potraviny": [
      "mango Palmer"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Nektárinky Plater ploché bielomäsé čerstvé",
    "potraviny": [
      "nektárinky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Jahody",
    "potraviny": [
      "jahody"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Jablko Jonaprince, 1 ks",
    "potraviny": [
      "jablko Jonaprince"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Pitahaya červená",
    "potraviny": [
      "dračie ovocie"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Ovocie",
    "nazov": "Maracuja Eat me, 1ks",
    "potraviny": [
      "marakuja"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Paprika červená Ramiro",
    "potraviny": [
      "paprika Ramiro"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Paradajky cherry, vanička",
    "potraviny": [
      "paradajky cherry"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Živina Kimchi Pálivé",
    "potraviny": [
      "kapusta pekingská"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Šalát Lollo Rosso",
    "potraviny": [
      "šalát Lollo Rosso"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Šalát rímsky",
    "potraviny": [
      "šalát rímsky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Šalát rezaný mix, praný",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Paradajky ďatlové Plum",
    "potraviny": [
      "paradajky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Kaleráb s vňaťou",
    "potraviny": [
      "kaleráb"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Fine Life Rajčiny koktejlové",
    "potraviny": [
      "paradajky koktejlové"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Fine Life Cibuľa žltá",
    "potraviny": [
      "cibuľa žltá"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Fine Life Paprika biela",
    "potraviny": [
      "paprika biela"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Cherry paradajky datlové červené",
    "potraviny": [
      "paradajky cherry"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Uhorky poľné",
    "potraviny": [
      "uhorky poľné"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Batáty oranžové, sieť",
    "potraviny": [
      "sladké zemiaky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Brokolica",
    "potraviny": [
      "brokolica"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Polievková zmes",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Mrkva s vňatou zväzok",
    "potraviny": [
      "mrkva"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Šalát little gem zelený",
    "potraviny": [
      "šalát Little Gem"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Cesnak biely, 3ks",
    "potraviny": [
      "cesnak"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Zemiaky prané, varný typ A",
    "potraviny": [
      "zemiaky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Paradajky cherry Tramezzino",
    "potraviny": [
      "paradajky cherry"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Fine Life Paprika mix",
    "potraviny": [
      "paprika"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Petržlen koreňový s vňaťou",
    "potraviny": [
      "petržlen koreň"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Cibuľka lahôdková, zväzok",
    "potraviny": [
      "jarná cibuľka"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Tekvica Hokkaido",
    "potraviny": [
      "tekvica Hokkaido"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Fine Life Zemiaky, neskoré, varný typ B",
    "potraviny": [
      "zemiaky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Paprika červená kápia",
    "potraviny": [
      "paprika kápia"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Fine Life Paprika červená, 3 ks v balení",
    "potraviny": [
      "paprika červená"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Stopkový zeler",
    "potraviny": [
      "zeler stopkový"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Rukola čerstvá",
    "potraviny": [
      "rukola"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Cibuľa šalotka banánová",
    "potraviny": [
      "šalotka"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Reďkovky červené, zväzok 1 ks",
    "potraviny": [
      "reďkovka červená"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Cuketa zelená, 1ks",
    "potraviny": [
      "cuketa"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Fine Life Cibuľa červená",
    "potraviny": [
      "cibuľa červená"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "BIO Cesnak biely",
    "potraviny": [
      "cesnak"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "BIO Zemiaky",
    "potraviny": [
      "zemiaky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Paradajka červená, 1ks",
    "potraviny": [
      "paradajky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Baby zemiaky Jazzy žlté, varný typ A",
    "potraviny": [
      "zemiaky Jazzy"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Špenát baby praný, vrecko",
    "potraviny": [
      "špenát"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Mrkva baby dlhá",
    "potraviny": [
      "mrkva"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Karfiol biely",
    "potraviny": [
      "karfiol"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Šalát ľadový",
    "potraviny": [
      "šalát ľadový"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "BIO Cibuľa žltá",
    "potraviny": [
      "cibuľa žltá"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "BIO Mrkva",
    "potraviny": [
      "mrkva"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Pór čerstvý, 1 ks",
    "potraviny": [
      "pór"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Reďkovka červená, balená",
    "potraviny": [
      "reďkovka červená"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Zemiaky Grenaile prané, skoré, varný typ B",
    "potraviny": [
      "zemiaky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Zeler bulvový praný",
    "potraviny": [
      "zeler buľvový"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "BIO Uhorka",
    "potraviny": [
      "uhorka"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Cukety balené",
    "potraviny": [
      "cuketa"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Cherry paradajky, vanička",
    "potraviny": [
      "paradajky cherry"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Šalát hlávkový",
    "potraviny": [
      "šalát hlávkový"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Zeler s vňaťou",
    "potraviny": [
      "zeler buľvový"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Repa predvarená, 2-5ks",
    "potraviny": [
      "červená repa"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "BIO Cibuľa červená",
    "potraviny": [
      "cibuľa červená"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "BIO zázvor",
    "potraviny": [
      "zázvor"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Tekvica maslová",
    "potraviny": [
      "tekvica maslová"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "BIO Cuketa čerstvá",
    "potraviny": [
      "cuketa"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Petržlen koreňový praný",
    "potraviny": [
      "petržlen koreň"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Kapusta biela kvasená",
    "potraviny": [
      "kapusta biela"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Kel ružičkový",
    "potraviny": [
      "ružičkový kel"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Šalát rímsky rezaný, praný",
    "potraviny": [
      "šalát rímsky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Paprika zelená, 1ks",
    "potraviny": [
      "paprika zelená"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Polievková zmes celá",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Paradajky cherry datľové Shaker žlté",
    "potraviny": [
      "paradajky žlté"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Špargľa zelená",
    "potraviny": [
      "špargľa"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Kapusta červená",
    "potraviny": [
      "kapusta červená"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Šalát mix rezaný sedliacky",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Brokolica stonková",
    "potraviny": [
      "brokolica stonková"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Kapusta biela neskorá",
    "potraviny": [
      "kapusta biela"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Fine Life Paprika žltá",
    "potraviny": [
      "paprika žltá"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Polníček praný, vanička",
    "potraviny": [
      "valeriánka poľná"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Slovatys Batátové hranolky",
    "potraviny": [
      "sladké zemiaky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Liptov Greens Mikrobylinky - Výhonky hrach Affyla, vanička",
    "potraviny": [
      "hrachové výhonky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Šalát Pack Choi",
    "potraviny": [
      "pak choi"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Baklažán",
    "potraviny": [
      "baklažán"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Andaco Kapusta kvasená biela bez konzervantov",
    "potraviny": [
      "kapusta biela"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef  Šalát Mistra Classica praný, sáčok",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Kapusta kvasená biela 85%",
    "potraviny": [
      "kapusta biela"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Baklažán, balený",
    "potraviny": [
      "baklažán"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Polievková zmes Julienne",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Reďkovka biela dlhá, 1 ks",
    "potraviny": [
      "daikon"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "BIO Cvikla predvarená",
    "potraviny": [
      "červená repa"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Paradajky červené",
    "potraviny": [
      "paradajky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Rajčiny San Marzano, 400g",
    "potraviny": [
      "paradajky San Marzano"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Rajčiny cherry, datľové, hnedé",
    "potraviny": [
      "paradajky cherry"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Liptov Greens Mikrobylinky - Výhonky reďkovka China Rose, vanička",
    "potraviny": [
      "reďkovková mikrozelenina"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Zeleninový snack mrkva tyčinky",
    "potraviny": [
      "mrkva"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Cherry paradajky datľové oranžové, shaker",
    "potraviny": [
      "paradajky cherry"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Hrášok cukrový lusky",
    "potraviny": [
      "hrášok cukrový"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Šalát ľadový rezaný",
    "potraviny": [
      "šalát ľadový"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Mrkva baby kornút, čerstvá",
    "potraviny": [
      "mrkva"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Zázvor, vanička",
    "potraviny": [
      "zázvor"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Šalát Lollo Biondo",
    "potraviny": [
      "šalát Lollo Biondo"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Zemiaky predvarené guličky",
    "potraviny": [
      "zemiaky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Cibuľa žltá",
    "potraviny": [
      "cibuľa žltá"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Paradajky San Marzano, vanička",
    "potraviny": [
      "paradajky San Marzano"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Šalátové listy červenej repy",
    "potraviny": [
      "cviklové listy"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Aro Kapusta kvasená biela",
    "potraviny": [
      "kapusta biela"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Póry, sieť",
    "potraviny": [
      "pór"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Pán Zemiak Americké zemiaky blanšírované",
    "potraviny": [
      "zemiaky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Zázvor, tácka",
    "potraviny": [
      "zázvor"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Špargľa zelená baby",
    "potraviny": [
      "špargľa"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Kapusta špicatá zelená",
    "potraviny": [
      "kapusta špicatá"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Kapusta hlávková biela, strúhaná",
    "potraviny": [
      "kapusta biela"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Šalát mix rezaný kráľovský",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Paprika mix",
    "potraviny": [
      "paprika"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Zemiaky konzumné, varný typ C",
    "potraviny": [
      "zemiaky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Pán Zemiak Zemiaky mesiačiky blanšírované",
    "potraviny": [
      "zemiaky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Paprika Padrone",
    "potraviny": [
      "paprika Padrón"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Fenikel",
    "potraviny": [
      "fenikel"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Fino Fresco Šalát Mesclun nepraný kvetový",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Kapusta pekinská",
    "potraviny": [
      "kapusta pekingská"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Šalát dubový zelený",
    "potraviny": [
      "šalát dubový"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Fine Life Cibuľa šalotka",
    "potraviny": [
      "šalotka"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Kukurica vakuovaná predvarená",
    "potraviny": [
      "kukurica cukrová"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "BIO Paprika Ramino 2 ks",
    "potraviny": [
      "paprika Ramiro"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Šalátové srdiečka",
    "potraviny": [
      "šalát rímsky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Polievková zelenina očistená",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Zemiaky neskoré Agria, varný typ B",
    "potraviny": [
      "zemiaky Agria"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Cesnak červený lúpaný, čerstvý",
    "potraviny": [
      "cesnak"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Paradajky Kumato",
    "potraviny": [
      "paradajky Kumato"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Kapusta kvasená biela",
    "potraviny": [
      "kapusta biela"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Efko Chren strúhaný ostrý",
    "potraviny": [
      "chren"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Kapusta kvasená biela",
    "potraviny": [
      "kapusta biela"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Kapusta hlávková červená, strúhaná",
    "potraviny": [
      "kapusta červená"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Cesnak jednostrúčikový, vanička",
    "potraviny": [
      "cesnak"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Chilli papričky, kvetináč",
    "potraviny": [
      "čili papričky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Kel hlávkový, fólia",
    "potraviny": [
      "kel"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Uhorky kvasené",
    "potraviny": [
      "uhorky nakladačky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Pán Zemiak Cvikla blanšírovaná kocky",
    "potraviny": [
      "červená repa"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Titbit Chilli papričky Rawit, červené, pálivosť 8",
    "potraviny": [
      "čili papričky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Mrkva karotka fialová",
    "potraviny": [
      "mrkva fialová"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Pán Zemiak Zemiaky blanšírované kocky 1x1 cm",
    "potraviny": [
      "zemiaky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Feferónka Kajenská mix, čerstvá, pálivosť 7",
    "potraviny": [
      "kajenské papričky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Paštrnák praný",
    "potraviny": [
      "paštrnák"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Mikro bylinky Hrášok",
    "potraviny": [
      "hrachové výhonky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Fazuľové lusky guľaté",
    "potraviny": [
      "fazuľové struky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Fine Life Paprika zelená",
    "potraviny": [
      "paprika zelená"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Mrkva karotka žltá",
    "potraviny": [
      "mrkva žltá"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Kurkuma",
    "potraviny": [
      "kurkuma"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Chren, 1ks",
    "potraviny": [
      "chren"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Kapusta Kimchi classic heat",
    "potraviny": [
      "kapusta pekingská"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Cuketa baby",
    "potraviny": [
      "cuketa"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Zemiaky skoré prané červené, varný typ B",
    "potraviny": [
      "zemiaky červené"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Výhonky hrášku zeleného",
    "potraviny": [
      "hrachové výhonky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Čakanka biela",
    "potraviny": [
      "čakanka biela"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Thajský zeleninový mix na panvicu",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Family Big Stir Fry  Zelenina na panvicu",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Hrášok plochý lusky",
    "potraviny": [
      "hrášok cukrový"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Chilli papričky červené, pálivosť 5",
    "potraviny": [
      "čili papričky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Cesnak červený lúpaný",
    "potraviny": [
      "cesnak"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Liptov Greens Mikrobylinky - Výhonky reďkovka Rambo Red, vanička",
    "potraviny": [
      "reďkovková mikrozelenina"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Šalát Mizuna zelená",
    "potraviny": [
      "mizuna"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Feferónka Jalapeno zelená, čerstvá, pálivosť 5",
    "potraviny": [
      "jalapeño"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Microgreens Láskavec krvavý",
    "potraviny": [
      "láskavec krvavý"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Minestrone Polievková zmes",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Zemiaky, varný typ A",
    "potraviny": [
      "zemiaky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Kapusta kvasená červená",
    "potraviny": [
      "kapusta červená"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Pán Zemiak Mrkvové kocky blanšírované",
    "potraviny": [
      "mrkva"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Mediterranean Mix Zelenina",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Kukurica sladká predvarená 4ks",
    "potraviny": [
      "kukurica cukrová"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Kvaka",
    "potraviny": [
      "kvaka"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Zemiaky fialové",
    "potraviny": [
      "zemiaky fialové"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Kukurica predvarená",
    "potraviny": [
      "kukurica cukrová"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Klíčky póru",
    "potraviny": [
      "pórové klíčky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Feferónka Kajenská červená, čerstvá, pálivosť 6",
    "potraviny": [
      "kajenské papričky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Čalamáda, vanička",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Rajčiny cherry kríčkové triomix čerstvé",
    "potraviny": [
      "paradajky cherry"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Klíčky cesnaku",
    "potraviny": [
      "cesnakové klíčky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Klíčky china rose",
    "potraviny": [
      "reďkovkové klíčky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Cvikla Chioggia",
    "potraviny": [
      "cvikla Chioggia"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Šalát Frisee, 1 ks",
    "potraviny": [
      "endívia frisée"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Čalamáda pikantná, vedro",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Klíčky reďkovky červenej",
    "potraviny": [
      "reďkovkové klíčky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "La Abuela Carmen BIO Cesnak čierny, 2 ks",
    "potraviny": [
      "cesnak"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Čalamáda",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Cvikla/Repa krájaná",
    "potraviny": [
      "červená repa"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Batáty",
    "potraviny": [
      "sladké zemiaky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Mrkva baby farebná s vňaťou",
    "potraviny": [
      "mrkva"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Cesnak Morado červený",
    "potraviny": [
      "cesnak"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Tekvica Halloween",
    "potraviny": [
      "tekvica"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Aro Kvasená kapusta červená",
    "potraviny": [
      "kapusta červená"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "České houby Cesnaková pasta",
    "potraviny": [
      "cesnak"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Feferónka Rawit mix, pálivosť 8",
    "potraviny": [
      "čili papričky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Fine Life Cvikla červená v sladkokyslom náleve",
    "potraviny": [
      "červená repa"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Klíčky reďkovky žltej",
    "potraviny": [
      "reďkovkové klíčky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Fine Life Čalamáda v sladkokyslom náleve",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Klíčky cvikly červenej",
    "potraviny": [
      "cviklové klíčky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Tekvica Babybear",
    "potraviny": [
      "tekvica"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Repa predvarená očistená",
    "potraviny": [
      "červená repa"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Čalamáda pikantná",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Feferónka Habanero červená, čerstvá, pálivosť 9",
    "potraviny": [
      "habanero"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Šalát Quattro Gusti nepraný, vanička",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Kapusta Kimchi tropical white",
    "potraviny": [
      "kapusta pekingská"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Radicchio",
    "potraviny": [
      "radicchio"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Šalát Lollo Rosso",
    "potraviny": [
      "šalát Lollo Rosso"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Kapusta Kimchi Extra hot",
    "potraviny": [
      "kapusta pekingská"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Fine Life Čalamáda v sladkokyslom náleve pikant",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Tekvica Chameleon",
    "potraviny": [
      "tekvica"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Zemiaky neprané",
    "potraviny": [
      "zemiaky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Šalát dubový červený",
    "potraviny": [
      "šalát dubový"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Reďkovka čierna",
    "potraviny": [
      "reďkev čierna"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Efko Chren strúhaný ostrý",
    "potraviny": [
      "chren"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Tekvica špagetová",
    "potraviny": [
      "tekvica špagetová"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Tekvica, muškátová",
    "potraviny": [
      "tekvica muškátová"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Ginno 100 % zázvorové kocky",
    "potraviny": [
      "zázvor"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Klíčky Azuki zelené",
    "potraviny": [
      "azuki klíčky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Microgreens Kapucínka väčšia",
    "potraviny": [
      "kapucínka"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "České houby Chrenová pasta",
    "potraviny": [
      "chren"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Koreň čierny",
    "potraviny": [
      "čierny koreň"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Efko Chren strúhaný ostrý",
    "potraviny": [
      "chren"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Živina Kimchi Nepálivé",
    "potraviny": [
      "kapusta pekingská"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Živina Kimchi shiitake",
    "potraviny": [
      "shiitake",
      "kapusta pekingská"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Živina Kimchi natur stredne pálivé",
    "potraviny": [
      "kapusta pekingská"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Živina Kimchi Nepálivé",
    "potraviny": [
      "kapusta pekingská"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Živina Kimchi Jidášovo ucho",
    "potraviny": [
      "ucho Judášovo",
      "kapusta pekingská"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Živina Kimchi stredne pikantné (natur)",
    "potraviny": [
      "kapusta pekingská"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Živina Kimchi Fenikel",
    "potraviny": [
      "kapusta pekingská",
      "fenikel"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Živina Kimchi Pálivé",
    "potraviny": [
      "kapusta pekingská"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Uhorka hadovka",
    "potraviny": [
      "uhorka šalátová"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Kukurica, klas",
    "potraviny": [
      "kukurica cukrová"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Petržlen koreňový praný",
    "potraviny": [
      "petržlen koreň"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Paprika červená, 1ks",
    "potraviny": [
      "paprika červená"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Cuketa balená, 3ks",
    "potraviny": [
      "cuketa"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Zemiaky prané žlté skoré, varný typ A",
    "potraviny": [
      "zemiaky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Repa červená",
    "potraviny": [
      "červená repa"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Zemiaky červené prané, varný typ B",
    "potraviny": [
      "zemiaky červené"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "BIO Paradajky červené",
    "potraviny": [
      "paradajky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Reďkovka biela gul'atá, 1 ks",
    "potraviny": [
      "reďkovka biela"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Cesnak červený olúpaný",
    "potraviny": [
      "cesnak"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Paradajky cherry Storia, vanička",
    "potraviny": [
      "paradajky cherry"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Papriky mini Tatayoyo",
    "potraviny": [
      "paprika mini"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Mikro bylinky Reďkovka",
    "potraviny": [
      "reďkovková mikrozelenina"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Topinambur",
    "potraviny": [
      "topinambur"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Klíčky (reďkovka, lucerna, brokolica)",
    "potraviny": [
      "reďkovkové klíčky",
      "lucernové klíčky",
      "brokolicové klíčky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Šalát hlávkový",
    "potraviny": [
      "šalát hlávkový"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Cibuľa biela, 50/70, čerstvá, sieť",
    "potraviny": [
      "cibuľa biela"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Microgreens Žerucha siata",
    "potraviny": [
      "žerucha"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Paprika chilli mix, čerstvá, pálivosť 4,8,9",
    "potraviny": [
      "čili papričky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Repa žltá",
    "potraviny": [
      "repa žltá"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Artičoka",
    "potraviny": [
      "artičoky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Mikro bylinky Slnečnica",
    "potraviny": [
      "slnečnicová mikrozelenina"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Feferónka Habanero mix, čerstvá, pálivosť 9",
    "potraviny": [
      "habanero"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Mix párty nakladaná zelenina",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Zemiaky neskoré Grenaile, varný typ A",
    "potraviny": [
      "zemiaky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Zemiaky konzumné neskoré, varný typ B",
    "potraviny": [
      "zemiaky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Zemiaky konzumné, varný typ A",
    "potraviny": [
      "zemiaky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Kapusta špicatá červená",
    "potraviny": [
      "kapusta špicatá červená"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Zeler stonkový",
    "potraviny": [
      "zeler stopkový"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Paradajky cherry kríčkové",
    "potraviny": [
      "paradajky cherry"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Paradajky cherry Piccadio",
    "potraviny": [
      "paradajky cherry"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Paradajky cherry McDreamy",
    "potraviny": [
      "paradajky cherry"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Metro Chef Špargľa biela",
    "potraviny": [
      "špargľa"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Paprika biela",
    "potraviny": [
      "paprika biela"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Šalát hlávkový",
    "potraviny": [
      "šalát hlávkový"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Hrášok, vanička",
    "potraviny": [
      "hrášok"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Špargľa biela",
    "potraviny": [
      "špargľa"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Špargľa zelená na gril",
    "potraviny": [
      "špargľa"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Paradajky strapcové",
    "potraviny": [
      "paradajky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Mrkva celá",
    "potraviny": [
      "mrkva"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Cibuľa žltá lúpaná",
    "potraviny": [
      "cibuľa žltá"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Cibuľa červená, lúpaná",
    "potraviny": [
      "cibuľa červená"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Petržlen koreňový, balenie",
    "potraviny": [
      "petržlen koreň"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Karfiol oranžový",
    "potraviny": [
      "karfiol oranžový"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Karfiol Romanesco",
    "potraviny": [
      "romanesco"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Špargľa biela",
    "potraviny": [
      "špargľa"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Mrkva s vňaťou, zväzok",
    "potraviny": [
      "mrkva"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Rajčiny Wabi-Sabi čerstvé",
    "potraviny": [
      "paradajky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Cesnak medvedí čerstvý",
    "potraviny": [
      "medvedí cesnak"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Cesnak medvedí",
    "potraviny": [
      "medvedí cesnak"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Rajčiny cherry Divino Imperial čerstvé",
    "potraviny": [
      "paradajky cherry"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Cesnak čerstvý 3 ks zväzok",
    "potraviny": [
      "cesnak"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Paprika červená kápia",
    "potraviny": [
      "paprika kápia"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Lollo biondo",
    "potraviny": [
      "šalát Lollo Biondo"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Zelenina",
    "nazov": "Rajčina Monterrosa ružová",
    "potraviny": [
      "paradajky Monterrosa"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Huby",
    "nazov": "Metro Chef Šampiňóny hnedé",
    "potraviny": [
      "šampiňón hnedý"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Huby",
    "nazov": "Metro Chef Šampiňóny biele",
    "potraviny": [
      "šampiňón biely"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Huby",
    "nazov": "Kuriatko jedlé",
    "potraviny": [
      "kuriatka"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Huby",
    "nazov": "Šampiňóny biele",
    "potraviny": [
      "šampiňón biely"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Huby",
    "nazov": "Shimeji hnedé",
    "potraviny": [
      "shimeji hnedé"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Huby",
    "nazov": "Shiitake",
    "potraviny": [
      "shiitake"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Huby",
    "nazov": "Metro Chef Šampiňóny hnedé",
    "potraviny": [
      "šampiňón hnedý"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Huby",
    "nazov": "Metro Chef Šampiňóny Portobello",
    "potraviny": [
      "šampiňón hnedý"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Huby",
    "nazov": "Huby Enoki",
    "potraviny": [
      "enoki"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Huby",
    "nazov": "Metro Chef Huby sušené",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "kategoria": "Huby",
    "nazov": "Shimeji biele",
    "potraviny": [
      "shimeji biele"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Huby",
    "nazov": "České houby Hubové korenie",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "kategoria": "Huby",
    "nazov": "Oyster Royal Eryngius čerstvé",
    "potraviny": [
      "hliva kráľovská"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Huby",
    "nazov": "Zmes lesných sušených húb",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "kategoria": "Huby",
    "nazov": "Metro Chef Sušené huby",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "kategoria": "Huby",
    "nazov": "Maitake vanička",
    "potraviny": [
      "maitake"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Huby",
    "nazov": "Metro Chef Shiitake huby sušené 2-7ks",
    "potraviny": [
      "shiitake"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Huby",
    "nazov": "Metro Chef Hríb smrekový sušený mix",
    "potraviny": [
      "hríb smrekový"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Huby",
    "nazov": "Holoubek & pravnuci Zmes lesných húb sušená",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "kategoria": "Huby",
    "nazov": "Metro Chef Hubové korenie",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "kategoria": "Huby",
    "nazov": "Holoubek & pravnuci s.r.o. Sušený",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "kategoria": "Huby",
    "nazov": "Metro Chef Hliva ustricová",
    "potraviny": [
      "hliva ustricová"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Metro Chef Koriander",
    "potraviny": [
      "koriandrová vňať"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Metro Chef Mäta zelená",
    "potraviny": [
      "mäta klasnatá"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Metro Chef Petržlenová vňať hladkolistá",
    "potraviny": [
      "petržlenová vňať hladkolistá"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Metro Chef Kôpor",
    "potraviny": [
      "kôpor"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Metro Chef Pažítka",
    "potraviny": [
      "pažítka"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Metro Chef Bazalka, kvetináč",
    "potraviny": [
      "bazalka"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Metro Chef Tymián citrónový",
    "potraviny": [
      "tymián citrónový"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Metro Chef Koriander čerstvý, kvetináč",
    "potraviny": [
      "koriandrová vňať"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Metro Chef Petržlen kučeravý",
    "potraviny": [
      "petržlenová vňať kučeravá"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Metro Chef Bazalka",
    "potraviny": [
      "bazalka"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Petržlen hladkolistý, balený",
    "potraviny": [
      "petržlenová vňať hladkolistá"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Metro Chef Mungo klíčky, vrecko",
    "potraviny": [
      "mungo klíčky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Metro Chef Rozmarín",
    "potraviny": [
      "rozmarín"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Chilli papričky, kvetináč",
    "potraviny": [
      "čili papričky"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Vanilkový lusk",
    "potraviny": [
      "vanilka"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Metro Chef Ligurček",
    "potraviny": [
      "ligurček"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Metro Chef Tymián, kvetináč",
    "potraviny": [
      "tymián"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Metro Chef Tymián",
    "potraviny": [
      "tymián"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Metro Chef Petržlen kučeravý, kvetináč",
    "potraviny": [
      "petržlenová vňať kučeravá"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Jedlé kvety Viola mix",
    "potraviny": [
      "fialkové kvety"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Citronová tráva",
    "potraviny": [
      "citrónová tráva"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Metro Chef Rozmarín, kvetináč",
    "potraviny": [
      "rozmarín"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Metro Chef Bobkový list. čerstvý",
    "potraviny": [
      "bobkový list"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Asian Choice Citrónová tráva",
    "potraviny": [
      "citrónová tráva"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Petržlen kučeravý",
    "potraviny": [
      "petržlenová vňať kučeravá"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Metro Chef Zmes byliniek na gril, čerstvá",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Metro Chef Zmes byliniek talianska, čerstvá",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Metro Chef Trebuľka čerstvá",
    "potraviny": [
      "trebuľka"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Metro Chef Zmes byliniek provensálska, čerstvá",
    "stav": "vylúčené",
    "dovod": "zloženie sa z názvu nedá určiť"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Metro Chef Estragon",
    "potraviny": [
      "estragón"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Jedlé kvety - ruže, vanička",
    "potraviny": [
      "ružové lupene"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Titbit Medvedí cesnak",
    "potraviny": [
      "medvedí cesnak"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Petržlen hladkolistý",
    "potraviny": [
      "petržlenová vňať hladkolistá"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Metro Chef Mäta čerstvá, kvetináč",
    "potraviny": [
      "mäta"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Kôpor jemný čerstvý, fólia",
    "potraviny": [
      "kôpor"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Metro Chef Thajská bazalka",
    "potraviny": [
      "bazalka thajská"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Metro Chef Petržlen hladkolistý čerstvý, kvetináč",
    "potraviny": [
      "petržlenová vňať hladkolistá"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Metro Chef Šalvia čerstvá, balenie",
    "potraviny": [
      "šalvia"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Metro Chef Microgreens Žerucha siata",
    "potraviny": [
      "žerucha"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Metro Chef Medovka čerstvá, kvetináč",
    "potraviny": [
      "medovka"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Metro Chef Kôpor čerstvý",
    "potraviny": [
      "kôpor"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Metro Chef Oregano čerstvé, vanička",
    "potraviny": [
      "oregano"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Metro Chef Majorán čerstvý, kvetináč",
    "potraviny": [
      "majorán"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Metro Chef Kôpor",
    "potraviny": [
      "kôpor"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Metro Chef Koriander",
    "potraviny": [
      "koriandrová vňať"
    ],
    "stav": "zaradené"
  },
  {
    "kategoria": "Bylinky a korenie",
    "nazov": "Metro Chef Kôpor",
    "potraviny": [
      "kôpor"
    ],
    "stav": "zaradené"
  }
] as const satisfies readonly ProduktKosik[];

/**
 * Typové testy: overujú, že typy odmietnu nesprávne štruktúrovaný strom.
 * Každý riadok s @ts-expect-error MUSÍ vyvolať chybu, inak typecheck zlyhá.
 */
import type { Potravina, U16_JedlaCast, U17_Potravina, U01_Risa } from "../src/strom.types";
import type { strom } from "../src/data/strom";

// --- správne ---
export const ok1: U17_Potravina = { "jablko": "bežné" };
export const okMenej: U17_Potravina = { "egreš": "menej bežné" };
export const okExoticke: U17_Potravina = { "liči": "exotické" };
export const ok2: U16_JedlaCast = { "plod": { "jablko": "bežné" } };
export const ok3: Potravina<typeof strom> = "brokolica";

// --- list príliš skoro (strom je o úroveň plytší) ---
// @ts-expect-error list na úrovni 16
export const plytky: U16_JedlaCast = { "plod": "bežné" };

// --- strom príliš hlboký (objekt namiesto listu) ---
// @ts-expect-error objekt na úrovni 17
export const hlboky: U17_Potravina = { "jablko": { "navyse": "bežné" } };

// --- list musí byť "bežné", "menej bežné" alebo "exotické" ---
// @ts-expect-error pôvodná číselná hodnota
export const zlaHodnota: U17_Potravina = { "jablko": 0 };
// @ts-expect-error neznáma kategória
export const zlaKategoria: U17_Potravina = { "jablko": "vzácne" };

// --- značky nesmú byť názvom potraviny ---
// @ts-expect-error "-" ako potravina
export const znacka1: U17_Potravina = { "-": "bežné" };
// @ts-expect-error "TBD" ako potravina
export const znacka2: U17_Potravina = { "TBD": "bežné" };
// @ts-expect-error "*" ako potravina
export const znacka3: U17_Potravina = { "*": "bežné" };

// --- koreň nesmie byť priamo list ---
// @ts-expect-error list na úrovni 1
export const koren: U01_Risa = { "rastliny": "bežné" };

// --- potravina, ktorá v strome nie je ---
// @ts-expect-error neexistujúca potravina
export const neznama: Potravina<typeof strom> = "dračí zub";

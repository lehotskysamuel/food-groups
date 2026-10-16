/// <reference types="vite/client" />
/**
 * Súbory plánov jedál: plany/<plán>/<jedlo>.json. Vite ich pri builde vloží do stránky,
 * v dev serveri sa nový alebo upravený súbor prejaví hneď. Tvar súboru je `Jedlo` v src/jedla.ts.
 */
export const subory: Readonly<Record<string, unknown>> = import.meta.glob("./plany/*/*.json", {
  eager: true,
  import: "default",
});

// Spustí kontroly zo src/kontrola.ts nad src/data/strom.ts a overí plány jedál (src/data/plany).
// TypeScript načíta cez Vite, preto stačí ľubovoľná verzia Node. Pri nájdenej chybe skončí s kódom 1.
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const vite = await createServer({
  root: fileURLToPath(new URL("..", import.meta.url)),
  configFile: false,
  logLevel: "error",
  appType: "custom",
  server: { middlewareMode: true, hmr: false },
});
try {
  const { strom } = await vite.ssrLoadModule("/src/data/strom.ts");
  const { skontroluj } = await vite.ssrLoadModule("/src/kontrola.ts");
  const { subory } = await vite.ssrLoadModule("/src/data/plany.ts");
  const { nacitajPlany, nazvyPotravin } = await vite.ssrLoadModule("/src/jedla.ts");
  const chyby = skontroluj(strom);
  if (chyby.length === 0) console.log("Strom je v poriadku.");

  const { plany, chyby: chybyPlanov } = nacitajPlany(subory, nazvyPotravin(strom));
  if (chybyPlanov.length === 0) {
    const jedla = plany.reduce((a, p) => a + p.jedla.length, 0);
    const sklon = (n, [jeden, dva, pat]) => (n === 1 ? jeden : n >= 2 && n <= 4 ? dva : pat);
    console.log(
      `Plány jedál sú v poriadku (${plany.length} ${sklon(plany.length, ["plán", "plány", "plánov"])}, ` +
        `${jedla} ${sklon(jedla, ["jedlo", "jedlá", "jedál"])}).`,
    );
  }
  chyby.push(...chybyPlanov.map((c) => `[jedlá] ${c}`));

  if (chyby.length > 0) {
    console.error(chyby.join("\n"));
    console.error(`\n${chyby.length} ${chyby.length === 1 ? "chyba" : chyby.length < 5 ? "chyby" : "chýb"}.`);
    process.exitCode = 1;
  }
} finally {
  await vite.close();
}

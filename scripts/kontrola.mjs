// Spustí kontroly zo src/kontrola.ts nad src/data/strom.ts. TypeScript načíta cez Vite,
// preto stačí ľubovoľná verzia Node. Pri nájdenej chybe skončí s kódom 1.
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
  const chyby = skontroluj(strom);
  if (chyby.length === 0) {
    console.log("Strom je v poriadku.");
  } else {
    console.error(chyby.join("\n"));
    console.error(`\n${chyby.length} ${chyby.length === 1 ? "chyba" : chyby.length < 5 ? "chyby" : "chýb"}.`);
    process.exitCode = 1;
  }
} finally {
  await vite.close();
}

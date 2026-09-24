import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vite";
import { dalsia, prepniList } from "./src/uprava";
import { DOSTUPNOST, type List } from "./src/strom.types";

const STROM = fileURLToPath(new URL("./src/data/strom.ts", import.meta.url));
const LOKALNE = new Set(["127.0.0.1", "::1", "::ffff:127.0.0.1"]);

/**
 * Edit mód: len dev server. POST /__edit/prepni { cesta, z } prepne list v src/data/strom.ts
 * na nasledujúcu hodnotu (bežné → menej bežné → exotické → bežné). Prijíma len požiadavky z tohto počítača a z tejto stránky.
 */
function editMod(): Plugin {
  return {
    name: "food-groups:edit-mod",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use("/__edit/prepni", (req, res) => {
        const odpovedz = (kod: number, telo: unknown): void => {
          res.statusCode = kod;
          res.setHeader("Content-Type", "application/json; charset=utf-8");
          res.end(JSON.stringify(telo));
        };
        const origin = req.headers.origin;
        if (
          req.method !== "POST" ||
          !LOKALNE.has(req.socket.remoteAddress ?? "") ||
          !req.headers["content-type"]?.startsWith("application/json") ||
          (origin !== undefined && new URL(origin).host !== req.headers.host)
        ) {
          odpovedz(403, { chyba: "Edit mód prijíma len lokálne požiadavky z vlastnej stránky." });
          return;
        }
        let telo = "";
        req.setEncoding("utf8");
        req.on("data", (kus: string) => (telo += kus));
        req.on("end", () => {
          try {
            const { cesta, z } = JSON.parse(telo) as { cesta: unknown; z: unknown };
            if (!Array.isArray(cesta) || !cesta.every((k) => typeof k === "string") || !Object.hasOwn(DOSTUPNOST, String(z))) {
              odpovedz(400, { chyba: "Neplatná požiadavka." });
              return;
            }
            writeFileSync(STROM, prepniList(readFileSync(STROM, "utf8"), cesta, z as List));
            odpovedz(200, { dostupnost: dalsia(z as List) });
          } catch (e) {
            odpovedz(409, { chyba: e instanceof Error ? e.message : String(e) });
          }
        });
      });
    },
  };
}

/** Build vloží JS a CSS priamo do index.html, aby sa dal otvoriť aj bez servera (file://). */
function jedenSubor(): Plugin {
  return {
    name: "food-groups:jeden-subor",
    apply: "build",
    enforce: "post",
    generateBundle(_, bundle) {
      const html = bundle["index.html"];
      if (!html || html.type !== "asset") return;
      /** Obsah súboru z bundla podľa URL v HTML (funguje pre každé `base`, aj --base=/food-groups/). */
      const obsah = (url: string): string => {
        const nazov = Object.keys(bundle).find((k) => url.endsWith("/" + k) || url === k);
        const s = nazov === undefined ? undefined : bundle[nazov];
        if (nazov === undefined || !s) throw new Error(`V bundli chýba ${url}.`);
        delete bundle[nazov];
        return s.type === "chunk" ? s.code : String(s.source);
      };
      html.source = String(html.source)
        .replace(/<script type="module" crossorigin src="([^"]+)"><\/script>/g, (_m, s: string) =>
          `<script type="module">${obsah(s).replace(/<\/script/gi, "<\\/script")}</script>`,
        )
        .replace(/<link rel="stylesheet" crossorigin href="([^"]+)">/g, (_m, s: string) =>
          `<style>${obsah(s).replace(/<\/style/gi, "<\\/style")}</style>`,
        );
    },
  };
}

export default defineConfig({
  root: "web",
  base: "./",
  build: { outDir: "../dist", emptyOutDir: true },
  plugins: [editMod(), jedenSubor()],
});

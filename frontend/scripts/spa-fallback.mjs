import { copyFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const indexHtml = resolve(root, "dist", "index.html");
const fallback = resolve(root, "dist", "404.html");

if (!existsSync(indexHtml)) {
  console.error("spa-fallback: dist/index.html missing — run vite build first");
  process.exit(1);
}

copyFileSync(indexHtml, fallback);
console.log("spa-fallback: wrote dist/404.html");

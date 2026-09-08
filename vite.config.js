import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const root = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // Vercel serves the site at the domain root. GitHub Pages serves it
  // from /studio-voodoo/. Vercel sets VERCEL=1 during its build.
  base: process.env.VERCEL ? "/" : "/studio-voodoo/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        purplebricks: resolve(root, "purplebricks.html"),
        taka: resolve(root, "taka.html"),
        scout: resolve(root, "scout.html"),
      },
    },
  },
});

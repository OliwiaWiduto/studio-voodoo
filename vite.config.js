import { defineConfig } from "vite";

export default defineConfig({
  // Vercel serves the site at the domain root. GitHub Pages serves it
  // from /design-voodoo/. Vercel sets VERCEL=1 during its build.
  base: process.env.VERCEL ? "/" : "/design-voodoo/",
});

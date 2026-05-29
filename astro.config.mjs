import { defineConfig } from "astro/config";

export default defineConfig({
  site: process.env.SITE_URL ?? "https://peter-wilkins.github.io",
  base: process.env.SITE_BASE ?? "/yogalightness-beta",
});

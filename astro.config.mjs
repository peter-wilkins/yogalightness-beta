import { defineConfig } from "astro/config";

export default defineConfig({
  site: process.env.SITE_URL ?? "https://stillground.co.uk",
  base: process.env.SITE_BASE ?? "/",
});

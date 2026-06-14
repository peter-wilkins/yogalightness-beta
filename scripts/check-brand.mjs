import { readFileSync } from "node:fs";
import { relative } from "node:path";
import { globSync } from "node:fs";

const forbidden = [
  /Held Space Retreats/i,
  /Held Space/i,
  /held-space-retreats/i,
  /Yoga Lightness Beta/i,
  /mailto:[^"'\s>]*(gmail|googlemail)\.com/i,
  /[A-Z0-9._%+-]+@(gmail|googlemail)\.com/i,
  /Public beta/i,
];

const files = globSync("{AGENTS.md,src/**/*.{astro,md,ts,js,css}}", {
  nodir: true,
});

const failures = [];

for (const file of files) {
  const body = readFileSync(file, "utf8");
  for (const pattern of forbidden) {
    if (pattern.test(body)) {
      failures.push(`${relative(process.cwd(), file)} matches ${pattern}`);
    }
  }
}

if (failures.length) {
  console.error("Stale or private public-site text found:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Brand check passed");

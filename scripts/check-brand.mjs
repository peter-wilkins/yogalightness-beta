import { readFileSync } from "node:fs";
import { relative } from "node:path";
import { globSync } from "node:fs";

const forbidden = [
  /Held Space Retreats/i,
  /Held Space/i,
  /held-space-retreats/i,
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
  console.error("Stale Still Ground brand text found:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Brand check passed");

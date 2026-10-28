import { readFileSync } from "node:fs";
import { extname, relative } from "node:path";
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

const publicFiles = globSync("{AGENTS.md,README.md,src/**/*,public/**/*}", {
  nodir: true,
});
const privateSurname = new RegExp(["Ald", "iss"].join(""), "i");
const longerFirstName = new RegExp(["Jane", "Catherine"].join(""), "i");
const textExtensions = new Set([".astro", ".css", ".html", ".js", ".json", ".md", ".mjs", ".ts", ".txt", ".xml"]);

for (const file of publicFiles) {
  if (privateSurname.test(file) || longerFirstName.test(file)) {
    failures.push(`${file} contains a private name in its path`);
  }
  if (!textExtensions.has(extname(file))) continue;
  const body = readFileSync(file, "utf8");
  if (privateSurname.test(body) || longerFirstName.test(body)) {
    failures.push(`${file} contains a private name`);
  }
}

if (failures.length) {
  console.error("Stale or private public-site text found:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Brand check passed");

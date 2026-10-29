import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";

const page = readFileSync("src/pages/learn-to-meditate.astro", "utf8");
const script = page.match(/<script is:inline>([\s\S]*?)<\/script>/)?.[1];

function offerAt(instant) {
  const offer = {
    hidden: true,
    removed: false,
    remove() { this.removed = true; },
  };
  const timers = [];
  runInNewContext(script, {
    document: { getElementById: () => offer },
    Date: { parse: Date.parse, now: () => Date.parse(instant) },
    window: { setTimeout: (callback, delay) => timers.push({ callback, delay }) },
  });
  return { offer, timers };
}

test("introductory price is shown through 31 March in UK time", () => {
  assert.ok(script);
  assert.match(page, /Standard price: <b>&pound;875<\/b>/);
  assert.match(page, /<strong>&pound;775<\/strong>/);
  const { offer, timers } = offerAt("2027-03-31T22:59:59Z");
  assert.equal(offer.hidden, false);
  assert.equal(offer.removed, false);
  assert.equal(timers.length, 1);
});

test("introductory price expires at midnight on 1 April in UK time", () => {
  const { offer, timers } = offerAt("2027-03-31T23:00:00Z");
  assert.equal(offer.removed, true);
  assert.equal(timers.length, 0);
});

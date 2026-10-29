import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";

function offerAt(script, id, instant) {
  const offer = {
    hidden: true,
    removed: false,
    remove() { this.removed = true; },
  };
  const timers = [];
  runInNewContext(script, {
    document: { getElementById: (requestedId) => requestedId === id ? offer : null },
    Date: { parse: Date.parse, now: () => Date.parse(instant) },
    window: { setTimeout: (callback, delay) => timers.push({ callback, delay }) },
  });
  return { offer, timers };
}

for (const { name, path, id } of [
  { name: "meditation weekend", path: "src/pages/learn-to-meditate.astro", id: "meditation-intro-offer" },
  { name: "personal retreat", path: "src/pages/personal-retreats.astro", id: "retreat-intro-offer" },
]) {
  const page = readFileSync(path, "utf8");
  const script = page.match(/<script is:inline>([\s\S]*?)<\/script>/)?.[1];

  test(`${name} shows introductory price through 31 March in UK time`, () => {
    assert.ok(script);
    assert.match(page, /Standard price: <b>&pound;875<\/b>/);
    assert.match(page, /<strong>&pound;775<\/strong>/);
    assert.match(page, new RegExp(`id="${id}"`));
    const { offer, timers } = offerAt(script, id, "2027-03-31T22:59:59Z");
    assert.equal(offer.hidden, false);
    assert.equal(offer.removed, false);
    assert.equal(timers.length, 1);
  });

  test(`${name} expires introductory price at midnight on 1 April in UK time`, () => {
    const { offer, timers } = offerAt(script, id, "2027-03-31T23:00:00Z");
    assert.equal(offer.removed, true);
    assert.equal(timers.length, 0);
  });
}

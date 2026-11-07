import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const seedUrl = new URL("../data/catalog-seed.json", import.meta.url);
const seed = JSON.parse(readFileSync(fileURLToPath(seedUrl), "utf8"));
const supportedMediaTypes = new Set([
  "film",
  "tv-series",
  "animated-series",
  "animation-film",
  "documentary",
  "music-album",
  "podcast",
  "video-game",
  "book",
  "comic",
]);

test("starter catalogue is a non-empty array", () => {
  assert.ok(Array.isArray(seed));
  assert.ok(seed.length > 0);
});

test("every catalogue entry has a unique, non-empty ID and title", () => {
  const ids = seed.map((entry) => entry.id);

  assert.equal(new Set(ids).size, ids.length);

  for (const entry of seed) {
    assert.equal(typeof entry.id, "string");
    assert.ok(entry.id.trim().length > 0);
    assert.equal(typeof entry.title, "string");
    assert.ok(entry.title.trim().length > 0);
  }
});

test("every entry uses a media type supported by the initial interface", () => {
  for (const entry of seed) {
    assert.ok(supportedMediaTypes.has(entry.mediaType), entry.mediaType);
  }
});

test("release years are optional integers in the supported range", () => {
  for (const entry of seed) {
    if (entry.releaseYear !== undefined && entry.releaseYear !== null) {
      assert.ok(Number.isInteger(entry.releaseYear));
      assert.ok(entry.releaseYear >= 1800 && entry.releaseYear <= 2200);
    }
  }
});

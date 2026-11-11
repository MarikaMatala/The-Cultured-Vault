// CODE MAP / COMMENTING GUIDE
// File purpose: JavaScript tests for catalogue processing, record validation, and helper functions.
// Structure: testidata ja valmistelut ensin, testitapaukset seuraavaksi. Jokainen testi tarkistaa yhden rajatun asian.

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
const privateFieldPattern =
  /(rating|review|user.?id|account.?id|profile.?id|personal|private|email|token|secret|password)/i;

function assertPublicMetadata(value, path = "catalogue") {
  if (Array.isArray(value)) {
    value.forEach((item, index) => assertPublicMetadata(item, `${path}[${index}]`));
    return;
  }

  if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      assert.doesNotMatch(key, privateFieldPattern, `${path} contains a private-data field: ${key}`);
      assertPublicMetadata(child, `${path}.${key}`);
    }
  }
}

// TEST SECTION START: the following case checks one specific behavior.
test("starter catalogue is a non-empty array", () => {
  assert.ok(Array.isArray(seed));
  assert.ok(seed.length > 0);
});

// TEST SECTION START: the following case checks one specific behavior.
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

// TEST SECTION START: the following case checks one specific behavior.
test("every entry uses a media type supported by the initial interface", () => {
  for (const entry of seed) {
    assert.ok(supportedMediaTypes.has(entry.mediaType), entry.mediaType);
  }
});

// TEST SECTION START: the following case checks one specific behavior.
test("optional genres and tags are arrays of strings", () => {
  for (const entry of seed) {
    for (const field of ["genres", "tags"]) {
      if (entry[field] !== undefined) {
        assert.ok(Array.isArray(entry[field]), `${entry.id}: ${field} must be an array`);
        assert.ok(entry[field].every((value) => typeof value === "string"));
      }
    }
  }
});

// TEST SECTION START: the following case checks one specific behavior.
test("starter catalogue contains public metadata only", () => {
  assertPublicMetadata(seed);
});

// TEST SECTION START: the following case checks one specific behavior.
test("release years are optional integers in the supported range", () => {
  for (const entry of seed) {
    if (entry.releaseYear !== undefined && entry.releaseYear !== null) {
      assert.ok(Number.isInteger(entry.releaseYear));
      assert.ok(entry.releaseYear >= 1800 && entry.releaseYear <= 2200);
    }
  }
});

// FUNCTION SECTION END: assertPublicMetadata. The next section starts at the next function or at the end of the file.

// TEST SECTION START: optional descriptive metadata must retain its documented scalar types.
test("optional descriptive metadata fields are strings when present", () => {
  const textFields = ["originalTitle", "country", "language", "creator", "artist", "author"];

  for (const entry of seed) {
    for (const field of textFields) {
      if (entry[field] !== undefined && entry[field] !== null) {
        assert.equal(typeof entry[field], "string", `${entry.id}: ${field} must be a string`);
      }
    }
  }
});

// CODE MAP / COMMENTING GUIDE
// File purpose: Catalogue data structures, data processing, and catalogue helper functions.
// Structure: seed data import -> catalogue data types -> source adapter -> public catalogue retrieval function.
// Editing tip: catalogue entry fields are defined in CatalogueEntry; sample records are stored in data/catalog-seed.json.
// Keep database access server-side. Do not import private credentials into client components.

import rawCatalogue from "../data/catalog-seed.json";

// SECTION 1 START: fields supported by each catalogue record.
export interface CatalogueEntry {
  id: string;
  title: string;
  originalTitle?: string;
  mediaType: string;
  releaseYear?: number | null;
  country?: string;
  language?: string;
  creator?: string;
  artist?: string;
  author?: string;
  genres?: string[];
  tags?: string[];
}

export interface CatalogueSource {
  list(): Promise<CatalogueEntry[]>;
}

const seedEntries = rawCatalogue as CatalogueEntry[];

/**
 * Read-only source adapter for the public starter JSON.
 *
 * Replace this adapter with a server-only database implementation when a
 * self-hosted instance has configured and tested its own database.
 */
// SECTION 2 START: read-only adapter for the public sample catalogue.
class SeedCatalogueSource implements CatalogueSource {
  async list(): Promise<CatalogueEntry[]> {
    return seedEntries;
  }
}

const catalogueSource: CatalogueSource = new SeedCatalogueSource();

// SECTION 3 START: public function used by the home page to load catalogue entries.
// FUNCTION SECTION START: getCatalogueEntries.
export function getCatalogueEntries(): Promise<CatalogueEntry[]> {
  return catalogueSource.list();
}

// FUNCTION SECTION END: getCatalogueEntries. The next section starts at the next function or at the end of the file.
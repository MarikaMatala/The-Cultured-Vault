// CODE MAP / COMMENTING GUIDE
// File purpose: Catalogue data structures, data processing, and catalogue helper functions.
// Structure: imports and settings first, followed by data types and helper functions, with the component or main operations last.

import rawCatalogue from "../data/catalog-seed.json";

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
class SeedCatalogueSource implements CatalogueSource {
  async list(): Promise<CatalogueEntry[]> {
    return seedEntries;
  }
}

const catalogueSource: CatalogueSource = new SeedCatalogueSource();

// FUNCTION SECTION START: getCatalogueEntries.
export function getCatalogueEntries(): Promise<CatalogueEntry[]> {
  return catalogueSource.list();
}

// FUNCTION SECTION END: getCatalogueEntries. The next section starts at the next function or at the end of the file.
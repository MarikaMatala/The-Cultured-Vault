// KOMMENTOINTIOHJE / CODE MAP
// Tiedoston tarkoitus: Katalogin tietorakenteet, aineiston muokkaus ja katalogiin liittyvät apufunktiot.
// Rakenne: tuonnit ja asetukset ensin, tietotyypit ja apufunktiot seuraavaksi, komponentti tai päätoiminnot lopuksi.

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

// FUNKTIO-OSIO ALKAA: getCatalogueEntries.
export function getCatalogueEntries(): Promise<CatalogueEntry[]> {
  return catalogueSource.list();
}

// CODE MAP / COMMENTING GUIDE
// File purpose: Routes the application home page and renders the main component.
// Structure: imports and settings first, followed by data types and helper functions, with the component or main operations last.

import { VaultApp } from "@/components/vault-app";
import { getCatalogueEntries } from "@/lib/catalogue";
import { appConfig } from "@/lib/config";

export default async function HomePage() {
  const entries = await getCatalogueEntries();

  return <VaultApp config={appConfig} entries={entries} />;
}

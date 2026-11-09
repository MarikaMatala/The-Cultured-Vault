// KOMMENTOINTIOHJE / CODE MAP
// Tiedoston tarkoitus: Sovelluksen etusivun reititys ja pääkomponentin renderöinti.
// Rakenne: tuonnit ja asetukset ensin, tietotyypit ja apufunktiot seuraavaksi, komponentti tai päätoiminnot lopuksi.

import { VaultApp } from "@/components/vault-app";
import { getCatalogueEntries } from "@/lib/catalogue";
import { appConfig } from "@/lib/config";

export default async function HomePage() {
  const entries = await getCatalogueEntries();

  return <VaultApp config={appConfig} entries={entries} />;
}

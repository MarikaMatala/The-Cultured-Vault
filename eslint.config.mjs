// KOMMENTOINTIOHJE / CODE MAP
// Tiedoston tarkoitus: ESLintin koodintarkistuksen asetukset ja projektissa käytettävät säännöt.
// Rakenne: tuonnit ja asetukset ensin; tämän jälkeen määritellään työkalun toiminta.

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "node_modules/**"]),
]);

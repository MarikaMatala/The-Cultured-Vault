// KOMMENTOINTIOHJE / CODE MAP
// Tiedoston tarkoitus: Sovelluksen ympäristö- ja käyttöasetukset.
// Rakenne: tuonnit ja asetukset ensin, tietotyypit ja apufunktiot seuraavaksi, komponentti tai päätoiminnot lopuksi.

export type Locale = "en" | "fi";

export interface AppConfig {
  appName: string;
  tagline: string;
  defaultLocale: Locale;
  brandMonogram: string;
  sourceUrl: string;
  brandBronze: string;
  brandSilver: string;
  brandGold: string;
}

// FUNKTIO-OSIO ALKAA: safeColor.
function safeColor(value: string | undefined, fallback: string): string {
  const candidate = value?.trim();
  return candidate && /^#[0-9a-fA-F]{6}$/.test(candidate) ? candidate : fallback;
}

// FUNKTIO-OSIO ALKAA: safeMonogram.
function safeMonogram(value: string | undefined, fallback: string): string {
  const candidate = value?.trim();
  return candidate && /^[a-zA-Z0-9]{1,3}$/.test(candidate) ? candidate.toUpperCase() : fallback;
}

// FUNKTIO-OSIO ALKAA: safeSourceUrl.
function safeSourceUrl(value: string | undefined, fallback: string): string {
  try {
    const url = new URL(value || fallback);
    return url.protocol === "https:" ? url.toString() : fallback;
  } catch {
    return fallback;
  }
}

const configuredLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE?.trim().toLowerCase();

export const appConfig: AppConfig = {
  appName: process.env.NEXT_PUBLIC_APP_NAME?.trim() || "The Cultured Vault",
  tagline:
    process.env.NEXT_PUBLIC_APP_TAGLINE?.trim() ||
    "Culture worth discovering. Stories worth remembering.",
  defaultLocale: configuredLocale === "fi" ? "fi" : "en",
  brandMonogram: safeMonogram(process.env.NEXT_PUBLIC_BRAND_MONOGRAM, "CV"),
  sourceUrl: safeSourceUrl(
    process.env.NEXT_PUBLIC_SOURCE_URL,
    "https://github.com/MarikaMatala/The-Cultured-Vault",
  ),
  brandBronze: safeColor(process.env.NEXT_PUBLIC_BRAND_BRONZE, "#b97b48"),
  brandSilver: safeColor(process.env.NEXT_PUBLIC_BRAND_SILVER, "#c7cbd0"),
  brandGold: safeColor(process.env.NEXT_PUBLIC_BRAND_GOLD, "#e2bd6f"),
};

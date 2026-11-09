// CODE MAP / COMMENTING GUIDE
// File purpose: Application environment and runtime configuration.
// Structure: imports and settings first, followed by data types and helper functions, with the component or main operations last.

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

// FUNCTION SECTION START: safeColor.
function safeColor(value: string | undefined, fallback: string): string {
  const candidate = value?.trim();
  return candidate && /^#[0-9a-fA-F]{6}$/.test(candidate) ? candidate : fallback;
}

// FUNCTION SECTION START: safeMonogram.
// FUNCTION SECTION END: safeColor. The next section starts at the next function or at the end of the file.
function safeMonogram(value: string | undefined, fallback: string): string {
  const candidate = value?.trim();
  return candidate && /^[a-zA-Z0-9]{1,3}$/.test(candidate) ? candidate.toUpperCase() : fallback;
}

// FUNCTION SECTION START: safeSourceUrl.
// FUNCTION SECTION END: safeMonogram. The next section starts at the next function or at the end of the file.
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

// FUNCTION SECTION END: safeSourceUrl. The next section starts at the next function or at the end of the file.
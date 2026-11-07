export type Locale = "en" | "fi";

export interface AppConfig {
  appName: string;
  tagline: string;
  defaultLocale: Locale;
  brandBronze: string;
  brandSilver: string;
  brandGold: string;
}

function safeColor(value: string | undefined, fallback: string): string {
  const candidate = value?.trim();
  return candidate && /^#[0-9a-fA-F]{6}$/.test(candidate) ? candidate : fallback;
}

const configuredLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE?.trim().toLowerCase();

export const appConfig: AppConfig = {
  appName: process.env.NEXT_PUBLIC_APP_NAME?.trim() || "The Cultured Vault",
  tagline:
    process.env.NEXT_PUBLIC_APP_TAGLINE?.trim() ||
    "Culture worth discovering. Stories worth remembering.",
  defaultLocale: configuredLocale === "fi" ? "fi" : "en",
  brandBronze: safeColor(process.env.NEXT_PUBLIC_BRAND_BRONZE, "#b97b48"),
  brandSilver: safeColor(process.env.NEXT_PUBLIC_BRAND_SILVER, "#c7cbd0"),
  brandGold: safeColor(process.env.NEXT_PUBLIC_BRAND_GOLD, "#e2bd6f"),
};

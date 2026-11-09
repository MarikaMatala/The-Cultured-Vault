// KOMMENTOINTIOHJE / CODE MAP
// Tiedoston tarkoitus: Next.js-sovelluksen juurilayout: HTML-runko, metatiedot, fontit ja globaalit tyylit.
// Rakenne: tuonnit ja asetukset ensin, tietotyypit ja apufunktiot seuraavaksi, komponentti tai päätoiminnot lopuksi.

import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import { appConfig } from "@/lib/config";
import "./globals.css";

export const metadata: Metadata = {
  title: appConfig.appName,
  description: appConfig.tagline,
  applicationName: appConfig.appName,
};

const themeStyle = {
  "--bronze": appConfig.brandBronze,
  "--silver": appConfig.brandSilver,
  "--gold": appConfig.brandGold,
} as CSSProperties & {
  "--bronze": string;
  "--silver": string;
  "--gold": string;
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang={appConfig.defaultLocale}>
      <body style={themeStyle}>{children}</body>
    </html>
  );
}

// CODE MAP / COMMENTING GUIDE
// File purpose: Next.js-sovelluksen juurilayout: HTML-runko, metatiedot, fontit ja globaalit tyylit.
// Structure: imports and settings first, followed by data types and helper functions, with the component or main operations last.

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

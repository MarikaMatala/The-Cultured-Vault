// KOMMENTOINTIOHJE / CODE MAP
// Tiedoston tarkoitus: Next.js-sovelluksen rakennus- ja palvelinasetukset.
// Rakenne: tuonnit ja asetukset ensin; tämän jälkeen määritellään työkalun toiminta.

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;

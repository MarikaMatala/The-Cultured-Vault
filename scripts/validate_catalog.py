#!/usr/bin/env python3
"""Validate the starter catalogue without changing its source JSON."""

# CODE MAP / COMMENTING GUIDE
# File purpose: Katalogiaineiston rakenteen, pakollisten kenttien ja tietojen eheyden validointi.
# Structure: tarkistuksen asetukset ensin, validointifunktiot seuraavaksi ja suoritus lopuksi.

from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "src"))

from cultured_vault.catalogue import CatalogueValidationError, load_catalogue


# FUNCTION SECTION START: main.
def main() -> int:
    path = ROOT / "data" / "catalog-seed.json"
    try:
        entries = load_catalogue(path)
    except CatalogueValidationError as exc:
        print(f"Catalogue validation failed: {exc}", file=sys.stderr)
        return 1

    media_types = sorted({entry.media_type for entry in entries})
    countries = sorted({code for entry in entries for code in entry.country_codes})
    print(f"Validated {len(entries)} catalogue entries.")
    print(f"Media types ({len(media_types)}): {', '.join(media_types)}")
    print(f"Country codes ({len(countries)}): {', '.join(countries)}")
    print("No duplicate IDs or invalid database-facing values found.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

# FUNCTION SECTION END: main. The next section starts at the next definition or at the end of the file.
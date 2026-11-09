"""Validate and normalize the public starter catalogue.

The JSON file is an editorial source format. This module converts its
human-readable values into stable values compatible with the database enums
and ISO country codes, without modifying the source catalogue.
"""

# KOMMENTOINTIOHJE / CODE MAP
# Tiedoston tarkoitus: Python-kirjasto katalogin lataamiseen, muokkaamiseen ja tietueiden käsittelyyn.
# Rakenne: tuonnit ja tietorakenteet ensin, apufunktiot seuraavaksi, päätoiminnot lopuksi.

from __future__ import annotations

from dataclasses import dataclass
import json
from pathlib import Path
import re
from typing import Any


MEDIA_TYPES = frozenset({
    "film", "tv_series", "animated_series", "animation_film", "documentary",
    "podcast", "music_album", "music_track", "video_game", "book", "comic", "other",
})

COUNTRY_CODES = {
    "Denmark": "DK",
    "France": "FR",
    "Germany": "DE",
    "Japan": "JP",
    "Mexico": "MX",
    "New Zealand": "NZ",
    "Norway": "NO",
    "Poland": "PL",
    "South Korea": "KR",
    "Spain": "ES",
    "United Kingdom": "GB",
    "United States": "US",
}

_ID_PATTERN = re.compile(r"^[a-z0-9][a-z0-9-]{0,119}$")
_LANGUAGE_PATTERN = re.compile(r"^[a-z]{2,3}$")


class CatalogueValidationError(ValueError):
    """Raised when a catalogue record cannot be represented safely."""


@dataclass(frozen=True, slots=True)
# LUOKKA-OSIO PÄÄTTYY: CatalogueValidationError. Seuraava osio alkaa seuraavasta määrittelystä tai tiedoston lopusta.
class CatalogueEntry:
    id: str
    title: str
    media_type: str
    release_year: int | None
    country_codes: tuple[str, ...]
    language: str | None
    original_title: str | None
    creator: str | None
    genres: tuple[str, ...]
    tags: tuple[str, ...]

    def as_record(self) -> dict[str, Any]:
        """Return a JSON-serializable normalized record for an importer."""
        return {
            "id": self.id,
            "title": self.title,
            "mediaType": self.media_type,
            "releaseYear": self.release_year,
            "countryCodes": list(self.country_codes),
            "language": self.language,
            "originalTitle": self.original_title,
            "creator": self.creator,
            "genres": list(self.genres),
            "tags": list(self.tags),
        }


# FUNKTIO-OSIO ALKAA: _required_text.
# LUOKKA-OSIO PÄÄTTYY: CatalogueEntry. Seuraava osio alkaa seuraavasta määrittelystä tai tiedoston lopusta.
def _required_text(record: dict[str, Any], key: str, label: str, maximum: int) -> str:
    value = record.get(key)
    if not isinstance(value, str) or not value.strip():
        raise CatalogueValidationError(f"{label}: '{key}' must be a non-empty string.")
    value = value.strip()
    if len(value) > maximum:
        raise CatalogueValidationError(f"{label}: '{key}' exceeds {maximum} characters.")
    return value


# FUNKTIO-OSIO ALKAA: _optional_text.
# FUNKTIO-OSIO PÄÄTTYY: _required_text. Seuraava osio alkaa seuraavasta määrittelystä tai tiedoston lopusta.
def _optional_text(record: dict[str, Any], key: str, label: str) -> str | None:
    value = record.get(key)
    if value is None or value == "":
        return None
    if not isinstance(value, str):
        raise CatalogueValidationError(f"{label}: '{key}' must be a string when provided.")
    return value.strip() or None


# FUNKTIO-OSIO ALKAA: _string_list.
# FUNKTIO-OSIO PÄÄTTYY: _optional_text. Seuraava osio alkaa seuraavasta määrittelystä tai tiedoston lopusta.
def _string_list(record: dict[str, Any], key: str, label: str) -> tuple[str, ...]:
    value = record.get(key, [])
    if value is None:
        return ()
    if not isinstance(value, list):
        raise CatalogueValidationError(f"{label}: '{key}' must be a list of strings.")
    cleaned = []
    for item in value:
        if not isinstance(item, str) or not item.strip():
            raise CatalogueValidationError(f"{label}: '{key}' contains an empty or non-string item.")
        cleaned.append(item.strip())
    return tuple(dict.fromkeys(cleaned))


# FUNKTIO-OSIO ALKAA: _country_codes.
# FUNKTIO-OSIO PÄÄTTYY: _string_list. Seuraava osio alkaa seuraavasta määrittelystä tai tiedoston lopusta.
def _country_codes(value: Any, label: str) -> tuple[str, ...]:
    if value is None or value == "":
        return ()
    names = value if isinstance(value, list) else str(value).split(";")
    if not all(isinstance(name, str) for name in names):
        raise CatalogueValidationError(f"{label}: 'country' must contain country names.")
    codes = []
    for raw_name in names:
        name = raw_name.strip()
        if not name:
            continue
        code = COUNTRY_CODES.get(name)
        if code is None:
            raise CatalogueValidationError(
                f"{label}: country '{name}' has no configured ISO 3166-1 alpha-2 mapping."
            )
        codes.append(code)
    return tuple(dict.fromkeys(codes))


# FUNKTIO-OSIO ALKAA: parse_entry.
# FUNKTIO-OSIO PÄÄTTYY: _country_codes. Seuraava osio alkaa seuraavasta määrittelystä tai tiedoston lopusta.
def parse_entry(record: Any, index: int = 0) -> CatalogueEntry:
    """Validate one raw JSON record and normalize database-facing values."""
    label = f"Entry {index + 1}"
    if not isinstance(record, dict):
        raise CatalogueValidationError(f"{label}: expected a JSON object.")

    entry_id = _required_text(record, "id", label, 120)
    if not _ID_PATTERN.fullmatch(entry_id):
        raise CatalogueValidationError(f"{label}: id must use lowercase letters, digits and hyphens.")

    title = _required_text(record, "title", label, 300)
    raw_type = _required_text(record, "mediaType", label, 40).replace("-", "_")
    if raw_type not in MEDIA_TYPES:
        raise CatalogueValidationError(f"{label}: unsupported media type '{raw_type}'.")

    year = record.get("releaseYear")
    if year is not None:
        if isinstance(year, bool) or not isinstance(year, int) or not 1800 <= year <= 2200:
            raise CatalogueValidationError(f"{label}: releaseYear must be an integer from 1800 to 2200.")

    language = _optional_text(record, "language", label)
    if language and not _LANGUAGE_PATTERN.fullmatch(language):
        raise CatalogueValidationError(f"{label}: language must be a 2- or 3-letter ISO language code.")

    creator = _optional_text(record, "creator", label)
    if creator is None:
        creator = _optional_text(record, "artist", label) or _optional_text(record, "author", label)

    return CatalogueEntry(
        id=entry_id,
        title=title,
        media_type=raw_type,
        release_year=year,
        country_codes=_country_codes(record.get("country"), label),
        language=language,
        original_title=_optional_text(record, "originalTitle", label),
        creator=creator,
        genres=_string_list(record, "genres", label),
        tags=_string_list(record, "tags", label),
    )


# FUNKTIO-OSIO ALKAA: load_catalogue.
# FUNKTIO-OSIO PÄÄTTYY: parse_entry. Seuraava osio alkaa seuraavasta määrittelystä tai tiedoston lopusta.
def load_catalogue(path: Path) -> list[CatalogueEntry]:
    """Load the JSON catalogue, validating every record and unique ID."""
    try:
        payload = json.loads(Path(path).read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        raise CatalogueValidationError(f"Could not read catalogue JSON: {type(exc).__name__}.") from exc

    if not isinstance(payload, list):
        raise CatalogueValidationError("Catalogue root must be a JSON array.")

    entries = []
    seen_ids = set()
    for index, record in enumerate(payload):
        entry = parse_entry(record, index)
        if entry.id in seen_ids:
            raise CatalogueValidationError(f"Entry {index + 1}: duplicate id '{entry.id}'.")
        seen_ids.add(entry.id)
        entries.append(entry)
    return entries

# FUNKTIO-OSIO PÄÄTTYY: load_catalogue. Seuraava osio alkaa seuraavasta määrittelystä tai tiedoston lopusta.
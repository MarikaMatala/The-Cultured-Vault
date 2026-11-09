# KOMMENTOINTIOHJE / CODE MAP
# Tiedoston tarkoitus: Python-testit katalogin tietojen lukemiselle, validoinnille ja käsittelylle.
# Rakenne: testidata ja valmistelut ensin, testitapaukset seuraavaksi. Jokainen testi tarkistaa yhden rajatun asian.

import json
from pathlib import Path
import tempfile
import unittest

from cultured_vault.catalogue import (
    CatalogueValidationError,
    load_catalogue,
    parse_entry,
)


class CatalogueValidationTests(unittest.TestCase):
    # TESTIOSIO ALKAA: test_normalizes_media_types_and_multiple_countries.
    def test_normalizes_media_types_and_multiple_countries(self):
        entry = parse_entry({
            "id": "film-example-2020",
            "title": "Example",
            "mediaType": "animation-film",
            "releaseYear": 2020,
            "country": "Japan; United States",
            "language": "ja",
            "genres": ["Fantasy", "Fantasy"],
            "tags": ["Classic"],
        })

        self.assertEqual(entry.media_type, "animation_film")
        self.assertEqual(entry.country_codes, ("JP", "US"))
        self.assertEqual(entry.genres, ("Fantasy",))
        self.assertEqual(entry.as_record()["countryCodes"], ["JP", "US"])

    # TESTIOSIO PÄÄTTYY: test_normalizes_media_types_and_multiple_countries. Seuraava testi alkaa seuraavasta testifunktiosta.
    # TESTIOSIO ALKAA: test_maps_creator_fields_without_losing_source_values.
    def test_maps_creator_fields_without_losing_source_values(self):
        artist = parse_entry({
            "id": "album-example",
            "title": "Example Album",
            "mediaType": "music-album",
            "artist": "Example Artist",
        })
        author = parse_entry({
            "id": "book-example",
            "title": "Example Book",
            "mediaType": "book",
            "author": "Example Author",
        })

        self.assertEqual(artist.creator, "Example Artist")
        self.assertEqual(author.creator, "Example Author")

    # TESTIOSIO PÄÄTTYY: test_maps_creator_fields_without_losing_source_values. Seuraava testi alkaa seuraavasta testifunktiosta.
    # TESTIOSIO ALKAA: test_rejects_unknown_media_type.
    def test_rejects_unknown_media_type(self):
        with self.assertRaisesRegex(CatalogueValidationError, "unsupported media type"):
            parse_entry({"id": "example", "title": "Example", "mediaType": "unknown"})

    # TESTIOSIO PÄÄTTYY: test_rejects_unknown_media_type. Seuraava testi alkaa seuraavasta testifunktiosta.
    # TESTIOSIO ALKAA: test_rejects_unknown_country_instead_of_guessing.
    def test_rejects_unknown_country_instead_of_guessing(self):
        with self.assertRaisesRegex(CatalogueValidationError, "no configured ISO"):
            parse_entry({
                "id": "example",
                "title": "Example",
                "mediaType": "film",
                "country": "Atlantis",
            })

    # TESTIOSIO PÄÄTTYY: test_rejects_unknown_country_instead_of_guessing. Seuraava testi alkaa seuraavasta testifunktiosta.
    # TESTIOSIO ALKAA: test_rejects_invalid_release_year_and_language.
    def test_rejects_invalid_release_year_and_language(self):
        base = {"id": "example", "title": "Example", "mediaType": "film"}
        with self.assertRaisesRegex(CatalogueValidationError, "releaseYear"):
            parse_entry({**base, "releaseYear": True})
        with self.assertRaisesRegex(CatalogueValidationError, "language"):
            parse_entry({**base, "language": "English"})

    # TESTIOSIO PÄÄTTYY: test_rejects_invalid_release_year_and_language. Seuraava testi alkaa seuraavasta testifunktiosta.
    # TESTIOSIO ALKAA: test_rejects_duplicate_ids_in_catalogue_file.
    def test_rejects_duplicate_ids_in_catalogue_file(self):
        payload = [
            {"id": "same-id", "title": "One", "mediaType": "film"},
            {"id": "same-id", "title": "Two", "mediaType": "film"},
        ]
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "catalogue.json"
            path.write_text(json.dumps(payload), encoding="utf-8")
            with self.assertRaisesRegex(CatalogueValidationError, "duplicate id"):
                load_catalogue(path)

    # TESTIOSIO PÄÄTTYY: test_rejects_duplicate_ids_in_catalogue_file. Seuraava testi alkaa seuraavasta testifunktiosta.
    # TESTIOSIO ALKAA: test_rejects_non_list_genres_and_tags.
    def test_rejects_non_list_genres_and_tags(self):
        with self.assertRaisesRegex(CatalogueValidationError, "genres"):
            parse_entry({
                "id": "example",
                "title": "Example",
                "mediaType": "film",
                "genres": "not-a-list",
            })


if __name__ == "__main__":
    unittest.main()

    # TESTIOSIO PÄÄTTYY: test_rejects_non_list_genres_and_tags. Seuraava testi alkaa seuraavasta testifunktiosta.
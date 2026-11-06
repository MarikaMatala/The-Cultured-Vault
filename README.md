# The Cultured Vault

**Culture worth discovering. Stories worth remembering.**

The Cultured Vault is an open-source concept for a personal cultural archive with community features. It brings films, television, animation, documentaries, podcasts, music, video games, books and comics into one catalogue. Members should be able to keep a personal library, track what they want to experience, record ratings and reviews, create lists, and discover works through curated collections.

The project is designed around one important distinction: the maintainer's editorial perspective, each member's personal opinions and community-wide aggregates must remain separate. A missing rating is not a zero, and community averages must never overwrite an individual's own rating.

> **Current status:** the repository contains the project specification, a 93-entry starter catalogue, a Supabase/PostgreSQL schema foundation and security-oriented migrations. It is not yet a deployed application. Authentication, catalogue APIs, frontend screens and production hosting remain future work. No live user data or hosted database is included.

## Project goals

- Build a cross-media catalogue rather than a film-only tracker.
- Support Finnish and English interfaces.
- Separate personal libraries, owner editorial content and community contributions.
- Provide search, filters, curated collections, ratings, reviews and statistics.
- Keep private profile and library data protected by database row-level security.
- Make moderation, accessibility, privacy and independent self-hosting part of the architecture.

## Repository contents

| Path | Purpose |
| --- | --- |
| `data/catalog-seed.json` | Editorial starter catalogue with 93 example works |
| `src/cultured_vault/catalogue.py` | Catalogue validation and normalization utilities |
| `scripts/validate_catalog.py` | Command-line validation for the starter catalogue |
| `supabase/migrations/` | Versioned PostgreSQL schema, RLS and moderation safeguards |
| `supabase/config.toml` | Local Supabase CLI configuration |
| `supabase/tests/SECURITY_TEST_CHECKLIST.md` | Manual security and authorization test plan |
| `docs/PROJECT_VISION.md` | Product vision and experience principles |
| `docs/DATA_MODEL.md` | Proposed relational data model |
| `docs/BACKEND_PLAN.md` | Backend implementation plan |
| `docs/ROADMAP.md` | Planned development stages |

## Catalogue validation

The source JSON uses readable editorial values such as `tv-series`, `animation-film` and country names. The database uses stable enum values and ISO 3166-1 alpha-2 country codes. The validator checks and normalizes these values without modifying the original catalogue.

Requirements: Python 3.11 or later. The validator uses only the Python standard library.

```bash
python scripts/validate_catalog.py
PYTHONPATH=src python -m unittest discover -s tests -v
```

The validator checks:
- Unique, well-formed record IDs and required titles.
- Media types supported by the database enum.
- Release years and language codes.
- Country-name to ISO country-code mappings, including multi-country productions.
- Genre and tag data types.
- Creator metadata from artist or author fields.

Unknown values fail validation rather than being silently guessed.

## Backend architecture

The database foundation uses Supabase PostgreSQL and Supabase Auth. SQL migrations define catalogue entities, personal libraries, ratings, reviews, comments, lists and row-level security policies. Additional migrations restrict member edits to pending submissions, create profiles on sign-up and validate comment targets and reply threads.

The migrations are source-controlled, but they have **not** been applied to a hosted production database. Review them and run the local security checklist against a disposable Supabase environment before using real data.

### Local database workflow

Install Docker and the Supabase CLI, then run:

```bash
supabase start
supabase db reset
supabase status
```

The reset command recreates the local database and applies migrations from scratch. Use disposable development data only.

## Security and privacy

- Never commit `.env` files, database passwords, API tokens or Supabase service-role keys.
- A service-role key bypasses row-level security and must never be included in browser code.
- Treat reviews, comments and other user-generated content as untrusted input.
- Keep each self-hosted instance's users, database, credentials and content separate.
- Do not present the manual security checklist as evidence of a completed security audit.
- See [SECURITY.md](SECURITY.md) for vulnerability reporting and the planned security baseline.

## Documentation

- [Project vision](docs/PROJECT_VISION.md)
- [Roadmap](docs/ROADMAP.md)
- [Data model](docs/DATA_MODEL.md)
- [Backend implementation plan](docs/BACKEND_PLAN.md)
- [Supabase setup and migrations](supabase/README.md)
- [Security test checklist](supabase/tests/SECURITY_TEST_CHECKLIST.md)
- [Catalogue guidelines](CATALOGUE_GUIDELINES.md)
- [Contributing guide](CONTRIBUTING.md)
- [Security policy](SECURITY.md)
- [Finnish README](README.fi.md)

## Contributing

Bug reports, focused feature proposals, documentation, translations, accessibility reviews and code contributions are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening an issue or pull request.

## License and branding

The source code and materials covered by the [MIT License](LICENSE) may be used, modified and redistributed under its terms. The project name **The Cultured Vault**, its logo and separately identified branding assets are not granted as trademarks by the software license.

---

<p align="center"><strong>The Cultured Vault</strong><br><em>Open the vault. Discover something extraordinary.</em></p>

# The Cultured Vault

**Culture worth discovering. Stories worth remembering.**

The Cultured Vault is an open-source foundation for a personal cultural archive with community features. It brings films, television, animation, documentaries, podcasts, music, video games, books and comics into one catalogue. The long-term direction includes personal libraries, statuses, ratings, reviews, lists and curated discovery.

The project keeps three perspectives separate: the instance owner's editorial content, each member's personal opinions and community-wide aggregates. A missing rating is not a zero, and a community average must never overwrite an individual's own rating.

> **Current status:** the first runnable frontend scaffold is now in the repository. It provides a responsive Finnish/English catalogue demo backed by the 93-entry `data/catalog-seed.json` file. The application is read-only: authentication, personal libraries, ratings, reviews, catalogue APIs and production hosting are not connected. The existing Supabase migrations are source-controlled but have not been applied to a hosted production database.

## Project goals

- Build a cross-media catalogue rather than a film-only tracker.
- Support Finnish and English interfaces.
- Keep each fork or self-hosted instance independent.
- Separate public catalogue metadata, owner editorial content and private member contributions.
- Provide search, filters, curated collections, ratings, reviews and statistics over time.
- Protect private profile and library data with database row-level security.
- Make accessibility, moderation and privacy part of the architecture.

## Run the application locally

### Requirements

- Node.js 20.19 or newer (Node.js 26 LTS is recommended).
- npm, included with Node.js.
- Python 3.11 or newer only for the existing Python catalogue validator and Python unit tests.

### Quick start

```bash
git clone https://github.com/MarikaMatala/The-Cultured-Vault.git
cd The-Cultured-Vault
cp .env.example .env.local
npm install
npm run dev
```

On Windows PowerShell, use `Copy-Item .env.example .env.local` instead of `cp`.

Open http://localhost:3000. The app has safe built-in defaults, so creating `.env.local` is optional. See [Application setup](docs/APP_SETUP.md) for instance branding, language and colour settings.

### Development and verification commands

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm test
npm run check
npm run validate:catalogue
PYTHONPATH=src python -m unittest discover -s tests -v
```

- `npm run check` runs formatting checks, ESLint, TypeScript type checking and Node.js catalogue tests.
- `npm run build` creates the production build.
- `npm run validate:catalogue` runs the Python validator for the starter JSON.
- The final command runs the existing Python unit tests.

## What the scaffold includes

| Path | Purpose |
| --- | --- |
| `app/` | Next.js App Router, root layout and global design system |
| `components/vault-app.tsx` | Responsive catalogue interface and Finnish/English switcher |
| `lib/catalogue.ts` | Read-only catalogue source interface and JSON adapter |
| `lib/config.ts` | Public instance branding and initial-language configuration |
| `lib/i18n.ts` | Finnish and English interface dictionaries |
| `data/catalog-seed.json` | Public editorial starter catalogue (93 sample works) |
| `tests/catalogue.test.mjs` | Node.js tests for starter catalogue integrity |
| `src/cultured_vault/` | Python catalogue validation and normalization utilities |
| `supabase/migrations/` | PostgreSQL schema and row-level security foundations |
| `docs/APP_SETUP.md` | Application setup and configuration reference |
| `docs/PROJECT_VISION.md` | Product vision and experience principles |
| `docs/DATA_MODEL.md` | Proposed relational data model |
| `docs/BACKEND_PLAN.md` | Backend implementation plan |
| `docs/ROADMAP.md` | Planned development stages |

## Configure your own instance

Copy `.env.example` to `.env.local` and change the public presentation values:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_APP_NAME` | Instance name |
| `NEXT_PUBLIC_APP_TAGLINE` | Instance tagline |
| `NEXT_PUBLIC_DEFAULT_LOCALE` | Initial language: `en` or `fi` |
| `NEXT_PUBLIC_BRAND_BRONZE` | Bronze accent colour, six-digit hex |
| `NEXT_PUBLIC_BRAND_SILVER` | Silver accent colour, six-digit hex |
| `NEXT_PUBLIC_BRAND_GOLD` | Gold accent colour, six-digit hex |

These variables are public and become part of the browser bundle. Do not put secrets in them. Database, authentication and external metadata integrations are not wired to the app yet, so no service credentials are needed. When those integrations are implemented, each operator must configure their own server-side credentials; privileged keys must never be exposed to the browser.

## Catalogue and application boundaries

The current interface reads the public starter JSON through the `CatalogueSource` interface. Search, sorting and category filters operate in the browser against that local dataset. No catalogue changes are persisted, and the app does not collect personal data.

The data model and Supabase migrations are foundations for future work, not proof of a live backend. Review and test the migrations and row-level security policies in a disposable local Supabase environment before implementing database access or handling real user content.

## Forks and independent deployments

You are welcome to fork this repository and adapt it under the terms of the MIT License. Each fork or deployment should have its own:

- Application name, branding, language defaults and catalogue.
- Database and authentication project.
- API credentials and metadata-provider accounts.
- User accounts, ratings, reviews and private library data.
- Hosting environment, domain, backups and operational monitoring.

Never depend on the original maintainer's personal accounts, database, credentials or private content. Never commit `.env.local`, database passwords, API tokens, private ratings or user data.

## Accessibility and design

The initial interface uses a dark charcoal archive theme with bronze, silver and gold accents. It includes semantic page landmarks, keyboard-operable controls, visible focus states, responsive layouts and reduced-motion support. This is an initial baseline, not a completed accessibility audit.

## Security and privacy

- Never commit `.env` files, database passwords, API tokens or service-role keys.
- A Supabase service-role key bypasses row-level security and must remain server-side.
- Treat reviews, comments and other user-generated content as untrusted input.
- Keep each self-hosted instance's users, database, credentials and content separate.
- Do not treat the manual security checklist as evidence of a completed security audit.
- See [SECURITY.md](SECURITY.md) for vulnerability reporting and the security baseline.

## Documentation

- [Application setup](docs/APP_SETUP.md)
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

The source code and materials covered by the [MIT License](LICENSE) may be used, modified and redistributed under its terms. The project name **The Cultured Vault**, its logo and separately identified branding assets are not granted as trademarks by the software license. A fork should not imply that it is the original project or endorsed by the original maintainer.

---

<p align="center"><strong>The Cultured Vault</strong><br><em>Open the vault. Discover something extraordinary.</em></p>

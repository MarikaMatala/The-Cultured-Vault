# Application setup

The repository now includes a runnable Next.js application scaffold. The current experience is deliberately read-only and uses the public JSON catalogue. No account, database or metadata-provider connection is required to start it.

## Requirements

- Node.js 20.19 or newer (required by the current ESLint 10 toolchain). Node.js 26 LTS is recommended.
- npm (included with Node.js).
- Python 3.11 or newer only if you also want to run the existing Python catalogue validator and unit tests.

## Run locally

From the repository root:

```bash
cp .env.example .env.local
npm install
npm run dev
```

On Windows PowerShell, copy the environment example with:

```powershell
Copy-Item .env.example .env.local
```

Open http://localhost:3000. The app uses built-in defaults if `.env.local` is absent. Restart the development server after changing environment values.

## Instance configuration

Only public presentation settings are read by this scaffold:

| Variable                     | Purpose                                       | Default                                               |
| ---------------------------- | --------------------------------------------- | ----------------------------------------------------- |
| `NEXT_PUBLIC_APP_NAME`       | Name shown in the header, footer and metadata | The Cultured Vault                                    |
| `NEXT_PUBLIC_APP_TAGLINE`    | Short instance tagline                        | Culture worth discovering. Stories worth remembering. |
| `NEXT_PUBLIC_DEFAULT_LOCALE` | Initial interface language: `en` or `fi`      | `en`                                                  |
| `NEXT_PUBLIC_BRAND_BRONZE`   | Bronze accent as a six-digit hex colour       | `#b97b48`                                             |
| `NEXT_PUBLIC_BRAND_SILVER`   | Silver accent as a six-digit hex colour       | `#c7cbd0`                                             |
| `NEXT_PUBLIC_BRAND_GOLD`     | Gold accent as a six-digit hex colour         | `#e2bd6f`                                             |

These are public values and are compiled into the browser bundle. Never put credentials, private profile data or API keys in a `NEXT_PUBLIC_*` variable. The language switcher currently supports Finnish and English; the environment variable chooses the initial language.

## Catalogue source

The app reads `data/catalog-seed.json` through the `CatalogueSource` interface in `lib/catalogue.ts`. The current `SeedCatalogueSource` adapter is read-only. A fork can replace the JSON file with its own public starter collection.

The interface is an intentional integration boundary: a future database adapter should be server-only, implement the same read contract, and use only the self-hosted instance's own database. Do not put privileged keys in client components or browser bundles.

## Available commands

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm test
npm run check
npm run validate:catalogue
```

The existing Python unit tests can be run separately:

```bash
PYTHONPATH=src python -m unittest discover -s tests -v
```

`npm run check` runs Prettier checks, ESLint, TypeScript type checking and the Node.js catalogue tests. `npm run build` verifies the production build.

## Backend status

The repository contains Supabase configuration and SQL migrations, but this frontend does not connect to them. No Supabase URL, anonymous key, service-role key, metadata API key or other service credential is required or read. The migrations have not been applied to a hosted production database. Validate the existing migrations and row-level security policies in a disposable local Supabase environment before implementing a database adapter or using real user data.

Each fork or deployment must create and manage its own database, authentication project, API credentials, user accounts, private data and hosting. Do not reuse credentials or private content from the original maintainer.

## Deployment

No hosting provider or production deployment is configured by this scaffold. Deploy only after selecting an environment, reviewing the security model, configuring that instance's server-side secrets and testing its database policies.

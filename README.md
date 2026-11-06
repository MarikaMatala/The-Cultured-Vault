# The Cultured Vault

<!-- Last updated: 2026-11-06 20:27 (Europe/Helsinki). -->

<p align="center"><strong>Culture worth discovering. Stories worth remembering.</strong></p>
<p align="center">An open-source personal archive and community for everything worth watching, listening to, reading, playing and experiencing.</p>

<p align="center">
  <a href="README.fi.md">Suomeksi</a> ·
  <a href="docs/PROJECT_VISION.md">Project vision</a> ·
  <a href="docs/ROADMAP.md">Roadmap</a> ·
  <a href="CONTRIBUTING.md">Contributing</a>
</p>

---

**The Cultured Vault** is an open-source project for building a personal cultural archive with optional community features. It brings films, television, animation, documentaries, podcasts, music, games, books and other creative works into one searchable place.

Use it to keep track of what you experience, remember what mattered to you, discover works you might otherwise miss, and exchange thoughtful recommendations.

> Culture is more than entertainment. It is memories, emotions, stories and experiences worth keeping.
>
> **Open the vault. Discover something extraordinary.**

## Public project — make it your own

This repository is public and intended for reuse. You can explore the source, fork the project, customize the design, adapt the catalogue, translate the interface and build your own hosted instance under the terms of the MIT License.

The Cultured Vault is not intended to be a single personal account shared by everyone. Each deployment should have its own configuration, database, users and content. You can run your own independent instance and make it your own.

See [LICENSE](LICENSE) for permissions and conditions. The project name, logo and other branding are not automatically granted as a trademark or endorsement by the software licence.

## Browser demo | Portfolio preview

A separate, installable browser-based PWA demo is available in the maintainer's portfolio repository: [Open The-Cultured-Vault-demo v1.0](https://marikamatala.github.io/The-Cultured-Vault-demo/). It currently presents a curated sample catalogue of 500 works and demonstrates browsing, filtering, the “Not rated yet” owner-rating state, separately labelled IMDb reference ratings and local-only visitor suggestions.

The PWA is a front-end concept preview, not the application implementation described in this repository. Suggestions remain in the visitor's browser; there are no user accounts, shared reviews, cloud synchronisation or production backend in the demo. The core project repository still contains planning documents and seed data only.

## Project status

🚧 **Early development — planning and foundations**

This repository currently contains the project concept, documentation, initial roadmap and a small sample catalogue. The application itself is not yet implemented. Features and technologies described as planned are goals, not working functionality.

## What the project aims to include

- **One cultural catalogue:** films, TV series, animation, documentaries, podcasts, music and albums, video games, books, comics and more.
- **Personal ratings and reviews:** give each work a numerical score and write your own review.
- **Instance owner's perspective first:** each deployment can feature its own owner's rating and review before community ratings and reviews.
- **Community participation:** registered members can rate, review and comment on works.
- **Separate rating contexts:** distinguish the instance owner's rating, each member's rating and the community average.
- **Personal library:** track what you have watched, listened to, read or played, what you are currently experiencing and what you want to experience later.
- **Discovery:** browse by category, genre, release year, creator, country, language and curated collections.
- **Lists and favourites:** create themed lists and save favourite works.
- **Personal statistics:** explore your history, ratings, habits and collection.
- **Accessible, responsive interface:** support mobile, tablet and desktop.
- **Finnish and English:** a bilingual interface is a planned goal.

## Planned categories

| Category | Examples |
| --- | --- |
| Film | Feature films, short films, classics, cult films |
| Television | TV series, miniseries, individual seasons |
| Animation | Animated films, anime, cartoons and animated series |
| Documentary | Documentary films and series |
| Podcasts | Podcast series and individual episodes |
| Music | Albums, EPs and potentially individual releases |
| Games | Video games and interactive experiences |
| Books | Novels, non-fiction, comics and graphic novels |
| Other | Theatre, performances and other cultural experiences |

## Ratings and community

The application is intended to distinguish three perspectives:

1. **Instance owner's rating** — the personal rating and review of the person running that instance, featured prominently.
2. **Community average** — an aggregate of eligible member ratings.
3. **Individual member reviews** — each member's own rating, review and comments.

A community score must never overwrite or visually replace the owner's personal score. Each independently hosted instance can have a different owner and community.

## Initial catalogue

A small hand-curated starter dataset is available in [data/catalog-seed.json](data/catalog-seed.json). It is a discovery seed, not a definitive list of works everyone must experience. Metadata should be verified before importing entries into a live catalogue. Forks and deployments are welcome to replace or extend this dataset.

## Technology direction

The implementation stack has not yet been locked in. A possible direction is:

| Area | Candidate |
| --- | --- |
| Application | Next.js + React |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL |
| Authentication and backend services | Supabase |
| Film and TV metadata | TMDB API |
| Music metadata | MusicBrainz |
| Icons | Lucide |

These are candidates, not dependencies currently installed in this repository. Final choices will be made before the application scaffold is generated. Each deployment will need its own service accounts and environment configuration.

## Documentation

- [Project vision](docs/PROJECT_VISION.md)
- [Roadmap](docs/ROADMAP.md)
- [Data model proposal](docs/DATA_MODEL.md)
- [Catalogue guidelines](CATALOGUE_GUIDELINES.md)
- [Security policy](SECURITY.md)
- [Contributing guide](CONTRIBUTING.md)
- [Starter catalogue](data/catalog-seed.json)
- [Finnish README](README.fi.md)

## Development principles

- Make the project reusable and configurable for independent deployments.
- Keep instance data separate: each operator manages their own users, database and content.
- Never commit secrets, API keys, database credentials or service-role keys.
- Treat user-generated reviews and comments as untrusted input.
- Design for accessibility from the beginning.
- Keep instance-owner content distinct from community-generated content.
- Credit external metadata providers and follow their API terms.
- Keep the project modular so new media types can be added without redesigning the whole data model.

## Getting started

There is no runnable application yet. At this stage, explore the documentation and sample data.

When the application scaffold is added, this section will include verified instructions for forking, installation, environment configuration, database setup, development, testing and deployment. Commands will not be documented until they match the actual project setup.

## Contributing

Ideas, bug reports, translations, accessibility improvements and code contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening an issue or pull request.

## License and branding

The source code and other materials covered by the repository's [MIT License](LICENSE) may be used, modified and redistributed under its terms.

The project name **The Cultured Vault**, its logo and any separately identified branding assets are not granted as trademarks by the MIT License. Do not imply that your fork or deployment is the official project or endorsed by the original maintainer.

---

<p align="center"><strong>The Cultured Vault</strong><br><em>Open the vault. Discover something extraordinary.</em></p>

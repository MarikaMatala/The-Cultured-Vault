# The Cultured Vault

<p align="center"><strong>Culture worth discovering. Stories worth remembering.</strong></p>
<p align="center">A personal archive and community for everything worth watching, listening to, reading, playing and experiencing.</p>

---

The Cultured Vault is a planned community-oriented catalogue for culture and entertainment. It brings films, television, animation, documentaries, podcasts, music, games, books and other creative works into one searchable place.

Keep track of what you experience, remember what mattered to you, discover works you might otherwise miss, and exchange thoughtful recommendations.

> Culture is more than entertainment. It is memories, emotions, stories and experiences worth keeping.
>
> **Open the vault. Discover something extraordinary.**

## Project status

🚧 **Early development — planning and foundations**

This repository currently contains the project concept, documentation, initial roadmap and a small sample catalogue. The application itself is not yet implemented. Features and technologies described as planned are goals, not working functionality.

## What the project aims to include

- **One cultural catalogue:** films, TV series, animation, documentaries, podcasts, music and albums, video games, books, comics and more.
- **Personal ratings and reviews:** give each work a numerical score and write your own review.
- **Owner's perspective first:** the owner's rating and review should be clearly featured before community ratings and reviews.
- **Community participation:** registered members can rate, review and comment on works.
- **Separate rating contexts:** distinguish the owner's rating, each member's rating and the community average.
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

## Personal ratings and community ratings

The application is intended to make different perspectives easy to distinguish:

1. **Owner's rating** — the project owner's own rating and review, prominently displayed.
2. **Community average** — an aggregate of eligible member ratings.
3. **Individual member reviews** — each member's own rating, review and comments.

A community score must never overwrite or visually replace the owner's personal score. Rating scale, moderation rules and aggregation details will be defined before implementation.

## Initial catalogue

A small hand-curated starter dataset is available in [data/catalog-seed.json](data/catalog-seed.json). It is a discovery seed, not a definitive list of works everyone must experience. Metadata should be verified before importing entries into a live catalogue.

Potential curated collections:
- Widely acclaimed and influential works
- Film and television classics
- Animation essentials
- Landmark albums
- Important documentaries
- Podcasts worth exploring
- Finnish and Nordic culture
- Cult favourites and overlooked gems

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

These are candidates, not dependencies currently installed in this repository. Final choices will be made before the application scaffold is generated.

## Documentation

- [Project vision](docs/PROJECT_VISION.md)
- [Roadmap](docs/ROADMAP.md)
- [Data model proposal](docs/DATA_MODEL.md)
- [Contributing guide](CONTRIBUTING.md)
- [Starter catalogue](data/catalog-seed.json)

## Development principles

- Keep personal data private and collect only what the application needs.
- Never expose API keys, database credentials or service-role keys in client-side code or Git.
- Treat user-generated reviews and comments as untrusted input.
- Design for accessibility from the beginning.
- Keep the owner's personal content distinct from community-generated content.
- Credit external metadata providers and follow their API terms.
- Keep the project modular so new media types can be added without redesigning the whole data model.

## Getting started

There is no runnable application yet. At this stage, explore the project documentation and sample data.

When the application scaffold is added, this section will include verified installation, environment configuration, development, testing and build instructions. Commands will not be documented until they match the actual project setup.

## Contributing and feedback

Ideas, bug reports and thoughtful suggestions are welcome as the project develops. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening an issue or pull request.

## Ownership and licensing

This repository is maintained by **Marika Matalamäki**.

No open-source licence has been selected yet. Until a licence is added, do not assume that the source code, branding, graphics, written content or other project materials are licensed for reuse. See GitHub's explanation of [repository licensing](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository).

---

<p align="center"><strong>The Cultured Vault</strong><br><em>Open the vault. Discover something extraordinary.</em></p>

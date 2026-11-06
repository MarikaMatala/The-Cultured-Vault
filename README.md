## Documentation
- [Backend implementation plan](docs/BACKEND_PLAN.md)
- [Local Supabase setup and migration workflow](supabase/README.md)
- [Backend security test checklist](supabase/tests/SECURITY_TEST_CHECKLIST.md)

- [Project vision](docs/PROJECT_VISION.md)
- [Roadmap](docs/ROADMAP.md)
- [Data model proposal](docs/DATA_MODEL.md)
- [Catalogue guidelines](CATALOGUE_GUIDELINES.md)
- [Security policy](SECURITY.md)
- [Contributing guide](CONTRIBUTING.md)
- [Starter catalogue](data/catalog-seed.json)
- [Finnish README](README.fi.md)

## Starter catalogue

The starter catalogue includes a broader selection of Studio Ghibli and Disney animation, 1990s and 2000s nostalgia films, supernatural and cult television, and internationally popular Netflix series. Editorial tags such as `nostalgia-90s`, `nostalgia-2000s`, `studio-ghibli`, `disney`, `netflix-original` and `streaming-hit` support discovery; they are curated descriptors, not live streaming availability or a continuously updated popularity ranking.

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

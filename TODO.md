# The Cultured Vault — Development TODO

Internal development checklist; not displayed in the application UI.

## High priority
- [ ] Run formatting, lint, typecheck, Node tests, Python tests, catalogue validation and production build.
- [ ] Verify setup instructions on a clean clone.
- [ ] Confirm documented catalogue size matches current seed data.
- [ ] Review Finnish and English UI coverage, including errors, empty states, filters and accessibility labels.
- [ ] Do not describe authentication, personal libraries, ratings or reviews as implemented until they are connected and tested.

## Catalogue and product behaviour
- [ ] Review metadata fields, source attribution, duplicate detection and validation rules.
- [ ] Clarify missing, unknown, not applicable and not-yet-reviewed values.
- [ ] Test search, filters, sorting and categories across media types.
- [ ] Review sample entries for accuracy and permitted use of metadata and images.
- [ ] Keep owner editorial content, individual opinions and community aggregates separate.

## Architecture and data protection
- [ ] Review Supabase migrations and row-level security before hosted deployment.
- [ ] Document which migration steps have been tested and which remain proposals.
- [ ] Define authentication, account deletion, export and privacy requirements before member data is implemented.
- [ ] Ensure secrets are never exposed to browser code.
- [ ] Add authorization and data-isolation tests before enabling personal libraries.

## Accessibility and maintenance
- [ ] Test keyboard navigation, focus, contrast, screen-reader labels and reduced motion.
- [ ] Check responsive behaviour and long translated labels.
- [ ] Add tests for malformed catalogue records and unusual metadata.
- [ ] Keep README, vision, roadmap, backend plan and data model consistent with implementation.
- [ ] Review dependencies and supported Node.js/Python versions.
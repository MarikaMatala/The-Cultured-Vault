# Roadmap

This roadmap is a living plan. Items are not complete unless they are implemented, tested and documented.

## Phase 0 — Project foundations

- [x] Create the GitHub repository.
- [x] Write the initial project README.
- [x] Document the product vision.
- [x] Draft the initial roadmap.
- [x] Draft the data model.
- [x] Add a small sample catalogue dataset.
- [x] Decide the project licence and ownership notices.
- [x] Confirm the technology stack.
- [x] Define the first-release scope.

## Phase 1 — Application foundation

- [x] Create the application scaffold.
- [x] Configure TypeScript and code formatting.
- [x] Add linting and automated checks.
- [x] Establish the dark visual theme and design tokens.
- [x] Build responsive navigation and page layouts.
- [x] Add Finnish/English language infrastructure.
- [x] Render a read-only catalogue demo from `data/catalog-seed.json`.
- [ ] Add accessible form, dialog and notification components.
- [ ] Add end-to-end tests for core browsing journeys.

## Phase 2 — Catalogue

- [ ] Define the final media-type taxonomy.
- [ ] Implement catalogue database tables and migrations.
- [ ] Add catalogue item create, read, update and delete flows.
- [ ] Implement persistent catalogue search, sorting and filters.
- [ ] Add metadata provider integration behind server-side routes.
- [ ] Add metadata attribution and provider-specific compliance.
- [ ] Add duplicate detection and external identifiers.

The current browser search, sorting and category filters operate only on the static starter JSON. They are not a persistent catalogue API.

## Phase 3 — Accounts and personal library

- [ ] Implement registration, sign-in and sign-out.
- [ ] Add profile settings and privacy controls.
- [ ] Implement personal library statuses.
- [ ] Add favourites and custom lists.
- [ ] Add personal activity history.
- [ ] Add personal statistics.

## Phase 4 — Ratings, reviews and community

- [ ] Implement owner rating and review presentation.
- [ ] Implement member ratings and reviews.
- [ ] Calculate and display community averages separately.
- [ ] Add comments and discussion controls.
- [ ] Add edit/delete ownership checks.
- [ ] Add reporting, moderation and anti-spam protections.
- [ ] Add pagination and sorting for community content.

## Phase 5 — Quality and release

- [ ] Add unit and integration tests for backend behaviour.
- [ ] Add end-to-end tests for critical user journeys.
- [ ] Run accessibility checks and manual keyboard testing.
- [ ] Test responsive layouts on mobile, tablet and desktop.
- [ ] Add security headers and review database access policies.
- [ ] Configure dependency and secret scanning.
- [ ] Write deployment and backup documentation.
- [ ] Publish a first usable release.

## Backlog / ideas

- [ ] Curated essential-experience collections.
- [ ] Finnish and Nordic culture collections.
- [ ] Import/export personal library data.
- [ ] Optional content warnings and tags.
- [ ] Related works and creator pages.
- [ ] Recommendations based on personal lists and ratings.
- [ ] Physical media collection tracking (CDs, DVDs, Blu-rays, books and games).
- [ ] Optional episode- and season-level tracking.
- [ ] Podcast episode-level tracking.
- [ ] Accessibility preferences, including reduced motion.

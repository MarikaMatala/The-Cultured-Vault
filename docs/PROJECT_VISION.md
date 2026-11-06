# Project Vision

## The Cultured Vault

**Culture worth discovering. Stories worth remembering.**

## 1. Purpose

The Cultured Vault is envisioned as a personal cultural archive with community features. It should help people keep track of creative works they encounter, record their own opinions, discover new experiences and share recommendations.

The project should not be limited to films and television. It should treat culture as a broad collection of media and experiences: cinema, television, animation, documentaries, podcasts, music, games, books, comics and potentially live performances.

## 2. Product principles

- **Personal first:** a member's own library, history, ratings and lists should feel meaningful.
- **Owner perspective stays visible:** the project owner's rating and review are featured first on work detail pages.
- **Community without score takeover:** community averages and member reviews are separate from the owner's opinion.
- **Broad cultural scope:** new media types should be addable through extensible metadata and relationships.
- **Discovery over ranking alone:** recommendations and curated lists should help people find unfamiliar works.
- **Accessible by default:** semantic HTML, keyboard navigation, visible focus, sufficient contrast, reduced-motion support and responsive layouts.
- **Privacy and safety:** protect account data, provide moderation tools and avoid exposing private user information.
- **Bilingual direction:** Finnish and English are planned interface languages.

## 3. Main experience areas

### Explore
Search and browse the catalogue. Filter by media type, genre, release date, creator, country, language and curated tags.

### Work details
A work page should show core metadata, descriptions, creators, genres, release information, related works and external references. The owner's rating and review should appear before community content.

### My Vault
A private or profile-controlled library containing:
- Want to experience
- Currently experiencing
- Completed
- Paused
- Dropped
- Revisit / favourite

Statuses may need category-specific wording: a film can be watched, an album listened to, a book read and a game played.

### Reviews and discussion
Members can publish ratings and reviews, comment where permitted, edit their own content and report inappropriate material. Moderation and anti-spam safeguards are required.

### Lists and collections
Members can create public, unlisted or private lists, depending on the final privacy model.

### Statistics
Personal summaries can include category totals, rating distributions, activity over time, most-used genres and completion history.

## 4. Rating model

A 1–10 scale is a candidate, but the final scale is not yet decided.

The data model must keep these values distinct:
- Owner rating
- Individual member rating
- Community aggregate

A missing rating must not be treated as zero. Aggregate calculations should define how unrated, deleted, hidden or moderated entries are handled.

## 5. Visual identity

The intended direction is a dark, elegant archive atmosphere inspired by old libraries, private collections and cultural vaults.

Suggested palette:
- Deep charcoal / near-black backgrounds
- Bronze as the primary accent
- Silver for secondary details
- Gold for selected highlights
- Warm off-white for readable text

The interface should feel distinctive and editorial rather than copying IMDb or another existing service. Decorative effects must not compromise contrast, performance or accessibility.

## 6. Out of scope for the first release

The first release should avoid becoming too broad. The following can wait:
- Direct messaging
- Complex recommendation algorithms
- Public leaderboards
- Streaming or hosting copyrighted media
- Ticketing or purchasing
- Automatic imports from every external service

## 7. First useful release

A first release should allow a signed-in user to:
1. Search and open catalogue entries.
2. Add a work to their personal library.
3. Set a category-appropriate status.
4. Add, edit and remove their own rating and review.
5. See the owner's review separately from community ratings.
6. Browse the catalogue on mobile and desktop.
7. Use the essential interface in Finnish and English.

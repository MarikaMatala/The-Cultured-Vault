# Backend plan

Recommended stack: Supabase PostgreSQL and Auth for the database and accounts, with a separate Next.js + React + TypeScript application. GitHub Pages remains the static portfolio/demo host; it cannot run the private application server.

## Work packages

1. Database schema and migrations: profiles, works, genres, provider identifiers, ratings, reviews, comments, personal library, lists and list items.
2. Authorization: row-level security for every exposed table; private user data remains private; owner privileges are configured per instance.
3. Authentication: registration, sign-in, sign-out, profile setup and recovery.
4. Catalogue API: browse, search, filter, details, metadata and duplicate detection.
5. Personal features: library statuses, favourites, ratings, reviews and lists.
6. Community: comments, reports, moderation, anti-spam and audit trail.
7. Frontend: responsive bilingual app deployed separately from GitHub Pages.
8. Quality: unit, database-policy, integration, end-to-end, accessibility and mobile tests.
9. Operations: secrets, hosting, backups, monitoring, privacy documentation and release process.

## Implementation order

Start with schema + RLS, then authentication and read-only catalogue queries. Add personal library and ratings next. Reviews, comments and public community features follow only after moderation and rate limiting are in place.

No hosted project, credentials or production deployment have been created yet. Never put privileged database keys in browser code or commit real credentials.

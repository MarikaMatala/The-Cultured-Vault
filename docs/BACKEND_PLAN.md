# Backend implementation plan

Recommended stack: Supabase PostgreSQL and Auth for persistence and accounts, with a separate Next.js + React + TypeScript application. GitHub Pages remains the static portfolio/demo host; it cannot run the private application server.

## Current foundation

- supabase/config.toml — local Supabase CLI configuration.
- supabase/migrations/20261106000000_initial_schema.sql — catalogue, profiles, ratings, reviews, comments, personal library and lists, with initial row-level security (RLS).
- supabase/migrations/20261106001000_moderation_policy_guard.sql — members may only edit their own pending community submissions.
- supabase/migrations/20261106002000_auth_profiles_and_comment_visibility.sql — automatic profile creation on Auth sign-up and stricter comment visibility/target validation.
- supabase/tests/SECURITY_TEST_CHECKLIST.md — manual policy and security test checklist.

The migrations are source-controlled but are not evidence of a live Supabase deployment. Apply and test them against a disposable local database before creating or connecting a hosted project.

## Work packages

1. Database schema and migrations: profiles, works, genres, provider identifiers, ratings, reviews, comments, personal library, lists and list items.
2. Authorization: row-level security for every exposed table; private user data remains private; owner privileges are configured per instance.
3. Authentication: registration, sign-in, sign-out, profile setup and recovery.
4. Catalogue API: browse, search, filter, details, metadata and duplicate detection.
5. Personal features: library statuses, favourites, ratings, reviews and lists.
6. Community: reports, moderation, anti-spam and audit trail.
7. Frontend: responsive bilingual app deployed separately from GitHub Pages.
8. Quality: unit, database-policy, integration, end-to-end, accessibility and mobile tests.
9. Operations: secrets, hosting, backups, monitoring, privacy documentation and release process.

## Immediate next steps

1. Install Docker and the Supabase CLI, then run supabase start from the repository root.
2. Apply migrations to a fresh local database with supabase db reset.
3. Run the checks in supabase/tests/SECURITY_TEST_CHECKLIST.md; convert the manual cases into pgTAP tests as the schema stabilises.
4. Add a deterministic importer for data/catalog-seed.json, with explicit media-type and country-code mapping, duplicate detection and an unpublished-by-default seed policy.
5. Build the authentication UI only after profile creation and RLS have been tested.
6. Add read-only catalogue queries before enabling user-generated content.

No hosted project, credentials or production deployment have been created. Never put privileged database keys in browser code or commit real credentials.

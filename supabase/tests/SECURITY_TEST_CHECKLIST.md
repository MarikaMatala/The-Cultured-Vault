# Backend security test checklist

Run these checks against a disposable local Supabase database after applying all migrations. Do not use production data for policy tests.

## Authentication and profiles
- [ ] Sign up with valid username and display name; exactly one matching profile is created.
- [ ] Sign up without optional profile metadata; a unique fallback username and display name are created.
- [ ] A username collision never attaches a new account to another user's profile.
- [ ] Anonymous clients cannot read private profiles or update profiles.
- [ ] An authenticated member can read and update only their own profile.

## Catalogue
- [ ] Anonymous users can read published works and cannot read unpublished works.
- [ ] Genres and external identifiers are visible only for published works.
- [ ] Anonymous users cannot insert, update or delete catalogue records.

## Personal data
- [ ] A member can manage only their own library entries.
- [ ] A member can create only their own pending ratings, reviews and comments.
- [ ] A member cannot change a pending submission to approved, hidden or removed.
- [ ] Approved public ratings and reviews are visible; private and pending submissions are not visible to others.

## Comments and moderation
- [ ] A comment on a published work is accepted into pending moderation.
- [ ] A comment on an unpublished work is rejected.
- [ ] A comment on a private, pending, hidden or removed review is rejected.
- [ ] A reply must point to an approved parent comment in the same discussion.
- [ ] Approved comments on private or unpublished content are not visible to anonymous users.
- [ ] A member cannot edit another member's comment or approve their own comment.

## Operational checks
- [ ] No service-role key, database password or real API token is committed.
- [ ] Migrations apply cleanly from an empty local database.
- [ ] Tests run as anonymous and authenticated roles, not only as the database owner.

This is a manual checklist, not evidence that the checks have already passed.

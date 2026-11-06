# Data Model Proposal

This document describes a possible relational model. It is a design proposal, not an implemented database schema.

## Design goals

- Represent different media types without a separate unrelated table for every category.
- Keep shared work metadata separate from category-specific details.
- Store user-owned ratings, reviews and library statuses separately from catalogue records.
- Preserve the distinction between the project owner's content and community content.
- Use stable external identifiers where available, without making an external provider the primary key.

## Core entities

### profiles
One public or private profile per authenticated account.

Suggested fields: id (same UUID as the authentication user), username (unique), display_name, biography, avatar_url, profile_visibility, created_at, updated_at.

### works
The shared catalogue record.

Suggested fields: id (UUID), title, original_title, description, media_type, release_date, release_year, country_code, original_language, poster_url, cover_url, created_by, created_at, updated_at.

### work_external_ids
External identifiers for catalogue matching and metadata synchronization.

Suggested fields: id, work_id, provider, external_id, external_url, last_synced_at.

Use a unique constraint on (provider, external_id) where the provider's identifier is unique.

### people and work_credits
People include directors, actors, writers, musicians, hosts, authors and developers. Work credits connect people to works with a role, optional contribution description and display order.

### genres and work_genres
Reusable genre vocabulary and the many-to-many relationship to works.

### user_ratings
One rating per user per work.

Suggested fields: id, user_id, work_id, score, created_at, updated_at.

Suggested constraint: unique (user_id, work_id). Define the allowed score range in the database and validate it in the application.

### reviews
Written reviews associated with a user and a work.

Suggested fields: id, user_id, work_id, title (optional), body, spoiler_flag, visibility, moderation_status, created_at, updated_at.

A rating and a written review should be separable: a member may rate without writing a review, or write a review if product rules allow it.

### comments
Comments on reviews or work discussions.

Suggested fields: id, user_id, review_id (nullable), work_id (nullable), parent_comment_id (nullable), body, moderation_status, created_at, updated_at.

The final schema should enforce that a comment has a valid target.

### user_library
A member's relationship with a work.

Suggested fields: id, user_id, work_id, status, started_at (optional), completed_at (optional), personal_note (optional), created_at, updated_at.

Suggested constraint: unique (user_id, work_id). Status values may be normalized by media type in application logic.

### lists and list_items
User-created collections. Lists should include an owner, title, description and visibility. List items should link a list to a work with an optional position and note.

### reports and moderation_actions
Tools for reporting and reviewing content that violates community rules.

## Owner's rating and review

The owner's rating should not be stored as a special shared field on works. It should be represented as a normal rating/review belonging to the owner's profile, then featured by the application as the **owner's perspective**.

This keeps one consistent rating model and avoids overwriting community data. The application can query the owner's user ID separately and display that rating and review first.

## Community average

The community average should be calculated from eligible member ratings. It must:
- Exclude unrated works (never treat missing scores as zero).
- Exclude ratings hidden or removed under moderation rules.
- Show the number of ratings used in the calculation.
- Be clearly labelled as a community score.
- Never replace the owner's rating.

## Security considerations

- Enable row-level security for user-owned records.
- Users may edit or delete only their own ratings, reviews, comments, lists and library entries.
- Public visibility must be explicit; private lists and profile fields must not leak through API queries.
- Never expose privileged database keys in browser code.
- Validate all input on the server.
- Escape or safely render user-generated content.
- Rate-limit authentication, comments, reviews and reporting endpoints.
- Keep moderation actions auditable.

-- CODE MAP / COMMENTING GUIDE
-- File purpose: Initial Supabase database schema: tables, relationships, indexes, and access policies.
-- Read the migration from top to bottom. Each CREATE / ALTER / POLICY block changes the database schema or access permissions.

-- Initial database foundation for The Cultured Vault.
-- Apply to a dedicated Supabase project after reviewing the deployment settings.

create extension if not exists pgcrypto;

-- SQL SECTION START: CREATE TYPE – review the table or target in this block before making changes.
create type public.media_type as enum (
  'film', 'tv_series', 'animated_series', 'animation_film', 'documentary',
  'podcast', 'music_album', 'music_track', 'video_game', 'book', 'comic', 'other'
);
-- SQL SECTION START: CREATE TYPE – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE TYPE-lohko. The next database change starts at the next statement.
create type public.library_status as enum (
  'want_to_experience', 'in_progress', 'completed', 'paused', 'dropped', 'revisit'
);
-- SQL SECTION START: CREATE TYPE – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE TYPE-lohko. The next database change starts at the next statement.
create type public.content_visibility as enum ('public', 'unlisted', 'private');
-- SQL SECTION START: CREATE TYPE – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE TYPE-lohko. The next database change starts at the next statement.
create type public.moderation_status as enum ('pending', 'approved', 'hidden', 'removed');

-- SQL SECTION START: CREATE TABLE – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE TYPE-lohko. The next database change starts at the next statement.
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique check (username ~ '^[A-Za-z0-9_]{3,30}$'),
  display_name text not null check (char_length(display_name) between 1 and 80),
  biography text not null default '' check (char_length(biography) <= 1000),
  avatar_url text,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- SQL SECTION START: CREATE TABLE – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE TABLE-lohko. The next database change starts at the next statement.
create table public.works (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 300),
  original_title text,
  description text,
  media_type public.media_type not null,
  release_date date,
  release_year integer check (release_year between 1800 and 2200),
  country_code text check (country_code is null or country_code ~ '^[A-Z]{2}$'),
  original_language text,
  poster_url text,
  cover_url text,
  is_published boolean not null default false,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
-- SQL SECTION START: CREATE INDEX – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE TABLE-lohko. The next database change starts at the next statement.
create index works_title_idx on public.works using gin (to_tsvector('simple', coalesce(title,'') || ' ' || coalesce(original_title,'')));
-- SQL SECTION START: CREATE INDEX – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE INDEX-lohko. The next database change starts at the next statement.
create index works_media_type_idx on public.works(media_type);
-- SQL SECTION START: CREATE INDEX – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE INDEX-lohko. The next database change starts at the next statement.
create index works_release_year_idx on public.works(release_year);

-- SQL SECTION START: CREATE TABLE – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE INDEX-lohko. The next database change starts at the next statement.
create table public.genres (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null unique
);
-- SQL SECTION START: CREATE TABLE – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE TABLE-lohko. The next database change starts at the next statement.
create table public.work_genres (
  work_id uuid not null references public.works(id) on delete cascade,
  genre_id uuid not null references public.genres(id) on delete cascade,
  primary key (work_id, genre_id)
);
-- SQL SECTION START: CREATE TABLE – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE TABLE-lohko. The next database change starts at the next statement.
create table public.work_external_ids (
  id uuid primary key default gen_random_uuid(),
  work_id uuid not null references public.works(id) on delete cascade,
  provider text not null,
  external_id text not null,
  external_url text,
  last_synced_at timestamptz,
  unique(provider, external_id)
);

-- SQL SECTION START: CREATE TABLE – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE TABLE-lohko. The next database change starts at the next statement.
create table public.user_ratings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  work_id uuid not null references public.works(id) on delete cascade,
  score numeric(3,1) not null check (score >= 1 and score <= 10),
  visibility public.content_visibility not null default 'public',
  moderation_state public.moderation_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, work_id)
);
-- SQL SECTION START: CREATE INDEX – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE TABLE-lohko. The next database change starts at the next statement.
create index user_ratings_work_idx on public.user_ratings(work_id);

-- SQL SECTION START: CREATE TABLE – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE INDEX-lohko. The next database change starts at the next statement.
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  work_id uuid not null references public.works(id) on delete cascade,
  title text check (title is null or char_length(title) <= 160),
  body text not null check (char_length(body) between 1 and 10000),
  contains_spoilers boolean not null default false,
  visibility public.content_visibility not null default 'public',
  moderation_state public.moderation_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
-- SQL SECTION START: CREATE INDEX – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE TABLE-lohko. The next database change starts at the next statement.
create index reviews_work_idx on public.reviews(work_id, created_at desc);

-- SQL SECTION START: CREATE TABLE – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE INDEX-lohko. The next database change starts at the next statement.
create table public.user_library (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  work_id uuid not null references public.works(id) on delete cascade,
  status public.library_status not null default 'want_to_experience',
  started_at date,
  completed_at date,
  personal_note text check (personal_note is null or char_length(personal_note) <= 2000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, work_id)
);

-- SQL SECTION START: CREATE TABLE – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE TABLE-lohko. The next database change starts at the next statement.
create table public.lists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 120),
  description text not null default '' check (char_length(description) <= 2000),
  visibility public.content_visibility not null default 'private',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
-- SQL SECTION START: CREATE TABLE – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE TABLE-lohko. The next database change starts at the next statement.
create table public.list_items (
  id uuid primary key default gen_random_uuid(),
  list_id uuid not null references public.lists(id) on delete cascade,
  work_id uuid not null references public.works(id) on delete cascade,
  position integer not null default 0,
  note text,
  unique(list_id, work_id)
);

-- SQL SECTION START: CREATE TABLE – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE TABLE-lohko. The next database change starts at the next statement.
create table public.comments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  review_id uuid references public.reviews(id) on delete cascade,
  work_id uuid references public.works(id) on delete cascade,
  parent_comment_id uuid references public.comments(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 3000),
  moderation_state public.moderation_status not null default 'pending',
  created_at timestamptz not null default now(),
  check (num_nonnulls(review_id, work_id) = 1)
);

-- Enable row-level security on every API-facing table.
-- SQL SECTION START: ALTER TABLE – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE TABLE-lohko. The next database change starts at the next statement.
alter table public.profiles enable row level security;
-- SQL SECTION START: ALTER TABLE – review the table or target in this block before making changes.
-- SQL SECTION END: ALTER TABLE-lohko. The next database change starts at the next statement.
alter table public.works enable row level security;
-- SQL SECTION START: ALTER TABLE – review the table or target in this block before making changes.
-- SQL SECTION END: ALTER TABLE-lohko. The next database change starts at the next statement.
alter table public.genres enable row level security;
-- SQL SECTION START: ALTER TABLE – review the table or target in this block before making changes.
-- SQL SECTION END: ALTER TABLE-lohko. The next database change starts at the next statement.
alter table public.work_genres enable row level security;
-- SQL SECTION START: ALTER TABLE – review the table or target in this block before making changes.
-- SQL SECTION END: ALTER TABLE-lohko. The next database change starts at the next statement.
alter table public.work_external_ids enable row level security;
-- SQL SECTION START: ALTER TABLE – review the table or target in this block before making changes.
-- SQL SECTION END: ALTER TABLE-lohko. The next database change starts at the next statement.
alter table public.user_ratings enable row level security;
-- SQL SECTION START: ALTER TABLE – review the table or target in this block before making changes.
-- SQL SECTION END: ALTER TABLE-lohko. The next database change starts at the next statement.
alter table public.reviews enable row level security;
-- SQL SECTION START: ALTER TABLE – review the table or target in this block before making changes.
-- SQL SECTION END: ALTER TABLE-lohko. The next database change starts at the next statement.
alter table public.user_library enable row level security;
-- SQL SECTION START: ALTER TABLE – review the table or target in this block before making changes.
-- SQL SECTION END: ALTER TABLE-lohko. The next database change starts at the next statement.
alter table public.lists enable row level security;
-- SQL SECTION START: ALTER TABLE – review the table or target in this block before making changes.
-- SQL SECTION END: ALTER TABLE-lohko. The next database change starts at the next statement.
alter table public.list_items enable row level security;
-- SQL SECTION START: ALTER TABLE – review the table or target in this block before making changes.
-- SQL SECTION END: ALTER TABLE-lohko. The next database change starts at the next statement.
alter table public.comments enable row level security;

-- SQL SECTION START: CREATE POLICY – review the table or target in this block before making changes.
-- SQL SECTION END: ALTER TABLE-lohko. The next database change starts at the next statement.
create policy "Public profiles and own profile are visible"
on public.profiles for select to anon, authenticated
using (is_public or id = (select auth.uid()));
-- SQL SECTION START: CREATE POLICY – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE POLICY-lohko. The next database change starts at the next statement.
create policy "Members update their own profile"
on public.profiles for update to authenticated
using (id = (select auth.uid())) with check (id = (select auth.uid()));

-- SQL SECTION START: CREATE POLICY – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE POLICY-lohko. The next database change starts at the next statement.
create policy "Published catalogue works are visible"
on public.works for select to anon, authenticated using (is_published);
-- SQL SECTION START: CREATE POLICY – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE POLICY-lohko. The next database change starts at the next statement.
create policy "Genres are visible"
on public.genres for select to anon, authenticated using (true);
-- SQL SECTION START: CREATE POLICY – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE POLICY-lohko. The next database change starts at the next statement.
create policy "Published work genres are visible"
on public.work_genres for select to anon, authenticated
using (exists (select 1 from public.works w where w.id = work_id and w.is_published));
-- SQL SECTION START: CREATE POLICY – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE POLICY-lohko. The next database change starts at the next statement.
create policy "Published external identifiers are visible"
on public.work_external_ids for select to anon, authenticated
using (exists (select 1 from public.works w where w.id = work_id and w.is_published));

-- SQL SECTION START: CREATE POLICY – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE POLICY-lohko. The next database change starts at the next statement.
create policy "Approved public ratings are visible"
on public.user_ratings for select to anon, authenticated
using ((visibility = 'public' and moderation_state = 'approved') or user_id = (select auth.uid()));
-- SQL SECTION START: CREATE POLICY – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE POLICY-lohko. The next database change starts at the next statement.
create policy "Members add own pending ratings"
on public.user_ratings for insert to authenticated
with check (user_id = (select auth.uid()) and moderation_state = 'pending');
-- SQL SECTION START: CREATE POLICY – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE POLICY-lohko. The next database change starts at the next statement.
create policy "Members update own ratings"
on public.user_ratings for update to authenticated
using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
-- SQL SECTION START: CREATE POLICY – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE POLICY-lohko. The next database change starts at the next statement.
create policy "Members delete own ratings"
on public.user_ratings for delete to authenticated using (user_id = (select auth.uid()));

-- SQL SECTION START: CREATE POLICY – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE POLICY-lohko. The next database change starts at the next statement.
create policy "Approved public reviews are visible"
on public.reviews for select to anon, authenticated
using ((visibility = 'public' and moderation_state = 'approved') or user_id = (select auth.uid()));
-- SQL SECTION START: CREATE POLICY – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE POLICY-lohko. The next database change starts at the next statement.
create policy "Members add own pending reviews"
on public.reviews for insert to authenticated
with check (user_id = (select auth.uid()) and moderation_state = 'pending');
-- SQL SECTION START: CREATE POLICY – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE POLICY-lohko. The next database change starts at the next statement.
create policy "Members update own reviews"
on public.reviews for update to authenticated
using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
-- SQL SECTION START: CREATE POLICY – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE POLICY-lohko. The next database change starts at the next statement.
create policy "Members delete own reviews"
on public.reviews for delete to authenticated using (user_id = (select auth.uid()));

-- SQL SECTION START: CREATE POLICY – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE POLICY-lohko. The next database change starts at the next statement.
create policy "Members manage own library"
on public.user_library for all to authenticated
using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
-- SQL SECTION START: CREATE POLICY – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE POLICY-lohko. The next database change starts at the next statement.
create policy "Public lists and own lists are visible"
on public.lists for select to anon, authenticated
using (visibility = 'public' or user_id = (select auth.uid()));
-- SQL SECTION START: CREATE POLICY – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE POLICY-lohko. The next database change starts at the next statement.
create policy "Members create own lists"
on public.lists for insert to authenticated with check (user_id = (select auth.uid()));
-- SQL SECTION START: CREATE POLICY – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE POLICY-lohko. The next database change starts at the next statement.
create policy "Members update own lists"
on public.lists for update to authenticated
using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
-- SQL SECTION START: CREATE POLICY – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE POLICY-lohko. The next database change starts at the next statement.
create policy "Members delete own lists"
on public.lists for delete to authenticated using (user_id = (select auth.uid()));
-- SQL SECTION START: CREATE POLICY – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE POLICY-lohko. The next database change starts at the next statement.
create policy "Items in public or own lists are visible"
on public.list_items for select to anon, authenticated
using (exists (select 1 from public.lists l where l.id = list_id and (l.visibility = 'public' or l.user_id = (select auth.uid()))));
-- SQL SECTION START: CREATE POLICY – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE POLICY-lohko. The next database change starts at the next statement.
create policy "List owners manage list items"
on public.list_items for all to authenticated
using (exists (select 1 from public.lists l where l.id = list_id and l.user_id = (select auth.uid())))
with check (exists (select 1 from public.lists l where l.id = list_id and l.user_id = (select auth.uid())));

-- SQL SECTION START: CREATE POLICY – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE POLICY-lohko. The next database change starts at the next statement.
create policy "Approved comments are visible"
on public.comments for select to anon, authenticated
using (moderation_state = 'approved' or user_id = (select auth.uid()));
-- SQL SECTION START: CREATE POLICY – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE POLICY-lohko. The next database change starts at the next statement.
create policy "Members add own pending comments"
on public.comments for insert to authenticated
with check (user_id = (select auth.uid()) and moderation_state = 'pending');
-- SQL SECTION START: CREATE POLICY – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE POLICY-lohko. The next database change starts at the next statement.
create policy "Members update own comments"
on public.comments for update to authenticated
using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
-- SQL SECTION START: CREATE POLICY – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE POLICY-lohko. The next database change starts at the next statement.
create policy "Members delete own comments"
on public.comments for delete to authenticated using (user_id = (select auth.uid()));

grant usage on schema public to anon, authenticated;
grant select on public.works, public.genres, public.work_genres, public.work_external_ids to anon, authenticated;
grant select, update on public.profiles to authenticated;
grant select, insert, update, delete on public.user_ratings, public.reviews, public.user_library, public.lists, public.list_items, public.comments to authenticated;

-- SQL SECTION END: CREATE POLICY-lohko. The next database change starts at the next statement.
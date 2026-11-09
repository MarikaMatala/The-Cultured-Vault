-- CODE MAP / COMMENTING GUIDE
-- File purpose: Tietokannan moderointikäytäntöjen lisäsuojaus ja RLS-politiikkojen turvarajaukset.
-- Read the migration from top to bottom. Each CREATE / ALTER / POLICY block changes the database schema or access permissions.

-- Tighten moderation ownership: ordinary members may only edit pending submissions.
-- SQL SECTION START: DROP  – review the table or target in this block before making changes.
drop policy if exists "Members update own ratings" on public.user_ratings;
-- SQL SECTION START: CREATE POLICY – review the table or target in this block before making changes.
-- SQL SECTION END: DROP -lohko. The next database change starts at the next statement.
create policy "Members update own pending ratings"
on public.user_ratings for update to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()) and moderation_state = 'pending');

-- SQL SECTION START: DROP  – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE POLICY-lohko. The next database change starts at the next statement.
drop policy if exists "Members update own reviews" on public.reviews;
-- SQL SECTION START: CREATE POLICY – review the table or target in this block before making changes.
-- SQL SECTION END: DROP -lohko. The next database change starts at the next statement.
create policy "Members update own pending reviews"
on public.reviews for update to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()) and moderation_state = 'pending');

-- SQL SECTION START: DROP  – review the table or target in this block before making changes.
-- SQL SECTION END: CREATE POLICY-lohko. The next database change starts at the next statement.
drop policy if exists "Members update own comments" on public.comments;
-- SQL SECTION START: CREATE POLICY – review the table or target in this block before making changes.
-- SQL SECTION END: DROP -lohko. The next database change starts at the next statement.
create policy "Members update own pending comments"
on public.comments for update to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()) and moderation_state = 'pending');

-- SQL SECTION END: CREATE POLICY-lohko. The next database change starts at the next statement.
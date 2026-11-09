-- KOMMENTOINTIOHJE / CODE MAP
-- Tiedoston tarkoitus: Tietokannan moderointikäytäntöjen lisäsuojaus ja RLS-politiikkojen turvarajaukset.
-- Lue migraatio ylhäältä alas. Jokainen CREATE / ALTER / POLICY -lohko muuttaa tietokannan rakennetta tai käyttöoikeuksia.

-- Tighten moderation ownership: ordinary members may only edit pending submissions.
-- SQL-OSIO ALKAA: DROP  – tarkista tämän lohkon taulu tai kohde ennen muutoksia.
drop policy if exists "Members update own ratings" on public.user_ratings;
-- SQL-OSIO ALKAA: CREATE POLICY – tarkista tämän lohkon taulu tai kohde ennen muutoksia.
create policy "Members update own pending ratings"
on public.user_ratings for update to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()) and moderation_state = 'pending');

-- SQL-OSIO ALKAA: DROP  – tarkista tämän lohkon taulu tai kohde ennen muutoksia.
drop policy if exists "Members update own reviews" on public.reviews;
-- SQL-OSIO ALKAA: CREATE POLICY – tarkista tämän lohkon taulu tai kohde ennen muutoksia.
create policy "Members update own pending reviews"
on public.reviews for update to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()) and moderation_state = 'pending');

-- SQL-OSIO ALKAA: DROP  – tarkista tämän lohkon taulu tai kohde ennen muutoksia.
drop policy if exists "Members update own comments" on public.comments;
-- SQL-OSIO ALKAA: CREATE POLICY – tarkista tämän lohkon taulu tai kohde ennen muutoksia.
create policy "Members update own pending comments"
on public.comments for update to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()) and moderation_state = 'pending');

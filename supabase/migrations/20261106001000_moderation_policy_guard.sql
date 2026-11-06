-- Tighten moderation ownership: ordinary members may only edit pending submissions.
drop policy if exists "Members update own ratings" on public.user_ratings;
create policy "Members update own pending ratings"
on public.user_ratings for update to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()) and moderation_state = 'pending');

drop policy if exists "Members update own reviews" on public.reviews;
create policy "Members update own pending reviews"
on public.reviews for update to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()) and moderation_state = 'pending');

drop policy if exists "Members update own comments" on public.comments;
create policy "Members update own pending comments"
on public.comments for update to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()) and moderation_state = 'pending');

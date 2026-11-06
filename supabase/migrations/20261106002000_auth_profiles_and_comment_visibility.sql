-- Authentication profile bootstrap and comment visibility hardening.
-- Apply after 20261106001000_moderation_policy_guard.sql.

-- Create one public profile automatically when Supabase Auth creates an account.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer
set search_path = public, pg_temp
as $$
declare
  v_username text;
  v_display_name text;
  v_email_name text;
begin
  v_email_name := split_part(coalesce(new.email, ''), '@', 1);
  v_username := lower(regexp_replace(coalesce(new.raw_user_meta_data ->> 'username', ''), '[^a-z0-9_]', '', 'g'));

  if char_length(v_username) < 3 then
    v_username := 'member_' || substr(replace(new.id::text, '-', ''), 1, 12);
  elsif char_length(v_username) > 30 then
    v_username := left(v_username, 30);
  end if;

  if exists (select 1 from public.profiles p where p.username = v_username) then
    v_username := left(v_username, 20) || '_' || substr(replace(new.id::text, '-', ''), 1, 8);
  end if;

  v_display_name := nullif(btrim(coalesce(
    new.raw_user_meta_data ->> 'display_name',
    new.raw_user_meta_data ->> 'full_name',
    v_email_name
  )), '');
  if v_display_name is null then v_display_name := 'Vault member'; end if;

  insert into public.profiles (id, username, display_name)
  values (new.id, v_username, left(v_display_name, 80))
  on conflict (id) do nothing;

  return new;
end;
$$;

revoke all on function public.handle_new_user() from public, anon, authenticated;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Validate that comments target public content and replies stay in one thread.
create or replace function public.validate_comment_target()
returns trigger language plpgsql security definer
set search_path = public, pg_temp
as $$
declare
  v_parent_review_id uuid;
  v_parent_work_id uuid;
  v_parent_moderation public.moderation_status;
begin
  if new.review_id is not null then
    if not exists (
      select 1 from public.reviews r
      join public.works w on w.id = r.work_id
      where r.id = new.review_id and r.visibility = 'public'
        and r.moderation_state = 'approved' and w.is_published = true
    ) then
      raise exception 'Comments may only target approved public reviews on published works.';
    end if;
  elsif not exists (
    select 1 from public.works w where w.id = new.work_id and w.is_published = true
  ) then
    raise exception 'Comments may only target published works.';
  end if;

  if new.parent_comment_id is not null then
    select c.review_id, c.work_id, c.moderation_state
      into v_parent_review_id, v_parent_work_id, v_parent_moderation
    from public.comments c where c.id = new.parent_comment_id;

    if not found or v_parent_moderation <> 'approved'
      or v_parent_review_id is distinct from new.review_id
      or v_parent_work_id is distinct from new.work_id then
      raise exception 'A reply must reference an approved comment in the same discussion.';
    end if;
  end if;
  return new;
end;
$$;

revoke all on function public.validate_comment_target() from public, anon, authenticated;
drop trigger if exists validate_comment_target_before_write on public.comments;
create trigger validate_comment_target_before_write
  before insert or update of review_id, work_id, parent_comment_id
  on public.comments for each row execute function public.validate_comment_target();

drop policy if exists "Approved comments are visible" on public.comments;
create policy "Approved comments on public content are visible"
on public.comments for select to anon, authenticated
using (
  (
    moderation_state = 'approved'
    and (
      (
        review_id is not null
        and exists (
          select 1 from public.reviews r
          join public.works w on w.id = r.work_id
          where r.id = comments.review_id and r.visibility = 'public'
            and r.moderation_state = 'approved' and w.is_published = true
        )
      )
      or (
        work_id is not null
        and exists (select 1 from public.works w where w.id = comments.work_id and w.is_published = true)
      )
    )
  )
  or user_id = (select auth.uid())
);

drop policy if exists "Members add own pending comments" on public.comments;
create policy "Members add own pending comments to public content"
on public.comments for insert to authenticated
with check (
  user_id = (select auth.uid()) and moderation_state = 'pending'
  and (
    (
      review_id is not null
      and exists (
        select 1 from public.reviews r
        join public.works w on w.id = r.work_id
        where r.id = comments.review_id and r.visibility = 'public'
          and r.moderation_state = 'approved' and w.is_published = true
      )
    )
    or (
      work_id is not null
      and exists (select 1 from public.works w where w.id = comments.work_id and w.is_published = true)
    )
  )
);

drop policy if exists "Members update own comments" on public.comments;
create policy "Members update own pending comments"
on public.comments for update to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()) and moderation_state = 'pending');

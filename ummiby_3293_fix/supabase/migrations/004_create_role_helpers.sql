-- Ummiby Companion v3.0.0
-- Milestone 1 / Step 4: Central role and access checks for future RLS policies.

create or replace function public.is_active_user()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where user_id = auth.uid()
      and is_active = true
  );
$$;

create or replace function public.is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where user_id = auth.uid()
      and role = 'super_admin'
      and is_active = true
  );
$$;

revoke all on function public.is_active_user() from public;
revoke all on function public.is_super_admin() from public;
grant execute on function public.is_active_user() to authenticated;
grant execute on function public.is_super_admin() to authenticated;

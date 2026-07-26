-- Ummiby Companion v3.0.0
-- Milestone 1 / Step 5: Protect profiles with owner and super-admin rules.

alter table public.profiles enable row level security;

-- Remove the early foundation policies so the new rules are unambiguous.
drop policy if exists "Users can read their own profile" on public.profiles;
drop policy if exists "Users can insert their own profile" on public.profiles;
drop policy if exists "Users can update their own profile" on public.profiles;
drop policy if exists "Active users can read own profile" on public.profiles;
drop policy if exists "Super admin can read all profiles" on public.profiles;
drop policy if exists "Super admin can update profiles" on public.profiles;

create policy "Active users can read own profile"
on public.profiles
for select
to authenticated
using (
  user_id = auth.uid()
  and is_active = true
);

create policy "Super admin can read all profiles"
on public.profiles
for select
to authenticated
using (public.is_super_admin());

-- Profile rows are created by the auth trigger, not by browser clients.
-- Ordinary profile editing will later use a controlled RPC so users cannot
-- change role, active status, or account email from the browser.
create policy "Super admin can update profiles"
on public.profiles
for update
to authenticated
using (public.is_super_admin())
with check (public.is_super_admin());

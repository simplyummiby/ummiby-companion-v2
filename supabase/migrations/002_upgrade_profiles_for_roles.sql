-- Ummiby Companion v3.0.0
-- Milestone 1 / Step 2: Upgrade the existing profiles table for roles.
-- This preserves the current user_id-based profile structure.

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles
  add column if not exists email text,
  add column if not exists full_name text,
  add column if not exists role public.app_role not null default 'user',
  add column if not exists is_active boolean not null default true;

-- Preserve an existing display name as the initial full name.
update public.profiles
set full_name = nullif(trim(display_name), '')
where full_name is null
  and nullif(trim(display_name), '') is not null;

-- Populate profile email from Supabase Auth for existing accounts.
update public.profiles p
set email = u.email
from auth.users u
where u.id = p.user_id
  and p.email is distinct from u.email;

create index if not exists profiles_role_idx on public.profiles(role);
create index if not exists profiles_active_idx on public.profiles(is_active);

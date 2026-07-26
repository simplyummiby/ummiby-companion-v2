-- Ummiby Companion v3.0.0
-- Milestone 1 / Step 1: Create the two allowed application roles.
-- Safe to run more than once.

do $$
begin
  if not exists (
    select 1
    from pg_type t
    join pg_namespace n on n.oid = t.typnamespace
    where n.nspname = 'public'
      and t.typname = 'app_role'
  ) then
    create type public.app_role as enum ('super_admin', 'user');
  end if;
end
$$;

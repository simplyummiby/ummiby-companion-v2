-- Ummiby Companion v3.26.1: shared local-first sync storage.
create table if not exists public.app_sync_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  namespace text not null,
  record_key text not null,
  payload jsonb not null default '{}'::jsonb,
  local_date date,
  time_zone text,
  client_updated_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, namespace, record_key)
);
alter table public.app_sync_records enable row level security;
drop policy if exists "Users manage own sync records" on public.app_sync_records;
create policy "Users manage own sync records" on public.app_sync_records
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create index if not exists app_sync_records_user_namespace_idx on public.app_sync_records(user_id, namespace);
create or replace function public.set_app_sync_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;
drop trigger if exists app_sync_records_updated_at on public.app_sync_records;
create trigger app_sync_records_updated_at before update on public.app_sync_records
for each row execute function public.set_app_sync_updated_at();

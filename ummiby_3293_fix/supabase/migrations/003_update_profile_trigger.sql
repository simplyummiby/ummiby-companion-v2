-- Ummiby Companion v3.0.0
-- Milestone 1 / Step 3: Create or upgrade profiles automatically.
-- Every new account is deliberately assigned the regular user role.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (
    user_id,
    email,
    display_name,
    full_name,
    role,
    is_active
  )
  values (
    new.id,
    new.email,
    coalesce(
      nullif(new.raw_user_meta_data ->> 'display_name', ''),
      nullif(new.raw_user_meta_data ->> 'full_name', ''),
      ''
    ),
    coalesce(
      nullif(new.raw_user_meta_data ->> 'full_name', ''),
      nullif(new.raw_user_meta_data ->> 'display_name', '')
    ),
    'user',
    true
  )
  on conflict (user_id) do update
  set email = excluded.email,
      updated_at = now();

  insert into public.app_preferences (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

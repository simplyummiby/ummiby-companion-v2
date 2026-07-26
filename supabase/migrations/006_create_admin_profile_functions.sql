-- Ummiby Companion v3.0.0
-- Milestone 1 / Step 6: Controlled sensitive profile changes.

create or replace function public.admin_set_user_role(
  target_user_id uuid,
  new_role public.app_role
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.is_super_admin() then
    raise exception 'Super admin access required';
  end if;

  update public.profiles
  set role = new_role,
      updated_at = now()
  where user_id = target_user_id;

  if not found then
    raise exception 'Profile not found';
  end if;
end;
$$;

create or replace function public.admin_set_user_active(
  target_user_id uuid,
  new_active_status boolean
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.is_super_admin() then
    raise exception 'Super admin access required';
  end if;

  if target_user_id = auth.uid() and new_active_status = false then
    raise exception 'A super admin cannot deactivate their own account here';
  end if;

  update public.profiles
  set is_active = new_active_status,
      updated_at = now()
  where user_id = target_user_id;

  if not found then
    raise exception 'Profile not found';
  end if;
end;
$$;

revoke all on function public.admin_set_user_role(uuid, public.app_role) from public;
revoke all on function public.admin_set_user_active(uuid, boolean) from public;
grant execute on function public.admin_set_user_role(uuid, public.app_role) to authenticated;
grant execute on function public.admin_set_user_active(uuid, boolean) to authenticated;

# Supabase Milestone 1 — Authentication and Roles

## Purpose

Milestone 1 gives Ummiby Companion two application roles:

- `super_admin` — full app access plus future content administration
- `user` — normal worship and personal-tracking access

This release prepares the database and JavaScript identity layer. It deliberately does **not** force authentication or change the visible app yet. We will apply and verify the migrations one at a time before connecting role-based navigation.

## Important compatibility note

Earlier Ummiby Companion releases already included:

- a Supabase browser client in `js/auth.js`
- a basic `profiles` table keyed by `user_id`
- an `app_preferences` table
- a basic new-user trigger

The v3.0.0 files upgrade that foundation instead of replacing it.

## Migration order

Run these files in the Supabase SQL Editor in order. Stop after each file and verify the expected result before continuing.

1. `001_create_app_role_enum.sql`
2. `002_upgrade_profiles_for_roles.sql`
3. `003_update_profile_trigger.sql`
4. `004_create_role_helpers.sql`
5. `005_replace_profile_rls_policies.sql`
6. `006_create_admin_profile_functions.sql`
7. `007_promote_first_super_admin_TEMPLATE.sql` — edit first; do not run unchanged

## Step 1 verification

After running migration 001, use:

```sql
select enumlabel
from pg_enum
where enumtypid = 'public.app_role'::regtype
order by enumsortorder;
```

Expected values:

```text
super_admin
user
```

## Step 2 verification

After running migration 002, open **Table Editor → profiles** and confirm these columns exist:

- `user_id`
- `display_name`
- `email`
- `full_name`
- `role`
- `is_active`
- `created_at`
- `updated_at`

Existing accounts should remain in the table. New role values default to `user`.

## Step 3 verification

After running migration 003, create one temporary regular account through Supabase Authentication or the existing app sign-up form. Then run:

```sql
select user_id, email, full_name, role, is_active
from public.profiles
order by created_at desc;
```

The new account should have:

- matching Auth and profile UUIDs
- role `user`
- `is_active = true`

If account creation fails, do not continue. Re-open the trigger migration and inspect the Supabase database logs.

## Steps 4–6 verification

After the helper functions, RLS policies, and admin functions are installed, confirm the objects exist:

```sql
select routine_name
from information_schema.routines
where routine_schema = 'public'
  and routine_name in (
    'is_active_user',
    'is_super_admin',
    'admin_set_user_role',
    'admin_set_user_active'
  )
order by routine_name;
```

Confirm profile policies:

```sql
select policyname, cmd
from pg_policies
where schemaname = 'public'
  and tablename = 'profiles'
order by policyname;
```

## Promote the first super admin

Open `007_promote_first_super_admin_TEMPLATE.sql` and replace:

```text
YOUR_EMAIL_ADDRESS
```

with your actual account email. Remove the comment markers only from the update statement and run it once.

Then verify:

```sql
select user_id, email, full_name, role, is_active
from public.profiles
order by created_at;
```

Your account should show `super_admin`. The test account should remain `user`.

## Security rules established

- New accounts always begin as regular users.
- Browser clients cannot insert profile rows directly.
- An active user may read their own profile.
- A super admin may read all profiles.
- Only a super admin may update sensitive profile fields.
- Controlled functions exist for future user-role and active-status controls.
- The service-role key must never appear in `js/config.js` or any browser file.

## Local configuration

Copy:

```text
js/config.example.js
```

to:

```text
js/config.js
```

and add only:

- Supabase project URL
- publishable key or legacy anon key

`js/config.js` is ignored by Git.

## Stop point for this release

After the SQL foundation is proven with one super-admin account and one regular account, the next release will connect profile loading to app startup and add the role-protected Administration shell.

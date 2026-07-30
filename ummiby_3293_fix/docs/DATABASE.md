# Ummiby Companion Database

## Migration rule

Applied migration files are permanent history. Once a migration has been run in a shared Supabase project, do not rewrite it to make later changes. Add a new numbered migration instead.

Example:

```text
002_upgrade_profiles_for_roles.sql
008_add_profile_avatar.sql
```

## Current tables

### `profiles`

**Purpose:** Application identity and authorization data for every authenticated account.

| Column | Purpose |
|---|---|
| `user_id` | Matches `auth.users.id`; primary key |
| `display_name` | Legacy-compatible display name |
| `email` | Administrative account reference |
| `full_name` | Preferred app display name |
| `role` | `super_admin` or `user` |
| `is_active` | Enables or suspends app access |
| `created_at` | Creation timestamp |
| `updated_at` | Last change timestamp |

### `app_preferences`

**Purpose:** One user-owned JSON preference record per authenticated account.

This table remains from the earlier app foundation and will be refined later.

## Future table categories

### Shared editorial content

Examples:

- study resources
- Duaa collections and entries
- Duaa sources
- reading-unit definitions
- Ramadan articles
- Names of Allah content

Authenticated active users read published content. Only a super admin creates, edits, publishes, archives, or deletes it.

### Personal user data

Examples:

- Qur’an journey progress
- completed reading units
- memorization status
- Duaa completion
- Ramadan fasting records
- notes and preferences

Every row is tied to `user_id`, and RLS limits access to its owner.

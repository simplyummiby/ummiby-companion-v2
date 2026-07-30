# Ummiby Companion Database — Milestone 1

```text
auth.users
    │
    │ 1:1, matching UUID
    ▼
public.profiles
    ├── role: super_admin | user
    └── is_active: true | false

public.app_preferences
    ▲
    │ 1:1, matching UUID
    │
auth.users
```

## Data boundaries

- `auth.users` is managed by Supabase Auth and stores login identity.
- `profiles` stores Ummiby Companion identity, role, and access status.
- `app_preferences` remains user-owned preference data.
- Future shared content tables will be readable by active users and writable only by a super admin.
- Future personal progress tables will always carry a `user_id` and be isolated through Row Level Security.

-- Ummiby Companion v3.0.0
-- TEMPLATE ONLY: edit the email before running this file.
-- Run only after your account exists and its profile row has been verified.

-- update public.profiles
-- set role = 'super_admin',
--     is_active = true,
--     updated_at = now()
-- where email = 'YOUR_EMAIL_ADDRESS';

-- Verification query:
-- select user_id, email, full_name, role, is_active
-- from public.profiles
-- order by created_at;

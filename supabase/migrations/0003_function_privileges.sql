-- =====================================================================
-- 0003_function_privileges.sql
--
-- Fixes a privilege hole in 0002. That migration ran:
--     revoke execute on function promote_admin(text) from anon, authenticated;
-- which does nothing useful: Postgres grants EXECUTE on new functions to
-- PUBLIC, and anon/authenticated inherit it. promote_admin therefore stayed
-- callable over the REST API at /rest/v1/rpc/promote_admin, letting any
-- visitor grant admin rights to any existing auth user — and an admin can
-- read every patient appointment. Revoke from PUBLIC, which is the grant
-- that actually exists.
-- =====================================================================

revoke all on function public.promote_admin(text) from public;
revoke all on function public.promote_admin(text) from anon, authenticated;

-- is_admin() is referenced by every admin RLS policy. Policy expressions are
-- evaluated with the *querying* role's privileges, so `authenticated` must
-- keep EXECUTE — without it every admin policy fails with
-- "permission denied for function is_admin" and admins are locked out.
-- Granting it leaks nothing: the function only reports whether the caller
-- is an admin. `anon` does not need it, as no policy for anon references it.
revoke all on function public.is_admin() from public;
revoke all on function public.is_admin() from anon;
grant execute on function public.is_admin() to authenticated;

-- available_slots stays public: the booking page calls it anonymously.
grant execute on function public.available_slots(date) to anon, authenticated;

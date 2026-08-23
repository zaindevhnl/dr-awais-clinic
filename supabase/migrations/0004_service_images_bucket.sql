-- =====================================================================
-- Storage for service illustrations.
--
-- The services page renders services.image_url; until now there was no
-- bucket to host those files, so the field could only ever point at an
-- external URL. This adds a bucket the admin can upload into.
--
-- Read is public: the images appear on the public services page.
-- Write is admin-only, matching every other content table -- membership
-- of admin_users, checked through is_admin().
-- =====================================================================

insert into storage.buckets (id, name, public)
values ('service-images', 'service-images', true)
on conflict (id) do nothing;

drop policy if exists "public reads service images" on storage.objects;
create policy "public reads service images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'service-images');

drop policy if exists "admins write service images" on storage.objects;
create policy "admins write service images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'service-images' and is_admin());

drop policy if exists "admins update service images" on storage.objects;
create policy "admins update service images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'service-images' and is_admin())
  with check (bucket_id = 'service-images' and is_admin());

drop policy if exists "admins delete service images" on storage.objects;
create policy "admins delete service images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'service-images' and is_admin());

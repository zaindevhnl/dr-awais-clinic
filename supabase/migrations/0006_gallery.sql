-- Gallery managed from /admin.
--
-- Two tables so the practice can group photographs the way it thinks about
-- them -- theatre, hospitals, conferences, teaching -- rather than as one
-- undifferentiated wall. Images carry their own pixel dimensions so the public
-- grid can lay each card out at the photograph's real shape: two thirds of the
-- practice's photographs are portrait, and a fixed landscape crop beheaded
-- them.
--
-- Uploads go from the browser straight to Storage rather than through a Server
-- Action, which is capped at 1MB by default -- far below a phone photograph.

create table if not exists gallery_sections (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  display_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists gallery_images (
  id uuid primary key default gen_random_uuid(),
  section_id uuid references gallery_sections(id) on delete set null,
  -- Either a public storage URL (uploaded) or a site-relative path such as
  -- /gallery/01.jpg (files that ship with the repository).
  src text not null,
  -- Set for uploads, so deleting a row can also delete the stored object.
  storage_path text,
  caption text not null default '',
  alt text not null default '',
  width int,
  height int,
  display_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists gallery_images_section_idx
  on gallery_images (section_id, display_order);

alter table gallery_sections enable row level security;
alter table gallery_images   enable row level security;

drop policy if exists "public read gallery sections" on gallery_sections;
create policy "public read gallery sections"
  on gallery_sections for select to anon, authenticated
  using (is_published = true);

drop policy if exists "admin manage gallery sections" on gallery_sections;
create policy "admin manage gallery sections"
  on gallery_sections for all to authenticated
  using (is_admin()) with check (is_admin());

drop policy if exists "public read gallery images" on gallery_images;
create policy "public read gallery images"
  on gallery_images for select to anon, authenticated
  using (is_published = true);

drop policy if exists "admin manage gallery images" on gallery_images;
create policy "admin manage gallery images"
  on gallery_images for all to authenticated
  using (is_admin()) with check (is_admin());

-- Storage for the uploads: public read, admin-only write, matching the
-- service-images bucket.
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

drop policy if exists "public reads gallery" on storage.objects;
create policy "public reads gallery"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'gallery');

drop policy if exists "admins write gallery" on storage.objects;
create policy "admins write gallery"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'gallery' and is_admin());

drop policy if exists "admins update gallery" on storage.objects;
create policy "admins update gallery"
  on storage.objects for update to authenticated
  using (bucket_id = 'gallery' and is_admin())
  with check (bucket_id = 'gallery' and is_admin());

drop policy if exists "admins delete gallery" on storage.objects;
create policy "admins delete gallery"
  on storage.objects for delete to authenticated
  using (bucket_id = 'gallery' and is_admin());

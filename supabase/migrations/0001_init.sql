-- =====================================================================
-- 0001_init.sql — schema, helper functions, RLS
-- =====================================================================

-- ============ SERVICES ============
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  short_description text,
  body text,
  icon text,                      -- lucide icon name
  image_url text,
  price_from numeric(10,2),
  duration_minutes int,
  display_order int default 0,
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============ APPOINTMENTS ============
do $$ begin
  create type appointment_status as enum
    ('pending','confirmed','completed','cancelled','no_show');
exception when duplicate_object then null; end $$;

create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text,
  phone text not null,
  service_id uuid references services(id) on delete set null,
  preferred_date date not null,
  preferred_time_slot text not null,   -- e.g. '10:00-10:30'
  message text,
  status appointment_status default 'pending',
  admin_notes text,
  created_at timestamptz default now()
);
create index if not exists appointments_date_status_idx
  on appointments (preferred_date, status);

-- ============ AVAILABILITY ============
create table if not exists availability_rules (
  id uuid primary key default gen_random_uuid(),
  day_of_week int not null check (day_of_week between 0 and 6),
  start_time time not null,
  end_time time not null,
  slot_minutes int default 30,
  is_active boolean default true
);

create table if not exists blocked_dates (
  id uuid primary key default gen_random_uuid(),
  blocked_date date not null unique,
  reason text
);

-- ============ BLOG ============
create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content text not null,           -- markdown
  cover_image_url text,
  tags text[] default '{}',
  reading_minutes int,
  is_published boolean default false,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists posts_published_idx
  on posts (is_published, published_at desc);

-- ============ TESTIMONIALS ============
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  patient_name text not null,
  rating int check (rating between 1 and 5),
  quote text not null,
  is_approved boolean default false,
  display_order int default 0,
  created_at timestamptz default now()
);

-- ============ CONTACT MESSAGES ============
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);

-- ============ FAQ ============
create table if not exists faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  display_order int default 0,
  is_published boolean default true
);

-- ============ SITE SETTINGS (single row) ============
create table if not exists site_settings (
  id int primary key default 1 check (id = 1),
  clinic_name text,
  phone text,
  whatsapp text,
  email text,
  address text,
  google_maps_embed text,
  facebook_url text,
  instagram_url text,
  linkedin_url text,
  hero_headline text,
  hero_subheadline text,
  updated_at timestamptz default now()
);

-- ============ ADMIN ROLES ============
create table if not exists admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text default 'admin',
  created_at timestamptz default now()
);

-- ============ SUBMISSION LOG (rate limiting) ============
create table if not exists submission_log (
  id uuid primary key default gen_random_uuid(),
  ip_hash text not null,
  form_type text not null,          -- 'appointment' | 'contact'
  created_at timestamptz default now()
);
create index if not exists submission_log_lookup_idx
  on submission_log (ip_hash, form_type, created_at desc);

-- ============ updated_at TRIGGER ============
create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end $$ language plpgsql;

drop trigger if exists services_updated_at on services;
create trigger services_updated_at before update on services
  for each row execute function set_updated_at();

drop trigger if exists posts_updated_at on posts;
create trigger posts_updated_at before update on posts
  for each row execute function set_updated_at();

drop trigger if exists site_settings_updated_at on site_settings;
create trigger site_settings_updated_at before update on site_settings
  for each row execute function set_updated_at();

-- =====================================================================
-- ROW LEVEL SECURITY
-- =====================================================================
create or replace function is_admin() returns boolean as $$
  select exists (select 1 from admin_users where user_id = auth.uid());
$$ language sql security definer stable;

alter table services            enable row level security;
alter table appointments        enable row level security;
alter table availability_rules  enable row level security;
alter table blocked_dates       enable row level security;
alter table posts               enable row level security;
alter table testimonials        enable row level security;
alter table contact_messages    enable row level security;
alter table faqs                enable row level security;
alter table site_settings       enable row level security;
alter table admin_users         enable row level security;
alter table submission_log      enable row level security;

-- ---- SERVICES ----
drop policy if exists "public read published services" on services;
create policy "public read published services"
  on services for select to anon, authenticated
  using (is_published = true);

drop policy if exists "admin manage services" on services;
create policy "admin manage services"
  on services for all to authenticated
  using (is_admin()) with check (is_admin());

-- ---- POSTS ----
drop policy if exists "public read published posts" on posts;
create policy "public read published posts"
  on posts for select to anon, authenticated
  using (is_published = true);

drop policy if exists "admin manage posts" on posts;
create policy "admin manage posts"
  on posts for all to authenticated
  using (is_admin()) with check (is_admin());

-- ---- FAQS ----
drop policy if exists "public read published faqs" on faqs;
create policy "public read published faqs"
  on faqs for select to anon, authenticated
  using (is_published = true);

drop policy if exists "admin manage faqs" on faqs;
create policy "admin manage faqs"
  on faqs for all to authenticated
  using (is_admin()) with check (is_admin());

-- ---- TESTIMONIALS ----
drop policy if exists "public read approved testimonials" on testimonials;
create policy "public read approved testimonials"
  on testimonials for select to anon, authenticated
  using (is_approved = true);

drop policy if exists "admin manage testimonials" on testimonials;
create policy "admin manage testimonials"
  on testimonials for all to authenticated
  using (is_admin()) with check (is_admin());

-- ---- SITE SETTINGS ----
drop policy if exists "public read site settings" on site_settings;
create policy "public read site settings"
  on site_settings for select to anon, authenticated
  using (true);

drop policy if exists "admin manage site settings" on site_settings;
create policy "admin manage site settings"
  on site_settings for all to authenticated
  using (is_admin()) with check (is_admin());

-- ---- AVAILABILITY (public read: needed to compute open slots) ----
drop policy if exists "public read availability" on availability_rules;
create policy "public read availability"
  on availability_rules for select to anon, authenticated
  using (is_active = true);

drop policy if exists "admin manage availability" on availability_rules;
create policy "admin manage availability"
  on availability_rules for all to authenticated
  using (is_admin()) with check (is_admin());

drop policy if exists "public read blocked dates" on blocked_dates;
create policy "public read blocked dates"
  on blocked_dates for select to anon, authenticated
  using (true);

drop policy if exists "admin manage blocked dates" on blocked_dates;
create policy "admin manage blocked dates"
  on blocked_dates for all to authenticated
  using (is_admin()) with check (is_admin());

-- ---- APPOINTMENTS: insert-only for the public, never selectable ----
drop policy if exists "anyone can request appointment" on appointments;
create policy "anyone can request appointment"
  on appointments for insert to anon, authenticated with check (true);

drop policy if exists "admin reads appointments" on appointments;
create policy "admin reads appointments"
  on appointments for select to authenticated using (is_admin());

drop policy if exists "admin updates appointments" on appointments;
create policy "admin updates appointments"
  on appointments for update to authenticated
  using (is_admin()) with check (is_admin());

drop policy if exists "admin deletes appointments" on appointments;
create policy "admin deletes appointments"
  on appointments for delete to authenticated using (is_admin());

-- ---- CONTACT MESSAGES: same shape ----
drop policy if exists "anyone can send message" on contact_messages;
create policy "anyone can send message"
  on contact_messages for insert to anon, authenticated with check (true);

drop policy if exists "admin reads contact messages" on contact_messages;
create policy "admin reads contact messages"
  on contact_messages for select to authenticated using (is_admin());

drop policy if exists "admin updates contact messages" on contact_messages;
create policy "admin updates contact messages"
  on contact_messages for update to authenticated
  using (is_admin()) with check (is_admin());

drop policy if exists "admin deletes contact messages" on contact_messages;
create policy "admin deletes contact messages"
  on contact_messages for delete to authenticated using (is_admin());

-- ---- ADMIN USERS: readable only by admins, writable only by service role ----
drop policy if exists "admin reads admin users" on admin_users;
create policy "admin reads admin users"
  on admin_users for select to authenticated using (is_admin());

-- ---- SUBMISSION LOG ----
-- RLS enabled with no policies => denied for anon/authenticated.
-- Only the service-role client (server-side) can read or write it.

-- =====================================================================
-- SLOT AVAILABILITY (used by the booking flow)
-- =====================================================================
create or replace function available_slots(target_date date)
returns table (slot text) as $$
declare
  rule record;
  cur time;
begin
  if target_date < current_date then return; end if;
  if exists (select 1 from blocked_dates where blocked_date = target_date) then return; end if;

  for rule in
    select * from availability_rules
    where is_active = true
      and day_of_week = extract(dow from target_date)::int
    order by start_time
  loop
    cur := rule.start_time;
    while cur + (rule.slot_minutes || ' minutes')::interval <= rule.end_time loop
      slot := to_char(cur, 'HH24:MI') || '-' ||
              to_char(cur + (rule.slot_minutes || ' minutes')::interval, 'HH24:MI');
      if not exists (
        select 1 from appointments a
        where a.preferred_date = target_date
          and a.preferred_time_slot = slot
          and a.status in ('pending','confirmed')
      ) then
        return next;
      end if;
      cur := cur + (rule.slot_minutes || ' minutes')::interval;
    end loop;
  end loop;
end $$ language plpgsql security definer stable;

grant execute on function available_slots(date) to anon, authenticated;

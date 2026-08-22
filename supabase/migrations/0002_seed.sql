-- =====================================================================
-- 0002_seed.sql — placeholder content. ALL copy is placeholder text.
-- No real credentials, medical claims, or patient testimonials are implied.
-- Replace every value from /admin before going live.
-- =====================================================================

-- ============ SITE SETTINGS ============
insert into site_settings (
  id, clinic_name, phone, whatsapp, email, address,
  google_maps_embed, facebook_url, instagram_url, linkedin_url,
  hero_headline, hero_subheadline
) values (
  1,
  '[CLINIC NAME]',
  '+92 300 0000000',
  '+92 300 0000000',
  'info@example.com',
  '[Street address], [City], Pakistan',
  '',
  '', '', '',
  '[One-line value proposition goes here]',
  '[Supporting sentence: who you help, and how they can book.]'
)
on conflict (id) do nothing;

-- ============ AVAILABILITY: Mon–Sat, morning + evening ============
insert into availability_rules (day_of_week, start_time, end_time, slot_minutes, is_active)
select d, '10:00', '13:00', 30, true from generate_series(1, 6) as d
where not exists (
  select 1 from availability_rules
  where day_of_week = d and start_time = '10:00'
);

insert into availability_rules (day_of_week, start_time, end_time, slot_minutes, is_active)
select d, '17:00', '20:00', 30, true from generate_series(1, 5) as d
where not exists (
  select 1 from availability_rules
  where day_of_week = d and start_time = '17:00'
);

-- ============ SERVICES ============
insert into services (slug, title, short_description, body, icon, duration_minutes, display_order, is_published) values
('general-consultation', '[Service 1 — General Consultation]',
 '[One-line description of this service.]',
 E'## What to expect\n\n[Replace this markdown with a description of the consultation: what is assessed, how long it takes, what the patient should bring.]\n\n## Who it is for\n\n[Placeholder text.]',
 'Stethoscope', 30, 1, true),
('routine-checkup', '[Service 2 — Routine Check-up]',
 '[One-line description of this service.]',
 E'## What to expect\n\n[Placeholder markdown body.]',
 'ClipboardCheck', 30, 2, true),
('chronic-care', '[Service 3 — Chronic Condition Follow-up]',
 '[One-line description of this service.]',
 E'## What to expect\n\n[Placeholder markdown body.]',
 'HeartPulse', 30, 3, true),
('lab-review', '[Service 4 — Lab Report Review]',
 '[One-line description of this service.]',
 E'## What to expect\n\n[Placeholder markdown body.]',
 'FlaskConical', 20, 4, true),
('preventive-screening', '[Service 5 — Preventive Screening]',
 '[One-line description of this service.]',
 E'## What to expect\n\n[Placeholder markdown body.]',
 'ShieldCheck', 30, 5, true),
('teleconsultation', '[Service 6 — Teleconsultation]',
 '[One-line description of this service.]',
 E'## What to expect\n\n[Placeholder markdown body.]',
 'Video', 20, 6, true)
on conflict (slug) do nothing;

-- ============ FAQS ============
insert into faqs (question, answer, display_order, is_published) values
('[How do I book an appointment?]', '[Placeholder answer — describe the booking process.]', 1, true),
('[What should I bring to my visit?]', '[Placeholder answer.]', 2, true),
('[Do you accept insurance or panel patients?]', '[Placeholder answer.]', 3, true),
('[What are the clinic timings?]', '[Placeholder answer — keep in sync with /admin/settings.]', 4, true),
('[Is a follow-up visit charged separately?]', '[Placeholder answer.]', 5, true),
('[Do you offer online consultations?]', '[Placeholder answer.]', 6, true)
on conflict do nothing;

-- ============ POSTS ============
insert into posts (slug, title, excerpt, content, tags, reading_minutes, is_published, published_at) values
('sample-post-one', '[Sample Article One]', '[One or two sentences summarising the article.]',
 E'## Placeholder heading\n\n[Replace this body with your own article. Markdown is supported: **bold**, _italic_, lists, links, and headings.]\n\n- [Point one]\n- [Point two]\n\n> [Pull quote placeholder.]\n\n## Another heading\n\n[More placeholder text.]',
 array['[tag-one]','[tag-two]'], 3, true, now() - interval '2 days'),
('sample-post-two', '[Sample Article Two]', '[One or two sentences summarising the article.]',
 E'## Placeholder heading\n\n[Replace this body with your own article.]',
 array['[tag-one]'], 4, true, now() - interval '7 days'),
('sample-post-three', '[Sample Article Three]', '[One or two sentences summarising the article.]',
 E'## Placeholder heading\n\n[Replace this body with your own article.]',
 array['[tag-three]'], 2, true, now() - interval '14 days'),
('sample-draft', '[Unpublished Draft]', '[This one is a draft and should not appear publicly.]',
 E'[Draft body.]', array['[tag-two]'], 2, false, null)
on conflict (slug) do nothing;

-- ============ TESTIMONIALS ============
-- Seeded UNAPPROVED and clearly marked. Publish only real, consented quotes.
insert into testimonials (patient_name, rating, quote, is_approved, display_order) values
('[Patient name]', 5, '[PLACEHOLDER — replace with a real, consented patient testimonial before approving.]', false, 1),
('[Patient name]', 5, '[PLACEHOLDER — replace with a real, consented patient testimonial before approving.]', false, 2),
('[Patient name]', 4, '[PLACEHOLDER — replace with a real, consented patient testimonial before approving.]', false, 3)
on conflict do nothing;

-- =====================================================================
-- FIRST ADMIN USER
-- =====================================================================
-- Users are created through Supabase Auth, not SQL. Steps:
--   1. Supabase Dashboard -> Authentication -> Users -> "Add user"
--      (set a password, tick "Auto Confirm User").
--   2. Run:  select promote_admin('you@example.com');
create or replace function promote_admin(user_email text)
returns text as $$
declare uid uuid;
begin
  select id into uid from auth.users where email = lower(user_email);
  if uid is null then
    return 'No auth user found for ' || user_email || ' — create the user first.';
  end if;
  insert into admin_users (user_id) values (uid) on conflict (user_id) do nothing;
  return 'Granted admin to ' || user_email;
end $$ language plpgsql security definer;

-- NOTE: revoking from anon/authenticated alone is NOT enough — Postgres
-- grants EXECUTE to PUBLIC by default and those roles inherit it.
-- See 0003_function_privileges.sql, which revokes from PUBLIC.
revoke all on function promote_admin(text) from public;
revoke all on function promote_admin(text) from anon, authenticated;

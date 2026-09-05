-- Editable website copy.
--
-- Every block of text on the public site has a default in code
-- (lib/content/registry.ts). A row here overrides that default for one group
-- of copy -- "home.about", "footer", and so on -- and the value is the shape
-- that group declares. Nothing is required: a group with no row renders its
-- code default, which is what keeps the site working on a fresh database.
--
-- jsonb rather than a column per string, because the shape differs per group
-- and the alternative is a migration every time a sentence is added.

create table if not exists site_content (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);

comment on table site_content is
  'Per-group overrides of the copy defined in lib/content/registry.ts.';

alter table site_content enable row level security;

-- The public site reads this on every page, anonymously.
create policy "public read site content"
  on site_content for select
  using (true);

create policy "admin manage site content"
  on site_content for all
  to authenticated
  using (is_admin()) with check (is_admin());

create or replace function touch_site_content() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists site_content_touch on site_content;
create trigger site_content_touch
  before update on site_content
  for each row execute function touch_site_content();

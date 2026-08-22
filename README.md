# Clinic website — Next.js + Supabase

Production-ready website for a medical practice: a public marketing site plus a
private admin dashboard for appointments, services, blog posts, testimonials and
site settings.

**All copy is placeholder text in `[SQUARE BRACKETS]`.** Nothing here asserts a
real credential, medical claim or patient testimonial — replace every bracketed
string before you publish.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router), TypeScript strict |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Database | Supabase Postgres (RLS on every table) |
| Auth | Supabase Auth, email + password, admin-only |
| Forms | Server Actions + Zod (client and server validation) |
| Email | Resend |
| Icons / dates | lucide-react, date-fns |
| Deployment | Vercel |

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev
```

The site runs without Supabase configured — public pages render with empty
content instead of crashing — but booking, the blog and the admin area need a
database.

## Environment variables

| Variable | Where | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | same page | Public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | same page | **Server only.** Rate-limit log. Never expose to the browser |
| `RESEND_API_KEY` | resend.com → API Keys | Sends confirmation emails |
| `EMAIL_FROM` | — | e.g. `Clinic <noreply@yourdomain.com>` (verified domain) |
| `CLINIC_NOTIFICATION_EMAIL` | — | Inbox that receives new requests |
| `NEXT_PUBLIC_SITE_URL` | — | Canonical URL, e.g. `https://clinic.com` |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | optional | Reserved for Cloudflare Turnstile |

Emails are skipped with a console warning when `RESEND_API_KEY` is absent — a
missing key never fails a patient's booking.

## Database setup

Run both migrations against your project, in order:

```bash
npx supabase link --project-ref <your-project-ref>
npx supabase db push
```

Or paste `supabase/migrations/0001_init.sql` then `0002_seed.sql` into the
Supabase SQL editor.

`0001_init.sql` creates every table, the `available_slots()` booking function,
and Row Level Security policies:

- **Public read** of *published* services, posts, FAQs and *approved*
  testimonials; site settings are readable by everyone.
- **Appointments and contact messages**: `anon` may `INSERT` only. They are
  never publicly selectable — patient data does not leak.
- **`submission_log`** (rate limiting) has RLS on and no policies, so only the
  service-role key can touch it.
- **Everything else** requires `is_admin()`, i.e. a row in `admin_users`.

`0002_seed.sql` adds placeholder services, FAQs, posts, availability rules
(Mon–Sat mornings, Mon–Fri evenings) and unapproved placeholder testimonials.

### Creating the first admin user

There is no public sign-up. Create the user, then grant it admin:

1. Supabase Dashboard → **Authentication → Users → Add user**. Set a password
   and tick **Auto Confirm User**.
2. In the SQL editor: `select promote_admin('you@example.com');`

Sign in at `/admin/login`. A valid session alone is not enough — both the
middleware and every server action check `admin_users` membership.

### Regenerating database types

`types/database.types.ts` is hand-authored to match the migrations. After you
change the schema:

```bash
npx supabase gen types typescript --project-id <ref> > types/database.types.ts
```

## Project structure

```
app/(public)/        home, about, services, blog, appointment, contact, faq, legal
app/(auth)/          /admin/login (outside the authenticated shell)
app/(admin)/admin/   dashboard, appointments, services, blog, testimonials, settings
app/actions/         server actions: appointments, contact, auth, admin CRUD
components/ui/       shadcn primitives
components/sections/ home-page sections
components/admin/    admin sidebar, forms, markdown editor
lib/supabase/        client.ts (browser), server.ts (RLS), admin.ts (service role), middleware.ts
lib/validations/     Zod schemas shared by client and server
supabase/migrations/ schema + RLS + seed
```

## How the booking flow works

1. The patient picks a date; past dates and `blocked_dates` are rejected.
2. `available_slots(date)` generates slots from `availability_rules` for that
   weekday and subtracts `pending`/`confirmed` bookings.
3. Zod validates on the client and again in the Server Action, including a
   Pakistani phone format.
4. The slot is re-checked server-side before insert, so a stale page cannot
   double-book.
5. The row is inserted as `pending`; Resend emails the patient and the clinic.
   The patient sees a reference number like `APT-1A2B3C4D`.
6. In `/admin/appointments`, moving a request to **confirmed** emails the
   patient.

The date step is its own `<form>` posting to a Server Action, so the flow still
works with JavaScript disabled.

## Security

- Middleware guards `/admin/*`, verifying with `supabase.auth.getUser()` (not
  `getSession()`) and checking `admin_users`. `requireAdmin()` repeats both
  checks in every admin page and action.
- Public forms are rate limited to 3 submissions per IP per hour via the
  `submission_log` table. IPs are SHA-256 hashed, never stored raw. The limiter
  fails open so a database problem cannot block real patients.
- Honeypot field plus a minimum time-on-form check on every public form.
- Markdown is rendered through `rehype-sanitize`.
- `next.config.ts` sets CSP, `X-Frame-Options: DENY`, `Referrer-Policy`,
  `Permissions-Policy`, HSTS and `nosniff`.
- The booking form carries a non-emergency disclaimer with the local emergency
  number, and stores no health data beyond a free-text note.

## SEO

Per-page `generateMetadata` with canonicals and OpenGraph images; JSON-LD for
`Physician`/`MedicalBusiness`, `Article`, `FAQPage` and `BreadcrumbList`;
dynamic `sitemap.ts` and `robots.ts` (admin and the booking-success page are
disallowed); ISR (`revalidate = 3600`) on public pages with `revalidatePath`
after every admin edit.

## Accessibility

Skip link, semantic landmarks, labelled fields with `role="alert"` +
`aria-live` error messages, visible focus rings, `aria-current` navigation,
keyboard-operable testimonial carousel, alt text on images, 17px base body size,
and full `prefers-reduced-motion` support.

## Deploying to Vercel

1. Push the repo to GitHub.
2. Vercel → **New Project** → import the repo (framework auto-detects).
3. Add every variable from `.env.example` under **Settings → Environment
   Variables**. Set `NEXT_PUBLIC_SITE_URL` to the production domain.
4. Deploy, then in Supabase → **Authentication → URL Configuration** add the
   production URL to the allowed redirect URLs.
5. Verify your sending domain in Resend and update `EMAIL_FROM`.

## Before you go live

- Replace every `[BRACKETED]` string: `lib/site.ts`, the page bodies, and the
  seeded rows in `/admin`.
- Swap `public/placeholder-portrait.svg` and `public/placeholder-wide.svg` for
  real photography.
- Fill in real trust-bar figures in `lib/site.ts` (they are all `0`).
- Delete the placeholder testimonials; publish only consented, real quotes.
- Have a lawyer review `/privacy` and `/terms`.
- Confirm the emergency number in `lib/site.ts` is right for your country.

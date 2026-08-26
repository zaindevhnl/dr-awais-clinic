import type { Service, SiteSettings } from "@/types/database.types";

/**
 * Static, build-time site constants. Anything the clinic edits at runtime
 * lives in the `site_settings` table instead (see lib/data.ts).
 * Fields still wrapped in [BRACKETS] are placeholders awaiting content.
 */
export const SITE = {
  doctorName: "Dr. Awais Malik",
  credentials: "MBBS, FCPS",
  specialty: "Bariatric & Laparoscopic Surgeon",
  city: "Lahore",
  country: "Pakistan",
  countryCode: "PK",
  locale: "en-PK",
  currency: "PKR",
  /** Shown on the booking form emergency disclaimer. */
  emergencyNumber: "1122",
  emergencyLabel: "Rescue 1122",
  /**
   * Canonical origin. Override per environment with NEXT_PUBLIC_SITE_URL;
   * the fallback is the live domain so metadata is correct even if the env
   * var is missing on a deployment.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    (process.env.NODE_ENV === "production"
      ? "https://www.drawaismalik.com"
      : "http://localhost:3000"),
} as const;

/** Used whenever the database is unreachable or the settings row is missing. */
export const FALLBACK_SETTINGS: SiteSettings = {
  id: 1,
  clinic_name: "Safe Surgical Care by Dr. Awais Malik",
  phone: "+92 300 0000000",
  whatsapp: "+92 300 0000000",
  email: "info@example.com",
  address: "[Street address], [City], Pakistan",
  google_maps_embed: "",
  facebook_url: "",
  instagram_url: "",
  linkedin_url: "",
  hero_headline: "[One-line value proposition goes here]",
  hero_subheadline:
    "[Supporting sentence: who you help, and how they can book.]",
  updated_at: new Date(0).toISOString(),
};

/**
 * The practice's published catalogue, mirrored in code.
 *
 * These twelve procedures live in the `services` table and are edited at
 * /admin/services -- the database is the source of truth. This copy is the
 * fallback used only when the database cannot be reached at all, so the
 * services page never renders an empty shell to a patient because of a
 * misconfigured deployment.
 *
 * It is NOT used when the database answers with zero rows: an admin who
 * unpublishes everything gets an empty page, as they intended.
 *
 * Keep in step with the table if procedures change.
 */
export const FALLBACK_SERVICES = [
  {
    slug: "comprehensive-breast-surgery",
    title: "Comprehensive Breast Surgery",
    short_description:
      "Advanced diagnostic and therapeutic surgical interventions for benign and malignant breast conditions, prioritizing oncoplastic cosmetic techniques and minimally invasive care.",
    icon: "Ribbon",
  },
  {
    slug: "minimally-invasive-thyroid-surgery",
    title: "Minimally Invasive Thyroid Surgery",
    short_description:
      "Advanced surgical intervention for thyroid nodules, large goiters, and thyroid cancer utilizing precise structure preservation techniques and cosmetic-grade minimal scarring.",
    icon: "Scan",
  },
  {
    slug: "revisional-bariatric-surgery",
    title: "Revisional Bariatric Surgery",
    short_description:
      "Highly specialized surgical correction or conversion of a previous weight loss procedure to effectively address complications, weight regain, or inadequate primary results.",
    icon: "Target",
  },
  {
    slug: "obesity-diabetes-metabolic-surgery",
    title: "Obesity & Diabetes Surgery (Metabolic Surgery)",
    short_description:
      "Advanced metabolic surgery that targets the root causes of Type 2 Diabetes and chronic obesity, triggering powerful hormonal shifts for permanent blood sugar control.",
    icon: "Gauge",
  },
  {
    slug: "mini-gastric-bypass-oagb",
    title: "Mini Gastric Bypass (OAGB)",
    short_description:
      "A simplified, highly efficient version of traditional gastric bypass that utilizes a single intestinal connection to deliver outstanding weight loss and rapid diabetes remission.",
    icon: "Waves",
  },
  {
    slug: "roux-en-y-gastric-bypass-rygb",
    title: "Roux-en-Y Gastric Bypass (RYGB)",
    short_description:
      'The clinical "gold standard" weight loss procedure that creates a small stomach pouch and reroutes the digestive tract to restrict food intake and reduce calorie absorption.',
    icon: "Sparkles",
  },
  {
    slug: "sleeve-gastrectomy",
    title: "Sleeve Gastrectomy (Gastric Sleeve Surgery)",
    short_description:
      "A premier minimally invasive weight loss surgery that removes approximately 80% of the stomach to structurally restrict food intake and permanently suppress appetite.",
    icon: "Weight",
  },
  {
    slug: "laparoscopic-intestine-surgery",
    title: "Laparoscopic Intestine Surgery",
    short_description:
      "Advanced, minimally invasive laparoscopic surgery for complex intestinal conditions including structural obstructions, painful adhesions, and tumors with rapid bowel function recovery.",
    icon: "Slice",
  },
  {
    slug: "laparoscopic-ventral-hernia-repair",
    title: "Laparoscopic Ventral Hernia Repair",
    short_description:
      "Specialized, minimally invasive repair for ventral and incisional hernias utilizing advanced mesh placement behind the abdominal wall for maximum structural strength.",
    icon: "Layers",
  },
  {
    slug: "laparoscopic-hiatal-hernia-surgery",
    title: "Laparoscopic Hiatal Hernia Surgery",
    short_description:
      "Advanced laparoscopic repair and Nissen fundoplication to treat hiatal hernias, providing a permanent solution for severe acid reflux, chronic heartburn, and swallowing difficulties.",
    icon: "Flame",
  },
  {
    slug: "advanced-laparoscopic-hernia-repair",
    title: "Advanced Laparoscopic Hernia Repair",
    short_description:
      "State-of-the-art, minimally invasive hernia repair for inguinal, ventral, umbilical, and hiatal hernias utilizing premium mesh reinforcement for a faster, pain-free recovery.",
    icon: "Shield",
  },
  {
    slug: "laparoscopic-gallbladder-surgery",
    title: "Laparoscopic Gallbladder Surgery",
    short_description:
      "A minimally invasive laparoscopic procedure to remove the gallbladder, providing permanent relief from painful gallstones with minimal scarring and rapid recovery.",
    icon: "Donut",
  },
].map((s, i) => ({
  ...s,
  id: `fallback-${s.slug}`,
  body: null,
  image_url: `/services/${s.slug}.svg`,
  price_from: null,
  duration_minutes: null,
  display_order: i + 1,
  is_published: true,
  created_at: new Date(0).toISOString(),
  updated_at: new Date(0).toISOString(),
})) satisfies Service[];

export const PUBLIC_NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Health Articles" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

export const ADMIN_NAV = [
  { href: "/admin", label: "Overview", icon: "LayoutDashboard" },
  { href: "/admin/appointments", label: "Appointments", icon: "CalendarCheck" },
  { href: "/admin/services", label: "Services", icon: "Stethoscope" },
  { href: "/admin/blog", label: "Blog", icon: "Newspaper" },
  { href: "/admin/testimonials", label: "Testimonials", icon: "Quote" },
  { href: "/admin/settings", label: "Settings", icon: "Settings" },
] as const;

/** Placeholder trust-bar figures — replace with verified numbers. */
/** Figures confirmed by the clinic. */
export const TRUST_STATS = [
  { value: 10, suffix: "+", label: "Years of experience" },
  { value: 20000, suffix: "+", label: "Successful surgeries" },
  { value: 2, suffix: "", label: "Hospital affiliations" },
] as const;

export const DIFFERENTIATORS = [
  {
    icon: "CalendarClock",
    title: "[Differentiator one]",
    body: "[One or two sentences of placeholder text.]",
  },
  {
    icon: "MessagesSquare",
    title: "[Differentiator two]",
    body: "[One or two sentences of placeholder text.]",
  },
  {
    icon: "ShieldCheck",
    title: "[Differentiator three]",
    body: "[One or two sentences of placeholder text.]",
  },
  {
    icon: "HeartHandshake",
    title: "[Differentiator four]",
    body: "[One or two sentences of placeholder text.]",
  },
] as const;

/** Displayed in the footer; edit here or wire to availability_rules. */
export const CLINIC_HOURS = [
  { day: "Monday – Friday", hours: "10:00 – 13:00, 17:00 – 20:00" },
  { day: "Saturday", hours: "10:00 – 13:00" },
  { day: "Sunday", hours: "Closed" },
] as const;

export function telHref(phone?: string | null) {
  return `tel:${(phone ?? "").replace(/[^\d+]/g, "")}`;
}

export function whatsappHref(number?: string | null) {
  const digits = (number ?? "").replace(/\D/g, "");
  return `https://wa.me/${digits}`;
}

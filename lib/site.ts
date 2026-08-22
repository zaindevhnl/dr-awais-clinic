import type { SiteSettings } from "@/types/database.types";

/**
 * Static, build-time site constants. Anything the clinic edits at runtime
 * lives in the `site_settings` table instead (see lib/data.ts).
 * All copy here is PLACEHOLDER — replace before launch.
 */
export const SITE = {
  doctorName: "[DOCTOR NAME]",
  credentials: "[QUALIFICATIONS]",
  specialty: "[SPECIALTY]",
  city: "[CITY]",
  country: "Pakistan",
  countryCode: "PK",
  locale: "en-PK",
  currency: "PKR",
  /** Shown on the booking form emergency disclaimer. */
  emergencyNumber: "1122",
  emergencyLabel: "Rescue 1122",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "http://localhost:3000",
} as const;

/** Used whenever the database is unreachable or the settings row is missing. */
export const FALLBACK_SETTINGS: SiteSettings = {
  id: 1,
  clinic_name: "[CLINIC NAME]",
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
export const TRUST_STATS = [
  { value: 0, suffix: "+", label: "[Years of experience]" },
  { value: 0, suffix: "+", label: "[Patients treated]" },
  { value: 0, suffix: "", label: "[Qualifications]" },
  { value: 0, suffix: "", label: "[Hospital affiliations]" },
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

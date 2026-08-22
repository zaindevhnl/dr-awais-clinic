import { z } from "zod";

/**
 * Pakistan phone numbers: +92 3XX XXXXXXX, 0092…, or 03XX-XXXXXXX.
 * Landlines with area codes (e.g. 042 XXXXXXXX) are accepted too.
 */
const PK_PHONE = /^(?:\+92|0092|92|0)?3\d{9}$|^(?:\+92|0092|92|0)?\d{2,4}\d{6,8}$/;

export const phoneSchema = z
  .string()
  .trim()
  .min(7, "Enter a valid phone number")
  .max(20, "Enter a valid phone number")
  .refine((v) => PK_PHONE.test(v.replace(/[\s()-]/g, "")), {
    message: "Enter a valid Pakistani phone number, e.g. 0300 1234567",
  });

/** Bot traps shared by every public form. */
export const antiBotSchema = z.object({
  // Honeypot: must stay empty.
  website: z.string().max(0, "Submission rejected").optional().default(""),
  // Milliseconds the form was on screen before submit.
  elapsedMs: z.coerce.number().min(0).optional().default(0),
});

export const MIN_FORM_SECONDS = 3;

export const appointmentSchema = antiBotSchema.extend({
  full_name: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(120, "Name is too long"),
  phone: phoneSchema,
  email: z
    .union([z.string().trim().email("Enter a valid email address"), z.literal("")])
    .optional()
    .transform((v) => (v ? v : null)),
  service_id: z
    .union([z.string().uuid(), z.literal("")])
    .optional()
    .transform((v) => (v ? v : null)),
  preferred_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a date")
    .refine((v) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return new Date(`${v}T00:00:00`) >= today;
    }, "Choose today or a future date"),
  preferred_time_slot: z.string().trim().min(3, "Choose a time slot"),
  message: z.string().trim().max(1000, "Message is too long").optional().default(""),
  consent: z
    .union([z.literal("on"), z.literal("true"), z.boolean()])
    .refine((v) => v === "on" || v === "true" || v === true, {
      message: "Please confirm this is not a medical emergency",
    }),
});

export type AppointmentInput = z.input<typeof appointmentSchema>;

/** Home-page mini form: name + phone + date only. */
export const quickBookingSchema = antiBotSchema.extend({
  full_name: z.string().trim().min(2, "Please enter your full name").max(120),
  phone: phoneSchema,
  preferred_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a date"),
});

export const contactSchema = antiBotSchema.extend({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.string().trim().email("Enter a valid email address"),
  subject: z.string().trim().max(160).optional().default(""),
  message: z
    .string()
    .trim()
    .min(10, "Please write at least a sentence")
    .max(2000, "Message is too long"),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const slug = z
  .string()
  .trim()
  .min(2)
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and dashes");

export const serviceSchema = z.object({
  slug,
  title: z.string().trim().min(2).max(160),
  short_description: z.string().trim().max(300).optional().default(""),
  body: z.string().trim().max(20000).optional().default(""),
  icon: z.string().trim().max(60).optional().default(""),
  image_url: z.union([z.string().url(), z.literal("")]).optional().default(""),
  price_from: z.coerce.number().min(0).nullable().optional(),
  duration_minutes: z.coerce.number().int().min(5).max(480).nullable().optional(),
  display_order: z.coerce.number().int().min(0).default(0),
  is_published: z.coerce.boolean().default(true),
});

export const postSchema = z.object({
  slug,
  title: z.string().trim().min(2).max(200),
  excerpt: z.string().trim().max(400).optional().default(""),
  content: z.string().trim().min(10, "Write some content"),
  cover_image_url: z.union([z.string().url(), z.literal("")]).optional().default(""),
  tags: z.string().trim().optional().default(""),
  is_published: z.coerce.boolean().default(false),
});

export const testimonialSchema = z.object({
  patient_name: z.string().trim().min(2).max(120),
  rating: z.coerce.number().int().min(1).max(5),
  quote: z.string().trim().min(5).max(1000),
  is_approved: z.coerce.boolean().default(false),
  display_order: z.coerce.number().int().min(0).default(0),
});

export const settingsSchema = z.object({
  clinic_name: z.string().trim().max(160).optional().default(""),
  phone: z.string().trim().max(40).optional().default(""),
  whatsapp: z.string().trim().max(40).optional().default(""),
  email: z
    .union([z.string().trim().email(), z.literal("")])
    .optional()
    .default(""),
  address: z.string().trim().max(400).optional().default(""),
  google_maps_embed: z.string().trim().max(4000).optional().default(""),
  facebook_url: z.union([z.string().url(), z.literal("")]).optional().default(""),
  instagram_url: z.union([z.string().url(), z.literal("")]).optional().default(""),
  linkedin_url: z.union([z.string().url(), z.literal("")]).optional().default(""),
  hero_headline: z.string().trim().max(200).optional().default(""),
  hero_subheadline: z.string().trim().max(400).optional().default(""),
});

export const appointmentStatusSchema = z.enum([
  "pending",
  "confirmed",
  "completed",
  "cancelled",
  "no_show",
]);

/**
 * Hand-authored to match supabase/migrations/0001_init.sql.
 * Regenerate against your own project once the migrations are applied:
 *   npx supabase gen types typescript --project-id <ref> > types/database.types.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "no_show";

type Timestamps = {
  created_at: string;
  updated_at: string;
};

export type Service = {
  id: string;
  slug: string;
  title: string;
  short_description: string | null;
  body: string | null;
  icon: string | null;
  image_url: string | null;
  price_from: number | null;
  duration_minutes: number | null;
  display_order: number;
  is_published: boolean;
} & Timestamps;

export type Appointment = {
  id: string;
  full_name: string;
  email: string | null;
  phone: string;
  service_id: string | null;
  preferred_date: string;
  preferred_time_slot: string;
  message: string | null;
  status: AppointmentStatus;
  admin_notes: string | null;
  created_at: string;
};

export type AvailabilityRule = {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  slot_minutes: number;
  is_active: boolean;
};

export type BlockedDate = {
  id: string;
  blocked_date: string;
  reason: string | null;
};

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  tags: string[];
  reading_minutes: number | null;
  is_published: boolean;
  published_at: string | null;
} & Timestamps;

export type Testimonial = {
  id: string;
  patient_name: string;
  rating: number | null;
  quote: string;
  is_approved: boolean;
  display_order: number;
  created_at: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
  display_order: number;
  is_published: boolean;
};

export type SiteSettings = {
  id: number;
  clinic_name: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  address: string | null;
  google_maps_embed: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  linkedin_url: string | null;
  hero_headline: string | null;
  hero_subheadline: string | null;
  updated_at: string;
};

export type AdminUser = {
  user_id: string;
  role: string;
  created_at: string;
};

export type SubmissionLog = {
  id: string;
  ip_hash: string;
  form_type: string;
  created_at: string;
};

/** Row / Insert / Update triple. `R` lists the columns required on insert. */
type TableShape<Row, R extends keyof Row, Rel = []> = {
  Row: Row;
  Insert: Pick<Row, R> & Partial<Row>;
  Update: Partial<Row>;
  Relationships: Rel;
};

/** appointments.service_id -> services.id, used by `select("*, services(title)")`. */
type AppointmentRelationships = [
  {
    foreignKeyName: "appointments_service_id_fkey";
    columns: ["service_id"];
    isOneToOne: false;
    referencedRelation: "services";
    referencedColumns: ["id"];
  },
];

export type SiteContent = {
  key: string;
  value: Record<string, Json>;
  updated_at: string;
  updated_by: string | null;
};

export type Database = {
  public: {
    Tables: {
      services: TableShape<Service, "slug" | "title">;
      appointments: TableShape<
        Appointment,
        "full_name" | "phone" | "preferred_date" | "preferred_time_slot",
        AppointmentRelationships
      >;
      availability_rules: TableShape<
        AvailabilityRule,
        "day_of_week" | "start_time" | "end_time"
      >;
      blocked_dates: TableShape<BlockedDate, "blocked_date">;
      posts: TableShape<Post, "slug" | "title" | "content">;
      testimonials: TableShape<Testimonial, "patient_name" | "quote">;
      contact_messages: TableShape<ContactMessage, "name" | "email" | "message">;
      faqs: TableShape<Faq, "question" | "answer">;
      site_settings: TableShape<SiteSettings, never>;
      site_content: TableShape<SiteContent, "key">;
      admin_users: TableShape<AdminUser, "user_id">;
      submission_log: TableShape<SubmissionLog, "ip_hash" | "form_type">;
    };
    Views: Record<never, never>;
    Functions: {
      available_slots: {
        Args: { target_date: string };
        Returns: { slot: string }[];
      };
      is_admin: { Args: Record<string, never>; Returns: boolean };
    };
    Enums: {
      appointment_status: AppointmentStatus;
    };
    CompositeTypes: Record<never, never>;
  };
};

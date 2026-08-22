import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { FALLBACK_SETTINGS } from "@/lib/site";
import type {
  Faq,
  Post,
  Service,
  SiteSettings,
  Testimonial,
} from "@/types/database.types";

/**
 * Every reader here degrades gracefully: if Supabase is not configured yet
 * (or is unreachable), public pages still render with empty content instead
 * of throwing. Admin screens surface the error explicitly.
 */
export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project-ref"),
  );
}

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  if (!isSupabaseConfigured()) return fallback;
  try {
    return await fn();
  } catch (error) {
    console.error("[data] query failed:", error);
    return fallback;
  }
}

export const getSettings = cache(async (): Promise<SiteSettings> => {
  return safe(async () => {
    const supabase = await createClient();
    const { data } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle();
    return (data as SiteSettings | null) ?? FALLBACK_SETTINGS;
  }, FALLBACK_SETTINGS);
});

export async function getServices(limit?: number): Promise<Service[]> {
  return safe(async () => {
    const supabase = await createClient();
    let query = supabase
      .from("services")
      .select("*")
      .eq("is_published", true)
      .order("display_order", { ascending: true });
    if (limit) query = query.limit(limit);
    const { data } = await query;
    return (data as Service[]) ?? [];
  }, []);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return safe(async () => {
    const supabase = await createClient();
    const { data } = await supabase
      .from("services")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();
    return (data as Service | null) ?? null;
  }, null);
}

export const POSTS_PER_PAGE = 6;

export async function getPosts({
  page = 1,
  tag,
  limit,
}: { page?: number; tag?: string; limit?: number } = {}): Promise<{
  posts: Post[];
  total: number;
}> {
  return safe(
    async () => {
      const supabase = await createClient();
      const perPage = limit ?? POSTS_PER_PAGE;
      const from = (page - 1) * perPage;

      let query = supabase
        .from("posts")
        .select("*", { count: "exact" })
        .eq("is_published", true)
        .order("published_at", { ascending: false })
        .range(from, from + perPage - 1);

      if (tag) query = query.contains("tags", [tag]);

      const { data, count } = await query;
      return { posts: (data as Post[]) ?? [], total: count ?? 0 };
    },
    { posts: [], total: 0 },
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return safe(async () => {
    const supabase = await createClient();
    const { data } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();
    return (data as Post | null) ?? null;
  }, null);
}

export async function getAllTags(): Promise<string[]> {
  const { posts } = await getPosts({ limit: 200 });
  return [...new Set(posts.flatMap((p) => p.tags ?? []))].sort();
}

export async function getFaqs(limit?: number): Promise<Faq[]> {
  return safe(async () => {
    const supabase = await createClient();
    let query = supabase
      .from("faqs")
      .select("*")
      .eq("is_published", true)
      .order("display_order", { ascending: true });
    if (limit) query = query.limit(limit);
    const { data } = await query;
    return (data as Faq[]) ?? [];
  }, []);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return safe(async () => {
    const supabase = await createClient();
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_approved", true)
      .order("display_order", { ascending: true });
    return (data as Testimonial[]) ?? [];
  }, []);
}

export async function getBlockedDates(): Promise<string[]> {
  return safe(async () => {
    const supabase = await createClient();
    const { data } = await supabase.from("blocked_dates").select("blocked_date");
    return ((data as { blocked_date: string }[]) ?? []).map(
      (row) => row.blocked_date,
    );
  }, []);
}

/** Free slots for a date: availability rules minus pending/confirmed bookings. */
export async function getAvailableSlots(date: string): Promise<string[]> {
  return safe(async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("available_slots", {
      target_date: date,
    });
    if (error) throw error;
    return ((data as { slot: string }[] | string[]) ?? []).map((row) =>
      typeof row === "string" ? row : row.slot,
    );
  }, []);
}

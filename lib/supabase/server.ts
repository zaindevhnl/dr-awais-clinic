import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { supabaseEnv } from "@/lib/supabase/env";
import type { Database } from "@/types/database.types";

/** Request-scoped client that respects RLS as the signed-in user (or anon). */
export async function createClient() {
  const env = supabaseEnv();
  if (!env) throw new Error("Supabase environment variables are not set");

  const cookieStore = await cookies();

  return createServerClient<Database>(
    env.url,
    env.anonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Called from a Server Component — middleware refreshes the session instead.
          }
        },
      },
    },
  );
}

/**
 * Cookie-free client for build-time contexts.
 *
 * `generateStaticParams` runs without an HTTP request, so calling
 * `cookies()` there throws and the route silently falls back to zero
 * prerendered params. This client reads as anon, which is all the
 * public slug lists need, and RLS still applies.
 *
 * Returns null when Supabase is unconfigured so builds still succeed.
 */
export function createStaticClient() {
  const env = supabaseEnv();
  if (!env) return null;

  return createSupabaseClient<Database>(env.url, env.anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

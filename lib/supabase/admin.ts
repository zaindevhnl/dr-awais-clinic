import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { supabaseEnv } from "@/lib/supabase/env";
import type { Database } from "@/types/database.types";

/**
 * Service-role client. Bypasses RLS — server-side only.
 * Never import this into a "use client" module.
 */
export function createAdminClient() {
  const env = supabaseEnv();
  if (!env) throw new Error("Supabase environment variables are not set");

  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");

  return createSupabaseClient<Database>(
    env.url,
    key,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}

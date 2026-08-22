import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
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

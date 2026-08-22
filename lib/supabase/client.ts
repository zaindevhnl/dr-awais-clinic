import { createBrowserClient } from "@supabase/ssr";
import { supabaseEnv } from "@/lib/supabase/env";
import type { Database } from "@/types/database.types";

export function createClient() {
  const env = supabaseEnv();
  if (!env) throw new Error("Supabase environment variables are not set");

  return createBrowserClient<Database>(env.url, env.anonKey);
}

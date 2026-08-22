import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { supabaseEnv } from "@/lib/supabase/env";

/**
 * Server-side gate for every admin screen and mutation.
 * Middleware also guards /admin/*, but never rely on it alone — Server
 * Actions can be invoked directly.
 */
export const requireAdmin = cache(async () => {
  // Without a database there is nothing to authorize against.
  if (!supabaseEnv()) redirect("/admin/login?error=not_configured");

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: adminRow } = await supabase
    .from("admin_users")
    .select("user_id, role")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!adminRow) redirect("/admin/login?error=not_authorized");

  return { user, supabase, role: adminRow.role ?? "admin" };
});

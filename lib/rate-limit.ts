import "server-only";
import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";

export const MAX_SUBMISSIONS_PER_HOUR = 3;

/** IPs are hashed before storage — we never keep a raw visitor IP. */
export async function clientIpHash() {
  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown";
  return createHash("sha256")
    .update(`${ip}:${process.env.SUPABASE_SERVICE_ROLE_KEY ?? "salt"}`)
    .digest("hex");
}

/**
 * Sliding one-hour window per IP per form, stored in `submission_log`.
 * Fails open (allows the request) if the log table is unreachable — a
 * broken limiter must not block real patients from booking.
 */
export async function checkRateLimit(
  formType: "appointment" | "contact",
): Promise<{ ok: boolean; retryAfterMinutes?: number }> {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return { ok: true };

  try {
    const supabase = createAdminClient();
    const ipHash = await clientIpHash();
    const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    const { data, error } = await supabase
      .from("submission_log")
      .select("created_at")
      .eq("ip_hash", ipHash)
      .eq("form_type", formType)
      .gte("created_at", since)
      .order("created_at", { ascending: true });

    if (error) throw error;

    const hits = data ?? [];
    if (hits.length >= MAX_SUBMISSIONS_PER_HOUR) {
      const oldest = new Date(hits[0].created_at).getTime();
      const retryAfterMinutes = Math.max(
        1,
        Math.ceil((oldest + 60 * 60 * 1000 - Date.now()) / 60000),
      );
      return { ok: false, retryAfterMinutes };
    }

    await supabase
      .from("submission_log")
      .insert({ ip_hash: ipHash, form_type: formType });

    return { ok: true };
  } catch (error) {
    console.error("[rate-limit] check failed, allowing request:", error);
    return { ok: true };
  }
}

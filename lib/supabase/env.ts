/**
 * Shared, runtime-safe env lookup. Deliberately dependency-free and free of
 * "server-only" so it can be imported from middleware (edge), Server
 * Components and Client Components alike.
 *
 * Returns null when Supabase has not been configured yet, so callers can
 * degrade gracefully instead of throwing — a site with no database should
 * still render, not 500.
 */
export function supabaseEnv(): { url: string; anonKey: string } | null {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!rawUrl || !anonKey) return null;
  // The value shipped in .env.example is not a real project.
  if (rawUrl.includes("your-project-ref")) return null;

  // Supabase's dashboard shows two similar values: the Project URL, and a
  // "RESTful endpoint" ending in /rest/v1/. Only the former belongs here —
  // supabase-js appends /rest/v1 (and /auth/v1, /storage/v1) itself, so the
  // endpoint form silently doubles the path and every request 404s, which
  // surfaces as an empty site and a login that rejects valid credentials.
  // Normalise rather than fail, since the mistake is easy to make.
  const url = rawUrl
    .trim()
    .replace(/\/+$/, "")
    .replace(/\/(rest|auth|storage)\/v1$/, "");

  if (!url) return null;

  return { url, anonKey: anonKey.trim() };
}

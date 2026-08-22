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
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) return null;
  // The value shipped in .env.example is not a real project.
  if (url.includes("your-project-ref")) return null;

  return { url, anonKey };
}

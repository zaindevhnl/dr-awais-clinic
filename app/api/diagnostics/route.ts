import { NextResponse } from "next/server";
import { supabaseEnv } from "@/lib/supabase/env";
import { createStaticClient } from "@/lib/supabase/server";

/**
 * TEMPORARY deployment diagnostic. Remove once the site is confirmed healthy.
 *
 * lib/data.ts wraps every read in safe(), which swallows the underlying
 * Supabase error and returns an empty result. That is right for visitors --
 * a database problem should not 500 the public site -- but it makes a
 * misconfigured deployment indistinguishable from an empty database from
 * the outside. This reports what the server actually sees.
 *
 * Deliberately leaks nothing secret: the project URL and the anon key are
 * both public by design (the anon key ships in the browser bundle and is
 * bounded by RLS). The service-role key is never touched here, and the key
 * itself is reported only as a length.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  const env = supabaseEnv();

  const report: Record<string, unknown> = {
    // What the raw variable holds, versus what supabaseEnv() normalises it to.
    rawUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? null,
    normalisedUrl: env?.url ?? null,
    anonKeyPresent: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    anonKeyLength: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length ?? 0,
    serviceRoleKeyPresent: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? null,
    configured: env !== null,
  };

  const supabase = createStaticClient();
  if (!supabase) {
    report.query = "no client — supabaseEnv() returned null";
    return NextResponse.json(report, { status: 200 });
  }

  const { data, error, status } = await supabase
    .from("services")
    .select("id,title")
    .eq("is_published", true)
    .limit(3);

  report.query = {
    httpStatus: status,
    rowsReturned: data?.length ?? 0,
    error: error ? { message: error.message, code: error.code } : null,
    sample: (data ?? []).map((row) => row.title),
  };

  return NextResponse.json(report, { status: 200 });
}

import "server-only";
import { cache } from "react";
import { createStaticClient } from "@/lib/supabase/server";
import { supabaseEnv } from "@/lib/supabase/env";
import { GROUPS, defaultsFor } from "@/lib/content/registry";

export { GROUPS, GROUP_BY_KEY, defaultsFor } from "@/lib/content/registry";
export type { Field, Group } from "@/lib/content/registry";

type Row = { key: string; value: Record<string, unknown> };

/**
 * Every saved override, keyed by group. Read with the cookie-free client so
 * public pages stay statically renderable, and cached per request so a page
 * rendering six sections issues one query.
 *
 * A missing table, an unconfigured database or a failed query all degrade to
 * "no overrides", which renders the defaults in code -- the site never breaks
 * because the copy could not be loaded.
 */
const loadOverrides = cache(async (): Promise<Map<string, Record<string, unknown>>> => {
  if (!supabaseEnv()) return new Map();

  try {
    const supabase = createStaticClient();
    if (!supabase) return new Map();

    const { data, error } = await supabase.from("site_content").select("key, value");
    if (error) throw error;

    return new Map((data as Row[]).map((row) => [row.key, row.value ?? {}]));
  } catch (error) {
    console.error("[content] falling back to defaults:", error);
    return new Map();
  }
});

/**
 * Copy for one group: the saved value laid over the code default, one level
 * deep. Arrays replace wholesale -- a saved list of four cards means four
 * cards, not four merged onto the original.
 */
export async function getContent<T extends Record<string, unknown>>(
  key: string,
): Promise<T> {
  const overrides = await loadOverrides();
  const saved = overrides.get(key) ?? {};
  const defaults = defaultsFor(key);

  const merged: Record<string, unknown> = { ...defaults };
  for (const [field, value] of Object.entries(saved)) {
    // An empty string means "cleared", but undefined/null means "not set",
    // and those fall back so a partial save cannot blank a heading.
    if (value !== undefined && value !== null) merged[field] = value;
  }

  return merged as T;
}

/** Admin listing: every group with whether it has been edited. */
export async function getContentStatus() {
  const overrides = await loadOverrides();
  return GROUPS.map((group) => ({
    key: group.key,
    title: group.title,
    description: group.description,
    page: group.page,
    edited: overrides.has(group.key),
  }));
}

"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { GROUP_BY_KEY, type Field } from "@/lib/content/registry";
import type { FormState } from "@/lib/forms";
import type { Json } from "@/types/database.types";

/**
 * Builds the value for one group out of the submitted form.
 *
 * The form names fields flatly -- "headingLead", "items.0.title" -- and the
 * group's own schema says which is which, so nothing outside the registry can
 * be written into the row.
 */
function collect(fields: Field[], formData: FormData): Record<string, Json> {
  const value: Record<string, Json> = {};

  for (const field of fields) {
    if (field.type === "text" || field.type === "textarea") {
      value[field.name] = String(formData.get(field.name) ?? "").trim();
      continue;
    }

    if (field.type === "lines") {
      value[field.name] = String(formData.get(field.name) ?? "")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
      continue;
    }

    if (field.type !== "items") continue;

    // Repeating items: read index by index until the row is absent, so
    // removing the third of five cards does not silently keep the fifth.
    const items: Record<string, string>[] = [];
    for (let i = 0; ; i += 1) {
      const present = field.fields.some(
        (sub) => formData.get(`${field.name}.${i}.${sub.name}`) !== null,
      );
      if (!present) break;

      const item: Record<string, string> = {};
      for (const sub of field.fields) {
        item[sub.name] = String(formData.get(`${field.name}.${i}.${sub.name}`) ?? "").trim();
      }
      // A row where every box was cleared is a deletion, not an empty card.
      if (Object.values(item).some(Boolean)) items.push(item);
    }
    value[field.name] = items;
  }

  return value;
}

export async function saveContentGroup(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const { supabase, user } = await requireAdmin();

  const key = String(formData.get("__key") ?? "");
  const group = GROUP_BY_KEY.get(key);
  if (!group) return { ok: false, error: "Unknown content group." };

  const value = collect(group.fields, formData);

  const { error } = await supabase
    .from("site_content")
    .upsert({ key, value, updated_by: user.id }, { onConflict: "key" });

  if (error) {
    console.error("[content] save failed:", error);
    return {
      ok: false,
      error:
        error.code === "42P01"
          ? "The site_content table does not exist yet — run migration 0005."
          : "Could not save. Please try again.",
    };
  }

  // The public pages are statically rendered with an hourly revalidate, so
  // without this an edit would not surface for up to an hour.
  revalidatePath("/", "layout");
  revalidatePath("/admin/content");
  revalidatePath(`/admin/content/${key}`);

  return { ok: true };
}

/** Puts one group back to the copy shipped in the code. */
export async function resetContentGroup(formData: FormData) {
  const { supabase } = await requireAdmin();
  const key = String(formData.get("__key") ?? "");
  if (!GROUP_BY_KEY.has(key)) return;

  await supabase.from("site_content").delete().eq("key", key);

  revalidatePath("/", "layout");
  revalidatePath("/admin/content");
  revalidatePath(`/admin/content/${key}`);
}

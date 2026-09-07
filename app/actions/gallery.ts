"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import type { FormState } from "@/lib/forms";

/**
 * Gallery mutations.
 *
 * The image files themselves never pass through here: a Server Action request
 * is capped at 1MB by default, well under a phone photograph, so the browser
 * uploads straight to Supabase Storage (admin-only by RLS) and then calls
 * `recordImage` with just the resulting URL and dimensions.
 */

function refresh() {
  revalidatePath("/", "layout");
  revalidatePath("/admin/gallery");
}

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

export async function createSection(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const { supabase } = await requireAdmin();

  const title = String(formData.get("title") ?? "").trim();
  if (!title) return { ok: false, error: "Give the section a name." };

  const { data: last } = await supabase
    .from("gallery_sections")
    .select("display_order")
    .order("display_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { error } = await supabase.from("gallery_sections").insert({
    title,
    description: String(formData.get("description") ?? "").trim() || null,
    display_order: (last?.display_order ?? 0) + 1,
  });

  if (error) {
    console.error("[gallery] create section failed:", error);
    return {
      ok: false,
      error:
        error.code === "42P01"
          ? "The gallery tables do not exist yet — run migration 0006."
          : "Could not create the section.",
    };
  }

  refresh();
  return { ok: true };
}

export async function updateSection(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await supabase
    .from("gallery_sections")
    .update({
      title: String(formData.get("title") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim() || null,
      display_order: Number(formData.get("display_order") ?? 0),
      is_published: formData.get("is_published") === "on",
    })
    .eq("id", id);

  refresh();
}

/** Images in the section are kept, and fall back to "unsorted". */
export async function deleteSection(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await supabase.from("gallery_sections").delete().eq("id", id);
  refresh();
}

/* ------------------------------------------------------------------ */
/* Images                                                              */
/* ------------------------------------------------------------------ */

/** Called after the browser has put the file in Storage. */
export async function recordImage(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const { supabase } = await requireAdmin();

  const src = String(formData.get("src") ?? "").trim();
  if (!src) return { ok: false, error: "The upload did not return a URL." };

  const sectionId = String(formData.get("section_id") ?? "").trim();
  const width = Number(formData.get("width") ?? 0) || null;
  const height = Number(formData.get("height") ?? 0) || null;

  const { data: last } = await supabase
    .from("gallery_images")
    .select("display_order")
    .order("display_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { error } = await supabase.from("gallery_images").insert({
    section_id: sectionId || null,
    src,
    storage_path: String(formData.get("storage_path") ?? "").trim() || null,
    caption: String(formData.get("caption") ?? "").trim(),
    alt:
      String(formData.get("alt") ?? "").trim() ||
      "Photograph from the practice of Dr. Awais Malik",
    width,
    height,
    display_order: (last?.display_order ?? 0) + 1,
  });

  if (error) {
    console.error("[gallery] record image failed:", error);
    return { ok: false, error: "The file uploaded but could not be saved." };
  }

  refresh();
  return { ok: true };
}

export async function updateImage(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const sectionId = String(formData.get("section_id") ?? "").trim();
  const caption = String(formData.get("caption") ?? "").trim();

  await supabase
    .from("gallery_images")
    .update({
      section_id: sectionId || null,
      caption,
      // Keep alt meaningful: the caption is the best description available.
      alt: caption || "Photograph from the practice of Dr. Awais Malik",
      display_order: Number(formData.get("display_order") ?? 0),
      is_published: formData.get("is_published") === "on",
    })
    .eq("id", id);

  refresh();
}

/** Removes the row, and the stored file when the image was uploaded. */
export async function deleteImage(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const { data: image } = await supabase
    .from("gallery_images")
    .select("storage_path")
    .eq("id", id)
    .maybeSingle();

  await supabase.from("gallery_images").delete().eq("id", id);

  // Files that ship in public/gallery have no storage_path; those rows only
  // hide the picture, since the file lives in the repository.
  if (image?.storage_path) {
    await supabase.storage.from("gallery").remove([image.storage_path]);
  }

  refresh();
}

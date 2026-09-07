import "server-only";
import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import { createStaticClient } from "@/lib/supabase/server";
import { supabaseEnv } from "@/lib/supabase/env";

export type GalleryImage = {
  id: string;
  src: string;
  caption: string;
  alt: string;
  /** Natural pixel size, so a card can be laid out at the photograph's own shape. */
  width: number | null;
  height: number | null;
};

export type GallerySection = {
  id: string;
  title: string;
  description: string | null;
  images: GalleryImage[];
};

const GALLERY_DIR = path.join(process.cwd(), "public", "gallery");
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

/**
 * Files that ship in public/gallery. Used only when the database has no
 * gallery rows at all -- a fresh deployment, or one with no database -- so the
 * page never renders an empty shell.
 */
function readFromDisk(): GallerySection[] {
  let files: string[];
  try {
    files = fs.readdirSync(GALLERY_DIR);
  } catch {
    return [];
  }

  const images = files
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort()
    .map((file, index) => ({
      id: `file-${index}`,
      src: `/gallery/${file}`,
      caption: "",
      alt: "Photograph from the practice of Dr. Awais Malik",
      width: null,
      height: null,
    }));

  if (images.length === 0) return [];
  return [{ id: "disk", title: "Practice", description: null, images }];
}

/**
 * Published sections with their images, ordered as the admin arranged them.
 * Falls back to the files on disk if the database is unreachable or empty, and
 * drops sections that ended up with no images rather than rendering a heading
 * over nothing.
 */
export const getGallery = cache(async (): Promise<GallerySection[]> => {
  if (!supabaseEnv()) return readFromDisk();

  try {
    const supabase = createStaticClient();
    if (!supabase) return readFromDisk();

    const [{ data: sections, error: sectionError }, { data: images, error: imageError }] =
      await Promise.all([
        supabase
          .from("gallery_sections")
          .select("id, title, description, display_order")
          .eq("is_published", true)
          .order("display_order", { ascending: true }),
        supabase
          .from("gallery_images")
          .select("id, section_id, src, caption, alt, width, height, display_order")
          .eq("is_published", true)
          .order("display_order", { ascending: true }),
      ]);

    if (sectionError) throw sectionError;
    if (imageError) throw imageError;
    if (!sections?.length || !images?.length) return readFromDisk();

    const bySection = new Map<string, GalleryImage[]>();
    for (const image of images) {
      const key = image.section_id ?? "__unsorted";
      const list = bySection.get(key) ?? [];
      list.push({
        id: image.id,
        src: image.src,
        caption: image.caption ?? "",
        alt: image.alt || image.caption || "Photograph from the practice",
        width: image.width,
        height: image.height,
      });
      bySection.set(key, list);
    }

    return sections
      .map((section) => ({
        id: section.id,
        title: section.title,
        description: section.description,
        images: bySection.get(section.id) ?? [],
      }))
      .filter((section) => section.images.length > 0);
  } catch (error) {
    console.error("[gallery] falling back to files on disk:", error);
    return readFromDisk();
  }
});

/** Flat list, newest section first, for the home-page strip. */
export async function getGalleryPreview(limit: number): Promise<GalleryImage[]> {
  const sections = await getGallery();
  return sections.flatMap((section) => section.images).slice(0, limit);
}

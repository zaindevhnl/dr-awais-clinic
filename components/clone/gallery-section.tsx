import { GalleryGrid, type GalleryCopy } from "@/components/clone/gallery-grid";
import { getContent } from "@/lib/content";
import { getGallery, type GallerySection as Section } from "@/lib/gallery";

export async function GallerySection({
  limit,
  showViewAll = false,
  showSectionHeadings = true,
}: {
  /** Home page shows a strip; the gallery page shows everything. */
  limit?: number;
  showViewAll?: boolean;
  showSectionHeadings?: boolean;
}) {
  const [sections, copy] = await Promise.all([
    getGallery(),
    getContent<GalleryCopy>("gallery"),
  ]);

  // Trimming for the home page runs across sections, so the strip fills up
  // even when the first section holds only two photographs.
  let remaining = limit ?? Number.POSITIVE_INFINITY;
  const trimmed: Section[] = [];
  for (const section of sections) {
    if (remaining <= 0) break;
    const images = section.images.slice(0, remaining);
    remaining -= images.length;
    trimmed.push({ ...section, images });
  }

  if (trimmed.length === 0) return null;

  return (
    <GalleryGrid
      sections={trimmed}
      copy={copy}
      showViewAll={showViewAll}
      showSectionHeadings={showSectionHeadings}
    />
  );
}

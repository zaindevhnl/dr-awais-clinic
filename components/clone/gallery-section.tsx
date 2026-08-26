import fs from "node:fs";
import path from "node:path";
import { GalleryGrid, type GalleryImage } from "@/components/clone/gallery-grid";

const GALLERY_DIR = path.join(process.cwd(), "public", "gallery");
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

/**
 * Stock photography, shown only while public/gallery/ is empty. The moment the
 * practice drops its own photographs into that folder, these disappear.
 */
const PLACEHOLDERS: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1734094546615-045bf5f7ea0e?w=1200&auto=format&fit=crop&q=70",
    alt: "Modern operating theatre prepared for a laparoscopic procedure",
    caption: "Modern Operation Theatre",
    category: "Facility",
  },
  {
    src: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=1200&auto=format&fit=crop&q=70",
    alt: "Surgical team operating under theatre lights",
    caption: "Laparoscopic Surgery in Progress",
    category: "Surgery",
  },
  {
    src: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1200&auto=format&fit=crop&q=70",
    alt: "Surgical team reviewing a case together",
    caption: "Pre-Operative Case Review",
    category: "Team",
  },
  {
    src: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=1200&auto=format&fit=crop&q=70",
    alt: "Two surgeons examining an X-ray",
    caption: "Imaging & Diagnostics",
    category: "Diagnostics",
  },
  {
    src: "https://images.unsplash.com/photo-1631815590058-860e4f83c1e8?w=1200&auto=format&fit=crop&q=70",
    alt: "Surgeon in consultation with a patient",
    caption: "Patient Consultation",
    category: "Consultation",
  },
  {
    src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&auto=format&fit=crop&q=70",
    alt: "Hospital corridor leading to the surgical wing",
    caption: "Surgical Wing",
    category: "Facility",
  },
];

/** IMG_2297, DSC01234, PXL_20240101, WhatsApp Image..., or a bare hex hash. */
function isCameraName(value: string) {
  const v = value.trim();
  return (
    v.length <= 3 ||
    /^(img|dsc|dscn|pxl|photo|image|screenshot|whatsapp|fb_img|received)[-_ ]?\d*/i.test(v) ||
    /^[0-9a-f]{16,}$/i.test(v) ||
    /^\d+$/.test(v)
  );
}

/** Keeps the practice's acronyms (FMH, LMCH, MGB, POMSS) upper-case. */
function titleCase(value: string) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) =>
      word.length <= 5 && word === word.toUpperCase()
        ? word
        : word[0].toUpperCase() + word.slice(1),
    )
    .join(" ");
}

/**
 * Reads public/gallery/ at build time, so photographs can be added by dropping
 * files into that folder with no code change.
 *
 * The filename carries the caption, and optionally the category:
 *   01-facility--LMCH-surgical-department.jpg
 *     -> category "Facility", caption "LMCH Surgical Department"
 *   02-metabolic-surgery-symposium.jpg
 *     -> category "Practice", caption "Metabolic Surgery Symposium"
 *
 * The leading number only fixes the running order.
 */
function readGallery(): GalleryImage[] {
  let files: string[];
  try {
    files = fs.readdirSync(GALLERY_DIR);
  } catch {
    return [];
  }

  return files
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort()
    .map((file) => {
      const stem = path.basename(file, path.extname(file)).replace(/^\d+[-_]?/, "");
      const [rawCategory, rawCaption] = stem.includes("--")
        ? stem.split("--")
        : ["practice", stem];
      const category = titleCase(rawCategory.replace(/[-_]+/g, " ").trim()) || "Practice";

      // A camera or messenger default name says nothing about the picture, so
      // show no caption at all rather than "IMG 2297".
      const caption = isCameraName(rawCaption)
        ? ""
        : titleCase(rawCaption.replace(/[-_]+/g, " ").trim());

      return {
        src: `/gallery/${file}`,
        alt: caption || `${category} photograph, Dr. Awais Malik`,
        caption,
        category,
      };
    });
}

export function GallerySection({
  limit,
  showViewAll = false,
}: {
  limit?: number;
  showViewAll?: boolean;
}) {
  const own = readGallery();
  const images = own.length > 0 ? own : PLACEHOLDERS;

  return (
    <GalleryGrid images={limit ? images.slice(0, limit) : images} showViewAll={showViewAll} />
  );
}

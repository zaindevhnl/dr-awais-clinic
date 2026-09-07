"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryImage, GallerySection } from "@/lib/gallery";

export type GalleryCopy = {
  badge: string;
  headingLead: string;
  headingTail: string;
  headingAccent: string;
  viewAllLabel: string;
};

/**
 * The card's shape is the photograph's shape. Two thirds of the practice's
 * pictures are portrait, and forcing them into a landscape box cropped heads
 * off. Where the size is unknown (files read straight from disk) a portrait-ish
 * default is used, since that is what most of them are.
 */
function aspectOf(image: GalleryImage) {
  if (!image.width || !image.height) return "3 / 4";
  return `${image.width} / ${image.height}`;
}

export function GalleryGrid({
  sections,
  copy,
  showViewAll = false,
  showSectionHeadings = true,
}: {
  sections: GallerySection[];
  copy: GalleryCopy;
  showViewAll?: boolean;
  showSectionHeadings?: boolean;
}) {
  // The lightbox walks every image on the page, across sections.
  const flat = sections.flatMap((section) => section.images);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const total = flat.length;
  const close = useCallback(() => setActiveIndex(null), []);
  const step = useCallback(
    (delta: number) =>
      setActiveIndex((current) =>
        current === null ? null : (current + delta + total) % total,
      ),
    [total],
  );

  useEffect(() => {
    if (activeIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex, close, step]);

  const active = activeIndex === null ? null : flat[activeIndex];

  // Where each section starts within `flat`, so a card knows its lightbox
  // index without counting as it renders.
  const offsetOf = (sectionIndex: number) =>
    sections.slice(0, sectionIndex).reduce((n, s) => n + s.images.length, 0);

  return (
    <section className="py-12 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-12 space-y-4">
          <div className="inline-block">
            <span className="bg-[#C1FF72] text-[#1A1A1A] px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-widest shadow-sm shadow-[#C1FF72]/10">
              {copy.badge}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold text-[#1A1A1A] leading-[1.2] tracking-tight max-w-3xl mx-auto">
            {copy.headingLead} <br className="hidden md:inline" /> {copy.headingTail}{" "}
            <span className="relative inline-block px-1">
              <span className="relative z-10">{copy.headingAccent}</span>
              <div className="absolute -bottom-1 left-0 w-full h-3 bg-[#C1FF72]/80 -rotate-1 rounded-full z-0"></div>
            </span>
          </h2>
        </div>

        {sections.map((section, sectionIndex) => (
          <div key={section.id} className="mb-14 last:mb-0">
            {showSectionHeadings && sections.length > 1 && (
              <div className="mb-7 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                <h3 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">
                  {section.title}
                </h3>
                {section.description && (
                  <p className="text-sm text-gray-400 sm:max-w-md sm:text-right">
                    {section.description}
                  </p>
                )}
              </div>
            )}

            {/* Masonry columns: each card keeps its own height, so nothing is
                cropped and the wall stays tight regardless of orientation. */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8 [column-fill:_balance]">
              {section.images.map((image, imageIndex) => {
                const index = offsetOf(sectionIndex) + imageIndex;
                return (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={
                      image.caption ? `Open image: ${image.caption}` : "Open image"
                    }
                    className="group relative mb-6 md:mb-8 block w-full break-inside-avoid overflow-hidden rounded-[28px] bg-[#FAFAFA] border border-gray-100 cursor-pointer text-left transition-all duration-500 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.18)] hover:-translate-y-1.5"
                  >
                    <div
                      className="relative w-full overflow-hidden rounded-[28px]"
                      style={{ aspectRatio: aspectOf(image) }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image.src}
                        alt={image.alt}
                        width={image.width ?? undefined}
                        height={image.height ?? undefined}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-[#1A1A1A]/45 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                        <div className="self-end w-12 h-12 bg-[#C1FF72] rounded-full flex items-center justify-center shadow-lg translate-y-[-10px] group-hover:translate-y-0 transition-transform duration-300">
                          <ArrowRight className="w-5 h-5 text-[#1A1A1A]" />
                        </div>

                        {image.caption && (
                          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <h4 className="text-white font-semibold text-lg line-clamp-2">
                              {image.caption}
                            </h4>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {showViewAll && (
          <div className="flex justify-center mt-12">
            <Link
              href="/gallery"
              className="flex items-center gap-2 bg-[#00A78E] text-white px-8 py-4 rounded-full font-semibold text-sm shadow-lg shadow-[#00A78E]/20 hover:bg-[#008f7a] hover:shadow-xl hover:shadow-[#00A78E]/30 active:scale-[0.98] transition-all duration-300"
            >
              {copy.viewAllLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={active.caption || "Photograph"}
          onClick={close}
        >
          <button
            onClick={close}
            aria-label="Close image"
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {total > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Previous image"
              className="absolute left-3 sm:left-8 w-11 h-11 rounded-full bg-white/10 hover:bg-[#00A78E] border border-white/20 text-white flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          <figure className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.src}
              alt={active.alt}
              className="w-full max-h-[80vh] object-contain rounded-[24px] shadow-2xl"
            />
            {active.caption && (
              <figcaption className="mt-5 text-center">
                <span className="text-white font-semibold text-lg">{active.caption}</span>
              </figcaption>
            )}
          </figure>

          {total > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Next image"
              className="absolute right-3 sm:right-8 w-11 h-11 rounded-full bg-white/10 hover:bg-[#00A78E] border border-white/20 text-white flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>
      )}
    </section>
  );
}

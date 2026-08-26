"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
  category: string;
};

/**
 * Surgical and clinical photography. Swap these for the practice's own
 * theatre photographs when they are available -- the layout takes any
 * mix of portrait and landscape.
 */
export const GALLERY: GalleryImage[] = [
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
  {
    src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&auto=format&fit=crop&q=70",
    alt: "Recovery room bed and monitoring equipment",
    caption: "Post-Operative Recovery",
    category: "Recovery",
  },
  {
    src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&auto=format&fit=crop&q=70",
    alt: "Sterile surgical instruments laid out on a tray",
    caption: "Sterile Instrumentation",
    category: "Surgery",
  },
];

export function GallerySection({
  limit,
  showViewAll = false,
}: {
  limit?: number;
  showViewAll?: boolean;
}) {
  const images = limit ? GALLERY.slice(0, limit) : GALLERY;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const total = images.length;
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
    // The lightbox covers the page, so the page behind it must not scroll.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex, close, step]);

  const active = activeIndex === null ? null : images[activeIndex];

  return (
    <section className="py-12 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-12 space-y-4">
          <div className="inline-block">
            <span className="bg-[#C1FF72] text-[#1A1A1A] px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-widest shadow-sm shadow-[#C1FF72]/10">
              Our Gallery
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold text-[#1A1A1A] leading-[1.2] tracking-tight max-w-3xl mx-auto">
            Inside the Theatre <br className="hidden md:inline" /> Precision You Can{" "}
            <span className="relative inline-block px-1">
              <span className="relative z-10">See</span>
              <div className="absolute -bottom-1 left-0 w-full h-3 bg-[#C1FF72]/80 -rotate-1 rounded-full z-0"></div>
            </span>
          </h2>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Open image: ${image.caption}`}
              className="group relative overflow-hidden rounded-[32px] bg-[#FAFAFA] border border-gray-100 cursor-pointer text-left transition-all duration-500 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.18)] hover:-translate-y-2"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[32px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#1A1A1A]/45 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                  <div className="self-end w-12 h-12 bg-[#C1FF72] rounded-full flex items-center justify-center shadow-lg translate-y-[-10px] group-hover:translate-y-0 transition-transform duration-300">
                    <ArrowRight className="w-5 h-5 text-[#1A1A1A]" />
                  </div>

                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-[#C1FF72] text-xs font-semibold uppercase tracking-wider block mb-1">
                      {image.category}
                    </span>
                    <h3 className="text-white font-semibold text-lg line-clamp-1">
                      {image.caption}
                    </h3>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {showViewAll && (
          <div className="flex justify-center mt-12">
            <Link
              href="/gallery"
              className="flex items-center gap-2 bg-[#00A78E] text-white px-8 py-4 rounded-full font-semibold text-sm shadow-lg shadow-[#00A78E]/20 hover:bg-[#008f7a] hover:shadow-xl hover:shadow-[#00A78E]/30 active:scale-[0.98] transition-all duration-300"
            >
              View Full Gallery
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
          aria-label={active.caption}
          onClick={close}
        >
          <button
            onClick={close}
            aria-label="Close image"
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

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

          <figure
            className="max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.src}
              alt={active.alt}
              className="w-full max-h-[75vh] object-contain rounded-[24px] shadow-2xl"
            />
            <figcaption className="mt-5 text-center">
              <span className="text-[#C1FF72] text-xs font-semibold uppercase tracking-widest block mb-1">
                {active.category}
              </span>
              <span className="text-white font-semibold text-lg">{active.caption}</span>
            </figcaption>
          </figure>

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
        </div>
      )}
    </section>
  );
}

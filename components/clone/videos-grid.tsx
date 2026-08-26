"use client";

import { useCallback, useEffect, useState } from "react";
import { Play, X, ExternalLink } from "lucide-react";
import type { Video } from "@/lib/youtube";

/**
 * The player is only mounted once a card is clicked, so no YouTube script,
 * cookie or request is made to a visitor who never plays anything -- and the
 * page stays fast. youtube-nocookie is used for the same reason.
 */
export function VideosGrid({
  videos,
  channelUrl,
}: {
  videos: Video[];
  channelUrl: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const close = useCallback(() => setActiveIndex(null), []);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex, close]);

  const active = activeIndex === null ? null : videos[activeIndex];

  if (videos.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 px-6">
        <p className="text-gray-500 mb-6">
          The video list could not be loaded just now.
        </p>
        <a
          href={channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#00A78E] text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-[#008f7a] transition-colors"
        >
          Watch on YouTube
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {videos.map((video, index) => (
          <button
            key={video.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Play video: ${video.title}`}
            className="group text-left bg-[#FAFAFA] hover:bg-white border border-gray-100 rounded-[28px] p-3 transition-all duration-500 hover:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.22)] hover:-translate-y-1.5"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video rounded-[20px] overflow-hidden bg-[#0A0A0A]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={video.thumbnail}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#0A0A0A]/20 group-hover:bg-[#0A0A0A]/40 transition-colors duration-300" />

              {/* Play button */}
              <span className="absolute inset-0 grid place-items-center">
                <span className="w-14 h-14 rounded-full bg-[#C1FF72] grid place-items-center shadow-lg shadow-black/20 group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-5 h-5 fill-[#1A1A1A] text-[#1A1A1A] ml-0.5" />
                </span>
              </span>
            </div>

            {/* Meta */}
            <div className="px-3 pt-5 pb-3 space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#00A78E]">
                {new Date(video.published).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <h3
                dir="auto"
                className="text-[#1A1A1A] font-semibold leading-snug line-clamp-2 group-hover:text-[#00A78E] transition-colors"
              >
                {video.title}
              </h3>
            </div>
          </button>
        ))}
      </div>

      {/* Player */}
      {active && (
        <div
          className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={close}
        >
          <button
            onClick={close}
            aria-label="Close video"
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-video rounded-[20px] overflow-hidden shadow-2xl bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${active.id}?autoplay=1&rel=0`}
                title={active.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 dir="auto" className="text-white font-semibold text-lg leading-snug">
                {active.title}
              </h2>
              <a
                href={active.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#C1FF72] text-sm font-semibold whitespace-nowrap hover:underline"
              >
                Watch on YouTube
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

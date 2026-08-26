import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { VideosGrid } from "@/components/clone/videos-grid";
import { AppointmentSection } from "@/components/clone/appointment-section";
import { JsonLd, breadcrumbLd } from "@/components/seo/json-ld";
import { YOUTUBE, getChannelVideos } from "@/lib/youtube";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Videos",
  description:
    "Patient-education videos from Dr. Awais Malik on weight-loss surgery, hernia, gallstones, piles and fissure — in Urdu and English.",
  alternates: { canonical: "/videos" },
  openGraph: { url: "/videos", images: ["/placeholder-wide.svg"] },
};

export default async function VideosPage() {
  const videos = await getChannelVideos();

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Videos", path: "/videos" },
        ])}
      />

      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-5">
            <div className="inline-block">
              <span className="bg-[#C1FF72] text-[#1A1A1A] px-7 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest">
                Videos
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-[46px] font-semibold text-[#1A1A1A] leading-tight tracking-tight">
              Understand the Procedure{" "}
              <span className="relative inline-block px-1">
                <span className="relative z-10">Before</span>
                <div className="absolute -bottom-1 left-0 w-full h-3 bg-[#C1FF72]/80 -rotate-1 rounded-full z-0"></div>
              </span>{" "}
              You Decide
            </h1>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
              Explanations of the conditions and operations seen most often in clinic, in Urdu and
              English. General information — not a substitute for a consultation about your own
              case.
            </p>
            <a
              href={YOUTUBE.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#00A78E] hover:underline"
            >
              Subscribe on YouTube
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <VideosGrid videos={videos} channelUrl={YOUTUBE.channelUrl} />
        </div>
      </section>

      <AppointmentSection />
    </div>
  );
}

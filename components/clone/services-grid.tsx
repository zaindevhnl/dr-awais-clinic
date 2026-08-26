import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { imageCredits, serviceImage } from "@/lib/clone-content";
import type { Service } from "@/types/database.types";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2070&auto=format&fit=crop";

/**
 * Short label shown on the card, derived from the slug. The services table has
 * no category column, and these twelve procedures group cleanly by name.
 */
function categoryFor(slug: string) {
  if (/breast/.test(slug)) return "breast";
  if (/thyroid/.test(slug)) return "thyroid";
  if (/bariatric|gastric|sleeve|obesity|metabolic/.test(slug)) return "bariatric";
  if (/laparoscopic|hernia|gallbladder|intestine/.test(slug)) return "laparoscopic";
  return "surgery";
}

export function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <section className="py-16 sm:py-20 bg-[#FAFAFA]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="group relative block overflow-hidden rounded-[24px] bg-[#0A0A0A] shadow-sm hover:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.35)] transition-all duration-500 hover:-translate-y-1.5"
            >
              {/* Illustration fills the card */}
              <div className="relative aspect-[4/3.4] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={serviceImage(service.slug, service.image_url) || FALLBACK_IMAGE}
                  alt={service.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.06]"
                />

                {/* Legibility scrim: transparent at the top, dark where the text sits */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent" />

                {/* Category pill */}
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#1A1A1A] text-[11px] font-semibold lowercase tracking-wide px-3 py-1 rounded-full shadow-sm">
                  {categoryFor(service.slug)}
                </span>

                {/* Arrow, revealed on hover */}
                <span className="absolute top-3.5 right-4 w-9 h-9 rounded-full bg-[#C1FF72] grid place-items-center opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 text-[#1A1A1A]" />
                </span>

                {/* Title + description over the image */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <h3 className="text-white text-lg sm:text-xl font-bold leading-snug tracking-tight line-clamp-2">
                    {service.title}
                  </h3>
                  {service.short_description && (
                    <p className="mt-2 text-white/75 text-[13px] leading-relaxed line-clamp-2">
                      {service.short_description}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Attribution: the sourced illustrations are CC BY, which requires credit. */}
        <p className="mt-10 text-center text-xs text-gray-400 leading-relaxed">
          Procedure illustrations:{" "}
          {imageCredits().map((credit, i) => (
            <span key={credit.credit}>
              {i > 0 ? " · " : ""}
              {credit.credit} ({credit.licence})
            </span>
          ))}
          . Diagrams are illustrative and not a depiction of any individual patient.
        </p>
      </div>
    </section>
  );
}

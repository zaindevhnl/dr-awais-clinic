import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { imageCredits, serviceImage } from "@/lib/clone-content";
import { PROCEDURE_GROUPS } from "@/lib/procedures";
import type { Service } from "@/types/database.types";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2070&auto=format&fit=crop";

/** Procedures in the practice's own grouping; anything unlisted lands in "Other". */
function groupServices(services: Service[]) {
  const bySlug = new Map(services.map((s) => [s.slug, s]));
  const used = new Set<string>();
  const sections = PROCEDURE_GROUPS.map((group) => {
    const items = group.items
      .map((item) => bySlug.get(item.slug))
      .filter((s): s is Service => Boolean(s));
    items.forEach((s) => used.add(s.slug));
    return { id: group.id as string, title: group.title, items };
  });
  const others = services.filter((s) => !used.has(s.slug));
  if (others.length) sections.push({ id: "other", title: "Other Procedures", items: others });
  return sections.filter((section) => section.items.length > 0);
}

function ServiceCard({ service, label }: { service: Service; label: string }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative block overflow-hidden rounded-[24px] bg-[#0B3D36] shadow-sm hover:shadow-[0_24px_50px_-24px_rgba(11,61,54,0.45)] transition-all duration-500 hover:-translate-y-1.5"
    >
      {/* Illustration fills the card */}
      <div className="relative aspect-[4/3.4] overflow-hidden bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={serviceImage(service.slug, service.image_url) || FALLBACK_IMAGE}
          alt={service.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.06]"
        />

        {/* Legibility scrim: clear at the top, deep green where the text sits */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B3D36] via-[#0B3D36]/65 to-transparent" />

        {/* Category pill */}
        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#0B3D36] text-[11px] font-semibold tracking-wide px-3 py-1 rounded-full shadow-sm">
          {label}
        </span>

        {/* Arrow, revealed on hover */}
        <span className="absolute top-3.5 right-4 w-9 h-9 rounded-full bg-[#5FD3BC] grid place-items-center opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <ArrowUpRight className="w-4 h-4 text-[#0B3D36]" />
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
  );
}

export function ServicesGrid({ services }: { services: Service[] }) {
  const sections = groupServices(services);

  return (
    <section className="py-16 sm:py-20 bg-[#FAFAFA]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-14 sm:space-y-16">
        {sections.map((section) => (
          <div key={section.id} id={section.id} className="scroll-mt-28">
            <div className="mb-6 sm:mb-8 flex items-end justify-between gap-4 border-b border-[#0B3D36]/10 pb-4">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#0B3D36]">
                {section.title}
              </h2>
              <span className="text-sm font-medium text-slate-500">
                {section.items.length} {section.items.length === 1 ? "procedure" : "procedures"}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {section.items.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  label={section.title.replace(/ Surgery$| Procedures$/, "").toLowerCase()}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Attribution: the sourced illustrations are CC BY / BY-SA, which require credit. */}
        <p className="mt-10 text-center text-xs text-gray-400 leading-relaxed">
          Procedure illustrations via Wikimedia Commons:{" "}
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

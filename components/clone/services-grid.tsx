import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Icon } from "@/components/icon";
import type { Service } from "@/types/database.types";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2070&auto=format&fit=crop";

export function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <section className="py-20 bg-[#FAFAFA]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-[32px] p-8 md:p-10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer duration-300 group flex flex-col h-full border border-gray-50 relative"
            >
              {/* Header: Icon + Title */}
              <div className="flex items-center space-x-5 mb-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner transition-all duration-300 bg-[#F4F9F8] group-hover:bg-[#C1FF72] group-hover:rotate-6 shrink-0">
                  <Icon name={service.icon} className="w-8 h-8 text-[#1A1A1A]" />
                </div>
                <h3 className="text-2xl font-semibold text-[#1A1A1A] tracking-tight leading-tight">
                  {service.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-gray-500 text-[15px] leading-relaxed mb-6">
                {service.short_description}
              </p>

              {/* Image with Overlapping Button */}
              <div className="relative mt-auto pt-4 pb-6">
                <div className="rounded-[24px] overflow-hidden h-[240px] shadow-sm bg-[#F4F9F8]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={service.image_url || FALLBACK_IMAGE}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                {/* Overlapping "Read More" Button */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-full flex justify-center px-6">
                  <Link
                    href={`/services/${service.slug}`}
                    className="bg-white text-[#1A1A1A] hover:bg-[#00A78E] hover:text-white px-8 py-4 rounded-full font-semibold text-sm flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 w-fit whitespace-nowrap cursor-pointer"
                  >
                    Read More
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

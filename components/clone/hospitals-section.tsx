import { MapPin, ArrowUpRight, Building2 } from "lucide-react";
import { HOSPITALS } from "@/lib/clone-content";

/**
 * Where the surgeon operates. The home page states the affiliations inside a
 * single teal panel; here each hospital is a card of its own, with directions,
 * because a patient on this page is deciding where to go.
 */
export function HospitalsSection() {
  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-5">
          <div className="inline-block">
            <span className="bg-[#C1FF72] text-[#1A1A1A] px-7 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest">
              Where I Operate
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-semibold text-[#1A1A1A] leading-tight tracking-tight">
            Three Hospitals in{" "}
            <span className="relative inline-block px-1">
              <span className="relative z-10">Lahore</span>
              <div className="absolute -bottom-1 left-0 w-full h-3 bg-[#C1FF72]/80 -rotate-1 rounded-full z-0"></div>
            </span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
            Consultations and surgery take place at the hospitals below. Ask at the time of booking
            which one suits your procedure and your travel.
          </p>
        </div>

        {/* Hospital cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {HOSPITALS.map((hospital, index) => (
            <a
              key={hospital.shortName}
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.mapQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col bg-[#FAFAFA] hover:bg-white border border-gray-100 rounded-[32px] p-8 transition-all duration-300 hover:shadow-[0_20px_50px_-25px_rgba(0,0,0,0.18)] hover:-translate-y-1"
            >
              {/* Index + icon */}
              <div className="flex items-start justify-between mb-8">
                <span className="w-14 h-14 rounded-2xl bg-[#00A78E]/10 text-[#00A78E] grid place-items-center group-hover:bg-[#00A78E] group-hover:text-white transition-colors duration-300">
                  <Building2 className="w-6 h-6" />
                </span>
                <span className="font-semibold text-sm text-gray-300 group-hover:text-[#00A78E] transition-colors">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Name */}
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#00A78E] mb-2">
                {hospital.shortName}
              </span>
              <h3 className="text-xl font-bold text-[#1A1A1A] leading-snug tracking-tight mb-4">
                {hospital.name}
              </h3>

              {/* Address */}
              <div className="flex items-start gap-2.5 text-gray-500 mb-8">
                <MapPin className="w-4 h-4 text-[#00A78E] shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">
                  {hospital.address ? `${hospital.address}, ${hospital.city}` : hospital.city}
                </span>
              </div>

              {/* Directions */}
              <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#1A1A1A] group-hover:text-[#00A78E] transition-colors">
                Get directions
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

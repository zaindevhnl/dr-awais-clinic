import { Play } from "lucide-react";

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-16 sm:py-20 px-4 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-10 lg:gap-12">
        {/* Left Content and Big Image */}
        <div className="w-full lg:w-[50%] space-y-8">
          <div className="space-y-5">
            <div className="inline-block">
              <span className="bg-[#C1FF72] text-[#1A1A1A] px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm shadow-[#C1FF72]/20">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1A1A1A] leading-tight">
              Empower Health <br />
              Lives{" "}
              <span className="relative inline-block">
                Expert
                <div className="absolute -bottom-1 left-0 w-full h-3 bg-[#C1FF72]/80 -rotate-1 rounded-full z-0"></div>
              </span>{" "}
              Care
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-md">
              Health care is a vital aspect of maintaining overall well-being, encompassing a range
              of services from preventive care to treatment.
            </p>
          </div>

          {/* Big Horizontal Image */}
          <div className="rounded-[24px] sm:rounded-[30px] overflow-hidden shadow-xl shadow-black/5 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop"
              alt="Medical Team Discussion"
              className="w-full h-[220px] sm:h-[280px] lg:h-[350px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Right Side: Grid of 2 Vertical Images */}
        <div className="w-full lg:w-[50%] flex flex-col sm:flex-row gap-6 sm:gap-8">
          {/* Middle Column */}
          <div className="flex-1 space-y-5">
            <div className="rounded-[24px] sm:rounded-[30px] overflow-hidden shadow-xl shadow-black/5 h-[250px] sm:h-[300px] lg:h-[350px] group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1631815590058-860e4f83c1e8?q=80&w=721&auto=format&fit=crop"
                alt="Doctor with patient"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="space-y-2 px-1">
              <h3 className="text-lg sm:text-xl font-semibold text-[#1A1A1A] leading-snug">
                Enhance Lives Through Expert Care
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Health care is a vital aspect of maintaining overall well-being, encompassing a
                range of services from preventive care.
              </p>
            </div>
          </div>

          {/* Right Column: Tall Image with Play Button */}
          <div className="flex-1 relative">
            <div className="rounded-[24px] sm:rounded-[30px] overflow-hidden shadow-xl shadow-black/5 h-full min-h-[350px] sm:min-h-[450px] group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1964&auto=format&fit=crop"
                alt="Doctors checking X-ray"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-[24px] sm:rounded-[30px]"></div>
            </div>

            {/* Play Button Overlay */}
            <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 bg-[#C1FF72] rounded-full flex items-center justify-center shadow-lg shadow-[#C1FF72]/40 cursor-pointer hover:scale-110 hover:bg-white transition-all duration-300 z-10">
              <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-[#1A1A1A] text-[#1A1A1A] ml-1" />
            </div>

            {/* Bottom Stats Badge */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg flex items-center gap-3 whitespace-nowrap z-10">
              <div className="w-8 h-8 bg-[#C1FF72] rounded-full flex items-center justify-center">
                <span className="text-xs font-black text-[#1A1A1A]">✓</span>
              </div>
              <div>
                <p className="text-xs font-black text-[#1A1A1A]">FMH · Mid City · LMCH</p>
                <p className="text-[10px] text-gray-400">Lahore, Pakistan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

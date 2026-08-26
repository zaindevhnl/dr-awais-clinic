import { ArrowRight, ClipboardPlus, Activity, Heart } from "lucide-react";

const featureList = [
  {
    icon: <ClipboardPlus className="w-6 h-6 text-[#1A1A1A]" />,
    title: "Quality Care Exceptional Service",
    points: ["Your Health, Our Priority", "Harmony Health"],
  },
  {
    icon: <Activity className="w-6 h-6 text-[#1A1A1A]" />,
    title: "Healing Lives One Patient at a Time",
    points: ["Your Health, Our Priority", "Harmony Health"],
  },
  {
    icon: <Heart className="w-6 h-6 text-[#1A1A1A]" />,
    title: "Caring for You Caring for Tomorrow",
    points: ["Your Health, Our Priority", "Harmony Health"],
  },
];

export function SpecialFeatures() {
  return (
    <section className="py-5 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5">
        {/* Main Card Container */}
        <div className="bg-[#FAFAFA] rounded-[40px] p-8 md:p-16 relative overflow-hidden border border-gray-100/50">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#E0F2EF] opacity-40 rounded-full blur-[120px] -mr-32 -mt-32 pointer-events-none"></div>

          {/* Section Header */}
          <div className="mb-16">
            <div className="inline-block mb-6">
              <span className="bg-[#C1FF72] text-[#1A1A1A] px-8 py-3 rounded-full text-[16px] font-semibold uppercase tracking-wider shadow-sm shadow-[#C1FF72]/10">
                Our Feature
              </span>
            </div>
            <h2 className="text-4xl md:text-3xl font-semibold text-[#1A1A1A] leading-[1.15] tracking-tight max-w-2xl">
              Compassionate Care <br />
              Health{" "}
              <span className="relative inline-block px-1">
                <span className="relative z-10">Exceptional Results</span>
                <div className="absolute -bottom-1 left-0 w-full h-3 bg-[#C1FF72]/80 -rotate-1 rounded-full z-0"></div>
              </span>
            </h2>
          </div>

          {/* Features List */}
          <div className="space-y-3 relative z-10">
            {featureList.map((item, index) => (
              <div
                key={index}
                className={
                  "flex flex-col md:flex-row items-start md:items-center justify-between p-6 md:p-8 " +
                  (index !== featureList.length - 1 ? "border-b border-gray-100 " : "") +
                  "group hover:bg-white hover:shadow-[0_15px_50px_-20px_rgba(0,0,0,0.05)] hover:border-transparent rounded-3xl transition-all duration-300"
                }
              >
                {/* Left: Icon and Title */}
                <div className="flex items-center space-x-6 mb-4 md:mb-0">
                  <div className="w-25 h-15 bg-[#C1FF72] rounded-2xl flex items-center justify-center shadow-md shadow-[#C1FF72]/20 transform group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-[#1A1A1A] max-w-[280px] tracking-tight">
                    {item.title}
                  </h3>
                </div>

                {/* Middle: Bullet Points */}
                <div className="flex flex-col space-y-2.5 mb-6 md:mb-0">
                  {item.points.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-center space-x-3 text-gray-500">
                      <div className="w-2 h-2 bg-[#00A78E]/80 rounded-full group-hover:scale-110 transition-transform"></div>
                      <span className="text-sm font-semibold tracking-wide">{point}</span>
                    </div>
                  ))}
                </div>

                {/* Right: Read More Button */}
                <button className="flex items-center space-x-3 bg-white border cursor-pointer border-gray-200/60 px-7 py-3.5 rounded-full shadow-sm group-hover:bg-[#00A78E] group-hover:text-white group-hover:border-transparent transition-all duration-300 group/btn">
                  <span className="text-sm font-semibold tracking-wide">Read More</span>
                  <div className="w-5 h-5 flex items-center justify-center transition-transform group-hover/btn:translate-x-1.5 duration-300">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { Award, Activity, ShieldCheck, HeartPulse, Clock, Zap, MapPin } from "lucide-react";
import { getContent } from "@/lib/content";
import { getHospitals } from "@/lib/content/hospitals";

/** Icons cycle in order; the copy for each reason is editable, the icon is not. */
const ICONS = [Award, Zap, Activity, ShieldCheck, Clock, HeartPulse];

type Why = {
  heading: string;
  intro: string;
  reasons: { title: string; desc: string }[];
  panelHeading: string;
  panelIntro: string;
  panelStats: { value: string; label: string }[];
};

export async function FeaturesSection() {
  const content = await getContent<Why>("home.why");
  const hospitals = await getHospitals();

  return (
    <section className="py-10 bg-[#F9FAFB] select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row items-stretch gap-12">
          {/* Left Side Content & Features Grid */}
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-[36px] md:text-[42px] font-semibold text-[#1A1A1A] leading-tight mb-4">
              {content.heading}
            </h2>
            <p className="text-gray-500 font-medium text-base md:text-lg leading-relaxed mb-10 max-w-2xl">
              {content.intro}
            </p>

            {/* 2-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
              {content.reasons.map((item, idx) => {
                const Icon = ICONS[idx % ICONS.length];
                return (
                <div key={idx} className="flex items-start gap-4">
                  <div className="p-3 bg-[#00A78E]/10 rounded-xl shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 text-[#00A78E]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-[#1A1A1A]">{item.title}</h3>
                    <p className="text-sm font-semibold text-gray-400 leading-snug">{item.desc}</p>
                  </div>
                </div>
                );
              })}
            </div>
          </div>

          {/* Right Side: Solid Teal Card */}
          <div className="lg:w-[45%] bg-[#2A9D8F] p-8 sm:p-12 rounded-[32px] text-white flex flex-col justify-between shadow-xl shadow-[#2A9D8F]/10 relative overflow-hidden">
            <div className="space-y-3">
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                {content.panelHeading}
              </h3>
              <p className="text-emerald-50/80 font-semibold text-sm sm:text-base leading-relaxed">
                {content.panelIntro}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 my-10 border-b border-white/20 pb-10">
              {content.panelStats.map((stat, i) => (
                <div key={i} className="space-y-0.5">
                  <div className="text-3xl sm:text-4xl font-semibold tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-emerald-100/70 font-semibold text-xs sm:text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Locations List */}
            <div className="space-y-4">
              {hospitals.map((hospital) => (
                <div key={hospital.shortName} className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C1FF72] shrink-0 mt-0.5" />
                  <p className="text-sm font-semibold text-emerald-50 leading-snug">
                    {hospital.name}
                    {hospital.address ? `, ${hospital.address}` : ""}, {hospital.city}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Award, Activity, ShieldCheck, HeartPulse, Clock, Zap, MapPin } from "lucide-react";

const features = [
  {
    icon: <Award className="w-5 h-5 text-[#00A78E]" />,
    title: "Board Certified Surgeon",
    desc: "MBBS, FCPS with international training and certifications in bariatric surgery.",
  },
  {
    icon: <Zap className="w-5 h-5 text-[#00A78E]" />,
    title: "Advanced Technology",
    desc: "State-of-the-art surgical equipment and minimally invasive techniques for better outcomes.",
  },
  {
    icon: <Activity className="w-5 h-5 text-[#00A78E]" />,
    title: "20000+ Surgeries",
    desc: "Extensive experience with thousands of successful surgeries and satisfied patients.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-[#00A78E]" />,
    title: "Safe Procedures",
    desc: "Highest safety standards with comprehensive pre and post-operative care protocols.",
  },
  {
    icon: <Clock className="w-5 h-5 text-[#00A78E]" />,
    title: "Quick Recovery",
    desc: "Minimally invasive techniques ensuring faster recovery and shorter hospital stays.",
  },
  {
    icon: <HeartPulse className="w-5 h-5 text-[#00A78E]" />,
    title: "Lifetime Support",
    desc: "Continuous follow-up care and support throughout your weight loss journey.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-10 bg-[#F9FAFB] select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row items-stretch gap-12">
          {/* Left Side Content & Features Grid */}
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-[36px] md:text-[42px] font-semibold text-[#1A1A1A] leading-tight mb-4">
              Why Choose <span className="text-[#8B263E]">Dr. Awais</span>{" "}
              <span className="text-[#00A78E]">Malik?</span>
            </h2>
            <p className="text-gray-500 font-medium text-base md:text-lg leading-relaxed mb-10 max-w-2xl">
              With over 10 years of experience and thousands of successful surgeries, Prof. Dr.
              Awais Malik is one of Pakistan&apos;s most trusted bariatric and laparoscopic
              surgeons.
            </p>

            {/* 2-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
              {features.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="p-3 bg-[#00A78E]/10 rounded-xl shrink-0 mt-0.5">{item.icon}</div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-[#1A1A1A]">{item.title}</h3>
                    <p className="text-sm font-semibold text-gray-400 leading-snug">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Solid Teal Card */}
          <div className="lg:w-[45%] bg-[#2A9D8F] p-8 sm:p-12 rounded-[32px] text-white flex flex-col justify-between shadow-xl shadow-[#2A9D8F]/10 relative overflow-hidden">
            <div className="space-y-3">
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                Our Hospital Locations
              </h3>
              <p className="text-emerald-50/80 font-semibold text-sm sm:text-base leading-relaxed">
                World-class medical facilities with modern infrastructure and dedicated bariatric
                surgery centers.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 my-10 border-b border-white/20 pb-10">
              <div className="space-y-0.5">
                <div className="text-3xl sm:text-4xl font-semibold tracking-tight">10+</div>
                <div className="text-emerald-100/70 font-semibold text-xs sm:text-sm">
                  Years of Excellence
                </div>
              </div>
              <div className="space-y-0.5">
                <div className="text-3xl sm:text-4xl font-semibold tracking-tight">99%</div>
                <div className="text-emerald-100/70 font-semibold text-xs sm:text-sm">
                  Success Rate
                </div>
              </div>
              <div className="space-y-0.5">
                <div className="text-3xl sm:text-4xl font-semibold tracking-tight">20000+</div>
                <div className="text-emerald-100/70 font-semibold text-xs sm:text-sm">
                  Happy Patients
                </div>
              </div>
              <div className="space-y-0.5">
                <div className="text-3xl sm:text-4xl font-semibold tracking-tight">24/7</div>
                <div className="text-emerald-100/70 font-semibold text-xs sm:text-sm">
                  Emergency Care
                </div>
              </div>
            </div>

            {/* Locations List */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C1FF72] shrink-0 mt-0.5" />
                <p className="text-sm font-semibold text-emerald-50 leading-snug">
                  Mid City Hospital, 10 C Jail Rd, Shadman, Lahore
                </p>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C1FF72] shrink-0 mt-0.5" />
                <p className="text-sm font-semibold text-emerald-50 leading-snug">
                  Fatima Memorial Hospital, Shadman, Lahore
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

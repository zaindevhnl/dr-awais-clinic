import { GraduationCap } from "lucide-react";
import { QUALIFICATIONS } from "@/lib/clone-content";

/**
 * The post-nominals, set out and explained. Patients rarely know what MRCS or
 * ATLS mean, so each card names the award and says plainly what it certifies.
 */
export function QualificationsSection() {
  return (
    <section className="py-14 sm:py-20 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="space-y-5 lg:max-w-2xl">
            <div className="inline-block">
              <span className="bg-[#C1FF72] text-[#1A1A1A] px-7 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest">
                Qualifications
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-semibold text-[#1A1A1A] leading-tight tracking-tight">
              The Letters After the{" "}
              <span className="relative inline-block px-1">
                <span className="relative z-10">Name</span>
                <div className="absolute -bottom-1 left-0 w-full h-3 bg-[#C1FF72]/80 -rotate-1 rounded-full z-0"></div>
              </span>
            </h2>
          </div>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed lg:max-w-sm">
            Medical post-nominals are rarely explained to the people they are meant to reassure.
            Here is what each one certifies, in plain language.
          </p>
        </div>

        {/* Qualification rows */}
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
          {QUALIFICATIONS.map((q, index) => (
            <div
              key={q.abbr}
              className={
                "flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 p-6 sm:p-8 group hover:bg-[#F4F9F8] transition-colors duration-300 " +
                (index !== QUALIFICATIONS.length - 1 ? "border-b border-gray-100" : "")
              }
            >
              {/* Abbreviation */}
              <div className="sm:w-[150px] shrink-0 flex items-center gap-3">
                <span className="w-11 h-11 rounded-2xl bg-[#C1FF72] grid place-items-center shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300">
                  <GraduationCap className="w-5 h-5 text-[#1A1A1A]" />
                </span>
                <span className="text-2xl font-bold text-[#1A1A1A] tracking-tight">{q.abbr}</span>
              </div>

              {/* Full title */}
              <div className="sm:w-[300px] shrink-0">
                <h3 className="text-base sm:text-lg font-semibold text-[#1A1A1A] leading-snug">
                  {q.title}
                </h3>
              </div>

              {/* What it certifies */}
              <p className="flex-1 text-sm text-gray-500 leading-relaxed">{q.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

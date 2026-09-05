"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Stethoscope } from "lucide-react";
import { DOCTORS } from "@/lib/clone-content";

export type ProfileContent = {
  badge: string;
  headingLead: string;
  headingAccent: string;
  headingTail: string;
  biography: string;
  approach: string;
  specialisms: string[];
  primaryCta: string;
  secondaryCta: string;
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
} as const;

/**
 * The About page opener: who the surgeon is, in his own right. Deliberately
 * unlike the home page's AboutSection -- portrait left, prose right, and the
 * specialisations spelled out rather than summarised in badges.
 */
export function DoctorProfile({ content }: { content: ProfileContent }) {
  const doctor = DOCTORS[0];

  return (
    <section className="w-full bg-white py-14 sm:py-20 px-4 sm:px-6 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* LEFT: Portrait */}
        <motion.div
          className="lg:col-span-5 relative"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="relative rounded-[2.5rem] overflow-hidden border-4 border-white shadow-[0_20px_50px_rgba(0,0,0,0.10)] bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-[420px] sm:h-[520px] object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0A0A0A]/80 to-transparent p-6 pt-16">
              <h2 className="text-white text-2xl font-bold tracking-tight">{doctor.name}</h2>
              <p className="text-[#C1FF72] text-xs font-semibold uppercase tracking-widest mt-1">
                {doctor.expertise}
              </p>
            </div>
          </div>

          {/* Decorative ring, echoing the roundel in the wordmark */}
          <div className="absolute -z-10 -top-6 -left-6 w-32 h-32 border-[14px] border-[#C1FF72]/25 rounded-full pointer-events-none" />
        </motion.div>

        {/* RIGHT: Biography */}
        <motion.div
          className="lg:col-span-7 space-y-6"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="inline-block">
            <span className="bg-[#C1FF72] text-[#1A1A1A] px-7 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest">
              {content.badge}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-[46px] font-semibold text-[#1A1A1A] leading-[1.15] tracking-tight">
            {content.headingLead}{" "}
            <span className="relative inline-block px-1">
              <span className="relative z-10">{content.headingAccent}</span>
              <div className="absolute -bottom-1 left-0 w-full h-3 bg-[#C1FF72]/80 -rotate-1 rounded-full z-0"></div>
            </span>{" "}
            {content.headingTail}
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">{content.biography}</p>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            {content.approach}
          </p>

          {/* Specialisations */}
          <div className="pt-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400 mb-4">
              Areas of Practice
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {content.specialisms.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 bg-[#F9FAFB] border border-gray-100 rounded-2xl px-5 py-4"
                >
                  <span className="w-9 h-9 rounded-xl bg-[#00A78E]/10 text-[#00A78E] grid place-items-center shrink-0">
                    <Stethoscope className="w-4 h-4" />
                  </span>
                  <span className="text-sm font-semibold text-[#1A1A1A] leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/contact"
              className="flex items-center gap-2 bg-[#00A78E] text-white px-7 py-4 rounded-xl font-bold text-sm shadow-lg shadow-[#00A78E]/20 hover:bg-[#059781] transition-all duration-300"
            >
              <Calendar className="w-4 h-4" />
              {content.primaryCta}
            </Link>
            <Link
              href="/services"
              className="flex items-center gap-2 bg-white text-[#1A1A1A] border border-gray-200 px-7 py-4 rounded-xl font-bold text-sm hover:border-[#00A78E] hover:text-[#00A78E] transition-all duration-300"
            >
              {content.secondaryCta}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

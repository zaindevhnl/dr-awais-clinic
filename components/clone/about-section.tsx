"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Award,
  ShieldCheck,
  Users,
  ArrowRight,
  Calendar,
  CheckCircle2,
} from "lucide-react";
export type IntroContent = {
  badges: string[];
  headingLead: string;
  headingAccent: string;
  description: string;
  features: { title: string; description: string }[];
  primaryCta: string;
  secondaryCta: string;
  badgeTopValue: string;
  badgeTopLabel: string;
  badgeBottomValue: string;
  badgeBottomLabel: string;
};

const fadeInUp = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
} as const;

export function AboutSection({
  content,
  image = "/clone/dr.jpg",
}: {
  content: IntroContent;
  image?: string;
}) {

  return (
    <section className="w-full bg-gradient-to-br from-slate-50 via-zinc-50 to-emerald-50/20 py-10 md:py-10 px-4 sm:px-6 lg:px-16 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* LEFT COLUMN: CONTENT & FEATURES */}
        <motion.div
          className="lg:col-span-7 flex flex-col space-y-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Top Badges Row with Glassmorphism */}
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
            {content.badges.map((text, i) => {
              const BadgeIcon = [ShieldCheck, Award, Users][i % 3];
              return (
              <span
                key={i}
                className="flex items-center gap-2 bg-white/80 backdrop-blur-md border border-slate-200/60 text-slate-700 px-4 py-2 rounded-xl text-xs font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
              >
                <BadgeIcon className="w-4 h-4 text-[#00A78E]" />
                {text}
              </span>
              );
            })}
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 leading-[1.15] tracking-tight"
          >
            {content.headingLead}{" "}
            <span className="text-[#80223A] bg-gradient-to-r from-[#80223A] to-[#9c2e4b] bg-clip-text text-transparent">
              {content.headingAccent}
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-[640px]"
          >
            {content.description}
          </motion.p>

          {/* Key Features Cards */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 max-w-[680px]"
          >
            {content.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-white border border-slate-100 p-5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:border-emerald-500/10 transition-all duration-300 group"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-[#00A78E] shrink-0 group-hover:bg-[#00A78E] group-hover:text-white transition-all duration-300">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-slate-900 tracking-tight">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/contact"
              className="flex items-center gap-2 bg-[#00A78E] text-white px-7 py-4 rounded-xl font-bold text-sm shadow-lg shadow-[#00A78E]/20 hover:bg-[#059781] hover:shadow-xl hover:shadow-[#00A78E]/30 active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              {content.primaryCta}
            </Link>

            <Link
              href="/about"
              className="flex items-center gap-2 bg-[#00A78E] text-white px-7 py-4 rounded-xl font-bold text-sm shadow-lg shadow-[#00A78E]/20 hover:bg-[#059781] hover:shadow-xl hover:shadow-[#00A78E]/30 active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              {content.secondaryCta}
              <ArrowRight className="w-4 h-4 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: INTERACTIVE IMAGE WINDOW */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end relative w-full pt-12 lg:pt-0">
          <motion.div
            className="relative w-[320px] sm:w-[400px] h-[440px] sm:h-[520px] bg-slate-100 rounded-[3rem] border-4 border-white shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={content.headingAccent}
              className="w-full h-full object-cover rounded-[2.7rem]"
            />

            {/* Top Right Floating Badge */}
            <motion.div
              className="absolute -top-6 -right-4 bg-gradient-to-b from-[#80223A] to-[#681b2e] text-white p-4 rounded-2xl shadow-[0_10px_25px_rgba(128,34,58,0.3)] flex flex-col items-center justify-center text-center min-w-[100px]"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <span className="text-2xl font-extrabold leading-none tracking-tight">
                {content.badgeTopValue}
              </span>
              <span className="text-[10px] font-bold text-slate-200/90 mt-1 uppercase tracking-wider">
                {content.badgeTopLabel}
              </span>
            </motion.div>

            {/* Bottom Left Floating Badge */}
            <motion.div
              className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-slate-100 max-w-[190px]"
              animate={{ y: [0, 8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-white font-bold text-xl shadow-md">
                ★
              </div>
              <div>
                <h5 className="text-lg font-extrabold text-slate-900 leading-none">
                  {content.badgeBottomValue}
                </h5>
                <p className="text-[11px] text-slate-400 font-bold mt-1 tracking-wide">
                  {content.badgeBottomLabel}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

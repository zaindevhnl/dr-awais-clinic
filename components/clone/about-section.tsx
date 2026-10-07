"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Award, Calendar, Check, MapPin, ShieldCheck, Star } from "lucide-react";

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
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
} as const;

/** Oversized editorial words that sit around the portrait on wide screens. */
const display =
  "font-heading font-extrabold uppercase leading-[0.9] tracking-[-0.03em] text-[clamp(2.75rem,4.9vw,4.6rem)]";

/**
 * The home hero, laid out editorially: a deep-green band across the top, the
 * heading broken into oversized words around an arched portrait.
 *
 * The heading's first word sits in the band; the rest of the lead and the
 * accent fall either side of the portrait below it. On small screens the
 * same heading reads as one ordinary h1 instead.
 */
export function AboutSection({
  content,
  image = "/clone/dr-awais-coat.webp",
}: {
  content: IntroContent;
  image?: string;
}) {
  const [eyebrow, ...places] = content.badges;
  const [bandWord, ...leadRest] = content.headingLead.trim().split(/\s+/);
  // "Experience" reads as "Years of Experience"; a label that already
  // mentions years is shown as written.
  const experienceLabel = /year/i.test(content.badgeTopLabel)
    ? content.badgeTopLabel
    : `Years of ${content.badgeTopLabel}`;

  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* The band, wide screens only; on phones the first cell carries it */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 hidden h-[184px] overflow-hidden bg-[#0B3D36] lg:block"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_0%,#5FD3BC2E,transparent_60%)]" />
        <svg
          className="absolute inset-0 h-full w-full text-white/[0.07]"
          viewBox="0 0 1440 300"
          preserveAspectRatio="none"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M0 210 C 240 120, 480 290, 760 170 S 1200 60, 1440 150" />
          <path d="M0 240 C 260 160, 520 300, 800 200 S 1220 100, 1440 190" />
          <path d="M0 120 C 300 40, 560 200, 860 90 S 1260 10, 1440 70" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:grid lg:grid-cols-[1fr_minmax(300px,370px)_1fr] lg:grid-rows-[168px_auto_auto] lg:gap-x-10 lg:px-10 lg:pt-4">
        {/* Band, left: eyebrow, the h1 for small screens, and the trust figures */}
        <motion.div
          className="-mx-4 flex flex-col justify-center gap-6 bg-[#0B3D36] px-4 py-10 text-white sm:-mx-6 sm:px-6 lg:col-start-1 lg:row-start-1 lg:mx-0 lg:bg-transparent lg:px-0 lg:py-0"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {eyebrow && (
            <motion.span
              variants={fadeInUp}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur"
            >
              <ShieldCheck className="h-4 w-4 text-[#5FD3BC]" />
              {eyebrow}
            </motion.span>
          )}

          <motion.h1
            variants={fadeInUp}
            className="font-heading text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:sr-only"
          >
            {content.headingLead} <span className="text-[#5FD3BC]">{content.headingAccent}</span>
          </motion.h1>

          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
              </div>
              <div>
                <div className="text-xl font-bold leading-none">4.9 / 5</div>
                <div className="mt-1 text-xs font-medium text-white/70">Google rating</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
                <MapPin className="h-5 w-5 text-[#5FD3BC]" />
              </div>
              <div>
                <div className="text-xl font-bold leading-none">{content.badgeBottomValue}</div>
                <div className="mt-1 text-xs font-medium text-white/70">
                  {content.badgeBottomLabel}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Band, right: the first word of the heading */}
        <div
          aria-hidden="true"
          className={`hidden self-end pb-6 text-right text-white lg:col-start-3 lg:row-start-1 lg:block ${display}`}
        >
          {bandWord}
        </div>

        {/* Centre: the cut-out portrait, standing over the band and fading into
            the page at the coat, with the booking button beneath */}
        <motion.div
          className="relative mx-auto mt-6 flex w-full max-w-[360px] flex-col items-center lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:mt-2 lg:max-w-none lg:self-start"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        >
          {/* Soft mint halo so the figure reads against white on phones */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-[18%] h-[62%] w-[92%] -translate-x-1/2 rounded-full bg-[#5FD3BC]/15 blur-3xl lg:hidden"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt="Dr. Awais Malik"
            width={900}
            height={1205}
            fetchPriority="high"
            className="relative w-full [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)] lg:w-[118%] lg:max-w-none"
          />

          <Link
            href="/contact"
            className="relative -mt-10 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#0B3D36] px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-[#0B3D36]/30 transition-colors duration-300 hover:bg-[#0F5249]"
          >
            <Calendar className="h-4 w-4" />
            {content.primaryCta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Row 2, left: the rest of the lead */}
        {leadRest.length > 0 && (
          <div
            aria-hidden="true"
            className={`hidden items-center border-b border-slate-200 py-8 text-[#0F1F1C] lg:col-start-1 lg:row-start-2 lg:flex ${display}`}
          >
            {leadRest.join(" ")}
          </div>
        )}

        {/* Row 2, right: the description */}
        <div className="mt-14 flex gap-4 border-slate-200 lg:col-start-3 lg:row-start-2 lg:mt-0 lg:items-center lg:border-b lg:py-7">
          <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F6F3] text-[#0B3D36] sm:flex">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm leading-relaxed text-slate-600">{content.description}</p>
            <Link
              href="/about"
              className="group mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B3D36] hover:text-[#0F5249]"
            >
              {content.secondaryCta}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Row 3, right: the accent */}
        <div
          aria-hidden="true"
          className={`hidden items-center justify-end py-8 text-right text-[#0B3D36] lg:col-start-3 lg:row-start-3 lg:flex ${display}`}
        >
          <span className="bg-[linear-gradient(transparent_64%,#5FD3BC80_64%,#5FD3BC80_92%,transparent_92%)] px-1">
            {content.headingAccent}
          </span>
        </div>


        {places.length > 0 && (
          <ul className="mt-6 space-y-2 lg:hidden">
            {places.map((place, i) => (
              <li key={i} className="flex items-start gap-2 text-sm font-medium text-slate-600">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#0B3D36]" />
                {place}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Experience + approach: the years on a deep-green panel, the four
          promises beside it as a numbered grid */}
      <div className="relative bg-[#F3FAF8] px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
        <motion.div
          className="mx-auto grid max-w-7xl overflow-hidden rounded-[28px] bg-white shadow-xl shadow-[#0B3D36]/[0.06] ring-1 ring-[#0B3D36]/5 lg:grid-cols-[minmax(280px,340px)_1fr]"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Experience panel */}
          <motion.div
            variants={fadeInUp}
            className="relative flex flex-col justify-between gap-10 overflow-hidden bg-[#0B3D36] p-8 text-white sm:p-10"
          >
            <div
              aria-hidden="true"
              className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#5FD3BC]/15 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-24 -left-10 h-56 w-56 rounded-full border-[28px] border-white/[0.04]"
            />

            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
              <Award className="h-6 w-6 text-[#5FD3BC]" />
            </div>

            <div className="relative">
              <div className="font-heading text-7xl font-extrabold leading-none tracking-tight sm:text-8xl">
                {content.badgeTopValue}
              </div>
              <div className="mt-3 text-lg font-semibold">{experienceLabel}</div>
              <div className="mt-4 h-1 w-12 rounded-full bg-[#5FD3BC]" />
              {eyebrow && (
                <p className="mt-4 text-sm leading-relaxed text-white/70">{eyebrow}</p>
              )}
            </div>
          </motion.div>

          {/* The four promises */}
          {content.features.length > 0 && (
            <ul className="grid sm:grid-cols-2">
              {content.features.map((feature, index) => (
                <motion.li
                  key={index}
                  variants={fadeInUp}
                  className="group relative border-slate-100 p-7 transition-colors duration-300 hover:bg-[#F3FAF8] sm:p-9 [&:not(:last-child)]:border-b sm:[&:nth-child(odd)]:border-r sm:[&:nth-last-child(2):nth-child(odd)]:border-b-0"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F6F3] text-[#0B3D36] transition-colors duration-300 group-hover:bg-[#0B3D36] group-hover:text-white">
                      <Check className="h-5 w-5" strokeWidth={2.5} />
                    </div>
                    <span className="font-heading text-3xl font-bold text-[#0B3D36]/10 transition-colors duration-300 group-hover:text-[#0B3D36]/30">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-[#0F1F1C]">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {feature.description}
                  </p>
                </motion.li>
              ))}
            </ul>
          )}
        </motion.div>
      </div>
    </section>
  );
}

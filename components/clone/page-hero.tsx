"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function PageHero({ title, breadcrumb }: { title: string; breadcrumb: string }) {
  return (
    <section
      className="relative w-full bg-cover bg-center bg-no-repeat pt-28 pb-24 overflow-hidden border-b border-gray-200/10 flex items-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1440&auto=format&fit=crop')",
      }}
    >
      {/* Dark Overlay Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/70 via-[#1A1A1A]/55 to-[#1A1A1A]/70 backdrop-blur-[2px] pointer-events-none" />

      {/* Ambient Glow Orbs */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#C1FF72]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-16 w-80 h-80 bg-[#00A78E]/20 rounded-full blur-3xl pointer-events-none" />

      {/* SVG Icon Mesh */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="relative w-[550px] h-full opacity-[0.04] translate-x-16">
          <svg
            viewBox="0 0 512 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-white"
          >
            <path
              d="M340 120c0 33-27 60-60 60s-60-27-60-60 27-60 60-60 60 27 60 60z"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M220 280v140c0 22 18 40 40 40h40c22 0 40-18 40-40V280M180 200h200c33 0 60 27 60 60v40"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Content Wrapper */}
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-16 lg:px-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6">
          {/* Left: Eyebrow + Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="md:flex-1"
          >
            <span className="inline-flex items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#C1FF72]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C1FF72]" />
              Welcome
            </span>

            <h1 className="text-4xl md:text-[46px] font-bold text-white tracking-tight leading-none drop-shadow-md">
              {title}
            </h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 56 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
              className="h-[3px] bg-gradient-to-r from-[#C1FF72] to-[#00A78E] rounded-full mt-5 mx-auto md:mx-0"
            />
          </motion.div>

          {/* Right: Breadcrumbs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="flex items-center space-x-2 text-[15px] font-semibold mt-2 md:mt-0 drop-shadow-sm bg-white/5 border border-white/10 rounded-full px-5 py-2.5 backdrop-blur-sm"
          >
            <Link
              href="/"
              className="text-gray-200 hover:text-[#C1FF72] cursor-pointer transition-colors duration-300"
            >
              Home
            </Link>
            <span className="text-gray-400 font-normal">/</span>
            <span className="text-[#C1FF72] font-bold tracking-wide">{breadcrumb}</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

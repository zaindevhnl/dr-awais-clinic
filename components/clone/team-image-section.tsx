"use client";

import { motion } from "framer-motion";

export function TeamImageSection() {
  return (
    <section className="relative w-full pb-10 overflow-visible bg-white pt-12 sm:pt-16">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-[-20%] sm:left-[-10%] w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] border-[20px] sm:border-[40px] border-[#C1FF72]/20 rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative overflow-visible">
        <div className="relative rounded-[24px] sm:rounded-[40px] overflow-visible shadow-2xl shadow-black/5">
          {/* Working Since Badge */}
          <div className="absolute -top-4 sm:-top-6 right-4 sm:right-10 md:right-[15%] -translate-y-1/2 z-30 w-28 h-28 sm:w-35 sm:h-36 lg:w-30 lg:h-30 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-[#C1FF72] rounded-full shadow-2xl shadow-[#C1FF72]/40 flex items-center justify-center"
            >
              {/* Circular Text using SVG */}
              <svg className="w-full h-full p-1.5 sm:p-2" viewBox="0 0 100 100">
                <defs>
                  <path
                    id="circlePath"
                    d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                  />
                </defs>
                <text className="text-[11px] sm:text-[10px] font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] fill-[#1A1A1A]">
                  <textPath href="#circlePath">
                    SAFE SURGICAL CARE • LAHORE, PAKISTAN •
                  </textPath>
                </text>
              </svg>
            </motion.div>

            {/* Static Center Icon */}
            <div className="relative z-20 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-[#C1FF72] rounded-full flex items-center justify-center">
              <div className="relative w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 flex items-center justify-center">
                <div className="absolute top-0 left-0 w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 border-2 border-[#1A1A1A]/30 rounded-sm"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-6 lg:h-6 border-2 border-[#1A1A1A] rounded-sm flex items-center justify-center bg-[#C1FF72]">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#1A1A1A] w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3"
                  >
                    <path d="M7 17l9.2-9.2M17 17V7H7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* The Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/clone/hero1-thumb.jpg"
            alt="Medical Team Meeting"
            className="w-full h-[300px] sm:h-[450px] md:h-[550px] lg:h-auto object-cover rounded-[24px] sm:rounded-[40px] block"
          />
        </div>
      </div>
    </section>
  );
}

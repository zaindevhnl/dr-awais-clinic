"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { DOCTORS } from "@/lib/clone-content";

export function DoctorsList() {
  const [hoveredDoctor, setHoveredDoctor] = useState<string | null>(null);

  return (
    <section className="py-20 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 w-full">
      {/* Column Headers */}
      <div className="hidden md:flex items-center border-b-2 border-[#0A0A0A] pb-3 mb-0 px-4">
        <div className="w-[5%]" />
        <div className="w-[25%] text-[10px] font-semibold tracking-[0.14em] uppercase text-[#1a1a1a]">
          Doctor
        </div>
        <div className="w-[18%] text-[10px] font-semibold tracking-[0.14em] uppercase text-[#1a1a1a]">
          Specialty
        </div>
        <div className="flex-1 text-[10px] font-semibold tracking-[0.14em] uppercase text-[#1a1a1a]">
          About
        </div>
      </div>

      <div className="flex flex-col">
        {DOCTORS.map((doc, index) => (
          <Link
            key={doc.id}
            href={`/doctors/${doc.id}`}
            className="relative flex flex-col md:flex-row items-center border-b border-[#E8E8E4] py-7 px-4 cursor-pointer transition-all duration-200 hover:bg-white hover:rounded-lg group -mx-4 hover:px-4"
            onMouseEnter={() => setHoveredDoctor(doc.id)}
            onMouseLeave={() => setHoveredDoctor(null)}
          >
            {/* Index Number */}
            <div className="hidden md:block w-[5%]">
              <span className="font-serif text-sm text-[#1a1a1a] group-hover:text-[#00A78E] transition-colors">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Doctor Name */}
            <div className="md:w-[25%] mb-3 md:mb-0">
              <h3 className="text-[19px] font-semibold text-[#0A0A0A] group-hover:text-[#00A78E] transition-colors leading-tight">
                {doc.name}
              </h3>
            </div>

            {/* Expertise Tag */}
            <div className="md:w-[18%] mb-3 md:mb-0">
              <span className="inline-block text-[10px] font-semibold uppercase tracking-widest text-[#00A78E] bg-[#E8FAF5] px-3 py-1 rounded-full">
                {doc.expertise}
              </span>
            </div>

            {/* Description */}
            <div className="flex-1 mb-5 md:mb-0 pr-6">
              <p className="text-sm text-gray-500 leading-relaxed">{doc.description}</p>
            </div>

            {/* Arrow Button */}
            <div className="md:ml-4">
              <div
                className={
                  "w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-200 " +
                  (hoveredDoctor === doc.id
                    ? "bg-[#C1FF72] border-[#C1FF72]"
                    : "bg-white border-[#E8E8E4]")
                }
              >
                <ArrowRight
                  className={
                    "w-4 h-4 transition-colors " +
                    (hoveredDoctor === doc.id ? "text-[#0A0A0A]" : "text-gray-400")
                  }
                />
              </div>
            </div>

            {/* Hover Image Tooltip */}
            <AnimatePresence>
              {hoveredDoctor === doc.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, rotate: 0 }}
                  animate={{ opacity: 1, scale: 1, rotate: 3 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="absolute right-20 top-1/2 -translate-y-1/2 z-20 pointer-events-none hidden lg:block"
                >
                  <div className="w-[110px] h-[136px] rounded-[24px] overflow-hidden border-[6px] border-white shadow-xl shadow-black/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
        ))}
      </div>
    </section>
  );
}

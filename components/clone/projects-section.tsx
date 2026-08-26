import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PROJECTS } from "@/lib/clone-content";

export function ProjectsSection() {
  return (
    <section className="py-12 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-12 space-y-4">
          <div className="inline-block">
            <span className="bg-[#C1FF72] text-[#1A1A1A] px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-widest shadow-sm shadow-[#C1FF72]/10">
              Latest Project
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold text-[#1A1A1A] leading-[1.2] tracking-tight max-w-3xl mx-auto">
            Healing Lives One Patient <br className="hidden md:inline" /> at a Time Trusted{" "}
            <span className="relative inline-block px-1">
              <span className="relative z-10">Results</span>
              <div className="absolute -bottom-1 left-0 w-full h-3 bg-[#C1FF72]/80 -rotate-1 rounded-full z-0"></div>
            </span>
          </h2>
        </div>

        {/* Responsive Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {PROJECTS.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group cursor-pointer bg-[#FAFAFA] rounded-[32px] p-4 border border-gray-100 hover:bg-white hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.08)] transform hover:-translate-y-2 transition-all duration-500 block"
            >
              {/* Image Container with Hover Effect */}
              <div className="relative rounded-[24px] font-semibold overflow-hidden aspect-[4/3] mb-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Hover Overlay Layer */}
                <div className="absolute inset-0 bg-[#1A1A1A]/40 backdrop-blur-[2px] flex flex-col justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {/* Top Right: Arrow Icon Indicator */}
                  <div className="self-end w-12 h-12 bg-[#C1FF72] rounded-full flex items-center justify-center shadow-lg transform translate-y-[-10px] group-hover:translate-y-0 transition-transform duration-300">
                    <ArrowRight className="w-5 h-5 text-[#1A1A1A]" />
                  </div>

                  {/* Bottom: Floating Glassmorphism Text Info */}
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-[#C1FF72] text-xs font-semibold uppercase tracking-wider block mb-1">
                      {project.category}
                    </span>
                    <h4 className="text-white font-semibold text-lg line-clamp-1">
                      {project.title}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Standard Project Info */}
              <div className="px-2 pb-2 space-y-1">
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                  {project.category}
                </p>
                <h3 className="text-xl font-bold text-[#1A1A1A] group-hover:text-[#00A78E] transition-colors duration-300 line-clamp-1">
                  {project.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { ABOUT } from "@/lib/clone-content";

// Animates whenever the section enters the screen.
function AnimatedCounter({ targetValue }: { targetValue: string }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement | null>(null);

  const numericValue = parseInt(targetValue.replace(/[^0-9]/g, ""), 10) || 0;
  const suffix = targetValue.replace(/[0-9]/g, "");

  useEffect(() => {
    const element = elementRef.current;
    let startTimestamp: number | null = null;
    const duration = 2000;
    let animationFrameId: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * numericValue));
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCount(numericValue);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startTimestamp = null;
          animationFrameId = window.requestAnimationFrame(step);
        } else {
          setCount(0);
          if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.1 },
    );

    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    };
  }, [numericValue]);

  return (
    <span ref={elementRef}>
      {count}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const stats = ABOUT.stats;

  return (
    <section className="py-10 sm:py-2 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#1A1A1A] rounded-[30px] sm:rounded-[40px] p-8 sm:p-12 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
          {/* Left Side Title */}
          <div className="text-center lg:text-left max-w-xs lg:max-w-sm shrink-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C1FF72]/50 mb-3">
              Our Achievements
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#C1FF72] leading-tight tracking-tight">
              Tomorrow&apos;s Health <br />
              <span className="relative inline-block">
                Today&apos;s Care
                <div className="absolute -bottom-1 left-0 w-full h-2.5 bg-black/10 -rotate-1 rounded-full"></div>
              </span>
            </h2>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px h-24 bg-[#C1FF72]/15 shrink-0"></div>
          <div className="block lg:hidden w-24 h-px bg-[#C1FF72]/15 shrink-0"></div>

          {/* Right Side Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10 w-full lg:w-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2 group">
                <div className="text-3xl sm:text-4xl font-semibold text-[#C1FF72] tracking-tighter group-hover:scale-110 transition-transform duration-300">
                  <AnimatedCounter targetValue={stat.value} />
                </div>
                <div className="w-8 h-0.5 bg-[#C1FF72]/20 mx-auto rounded-full"></div>
                <p className="text-[#C1FF72] font-bold text-xs sm:text-sm opacity-70 uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

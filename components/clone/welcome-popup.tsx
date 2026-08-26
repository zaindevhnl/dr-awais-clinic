"use client";

import { useEffect, useState } from "react";

export function WelcomePopup({
  onBook,
  phone = "0300-396-8500",
}: {
  onBook: () => void;
  phone?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);

  // sessionStorage is client-only, so the popup can only be decided after
  // mount -- the first render must match the server output (hidden).
  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("hasSeenWelcomePopup");
    if (!hasSeenPopup) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVisible(true);
      sessionStorage.setItem("hasSeenWelcomePopup", "true");
    }
  }, []);

  if (!isVisible) return null;

  const closePopup = () => setIsVisible(false);

  const openBooking = () => {
    setIsVisible(false);
    onBook();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center sm:p-4">
      {/* Main Container */}
      <div className="bg-white sm:rounded-[2rem] max-w-[420px] sm:max-w-[450px] w-full max-h-[92vh] sm:max-h-[580px] shadow-2xl relative overflow-hidden flex flex-col justify-between border border-gray-100">
        {/* Close Button */}
        <button
          onClick={closePopup}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 text-white/80 hover:text-white text-xl font-light transition-all z-[10000] cursor-pointer p-1 rounded-full bg-black/10 sm:bg-transparent"
          aria-label="Close welcome popup"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="overflow-y-auto flex-1 flex flex-col">
          {/* Top Teal Section */}
          <div className="bg-[#059781] p-5 sm:p-6 pb-5">
            <div className="flex items-center gap-3">
              <div className="bg-white/15 rounded-xl p-2 sm:p-2.5 flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide leading-tight">
                  Book Your Appointment
                </h2>
                <p className="text-white/80 text-[11px] sm:text-xs font-medium mt-0.5">
                  Expert Bariatric &amp; Weight Loss Care
                </p>
              </div>
            </div>

            {/* Doctor Info Card */}
            <div className="mt-4 bg-white/10 rounded-2xl p-3 sm:p-3.5 flex items-center gap-3 sm:gap-4 border border-white/5">
              <div className="relative flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/clone/imm.jpg"
                  alt="Dr. Awais Malik"
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-white/20 shadow-sm"
                />
              </div>
              <div className="text-white">
                <h3 className="text-sm sm:text-base font-bold leading-tight">Dr. Awais Malik</h3>
                <p className="text-[11px] sm:text-xs text-white/85 mt-0.5">
                  Bariatric &amp; Laparoscopic Surgeon
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold ml-1 text-white/90">5.0</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Content Section */}
          <div className="bg-[#F8FBFB] p-4 sm:p-5 pt-4 space-y-4 flex-1 flex flex-col justify-between">
            {/* Info Rows */}
            <div className="space-y-3">
              {/* Available Row */}
              <div className="flex items-center gap-3 sm:gap-4 px-1">
                <div className="bg-[#059781]/10 rounded-full p-2 text-[#059781] flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                    Available Mon - Sat
                  </h4>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">9:00 AM - 6:00 PM</p>
                </div>
              </div>

              {/* Call Action Row */}
              <div className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-2xl bg-white/50 border border-gray-100/80 shadow-sm">
                <div className="bg-[#059781]/10 rounded-full p-2 text-[#059781] flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                    Call Now
                  </h4>
                  <p className="text-xs text-[#059781] mt-0.5 font-extrabold tracking-wide">
                    {phone}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={openBooking}
                className="w-full bg-[#059781] hover:bg-[#047d6b] text-white text-xs sm:text-sm font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm cursor-pointer transform active:scale-[0.98]"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Book Appointment Now</span>
              </button>

              <button
                onClick={closePopup}
                className="w-full bg-transparent border border-[#059781]/40 text-[#059781] hover:bg-[#059781]/5 text-xs sm:text-sm font-bold py-2.5 px-4 rounded-xl transition-all duration-300 cursor-pointer text-center"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

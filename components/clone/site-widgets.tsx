"use client";

import { useState } from "react";
import { BookingPopup } from "@/components/clone/booking-popup";
import { WelcomePopup } from "@/components/clone/welcome-popup";
import { WhatsAppWidget } from "@/components/clone/whatsapp-widget";
import type { Service } from "@/types/database.types";

/**
 * The floating layer of the reference design: welcome modal on first visit,
 * a persistent booking button, the booking modal and the WhatsApp chat bubble.
 */
export function SiteWidgets({
  services,
  whatsapp,
  phone,
}: {
  services: Pick<Service, "id" | "title">[];
  whatsapp?: string;
  phone?: string;
}) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <WelcomePopup onBook={() => setIsBookingOpen(true)} phone={phone} />

      {/* Floating Booking Button */}
      <div className="fixed bottom-5 right-5 z-[999]">
        <button
          onClick={() => setIsBookingOpen(true)}
          className="bg-[#059781] hover:bg-[#047d6b] text-white p-3.5 md:px-5 md:py-3 rounded-full font-semibold shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105 flex items-center justify-center gap-2"
          aria-label="Book Appointment"
        >
          <svg
            className="w-6 h-6 md:w-5 md:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="hidden md:inline">Book Appointment</span>
        </button>
      </div>

      <WhatsAppWidget phone={(whatsapp ?? "").replace(/\D/g, "") || undefined} />

      <BookingPopup
        isVisible={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        services={services}
      />
    </>
  );
}

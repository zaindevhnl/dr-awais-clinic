"use client";

import { useState } from "react";
import { BookingPopup } from "@/components/clone/booking-popup";
import { WelcomePopup } from "@/components/clone/welcome-popup";
import { WhatsAppWidget } from "@/components/clone/whatsapp-widget";
import type { Service } from "@/types/database.types";

/**
 * The floating layer of the reference design: welcome modal on first visit,
 * the booking modal it opens, and the WhatsApp chat bubble.
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

      <WhatsAppWidget phone={(whatsapp ?? "").replace(/\D/g, "") || undefined} />

      <BookingPopup
        isVisible={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        services={services}
      />
    </>
  );
}

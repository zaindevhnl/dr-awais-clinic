"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { createAppointment } from "@/app/actions/appointments";
import { EMPTY_STATE } from "@/lib/forms";
import type { Service } from "@/types/database.types";

const TIME_SLOTS = [
  { value: "09:00", label: "09:00 AM" },
  { value: "09:30", label: "09:30 AM" },
  { value: "10:00", label: "10:00 AM" },
  { value: "10:30", label: "10:30 AM" },
  { value: "11:00", label: "11:00 AM" },
  { value: "11:30", label: "11:30 AM" },
  { value: "12:00", label: "12:00 PM" },
  { value: "12:30", label: "12:30 PM" },
  { value: "14:00", label: "02:00 PM" },
  { value: "14:30", label: "02:30 PM" },
  { value: "15:00", label: "03:00 PM" },
  { value: "15:30", label: "03:30 PM" },
  { value: "16:00", label: "04:00 PM" },
  { value: "16:30", label: "04:30 PM" },
  { value: "17:00", label: "05:00 PM" },
  { value: "17:30", label: "05:30 PM" },
];

export function BookingPopup({
  isVisible,
  onClose,
  services = [],
}: {
  isVisible: boolean;
  onClose: () => void;
  services?: Pick<Service, "id" | "title">[];
}) {
  const [appointmentType, setAppointmentType] = useState<"online" | "physical">("online");
  const [date, setDate] = useState("");
  const [state, formAction, pending] = useActionState(createAppointment, EMPTY_STATE);
  const mountedAt = useRef(0);
  const elapsedRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isVisible) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const today = new Date();
  const minDate = today.toISOString().split("T")[0];
  const sevenDaysLater = new Date();
  sevenDaysLater.setDate(today.getDate() + 7);
  const maxDate = sevenDaysLater.toISOString().split("T")[0];

  return (
    <div
      className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Book appointment"
    >
      {/* Main Container */}
      <div className="bg-[#F8FBFB] sm:rounded-3xl max-w-[450px] w-full shadow-2xl relative border border-gray-100 flex flex-col max-h-[92vh] sm:max-h-[90vh]">
        {/* Fixed Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 text-gray-400 hover:text-gray-700 transition-colors p-1.5 z-20 cursor-pointer bg-white/80 backdrop-blur-sm sm:bg-transparent rounded-full shadow-sm sm:shadow-none"
          aria-label="Close booking popup"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-8 pr-4 sm:pr-5">
          <h2 className="text-[18px] sm:text-[20px] font-bold text-center text-[#092642] mt-2 mb-5 sm:mb-6 tracking-wide">
            Book Appointment
          </h2>

          {/* Appointment Type Selection */}
          <div className="flex flex-row gap-3 sm:gap-4 mb-5 sm:mb-6">
            <button
              type="button"
              onClick={() => setAppointmentType("online")}
              className={
                "flex-1 py-3 px-3 sm:px-4 rounded-xl border-2 flex items-center justify-center gap-2 font-semibold transition-all text-sm sm:text-base cursor-pointer " +
                (appointmentType === "online"
                  ? "bg-[#059781]/5 border-[#059781] text-[#059781]"
                  : "bg-[#F8F9FA] border-[#EBF1F5] text-[#092642] hover:border-gray-300")
              }
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Online</span>
            </button>

            <button
              type="button"
              onClick={() => setAppointmentType("physical")}
              className={
                "flex-1 py-3 px-3 sm:px-4 rounded-xl border-2 flex items-center justify-center gap-2 font-semibold transition-all text-sm sm:text-base cursor-pointer " +
                (appointmentType === "physical"
                  ? "bg-[#059781]/5 border-[#059781] text-[#059781]"
                  : "bg-[#F8F9FA] border-[#EBF1F5] text-[#092642] hover:border-gray-300")
              }
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="whitespace-nowrap">Physical Visit</span>
            </button>
          </div>

          {/* Form */}
          <form
            action={formAction}
            onSubmit={() => {
              if (elapsedRef.current) {
                elapsedRef.current.value = String(Date.now() - mountedAt.current);
              }
            }}
            className="space-y-4 sm:space-y-5"
          >
            <input type="hidden" name="elapsedMs" ref={elapsedRef} defaultValue="0" />
            <input type="hidden" name="consent" value="on" />
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
              defaultValue=""
            />

            {/* Full Name */}
            <div>
              <label className="text-[14px] sm:text-[15px] font-semibold text-[#092642] mb-1.5 flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Full Name *
              </label>
              <input
                type="text"
                name="full_name"
                placeholder="Enter your full name"
                required
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-2 focus:border-[#059781] text-[#092642] font-semibold placeholder-gray-400/70 transition-all text-sm sm:text-base"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="text-[14px] sm:text-[15px] font-semibold text-[#092642] mb-1.5 flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Phone Number *
              </label>
              <input
                type="text"
                name="phone"
                placeholder="+92 xxx xxxxxxx"
                required
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-2 focus:border-[#059781] text-[#092642] font-semibold placeholder-gray-400/70 transition-all text-sm sm:text-base"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="text-[14px] sm:text-[15px] font-semibold text-[#092642] mb-1.5 flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-2 focus:border-[#059781] text-[#092642] font-semibold placeholder-gray-400/70 transition-all text-sm sm:text-base"
              />
            </div>

            {/* Service Required */}
            <div>
              <label className="block text-[14px] sm:text-[15px] font-semibold text-[#092642] mb-1.5">
                Service Required
              </label>
              <div className="relative">
                <select
                  name="service_id"
                  defaultValue=""
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-2 focus:border-[#059781] text-[#092642] font-semibold appearance-none cursor-pointer transition-all text-sm sm:text-base"
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.title}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Date and Time Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Date Input */}
              <div>
                <label className="text-[14px] sm:text-[15px] font-semibold text-[#092642] mb-1.5 flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Date *
                </label>
                <input
                  type="date"
                  name="preferred_date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  min={minDate}
                  max={maxDate}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 text-[13px] text-gray-500 bg-white focus:outline-none focus:border-2 focus:border-[#059781] font-semibold cursor-pointer transition-all"
                />
              </div>

              {/* Time Input */}
              <div>
                <label className="text-[14px] sm:text-[15px] font-semibold text-[#092642] mb-1.5 flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Time *
                </label>
                <div className="relative">
                  <select
                    name="preferred_time_slot"
                    required
                    disabled={!date}
                    defaultValue=""
                    className="w-full px-4 py-2.5 sm:py-3 rounded-xl border text-[13px] border-gray-200 bg-white focus:outline-none focus:border-2 focus:border-[#059781] text-gray-500 font-semibold appearance-none cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">{date ? "Select a time" : "Date first"}</option>
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot.value} value={slot.value}>
                        {slot.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Visit type travels with the request as a note. */}
            <input
              type="hidden"
              name="message"
              value={`Preferred visit type: ${appointmentType === "online" ? "Online consultation" : "Physical visit"}`}
            />

            {state.error && (
              <p className="text-red-500 text-xs font-semibold bg-red-50 px-4 py-3 rounded-xl">
                {state.error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={pending}
              className="w-full bg-[#059781] hover:bg-[#047d6b] text-white text-xs sm:text-sm font-bold py-3 px-4 rounded-xl cursor-pointer transition-colors duration-300 mt-2 sm:mt-4 shadow-md shadow-[#059781]/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {pending ? "Booking..." : "Book Appointment"}
            </button>

            {/* Social Links */}
            <div className="text-center pt-2">
              <p className="text-xs sm:text-sm font-medium text-gray-500 mb-2">
                Follow us for updates:
              </p>
              <div className="flex justify-center gap-3">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-[#059781]/5 rounded-xl sm:rounded-2xl flex items-center justify-center hover:bg-[#059781]/10 transition-colors"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-800" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                <a
                  href="#"
                  aria-label="YouTube"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-[#059781]/5 rounded-xl sm:rounded-2xl flex items-center justify-center hover:bg-[#059781]/10 transition-colors"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93 .502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

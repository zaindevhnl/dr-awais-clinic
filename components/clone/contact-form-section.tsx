"use client";

import { useActionState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Clock, Award } from "lucide-react";
import { FacebookIcon, YoutubeIcon } from "@/components/social-icons";
import { sendContactMessage } from "@/app/actions/contact";
import { EMPTY_STATE, type FormState } from "@/lib/forms";

async function submit(prev: FormState, formData: FormData): Promise<FormState> {
  const phone = String(formData.get("phone") ?? "").trim();
  if (phone) {
    formData.set("message", `${formData.get("message") ?? ""}\n\nPhone: ${phone}`);
  }
  return sendContactMessage(prev, formData);
}

export function ContactFormSection() {
  const [state, formAction, pending] = useActionState(submit, EMPTY_STATE);
  const mountedAt = useRef(0);
  const elapsedRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  return (
    <section className="py-12 bg-white select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="bg-white rounded-[40px] shadow-2xl shadow-black/5 overflow-hidden flex flex-col lg:flex-row min-h-175 border border-gray-100 items-stretch">
          {/* Left Side: Contact Form */}
          <div className="flex-1 p-10 md:p-16 lg:p-12 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block">
                <span className="bg-[#C1FF72] text-[#1A1A1A] px-8 py-3 rounded-full text-[16px] font-semibold shadow-sm shadow-[#C1FF72]/20">
                  Contact Us
                </span>
              </div>
              <h2 className="text-[44px] md:text-[56px] font-semibold text-[#1A1A1A] leading-tight mt-5 mb-7">
                Get an{" "}
                <span className="relative inline-block">
                  Appointment
                  <div className="absolute -bottom-1 left-0 w-full h-[8px] bg-[#C1FF72] rounded-full z-[-1] opacity-80"></div>
                </span>
              </h2>

              <form
                action={formAction}
                onSubmit={() => {
                  if (elapsedRef.current) {
                    elapsedRef.current.value = String(Date.now() - mountedAt.current);
                  }
                }}
                className="space-y-6"
              >
                <input type="hidden" name="elapsedMs" ref={elapsedRef} defaultValue="0" />
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                  defaultValue=""
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="relative group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      aria-label="Your Name"
                      required
                      className="w-full px-8 py-5 bg-[#F9FAFB] rounded-full border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-bold text-lg outline-none transition-all"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="relative group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      aria-label="Your Email"
                      required
                      className="w-full px-8 py-5 bg-[#F9FAFB] rounded-full border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-semibold text-lg outline-none transition-all"
                    />
                    <Mail className="absolute right-8 top-1/2 -translate-y-1/2 w-6 h-6 text-[#00A78E] opacity-40 group-focus-within:opacity-100 transition-opacity" />
                  </div>

                  {/* Phone Input */}
                  <div className="relative group">
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      name="phone"
                      placeholder="Phone Number"
                      aria-label="Phone Number"
                      className="w-full px-8 py-5 bg-[#F9FAFB] rounded-full border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-semibold text-lg outline-none transition-all"
                    />
                  </div>

                  {/* Subject Input */}
                  <div className="relative group">
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      aria-label="Subject"
                      className="w-full px-8 py-5 bg-[#F9FAFB] rounded-full border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-semibold text-lg outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="relative">
                  <textarea
                    rows={4}
                    name="message"
                    placeholder="Message"
                    aria-label="Message"
                    required
                    className="w-full px-8 py-6 bg-[#F9FAFB] rounded-[30px] border-none focus:ring-2 focus:ring-[#00A78E] text-[#1A1A1A] font-semibold text-lg outline-none transition-all resize-none"
                  ></textarea>
                </div>

                {state.error && (
                  <p className="text-red-500 text-sm font-semibold bg-red-50 px-5 py-3 rounded-2xl">
                    {state.error}
                  </p>
                )}
                {state.ok && (
                  <p className="text-[#00A78E] text-sm font-semibold bg-[#F4F9F8] px-5 py-3 rounded-2xl">
                    Thank you — your message has been sent. The clinic will be in touch.
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={pending}
                  className="bg-[#00A78E] hover:bg-[#1A1A1A] text-white px-12 py-5 rounded-full font-semibold text-lg flex items-center justify-center transition-all duration-500 group shadow-xl shadow-[#00A78E]/20 disabled:opacity-50 cursor-pointer"
                >
                  {pending ? "Sending..." : "Book An Appointment"}
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              </form>
            </motion.div>
          </div>

          {/* Right Side: Doctor Profile Card */}
          <div className="lg:w-[45%] bg-white p-8 sm:p-12 flex flex-col justify-between text-[#1A1A1A] lg:rounded-r-[40px] rounded-b-[40px] lg:rounded-bl-none border-t lg:border-t-0 lg:border-l border-gray-100">
            {/* Profile Info Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-8 border-b border-gray-100">
              <div className="w-28 h-28 rounded-full overflow-hidden bg-white border border-gray-200 shrink-0 shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/clone/imm.jpg"
                  alt="Dr. Awais Malik"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="text-center sm:text-left space-y-1">
                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1A1A1A]">
                  Dr. Awais Malik
                </h3>
                <p className="text-gray-500 font-semibold text-base sm:text-lg">
                  Bariatric &amp; Laparoscopic Surgeon
                </p>
                <p className="text-[#00A78E] text-xs font-semibold uppercase tracking-wider bg-[#00A78E]/10 px-3 py-1 rounded-full inline-block mt-1">
                  MBBS, MS, MRCS, CHPE, ATLS
                </p>
              </div>
            </div>

            {/* Statistics Counters */}
            <div className="grid grid-cols-2 gap-8 py-8 text-center border-b border-gray-100">
              <div className="space-y-1">
                <div className="text-4xl sm:text-5xl font-semibold tracking-tight text-[#1A1A1A]">
                  MRCS
                </div>
                <div className="text-gray-400 font-semibold text-sm sm:text-base">
                  Royal College of Surgeons
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-4xl sm:text-5xl font-semibold tracking-tight text-[#00A78E]">
                  3
                </div>
                <div className="text-gray-400 font-semibold text-sm sm:text-base">
                  Hospitals in Lahore
                </div>
              </div>
            </div>

            {/* Quick Clinic Details & Availability */}
            <div className="py-6 border-b border-gray-100 space-y-5">
              <div className="flex items-start gap-4 text-left">
                <span className="p-2.5 bg-gray-50 rounded-xl shrink-0 border border-gray-100 text-[#00A78E]">
                  <MapPin className="w-5 h-5" strokeWidth={2} />
                </span>
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Clinic Location
                  </h4>
                  <p className="text-sm font-semibold text-gray-700 leading-snug mt-0.5">
                    Main Medical Complex, Operational Wing
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 text-left">
                <span className="p-2.5 bg-gray-50 rounded-xl shrink-0 border border-gray-100 text-[#00A78E]">
                  <Clock className="w-5 h-5" strokeWidth={2} />
                </span>
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Availability
                  </h4>
                  <p className="text-sm font-semibold text-gray-700 leading-snug mt-0.5">
                    Mon — Fri (05:00 PM - 09:00 PM)
                  </p>
                </div>
              </div>
            </div>

            {/* Areas of Expertise Tags */}
            <div className="py-6 border-b border-gray-100">
              <div className="flex items-center gap-2 mb-3 text-left">
                <Award className="w-4 h-4 text-gray-400" />
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Specialties
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-semibold bg-gray-50 text-gray-600 px-4 py-2 rounded-xl border border-gray-100">
                  Gastric Sleeve
                </span>
                <span className="text-xs font-semibold bg-gray-50 text-gray-600 px-4 py-2 rounded-xl border border-gray-100">
                  Weight Loss
                </span>
                <span className="text-xs font-semibold bg-gray-50 text-gray-600 px-4 py-2 rounded-xl border border-gray-100">
                  Laparoscopy
                </span>
              </div>
            </div>

            {/* Social Channels Segment */}
            <div className="pt-6 space-y-3">
              <p className="text-gray-400 font-semibold text-xs uppercase tracking-wider text-left">
                Follow us:
              </p>
              <div className="flex items-center gap-3 justify-start">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:text-[#00A78E] hover:bg-gray-100 transition-all border border-gray-100"
                >
                  <FacebookIcon className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  aria-label="YouTube"
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:text-[#00A78E] hover:bg-gray-100 transition-all border border-gray-100"
                >
                  <YoutubeIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

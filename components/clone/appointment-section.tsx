"use client";

import { useActionState, useEffect, useRef } from "react";
import { ArrowRight, Mail, Phone, User, BookOpen } from "lucide-react";
import { sendContactMessage } from "@/app/actions/contact";
import { EMPTY_STATE, type FormState } from "@/lib/forms";

/** Folds the phone number into the message body — contact_messages has no phone column. */
async function submit(prev: FormState, formData: FormData): Promise<FormState> {
  const phone = String(formData.get("phone") ?? "").trim();
  if (phone) {
    formData.set("message", `${formData.get("message") ?? ""}\n\nPhone: ${phone}`);
  }
  return sendContactMessage(prev, formData);
}

export function AppointmentSection() {
  const [state, formAction, pending] = useActionState(submit, EMPTY_STATE);
  const mountedAt = useRef(0);
  const elapsedRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  return (
    <section className="py-6 lg:py-6 bg-gradient-to-br from-slate-50 via-zinc-50 to-emerald-50/10 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 items-stretch gap-8 lg:gap-0">
        {/* Left Side: Operation Theater Image Container */}
        <div className="lg:col-span-6 relative z-0 flex rounded-[2.5rem] bg-white p-3 border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden h-full min-h-[450px] lg:min-h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1734094546615-045bf5f7ea0e?w=600&auto=format&fit=crop&q=60"
            alt="Modern Operation Theater Surgical Suite"
            className="w-full h-full object-cover rounded-[2.2rem]"
          />

          {/* Subtle Graphic Accents */}
          <div className="absolute top-[10%] left-[10%] w-72 h-72 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none -z-10"></div>
          <div className="absolute bottom-[20%] right-[10%] w-4 h-4 bg-[#00A78E]/30 rounded-full blur-sm pointer-events-none"></div>
        </div>

        {/* Right Side: Form Card Layout */}
        <div className="lg:col-span-6 lg:-ml-[4%] relative z-10 flex">
          <div className="w-full bg-white/95 backdrop-blur-md rounded-[2.5rem] p-6 sm:p-10 md:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-slate-100/80 flex flex-col justify-center">
            {/* Badge */}
            <div className="inline-block mb-5">
              <span className="bg-emerald-50 text-[#00A78E] border border-emerald-100/50 px-5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider">
                Direct Appointment
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1A1A1A] mb-8 tracking-tight leading-[1.15]">
              Get an{" "}
              <span className="relative inline-block text-[#00A78E]">Appointment</span>
            </h2>

            {/* Form Fields */}
            <form
              action={formAction}
              onSubmit={() => {
                if (elapsedRef.current) {
                  elapsedRef.current.value = String(Date.now() - mountedAt.current);
                }
              }}
              className="space-y-5"
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name Input */}
                <div className="relative group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    aria-label="Your Name"
                    required
                    className="w-full bg-slate-50 border border-slate-100/80 rounded-2xl pl-12 pr-4 py-4 text-sm focus:bg-white focus:ring-2 focus:ring-[#00A78E]/20 focus:border-[#00A78E] outline-none transition-all font-semibold text-slate-800 placeholder:text-slate-400"
                  />
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#00A78E] transition-colors" />
                </div>

                {/* Email Input */}
                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    aria-label="Your Email"
                    required
                    className="w-full bg-slate-50 border border-slate-100/80 rounded-2xl pl-12 pr-4 py-4 text-sm focus:bg-white focus:ring-2 focus:ring-[#00A78E]/20 focus:border-[#00A78E] outline-none transition-all font-semibold text-slate-800 placeholder:text-slate-400"
                  />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#00A78E] transition-colors" />
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
                    required
                    className="w-full bg-slate-50 border border-slate-100/80 rounded-2xl pl-12 pr-4 py-4 text-sm focus:bg-white focus:ring-2 focus:ring-[#00A78E]/20 focus:border-[#00A78E] outline-none transition-all font-semibold text-slate-800 placeholder:text-slate-400"
                  />
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#00A78E] transition-colors" />
                </div>

                {/* Subject Input */}
                <div className="relative group">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject Case"
                    aria-label="Subject Case"
                    className="w-full bg-slate-50 border border-slate-100/80 rounded-2xl pl-12 pr-4 py-4 text-sm focus:bg-white focus:ring-2 focus:ring-[#00A78E]/20 focus:border-[#00A78E] outline-none transition-all font-semibold text-slate-800 placeholder:text-slate-400"
                  />
                  <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#00A78E] transition-colors" />
                </div>
              </div>

              {/* Message Textarea */}
              <textarea
                name="message"
                placeholder="Write your medical concerns or messages here..."
                aria-label="Your message"
                rows={4}
                required
                className="w-full bg-slate-50 border border-slate-100/80 rounded-2xl px-5 py-4 text-sm focus:bg-white focus:ring-2 focus:ring-[#00A78E]/20 focus:border-[#00A78E] outline-none transition-all resize-none font-semibold text-slate-800 placeholder:text-slate-400"
              ></textarea>

              {state.error && (
                <p className="text-red-500 text-sm font-semibold bg-red-50 px-4 py-3 rounded-xl">
                  {state.error}
                </p>
              )}
              {state.ok && (
                <p className="text-[#00A78E] text-sm font-semibold bg-[#F4F9F8] px-4 py-3 rounded-xl">
                  Thank you — your request has been sent. The clinic will call you back.
                </p>
              )}

              {/* Action Button */}
              <button
                type="submit"
                disabled={pending}
                className="w-full bg-[#00A78E] text-white py-4 rounded-2xl cursor-pointer font-semibold text-base flex items-center justify-center group hover:bg-[#008f7a] shadow-lg shadow-[#00A78E]/20 hover:shadow-xl hover:shadow-[#00A78E]/30 active:scale-[0.99] disabled:scale-100 transition-all duration-300 disabled:opacity-50 select-none"
              >
                <span>{pending ? "Processing Secure Request..." : "Book An Appointment Now"}</span>
                {!pending && (
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

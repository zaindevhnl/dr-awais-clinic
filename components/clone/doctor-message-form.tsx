"use client";

import { useActionState, useEffect, useRef } from "react";
import { Mail, ChevronDown, CalendarCheck } from "lucide-react";
import { sendContactMessage } from "@/app/actions/contact";
import { EMPTY_STATE, type FormState } from "@/lib/forms";

async function submit(prev: FormState, formData: FormData): Promise<FormState> {
  const phone = String(formData.get("phone") ?? "").trim();
  const department = String(formData.get("department") ?? "").trim();
  const extras = [phone && `Phone: ${phone}`, department && `Department: ${department}`]
    .filter(Boolean)
    .join("\n");
  if (extras) formData.set("message", `${formData.get("message") ?? ""}\n\n${extras}`);
  if (!formData.get("subject")) formData.set("subject", "Message from doctor profile");
  return sendContactMessage(prev, formData);
}

export function DoctorMessageForm() {
  const [state, formAction, pending] = useActionState(submit, EMPTY_STATE);
  const mountedAt = useRef(0);
  const elapsedRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  return (
    <div className="bg-white border border-[#E8E8E4] rounded-2xl p-8 space-y-6">
      <h3 className="text-[26px] font-semibold text-[#0A0A0A]">Write your message</h3>

      <form
        action={formAction}
        onSubmit={() => {
          if (elapsedRef.current) {
            elapsedRef.current.value = String(Date.now() - mountedAt.current);
          }
        }}
        className="space-y-4"
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

        <textarea
          name="message"
          required
          placeholder="Describe your concern or question…"
          aria-label="Describe your concern or question"
          className="w-full h-[100px] bg-[#F7F7F5] border border-[#E8E8E4] rounded-xl p-4 text-[13px] text-gray-600 placeholder-gray-400 focus:outline-none focus:border-[#00A78E] transition-colors resize-none"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            name="name"
            required
            placeholder="Your name"
            aria-label="Your name"
            className="bg-[#F7F7F5] border border-[#E8E8E4] rounded-full px-5 py-3 text-[13px] text-gray-600 placeholder-gray-400 focus:outline-none focus:border-[#00A78E] transition-colors"
          />
          <div className="relative">
            <input
              type="email"
              name="email"
              required
              placeholder="Your email"
              aria-label="Your email"
              className="w-full bg-[#F7F7F5] border border-[#E8E8E4] rounded-full px-5 py-3 pr-10 text-[13px] text-gray-600 placeholder-gray-400 focus:outline-none focus:border-[#00A78E] transition-colors"
            />
            <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00A78E]" />
          </div>
          <input
            type="text"
            name="phone"
            placeholder="Phone number"
            aria-label="Phone number"
            className="bg-[#F7F7F5] border border-[#E8E8E4] rounded-full px-5 py-3 text-[13px] text-gray-600 placeholder-gray-400 focus:outline-none focus:border-[#00A78E] transition-colors"
          />
          <div className="relative">
            <select
              name="department"
              defaultValue=""
              aria-label="Choose department"
              className="w-full bg-[#F7F7F5] border border-[#E8E8E4] rounded-full px-5 py-3 text-[13px] text-gray-400 focus:outline-none focus:border-[#00A78E] transition-colors appearance-none"
            >
              <option value="">Choose department</option>
              <option>Bariatric Surgery</option>
              <option>Laparoscopic Surgery</option>
              <option>General Surgery</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {state.error && (
          <p className="text-red-500 text-[13px] font-semibold bg-red-50 px-4 py-3 rounded-xl">
            {state.error}
          </p>
        )}
        {state.ok && (
          <p className="text-[#00A78E] text-[13px] font-semibold bg-[#E8FAF5] px-4 py-3 rounded-xl">
            Your message has been sent. The clinic will be in touch.
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 bg-[#008F7A] text-white text-[13px] font-semibold px-6 py-3 rounded-full cursor-pointer hover:bg-[#00A78E] transition-all disabled:opacity-50"
        >
          <CalendarCheck className="w-4 h-4" />
          {pending ? "Sending…" : "Book an Appointment"}
        </button>
      </form>
    </div>
  );
}

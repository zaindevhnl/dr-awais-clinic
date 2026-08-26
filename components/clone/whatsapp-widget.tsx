"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.898 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488" />
    </svg>
  );
}

const quickMessages = [
  "I want to book an appointment",
  "I need information about weight loss surgery",
  "What are the consultation timings?",
  "I want to discuss my medical condition",
];

export function WhatsAppWidget({ phone = "923003968500" }: { phone?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  const handleOpenWidget = () => {
    setIsOpen(!isOpen);
    setUnreadCount(0);
  };

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const encodedMsg = encodeURIComponent(textToSend);
      window.open(`https://wa.me/${phone}?text=${encodedMsg}`, "_blank", "noopener,noreferrer");
      setInputValue("");
    }, 800);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50" ref={popupRef}>
      {/* Floating Button with Pulse effect */}
      <div className="relative inline-block">
        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-75 animate-ping" />
        <button
          onClick={handleOpenWidget}
          aria-label="Open WhatsApp Chat"
          className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20ba5a] transition-all hover:scale-110 focus:outline-none"
        >
          <WhatsAppIcon className="w-7 h-7" />

          <AnimatePresence>
            {!isOpen && unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-md"
              >
                {unreadCount}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Chat Popup Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="absolute bottom-18 left-0 w-[calc(100vw-32px)] sm:w-[330px] md:w-[360px] bg-[#F8F8F8] rounded-[24px] shadow-2xl border border-gray-200/60 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#0E6B5B] text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/clone/imm.jpg"
                    alt="Dr. Awais Malik"
                    className="w-11 h-11 rounded-full object-cover border-2 border-white/20"
                  />
                  <span className="absolute bottom-0 right-0 flex h-3 w-3 rounded-full border-2 border-[#0E6B5B] bg-emerald-400" />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold leading-tight">Dr. Awais Malik</h3>
                  <p className="text-[11px] text-white/80">Bariatric &amp; Laparoscopic Surgeon</p>
                  <p className="text-[10px] text-emerald-300 font-medium flex items-center gap-1 mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                    Online - Typically replies instantly
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="text-white/80 hover:text-white p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 min-h-[140px] max-h-[220px] bg-slate-50/50">
              <div className="flex justify-start mb-3">
                <div className="max-w-[85%] bg-white text-gray-800 rounded-[18px] rounded-tl-sm px-4 py-2.5 text-sm shadow-sm border border-gray-100">
                  <p className="font-semibold text-gray-900 mb-1">Assalam o Alaikum! 👋</p>
                  <p className="leading-relaxed">
                    I&apos;m Dr. Awais Malik. How can I help you today?
                  </p>
                  <span className="text-[9px] text-gray-400 block text-right mt-1.5">Just now</span>
                </div>
              </div>

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-[18px] px-4 py-3 shadow-sm border border-gray-100 flex items-center space-x-1">
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Messages */}
            <div className="p-3 bg-gray-50 border-t border-gray-100">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5 px-1">
                Quick Messages
              </span>
              <div className="flex flex-wrap gap-1.5">
                {quickMessages.map((msg, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInputValue(msg)}
                    className="text-[11px] bg-white text-[#0E6B5B] border border-gray-200 rounded-full px-3 py-1.5 hover:border-[#0E6B5B] hover:bg-[#0E6B5B]/5 transition-all text-left font-medium active:scale-95"
                  >
                    {msg}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white border-t border-gray-100 flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend(inputValue)}
                placeholder="Type a message..."
                aria-label="Type a WhatsApp message"
                className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0E6B5B] text-gray-800"
              />
              <button
                onClick={() => handleSend(inputValue)}
                disabled={!inputValue.trim()}
                aria-label="Send on WhatsApp"
                className="w-9 h-9 rounded-full bg-[#0E6B5B] hover:bg-[#0c594c] text-white flex items-center justify-center disabled:opacity-50 transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

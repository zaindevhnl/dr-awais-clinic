"use client";

import { MapPin, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";

export function ContactInfoCards({
  address = ["Lahore", "Pakistan"],
  email = "drawais12@gmail.com",
  phone = "03003968500",
}: {
  address?: string[];
  email?: string;
  phone?: string;
}) {
  const contactInfo = [
    { icon: <MapPin className="w-7 h-7" />, title: "Address", details: address },
    { icon: <Mail className="w-7 h-7" />, title: "Email", details: [email] },
    { icon: <Phone className="w-7 h-7" />, title: "Phone", details: [phone] },
  ];

  return (
    <section className="py-10 bg-[#FAFAFA]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 md:p-10 rounded-[32px] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border border-gray-50 flex flex-col h-full"
            >
              {/* Icon with Neon Green Background */}
              <div className="w-16 h-16 bg-[#C1FF72] text-[#1A1A1A] rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                {info.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4 tracking-tight">
                {info.title}
              </h3>

              {/* Details */}
              <div className="space-y-2 mt-auto">
                {info.details.map((line, i) => (
                  <p key={i} className="text-gray-500 font-medium text-[16px] leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

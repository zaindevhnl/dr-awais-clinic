"use client";

import { motion } from "framer-motion";

const DEFAULT_EMBED =
  "https://www.google.com/maps?q=Mid%20City%20Hospital%2C%2010%20C%20Jail%20Rd%2C%20Shadman%2C%20Lahore&output=embed";

export function ContactMap({ src = DEFAULT_EMBED }: { src?: string }) {
  return (
    <section className="w-full h-[500px] md:h-[650px] bg-gray-100 relative overflow-hidden px-6 md:px-12 mb-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full h-full rounded-[40px] overflow-hidden shadow-2xl shadow-black/5 border-4 border-white"
      >
        <iframe
          title="Google Map"
          src={src}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
        ></iframe>
      </motion.div>
    </section>
  );
}

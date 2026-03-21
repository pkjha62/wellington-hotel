"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { SiteSettings } from "@/types";

export default function Hero({ settings }: { settings: SiteSettings }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const today = new Date().toISOString().split("T")[0];

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src={settings.heroImage}
          alt={`${settings.hotelName} hero image`}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

      <motion.div style={{ opacity }} className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
          <div className="w-16 h-px bg-gold mx-auto mb-6 sm:mb-8" />
          <motion.h2
            className="font-serif text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white leading-tight tracking-wide uppercase max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {settings.heroHeadline}
          </motion.h2>
          <motion.p
            className="font-sans text-xs sm:text-sm md:text-base text-white/70 tracking-[0.2em] uppercase mt-4 sm:mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {settings.heroSubheadline}
          </motion.p>
          <div className="w-16 h-px bg-gold mx-auto mt-6 sm:mt-8" />
        </motion.div>
      </motion.div>

      {/* Booking Widget */}
      <motion.div
        id="booking"
        className="absolute bottom-0 left-0 right-0 px-3 sm:px-4 md:px-8 pb-4 sm:pb-6 md:pb-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="max-w-5xl mx-auto bg-white/95 backdrop-blur-sm shadow-2xl">
          <div className="flex flex-col md:flex-row items-stretch">
            <div className="flex-1 px-4 sm:px-6 py-3 sm:py-4 border-b md:border-b-0 md:border-r border-gray-200">
              <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-text-light mb-1">Check-in</label>
              <input type="date" min={today} className="w-full font-sans text-sm text-charcoal bg-transparent outline-none cursor-pointer" />
            </div>
            <div className="flex-1 px-4 sm:px-6 py-3 sm:py-4 border-b md:border-b-0 md:border-r border-gray-200">
              <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-text-light mb-1">Check-out</label>
              <input type="date" min={today} className="w-full font-sans text-sm text-charcoal bg-transparent outline-none cursor-pointer" />
            </div>
            <div className="flex-1 px-4 sm:px-6 py-3 sm:py-4 border-b md:border-b-0 md:border-r border-gray-200">
              <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-text-light mb-1">Guests</label>
              <select className="w-full font-sans text-sm text-charcoal bg-transparent outline-none cursor-pointer">
                <option>1 Adult</option>
                <option>2 Adults</option>
                <option>2 Adults, 1 Child</option>
                <option>2 Adults, 2 Children</option>
              </select>
            </div>
            <a href="/booking" className="flex items-center justify-center bg-gold hover:bg-gold-dark text-white font-sans text-[10px] sm:text-xs tracking-[0.2em] px-6 sm:px-10 py-3.5 md:py-0 transition-colors duration-300 whitespace-nowrap">
              BOOK NOW
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

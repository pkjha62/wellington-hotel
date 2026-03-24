"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import type { SiteSettings } from "@/types";

// Word-by-word headline reveal
function AnimatedHeadline({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.28em] align-bottom last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: "110%" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.4 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </>
  );
}

export default function Hero({ settings }: { settings: SiteSettings }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const [scrolledPast, setScrolledPast] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const handleScroll = () => {
      const heroH = ref.current?.offsetHeight ?? window.innerHeight;
      setScrolledPast(window.scrollY > heroH * 0.9);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <section ref={ref} className="relative h-screen w-full overflow-hidden">
        {/* Parallax background */}
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

        {/* Headline */}
        <motion.div style={{ opacity }} className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 text-center">
          <motion.div
            className="w-16 h-px bg-gold mx-auto mb-6 sm:mb-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ originX: 0.5 }}
          />
          <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white leading-tight tracking-wide uppercase max-w-4xl">
            <AnimatedHeadline text={settings.heroHeadline} />
          </h2>
          <motion.p
            className="font-sans text-xs sm:text-sm md:text-base text-white/70 tracking-[0.2em] uppercase mt-4 sm:mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            {settings.heroSubheadline}
          </motion.p>
          <motion.div
            className="w-16 h-px bg-gold mx-auto mt-6 sm:mt-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
            style={{ originX: 0.5 }}
          />
        </motion.div>

        {/* Glassmorphic booking bar */}
        <motion.div
          id="booking"
          className="absolute bottom-0 left-0 right-0 px-3 sm:px-4 md:px-8 pb-4 sm:pb-6 md:pb-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <div className="max-w-5xl mx-auto backdrop-blur-xl bg-white/10 border border-white/25 shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
            <div className="flex flex-col md:flex-row items-stretch">
              <div className="flex-1 px-4 sm:px-6 py-3 sm:py-4 border-b md:border-b-0 md:border-r border-white/15">
                <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-white/60 mb-1">Check-in</label>
                <input type="date" min={today} className="w-full font-sans text-sm text-white bg-transparent outline-none cursor-pointer" />
              </div>
              <div className="flex-1 px-4 sm:px-6 py-3 sm:py-4 border-b md:border-b-0 md:border-r border-white/15">
                <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-white/60 mb-1">Check-out</label>
                <input type="date" min={today} className="w-full font-sans text-sm text-white bg-transparent outline-none cursor-pointer" />
              </div>
              <div className="flex-1 px-4 sm:px-6 py-3 sm:py-4 border-b md:border-b-0 md:border-r border-white/15">
                <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-white/60 mb-1">Guests</label>
                <select className="w-full font-sans text-sm text-white bg-transparent outline-none cursor-pointer">
                  <option className="text-charcoal bg-white">1 Adult</option>
                  <option className="text-charcoal bg-white">2 Adults</option>
                  <option className="text-charcoal bg-white">2 Adults, 1 Child</option>
                  <option className="text-charcoal bg-white">2 Adults, 2 Children</option>
                </select>
              </div>
              <a href="/booking" className="flex items-center justify-center bg-gold hover:bg-gold-dark text-white font-sans text-[10px] sm:text-xs tracking-[0.2em] px-6 sm:px-10 py-3.5 md:py-0 transition-colors duration-300 whitespace-nowrap">
                BOOK NOW
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Sticky booking bar — slides up from bottom once user scrolls past hero */}
      <AnimatePresence>
        {scrolledPast && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-40 px-3 sm:px-4 md:px-8"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="max-w-5xl mx-auto backdrop-blur-xl bg-charcoal/90 border border-gold/20 shadow-[0_-4px_40px_rgba(0,0,0,0.5)]">
              <div className="flex flex-col md:flex-row items-stretch">
                <div className="flex-1 px-4 sm:px-6 py-3 sm:py-4 border-b md:border-b-0 md:border-r border-white/10">
                  <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-white/50 mb-1">Check-in</label>
                  <input type="date" min={today} className="w-full font-sans text-sm text-white/90 bg-transparent outline-none cursor-pointer" />
                </div>
                <div className="flex-1 px-4 sm:px-6 py-3 sm:py-4 border-b md:border-b-0 md:border-r border-white/10">
                  <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-white/50 mb-1">Check-out</label>
                  <input type="date" min={today} className="w-full font-sans text-sm text-white/90 bg-transparent outline-none cursor-pointer" />
                </div>
                <div className="flex-1 px-4 sm:px-6 py-3 sm:py-4 border-b md:border-b-0 md:border-r border-white/10">
                  <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-white/50 mb-1">Guests</label>
                  <select className="w-full font-sans text-sm text-white/90 bg-transparent outline-none cursor-pointer">
                    <option className="text-charcoal bg-white">1 Adult</option>
                    <option className="text-charcoal bg-white">2 Adults</option>
                    <option className="text-charcoal bg-white">2 Adults, 1 Child</option>
                    <option className="text-charcoal bg-white">2 Adults, 2 Children</option>
                  </select>
                </div>
                <a href="/booking" className="flex items-center justify-center bg-gold hover:bg-gold-dark text-white font-sans text-[10px] sm:text-xs tracking-[0.2em] px-6 sm:px-10 py-3.5 md:py-0 transition-colors duration-300 whitespace-nowrap">
                  BOOK NOW
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

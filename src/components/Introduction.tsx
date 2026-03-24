"use client";

import { motion } from "framer-motion";
import type { SiteSettings } from "@/types";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const lineGrow = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.8, ease: "easeOut" as const } },
};

export default function Introduction({ settings }: { settings: SiteSettings }) {
  return (
    <section className="py-16 sm:py-20 md:py-28 lg:py-36 bg-white">
      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div className="w-12 h-px bg-gold mx-auto mb-8 sm:mb-10 origin-center" variants={lineGrow} />
        <motion.h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-charcoal leading-snug tracking-wide uppercase" variants={fadeUp}>
          {settings.introTitle}
        </motion.h2>
        <motion.p className="font-serif text-base sm:text-lg md:text-xl text-gold italic mt-4 sm:mt-6" variants={fadeUp}>
          {settings.introSubtitle}
        </motion.p>
        <motion.p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed mt-6 sm:mt-8 max-w-2xl mx-auto" variants={fadeUp}>
          {settings.introBody}
        </motion.p>
        <motion.a href="/rooms" className="inline-flex items-center gap-2 mt-8 sm:mt-10 font-sans text-xs tracking-[0.2em] uppercase text-gold hover:text-gold-dark transition-colors duration-300 group" variants={fadeUp}>
          Learn more about the hotel
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.a>
        <motion.div className="w-12 h-px bg-gold mx-auto mt-10 sm:mt-14 origin-center" variants={lineGrow} />
      </motion.div>
    </section>
  );
}

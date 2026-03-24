"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      {/* Video background with image fallback */}
      <motion.div style={{ y }} className="absolute inset-0">
        {settings.heroVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={settings.heroImage}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={settings.heroVideo} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={settings.heroImage}
            alt={`${settings.hotelName} hero image`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}
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

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.4 }}
        >
          <Link
            href="/booking"
            className="mt-8 sm:mt-10 inline-block bg-gold hover:bg-gold-dark text-white font-sans text-xs tracking-[0.2em] uppercase px-10 py-4 transition-colors duration-300"
          >
            Reserve Your Stay
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="w-px h-12 bg-white/40 mx-auto"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ originY: 0 }}
        />
        <p className="mt-2 font-sans text-[9px] tracking-[0.3em] uppercase text-white/40">Scroll</p>
      </motion.div>
    </section>
  );
}

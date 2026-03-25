"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { normalizeImageUrl } from "@/lib/image-url";

export default function PageHero({
  image,
  imageAlt,
  kicker,
  title,
  subtitle,
}: {
  image: string;
  imageAlt: string;
  kicker: string;
  title: string;
  subtitle: string;
}) {
  const imageSrc = normalizeImageUrl(image);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[60vh] items-center justify-center bg-charcoal pt-28 overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover opacity-40"
          priority
          sizes="100vw"
        />
      </motion.div>
      <motion.div style={{ opacity }} className="relative z-10 text-center px-4">
        <motion.p
          className="font-sans text-[11px] uppercase tracking-[0.22em] text-gold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {kicker}
        </motion.p>
        <motion.h1
          className="mt-4 font-serif text-4xl uppercase tracking-[0.12em] text-white sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="mt-4 max-w-xl mx-auto font-sans text-sm leading-7 text-white/70"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {subtitle}
        </motion.p>
      </motion.div>
    </section>
  );
}

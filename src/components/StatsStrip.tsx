"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import type { StatFact } from "@/types";

function CountUp({ end, suffix = "", duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  const animate = useCallback(() => {
    const isFloat = end % 1 !== 0;
    const startTime = performance.now();
    const durationMs = duration * 1000;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * end;

      if (progress < 1) {
        setDisplay(isFloat ? current.toFixed(1) : String(Math.floor(current)));
        requestAnimationFrame(tick);
      } else {
        setDisplay(isFloat ? end.toFixed(1) : String(end));
      }
    };

    requestAnimationFrame(tick);
  }, [end, duration]);

  useEffect(() => {
    if (isInView) animate();
  }, [isInView, animate]);

  return <span ref={ref}>{display}{suffix}</span>;
}

export default function StatsStrip({ statFacts }: { statFacts: StatFact[] }) {
  return (
    <section className="bg-charcoal py-10 sm:py-12">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 sm:px-6 md:grid-cols-4 md:px-8">
        {statFacts.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="text-center"
          >
            <p className="font-serif text-3xl text-gold sm:text-4xl"><CountUp end={item.value} suffix={item.suffix} /></p>
            <p className="mt-2 font-sans text-[11px] uppercase tracking-[0.22em] text-white/65">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

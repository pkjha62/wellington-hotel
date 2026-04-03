"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Testimonial } from "@/types";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex justify-center gap-1 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < rating ? "text-gold" : "text-stone-300"}`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

const INTERVAL = 6000;

export default function Testimonials({ items, title }: { items: Testimonial[]; title?: string }) {
  const [testimonials] = useState<Testimonial[]>(items);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length);
    setProgressKey((k) => k + 1);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
    setProgressKey((k) => k + 1);
  }, [testimonials.length]);

  const goTo = useCallback((i: number) => {
    setCurrent(i);
    setProgressKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, INTERVAL);
    return () => clearInterval(timer);
  }, [next, paused]);

  const t = testimonials[current];
  if (!t) return null;

  return (
    <section
      className="py-16 sm:py-20 md:py-28 bg-beige"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="w-12 h-px bg-gold mx-auto mb-6 sm:mb-8" />
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-charcoal tracking-wide uppercase">{title || "What Our Guests Say"}</h2>
          <div className="w-12 h-px bg-gold mx-auto mt-6 sm:mt-8" />
        </motion.div>

        {/* Auto-advance progress bar */}
        <div className="mt-8 h-0.5 bg-gold/15 overflow-hidden rounded-full max-w-xs mx-auto">
          <motion.div
            key={progressKey}
            className="h-full bg-gold origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: paused ? undefined : 1 }}
            transition={{ duration: INTERVAL / 1000, ease: "linear" }}
          />
        </div>

        <div className="mt-8 sm:mt-10 min-h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45 }}
              className="text-center"
            >
              {/* Monogram avatar */}
              <div className="w-12 h-12 rounded-full bg-gold/15 flex items-center justify-center mx-auto mb-5">
                <span className="font-serif text-lg text-gold">{t.guestName.charAt(0)}</span>
              </div>
              <StarRating rating={t.rating || 5} />
              <blockquote className="font-serif text-base sm:text-lg md:text-xl text-charcoal italic leading-relaxed max-w-xl mx-auto">
                &ldquo;{t.comment}&rdquo;
              </blockquote>
              <p className="font-sans text-xs tracking-[0.2em] uppercase text-gold mt-6">{t.guestName}</p>
              {t.location && <p className="font-sans text-xs text-text-secondary mt-1">{t.location}</p>}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-3 mt-8">
          <button onClick={prev} className="w-8 h-8 flex items-center justify-center border border-gold/30 text-gold hover:bg-gold hover:text-white transition-colors rounded-full" aria-label="Previous testimonial">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-gold" : "w-2 bg-charcoal/20 hover:bg-charcoal/40"}`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
          <button onClick={next} className="w-8 h-8 flex items-center justify-center border border-gold/30 text-gold hover:bg-gold hover:text-white transition-colors rounded-full" aria-label="Next testimonial">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}

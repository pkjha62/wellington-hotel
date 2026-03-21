"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Testimonial } from "@/types";

export default function Testimonials({ items }: { items: Testimonial[] }) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(items);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setTestimonials(items);
  }, [items]);

  const next = useCallback(() => setCurrent((c) => (c + 1) % testimonials.length), [testimonials.length]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  if (!t) {
    return null;
  }

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-beige">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="w-12 h-px bg-gold mx-auto mb-6 sm:mb-8" />
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-charcoal tracking-wide uppercase">What Our Guests Say</h2>
          <div className="w-12 h-px bg-gold mx-auto mt-6 sm:mt-8" />
        </motion.div>

        <div className="mt-10 sm:mt-14 min-h-[200px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={t?.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-gold text-lg tracking-widest mb-4">
                {Array.from({ length: t?.rating || 5 }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </p>
              <blockquote className="font-serif text-base sm:text-lg md:text-xl text-charcoal italic leading-relaxed max-w-xl mx-auto">
                &ldquo;{t?.comment}&rdquo;
              </blockquote>
              <p className="font-sans text-xs tracking-[0.2em] uppercase text-gold mt-6">{t?.guestName}</p>
              {t?.location && (
                <p className="font-sans text-xs text-text-secondary mt-1">{t.location}</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? "bg-gold w-6" : "bg-charcoal/20 hover:bg-charcoal/40"}`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

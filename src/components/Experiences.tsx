"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";
import type { Experience } from "@/types";
import { normalizeImageUrl } from "@/lib/image-url";

export default function Experiences({ experiences, title }: { experiences: Experience[]; title?: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = scrollRef.current.offsetWidth * 0.8;
      scrollRef.current.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
    }
  };

  return (
    <section id="experiences" className="py-16 sm:py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <motion.div className="text-center mb-10 sm:mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="w-12 h-px bg-gold mx-auto mb-6 sm:mb-8" />
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-charcoal tracking-wide uppercase">{title || "The Pleasure of Experiencing Deoghar"}</h2>
          <div className="w-12 h-px bg-gold mx-auto mt-6 sm:mt-8" />
        </motion.div>

        <div className="flex justify-end gap-3 mb-6 lg:hidden">
          <button onClick={() => scroll("left")} className="w-10 h-10 border border-gold text-gold flex items-center justify-center hover:bg-gold hover:text-white transition-colors" aria-label="Scroll left">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={() => scroll("right")} className="w-10 h-10 border border-gold text-gold flex items-center justify-center hover:bg-gold hover:text-white transition-colors" aria-label="Scroll right">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        <div ref={scrollRef} className="flex gap-4 sm:gap-6 overflow-x-auto lg:overflow-visible lg:grid lg:grid-cols-3 snap-x snap-mandatory" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.title}
              className="min-w-[80%] sm:min-w-[60%] lg:min-w-0 snap-start group cursor-pointer shadow-md hover:shadow-2xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.18 }}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 350, damping: 22 } }}
            >
              <div className="relative h-[300px] sm:h-[350px] md:h-[420px] overflow-hidden">
                <Image src={normalizeImageUrl(exp.image)} alt={exp.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 1024px) 85vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8">
                  <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-white tracking-wide uppercase">{exp.title}</h3>
                  <p className="font-sans text-xs md:text-sm text-white/80 leading-relaxed mt-2 sm:mt-3 max-w-sm">{exp.description}</p>
                  <p className="mt-3 font-sans text-[11px] uppercase tracking-[0.2em] text-gold-light">Starting at ₹{exp.price.toLocaleString("en-IN")}</p>
                  <Link href="/booking" className="inline-flex flex-col items-start mt-3 sm:mt-4 font-sans text-[10px] tracking-[0.2em] uppercase text-gold group-hover:text-gold-light transition-colors">
                    <span className="inline-flex items-center gap-2">
                      Discover
                      <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </span>
                    <span className="block h-px w-0 bg-gold group-hover:w-full transition-all duration-300 ease-out mt-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

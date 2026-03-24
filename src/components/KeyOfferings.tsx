"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Offering } from "@/types";

interface OfferingProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
  href: string;
}

function OfferingBlock({ id, title, subtitle, description, image, imageAlt, reverse = false, href }: OfferingProps) {
  return (
    <div id={id} className={`flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} min-h-[350px] sm:min-h-[500px] lg:min-h-[600px]`}>
      {/* Image slides in from the outer edge, after text */}
      <motion.div
        className="relative w-full lg:w-1/2 min-h-[200px] sm:min-h-[350px] lg:min-h-full overflow-hidden group"
        initial={{ opacity: 0, clipPath: reverse ? "inset(0 0% 0 100%)" : "inset(0 100% 0 0%)" }}
        whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0%)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.1, delay: 0.3, ease: "easeOut" }}
      >
        <Image src={image} alt={imageAlt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 50vw" />
      </motion.div>
      {/* Text fades and slides up first */}
      <div className="w-full lg:w-1/2 flex items-center">
        <motion.div
          className="px-6 sm:px-8 md:px-16 lg:px-20 py-12 sm:py-16 lg:py-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-10 h-px bg-gold mb-6 sm:mb-8" />
          <h3 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-charcoal tracking-wide uppercase leading-snug">{title}</h3>
          <p className="font-serif text-sm sm:text-base md:text-lg text-gold italic mt-3 sm:mt-4">{subtitle}</p>
          <p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed mt-4 sm:mt-6 max-w-md">{description}</p>
          <a href={href} className="inline-flex items-center gap-2 mt-6 sm:mt-8 font-sans text-xs tracking-[0.2em] uppercase text-gold hover:text-gold-dark transition-colors duration-300 group/link">
            More information
            <svg className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </div>
  );
}

export default function KeyOfferings({ offerings }: { offerings: Offering[] }) {
  const hrefMap: Record<string, string> = {
    "rooms-suites": "/rooms",
    "cuisine": "/dining",
    "spa-wellness": "/spa",
    "events": "/events",
  };

  return (
    <section className="bg-offwhite">
      {offerings.map((offering, index) => (
        <OfferingBlock
          key={offering.id}
          {...offering}
          reverse={index % 2 === 1}
          href={hrefMap[offering.id] || `/${offering.id}`}
        />
      ))}
    </section>
  );
}

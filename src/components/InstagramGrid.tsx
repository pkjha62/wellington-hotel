"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { GalleryImage } from "@/types";

export default function InstagramGrid({ images, instagramHandle }: { images: GalleryImage[]; instagramHandle: string }) {
  return (
    <section id="gallery" className="py-16 sm:py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <motion.div className="text-center mb-10 sm:mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="w-12 h-px bg-gold mx-auto mb-6 sm:mb-8" />
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-charcoal tracking-wide uppercase">Gallery</h2>
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-gold mt-4">{instagramHandle}</p>
          <div className="w-12 h-px bg-gold mx-auto mt-6 sm:mt-8" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
          {images.map((img, i) => (
            <motion.div
              key={i}
              className="relative aspect-square overflow-hidden group"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:[filter:blur(2px)]" sizes="(max-width: 768px) 50vw, 33vw" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500 flex items-end justify-start">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-3 group-hover:translate-y-0 p-4 sm:p-5 w-full">
                  <div className="w-6 h-px bg-gold mb-2" />
                  <p className="font-sans text-[10px] sm:text-xs tracking-[0.18em] uppercase text-white font-medium leading-relaxed">{img.alt}</p>
                  <p className="font-sans text-[9px] tracking-[0.15em] uppercase text-gold/80 mt-1">{img.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { GalleryImage } from "@/types";
import { normalizeImageUrl } from "@/lib/image-url";

const VISIBLE_COUNT = 6;

function Lightbox({ image, images, onClose, onPrev, onNext }: { image: GalleryImage; images: GalleryImage[]; onClose: () => void; onPrev: () => void; onNext: () => void }) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft") onPrev();
    if (e.key === "ArrowRight") onNext();
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const idx = images.indexOf(image);

  return (
    <motion.div
      className="fixed inset-0 z-[9990] flex items-center justify-center bg-black/80 backdrop-blur-md cursor-pointer px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 sm:left-8 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/25 transition"
          aria-label="Previous image"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
      )}

      <motion.div
        className="relative max-w-4xl w-full max-h-[85vh] aspect-square"
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.88, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image src={normalizeImageUrl(image.src)} alt={image.alt} fill className="object-contain" sizes="(max-width: 1024px) 95vw, 60vw" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-5">
          <p className="font-sans text-sm text-white tracking-wide">{image.alt}</p>
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold/80 mt-1">{image.category}</p>
        </div>
        {/* Counter */}
        {images.length > 1 && (
          <div className="absolute top-3 right-3 rounded-full bg-black/50 px-3 py-1 font-sans text-xs text-white backdrop-blur-sm">
            {idx + 1} / {images.length}
          </div>
        )}
      </motion.div>

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 sm:right-8 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/25 transition"
          aria-label="Next image"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      )}

      <button onClick={onClose} className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors z-20" aria-label="Close lightbox">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </motion.div>
  );
}

export default function InstagramGrid({ images, instagramHandle, title }: { images: GalleryImage[]; instagramHandle: string; title?: string }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visibleImages = showAll ? images : images.slice(0, VISIBLE_COUNT);
  const hasMore = images.length > VISIBLE_COUNT;

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = useCallback(() => setLightboxIndex((i) => i !== null ? (i - 1 + images.length) % images.length : null), [images.length]);
  const nextImage = useCallback(() => setLightboxIndex((i) => i !== null ? (i + 1) % images.length : null), [images.length]);

  return (
    <>
      <section id="gallery" className="py-16 sm:py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <motion.div className="text-center mb-10 sm:mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="w-12 h-px bg-gold mx-auto mb-6 sm:mb-8" />
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-charcoal tracking-wide uppercase">{title || "Photo Gallery"}</h2>
            <div className="w-12 h-px bg-gold mx-auto mt-6 sm:mt-8" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
            {visibleImages.map((img, i) => (
              <motion.div
                key={img.id ?? i}
                className="relative aspect-square overflow-hidden group cursor-pointer"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % VISIBLE_COUNT) * 0.07 }}
                onClick={() => openLightbox(images.indexOf(img))}
              >
                <Image src={normalizeImageUrl(img.src)} alt={img.alt} fill className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:[filter:blur(2px)]" sizes="(max-width: 768px) 50vw, 33vw" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500 flex items-end justify-start">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-3 group-hover:translate-y-0 p-3 sm:p-5 w-full">
                    <div className="w-6 h-px bg-gold mb-2 hidden sm:block" />
                    <p className="font-sans text-[10px] sm:text-xs tracking-[0.18em] uppercase text-white font-medium leading-relaxed">{img.alt}</p>
                    <p className="font-sans text-[9px] tracking-[0.15em] uppercase text-gold/80 mt-1">{img.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {hasMore && (
            <motion.div className="flex justify-center mt-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <button
                onClick={() => setShowAll((s) => !s)}
                className="inline-flex items-center gap-2 border border-gold px-8 py-3 font-sans text-xs uppercase tracking-[0.18em] text-gold hover:bg-gold hover:text-white transition-all duration-300"
              >
                {showAll ? "Show Less" : `View All ${images.length} Photos`}
                <svg className={`w-4 h-4 transition-transform duration-300 ${showAll ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            image={images[lightboxIndex]}
            images={images}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </>
  );
}



"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  images: string[];
  roomName: string;
}

export default function RoomImageCarousel({ images, roomName }: Props) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const go = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const prev = useCallback(() => {
    const idx = (current - 1 + images.length) % images.length;
    setDirection(-1);
    setCurrent(idx);
  }, [current, images.length]);

  const next = useCallback(() => {
    const idx = (current + 1) % images.length;
    setDirection(1);
    setCurrent(idx);
  }, [current, images.length]);

  if (images.length === 0) return null;

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div className="mt-10">
      <h2 className="font-serif text-xl uppercase tracking-[0.1em] text-charcoal mb-4">Gallery</h2>

      {/* Main image */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-stone-100">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={images[current]}
              alt={`${roomName} — view ${current + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 66vw"
              priority={current === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Prev / Next arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
              aria-label="Previous image"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
              aria-label="Next image"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Counter badge */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 rounded-full bg-black/50 px-3 py-1 font-sans text-xs text-white backdrop-blur-sm">
            {current + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                i === current ? "border-gold" : "border-transparent opacity-60 hover:opacity-100"
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={img}
                alt={`${roomName} thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="96px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Dot indicators (mobile) */}
      {images.length > 1 && (
        <div className="mt-3 flex justify-center gap-1.5 sm:hidden">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-gold" : "w-1.5 bg-stone-300"
              }`}
              aria-label={`Image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

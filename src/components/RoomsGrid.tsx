"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Room } from "@/types";
import { normalizeImageUrl } from "@/lib/image-url";

const FILTERS = ["All", "Standard", "Deluxe", "Suite", "Premium"] as const;
type Filter = typeof FILTERS[number];

export default function RoomsGrid({ rooms }: { rooms: Room[] }) {
  const [active, setActive] = useState<Filter>("All");

  const filtered = active === "All"
    ? rooms
    : rooms.filter((r) => r.type.toLowerCase() === active.toLowerCase());

  return (
    <>
      {/* Filter pills */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`relative px-5 py-2 rounded-full font-sans text-[11px] uppercase tracking-[0.18em] transition-all duration-300 ${
              active === f
                ? "bg-gold text-white shadow-md"
                : "border border-stone-300 text-charcoal hover:border-gold hover:text-gold"
            }`}
          >
            {f}
            {active === f && (
              <motion.span layoutId="pill" className="absolute inset-0 rounded-full bg-gold -z-10" />
            )}
          </button>
        ))}
      </div>

      {/* Room cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="grid gap-10 md:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.length === 0 ? (
            <p className="col-span-3 py-20 text-center font-sans text-sm text-text-secondary">
              No {active} rooms available at the moment.
            </p>
          ) : (
            filtered.map((room, i) => (
              <motion.article
                key={room.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="group overflow-hidden rounded-[28px] border border-stone-200 bg-white transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl"
              >
                <Link href={`/rooms/${room.id}`} className="block relative h-64 overflow-hidden">
                  <Image
                    src={normalizeImageUrl(room.images[0])}
                    alt={room.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute bottom-4 left-4 rounded-full bg-gold px-4 py-1.5 font-sans text-xs uppercase tracking-[0.18em] text-white">
                    {room.type}
                  </div>
                </Link>
                <div className="p-6">
                  <Link href={`/rooms/${room.id}`}>
                    <h3 className="font-serif text-xl uppercase tracking-[0.1em] text-charcoal hover:text-gold transition-colors">
                      {room.name}
                    </h3>
                  </Link>
                  <p className="mt-3 font-sans text-sm leading-6 text-text-secondary line-clamp-3">
                    {room.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {room.amenities.slice(0, 4).map((a) => (
                      <span key={a} className="rounded-full border border-stone-200 px-3 py-1 font-sans text-[11px] text-text-secondary">{a}</span>
                    ))}
                    {room.amenities.length > 4 && (
                      <span className="rounded-full border border-stone-200 px-3 py-1 font-sans text-[11px] text-text-secondary">+{room.amenities.length - 4} more</span>
                    )}
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <span className="font-serif text-2xl text-gold">&#x20B9;{room.price.toLocaleString("en-IN")}</span>
                      <span className="font-sans text-xs text-text-secondary"> / night</span>
                    </div>
                    <span className="font-sans text-xs text-text-secondary">Up to {room.maxGuests} guests</span>
                  </div>
                  <Link
                    href={`/booking?roomId=${room.id}`}
                    className="mt-6 block w-full rounded-full bg-gold py-3 text-center font-sans text-xs uppercase tracking-[0.18em] text-white transition hover:bg-gold-dark"
                  >
                    Book This Room
                  </Link>
                </div>
              </motion.article>
            ))
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

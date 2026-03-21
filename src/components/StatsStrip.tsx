"use client";

import { motion } from "framer-motion";

export default function StatsStrip({
  stats,
}: {
  stats: {
    totalRooms: number;
    totalBookings: number;
    totalSubscribers: number;
    totalTestimonials: number;
  };
}) {
  const items = [
    { label: "Curated Rooms", value: stats.totalRooms },
    { label: "Bookings Managed", value: stats.totalBookings },
    { label: "Guest Community", value: stats.totalSubscribers },
    { label: "Verified Reviews", value: stats.totalTestimonials },
  ];

  return (
    <section className="bg-charcoal py-10 sm:py-12">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 sm:px-6 md:grid-cols-4 md:px-8">
        {items.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="text-center"
          >
            <p className="font-serif text-3xl text-gold sm:text-4xl">{item.value}</p>
            <p className="mt-2 font-sans text-[11px] uppercase tracking-[0.22em] text-white/65">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

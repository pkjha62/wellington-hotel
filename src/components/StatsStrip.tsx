"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

function CountUp({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}</span>;
}

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
            <p className="font-serif text-3xl text-gold sm:text-4xl"><CountUp end={item.value} /></p>
            <p className="mt-2 font-sans text-[11px] uppercase tracking-[0.22em] text-white/65">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

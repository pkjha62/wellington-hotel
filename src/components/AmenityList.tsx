"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};

export default function AmenityList({ amenities }: { amenities: string[] }) {
  return (
    <motion.div
      className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
    >
      {amenities.map((a) => (
        <motion.div key={a} variants={item} className="flex items-center gap-2 rounded-xl border border-stone-200 px-4 py-3">
          <svg className="h-4 w-4 text-gold shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          <span className="font-sans text-sm text-charcoal">{a}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";

export default function StatCard({
  label,
  value,
  tone = "default",
  index = 0,
}: {
  label: string;
  value: string | number;
  tone?: "default" | "accent" | "warn";
  index?: number;
}) {
  const toneClass =
    tone === "accent"
      ? "border-gold/20 bg-gradient-to-br from-beige to-white"
      : tone === "warn"
        ? "border-amber-200 bg-gradient-to-br from-amber-50 to-white"
        : "border-stone-200/80 bg-white";

  const iconColor =
    tone === "accent" ? "text-gold" : tone === "warn" ? "text-amber-500" : "text-stone-400";

  return (
    <motion.div
      className={`rounded-2xl border p-5 shadow-sm ${toneClass}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">{label}</p>
        <div className={`rounded-lg bg-stone-50 p-1.5 ${iconColor}`}>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
        </div>
      </div>
      <p className="mt-3 font-serif text-3xl font-bold text-charcoal">{value}</p>
    </motion.div>
  );
}

"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

function ConfirmationContent() {
  const params = useSearchParams();
  const ref = params.get("ref");
  const room = params.get("room");
  const total = params.get("total");

  return (
    <div className="flex min-h-screen items-center justify-center bg-beige px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="mx-auto w-full max-w-lg rounded-[32px] border border-green-200 bg-white p-8 text-center shadow-xl md:p-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.15 }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
        >
          <svg className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </motion.div>

        <h1 className="mt-6 font-serif text-2xl uppercase tracking-[0.1em] text-charcoal sm:text-3xl">Booking Confirmed</h1>
        <p className="mx-auto mt-4 max-w-sm font-sans text-sm leading-7 text-stone-600">
          Thank you for your reservation{room ? ` for ${room}` : ""}. We look forward to welcoming you.
        </p>

        {ref && (
          <div className="mt-6 rounded-2xl bg-stone-50 p-4">
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-stone-500">Booking Reference</p>
            <p className="mt-1 font-mono text-lg font-semibold tracking-wider text-charcoal">{ref}</p>
          </div>
        )}

        {total && (
          <p className="mt-4 font-sans text-sm text-stone-600">
            Estimated total:{" "}
            <span className="font-semibold text-charcoal">₹{Number(total).toLocaleString("en-IN")}</span>
          </p>
        )}

        <p className="mt-6 font-sans text-xs leading-6 text-stone-500">
          A confirmation email has been sent to your registered address. Please keep your booking reference for future correspondence.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-full border border-gold px-6 py-3 font-sans text-xs uppercase tracking-[0.18em] text-gold transition hover:bg-gold hover:text-white"
          >
            Return Home
          </Link>
          <Link
            href="/booking"
            className="rounded-full bg-gold px-6 py-3 font-sans text-xs uppercase tracking-[0.18em] text-white transition hover:bg-gold-dark"
          >
            Book Another Room
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-beige"><div className="h-10 w-10 animate-spin rounded-full border-4 border-gold border-t-transparent" /></div>}>
      <ConfirmationContent />
    </Suspense>
  );
}

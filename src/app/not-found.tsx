"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { SiteSettings } from "@/types";

export default function NotFound() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    fetch("/api/settings").then((r) => r.json()).then(setSettings).catch(() => {});
  }, []);

  if (!settings) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-beige">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
      </div>
    );
  }

  return (
    <>
      <Header settings={settings} />
      <main className="flex min-h-screen flex-col items-center justify-center bg-beige px-4 pt-28 text-center">
        <PageTransition>
          <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-gold">Page Not Found</p>
          <motion.h1
            className="mt-6 font-serif text-6xl uppercase tracking-[0.12em] text-charcoal sm:text-8xl"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 12, mass: 1.2 }}
          >
            404
          </motion.h1>
          <motion.p
            className="mt-6 max-w-md mx-auto font-sans text-sm leading-7 text-text-secondary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            The page you are looking for may have been moved or no longer exists. Please return to the homepage to continue exploring The Deoghar Grand.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <Link
              href="/"
              className="mt-10 inline-block rounded-full bg-gold px-8 py-4 font-sans text-xs uppercase tracking-[0.18em] text-white transition hover:bg-gold-dark"
            >
              Return Home
            </Link>
          </motion.div>
        </PageTransition>
      </main>
      <Footer settings={settings} />
    </>
  );
}

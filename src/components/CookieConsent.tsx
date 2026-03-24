"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 25 }}
          className="fixed bottom-0 left-0 right-0 z-[9998] border-t border-stone-200 bg-white/95 px-4 py-4 shadow-lg backdrop-blur-sm sm:px-6"
        >
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="font-sans text-sm text-text-secondary text-center sm:text-left">
              We use cookies to enhance your experience. By continuing to browse, you agree to our use of cookies.
            </p>
            <div className="flex shrink-0 gap-3">
              <button
                onClick={decline}
                className="rounded-full border border-stone-300 px-5 py-2 font-sans text-xs uppercase tracking-[0.14em] text-stone-500 transition hover:border-stone-400 hover:text-charcoal"
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="rounded-full bg-gold px-5 py-2 font-sans text-xs uppercase tracking-[0.14em] text-white transition hover:bg-gold/90"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

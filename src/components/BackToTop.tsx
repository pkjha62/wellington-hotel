"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTop() {
  const [show, setShow] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center overflow-hidden bg-gold text-white shadow-lg transition-colors duration-300 hover:bg-gold-dark"
          aria-label="Back to top"
        >
          <motion.svg
            animate={{ rotate: hovered ? -360 : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </motion.svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

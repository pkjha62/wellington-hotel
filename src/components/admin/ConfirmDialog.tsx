"use client";

import { useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ConfirmDialog({
  open,
  title,
  description,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onCancel();
  }, [onCancel]);

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKeyDown);
    cancelRef.current?.focus();
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, handleKeyDown]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
          <motion.div
            role="alertdialog"
            aria-labelledby="confirm-title"
            aria-describedby="confirm-desc"
            className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 5 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
            </div>
            <h2 id="confirm-title" className="font-serif text-xl uppercase tracking-[0.08em] text-charcoal">{title}</h2>
            <p id="confirm-desc" className="mt-2 font-sans text-sm leading-relaxed text-stone-500">{description}</p>
            <div className="mt-6 flex justify-end gap-3">
              <button ref={cancelRef} type="button" onClick={onCancel} className="rounded-xl border border-stone-200 px-4 py-2 font-sans text-xs uppercase tracking-wider text-stone-500 transition-all hover:border-stone-300 hover:text-charcoal">
                Cancel
              </button>
              <button type="button" onClick={onConfirm} className="rounded-xl bg-red-600 px-4 py-2 font-sans text-xs font-medium uppercase tracking-wider text-white transition-all hover:bg-red-700 active:scale-[0.97]">
                Confirm Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

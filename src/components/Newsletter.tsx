"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Newsletter({ title, description }: { title?: string; description?: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage("Thank you for subscribing!");
        setName("");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Connection error. Please try again.");
    }
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-charcoal">
      <motion.div
        className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-12 h-px bg-gold mx-auto mb-6 sm:mb-8" />
        <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-white tracking-wide uppercase">{title || "Newsletter"}</h2>
        <p className="font-sans text-sm text-white/60 mt-4 sm:mt-5 leading-relaxed">
          {description || "Subscribe to receive exclusive offers, spiritual event updates, and the latest news from The Deoghar Grand."}
        </p>
        <div className="w-12 h-px bg-gold mx-auto mt-6 sm:mt-8 mb-8 sm:mb-10" />

        {status === "success" ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} className="py-8" layout>
            <motion.div
              className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.15, stiffness: 300, damping: 15 }}
            >
              <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </motion.div>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="font-sans text-sm text-gold tracking-wider">{message}</motion.p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-0">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={status === "loading"}
              className="flex-1 sm:flex-[0.8] px-5 py-3.5 bg-white/10 border border-white/20 text-white placeholder:text-white/40 font-sans text-sm focus:outline-none focus:border-gold transition-colors disabled:opacity-50"
              aria-label="Your name"
            />
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === "loading"}
              className="flex-1 px-5 py-3.5 bg-white/10 border border-white/20 sm:border-l-0 text-white placeholder:text-white/40 font-sans text-sm focus:outline-none focus:border-gold transition-colors disabled:opacity-50"
              aria-label="Your email"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-8 py-3.5 bg-gold hover:bg-gold-dark text-white font-sans text-xs tracking-[0.2em] uppercase transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
            >
              {status === "loading" ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Subscribe"
              )}
            </button>
          </form>
        )}

        {status === "error" && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-sans text-xs text-red-400 mt-3">{message}</motion.p>
        )}
      </motion.div>
    </section>
  );
}

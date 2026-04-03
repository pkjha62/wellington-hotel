"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { FAQ } from "@/types";

function FAQItem({ faq }: { faq: FAQ }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-stone-200 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-gold"
      >
        <span className="font-sans text-sm font-medium text-charcoal sm:text-base">{faq.question}</span>
        <motion.svg
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="h-5 w-5 shrink-0 text-gold"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
        </motion.svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 font-sans text-sm leading-7 text-text-secondary">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection({ faqs }: { faqs: FAQ[] }) {
  if (faqs.length === 0) return null;

  const categories = [...new Set(faqs.map((f) => f.category))];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <section className="bg-white py-16 sm:py-20 md:py-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8">
        <motion.div
          className="text-center mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-12 h-px bg-gold mx-auto mb-6 sm:mb-8" />
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-charcoal tracking-wide uppercase">
            Frequently Asked Questions
          </h2>
          <div className="w-12 h-px bg-gold mx-auto mt-6 sm:mt-8" />
        </motion.div>

        {categories.map((cat) => (
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 last:mb-0"
          >
            <p className="mb-4 font-sans text-[11px] uppercase tracking-[0.22em] text-gold">{cat.charAt(0).toUpperCase() + cat.slice(1)}</p>
            <div className="rounded-[28px] border border-stone-200 bg-white px-6">
              {faqs
                .filter((f) => f.category === cat)
                .map((faq) => (
                  <FAQItem key={faq.id} faq={faq} />
                ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

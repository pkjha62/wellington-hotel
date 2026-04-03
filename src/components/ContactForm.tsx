"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactEnquirySchema } from "@/lib/schemas";
import type { z } from "zod";

type FormData = z.infer<typeof contactEnquirySchema>;

const fieldClass =
  "w-full rounded-xl border border-stone-200 bg-white px-4 py-3 font-sans text-sm text-charcoal placeholder:text-stone-400 transition focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/40";
const labelClass = "mb-1.5 block font-sans text-xs font-semibold uppercase tracking-[0.14em] text-stone-500";
const errorClass = "mt-1 font-sans text-xs text-red-500";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(contactEnquirySchema) });

  const onSubmit = async (data: FormData) => {
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong");
      }
      setSubmitted(true);
      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
    }
  };

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center justify-center rounded-2xl border border-stone-200/80 bg-white p-12 text-center shadow-sm"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
            <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
          </div>
          <h3 className="mt-6 font-serif text-2xl uppercase tracking-[0.1em] text-charcoal">Thank You!</h3>
          <p className="mt-3 font-sans text-sm leading-7 text-text-secondary">Your message has been received. We will get back to you shortly.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 rounded-full border border-gold px-6 py-2.5 font-sans text-xs uppercase tracking-[0.16em] text-gold transition hover:bg-gold hover:text-white"
          >
            Send Another Message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 rounded-2xl border border-stone-200/80 bg-white p-8 shadow-sm"
        >
          <h3 className="font-serif text-xl uppercase tracking-[0.1em] text-charcoal">Send a Message</h3>

          {error && (
            <p className="rounded-lg bg-red-50 p-3 font-sans text-sm text-red-600">{error}</p>
          )}

          <motion.div animate={errors.name ? { x: [-8, 8, -4, 4, 0] } : {}} transition={{ duration: 0.35 }}>
            <label className={labelClass}>Full Name</label>
            <input {...register("name")} placeholder="Your full name" className={fieldClass} />
            {errors.name && <p className={errorClass}>{errors.name.message}</p>}
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2">
            <motion.div animate={errors.email ? { x: [-8, 8, -4, 4, 0] } : {}} transition={{ duration: 0.35 }}>
              <label className={labelClass}>Email</label>
              <input {...register("email")} type="email" placeholder="you@example.com" className={fieldClass} />
              {errors.email && <p className={errorClass}>{errors.email.message}</p>}
            </motion.div>
            <motion.div animate={errors.phone ? { x: [-8, 8, -4, 4, 0] } : {}} transition={{ duration: 0.35 }}>
              <label className={labelClass}>Phone</label>
              <input {...register("phone")} type="tel" placeholder="+91 xxxxx xxxxx" className={fieldClass} />
              {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
            </motion.div>
          </div>

          <motion.div animate={errors.subject ? { x: [-8, 8, -4, 4, 0] } : {}} transition={{ duration: 0.35 }}>
            <label className={labelClass}>Subject</label>
            <input {...register("subject")} placeholder="How can we help?" className={fieldClass} />
            {errors.subject && <p className={errorClass}>{errors.subject.message}</p>}
          </motion.div>

          <motion.div animate={errors.message ? { x: [-8, 8, -4, 4, 0] } : {}} transition={{ duration: 0.35 }}>
            <label className={labelClass}>Message</label>
            <textarea {...register("message")} rows={5} placeholder="Tell us more..." className={`${fieldClass} resize-none`} />
            {errors.message && <p className={errorClass}>{errors.message.message}</p>}
          </motion.div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-gold py-3.5 font-sans text-xs uppercase tracking-[0.18em] text-white transition hover:bg-gold/90 disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

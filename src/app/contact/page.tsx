"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PageTransition from "@/components/PageTransition";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactEnquirySchema } from "@/lib/schemas";
import { useEffect, useState } from "react";
import type { SiteSettings, Announcement } from "@/types";
import type { z } from "zod";

type FormData = z.infer<typeof contactEnquirySchema>;

export default function ContactPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/settings").then((r) => r.json()).then(setSettings).catch(() => {});
    fetch("/api/announcements").then((r) => r.json()).then((d) => setAnnouncements(d ?? [])).catch(() => {});
  }, []);

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

  if (!settings) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-beige">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
      </div>
    );
  }

  const fieldClass =
    "w-full rounded-xl border border-stone-200 bg-white px-4 py-3 font-sans text-sm text-charcoal placeholder:text-stone-400 transition focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/40";
  const labelClass = "mb-1.5 block font-sans text-xs font-semibold uppercase tracking-[0.14em] text-stone-500";
  const errorClass = "mt-1 font-sans text-xs text-red-500";

  return (
    <>
      <Header settings={settings} announcements={announcements} />
      <main>
        <PageHero
          image="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80"
          imageAlt="Hotel reception desk"
          kicker="Get in Touch"
          title="Contact Us"
          subtitle="We would love to hear from you — reach out for reservations, enquiries, or any assistance."
        />

        <PageTransition>
          <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
            <div className="grid gap-16 lg:grid-cols-2">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-gold">Reach Us</p>
                <h2 className="mt-3 font-serif text-3xl uppercase tracking-[0.1em] text-charcoal">We&apos;re Here to Help</h2>
                <p className="mt-4 font-sans text-sm leading-7 text-text-secondary">
                  Whether you have questions about rooms, wish to plan a special event, or need travel assistance — our team is at your service.
                </p>

                <div className="mt-10 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10">
                      <svg className="h-5 w-5 text-gold" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                    </div>
                    <div>
                      <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-charcoal">Address</p>
                      <p className="mt-1 font-sans text-sm text-text-secondary">{settings.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10">
                      <svg className="h-5 w-5 text-gold" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                    </div>
                    <div>
                      <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-charcoal">Phone</p>
                      <a href={`tel:${settings.phone}`} className="mt-1 block font-sans text-sm text-gold hover:underline">{settings.phone}</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10">
                      <svg className="h-5 w-5 text-gold" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                    </div>
                    <div>
                      <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-charcoal">Email</p>
                      <a href={`mailto:${settings.email}`} className="mt-1 block font-sans text-sm text-gold hover:underline">{settings.email}</a>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
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

                      <div>
                        <label className={labelClass}>Full Name</label>
                        <input {...register("name")} placeholder="Your full name" className={fieldClass} />
                        {errors.name && <p className={errorClass}>{errors.name.message}</p>}
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label className={labelClass}>Email</label>
                          <input {...register("email")} type="email" placeholder="you@example.com" className={fieldClass} />
                          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                        </div>
                        <div>
                          <label className={labelClass}>Phone</label>
                          <input {...register("phone")} type="tel" placeholder="+91 xxxxx xxxxx" className={fieldClass} />
                          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
                        </div>
                      </div>

                      <div>
                        <label className={labelClass}>Subject</label>
                        <input {...register("subject")} placeholder="How can we help?" className={fieldClass} />
                        {errors.subject && <p className={errorClass}>{errors.subject.message}</p>}
                      </div>

                      <div>
                        <label className={labelClass}>Message</label>
                        <textarea {...register("message")} rows={5} placeholder="Tell us more..." className={`${fieldClass} resize-none`} />
                        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
                      </div>

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
              </motion.div>
            </div>
          </section>
        </PageTransition>
      </main>
      <Footer settings={settings} />
    </>
  );
}

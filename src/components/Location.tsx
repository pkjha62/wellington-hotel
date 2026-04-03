"use client";

import { motion } from "framer-motion";
import type { SiteSettings } from "@/types";

const quickLinks = [
  { label: "Temples", href: "https://www.google.com/maps/search/temples+near+Deoghar+Jharkhand", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2C8.13 2 5 5.13 5 9c0 4.12 4.56 8.44 6.36 10.13a1 1 0 001.28 0C14.44 17.44 19 13.12 19 9c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 7a2.5 2.5 0 010 5z" /></svg> },
  { label: "Nature", href: "https://www.google.com/maps/search/nature+parks+near+Deoghar+Jharkhand", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 17l6-6 4 4 8-8M14 7h7v7" /></svg> },
  { label: "Culture", href: "https://www.google.com/maps/search/cultural+sites+near+Deoghar+Jharkhand", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> },
  { label: "Local Cuisine", href: "/dining", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
];

const contactStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const contactItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Location({ settings }: { settings: SiteSettings }) {
  return (
    <section id="contact" className="py-16 sm:py-20 md:py-28 bg-beige">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
        <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="w-12 h-px bg-gold mx-auto mb-6 sm:mb-8" />
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-charcoal tracking-wide uppercase">In the Sacred City of Deoghar</h2>
          <div className="w-12 h-px bg-gold mx-auto mt-6 sm:mt-8 mb-8 sm:mb-10" />
          <p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed max-w-2xl mx-auto">
            {settings.locationDescription || `Located at ${settings.address}, ${settings.city} ${settings.pincode}, our hotel places guests close to Baba Baidyanath Dham while staying connected to Deoghar's hills, gardens, and cultural landmarks.`}
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mt-10 sm:mt-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
          {quickLinks.map((link) => (
            <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined} className="group flex flex-col items-center gap-3 py-6 sm:py-8 px-3 sm:px-4 bg-white hover:bg-charcoal transition-all duration-500 cursor-pointer min-h-[100px]">
              <span className="text-gold group-hover:text-gold-light transition-colors duration-500">{link.icon}</span>
              <span className="font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase text-charcoal group-hover:text-white transition-colors duration-500">{link.label}</span>
            </a>
          ))}
        </motion.div>

        {/* Google Maps Embed */}
        <motion.div
          className="mt-10 sm:mt-14 relative h-[250px] sm:h-[300px] md:h-[400px] overflow-hidden"
          initial={{ opacity: 0, clipPath: "circle(0% at 50% 50%)" }}
          whileInView={{ opacity: 1, clipPath: "circle(75% at 50% 50%)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500!2d86.6999889!3d24.4925198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f1162b1519c019:0xdb8ce9bf0b62d036!2sShree%20Baba%20Baidyanath%20Jyotirlinga%20Mandir%20Deoghar!5e0!3m2!1sen!2sin!4v1711234567890!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${settings.hotelName} location`}
            className="w-full h-full"
          />
          {/* Get Directions button overlaid on the map */}
          <a
            href="https://maps.app.goo.gl/14FrhQ9cftBzgw6r6"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-white px-4 py-2 shadow-lg font-sans text-xs uppercase tracking-[0.15em] text-charcoal hover:bg-gold hover:text-white transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Get Directions
          </a>
        </motion.div>

        <motion.div
          className="mt-8 grid gap-4 rounded-[28px] bg-white p-6 sm:grid-cols-3"
          variants={contactStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div variants={contactItem}>
            <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-text-light">Phone</p>
            <a href={`tel:${settings.phone.replace(/\s+/g, "")}`} className="mt-2 block font-serif text-xl text-charcoal">{settings.phone}</a>
          </motion.div>
          <motion.div variants={contactItem}>
            <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-text-light">Email</p>
            <a href={`mailto:${settings.email}`} className="mt-2 block font-serif text-xl text-charcoal">{settings.email}</a>
          </motion.div>
          <motion.div variants={contactItem}>
            <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-text-light">Address</p>
            <p className="mt-2 font-serif text-xl text-charcoal">{settings.city}, Jharkhand</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

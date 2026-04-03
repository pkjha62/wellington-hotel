export const revalidate = 60;

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PageTransition from "@/components/PageTransition";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { getSettings } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { normalizeImageUrl } from "@/lib/image-url";

export const metadata: Metadata = {
  title: "Banquet Hall & Wedding Venues | The Deoghar Grand Hotel & Spa",
  description:
    "Host your dream wedding, reception, Sangeet, or corporate event at The Deoghar Grand. Grand Ballroom for 500 guests, Divya Banquet Hall for 200, and the Nirmala Courtyard Garden — Deoghar's finest event spaces.",
};

const halls = [
  {
    id: "grand-ballroom",
    name: "Grand Ballroom",
    tag: "Flagship Venue",
    capacity: "Up to 500 Guests",
    sqft: "6,000 sq ft",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80",
    description:
      "The crown jewel of The Deoghar Grand — a soaring, pillar-free hall with double-height ceilings, bespoke crystal chandeliers, and a grand raised performance stage. Whether you envision a majestic baraat entry, a glittering reception, or a multi-faith wedding ceremony, the Grand Ballroom sets a stage worthy of your story. Our in-house décor and catering team has orchestrated over 400 weddings since 2009.",
    features: [
      "6,000 sq ft pillar-free layout",
      "Crystal chandelier canopy",
      "Raised performance stage",
      "Grand bridal entry arch",
      "4K projection & full AV system",
      "Dedicated pre-function foyer",
      "Bridal suite & groom's lounge",
      "Catering for 500+ guests",
      "In-house décor & floral team",
      "Valet & security services",
    ],
  },
  {
    id: "divya-banquet",
    name: "Divya Banquet Hall",
    tag: "Intimate Celebrations",
    capacity: "Up to 200 Guests",
    sqft: "2,800 sq ft",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80",
    description:
      "Named after the divine light of celebration, Divya Hall is where intimate milestones are honoured with warmth and elegance. Rajasthani-inspired arched interiors, handcrafted lattice walls, and warm amber lighting create an atmosphere of effortless festivity. Ideal for Mehendi, Sangeet, engagement ceremonies, anniversary dinners, and milestone birthdays.",
    features: [
      "Rajasthani-inspired lattice interiors",
      "Adjacent private bridal room",
      "Pre-function cocktail lounge",
      "Custom décor & fresh florals",
      "Full indoor/outdoor catering",
      "High-fidelity surround sound",
      "Dedicated event coordinator",
      "Customisable lighting moods",
    ],
  },
  {
    id: "nirmala-courtyard",
    name: "Nirmala Courtyard Garden",
    tag: "Open-Air Magic",
    capacity: "Up to 150 Guests",
    sqft: "Outdoor garden",
    image: "https://images.unsplash.com/photo-1510076857177-7470076d4098?w=1200&q=80",
    description:
      "Step into an enchanted evening under a canopy of a thousand warm fairy lights and the open Deoghar sky. The Nirmala Courtyard is shaded by mature trees and framed by manicured gardens — the preferred setting for Haldi ceremonies, outdoor cocktail parties, Sangeet dance floors, and al-fresco dinners where the stars are part of the décor.",
    features: [
      "Fairy-light & lantern canopy",
      "Garden & manicured lawns",
      "Floral mandap & arch setups",
      "Open-air Sangeet dance floor",
      "Fire-pit & bonfire options",
      "Bar & beverage station",
      "Power, PA & stage lighting",
      "Tented weather cover available",
    ],
  },
];

const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Weddings & Receptions",
    desc: "North Indian, Jharkhandi, and destination-style weddings with full décor, catering, and a dedicated wedding planner.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
    title: "Sangeet & Mehendi",
    desc: "DJ, folk performers, and choreographed LED stages — transform the Divya Hall or Courtyard into a night of colour.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Corporate Events",
    desc: "Seminars, product launches, AGMs, and offsites with fibre Wi-Fi, 4K AV, and business catering from Annapurna.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    ),
    title: "Milestone Celebrations",
    desc: "Birthdays, anniversaries, retirements, and baby showers with custom menus and themed décor packages.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: "Sacred Ceremonies",
    desc: "Mundan, thread ceremony, Griha Pravesh, and puja functions with sattvic catering and puja arrangement support.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Full Catering Services",
    desc: "Custom menus from vegetarian thalis to Continental and multi-cuisine buffers. In-house catering with live counters.",
  },
];

export default async function BanquetPage() {
  const settings = getSettings();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Banquet Hall & Events" },
        ]}
      />
      <Header settings={settings} />
      <main>
        <PageHero
          image={normalizeImageUrl("https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=80")}
          imageAlt="Grand Ballroom at The Deoghar Grand"
          kicker="Banquet Hall & Events"
          title="Celebrate in Grand Style"
          subtitle="Where every occasion — from a sacred ceremony to a grand wedding — is treated as a masterpiece."
        />

        <PageTransition>
          {/* Intro */}
          <section className="mx-auto max-w-4xl px-4 py-16 sm:py-20 sm:px-6 text-center">
            <div className="w-12 h-px bg-gold mx-auto mb-8" />
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal tracking-wide uppercase">
              Deoghar&apos;s Most Coveted Event Destination
            </h2>
            <div className="w-12 h-px bg-gold mx-auto my-8" />
            <p className="font-sans text-sm md:text-base text-text-secondary leading-8 max-w-2xl mx-auto">
              The Deoghar Grand has been the backdrop for over 400 weddings, hundreds of corporate milestones, and
              countless sacred ceremonies since 2009. Our three distinct venues — seating from 50 to 500 guests — are
              accompanied by an in-house décor team, award-winning catering from Annapurna, and a banquet coordinator
              who treats your event as their own family celebration.
            </p>
          </section>

          {/* Hall Cards */}
          <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 space-y-24">
            {halls.map((hall, i) => (
              <article
                key={hall.id}
                className={`flex flex-col gap-10 lg:items-start ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
              >
                {/* Image */}
                <div className="relative h-[340px] sm:h-[420px] w-full overflow-hidden rounded-[28px] lg:w-1/2 group">
                  <Image
                    src={normalizeImageUrl(hall.image)}
                    alt={hall.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={i === 0}
                  />
                  {/* Capacity badge */}
                  <div className="absolute top-5 left-5 rounded-full bg-black/60 backdrop-blur-sm px-4 py-1.5 font-sans text-[11px] uppercase tracking-[0.18em] text-gold">
                    {hall.capacity}
                  </div>
                </div>

                {/* Content */}
                <div className="lg:w-1/2 lg:py-6">
                  <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-gold">{hall.tag}</p>
                  <h2 className="mt-3 font-serif text-2xl sm:text-3xl uppercase tracking-[0.1em] text-charcoal">
                    {hall.name}
                  </h2>
                  <div className="mt-1 flex items-center gap-3">
                    <span className="font-sans text-xs text-text-secondary tracking-wider">{hall.sqft}</span>
                    <span className="w-1 h-1 rounded-full bg-gold/60" />
                    <span className="font-sans text-xs text-text-secondary tracking-wider">{hall.capacity}</span>
                  </div>
                  <p className="mt-5 font-sans text-sm leading-7 text-text-secondary">{hall.description}</p>
                  <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {hall.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5">
                        <svg className="h-3.5 w-3.5 text-gold shrink-0" fill="currentColor" viewBox="0 0 12 12">
                          <path d="M10.28.28L4 6.56 1.72 4.28-.28 6.28 4 10.56l8-8z" />
                        </svg>
                        <span className="font-sans text-[12px] text-text-secondary">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="mt-8 inline-block border border-gold px-8 py-3 font-sans text-[11px] uppercase tracking-[0.2em] text-gold hover:bg-gold hover:text-white transition-all duration-300"
                  >
                    Enquire About This Venue
                  </Link>
                </div>
              </article>
            ))}
          </section>

          {/* Services Grid */}
          <section className="bg-beige py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className="text-center mb-14">
                <div className="w-12 h-px bg-gold mx-auto mb-8" />
                <h2 className="font-serif text-2xl sm:text-3xl uppercase tracking-wide text-charcoal">
                  Events We Specialise In
                </h2>
                <div className="w-12 h-px bg-gold mx-auto mt-8" />
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((s) => (
                  <div
                    key={s.title}
                    className="group rounded-[24px] bg-white p-8 hover:shadow-[0_8px_40px_rgba(197,162,88,0.15)] hover:-translate-y-1 transition-all duration-300"
                  >
                    <span className="text-gold group-hover:scale-110 transition-transform duration-300 inline-block">
                      {s.icon}
                    </span>
                    <h3 className="mt-5 font-serif text-lg uppercase tracking-[0.1em] text-charcoal">{s.title}</h3>
                    <p className="mt-3 font-sans text-sm leading-6 text-text-secondary">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Why choose us strip */}
          <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
            <div className="text-center mb-14">
              <div className="w-12 h-px bg-gold mx-auto mb-8" />
              <h2 className="font-serif text-2xl sm:text-3xl uppercase tracking-wide text-charcoal">
                Why Families Choose The Deoghar Grand
              </h2>
              <div className="w-12 h-px bg-gold mx-auto mt-8" />
            </div>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 text-center">
              {[
                { value: "400+", label: "Weddings Hosted", sub: "Since 2009" },
                { value: "500", label: "Guest Capacity", sub: "Grand Ballroom" },
                { value: "15+", label: "Years of Trust", sub: "In Deoghar" },
                { value: "1", label: "Dedicated Coordinator", sub: "For your event" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center">
                  <p className="font-serif text-4xl sm:text-5xl text-gold">{stat.value}</p>
                  <p className="mt-2 font-serif text-base uppercase tracking-[0.1em] text-charcoal">{stat.label}</p>
                  <p className="mt-1 font-sans text-xs text-text-secondary tracking-wide">{stat.sub}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-charcoal py-20 text-center px-4">
            <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-gold">Let&apos;s Begin Planning</p>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl uppercase tracking-[0.12em] text-white">
              Your Perfect Event Starts Here
            </h2>
            <p className="mx-auto mt-5 max-w-xl font-sans text-sm leading-7 text-white/70">
              Our banquet team is available seven days a week to discuss your requirements, arrange a venue walkthrough,
              and send a bespoke proposal. We aim to respond to all enquiries within 4 hours.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`tel:${settings.phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 bg-gold px-8 py-3.5 font-sans text-xs uppercase tracking-[0.2em] text-white hover:bg-gold-dark transition-colors duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {settings.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-white/30 px-8 py-3.5 font-sans text-xs uppercase tracking-[0.2em] text-white hover:border-gold hover:text-gold transition-all duration-300"
              >
                Send an Enquiry
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <p className="mt-6 font-sans text-xs text-white/40 tracking-wider">
              {settings.email} &nbsp;·&nbsp; {settings.address}, {settings.city}
            </p>
          </section>
        </PageTransition>
      </main>
      <Footer settings={settings} />
    </>
  );
}

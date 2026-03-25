"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { SpecialOffer } from "@/types";
import { normalizeImageUrl } from "@/lib/image-url";

export default function SpecialOffersSection({ offers, title }: { offers: SpecialOffer[]; title?: string }) {
  if (offers.length === 0) return null;

  return (
    <section className="bg-beige py-16 sm:py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <motion.div
          className="text-center mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-12 h-px bg-gold mx-auto mb-6 sm:mb-8" />
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-charcoal tracking-wide uppercase">
            {title || "Special Offers"}
          </h2>
          <p className="mt-4 max-w-xl mx-auto font-sans text-sm text-text-secondary leading-relaxed">
            Exclusive packages and seasonal promotions for an unforgettable stay
          </p>
          <div className="w-12 h-px bg-gold mx-auto mt-6 sm:mt-8" />
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {offers.map((offer, i) => (
            <motion.article
              key={offer.id}
              className="group overflow-hidden rounded-[28px] border border-stone-200 bg-white transition hover:shadow-lg"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <div className="relative h-56 md:h-64 lg:h-72 overflow-hidden">
                <Image
                  src={normalizeImageUrl(offer.image)}
                  alt={offer.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-serif text-2xl text-white">&#x20B9;{offer.price.toLocaleString("en-IN")}</p>
                  <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.18em] text-white/80">
                    {new Date(offer.validFrom).toLocaleDateString("en-IN", { month: "short", day: "numeric" })} &ndash;{" "}
                    {new Date(offer.validTo).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl uppercase tracking-[0.1em] text-charcoal">{offer.title}</h3>
                <p className="mt-3 font-sans text-sm leading-7 text-text-secondary">{offer.description}</p>
                <Link
                  href="/booking"
                  className="mt-5 inline-block rounded-full bg-gold px-6 py-3 font-sans text-xs uppercase tracking-[0.18em] text-white transition hover:bg-gold-dark"
                >
                  Book This Offer
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

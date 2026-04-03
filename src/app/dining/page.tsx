export const revalidate = 60;

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PageTransition from "@/components/PageTransition";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";
import { getSettings, getDiningVenues } from "@/lib/store";
import Image from "next/image";
import type { Metadata } from "next";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { normalizeImageUrl } from "@/lib/image-url";

export const metadata: Metadata = {
  title: "Dining | The Deoghar Grand Hotel & Spa",
  description: "Savour exquisite North Indian and Jharkhandi cuisine at The Deoghar Grand — pure vegetarian thalis, multi-cuisine buffets, and more.",
};

export default function DiningPage() {
  const settings = getSettings();
  const venues = getDiningVenues(true);

  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Dining" }]} />
      <Header settings={settings} />
      <main>
        <PageHero
          image={settings.diningHeroImage || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80"}
          imageAlt="Elegant fine dining restaurant"
          kicker="Culinary"
          title="Dining"
          subtitle="Authentic flavours crafted with love — from pure vegetarian thalis to lavish multi-cuisine buffets."
        />

        <PageTransition>
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          {venues.length === 0 ? (
            <p className="py-20 text-center font-sans text-sm text-text-secondary">No dining venues available at the moment. Please check back soon.</p>
          ) : (
          <StaggerGrid className="space-y-20">
            {venues.map((item, i) => (
              <StaggerItem key={item.id}>
              <article
                className={`group flex flex-col gap-10 lg:items-center ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
              >
                <div className="relative h-80 w-full overflow-hidden rounded-[28px] lg:w-1/2">
                  <Image src={normalizeImageUrl(item.image)} alt={item.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 50vw" />
                </div>
                <div className="lg:w-1/2">
                  <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-gold">{item.cuisine}</p>
                  <h2 className="mt-2 font-serif text-2xl uppercase tracking-[0.1em] text-charcoal">{item.name}</h2>
                  <p className="mt-4 font-sans text-sm leading-7 text-text-secondary">{item.description}</p>
                  <p className="mt-4 font-sans text-xs uppercase tracking-[0.18em] text-gold">Hours: {item.hours}</p>
                </div>
              </article>
              </StaggerItem>
            ))}
          </StaggerGrid>
          )}
        </section>
        </PageTransition>
      </main>
      <Footer settings={settings} />
    </>
  );
}

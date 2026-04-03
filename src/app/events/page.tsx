export const revalidate = 60;

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PageTransition from "@/components/PageTransition";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";
import { getSettings, getEventVenues } from "@/lib/store";
import Image from "next/image";
import MotionArticle from "@/components/MotionArticle";
import type { Metadata } from "next";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { normalizeImageUrl } from "@/lib/image-url";

export const metadata: Metadata = {
  title: "Events & Celebrations | The Deoghar Grand Hotel & Spa",
  description: "Grand weddings, corporate conferences, private banquets — our ballroom and event halls provide the perfect setting.",
};

export default function EventsPage() {
  const settings = getSettings();
  const venues = getEventVenues(true);

  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Events & Celebrations" }]} />
      <Header settings={settings} />
      <main>
        <PageHero
          image={settings.eventsHeroImage || "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=80"}
          imageAlt="Grand event venue"
          kicker="Venues"
          title="Events &amp; Celebrations"
          subtitle="Grand occasions, flawless execution — from sacred ceremonies to corporate conferences."
        />

        <PageTransition>
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          {venues.length === 0 ? (
            <p className="py-20 text-center font-sans text-sm text-text-secondary">No event venues available at the moment. Please check back soon.</p>
          ) : (
          <StaggerGrid className="space-y-20">
            {venues.map((venue, i) => (
              <StaggerItem key={venue.id}>
              <MotionArticle
                className={`flex flex-col gap-10 lg:items-center ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                direction={i % 2 === 0 ? "left" : "right"}
              >
                <div className="relative h-80 w-full overflow-hidden rounded-[28px] lg:w-1/2">
                  <Image src={normalizeImageUrl(venue.image)} alt={venue.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 50vw" />
                </div>
                <div className="lg:w-1/2">
                  <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-gold">Up to {venue.capacity} guests</p>
                  <h2 className="mt-2 font-serif text-2xl uppercase tracking-[0.1em] text-charcoal">{venue.name}</h2>
                  <p className="mt-4 font-sans text-sm leading-7 text-text-secondary">{venue.description}</p>
                  {venue.features.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {venue.features.map((f) => (
                        <li key={f} className="rounded-full bg-gold/10 px-3 py-1 font-sans text-[11px] uppercase tracking-[0.14em] text-gold">{f}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </MotionArticle>
              </StaggerItem>
            ))}
          </StaggerGrid>
          )}
        </section>

        <section className="bg-charcoal py-20 text-center">
          <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-gold">Planning An Event?</p>
          <h2 className="mt-4 font-serif text-3xl uppercase tracking-[0.12em] text-white sm:text-4xl">Let&apos;s Create Something Memorable</h2>
          <p className="mx-auto mt-4 max-w-lg font-sans text-sm leading-7 text-white/70">
            Call <a href={`tel:${settings.phone}`} className="text-gold hover:underline">{settings.phone}</a> or email <a href={`mailto:${settings.email}`} className="text-gold hover:underline">{settings.email}</a> to discuss your event requirements with our dedicated planning team.
          </p>
        </section>
        </PageTransition>
      </main>
      <Footer settings={settings} />
    </>
  );
}

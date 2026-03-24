export const dynamic = "force-dynamic";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PageTransition from "@/components/PageTransition";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";
import { getSettings, getSpaServices } from "@/lib/store";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spa & Wellness | The Deoghar Grand Hotel & Spa",
  description: "Rejuvenate body and soul at Shanti Wellness Centre — Ayurvedic treatments, modern spa therapies, yoga, and fitness.",
};

export default function SpaPage() {
  const settings = getSettings();
  const services = getSpaServices(true);

  return (
    <>
      <Header settings={settings} />
      <main>
        <PageHero
          image="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80"
          imageAlt="Luxurious spa and wellness retreat"
          kicker="Wellness"
          title="Spa &amp; Wellness"
          subtitle="Shanti Wellness Centre — rejuvenate body and soul with Ayurvedic treatments, modern spa therapies, yoga, and more."
        />

        <PageTransition>
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <StaggerGrid className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((svc) => (
              <StaggerItem key={svc.id}>
              <article className="rounded-[28px] border border-stone-200 bg-white p-8 transition hover:border-gold hover:shadow-lg">
                <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-gold">{svc.category}</p>
                <h3 className="mt-2 font-serif text-xl uppercase tracking-[0.1em] text-charcoal">{svc.name}</h3>
                <p className="mt-4 font-sans text-sm leading-7 text-text-secondary">{svc.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="font-sans text-xs uppercase tracking-[0.18em] text-gold">{svc.duration}</p>
                  {svc.price > 0 && (
                    <p className="font-sans text-sm font-semibold text-charcoal">₹{svc.price.toLocaleString("en-IN")}</p>
                  )}
                </div>
              </article>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </section>

        {/* CTA */}
        <section className="bg-charcoal py-20 text-center">
          <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-gold">Reservations</p>
          <h2 className="mt-4 font-serif text-3xl uppercase tracking-[0.12em] text-white sm:text-4xl">Book Your Wellness Journey</h2>
          <p className="mx-auto mt-4 max-w-lg font-sans text-sm leading-7 text-white/70">
            Contact our spa reception at <a href={`tel:${settings.phone}`} className="text-gold hover:underline">{settings.phone}</a> or email <a href={`mailto:${settings.email}`} className="text-gold hover:underline">{settings.email}</a> to schedule treatments and packages.
          </p>
        </section>
        </PageTransition>
      </main>
      <Footer settings={settings} />
    </>
  );
}

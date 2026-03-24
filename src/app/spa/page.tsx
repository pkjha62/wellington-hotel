import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PageTransition from "@/components/PageTransition";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";
import { getSettings } from "@/lib/store";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spa & Wellness | The Deoghar Grand Hotel & Spa",
  description: "Rejuvenate body and soul at Shanti Wellness Centre — Ayurvedic treatments, modern spa therapies, yoga, and fitness.",
};

const services = [
  {
    title: "Ayurvedic Treatments",
    description: "Traditional Ayurvedic therapies including Abhyanga, Shirodhara, and Panchakarma administered by certified practitioners. Restore your doshas and achieve holistic balance.",
    duration: "60 – 120 min",
  },
  {
    title: "Deep Tissue & Swedish Massage",
    description: "Expert therapeutic massage to relieve tension, improve circulation, and promote deep relaxation after your pilgrimage or travel.",
    duration: "45 – 90 min",
  },
  {
    title: "Yoga & Meditation",
    description: "Daily guided yoga sessions at dawn in our rooftop studio. Meditation workshops available for individuals and groups.",
    duration: "60 min sessions",
  },
  {
    title: "Fitness Centre",
    description: "Fully equipped modern gym with cardio machines, free weights, and personal training on request. Open 6 AM to 10 PM.",
    duration: "Open daily",
  },
  {
    title: "Herbal Steam & Sauna",
    description: "Detoxify and unwind with our herb-infused steam room and dry sauna. Complimentary for spa package guests.",
    duration: "30 min",
  },
  {
    title: "Beauty & Grooming",
    description: "Full-service salon offering facials, manicures, pedicures, and bridal packages with premium organic products.",
    duration: "30 – 180 min",
  },
];

export default function SpaPage() {
  const settings = getSettings();

  return (
    <>
      <Header settings={settings} />
      <main>
        <PageHero
          image="https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=1920&q=80"
          imageAlt="Spa and wellness"
          kicker="Wellness"
          title="Spa &amp; Wellness"
          subtitle="Shanti Wellness Centre — rejuvenate body and soul with Ayurvedic treatments, modern spa therapies, yoga, and more."
        />

        <PageTransition>
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <StaggerGrid className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((svc) => (
              <StaggerItem key={svc.title}>
              <article className="rounded-[28px] border border-stone-200 bg-white p-8 transition hover:border-gold hover:shadow-lg">
                <h3 className="font-serif text-xl uppercase tracking-[0.1em] text-charcoal">{svc.title}</h3>
                <p className="mt-4 font-sans text-sm leading-7 text-text-secondary">{svc.description}</p>
                <p className="mt-4 font-sans text-xs uppercase tracking-[0.18em] text-gold">{svc.duration}</p>
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

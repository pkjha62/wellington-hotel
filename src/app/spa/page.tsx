import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSettings } from "@/lib/store";
import Image from "next/image";
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
        <section className="relative flex min-h-[50vh] items-center justify-center bg-charcoal">
          <Image
            src="https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=1920&q=80"
            alt="Spa and wellness"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="relative z-10 text-center px-4">
            <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-gold">Wellness</p>
            <h1 className="mt-4 font-serif text-5xl uppercase tracking-[0.12em] text-white sm:text-6xl">Spa &amp; Wellness</h1>
            <p className="mt-4 max-w-xl mx-auto font-sans text-sm leading-7 text-white/70">
              Shanti Wellness Centre — rejuvenate body and soul with Ayurvedic treatments, modern spa therapies, yoga, and more.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((svc) => (
              <article key={svc.title} className="rounded-[28px] border border-stone-200 bg-white p-8 transition hover:border-gold hover:shadow-lg">
                <h3 className="font-serif text-xl uppercase tracking-[0.1em] text-charcoal">{svc.title}</h3>
                <p className="mt-4 font-sans text-sm leading-7 text-text-secondary">{svc.description}</p>
                <p className="mt-4 font-sans text-xs uppercase tracking-[0.18em] text-gold">{svc.duration}</p>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-charcoal py-20 text-center">
          <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-gold">Reservations</p>
          <h2 className="mt-4 font-serif text-3xl uppercase tracking-[0.12em] text-white sm:text-4xl">Book Your Wellness Journey</h2>
          <p className="mx-auto mt-4 max-w-lg font-sans text-sm leading-7 text-white/70">
            Contact our spa reception at {settings.phone} or email {settings.email} to schedule treatments and packages.
          </p>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PageTransition from "@/components/PageTransition";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";
import { getSettings } from "@/lib/store";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events & Celebrations | The Deoghar Grand Hotel & Spa",
  description: "Grand weddings, corporate conferences, private banquets — our ballroom and event halls provide the perfect setting.",
};

const venues = [
  {
    title: "Grand Ballroom",
    capacity: "Up to 500 guests",
    description: "Our largest venue features crystal chandeliers, a built-in stage, state-of-the-art AV equipment, and a dedicated pre-function area. Perfect for grand weddings, receptions, and gala events.",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
  },
  {
    title: "Divya Banquet Hall",
    capacity: "Up to 200 guests",
    description: "An elegant mid-size banquet hall ideal for engagement ceremonies, birthday celebrations, anniversary parties, and corporate events. Full catering and decor services available.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c8e9a9?w=800&q=80",
  },
  {
    title: "Conference Centre",
    capacity: "Up to 100 guests",
    description: "Equipped with projector, podium, high-speed Wi-Fi, and theatre/classroom seating layouts. Ideal for seminars, workshops, corporate offsites, and board meetings.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  },
  {
    title: "Courtyard Garden",
    capacity: "Up to 150 guests",
    description: "An open-air venue surrounded by manicured gardens and soft lighting. Ideal for evening receptions, sangeet ceremonies, and al fresco dinners under the stars.",
    image: "https://images.unsplash.com/photo-1510076857177-7470076d4098?w=800&q=80",
  },
];

export default function EventsPage() {
  const settings = getSettings();

  return (
    <>
      <Header settings={settings} />
      <main>
        <PageHero
          image="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=80"
          imageAlt="Grand event venue"
          kicker="Venues"
          title="Events &amp; Celebrations"
          subtitle="Grand occasions, flawless execution — from sacred ceremonies to corporate conferences."
        />

        <PageTransition>
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <StaggerGrid className="space-y-20">
            {venues.map((venue, i) => (
              <StaggerItem key={venue.title}>
              <article
                className={`flex flex-col gap-10 lg:items-center ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
              >
                <div className="relative h-80 w-full overflow-hidden rounded-[28px] lg:w-1/2">
                  <Image src={venue.image} alt={venue.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                </div>
                <div className="lg:w-1/2">
                  <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-gold">{venue.capacity}</p>
                  <h2 className="mt-2 font-serif text-2xl uppercase tracking-[0.1em] text-charcoal">{venue.title}</h2>
                  <p className="mt-4 font-sans text-sm leading-7 text-text-secondary">{venue.description}</p>
                </div>
              </article>
              </StaggerItem>
            ))}
          </StaggerGrid>
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

import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
    image: "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800&q=80",
  },
  {
    title: "Conference Centre",
    capacity: "Up to 100 guests",
    description: "Equipped with projector, podium, high-speed Wi-Fi, and theatre/classroom seating layouts. Ideal for seminars, workshops, corporate offsites, and board meetings.",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
  },
  {
    title: "Courtyard Garden",
    capacity: "Up to 150 guests",
    description: "An open-air venue surrounded by manicured gardens and soft lighting. Ideal for evening receptions, sangeet ceremonies, and al fresco dinners under the stars.",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
  },
];

export default function EventsPage() {
  const settings = getSettings();

  return (
    <>
      <Header settings={settings} />
      <main>
        <section className="relative flex min-h-[50vh] items-center justify-center bg-charcoal">
          <Image
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=80"
            alt="Grand event venue"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="relative z-10 text-center px-4">
            <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-gold">Venues</p>
            <h1 className="mt-4 font-serif text-5xl uppercase tracking-[0.12em] text-white sm:text-6xl">Events &amp; Celebrations</h1>
            <p className="mt-4 max-w-xl mx-auto font-sans text-sm leading-7 text-white/70">
              Grand occasions, flawless execution — from sacred ceremonies to corporate conferences.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="space-y-20">
            {venues.map((venue, i) => (
              <article
                key={venue.title}
                className={`flex flex-col gap-10 lg:items-center ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
              >
                <div className="relative h-80 w-full overflow-hidden rounded-[28px] lg:w-1/2">
                  <Image src={venue.image} alt={venue.title} fill className="object-cover" />
                </div>
                <div className="lg:w-1/2">
                  <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-gold">{venue.capacity}</p>
                  <h2 className="mt-2 font-serif text-2xl uppercase tracking-[0.1em] text-charcoal">{venue.title}</h2>
                  <p className="mt-4 font-sans text-sm leading-7 text-text-secondary">{venue.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-charcoal py-20 text-center">
          <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-gold">Planning An Event?</p>
          <h2 className="mt-4 font-serif text-3xl uppercase tracking-[0.12em] text-white sm:text-4xl">Let&apos;s Create Something Memorable</h2>
          <p className="mx-auto mt-4 max-w-lg font-sans text-sm leading-7 text-white/70">
            Call {settings.phone} or email {settings.email} to discuss your event requirements with our dedicated planning team.
          </p>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}

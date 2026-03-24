import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PageTransition from "@/components/PageTransition";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";
import { getRooms, getSettings } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rooms & Suites | The Deoghar Grand Hotel & Spa",
  description: "Explore our luxury rooms and suites — from cosy pilgrim rooms to grand presidential suites near Baba Baidyanath Dham.",
};

export default function RoomsPage() {
  const settings = getSettings();
  const rooms = getRooms().filter((r) => r.isAvailable);

  return (
    <>
      <Header settings={settings} />
      <main>
        <PageHero
          image="https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1920&q=80"
          imageAlt="Luxury hotel room"
          kicker="Accommodation"
          title="Rooms &amp; Suites"
          subtitle="Each room blends traditional Jharkhandi aesthetics with modern luxury — an experience crafted for comfort and culture."
        />

        <PageTransition>
        {/* Room Grid */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <StaggerGrid className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <StaggerItem key={room.id}>
              <article className="group overflow-hidden rounded-[28px] border border-stone-200 bg-white transition hover:shadow-lg">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={room.images[0]}
                    alt={room.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute bottom-4 left-4 rounded-full bg-gold px-4 py-1.5 font-sans text-xs uppercase tracking-[0.18em] text-white">
                    {room.type}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl uppercase tracking-[0.1em] text-charcoal">{room.name}</h3>
                  <p className="mt-3 font-sans text-sm leading-6 text-text-secondary line-clamp-3">{room.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {room.amenities.slice(0, 4).map((a) => (
                      <span key={a} className="rounded-full border border-stone-200 px-3 py-1 font-sans text-[11px] text-text-secondary">{a}</span>
                    ))}
                    {room.amenities.length > 4 && (
                      <span className="rounded-full border border-stone-200 px-3 py-1 font-sans text-[11px] text-text-secondary">+{room.amenities.length - 4} more</span>
                    )}
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <span className="font-serif text-2xl text-charcoal">&#x20B9;{room.price.toLocaleString("en-IN")}</span>
                      <span className="font-sans text-xs text-text-secondary"> / night</span>
                    </div>
                    <span className="font-sans text-xs text-text-secondary">Up to {room.maxGuests} guests</span>
                  </div>
                  <Link
                    href={`/booking?roomId=${room.id}`}
                    className="mt-6 block w-full rounded-full bg-gold py-3 text-center font-sans text-xs uppercase tracking-[0.18em] text-white transition hover:bg-gold-dark"
                  >
                    Book This Room
                  </Link>
                </div>
              </article>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </section>
        </PageTransition>
      </main>
      <Footer settings={settings} />
    </>
  );
}

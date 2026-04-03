export const revalidate = 60;

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PageTransition from "@/components/PageTransition";
import RoomsGrid from "@/components/RoomsGrid";
import { getRooms, getSettings } from "@/lib/store";
import type { Metadata } from "next";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Rooms & Suites | The Deoghar Grand Hotel & Spa",
  description: "Explore our luxury rooms and suites — from cosy pilgrim rooms to grand presidential suites near Baba Baidyanath Dham.",
};

export default function RoomsPage() {
  const settings = getSettings();
  const rooms = getRooms().filter((r) => r.isAvailable);

  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Rooms & Suites" }]} />
      <Header settings={settings} />
      <main>
        <PageHero
          image={settings.roomsHeroImage || "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1920&q=80"}
          imageAlt="Elegant luxury hotel room"
          kicker="Accommodation"
          title="Rooms &amp; Suites"
          subtitle="Each room blends traditional Jharkhandi aesthetics with modern luxury — an experience crafted for comfort and culture."
        />

        <PageTransition>
          <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
            <RoomsGrid rooms={rooms} />
          </section>
        </PageTransition>
      </main>
      <Footer settings={settings} />
    </>
  );
}

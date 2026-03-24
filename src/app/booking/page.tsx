export const dynamic = "force-dynamic";

import { Suspense } from "react";
import BookingForm from "@/components/BookingForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { getRooms, getSettings } from "@/lib/store";

export default function BookingPage() {
  const rooms = getRooms().filter((room) => room.isAvailable);
  const settings = getSettings();

  return (
    <>
      <Header settings={settings} />
      <main className="min-h-screen bg-stone-50 px-4 pt-28 pb-10 sm:px-6 md:px-8">
        <PageTransition>
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <section className="rounded-[28px] bg-charcoal px-6 py-8 text-white shadow-xl sm:px-8 sm:py-10">
              <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-gold">Reservation Desk</p>
              <h1 className="mt-5 font-serif text-4xl uppercase leading-tight tracking-[0.12em] sm:text-5xl">Book your stay in Deoghar.</h1>
              <p className="mt-6 font-sans text-sm leading-7 text-white/70">
                Reserve a room at {settings.hotelName} near Baba Baidyanath Dham. Select dates, room type, and guest details below to create a confirmed reservation request.
              </p>
              <div className="mt-8 space-y-4 border-t border-white/10 pt-6">
                <p className="font-sans text-sm text-white/80">Phone: {settings.phone}</p>
                <p className="font-sans text-sm text-white/80">Email: {settings.email}</p>
                <p className="font-sans text-sm text-white/80">Address: {settings.address}, {settings.city}</p>
              </div>
            </section>

            <Suspense fallback={<div className="animate-pulse rounded-[28px] bg-white p-8 h-96" />}>
              <BookingForm rooms={rooms} />
            </Suspense>
          </div>
        </div>
        </PageTransition>
      </main>
      <Footer settings={settings} />
    </>
  );
}

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSettings } from "@/lib/store";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | The Deoghar Grand Hotel & Spa",
  description: "Terms and conditions governing your use of The Deoghar Grand Hotel & Spa services and website.",
};

export default function TermsPage() {
  const settings = getSettings();

  return (
    <>
      <Header settings={settings} />
      <main className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-gold">Legal</p>
        <h1 className="mt-4 font-serif text-4xl uppercase tracking-[0.12em] text-charcoal sm:text-5xl">Terms &amp; Conditions</h1>
        <p className="mt-4 font-sans text-sm text-text-secondary">Effective Date: 1 January 2026</p>

        <div className="mt-10 space-y-8 font-sans text-sm leading-7 text-text-secondary">
          <section>
            <h2 className="font-serif text-xl uppercase tracking-[0.1em] text-charcoal">1. Reservations</h2>
            <p className="mt-3">All reservations are subject to availability. A valid email and phone number are required to confirm a booking. The hotel reserves the right to cancel reservations that cannot be verified.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl uppercase tracking-[0.1em] text-charcoal">2. Check-In &amp; Check-Out</h2>
            <p className="mt-3">Standard check-in time is 2:00 PM and check-out is 12:00 noon. Early check-in and late check-out may be available on request, subject to availability and additional charges.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl uppercase tracking-[0.1em] text-charcoal">3. Cancellation Policy</h2>
            <p className="mt-3">Free cancellation is available up to 48 hours before the check-in date. Cancellations within 48 hours will be charged one night&apos;s stay. No-shows will be charged the full reservation amount.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl uppercase tracking-[0.1em] text-charcoal">4. Guest Conduct</h2>
            <p className="mt-3">Guests are expected to conduct themselves respectfully. The hotel reserves the right to remove guests who engage in disruptive, unlawful, or damaging behaviour without refund.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl uppercase tracking-[0.1em] text-charcoal">5. Liability</h2>
            <p className="mt-3">The hotel is not liable for loss or damage to personal property. Guests are advised to use in-room safes for valuables. The hotel&apos;s liability is limited to the amount paid for the reservation.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl uppercase tracking-[0.1em] text-charcoal">6. Modifications</h2>
            <p className="mt-3">We reserve the right to update these terms at any time. Continued use of our services constitutes acceptance of the revised terms.</p>
          </section>
        </div>
      </main>
      <Footer settings={settings} />
    </>
  );
}

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { getSettings } from "@/lib/store";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | The Deoghar Grand Hotel & Spa",
  description: "Learn how The Deoghar Grand Hotel & Spa collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  const settings = getSettings();

  return (
    <>
      <Header settings={settings} />
      <main className="mx-auto max-w-4xl px-4 pt-32 pb-20 sm:px-6">
        <PageTransition>
        <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-gold">Legal</p>
        <h1 className="mt-4 font-serif text-4xl uppercase tracking-[0.12em] text-charcoal sm:text-5xl">Privacy Policy</h1>
        <p className="mt-4 font-sans text-sm text-text-secondary">Effective Date: 1 January 2026</p>

        <div className="mt-10 space-y-8 font-sans text-sm leading-7 text-text-secondary">
          <section>
            <h2 className="font-serif text-xl uppercase tracking-[0.1em] text-charcoal">1. Information We Collect</h2>
            <p className="mt-3">When you make a reservation, subscribe to our newsletter, or contact us, we may collect: your name, email address, phone number, check-in/check-out dates, room preferences, and payment details.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl uppercase tracking-[0.1em] text-charcoal">2. How We Use Your Information</h2>
            <p className="mt-3">We use your personal information to process reservations, communicate booking confirmations, improve our services, send promotional offers (with your consent), and comply with legal requirements.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl uppercase tracking-[0.1em] text-charcoal">3. Data Sharing</h2>
            <p className="mt-3">We do not sell your personal data. We may share it with trusted third-party service providers (payment processors, email services) who assist in operating the hotel, subject to confidentiality agreements.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl uppercase tracking-[0.1em] text-charcoal">4. Data Security</h2>
            <p className="mt-3">We employ industry-standard security measures including encryption, secure servers, and access controls to protect your personal data from unauthorised access, alteration, or disclosure.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl uppercase tracking-[0.1em] text-charcoal">5. Your Rights</h2>
            <p className="mt-3">You may request access to, correction of, or deletion of your personal data at any time by contacting us at {settings.email}. We will respond within 30 days.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl uppercase tracking-[0.1em] text-charcoal">6. Contact</h2>
            <p className="mt-3">For privacy-related queries, contact us at {settings.email} or call {settings.phone}.</p>
          </section>
        </div>
        </PageTransition>
      </main>
      <Footer settings={settings} />
    </>
  );
}

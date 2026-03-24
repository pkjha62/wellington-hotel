import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSettings } from "@/lib/store";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | The Deoghar Grand Hotel & Spa",
  description: "Learn how The Deoghar Grand Hotel & Spa uses cookies and similar technologies.",
};

export default function CookiesPage() {
  const settings = getSettings();

  return (
    <>
      <Header settings={settings} />
      <main className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-gold">Legal</p>
        <h1 className="mt-4 font-serif text-4xl uppercase tracking-[0.12em] text-charcoal sm:text-5xl">Cookie Policy</h1>
        <p className="mt-4 font-sans text-sm text-text-secondary">Effective Date: 1 January 2026</p>

        <div className="mt-10 space-y-8 font-sans text-sm leading-7 text-text-secondary">
          <section>
            <h2 className="font-serif text-xl uppercase tracking-[0.1em] text-charcoal">1. What Are Cookies</h2>
            <p className="mt-3">Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and improve your browsing experience.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl uppercase tracking-[0.1em] text-charcoal">2. Cookies We Use</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li><strong>Essential cookies:</strong> Required for site functionality, such as admin authentication tokens.</li>
              <li><strong>Analytics cookies:</strong> Help us understand how visitors interact with our website.</li>
              <li><strong>Preference cookies:</strong> Remember your settings and booking preferences.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl uppercase tracking-[0.1em] text-charcoal">3. Managing Cookies</h2>
            <p className="mt-3">You can control and delete cookies through your browser settings. Disabling essential cookies may affect site functionality.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl uppercase tracking-[0.1em] text-charcoal">4. Contact</h2>
            <p className="mt-3">For questions about our cookie practices, contact us at {settings.email}.</p>
          </section>
        </div>
      </main>
      <Footer settings={settings} />
    </>
  );
}

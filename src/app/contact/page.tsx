export const revalidate = 60;

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PageTransition from "@/components/PageTransition";
import ContactForm from "@/components/ContactForm";
import { getSettings, getAnnouncements } from "@/lib/store";
import type { Metadata } from "next";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Contact Us | The Deoghar Grand Hotel & Spa",
  description: "Get in touch with The Deoghar Grand — reservations, enquiries, event planning, and travel assistance.",
};

export default function ContactPage() {
  const settings = getSettings();
  const announcements = getAnnouncements(true);

  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Contact Us" }]} />
      <Header settings={settings} announcements={announcements} />
      <main>
        <PageHero
          image={settings.contactHeroImage || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80"}
          imageAlt="Hotel reception desk"
          kicker="Get in Touch"
          title="Contact Us"
          subtitle="We would love to hear from you — reach out for reservations, enquiries, or any assistance."
        />

        <PageTransition>
          <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
            <div className="grid gap-16 lg:grid-cols-2">
              {/* Contact Info */}
              <div>
                <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-gold">Reach Us</p>
                <h2 className="mt-3 font-serif text-3xl uppercase tracking-[0.1em] text-charcoal">We&apos;re Here to Help</h2>
                <p className="mt-4 font-sans text-sm leading-7 text-text-secondary">
                  Whether you have questions about rooms, wish to plan a special event, or need travel assistance — our team is at your service.
                </p>

                <div className="mt-10 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10">
                      <svg className="h-5 w-5 text-gold" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                    </div>
                    <div>
                      <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-charcoal">Address</p>
                      <p className="mt-1 font-sans text-sm text-text-secondary">{settings.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10">
                      <svg className="h-5 w-5 text-gold" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                    </div>
                    <div>
                      <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-charcoal">Phone</p>
                      <a href={`tel:${settings.phone}`} className="mt-1 block font-sans text-sm text-gold hover:underline">{settings.phone}</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10">
                      <svg className="h-5 w-5 text-gold" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                    </div>
                    <div>
                      <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-charcoal">Email</p>
                      <a href={`mailto:${settings.email}`} className="mt-1 block font-sans text-sm text-gold hover:underline">{settings.email}</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <ContactForm />
              </div>
            </div>
          </section>
        </PageTransition>
      </main>
      <Footer settings={settings} />
    </>
  );
}

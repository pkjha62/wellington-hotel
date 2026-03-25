export const dynamic = "force-dynamic";

import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Experiences from "@/components/Experiences";
import InstagramGrid from "@/components/InstagramGrid";
import Introduction from "@/components/Introduction";
import KeyOfferings from "@/components/KeyOfferings";
import Location from "@/components/Location";
import Newsletter from "@/components/Newsletter";
import ScrollProgress from "@/components/ScrollProgress";
import StatsStrip from "@/components/StatsStrip";
import Testimonials from "@/components/Testimonials";
import WhatsAppButton from "@/components/WhatsAppButton";
import FAQSection from "@/components/FAQSection";
import SpecialOffersSection from "@/components/SpecialOffersSection";
import { getAnnouncements, getExperiences, getGallery, getOfferings, getSettings, getStatFacts, getTestimonials, getFAQs, getSpecialOffers } from "@/lib/store";
import type { Metadata } from "next";

export function generateMetadata(): Metadata {
  const settings = getSettings();
  return {
    title: settings.metaTitle,
    description: settings.metaDescription,
    openGraph: {
      title: settings.metaTitle,
      description: settings.metaDescription,
      images: [settings.ogImage],
    },
  };
}

export default function Home() {
  const settings = getSettings();
  const announcements = getAnnouncements(true);
  const offerings = getOfferings(true);
  const experiences = getExperiences(true);
  const gallery = getGallery();
  const testimonials = getTestimonials(true);
  const statFacts = getStatFacts(true);
  const faqs = getFAQs(true);
  const specialOffers = getSpecialOffers(true);

  return (
    <>
      <ScrollProgress />
      <Header settings={settings} announcements={announcements} />
      <main id="main-content">
        <Hero settings={settings} />
        <Introduction settings={settings} />
        <StatsStrip statFacts={statFacts} />
        <KeyOfferings offerings={offerings} />
        <Experiences experiences={experiences} title={settings.experiencesTitle} />
        <SpecialOffersSection offers={specialOffers} title={settings.offersTitle} />
        <Testimonials items={testimonials} title={settings.testimonialsTitle} />
        <Location settings={settings} />
        <InstagramGrid images={gallery} instagramHandle={settings.instagramHandle} title={settings.galleryTitle} />
        <Newsletter title={settings.newsletterTitle} description={settings.newsletterDescription} />
        <FAQSection faqs={faqs} />
      </main>
      <Footer settings={settings} />
      <BackToTop />
      <WhatsAppButton phone={settings.whatsappNumber} />
    </>
  );
}

import AnnouncementBar from "@/components/AnnouncementBar";
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
import { getAnnouncements, getExperiences, getGallery, getOfferings, getSettings, getStats, getTestimonials } from "@/lib/store";

export default function Home() {
  const settings = getSettings();
  const announcements = getAnnouncements(true);
  const offerings = getOfferings(true);
  const experiences = getExperiences(true);
  const gallery = getGallery();
  const testimonials = getTestimonials(true);
  const stats = getStats();

  return (
    <>
      <ScrollProgress />
      <AnnouncementBar announcements={announcements} />
      <Header settings={settings} />
      <main>
        <Hero settings={settings} />
        <Introduction settings={settings} />
        <StatsStrip stats={stats} />
        <KeyOfferings offerings={offerings} />
        <Experiences experiences={experiences} />
        <Testimonials items={testimonials} />
        <Location settings={settings} />
        <InstagramGrid images={gallery} instagramHandle={settings.instagramHandle} />
        <Newsletter />
      </main>
      <Footer settings={settings} />
      <BackToTop />
      <WhatsAppButton phone={settings.whatsappNumber} />
    </>
  );
}

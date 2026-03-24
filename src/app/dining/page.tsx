import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PageTransition from "@/components/PageTransition";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";
import { getSettings } from "@/lib/store";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dining | The Deoghar Grand Hotel & Spa",
  description: "Savour exquisite North Indian and Jharkhandi cuisine at The Deoghar Grand — pure vegetarian thalis, multi-cuisine buffets, and more.",
};

const diningExperiences = [
  {
    title: "Annapurna — Multi-Cuisine Restaurant",
    description: "Our flagship restaurant serves an extensive breakfast, lunch, and dinner buffet featuring North Indian, Jharkhandi, and continental cuisine. Enjoy the finest vegetarian and non-vegetarian dishes prepared by our master chefs.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    hours: "7:00 AM – 10:30 PM",
  },
  {
    title: "Prasad — Pure Vegetarian Kitchen",
    description: "A dedicated pure vegetarian restaurant offering traditional thalis, sattvic meals, and regional specialities. Ideal for devotees observing dietary customs during their pilgrimage.",
    image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&q=80",
    hours: "6:30 AM – 9:30 PM",
  },
  {
    title: "Courtyard Lounge & Café",
    description: "An open-air lounge perfect for chai, fresh juices, pastries, and light bites. Live devotional music on Saturday evenings transforms this space into a tranquil cultural gathering.",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
    hours: "10:00 AM – 11:00 PM",
  },
  {
    title: "Private Dining & Banquets",
    description: "Host intimate dinners, celebrations, or corporate meals in our private dining rooms. Customised menus, dedicated service, and elegant ambience for up to 40 guests.",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
    hours: "By reservation",
  },
];

export default function DiningPage() {
  const settings = getSettings();

  return (
    <>
      <Header settings={settings} />
      <main>
        <PageHero
          image="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80"
          imageAlt="Fine dining"
          kicker="Culinary"
          title="Dining"
          subtitle="Authentic flavours crafted with love — from pure vegetarian thalis to lavish multi-cuisine buffets."
        />

        <PageTransition>
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <StaggerGrid className="space-y-20">
            {diningExperiences.map((item, i) => (
              <StaggerItem
                key={item.title}
              >
              <article
                className={`flex flex-col gap-10 lg:items-center ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
              >
                <div className="relative h-80 w-full overflow-hidden rounded-[28px] lg:w-1/2">
                  <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                </div>
                <div className="lg:w-1/2">
                  <h2 className="font-serif text-2xl uppercase tracking-[0.1em] text-charcoal">{item.title}</h2>
                  <p className="mt-4 font-sans text-sm leading-7 text-text-secondary">{item.description}</p>
                  <p className="mt-4 font-sans text-xs uppercase tracking-[0.18em] text-gold">Hours: {item.hours}</p>
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

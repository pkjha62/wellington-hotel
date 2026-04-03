export const revalidate = 60;

import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import RoomImageCarousel from "@/components/RoomImageCarousel";
import AmenityList from "@/components/AmenityList";
import { getRooms, getRoom, getSettings } from "@/lib/store";
import type { Metadata } from "next";
import { normalizeImageList } from "@/lib/image-url";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return getRooms()
    .filter((r) => r.isAvailable)
    .map((r) => ({ id: r.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const room = getRoom(id);
  if (!room) return { title: "Room Not Found" };
  const safeImages = normalizeImageList(room.images);

  const settings = getSettings();
  return {
    title: `${room.name} | ${settings.hotelName}`,
    description: room.description.slice(0, 160),
    openGraph: {
      title: `${room.name} | ${settings.hotelName}`,
      description: room.description.slice(0, 160),
      images: safeImages,
    },
  };
}

function RoomJsonLd({ room, settings }: { room: { name: string; description: string; price: number; images: string[]; type: string; amenities: string[]; maxGuests: number }; settings: { hotelName: string; phone: string; email: string; address: string; pincode: string; mapLatitude: string; mapLongitude: string } }) {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const schema = {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    name: room.name,
    description: room.description,
    image: room.images,
    occupancy: { "@type": "QuantitativeValue", maxValue: room.maxGuests },
    amenityFeature: room.amenities.map((a) => ({ "@type": "LocationFeatureSpecification", name: a, value: true })),
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: room.price,
      url: `${SITE_URL}/booking?roomId=${room.name}`,
    },
    containedInPlace: {
      "@type": "Hotel",
      name: settings.hotelName,
      telephone: settings.phone,
      email: settings.email,
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

function Breadcrumb({ roomName }: { roomName: string }) {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Rooms & Suites", item: `${SITE_URL}/rooms` },
      { "@type": "ListItem", position: 3, name: roomName },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default async function RoomDetailPage({ params }: Props) {
  const { id } = await params;
  const room = getRoom(id);
  if (!room || !room.isAvailable) notFound();
  const safeImages = normalizeImageList(room.images);

  const settings = getSettings();

  return (
    <>
      <RoomJsonLd room={room} settings={settings} />
      <Breadcrumb roomName={room.name} />
      <Header settings={settings} />
      <main>
        <PageTransition>
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
            {/* Breadcrumb nav */}
            <nav className="mb-8 font-sans text-xs text-text-secondary">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/rooms" className="hover:text-gold transition-colors">Rooms & Suites</Link>
              <span className="mx-2">/</span>
              <span className="text-charcoal">{room.name}</span>
            </nav>

            {/* Room type + title */}
            <div className="mb-8">
              <span className="inline-block rounded-full bg-gold px-4 py-1.5 font-sans text-[11px] uppercase tracking-[0.18em] text-white">
                {room.type}
              </span>
              <h1 className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl uppercase tracking-[0.1em] text-charcoal">
                {room.name}
              </h1>
            </div>

            <div className="grid gap-10 lg:grid-cols-3">
              {/* Main content */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="font-serif text-2xl uppercase tracking-[0.1em] text-charcoal">About This Room</h2>
                  <p className="mt-4 font-sans text-sm leading-7 text-text-secondary">{room.description}</p>
                </div>

                {/* Amenities */}
                <div>
                  <h2 className="font-serif text-xl uppercase tracking-[0.1em] text-charcoal">Amenities</h2>
                  <AmenityList amenities={room.amenities} />
                </div>

                {/* Image gallery carousel */}
                {safeImages.length > 0 && (
                  <RoomImageCarousel images={safeImages} roomName={room.name} />
                )}
              </div>

              {/* Sidebar — pricing & booking */}
              <aside className="lg:col-span-1">
                <div className="sticky top-32 rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
                  <p className="font-sans text-xs uppercase tracking-[0.14em] text-text-secondary">Starting from</p>
                  <p className="mt-2 font-serif text-4xl text-charcoal">
                    &#x20B9;{room.price.toLocaleString("en-IN")}
                    <span className="font-sans text-sm text-text-secondary"> / night</span>
                  </p>
                  <div className="mt-4 space-y-3 text-sm font-sans text-text-secondary">
                    <div className="flex justify-between">
                      <span>Room Type</span>
                      <span className="text-charcoal capitalize">{room.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Max Guests</span>
                      <span className="text-charcoal">{room.maxGuests}</span>
                    </div>
                  </div>
                  <Link
                    href={`/booking?roomId=${room.id}`}
                    className="mt-6 block w-full rounded-full bg-gold py-3.5 text-center font-sans text-xs uppercase tracking-[0.18em] text-white transition hover:bg-gold-dark"
                  >
                    Book This Room
                  </Link>
                  <Link
                    href="/rooms"
                    className="mt-3 block w-full rounded-full border border-stone-200 py-3.5 text-center font-sans text-xs uppercase tracking-[0.18em] text-charcoal transition hover:border-gold hover:text-gold"
                  >
                    View All Rooms
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </PageTransition>
      </main>
      <Footer settings={settings} />
    </>
  );
}

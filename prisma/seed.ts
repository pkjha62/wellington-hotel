import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // ─── Site Settings ──────────────────────────────────────────────────────────
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      hotelName: "The Deoghar Grand",
      subtitle: "Hotel & Spa",
      phone: "+91 6432 234 567",
      email: "reservations@deogharhotel.com",
      address: "Temple Road, Near Baba Baidyanath Dham",
      city: "Deoghar, Jharkhand",
      pincode: "814112",
      heroImage: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80",
      heroVideo: "https://videos.pexels.com/video-files/3773486/3773486-hd_1920_1080_30fps.mp4",
      heroHeadline: "Where Divine Tranquility Meets Timeless Luxury",
      heroSubheadline: "in the Sacred City of Deoghar",
      introTitle: "Elegance and Serenity in the Heart of Jharkhand's Holiest City",
      introSubtitle: "A divine experience awaits you",
      introBody: "The Deoghar Grand Hotel & Spa is a premier luxury destination nestled in the sacred city of Deoghar, just steps from the revered Baba Baidyanath Dham. Blending timeless elegance with warm Indian hospitality, our hotel offers an unparalleled retreat for pilgrims, families, and discerning travellers seeking comfort, culture, and spiritual rejuvenation.",
      instagramHandle: "@thedeoghargrand",
      facebookUrl: "#",
      instagramUrl: "#",
      twitterUrl: "#",
      whatsappNumber: "+916432234567",
      metaTitle: "The Deoghar Grand Hotel & Spa | Luxury Stay in Deoghar",
      metaDescription: "Experience luxury hospitality near Baba Baidyanath Dham in Deoghar. Explore rooms, wellness, dining, events, and curated spiritual stays.",
      ogImage: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80",
      roomsHeroImage: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1920&q=80",
      diningHeroImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80",
      spaHeroImage: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80",
      eventsHeroImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=80",
      contactHeroImage: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80",
      galleryTitle: "Gallery",
      testimonialsTitle: "What Our Guests Say",
      experiencesTitle: "Curated Experiences",
      offersTitle: "Special Offers",
      newsletterTitle: "Stay Inspired",
      newsletterDescription: "Subscribe to receive exclusive offers, travel inspiration, and updates from The Deoghar Grand.",
      mapLatitude: "24.4921",
      mapLongitude: "86.6954",
      locationDescription: "Nestled in the heart of Deoghar, just steps from the sacred Baba Baidyanath Dham temple.",
    },
  });
  console.log("  ✓ Settings");

  // ─── Rooms ──────────────────────────────────────────────────────────────────
  const rooms = [
    { id: "r1", name: "Classic Comfort Room", type: "standard" as const, price: 3500, description: "A cosy, well-appointed room with modern amenities and traditional décor, perfect for solo travellers and pilgrims.", amenities: ["Free Wi-Fi", "AC", "TV", "Attached Bathroom", "Room Service"], images: ["https://images.unsplash.com/photo-1590490360182-c33d955c3a16?w=800&q=80"], maxGuests: 2 },
    { id: "r2", name: "Deluxe Heritage Room", type: "deluxe" as const, price: 5500, description: "Spacious room with heritage-inspired interiors, a king-size bed, and views of the temple precinct.", amenities: ["Free Wi-Fi", "AC", "TV", "Mini Bar", "Room Service", "Temple View", "King Bed"], images: ["https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80"], maxGuests: 3 },
    { id: "r3", name: "Premium Suite", type: "suite" as const, price: 8500, description: "An elegant suite featuring a separate living area, premium furnishings, and panoramic city views.", amenities: ["Free Wi-Fi", "AC", "TV", "Mini Bar", "Living Area", "Room Service", "City View", "Bathrobe"], images: ["https://images.unsplash.com/photo-1587985064135-0366536eab42?w=800&q=80"], maxGuests: 4 },
    { id: "r4", name: "Royal Presidential Suite", type: "premium" as const, price: 15000, description: "Our most luxurious offering — a grand suite with private terrace, jacuzzi, and bespoke butler service.", amenities: ["Free Wi-Fi", "AC", "TV", "Mini Bar", "Jacuzzi", "Private Terrace", "Butler Service", "Living & Dining Area", "King Bed"], images: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80"], maxGuests: 4 },
    { id: "r5", name: "Family Room", type: "deluxe" as const, price: 6500, description: "Extra-spacious room designed for families, with twin beds, a seating area, and child-safe amenities.", amenities: ["Free Wi-Fi", "AC", "TV", "Extra Beds", "Room Service", "Child Safe", "Seating Area"], images: ["https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80"], maxGuests: 5 },
    { id: "r6", name: "Pilgrim Standard Room", type: "standard" as const, price: 2500, description: "Clean and comfortable room ideal for devotees visiting Baba Baidyanath Dham, with essential amenities.", amenities: ["Free Wi-Fi", "AC", "TV", "Attached Bathroom", "Room Service"], images: ["https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&q=80"], maxGuests: 2 },
  ];
  for (const room of rooms) {
    await prisma.room.upsert({ where: { id: room.id }, update: {}, create: room });
  }
  console.log("  ✓ Rooms");

  // ─── Gallery ────────────────────────────────────────────────────────────────
  const gallery = [
    { id: "g1", src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80", alt: "Luxury hotel suite", category: "rooms" as const, order: 1 },
    { id: "g2", src: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80", alt: "Hotel pool and courtyard", category: "exterior" as const, order: 2 },
    { id: "g3", src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80", alt: "Fine dining restaurant", category: "dining" as const, order: 3 },
    { id: "g4", src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80", alt: "Hotel exterior at dusk", category: "exterior" as const, order: 4 },
    { id: "g5", src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80", alt: "Spa wellness area", category: "spa" as const, order: 5 },
    { id: "g6", src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80", alt: "Grand lobby with chandelier", category: "exterior" as const, order: 6 },
  ];
  for (const img of gallery) {
    await prisma.galleryImage.upsert({ where: { id: img.id }, update: {}, create: img });
  }
  console.log("  ✓ Gallery");

  // ─── Testimonials ───────────────────────────────────────────────────────────
  const testimonials = [
    { id: "t1", guestName: "Sunita Devi", location: "Patna, Bihar", rating: 5, comment: "Absolutely wonderful stay! The hotel is beautifully maintained and the staff made our pilgrimage trip so comfortable.", approved: true },
    { id: "t2", guestName: "Vikram Singh", location: "New Delhi", rating: 5, comment: "World-class hospitality in Deoghar. The rooms are spacious, food is excellent, and the spa is incredibly relaxing.", approved: true },
    { id: "t3", guestName: "Meera Joshi", location: "Mumbai, Maharashtra", rating: 4, comment: "Great location near Baidyanath temple. The family room was perfect for us with two kids.", approved: true },
    { id: "t4", guestName: "Anand Tiwari", location: "Ranchi, Jharkhand", rating: 5, comment: "Best hotel in Deoghar without a doubt. The food quality is outstanding and the wellness centre helped me truly unwind.", approved: false },
  ];
  for (const t of testimonials) {
    await prisma.testimonial.upsert({ where: { id: t.id }, update: {}, create: t });
  }
  console.log("  ✓ Testimonials");

  // ─── Offerings ──────────────────────────────────────────────────────────────
  const offerings = [
    { id: "o1", title: "Rooms and Suites", subtitle: "Dreamlike rest", description: "Choose from our collection of elegantly appointed rooms and suites, each thoughtfully designed with a blend of traditional Jharkhandi aesthetics and modern luxury.", image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80", imageAlt: "Luxury hotel room with elegant furnishings", order: 1, visible: true },
    { id: "o2", title: "Cuisine", subtitle: "Authentic flavours, crafted with love", description: "Savour exquisite North Indian and Jharkhandi cuisine prepared by our master chefs.", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80", imageAlt: "Fine dining with Indian cuisine", order: 2, visible: true },
    { id: "o3", title: "Events and Celebrations", subtitle: "Grand occasions, flawless execution", description: "From sacred ceremonies and grand weddings to corporate conferences and private banquets.", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80", imageAlt: "Elegant event hall with luxurious decoration", order: 3, visible: true },
    { id: "o4", title: "Spa & Wellness", subtitle: "Rejuvenate body and soul", description: "Unwind at Shanti Wellness Centre, our tranquil urban retreat.", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80", imageAlt: "Spa and wellness area", order: 4, visible: true },
  ];
  for (const o of offerings) {
    await prisma.offering.upsert({ where: { id: o.id }, update: {}, create: o });
  }
  console.log("  ✓ Offerings");

  // ─── Experiences ────────────────────────────────────────────────────────────
  const experiences = [
    { id: "e1", title: "Pilgrimage Experience", description: "Guided visits to Baba Baidyanath Dham, Basukinath, and nearby sacred sites.", image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80", price: 2500, visible: true },
    { id: "e2", title: "Cultural Heritage Tour", description: "Explore Trikut Hill, Nandan Pahar, Tapovan, and Satsang Ashram.", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80", price: 3000, visible: true },
    { id: "e3", title: "Family Spiritual Retreat", description: "A holistic family package combining temple visits, nature excursions, yoga sessions, and kid-friendly activities.", image: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=800&q=80", price: 5000, visible: true },
  ];
  for (const e of experiences) {
    await prisma.experience.upsert({ where: { id: e.id }, update: {}, create: e });
  }
  console.log("  ✓ Experiences");

  // ─── Announcements ──────────────────────────────────────────────────────────
  await prisma.announcement.upsert({
    where: { id: "a1" },
    update: {},
    create: { id: "a1", text: "Shravan season reservations are now open with temple-transfer packages.", type: "offer", active: true, startDate: new Date("2026-05-01"), endDate: new Date("2026-08-31") },
  });
  await prisma.announcement.upsert({
    where: { id: "a2" },
    update: {},
    create: { id: "a2", text: "Live devotional music every Saturday evening in the courtyard lounge.", type: "event", active: true, startDate: new Date("2026-01-01"), endDate: new Date("2026-12-31") },
  });
  console.log("  ✓ Announcements");

  // ─── FAQs ──────────────────────────────────────────────────────────────────
  const faqs = [
    { id: "faq1", question: "What are the check-in and check-out times?", answer: "Check-in is at 2:00 PM and check-out is at 12:00 noon. Early check-in and late check-out are available upon request.", category: "general" as const, order: 1, visible: true },
    { id: "faq2", question: "Is the hotel near Baba Baidyanath Dham?", answer: "Yes, The Deoghar Grand is located on Temple Road, just a 5-minute walk from Baba Baidyanath Dham.", category: "general" as const, order: 2, visible: true },
    { id: "faq3", question: "Do you provide airport or railway station transfers?", answer: "Yes, we provide paid transfers from Jasidih Junction railway station and Deoghar Airport.", category: "transport" as const, order: 3, visible: true },
    { id: "faq4", question: "What is the cancellation policy?", answer: "Free cancellation up to 48 hours before check-in. Cancellations within 48 hours will be charged one night's stay.", category: "bookings" as const, order: 4, visible: true },
    { id: "faq5", question: "Is parking available?", answer: "Yes, complimentary valet parking is available for all guests.", category: "general" as const, order: 5, visible: true },
  ];
  for (const f of faqs) {
    await prisma.fAQ.upsert({ where: { id: f.id }, update: {}, create: f });
  }
  console.log("  ✓ FAQs");

  // ─── Special Offers ─────────────────────────────────────────────────────────
  await prisma.specialOffer.upsert({
    where: { id: "so1" },
    update: {},
    create: { id: "so1", title: "Shravan Special Package", description: "3 nights stay with VIP darshan assistance, guided temple tour, and complimentary breakfast.", price: 12000, image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80", validFrom: new Date("2026-07-01"), validTo: new Date("2026-08-31"), visible: true },
  });
  await prisma.specialOffer.upsert({
    where: { id: "so2" },
    update: {},
    create: { id: "so2", title: "Weekend Wellness Retreat", description: "2 nights with full spa access, Ayurvedic consultation, yoga sessions, and gourmet dining experience.", price: 18000, image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80", validFrom: new Date("2026-01-01"), validTo: new Date("2026-12-31"), visible: true },
  });
  console.log("  ✓ Special Offers");

  // ─── Stat Facts ─────────────────────────────────────────────────────────────
  const statFacts = [
    { id: "sf1", label: "Luxury Rooms", value: 85, suffix: "+", order: 1, visible: true },
    { id: "sf2", label: "Years of Hospitality", value: 15, suffix: "+", order: 2, visible: true },
    { id: "sf3", label: "Happy Guests", value: 12000, suffix: "+", order: 3, visible: true },
    { id: "sf4", label: "Guest Rating", value: 4.8, suffix: "★", order: 4, visible: true },
  ];
  for (const s of statFacts) {
    await prisma.statFact.upsert({ where: { id: s.id }, update: {}, create: s });
  }
  console.log("  ✓ Stat Facts");

  // ─── Dining Venues ──────────────────────────────────────────────────────────
  const diningVenues = [
    { id: "dv1", name: "Annapurna — Multi-Cuisine Restaurant", cuisine: "Multi-Cuisine", description: "Our flagship restaurant serves an extensive breakfast, lunch, and dinner buffet.", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80", hours: "7:00 AM – 10:30 PM", order: 1, visible: true },
    { id: "dv2", name: "Prasad — Pure Vegetarian Kitchen", cuisine: "Vegetarian", description: "A dedicated pure vegetarian restaurant offering traditional thalis and sattvic meals.", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80", hours: "6:30 AM – 9:30 PM", order: 2, visible: true },
    { id: "dv3", name: "Courtyard Lounge & Café", cuisine: "Café & Lounge", description: "An open-air lounge perfect for chai, fresh juices, pastries, and light bites.", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80", hours: "10:00 AM – 11:00 PM", order: 3, visible: true },
    { id: "dv4", name: "Private Dining & Banquets", cuisine: "Custom Menu", description: "Host intimate dinners, celebrations, or corporate meals in our private dining rooms.", image: "https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=800&q=80", hours: "By reservation", order: 4, visible: true },
  ];
  for (const d of diningVenues) {
    await prisma.diningVenue.upsert({ where: { id: d.id }, update: {}, create: d });
  }
  console.log("  ✓ Dining Venues");

  // ─── Spa Services ───────────────────────────────────────────────────────────
  const spaServices = [
    { id: "sp1", name: "Ayurvedic Treatments", category: "Traditional", description: "Traditional Ayurvedic therapies including Abhyanga, Shirodhara, and Panchakarma.", duration: "60 – 120 min", price: 3500, image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80", order: 1, visible: true },
    { id: "sp2", name: "Deep Tissue & Swedish Massage", category: "Massage", description: "Expert therapeutic massage to relieve tension and promote deep relaxation.", duration: "45 – 90 min", price: 2500, image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80", order: 2, visible: true },
    { id: "sp3", name: "Yoga & Meditation", category: "Wellness", description: "Daily guided yoga sessions at dawn in our rooftop studio.", duration: "60 min sessions", price: 800, image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80", order: 3, visible: true },
    { id: "sp4", name: "Fitness Centre", category: "Fitness", description: "Fully equipped modern gym with cardio machines and free weights.", duration: "Open daily", price: 0, image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80", order: 4, visible: true },
    { id: "sp5", name: "Herbal Steam & Sauna", category: "Detox", description: "Detoxify and unwind with our herb-infused steam room and dry sauna.", duration: "30 min", price: 1200, image: "https://images.unsplash.com/photo-1540555700478-4be289fbec6b?w=800&q=80", order: 5, visible: true },
    { id: "sp6", name: "Beauty & Grooming", category: "Salon", description: "Full-service salon offering facials, manicures, pedicures, and bridal packages.", duration: "30 – 180 min", price: 1500, image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80", order: 6, visible: true },
  ];
  for (const s of spaServices) {
    await prisma.spaService.upsert({ where: { id: s.id }, update: {}, create: s });
  }
  console.log("  ✓ Spa Services");

  // ─── Event Venues ───────────────────────────────────────────────────────────
  const eventVenues = [
    { id: "ev1", name: "Grand Ballroom", capacity: "Up to 500 guests", description: "Our largest venue features crystal chandeliers, a built-in stage, and state-of-the-art AV equipment.", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80", features: ["Crystal Chandeliers", "Built-in Stage", "AV Equipment", "Pre-function Area"], order: 1, visible: true },
    { id: "ev2", name: "Divya Banquet Hall", capacity: "Up to 200 guests", description: "An elegant mid-size banquet hall ideal for engagement ceremonies and celebrations.", image: "https://images.unsplash.com/photo-1540575467063-178a50c8e9a9?w=800&q=80", features: ["Full Catering", "Decor Services", "Sound System", "Staging"], order: 2, visible: true },
    { id: "ev3", name: "Conference Centre", capacity: "Up to 100 guests", description: "Equipped with projector, podium, high-speed Wi-Fi, and flexible seating layouts.", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", features: ["Projector", "Podium", "High-speed Wi-Fi", "Flexible Seating"], order: 3, visible: true },
    { id: "ev4", name: "Courtyard Garden", capacity: "Up to 150 guests", description: "An open-air venue surrounded by manicured gardens and soft lighting.", image: "https://images.unsplash.com/photo-1510076857177-7470076d4098?w=800&q=80", features: ["Garden Setting", "Soft Lighting", "Open Air", "Power & PA"], order: 4, visible: true },
  ];
  for (const e of eventVenues) {
    await prisma.eventVenue.upsert({ where: { id: e.id }, update: {}, create: e });
  }
  console.log("  ✓ Event Venues");

  // ─── Subscribers ────────────────────────────────────────────────────────────
  const subscribers = [
    { id: "s1", name: "Rahul Sharma", email: "rahul@example.com" },
    { id: "s2", name: "Kavita Kumari", email: "kavita@example.com" },
  ];
  for (const s of subscribers) {
    await prisma.subscriber.upsert({ where: { id: s.id }, update: {}, create: s });
  }
  console.log("  ✓ Subscribers");

  console.log("\nSeeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

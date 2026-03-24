/**
 * In-memory data store with seed data.
 * Works on all platforms including Vercel serverless.
 * Data resets on cold-start (suitable for demo/portfolio).
 */
import type {
  Room, Booking, GalleryImage, Testimonial,
  Offering, Experience, Subscriber, SiteSettings,
  Announcement, FAQ, SpecialOffer, StatFact,
  DiningVenue, SpaService, EventVenue, ContactEnquiry,
} from "@/types";

function genId() {
  return Math.random().toString(36).substring(2, 10);
}

// ─── Seed Data ───────────────────────────────────────────────────────────────

let settings: SiteSettings = {
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
};

let rooms: Room[] = [
  { id: "r1", name: "Classic Comfort Room", type: "standard", price: 3500, description: "A cosy, well-appointed room with modern amenities and traditional décor, perfect for solo travellers and pilgrims.", amenities: ["Free Wi-Fi","AC","TV","Attached Bathroom","Room Service"], images: ["https://images.unsplash.com/photo-1590490360182-c33d955c3a16?w=800&q=80"], maxGuests: 2, isAvailable: true, createdAt: "2026-01-01" },
  { id: "r2", name: "Deluxe Heritage Room", type: "deluxe", price: 5500, description: "Spacious room with heritage-inspired interiors, a king-size bed, and views of the temple precinct.", amenities: ["Free Wi-Fi","AC","TV","Mini Bar","Room Service","Temple View","King Bed"], images: ["https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80"], maxGuests: 3, isAvailable: true, createdAt: "2026-01-01" },
  { id: "r3", name: "Premium Suite", type: "suite", price: 8500, description: "An elegant suite featuring a separate living area, premium furnishings, and panoramic city views.", amenities: ["Free Wi-Fi","AC","TV","Mini Bar","Living Area","Room Service","City View","Bathrobe"], images: ["https://images.unsplash.com/photo-1587985064135-0366536eab42?w=800&q=80"], maxGuests: 4, isAvailable: true, createdAt: "2026-01-01" },
  { id: "r4", name: "Royal Presidential Suite", type: "premium", price: 15000, description: "Our most luxurious offering — a grand suite with private terrace, jacuzzi, and bespoke butler service.", amenities: ["Free Wi-Fi","AC","TV","Mini Bar","Jacuzzi","Private Terrace","Butler Service","Living & Dining Area","King Bed"], images: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80"], maxGuests: 4, isAvailable: true, createdAt: "2026-01-01" },
  { id: "r5", name: "Family Room", type: "deluxe", price: 6500, description: "Extra-spacious room designed for families, with twin beds, a seating area, and child-safe amenities.", amenities: ["Free Wi-Fi","AC","TV","Extra Beds","Room Service","Child Safe","Seating Area"], images: ["https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80"], maxGuests: 5, isAvailable: true, createdAt: "2026-01-01" },
  { id: "r6", name: "Pilgrim Standard Room", type: "standard", price: 2500, description: "Clean and comfortable room ideal for devotees visiting Baba Baidyanath Dham, with essential amenities.", amenities: ["Free Wi-Fi","AC","TV","Attached Bathroom","Room Service"], images: ["https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&q=80"], maxGuests: 2, isAvailable: true, createdAt: "2026-01-01" },
];

let bookings: Booking[] = [
  { id: "b1", guestName: "Rajesh Kumar", guestEmail: "rajesh@example.com", guestPhone: "+91 98765 43210", roomId: "r2", roomName: "Deluxe Heritage Room", checkIn: "2026-03-25", checkOut: "2026-03-28", guests: 2, status: "confirmed", totalAmount: 16500, createdAt: "2026-03-20" },
  { id: "b2", guestName: "Priya Sharma", guestEmail: "priya@example.com", guestPhone: "+91 87654 32100", roomId: "r3", roomName: "Premium Suite", checkIn: "2026-03-22", checkOut: "2026-03-24", guests: 3, status: "checked-in", totalAmount: 17000, createdAt: "2026-03-18" },
  { id: "b3", guestName: "Amit Patel", guestEmail: "amit@example.com", guestPhone: "+91 76543 21098", roomId: "r1", roomName: "Classic Comfort Room", checkIn: "2026-03-15", checkOut: "2026-03-17", guests: 1, status: "checked-out", totalAmount: 7000, createdAt: "2026-03-10" },
];

let gallery: GalleryImage[] = [
  { id: "g1", src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80", alt: "Luxury hotel suite", category: "rooms", order: 1 },
  { id: "g2", src: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80", alt: "Hotel pool and courtyard", category: "exterior", order: 2 },
  { id: "g3", src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80", alt: "Fine dining restaurant", category: "dining", order: 3 },
  { id: "g4", src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80", alt: "Hotel exterior at dusk", category: "exterior", order: 4 },
  { id: "g5", src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80", alt: "Spa wellness area", category: "spa", order: 5 },
  { id: "g6", src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80", alt: "Grand lobby with chandelier", category: "exterior", order: 6 },
];

let testimonials: Testimonial[] = [
  { id: "t1", guestName: "Sunita Devi", location: "Patna, Bihar", rating: 5, comment: "Absolutely wonderful stay! The hotel is beautifully maintained and the staff made our pilgrimage trip so comfortable. The temple is just a short walk away.", approved: true, createdAt: "2026-02-15" },
  { id: "t2", guestName: "Vikram Singh", location: "New Delhi", rating: 5, comment: "World-class hospitality in Deoghar. The rooms are spacious, food is excellent, and the spa is incredibly relaxing after a long day of sightseeing.", approved: true, createdAt: "2026-02-20" },
  { id: "t3", guestName: "Meera Joshi", location: "Mumbai, Maharashtra", rating: 4, comment: "Great location near Baidyanath temple. The family room was perfect for us with two kids. Will definitely return during Shravan.", approved: true, createdAt: "2026-03-01" },
  { id: "t4", guestName: "Anand Tiwari", location: "Ranchi, Jharkhand", rating: 5, comment: "Best hotel in Deoghar without a doubt. The food quality is outstanding and the wellness centre helped me truly unwind.", approved: false, createdAt: "2026-03-10" },
];

let offerings: Offering[] = [
  { id: "o1", title: "Rooms and Suites", subtitle: "Dreamlike rest", description: "Choose from our collection of elegantly appointed rooms and suites, each thoughtfully designed with a blend of traditional Jharkhandi aesthetics and modern luxury. From cosy pilgrim rooms to grand presidential suites, every stay is an experience.", image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80", imageAlt: "Luxury hotel room with elegant furnishings", order: 1, visible: true },
  { id: "o2", title: "Cuisine", subtitle: "Authentic flavours, crafted with love", description: "Savour exquisite North Indian and Jharkhandi cuisine prepared by our master chefs. From pure vegetarian thalis for devotees to a lavish multi-cuisine buffet, every meal at The Deoghar Grand is a celebration of regional flavours.", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80", imageAlt: "Fine dining with Indian cuisine", order: 2, visible: true },
  { id: "o3", title: "Events and Celebrations", subtitle: "Grand occasions, flawless execution", description: "From sacred ceremonies and grand weddings to corporate conferences and private banquets, our Grand Ballroom and banquet halls provide the perfect setting. Our dedicated events team ensures every detail is impeccable.", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80", imageAlt: "Elegant event hall with luxurious decoration", order: 3, visible: true },
  { id: "o4", title: "Spa & Wellness", subtitle: "Rejuvenate body and soul", description: "Unwind at Shanti Wellness Centre, our tranquil urban retreat. Enjoy Ayurvedic treatments, modern spa therapies, a fully equipped fitness centre, and yoga sessions — all designed to restore your inner balance.", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80", imageAlt: "Spa and wellness area", order: 4, visible: true },
];

let experiences: Experience[] = [
  { id: "e1", title: "Pilgrimage Experience", description: "Guided visits to Baba Baidyanath Dham, Basukinath, and nearby sacred sites. Includes VIP darshan assistance, prasad arrangements, and spiritual counselling.", image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80", price: 2500, visible: true },
  { id: "e2", title: "Cultural Heritage Tour", description: "Explore Trikut Hill, Nandan Pahar, Tapovan, and Satsang Ashram. Discover the rich cultural heritage of Deoghar with our expert local guides.", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80", price: 3000, visible: true },
  { id: "e3", title: "Family Spiritual Retreat", description: "A holistic family package combining temple visits, nature excursions, yoga sessions, and kid-friendly activities. Create lasting memories in the lap of spirituality.", image: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=800&q=80", price: 5000, visible: true },
];

let subscribers: Subscriber[] = [
  { id: "s1", name: "Rahul Sharma", email: "rahul@example.com", subscribedAt: "2026-02-01" },
  { id: "s2", name: "Kavita Kumari", email: "kavita@example.com", subscribedAt: "2026-02-15" },
];

let announcements: Announcement[] = [
  { id: "a1", text: "Shravan season reservations are now open with temple-transfer packages.", type: "offer", active: true, startDate: "2026-05-01", endDate: "2026-08-31" },
  { id: "a2", text: "Live devotional music every Saturday evening in the courtyard lounge.", type: "event", active: true, startDate: "2026-01-01", endDate: "2026-12-31" },
];

let faqs: FAQ[] = [
  { id: "faq1", question: "What are the check-in and check-out times?", answer: "Check-in is at 2:00 PM and check-out is at 12:00 noon. Early check-in and late check-out are available upon request and subject to availability.", category: "general", order: 1, visible: true },
  { id: "faq2", question: "Is the hotel near Baba Baidyanath Dham?", answer: "Yes, The Deoghar Grand is located on Temple Road, just a 5-minute walk from Baba Baidyanath Dham.", category: "location", order: 2, visible: true },
  { id: "faq3", question: "Do you provide airport or railway station transfers?", answer: "Yes, we provide paid transfers from Jasidih Junction railway station and Deoghar Airport. Please contact reception to arrange.", category: "transport", order: 3, visible: true },
  { id: "faq4", question: "What is the cancellation policy?", answer: "Free cancellation up to 48 hours before check-in. Cancellations within 48 hours will be charged one night's stay.", category: "booking", order: 4, visible: true },
  { id: "faq5", question: "Is parking available?", answer: "Yes, complimentary valet parking is available for all guests.", category: "general", order: 5, visible: true },
];

let specialOffers: SpecialOffer[] = [
  { id: "so1", title: "Shravan Special Package", description: "3 nights stay with VIP darshan assistance, guided temple tour, and complimentary breakfast. Perfect for devotees visiting during the holy month.", price: 12000, image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80", validFrom: "2026-07-01", validTo: "2026-08-31", visible: true },
  { id: "so2", title: "Weekend Wellness Retreat", description: "2 nights with full spa access, Ayurvedic consultation, yoga sessions, and gourmet dining experience.", price: 18000, image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80", validFrom: "2026-01-01", validTo: "2026-12-31", visible: true },
];

let statFacts: StatFact[] = [
  { id: "sf1", label: "Luxury Rooms", value: 85, suffix: "+", order: 1, visible: true },
  { id: "sf2", label: "Years of Hospitality", value: 15, suffix: "+", order: 2, visible: true },
  { id: "sf3", label: "Happy Guests", value: 12000, suffix: "+", order: 3, visible: true },
  { id: "sf4", label: "Guest Rating", value: 4.8, suffix: "★", order: 4, visible: true },
];

// ─── Settings ────────────────────────────────────────────────────────────────

export function getSettings(): SiteSettings {
  return settings;
}
export function updateSettings(data: Partial<SiteSettings>): SiteSettings {
  settings = { ...settings, ...data };
  return settings;
}

// ─── Rooms ───────────────────────────────────────────────────────────────────

export function getRooms(): Room[] {
  return [...rooms];
}
export function getRoom(id: string): Room | undefined {
  return rooms.find((r) => r.id === id);
}
export function addRoom(data: Omit<Room, "id" | "createdAt">): Room {
  const room: Room = { ...data, id: genId(), createdAt: new Date().toISOString().split("T")[0] };
  rooms.push(room);
  return room;
}
export function updateRoom(id: string, data: Partial<Room>): Room | null {
  const idx = rooms.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  rooms[idx] = { ...rooms[idx], ...data };
  return rooms[idx];
}
export function deleteRoom(id: string): boolean {
  const len = rooms.length;
  rooms = rooms.filter((r) => r.id !== id);
  return rooms.length < len;
}

// ─── Bookings ────────────────────────────────────────────────────────────────

export function getBookings(): Booking[] {
  return [...bookings].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
export function getBooking(id: string): Booking | undefined {
  return bookings.find((b) => b.id === id);
}
export function addBooking(data: Omit<Booking, "id" | "createdAt">): Booking {
  const booking: Booking = { ...data, id: genId(), createdAt: new Date().toISOString().split("T")[0] };
  bookings.push(booking);
  return booking;
}
export function updateBooking(id: string, data: Partial<Booking>): Booking | null {
  const idx = bookings.findIndex((b) => b.id === id);
  if (idx === -1) return null;
  bookings[idx] = { ...bookings[idx], ...data };
  return bookings[idx];
}
export function deleteBooking(id: string): boolean {
  const len = bookings.length;
  bookings = bookings.filter((b) => b.id !== id);
  return bookings.length < len;
}

// ─── Gallery ─────────────────────────────────────────────────────────────────

export function getGallery(): GalleryImage[] {
  return [...gallery].sort((a, b) => a.order - b.order);
}
export function addGalleryImage(data: Omit<GalleryImage, "id">): GalleryImage {
  const img: GalleryImage = { ...data, id: genId() };
  gallery.push(img);
  return img;
}
export function updateGalleryImage(id: string, data: Partial<GalleryImage>): GalleryImage | null {
  const idx = gallery.findIndex((g) => g.id === id);
  if (idx === -1) return null;
  gallery[idx] = { ...gallery[idx], ...data };
  return gallery[idx];
}
export function deleteGalleryImage(id: string): boolean {
  const len = gallery.length;
  gallery = gallery.filter((g) => g.id !== id);
  return gallery.length < len;
}

// ─── Testimonials ────────────────────────────────────────────────────────────

export function getTestimonials(onlyApproved = false): Testimonial[] {
  const list = onlyApproved ? testimonials.filter((t) => t.approved) : [...testimonials];
  return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
export function addTestimonial(data: Omit<Testimonial, "id" | "createdAt">): Testimonial {
  const t: Testimonial = { ...data, id: genId(), createdAt: new Date().toISOString().split("T")[0] };
  testimonials.push(t);
  return t;
}
export function updateTestimonial(id: string, data: Partial<Testimonial>): Testimonial | null {
  const idx = testimonials.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  testimonials[idx] = { ...testimonials[idx], ...data };
  return testimonials[idx];
}
export function deleteTestimonial(id: string): boolean {
  const len = testimonials.length;
  testimonials = testimonials.filter((t) => t.id !== id);
  return testimonials.length < len;
}

// ─── Offerings ───────────────────────────────────────────────────────────────

export function getOfferings(onlyVisible = false): Offering[] {
  const list = onlyVisible ? offerings.filter((o) => o.visible) : [...offerings];
  return list.sort((a, b) => a.order - b.order);
}
export function addOffering(data: Omit<Offering, "id">): Offering {
  const o: Offering = { ...data, id: genId() };
  offerings.push(o);
  return o;
}
export function updateOffering(id: string, data: Partial<Offering>): Offering | null {
  const idx = offerings.findIndex((o) => o.id === id);
  if (idx === -1) return null;
  offerings[idx] = { ...offerings[idx], ...data };
  return offerings[idx];
}
export function deleteOffering(id: string): boolean {
  const len = offerings.length;
  offerings = offerings.filter((o) => o.id !== id);
  return offerings.length < len;
}

// ─── Experiences ─────────────────────────────────────────────────────────────

export function getExperiences(onlyVisible = false): Experience[] {
  return onlyVisible ? experiences.filter((e) => e.visible) : [...experiences];
}
export function addExperience(data: Omit<Experience, "id">): Experience {
  const e: Experience = { ...data, id: genId() };
  experiences.push(e);
  return e;
}
export function updateExperience(id: string, data: Partial<Experience>): Experience | null {
  const idx = experiences.findIndex((e) => e.id === id);
  if (idx === -1) return null;
  experiences[idx] = { ...experiences[idx], ...data };
  return experiences[idx];
}
export function deleteExperience(id: string): boolean {
  const len = experiences.length;
  experiences = experiences.filter((e) => e.id !== id);
  return experiences.length < len;
}

// ─── Subscribers ─────────────────────────────────────────────────────────────

export function getSubscribers(): Subscriber[] {
  return [...subscribers].sort((a, b) => b.subscribedAt.localeCompare(a.subscribedAt));
}
export function addSubscriber(data: Omit<Subscriber, "id" | "subscribedAt">): Subscriber | null {
  if (subscribers.some((s) => s.email === data.email)) return null;
  const s: Subscriber = { ...data, id: genId(), subscribedAt: new Date().toISOString().split("T")[0] };
  subscribers.push(s);
  return s;
}
export function deleteSubscriber(id: string): boolean {
  const len = subscribers.length;
  subscribers = subscribers.filter((s) => s.id !== id);
  return subscribers.length < len;
}

// ─── Announcements ───────────────────────────────────────────────────────────

export function getAnnouncements(onlyActive = false): Announcement[] {
  const list = onlyActive ? announcements.filter((a) => a.active) : [...announcements];
  return list.sort((a, b) => a.startDate.localeCompare(b.startDate));
}
export function addAnnouncement(data: Omit<Announcement, "id">): Announcement {
  const a: Announcement = { ...data, id: genId() };
  announcements.push(a);
  return a;
}
export function updateAnnouncement(id: string, data: Partial<Announcement>): Announcement | null {
  const idx = announcements.findIndex((a) => a.id === id);
  if (idx === -1) return null;
  announcements[idx] = { ...announcements[idx], ...data };
  return announcements[idx];
}
export function deleteAnnouncement(id: string): boolean {
  const len = announcements.length;
  announcements = announcements.filter((a) => a.id !== id);
  return announcements.length < len;
}

// ─── Stats ───────────────────────────────────────────────────────────────────

export function getStats() {
  const totalRooms = rooms.length;
  const availableRooms = rooms.filter((r) => r.isAvailable).length;
  const totalBookings = bookings.length;
  const activeBookings = bookings.filter((b) => b.status === "confirmed" || b.status === "checked-in").length;
  const totalRevenue = bookings.filter((b) => b.status !== "cancelled").reduce((sum, b) => sum + b.totalAmount, 0);
  const totalTestimonials = testimonials.filter((t) => t.approved).length;
  const pendingTestimonials = testimonials.filter((t) => !t.approved).length;
  const totalSubscribers = subscribers.length;
  const activeAnnouncements = announcements.filter((a) => a.active).length;

  return {
    totalRooms,
    availableRooms,
    totalBookings,
    activeBookings,
    totalRevenue,
    totalTestimonials,
    pendingTestimonials,
    totalSubscribers,
    activeAnnouncements,
  };
}

// ─── FAQs ────────────────────────────────────────────────────────────────────

export function getFAQs(onlyVisible = false): FAQ[] {
  const list = onlyVisible ? faqs.filter((f) => f.visible) : [...faqs];
  return list.sort((a, b) => a.order - b.order);
}
export function addFAQ(data: Omit<FAQ, "id">): FAQ {
  const f: FAQ = { ...data, id: genId() };
  faqs.push(f);
  return f;
}
export function updateFAQ(id: string, data: Partial<FAQ>): FAQ | null {
  const idx = faqs.findIndex((f) => f.id === id);
  if (idx === -1) return null;
  faqs[idx] = { ...faqs[idx], ...data };
  return faqs[idx];
}
export function deleteFAQ(id: string): boolean {
  const len = faqs.length;
  faqs = faqs.filter((f) => f.id !== id);
  return faqs.length < len;
}

// ─── Special Offers ──────────────────────────────────────────────────────────

export function getSpecialOffers(onlyVisible = false): SpecialOffer[] {
  const list = onlyVisible ? specialOffers.filter((o) => o.visible) : [...specialOffers];
  return list.sort((a, b) => a.validFrom.localeCompare(b.validFrom));
}
export function addSpecialOffer(data: Omit<SpecialOffer, "id">): SpecialOffer {
  const o: SpecialOffer = { ...data, id: genId() };
  specialOffers.push(o);
  return o;
}
export function updateSpecialOffer(id: string, data: Partial<SpecialOffer>): SpecialOffer | null {
  const idx = specialOffers.findIndex((o) => o.id === id);
  if (idx === -1) return null;
  specialOffers[idx] = { ...specialOffers[idx], ...data };
  return specialOffers[idx];
}
export function deleteSpecialOffer(id: string): boolean {
  const len = specialOffers.length;
  specialOffers = specialOffers.filter((o) => o.id !== id);
  return specialOffers.length < len;
}

// ─── Stat Facts ──────────────────────────────────────────────────────────────

export function getStatFacts(onlyVisible = false): StatFact[] {
  const list = onlyVisible ? statFacts.filter((s) => s.visible) : [...statFacts];
  return list.sort((a, b) => a.order - b.order);
}
export function addStatFact(data: Omit<StatFact, "id">): StatFact {
  const s: StatFact = { ...data, id: genId() };
  statFacts.push(s);
  return s;
}
export function updateStatFact(id: string, data: Partial<StatFact>): StatFact | null {
  const idx = statFacts.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  statFacts[idx] = { ...statFacts[idx], ...data };
  return statFacts[idx];
}
export function deleteStatFact(id: string): boolean {
  const len = statFacts.length;
  statFacts = statFacts.filter((s) => s.id !== id);
  return statFacts.length < len;
}

// ─── Admin Password ──────────────────────────────────────────────────────────

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "admin@123";
}
export function getAdminUsername(): string {
  return process.env.ADMIN_USERNAME || "admin";
}

// ─── Dining Venues ───────────────────────────────────────────────────────────

let diningVenues: DiningVenue[] = [
  { id: "dv1", name: "Annapurna — Multi-Cuisine Restaurant", cuisine: "Multi-Cuisine", description: "Our flagship restaurant serves an extensive breakfast, lunch, and dinner buffet featuring North Indian, Jharkhandi, and continental cuisine. Enjoy the finest vegetarian and non-vegetarian dishes prepared by our master chefs.", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80", hours: "7:00 AM – 10:30 PM", order: 1, visible: true },
  { id: "dv2", name: "Prasad — Pure Vegetarian Kitchen", cuisine: "Vegetarian", description: "A dedicated pure vegetarian restaurant offering traditional thalis, sattvic meals, and regional specialities. Ideal for devotees observing dietary customs during their pilgrimage.", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80", hours: "6:30 AM – 9:30 PM", order: 2, visible: true },
  { id: "dv3", name: "Courtyard Lounge & Café", cuisine: "Café & Lounge", description: "An open-air lounge perfect for chai, fresh juices, pastries, and light bites. Live devotional music on Saturday evenings transforms this space into a tranquil cultural gathering.", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80", hours: "10:00 AM – 11:00 PM", order: 3, visible: true },
  { id: "dv4", name: "Private Dining & Banquets", cuisine: "Custom Menu", description: "Host intimate dinners, celebrations, or corporate meals in our private dining rooms. Customised menus, dedicated service, and elegant ambience for up to 40 guests.", image: "https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=800&q=80", hours: "By reservation", order: 4, visible: true },
];

export function getDiningVenues(onlyVisible = false): DiningVenue[] {
  const list = onlyVisible ? diningVenues.filter((d) => d.visible) : [...diningVenues];
  return list.sort((a, b) => a.order - b.order);
}
export function addDiningVenue(data: Omit<DiningVenue, "id">): DiningVenue {
  const d: DiningVenue = { ...data, id: genId() };
  diningVenues.push(d);
  return d;
}
export function updateDiningVenue(id: string, data: Partial<DiningVenue>): DiningVenue | null {
  const idx = diningVenues.findIndex((d) => d.id === id);
  if (idx === -1) return null;
  diningVenues[idx] = { ...diningVenues[idx], ...data };
  return diningVenues[idx];
}
export function deleteDiningVenue(id: string): boolean {
  const len = diningVenues.length;
  diningVenues = diningVenues.filter((d) => d.id !== id);
  return diningVenues.length < len;
}

// ─── Spa Services ────────────────────────────────────────────────────────────

let spaServices: SpaService[] = [
  { id: "sp1", name: "Ayurvedic Treatments", category: "Traditional", description: "Traditional Ayurvedic therapies including Abhyanga, Shirodhara, and Panchakarma administered by certified practitioners. Restore your doshas and achieve holistic balance.", duration: "60 – 120 min", price: 3500, image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80", order: 1, visible: true },
  { id: "sp2", name: "Deep Tissue & Swedish Massage", category: "Massage", description: "Expert therapeutic massage to relieve tension, improve circulation, and promote deep relaxation after your pilgrimage or travel.", duration: "45 – 90 min", price: 2500, image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80", order: 2, visible: true },
  { id: "sp3", name: "Yoga & Meditation", category: "Wellness", description: "Daily guided yoga sessions at dawn in our rooftop studio. Meditation workshops available for individuals and groups.", duration: "60 min sessions", price: 800, image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80", order: 3, visible: true },
  { id: "sp4", name: "Fitness Centre", category: "Fitness", description: "Fully equipped modern gym with cardio machines, free weights, and personal training on request. Open 6 AM to 10 PM.", duration: "Open daily", price: 0, image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80", order: 4, visible: true },
  { id: "sp5", name: "Herbal Steam & Sauna", category: "Detox", description: "Detoxify and unwind with our herb-infused steam room and dry sauna. Complimentary for spa package guests.", duration: "30 min", price: 1200, image: "https://images.unsplash.com/photo-1540555700478-4be289fbec6b?w=800&q=80", order: 5, visible: true },
  { id: "sp6", name: "Beauty & Grooming", category: "Salon", description: "Full-service salon offering facials, manicures, pedicures, and bridal packages with premium organic products.", duration: "30 – 180 min", price: 1500, image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80", order: 6, visible: true },
];

export function getSpaServices(onlyVisible = false): SpaService[] {
  const list = onlyVisible ? spaServices.filter((s) => s.visible) : [...spaServices];
  return list.sort((a, b) => a.order - b.order);
}
export function addSpaService(data: Omit<SpaService, "id">): SpaService {
  const s: SpaService = { ...data, id: genId() };
  spaServices.push(s);
  return s;
}
export function updateSpaService(id: string, data: Partial<SpaService>): SpaService | null {
  const idx = spaServices.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  spaServices[idx] = { ...spaServices[idx], ...data };
  return spaServices[idx];
}
export function deleteSpaService(id: string): boolean {
  const len = spaServices.length;
  spaServices = spaServices.filter((s) => s.id !== id);
  return spaServices.length < len;
}

// ─── Event Venues ────────────────────────────────────────────────────────────

let eventVenues: EventVenue[] = [
  { id: "ev1", name: "Grand Ballroom", capacity: "Up to 500 guests", description: "Our largest venue features crystal chandeliers, a built-in stage, state-of-the-art AV equipment, and a dedicated pre-function area. Perfect for grand weddings, receptions, and gala events.", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80", features: ["Crystal Chandeliers", "Built-in Stage", "AV Equipment", "Pre-function Area"], order: 1, visible: true },
  { id: "ev2", name: "Divya Banquet Hall", capacity: "Up to 200 guests", description: "An elegant mid-size banquet hall ideal for engagement ceremonies, birthday celebrations, anniversary parties, and corporate events. Full catering and decor services available.", image: "https://images.unsplash.com/photo-1540575467063-178a50c8e9a9?w=800&q=80", features: ["Full Catering", "Decor Services", "Sound System", "Staging"], order: 2, visible: true },
  { id: "ev3", name: "Conference Centre", capacity: "Up to 100 guests", description: "Equipped with projector, podium, high-speed Wi-Fi, and theatre/classroom seating layouts. Ideal for seminars, workshops, corporate offsites, and board meetings.", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", features: ["Projector", "Podium", "High-speed Wi-Fi", "Flexible Seating"], order: 3, visible: true },
  { id: "ev4", name: "Courtyard Garden", capacity: "Up to 150 guests", description: "An open-air venue surrounded by manicured gardens and soft lighting. Ideal for evening receptions, sangeet ceremonies, and al fresco dinners under the stars.", image: "https://images.unsplash.com/photo-1510076857177-7470076d4098?w=800&q=80", features: ["Garden Setting", "Soft Lighting", "Open Air", "Power & PA"], order: 4, visible: true },
];

export function getEventVenues(onlyVisible = false): EventVenue[] {
  const list = onlyVisible ? eventVenues.filter((e) => e.visible) : [...eventVenues];
  return list.sort((a, b) => a.order - b.order);
}
export function addEventVenue(data: Omit<EventVenue, "id">): EventVenue {
  const e: EventVenue = { ...data, id: genId() };
  eventVenues.push(e);
  return e;
}
export function updateEventVenue(id: string, data: Partial<EventVenue>): EventVenue | null {
  const idx = eventVenues.findIndex((e) => e.id === id);
  if (idx === -1) return null;
  eventVenues[idx] = { ...eventVenues[idx], ...data };
  return eventVenues[idx];
}
export function deleteEventVenue(id: string): boolean {
  const len = eventVenues.length;
  eventVenues = eventVenues.filter((e) => e.id !== id);
  return eventVenues.length < len;
}

// ─── Contact Enquiries ───────────────────────────────────────────────────────

let contactEnquiries: ContactEnquiry[] = [];

export function getContactEnquiries(): ContactEnquiry[] {
  return [...contactEnquiries].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
export function addContactEnquiry(data: Omit<ContactEnquiry, "id" | "status" | "createdAt">): ContactEnquiry {
  const c: ContactEnquiry = { ...data, id: genId(), status: "new", createdAt: new Date().toISOString().split("T")[0] };
  contactEnquiries.push(c);
  return c;
}
export function updateContactEnquiry(id: string, data: Partial<ContactEnquiry>): ContactEnquiry | null {
  const idx = contactEnquiries.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  contactEnquiries[idx] = { ...contactEnquiries[idx], ...data };
  return contactEnquiries[idx];
}
export function deleteContactEnquiry(id: string): boolean {
  const len = contactEnquiries.length;
  contactEnquiries = contactEnquiries.filter((c) => c.id !== id);
  return contactEnquiries.length < len;
}

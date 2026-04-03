/**
 * JSON-file-backed data store with seed data.
 * Data persists to data/store.json across server restarts.
 * Falls back to seed data when no persisted file exists.
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import type {
  Room, Booking, GalleryImage, Testimonial,
  Offering, Experience, Subscriber, SiteSettings,
  Announcement, FAQ, SpecialOffer, StatFact,
  DiningVenue, SpaService, EventVenue, ContactEnquiry,
} from "@/types";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "store.json");

function genId() {
  return crypto.randomUUID();
}

function saveToDisk() {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify({
      settings, rooms, bookings, gallery, testimonials, offerings,
      experiences, subscribers, announcements, faqs, specialOffers,
      statFacts, diningVenues, spaServices, eventVenues, contactEnquiries,
    }, null, 2));
  } catch (e) {
    console.error("Failed to persist store:", e);
  }
}

function loadFromDisk() {
  try {
    if (!fs.existsSync(DATA_FILE)) return;
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    const d = JSON.parse(raw);
    if (d.settings) settings = d.settings;
    if (d.rooms) rooms = d.rooms;
    if (d.bookings) bookings = d.bookings;
    if (d.gallery) gallery = d.gallery;
    if (d.testimonials) testimonials = d.testimonials;
    if (d.offerings) offerings = d.offerings;
    if (d.experiences) experiences = d.experiences;
    if (d.subscribers) subscribers = d.subscribers;
    if (d.announcements) announcements = d.announcements;
    if (d.faqs) faqs = d.faqs;
    if (d.specialOffers) specialOffers = d.specialOffers;
    if (d.statFacts) statFacts = d.statFacts;
    if (d.diningVenues) diningVenues = d.diningVenues;
    if (d.spaServices) spaServices = d.spaServices;
    if (d.eventVenues) eventVenues = d.eventVenues;
    if (d.contactEnquiries) contactEnquiries = d.contactEnquiries;
  } catch (e) {
    console.error("Failed to load store:", e);
  }
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
  heroHeadline: "Luxury in the Sacred City of Deoghar",
  heroSubheadline: "Steps from Baba Baidyanath Dham",
  introTitle: "A Sanctuary of Comfort in the Holiest City of Jharkhand",
  introSubtitle: "Luxury, warmth, and devotion — all under one roof",
  introBody: "The Deoghar Grand Hotel & Spa stands at the heart of Deoghar, just minutes from the hallowed Baba Baidyanath Jyotirlinga — one of the twelve sacred Jyotirlingas of Lord Shiva. We have welcomed pilgrims, families, and travellers for over fifteen years, offering 85 thoughtfully appointed rooms, award-winning cuisine, a tranquil wellness centre, and a magnificent banquet hall fit for life's grandest occasions. Whether you arrive seeking devotion, rest, or celebration, The Deoghar Grand is your home in this eternal city.",
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
  locationDescription: "Situated on Temple Road, The Deoghar Grand is a 5-minute walk from Baba Baidyanath Dham, 12 km from Jasidih Junction railway station, and 8 km from Deoghar Airport. Our central location makes us the most sought-after address in the pilgrim city.",
};

let rooms: Room[] = [
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
  { id: "g1", src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80", alt: "Deluxe Heritage Room", category: "rooms", order: 1 },
  { id: "g2", src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80", alt: "Grand Ballroom — wedding reception", category: "banquet", order: 2 },
  { id: "g3", src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80", alt: "Annapurna Restaurant — multi-cuisine dining", category: "dining", order: 3 },
  { id: "g4", src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80", alt: "Divya Banquet Hall — celebration setup", category: "banquet", order: 4 },
  { id: "g5", src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80", alt: "Shanti Wellness Centre — spa treatment", category: "spa", order: 5 },
  { id: "g6", src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80", alt: "Hotel exterior — The Deoghar Grand", category: "exterior", order: 6 },
  { id: "g7", src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80", alt: "Royal Presidential Suite", category: "rooms", order: 7 },
  { id: "g8", src: "https://images.unsplash.com/photo-1510076857177-7470076d4098?w=600&q=80", alt: "Courtyard Garden — evening event", category: "banquet", order: 8 },
  { id: "g9", src: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&q=80", alt: "Family Room — comfortable retreat", category: "rooms", order: 9 },
  { id: "g10", src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80", alt: "Courtyard Lounge — evening chai", category: "dining", order: 10 },
  { id: "g11", src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80", alt: "Rooftop yoga session at dawn", category: "spa", order: 11 },
  { id: "g12", src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80", alt: "Grand lobby — welcome to The Deoghar Grand", category: "exterior", order: 12 },
];

let testimonials: Testimonial[] = [
  { id: "t1", guestName: "Sunita & Rajan Devi", location: "Patna, Bihar", rating: 5, comment: "We come to Baba Baidyanath every Shravan and The Deoghar Grand has become our only choice. The staff arranged VIP darshan for us before 6 AM — something we could never have managed on our own. The pure veg thali at Prasad restaurant is exactly what a devotee needs. Jai Baba Baidyanath!", approved: true, createdAt: "2026-02-15" },
  { id: "t2", guestName: "Capt. Vikram Singh (Retd.)", location: "New Delhi", rating: 5, comment: "I have stayed in five-star properties across India, and The Deoghar Grand surprised me completely. The Presidential Suite was immaculate, the in-room butler service was attentive, and the Ayurvedic massage at Shanti Wellness Centre was among the finest I have experienced. Exceptional property for a tier-2 city.", approved: true, createdAt: "2026-02-20" },
  { id: "t3", guestName: "Meera & Sanjay Joshi", location: "Pune, Maharashtra", rating: 5, comment: "We hosted our daughter's wedding reception in the Grand Ballroom and everything was beyond what we imagined. The event team handled lighting, catering, and floral decor seamlessly. Our 350 guests were looked after impeccably. We cannot thank the banquet team enough — you made our family's most important day unforgettable.", approved: true, createdAt: "2026-03-01" },
  { id: "t4", guestName: "Dr. Anand Tiwari", location: "Ranchi, Jharkhand", rating: 5, comment: "Took the family for a weekend retreat — parents for pilgrimage, kids for nature. The Cultural Heritage Tour arranged by the hotel was brilliant: Trikut Hill ropeway, Nandan Pahar, and Tapovan all in one day with a knowledgeable guide. The Family Room had extra beds set up without us even asking. That kind of anticipation is rare.", approved: true, createdAt: "2026-03-10" },
  { id: "t5", guestName: "Priya Agarwal", location: "Kolkata, West Bengal", rating: 5, comment: "My parents are elderly and the concierge arranged a wheelchair for Baba Dham on our first morning without me having to ask twice. The ground-floor room they gave us was spacious and quiet. The Courtyard Lounge during Saturday evening devotional music is a memory I will carry forever.", approved: true, createdAt: "2026-03-18" },
  { id: "t6", guestName: "Amit & Kavya Bose", location: "Bhubaneswar, Odisha", rating: 4, comment: "Comfortable, clean, and centrally located. The Deluxe Heritage Room was tastefully decorated with local motifs. The only suggestion: the coffee shop could stay open a little later on weekends. Everything else was excellent — especially the staff who were genuinely warm and helpful.", approved: true, createdAt: "2026-03-22" },
];

let offerings: Offering[] = [
  { id: "o1", title: "Rooms and Suites", subtitle: "Dreamlike rest", description: "Choose from our collection of elegantly appointed rooms and suites, each thoughtfully designed with a blend of traditional Jharkhandi aesthetics and modern luxury. From cosy pilgrim rooms to grand presidential suites, every stay is an experience.", image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80", imageAlt: "Luxury hotel room with elegant furnishings", order: 1, visible: true },
  { id: "o2", title: "Cuisine", subtitle: "Authentic flavours, crafted with love", description: "Savour exquisite North Indian and Jharkhandi cuisine prepared by our master chefs. From pure vegetarian thalis for devotees to a lavish multi-cuisine buffet, every meal at The Deoghar Grand is a celebration of regional flavours.", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80", imageAlt: "Fine dining with Indian cuisine", order: 2, visible: true },
  { id: "o3", title: "Banquet Hall &amp; Events", subtitle: "Grand occasions, flawless execution", description: "From sacred ceremonies and grand weddings to corporate conferences and Sangeet evenings, our Grand Ballroom (500 guests), Divya Banquet Hall (200 guests), and open-air Nirmala Courtyard (150 guests) provide the perfect setting. Over 400 successful weddings since 2009.", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80", imageAlt: "Grand Ballroom — wedding reception at The Deoghar Grand", order: 3, visible: true },
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
  { id: "a1", text: "Shravan Mela 2026 packages now open — VIP darshan, transfers & breakfast included. Call +91 6432 234 567.", type: "offer", active: true, startDate: "2026-05-01", endDate: "2026-08-31" },
  { id: "a2", text: "Every Saturday: Live Shiv Bhajans in the Courtyard Lounge, 7:30 PM. All guests welcome.", type: "event", active: true, startDate: "2026-01-01", endDate: "2026-12-31" },
  { id: "a3", text: "Book your Vivah & Reception in our Grand Ballroom — 2026 dates filling fast. Enquire today.", type: "offer", active: true, startDate: "2026-04-01", endDate: "2026-12-31" },
];

let faqs: FAQ[] = [
  { id: "faq1", question: "What are the check-in and check-out times?", answer: "Check-in is at 2:00 PM and check-out is at 12:00 noon. Early check-in (from 8:00 AM) and late check-out (until 6:00 PM) are available on request, subject to availability, and may attract a nominal charge.", category: "general", order: 1, visible: true },
  { id: "faq2", question: "How far is the hotel from Baba Baidyanath Dham?", answer: "The Deoghar Grand is on Temple Road — Baba Baidyanath Dham is a comfortable 5-minute walk. Our concierge can arrange a rickshaw or arrange a pre-dawn temple visit with VIP darshan coordination.", category: "general", order: 2, visible: true },
  { id: "faq3", question: "Do you provide railway station and airport transfers?", answer: "Yes. We provide paid transfers from Jasidih Junction (12 km) and Deoghar Airport (8 km). Please notify us 24 hours in advance while booking or contact our reception at +91 6432 234 567.", category: "transport", order: 3, visible: true },
  { id: "faq4", question: "What is the cancellation policy?", answer: "Cancellations made 48 hours or more before check-in are fully refunded. Cancellations within 48 hours of check-in will be charged one night's tariff. For group bookings and wedding packages, separate cancellation terms apply — please ask at the time of booking.", category: "bookings", order: 4, visible: true },
  { id: "faq5", question: "Is parking available at the hotel?", answer: "Yes, complimentary valet parking is available for all in-house guests. A dedicated car park with 24-hour security is located adjacent to the hotel.", category: "general", order: 5, visible: true },
  { id: "faq6", question: "Does your restaurant serve only vegetarian food?", answer: "We cater to all dietary preferences. Prasad restaurant is 100% pure vegetarian and sattvic. Annapurna, our flagship multi-cuisine restaurant, serves both vegetarian and non-vegetarian dishes. Both are open daily.", category: "dining", order: 6, visible: true },
  { id: "faq7", question: "Can you arrange VIP darshan at Baba Baidyanath Dham?", answer: "Yes, this is one of our most requested services especially during Shravan Mela. Our dedicated concierge can arrange priority darshan passes, prasad, and a knowledgeable guide for your temple visit. Please request this at check-in.", category: "temple", order: 7, visible: true },
  { id: "faq8", question: "How many guests can your banquet hall accommodate?", answer: "Our Grand Ballroom can host up to 500 guests for wedding receptions, galas, and large functions. The Divya Banquet Hall seats up to 200 guests and is ideal for engagement ceremonies, birthday gatherings, and intimate receptions. The Courtyard Garden accommodates up to 150 guests for open-air evening events.", category: "events", order: 8, visible: true },
  { id: "faq9", question: "What is included in a banquet or wedding package?", answer: "Our wedding packages include venue hire, customised decor and floral arrangements, catering (with choice of menu), sound and lighting, a dedicated event coordinator, and accommodation blocks for out-of-town guests. Contact our banquet team for custom pricing.", category: "events", order: 9, visible: true },
  { id: "faq10", question: "Is the spa open to non-resident guests?", answer: "Yes, Shanti Wellness Centre is open to day visitors from 9:00 AM to 8:00 PM. Advance booking is highly recommended for Ayurvedic treatments. In-house guests receive a 10% discount on all spa services.", category: "spa", order: 10, visible: true },
];

let specialOffers: SpecialOffer[] = [
  { id: "so1", title: "Shravan Mela Pilgrimage Package", description: "3 nights in a Deluxe Heritage Room with VIP darshan coordination, guided temple tour to Baidyanath & Basukinath, complimentary sattvic breakfast daily, and a puja prasad thali. The most sacred month of the year — experience it in comfort.", price: 12000, image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80", validFrom: "2026-07-01", validTo: "2026-08-31", visible: true },
  { id: "so2", title: "Romance & Wellness Retreat", description: "2 nights in our Premium Suite with couples Ayurvedic massage, candlelit private dinner, champagne on arrival, full Shanti Wellness Centre access, and late check-out at 3 PM.", price: 18000, image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80", validFrom: "2026-01-01", validTo: "2026-12-31", visible: true },
  { id: "so3", title: "Grand Wedding Package", description: "A complete wedding celebration in our Grand Ballroom — venue for up to 500 guests, custom floral & lighting décor, multi-cuisine banquet, bridal suite, dedicated event coordinator, and accommodation blocks for your family. Call us to craft your dream wedding.", price: 250000, image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80", validFrom: "2026-01-01", validTo: "2026-12-31", visible: true },
];

let statFacts: StatFact[] = [
  { id: "sf1", label: "Luxury Rooms & Suites", value: 85, suffix: "+", order: 1, visible: true },
  { id: "sf2", label: "Years of Hospitality", value: 15, suffix: "+", order: 2, visible: true },
  { id: "sf3", label: "Happy Guests Welcomed", value: 50000, suffix: "+", order: 3, visible: true },
  { id: "sf4", label: "Banquet Capacity", value: 500, suffix: "+", order: 4, visible: true },
];

// ─── Settings ────────────────────────────────────────────────────────────────

export function getSettings(): SiteSettings {
  return settings;
}
export function updateSettings(data: Partial<SiteSettings>): SiteSettings {
  settings = { ...settings, ...data };
  saveToDisk();
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
  saveToDisk();
  return room;
}
export function updateRoom(id: string, data: Partial<Room>): Room | null {
  const idx = rooms.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  rooms[idx] = { ...rooms[idx], ...data };
  saveToDisk();
  return rooms[idx];
}
export function deleteRoom(id: string): boolean {
  const len = rooms.length;
  rooms = rooms.filter((r) => r.id !== id);
  saveToDisk();
  return rooms.length < len;
}

// ─── Bookings ────────────────────────────────────────────────────────────────

export function getBookings(): Booking[] {
  return [...bookings].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
export function getBooking(id: string): Booking | undefined {
  return bookings.find((b) => b.id === id);
}

/**
 * Returns true if the room has no active (non-cancelled) booking that overlaps
 * the requested date range. Excludes a specific booking ID when checking edits.
 */
export function isRoomAvailableForDates(
  roomId: string,
  checkIn: string,
  checkOut: string,
  excludeBookingId?: string
): boolean {
  const reqIn = new Date(checkIn).getTime();
  const reqOut = new Date(checkOut).getTime();

  return !bookings.some((b) => {
    if (b.roomId !== roomId) return false;
    if (excludeBookingId && b.id === excludeBookingId) return false;
    if (b.status === "cancelled" || b.status === "checked-out") return false;
    const bIn = new Date(b.checkIn).getTime();
    const bOut = new Date(b.checkOut).getTime();
    // Overlap: requested range starts before existing ends AND ends after existing starts
    return reqIn < bOut && reqOut > bIn;
  });
}

export function addBooking(data: Omit<Booking, "id" | "createdAt">): Booking {
  const booking: Booking = { ...data, id: genId(), createdAt: new Date().toISOString().split("T")[0] };
  bookings.push(booking);
  saveToDisk();
  return booking;
}
export function updateBooking(id: string, data: Partial<Booking>): Booking | null {
  const idx = bookings.findIndex((b) => b.id === id);
  if (idx === -1) return null;
  bookings[idx] = { ...bookings[idx], ...data };
  saveToDisk();
  return bookings[idx];
}
export function deleteBooking(id: string): boolean {
  const len = bookings.length;
  bookings = bookings.filter((b) => b.id !== id);
  saveToDisk();
  return bookings.length < len;
}

// ─── Gallery ─────────────────────────────────────────────────────────────────

export function getGallery(): GalleryImage[] {
  return [...gallery].sort((a, b) => a.order - b.order);
}
export function addGalleryImage(data: Omit<GalleryImage, "id">): GalleryImage {
  const img: GalleryImage = { ...data, id: genId() };
  gallery.push(img);
  saveToDisk();
  return img;
}
export function updateGalleryImage(id: string, data: Partial<GalleryImage>): GalleryImage | null {
  const idx = gallery.findIndex((g) => g.id === id);
  if (idx === -1) return null;
  gallery[idx] = { ...gallery[idx], ...data };
  saveToDisk();
  return gallery[idx];
}
export function deleteGalleryImage(id: string): boolean {
  const len = gallery.length;
  gallery = gallery.filter((g) => g.id !== id);
  saveToDisk();
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
  saveToDisk();
  return t;
}
export function updateTestimonial(id: string, data: Partial<Testimonial>): Testimonial | null {
  const idx = testimonials.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  testimonials[idx] = { ...testimonials[idx], ...data };
  saveToDisk();
  return testimonials[idx];
}
export function deleteTestimonial(id: string): boolean {
  const len = testimonials.length;
  testimonials = testimonials.filter((t) => t.id !== id);
  saveToDisk();
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
  saveToDisk();
  return o;
}
export function updateOffering(id: string, data: Partial<Offering>): Offering | null {
  const idx = offerings.findIndex((o) => o.id === id);
  if (idx === -1) return null;
  offerings[idx] = { ...offerings[idx], ...data };
  saveToDisk();
  return offerings[idx];
}
export function deleteOffering(id: string): boolean {
  const len = offerings.length;
  offerings = offerings.filter((o) => o.id !== id);
  saveToDisk();
  return offerings.length < len;
}

// ─── Experiences ─────────────────────────────────────────────────────────────

export function getExperiences(onlyVisible = false): Experience[] {
  return onlyVisible ? experiences.filter((e) => e.visible) : [...experiences];
}
export function addExperience(data: Omit<Experience, "id">): Experience {
  const e: Experience = { ...data, id: genId() };
  experiences.push(e);
  saveToDisk();
  return e;
}
export function updateExperience(id: string, data: Partial<Experience>): Experience | null {
  const idx = experiences.findIndex((e) => e.id === id);
  if (idx === -1) return null;
  experiences[idx] = { ...experiences[idx], ...data };
  saveToDisk();
  return experiences[idx];
}
export function deleteExperience(id: string): boolean {
  const len = experiences.length;
  experiences = experiences.filter((e) => e.id !== id);
  saveToDisk();
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
  saveToDisk();
  return s;
}
export function deleteSubscriber(id: string): boolean {
  const len = subscribers.length;
  subscribers = subscribers.filter((s) => s.id !== id);
  saveToDisk();
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
  saveToDisk();
  return a;
}
export function updateAnnouncement(id: string, data: Partial<Announcement>): Announcement | null {
  const idx = announcements.findIndex((a) => a.id === id);
  if (idx === -1) return null;
  announcements[idx] = { ...announcements[idx], ...data };
  saveToDisk();
  return announcements[idx];
}
export function deleteAnnouncement(id: string): boolean {
  const len = announcements.length;
  announcements = announcements.filter((a) => a.id !== id);
  saveToDisk();
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
  saveToDisk();
  return f;
}
export function updateFAQ(id: string, data: Partial<FAQ>): FAQ | null {
  const idx = faqs.findIndex((f) => f.id === id);
  if (idx === -1) return null;
  faqs[idx] = { ...faqs[idx], ...data };
  saveToDisk();
  return faqs[idx];
}
export function deleteFAQ(id: string): boolean {
  const len = faqs.length;
  faqs = faqs.filter((f) => f.id !== id);
  saveToDisk();
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
  saveToDisk();
  return o;
}
export function updateSpecialOffer(id: string, data: Partial<SpecialOffer>): SpecialOffer | null {
  const idx = specialOffers.findIndex((o) => o.id === id);
  if (idx === -1) return null;
  specialOffers[idx] = { ...specialOffers[idx], ...data };
  saveToDisk();
  return specialOffers[idx];
}
export function deleteSpecialOffer(id: string): boolean {
  const len = specialOffers.length;
  specialOffers = specialOffers.filter((o) => o.id !== id);
  saveToDisk();
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
  saveToDisk();
  return s;
}
export function updateStatFact(id: string, data: Partial<StatFact>): StatFact | null {
  const idx = statFacts.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  statFacts[idx] = { ...statFacts[idx], ...data };
  saveToDisk();
  return statFacts[idx];
}
export function deleteStatFact(id: string): boolean {
  const len = statFacts.length;
  statFacts = statFacts.filter((s) => s.id !== id);
  saveToDisk();
  return statFacts.length < len;
}

// ─── Dining Venues ───────────────────────────────────────────────────────────

let diningVenues: DiningVenue[] = [
  { id: "dv1", name: "Annapurna — Multi-Cuisine Restaurant", cuisine: "Multi-Cuisine", description: "Our flagship restaurant serves an extensive breakfast, lunch, and dinner buffet featuring North Indian, Jharkhandi, and continental cuisine. Enjoy the finest vegetarian and non-vegetarian dishes prepared by our master chefs.", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80", hours: "7:00 AM – 10:30 PM", order: 1, visible: true },
  { id: "dv2", name: "Prasad — Pure Vegetarian Kitchen", cuisine: "Vegetarian", description: "A dedicated pure vegetarian restaurant offering traditional thalis, sattvic meals, and regional specialities. Ideal for devotees observing dietary customs during their pilgrimage.", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80", hours: "6:30 AM – 9:30 PM", order: 2, visible: true },
  { id: "dv3", name: "Courtyard Lounge & Café", cuisine: "Café & Lounge", description: "An open-air lounge perfect for chai, fresh juices, pastries, and light bites. Live devotional music on Saturday evenings transforms this space into a tranquil cultural gathering.", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80", hours: "10:00 AM – 11:00 PM", order: 3, visible: true },
  { id: "dv4", name: "Private Dining & Banquets", cuisine: "Custom Menu", description: "Host intimate dinners, celebrations, or corporate meals in our private dining rooms. Customised menus, dedicated service, and elegant ambience for up to 40 guests.", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", hours: "By reservation", order: 4, visible: true },
];

export function getDiningVenues(onlyVisible = false): DiningVenue[] {
  const list = onlyVisible ? diningVenues.filter((d) => d.visible) : [...diningVenues];
  return list.sort((a, b) => a.order - b.order);
}
export function addDiningVenue(data: Omit<DiningVenue, "id">): DiningVenue {
  const d: DiningVenue = { ...data, id: genId() };
  diningVenues.push(d);
  saveToDisk();
  return d;
}
export function updateDiningVenue(id: string, data: Partial<DiningVenue>): DiningVenue | null {
  const idx = diningVenues.findIndex((d) => d.id === id);
  if (idx === -1) return null;
  diningVenues[idx] = { ...diningVenues[idx], ...data };
  saveToDisk();
  return diningVenues[idx];
}
export function deleteDiningVenue(id: string): boolean {
  const len = diningVenues.length;
  diningVenues = diningVenues.filter((d) => d.id !== id);
  saveToDisk();
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
  saveToDisk();
  return s;
}
export function updateSpaService(id: string, data: Partial<SpaService>): SpaService | null {
  const idx = spaServices.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  spaServices[idx] = { ...spaServices[idx], ...data };
  saveToDisk();
  return spaServices[idx];
}
export function deleteSpaService(id: string): boolean {
  const len = spaServices.length;
  spaServices = spaServices.filter((s) => s.id !== id);
  saveToDisk();
  return spaServices.length < len;
}

// ─── Event Venues ────────────────────────────────────────────────────────────

let eventVenues: EventVenue[] = [
  { id: "ev1", name: "Grand Ballroom", capacity: "Up to 500 guests", description: "The crown jewel of The Deoghar Grand — a soaring, pillar-free hall spanning over 6,000 sq ft with double-height ceilings, bespoke crystal chandeliers, a raised performance stage, and a grand bridal entry arch. Designed for weddings, milestone receptions, and gala dinners that deserve nothing less than magnificence. Our in-house banquet team has executed over 400 successful weddings since 2009.", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80", features: ["6,000 sq ft pillar-free hall", "Crystal chandeliers", "Built-in performance stage", "Bridal entry arch", "4K projection & AV", "Dedicated pre-function foyer", "Catering for 500+", "In-house décor team"], order: 1, visible: true },
  { id: "ev2", name: "Divya Banquet Hall", capacity: "Up to 200 guests", description: "An intimate yet impressive banquet space ideal for engagement ceremonies, Mehendi & Sangeet functions, milestone birthday celebrations, and close-family receptions. Divya Hall features warm Rajasthani-inspired interiors, a dedicated bridal room adjacent to the hall, and a private bar lounge for pre-function socialising.", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80", features: ["Warm Rajasthani interiors", "Adjacent bridal room", "Private pre-function lounge", "Full catering services", "Custom décor & floral", "High-fidelity sound system"], order: 2, visible: true },
  { id: "ev3", name: "Shiv Shakti Conference Centre", capacity: "Up to 100 guests", description: "A fully equipped business venue with theatre, classroom, and boardroom configurations. Features dual 4K laser projectors, wireless presentation, high-speed fibre Wi-Fi, and direct catering from Annapurna restaurant. Ideal for corporate seminars, NGO workshops, government conclaves, and institutional offsites.", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", features: ["4K laser projector", "Wireless presentation", "Fibre high-speed Wi-Fi", "Theatre / Classroom / Boardroom", "Business catering", "Secretarial support"], order: 3, visible: true },
  { id: "ev4", name: "Nirmala Courtyard Garden", capacity: "Up to 150 guests", description: "An enchanting open-air venue shaded by mature trees and lit by a thousand warm fairy lights. The Nirmala Courtyard is the preferred setting for Sangeet evenings, Haldi ceremonies, outdoor cocktail parties, and intimate al-fresco dinners under a canopy of stars — the Deoghar sky as your backdrop.", image: "https://images.unsplash.com/photo-1510076857177-7470076d4098?w=800&q=80", features: ["Fairy-light canopy", "Open-air garden setting", "Sangeet dance floor", "Bar & beverage station", "Power & PA system", "Floral mandap setup"], order: 4, visible: true },
];

export function getEventVenues(onlyVisible = false): EventVenue[] {
  const list = onlyVisible ? eventVenues.filter((e) => e.visible) : [...eventVenues];
  return list.sort((a, b) => a.order - b.order);
}
export function addEventVenue(data: Omit<EventVenue, "id">): EventVenue {
  const e: EventVenue = { ...data, id: genId() };
  eventVenues.push(e);
  saveToDisk();
  return e;
}
export function updateEventVenue(id: string, data: Partial<EventVenue>): EventVenue | null {
  const idx = eventVenues.findIndex((e) => e.id === id);
  if (idx === -1) return null;
  eventVenues[idx] = { ...eventVenues[idx], ...data };
  saveToDisk();
  return eventVenues[idx];
}
export function deleteEventVenue(id: string): boolean {
  const len = eventVenues.length;
  eventVenues = eventVenues.filter((e) => e.id !== id);
  saveToDisk();
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
  saveToDisk();
  return c;
}
export function updateContactEnquiry(id: string, data: Partial<ContactEnquiry>): ContactEnquiry | null {
  const idx = contactEnquiries.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  contactEnquiries[idx] = { ...contactEnquiries[idx], ...data };
  saveToDisk();
  return contactEnquiries[idx];
}
export function deleteContactEnquiry(id: string): boolean {
  const len = contactEnquiries.length;
  contactEnquiries = contactEnquiries.filter((c) => c.id !== id);
  saveToDisk();
  return contactEnquiries.length < len;
}

// ─── Load persisted data (overrides seed data if file exists) ────────────────
loadFromDisk();

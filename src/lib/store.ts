import type {
  Room, Booking, GalleryImage, Testimonial,
  Offering, Experience, Subscriber, SiteSettings,
  Announcement,
} from "@/types";

// --------------- seed data ---------------

const seedSettings: SiteSettings = {
  hotelName: "The Deoghar Grand",
  subtitle: "Hotel & Spa",
  phone: "+91 6432 234 567",
  email: "reservations@deogharhotel.com",
  address: "Temple Road, Near Baba Baidyanath Dham",
  city: "Deoghar, Jharkhand",
  pincode: "814112",
  heroImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80",
  heroHeadline: "Where Divine Tranquility Meets Timeless Luxury",
  heroSubheadline: "in the Sacred City of Deoghar",
  introTitle: "Elegance and Serenity in the Heart of Jharkhand's Holiest City",
  introSubtitle: "A divine experience awaits you",
  introBody: "The Deoghar Grand Hotel & Spa is a premier luxury destination nestled in the sacred city of Deoghar, just steps from the revered Baba Baidyanath Dham. Blending timeless elegance with warm Indian hospitality, our hotel offers an unparalleled retreat for pilgrims, families, and discerning travellers seeking comfort, culture, and spiritual rejuvenation.",
  instagramHandle: "@thedeoghargrand",
  facebookUrl: "#",
  instagramUrl: "#",
  twitterUrl: "#",
};

const seedRooms: Room[] = [
  { id: "r1", name: "Classic Comfort Room", type: "standard", price: 3500, description: "A cosy, well-appointed room with modern amenities and traditional décor, perfect for solo travellers and pilgrims.", amenities: ["Free Wi-Fi", "AC", "TV", "Attached Bathroom", "Room Service"], images: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80"], maxGuests: 2, isAvailable: true, createdAt: "2026-01-01" },
  { id: "r2", name: "Deluxe Heritage Room", type: "deluxe", price: 5500, description: "Spacious room with heritage-inspired interiors, a king-size bed, and views of the temple precinct.", amenities: ["Free Wi-Fi", "AC", "TV", "Mini Bar", "Room Service", "Temple View", "King Bed"], images: ["https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80"], maxGuests: 3, isAvailable: true, createdAt: "2026-01-01" },
  { id: "r3", name: "Premium Suite", type: "suite", price: 8500, description: "An elegant suite featuring a separate living area, premium furnishings, and panoramic city views.", amenities: ["Free Wi-Fi", "AC", "TV", "Mini Bar", "Living Area", "Room Service", "City View", "Bathrobe"], images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80"], maxGuests: 4, isAvailable: true, createdAt: "2026-01-01" },
  { id: "r4", name: "Royal Presidential Suite", type: "premium", price: 15000, description: "Our most luxurious offering — a grand suite with private terrace, jacuzzi, and bespoke butler service.", amenities: ["Free Wi-Fi", "AC", "TV", "Mini Bar", "Jacuzzi", "Private Terrace", "Butler Service", "Living & Dining Area", "King Bed"], images: ["https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80"], maxGuests: 4, isAvailable: true, createdAt: "2026-01-01" },
  { id: "r5", name: "Family Room", type: "deluxe", price: 6500, description: "Extra-spacious room designed for families, with twin beds, a seating area, and child-safe amenities.", amenities: ["Free Wi-Fi", "AC", "TV", "Extra Beds", "Room Service", "Child Safe", "Seating Area"], images: ["https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80"], maxGuests: 5, isAvailable: true, createdAt: "2026-01-01" },
  { id: "r6", name: "Pilgrim Standard Room", type: "standard", price: 2500, description: "Clean and comfortable room ideal for devotees visiting Baba Baidyanath Dham, with essential amenities.", amenities: ["Free Wi-Fi", "AC", "TV", "Attached Bathroom", "Room Service"], images: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80"], maxGuests: 2, isAvailable: true, createdAt: "2026-01-01" },
];

const seedBookings: Booking[] = [
  { id: "b1", guestName: "Rajesh Kumar", guestEmail: "rajesh@example.com", guestPhone: "+91 98765 43210", roomId: "r2", roomName: "Deluxe Heritage Room", checkIn: "2026-03-25", checkOut: "2026-03-28", guests: 2, status: "confirmed", totalAmount: 16500, createdAt: "2026-03-20" },
  { id: "b2", guestName: "Priya Sharma", guestEmail: "priya@example.com", guestPhone: "+91 87654 32100", roomId: "r3", roomName: "Premium Suite", checkIn: "2026-03-22", checkOut: "2026-03-24", guests: 3, status: "checked-in", totalAmount: 17000, createdAt: "2026-03-18" },
  { id: "b3", guestName: "Amit Patel", guestEmail: "amit@example.com", guestPhone: "+91 76543 21098", roomId: "r1", roomName: "Classic Comfort Room", checkIn: "2026-03-15", checkOut: "2026-03-17", guests: 1, status: "checked-out", totalAmount: 7000, createdAt: "2026-03-10" },
];

const seedGallery: GalleryImage[] = [
  { id: "g1", src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80", alt: "Luxury hotel suite", category: "rooms", order: 1 },
  { id: "g2", src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80", alt: "Hotel pool and courtyard", category: "exterior", order: 2 },
  { id: "g3", src: "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=600&q=80", alt: "Fine dining restaurant", category: "dining", order: 3 },
  { id: "g4", src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80", alt: "Hotel exterior at dusk", category: "exterior", order: 4 },
  { id: "g5", src: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&q=80", alt: "Spa wellness area", category: "spa", order: 5 },
  { id: "g6", src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80", alt: "Grand lobby with chandelier", category: "exterior", order: 6 },
];

const seedTestimonials: Testimonial[] = [
  { id: "t1", guestName: "Sunita Devi", location: "Patna, Bihar", rating: 5, comment: "Absolutely wonderful stay! The hotel is beautifully maintained and the staff made our pilgrimage trip so comfortable. The temple is just a short walk away.", approved: true, createdAt: "2026-02-15" },
  { id: "t2", guestName: "Vikram Singh", location: "New Delhi", rating: 5, comment: "World-class hospitality in Deoghar. The rooms are spacious, food is excellent, and the spa is incredibly relaxing after a long day of sightseeing.", approved: true, createdAt: "2026-02-20" },
  { id: "t3", guestName: "Meera Joshi", location: "Mumbai, Maharashtra", rating: 4, comment: "Great location near Baidyanath temple. The family room was perfect for us with two kids. Will definitely return during Shravan.", approved: true, createdAt: "2026-03-01" },
  { id: "t4", guestName: "Anand Tiwari", location: "Ranchi, Jharkhand", rating: 5, comment: "Best hotel in Deoghar without a doubt. The food quality is outstanding and the wellness centre helped me truly unwind.", approved: false, createdAt: "2026-03-10" },
];

const seedOfferings: Offering[] = [
  { id: "o1", title: "Rooms and Suites", subtitle: "Dreamlike rest", description: "Choose from our collection of elegantly appointed rooms and suites, each thoughtfully designed with a blend of traditional Jharkhandi aesthetics and modern luxury. From cosy pilgrim rooms to grand presidential suites, every stay is an experience.", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80", imageAlt: "Luxury hotel room with elegant furnishings", order: 1, visible: true },
  { id: "o2", title: "Cuisine", subtitle: "Authentic flavours, crafted with love", description: "Savour exquisite North Indian and Jharkhandi cuisine prepared by our master chefs. From pure vegetarian thalis for devotees to a lavish multi-cuisine buffet, every meal at The Deoghar Grand is a celebration of regional flavours.", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80", imageAlt: "Fine dining with Indian cuisine", order: 2, visible: true },
  { id: "o3", title: "Events and Celebrations", subtitle: "Grand occasions, flawless execution", description: "From sacred ceremonies and grand weddings to corporate conferences and private banquets, our Grand Ballroom and banquet halls provide the perfect setting. Our dedicated events team ensures every detail is impeccable.", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80", imageAlt: "Elegant event hall with luxurious decoration", order: 3, visible: true },
  { id: "o4", title: "Spa & Wellness", subtitle: "Rejuvenate body and soul", description: "Unwind at Shanti Wellness Centre, our tranquil urban retreat. Enjoy Ayurvedic treatments, modern spa therapies, a fully equipped fitness centre, and yoga sessions — all designed to restore your inner balance.", image: "https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=1200&q=80", imageAlt: "Spa and wellness area", order: 4, visible: true },
];

const seedExperiences: Experience[] = [
  { id: "e1", title: "Pilgrimage Experience", description: "Guided visits to Baba Baidyanath Dham, Basukinath, and nearby sacred sites. Includes VIP darshan assistance, prasad arrangements, and spiritual counselling.", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80", price: 2500, visible: true },
  { id: "e2", title: "Cultural Heritage Tour", description: "Explore Trikut Hill, Nandan Pahar, Tapovan, and Satsang Ashram. Discover the rich cultural heritage of Deoghar with our expert local guides.", image: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=800&q=80", price: 3000, visible: true },
  { id: "e3", title: "Family Spiritual Retreat", description: "A holistic family package combining temple visits, nature excursions, yoga sessions, and kid-friendly activities. Create lasting memories in the lap of spirituality.", image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80", price: 5000, visible: true },
];

const seedSubscribers: Subscriber[] = [
  { id: "s1", name: "Rahul Sharma", email: "rahul@example.com", subscribedAt: "2026-02-01" },
  { id: "s2", name: "Kavita Kumari", email: "kavita@example.com", subscribedAt: "2026-02-15" },
];

const seedAnnouncements: Announcement[] = [
  { id: "a1", text: "Shravan season reservations are now open with temple-transfer packages.", type: "offer", active: true, startDate: "2026-05-01", endDate: "2026-08-31" },
  { id: "a2", text: "Live devotional music every Saturday evening in the courtyard lounge.", type: "event", active: true, startDate: "2026-01-01", endDate: "2026-12-31" },
];

// --------------- in-memory store ---------------

let settings: SiteSettings = { ...seedSettings };
let rooms: Room[] = [...seedRooms];
let bookings: Booking[] = [...seedBookings];
let gallery: GalleryImage[] = [...seedGallery];
let testimonials: Testimonial[] = [...seedTestimonials];
let offerings: Offering[] = [...seedOfferings];
let experiences: Experience[] = [...seedExperiences];
let subscribers: Subscriber[] = [...seedSubscribers];
let announcements: Announcement[] = [...seedAnnouncements];

function genId() {
  return Math.random().toString(36).substring(2, 10);
}

// --------------- Settings ---------------
export function getSettings() { return settings; }
export function updateSettings(data: Partial<SiteSettings>) { settings = { ...settings, ...data }; return settings; }

// --------------- Rooms ---------------
export function getRooms() { return rooms; }
export function getRoom(id: string) { return rooms.find((r) => r.id === id); }
export function addRoom(data: Omit<Room, "id" | "createdAt">) {
  const room: Room = { ...data, id: genId(), createdAt: new Date().toISOString().split("T")[0] };
  rooms.push(room);
  return room;
}
export function updateRoom(id: string, data: Partial<Room>) {
  const idx = rooms.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  rooms[idx] = { ...rooms[idx], ...data };
  return rooms[idx];
}
export function deleteRoom(id: string) {
  const len = rooms.length;
  rooms = rooms.filter((r) => r.id !== id);
  return rooms.length < len;
}

// --------------- Bookings ---------------
export function getBookings() { return bookings; }
export function getBooking(id: string) { return bookings.find((b) => b.id === id); }
export function addBooking(data: Omit<Booking, "id" | "createdAt">) {
  const booking: Booking = { ...data, id: genId(), createdAt: new Date().toISOString().split("T")[0] };
  bookings.push(booking);
  return booking;
}
export function updateBooking(id: string, data: Partial<Booking>) {
  const idx = bookings.findIndex((b) => b.id === id);
  if (idx === -1) return null;
  bookings[idx] = { ...bookings[idx], ...data };
  return bookings[idx];
}
export function deleteBooking(id: string) {
  const len = bookings.length;
  bookings = bookings.filter((b) => b.id !== id);
  return bookings.length < len;
}

// --------------- Gallery ---------------
export function getGallery() { return gallery.sort((a, b) => a.order - b.order); }
export function addGalleryImage(data: Omit<GalleryImage, "id">) {
  const img: GalleryImage = { ...data, id: genId() };
  gallery.push(img);
  return img;
}
export function updateGalleryImage(id: string, data: Partial<GalleryImage>) {
  const idx = gallery.findIndex((g) => g.id === id);
  if (idx === -1) return null;
  gallery[idx] = { ...gallery[idx], ...data };
  return gallery[idx];
}
export function deleteGalleryImage(id: string) {
  const len = gallery.length;
  gallery = gallery.filter((g) => g.id !== id);
  return gallery.length < len;
}

// --------------- Testimonials ---------------
export function getTestimonials(onlyApproved = false) {
  return onlyApproved ? testimonials.filter((t) => t.approved) : testimonials;
}
export function addTestimonial(data: Omit<Testimonial, "id" | "createdAt">) {
  const t: Testimonial = { ...data, id: genId(), createdAt: new Date().toISOString().split("T")[0] };
  testimonials.push(t);
  return t;
}
export function updateTestimonial(id: string, data: Partial<Testimonial>) {
  const idx = testimonials.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  testimonials[idx] = { ...testimonials[idx], ...data };
  return testimonials[idx];
}
export function deleteTestimonial(id: string) {
  const len = testimonials.length;
  testimonials = testimonials.filter((t) => t.id !== id);
  return testimonials.length < len;
}

// --------------- Offerings ---------------
export function getOfferings(onlyVisible = false) {
  const list = onlyVisible ? offerings.filter((o) => o.visible) : offerings;
  return list.sort((a, b) => a.order - b.order);
}
export function addOffering(data: Omit<Offering, "id">) {
  const offering: Offering = { ...data, id: genId() };
  offerings.push(offering);
  return offering;
}
export function updateOffering(id: string, data: Partial<Offering>) {
  const idx = offerings.findIndex((o) => o.id === id);
  if (idx === -1) return null;
  offerings[idx] = { ...offerings[idx], ...data };
  return offerings[idx];
}
export function deleteOffering(id: string) {
  const len = offerings.length;
  offerings = offerings.filter((o) => o.id !== id);
  return offerings.length < len;
}

// --------------- Experiences ---------------
export function getExperiences(onlyVisible = false) {
  return onlyVisible ? experiences.filter((e) => e.visible) : experiences;
}
export function addExperience(data: Omit<Experience, "id">) {
  const exp: Experience = { ...data, id: genId() };
  experiences.push(exp);
  return exp;
}
export function updateExperience(id: string, data: Partial<Experience>) {
  const idx = experiences.findIndex((e) => e.id === id);
  if (idx === -1) return null;
  experiences[idx] = { ...experiences[idx], ...data };
  return experiences[idx];
}
export function deleteExperience(id: string) {
  const len = experiences.length;
  experiences = experiences.filter((e) => e.id !== id);
  return experiences.length < len;
}

// --------------- Subscribers ---------------
export function getSubscribers() { return subscribers; }
export function addSubscriber(data: Omit<Subscriber, "id" | "subscribedAt">) {
  if (subscribers.some((s) => s.email === data.email)) return null;
  const sub: Subscriber = { ...data, id: genId(), subscribedAt: new Date().toISOString().split("T")[0] };
  subscribers.push(sub);
  return sub;
}
export function deleteSubscriber(id: string) {
  const len = subscribers.length;
  subscribers = subscribers.filter((s) => s.id !== id);
  return subscribers.length < len;
}

// --------------- Announcements ---------------
export function getAnnouncements(onlyActive = false) {
  return onlyActive ? announcements.filter((a) => a.active) : announcements;
}
export function addAnnouncement(data: Omit<Announcement, "id">) {
  const announcement: Announcement = { ...data, id: genId() };
  announcements.push(announcement);
  return announcement;
}
export function updateAnnouncement(id: string, data: Partial<Announcement>) {
  const idx = announcements.findIndex((a) => a.id === id);
  if (idx === -1) return null;
  announcements[idx] = { ...announcements[idx], ...data };
  return announcements[idx];
}
export function deleteAnnouncement(id: string) {
  const len = announcements.length;
  announcements = announcements.filter((a) => a.id !== id);
  return announcements.length < len;
}

// --------------- Stats ---------------
export function getStats() {
  return {
    totalRooms: rooms.length,
    availableRooms: rooms.filter((r) => r.isAvailable).length,
    totalBookings: bookings.length,
    activeBookings: bookings.filter((b) => b.status === "confirmed" || b.status === "checked-in").length,
    totalRevenue: bookings.filter((b) => b.status !== "cancelled").reduce((sum, b) => sum + b.totalAmount, 0),
    totalSubscribers: subscribers.length,
    totalTestimonials: testimonials.length,
    pendingTestimonials: testimonials.filter((t) => !t.approved).length,
    activeAnnouncements: announcements.filter((a) => a.active).length,
  };
}

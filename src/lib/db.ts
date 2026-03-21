/**
 * SQLite database connection and schema initialization.
 * Uses better-sqlite3 (synchronous), which is compatible with
 * Next.js Server Components and API Routes.
 *
 * The database file is created at hotel.db in the project root.
 * Seed data is inserted once on first run (when tables are empty).
 */
import Database from "better-sqlite3";
import path from "path";
import type {
  Room, Booking, GalleryImage, Testimonial,
  Offering, Experience, Subscriber, SiteSettings,
  Announcement,
} from "@/types";

const DB_PATH = path.join(process.cwd(), "hotel.db");

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (_db) return _db;
  _db = new Database(DB_PATH);
  _db.pragma("journal_mode = WAL");
  _db.pragma("foreign_keys = ON");
  initSchema(_db);
  return _db;
}

// ─── Schema ─────────────────────────────────────────────────────────────────

function initSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      id          TEXT PRIMARY KEY DEFAULT 'main',
      hotelName   TEXT NOT NULL,
      subtitle    TEXT NOT NULL,
      phone       TEXT NOT NULL,
      email       TEXT NOT NULL,
      address     TEXT NOT NULL,
      city        TEXT NOT NULL,
      pincode     TEXT NOT NULL,
      heroImage   TEXT NOT NULL,
      heroHeadline    TEXT NOT NULL,
      heroSubheadline TEXT NOT NULL,
      introTitle  TEXT NOT NULL,
      introSubtitle   TEXT NOT NULL,
      introBody   TEXT NOT NULL,
      instagramHandle TEXT NOT NULL,
      facebookUrl TEXT NOT NULL,
      instagramUrl    TEXT NOT NULL,
      twitterUrl  TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS rooms (
      id          TEXT PRIMARY KEY,
      name        TEXT NOT NULL,
      type        TEXT NOT NULL,
      price       REAL NOT NULL,
      description TEXT NOT NULL,
      amenities   TEXT NOT NULL,
      images      TEXT NOT NULL,
      maxGuests   INTEGER NOT NULL,
      isAvailable INTEGER NOT NULL DEFAULT 1,
      createdAt   TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id          TEXT PRIMARY KEY,
      guestName   TEXT NOT NULL,
      guestEmail  TEXT NOT NULL,
      guestPhone  TEXT NOT NULL,
      roomId      TEXT NOT NULL,
      roomName    TEXT NOT NULL,
      checkIn     TEXT NOT NULL,
      checkOut    TEXT NOT NULL,
      guests      INTEGER NOT NULL,
      status      TEXT NOT NULL DEFAULT 'confirmed',
      totalAmount REAL NOT NULL,
      createdAt   TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS gallery (
      id       TEXT PRIMARY KEY,
      src      TEXT NOT NULL,
      alt      TEXT NOT NULL,
      category TEXT NOT NULL,
      "order"  INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id        TEXT PRIMARY KEY,
      guestName TEXT NOT NULL,
      location  TEXT NOT NULL,
      rating    INTEGER NOT NULL,
      comment   TEXT NOT NULL,
      approved  INTEGER NOT NULL DEFAULT 0,
      createdAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS offerings (
      id          TEXT PRIMARY KEY,
      title       TEXT NOT NULL,
      subtitle    TEXT NOT NULL,
      description TEXT NOT NULL,
      image       TEXT NOT NULL,
      imageAlt    TEXT NOT NULL,
      "order"     INTEGER NOT NULL DEFAULT 0,
      visible     INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS experiences (
      id          TEXT PRIMARY KEY,
      title       TEXT NOT NULL,
      description TEXT NOT NULL,
      image       TEXT NOT NULL,
      price       REAL NOT NULL,
      visible     INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS subscribers (
      id           TEXT PRIMARY KEY,
      name         TEXT NOT NULL,
      email        TEXT UNIQUE NOT NULL,
      subscribedAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS announcements (
      id        TEXT PRIMARY KEY,
      text      TEXT NOT NULL,
      type      TEXT NOT NULL DEFAULT 'info',
      active    INTEGER NOT NULL DEFAULT 1,
      startDate TEXT NOT NULL,
      endDate   TEXT NOT NULL
    );
  `);

  seedIfEmpty(db);
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function toRoom(row: Record<string, unknown>): Room {
  return {
    ...row,
    amenities: JSON.parse(row.amenities as string),
    images: JSON.parse(row.images as string),
    isAvailable: row.isAvailable === 1,
    price: Number(row.price),
    maxGuests: Number(row.maxGuests),
  } as Room;
}

export function toBooking(row: Record<string, unknown>): Booking {
  return {
    ...row,
    guests: Number(row.guests),
    totalAmount: Number(row.totalAmount),
  } as Booking;
}

export function toGalleryImage(row: Record<string, unknown>): GalleryImage {
  return { ...row, order: Number(row.order) } as GalleryImage;
}

export function toTestimonial(row: Record<string, unknown>): Testimonial {
  return {
    ...row,
    rating: Number(row.rating),
    approved: row.approved === 1,
  } as Testimonial;
}

export function toOffering(row: Record<string, unknown>): Offering {
  return { ...row, order: Number(row.order), visible: row.visible === 1 } as Offering;
}

export function toExperience(row: Record<string, unknown>): Experience {
  return { ...row, price: Number(row.price), visible: row.visible === 1 } as Experience;
}

export function toSubscriber(row: Record<string, unknown>): Subscriber {
  return {
    id: String(row.id),
    name: String(row.name),
    email: String(row.email),
    subscribedAt: String(row.subscribedAt),
  };
}

export function toAnnouncement(row: Record<string, unknown>): Announcement {
  return { ...row, active: row.active === 1 } as Announcement;
}

export function toSettings(row: Record<string, unknown>): SiteSettings {
  return {
    hotelName: String(row.hotelName),
    subtitle: String(row.subtitle),
    phone: String(row.phone),
    email: String(row.email),
    address: String(row.address),
    city: String(row.city),
    pincode: String(row.pincode),
    heroImage: String(row.heroImage),
    heroHeadline: String(row.heroHeadline),
    heroSubheadline: String(row.heroSubheadline),
    introTitle: String(row.introTitle),
    introSubtitle: String(row.introSubtitle),
    introBody: String(row.introBody),
    instagramHandle: String(row.instagramHandle),
    facebookUrl: String(row.facebookUrl),
    instagramUrl: String(row.instagramUrl),
    twitterUrl: String(row.twitterUrl),
  };
}

// ─── Seed ────────────────────────────────────────────────────────────────────

function seedIfEmpty(db: Database.Database) {
  const settingsCount = (db.prepare("SELECT COUNT(*) as c FROM settings").get() as { c: number }).c;
  if (settingsCount > 0) return; // already seeded

  const insertSettings = db.prepare(`
    INSERT INTO settings VALUES (
      'main','The Deoghar Grand','Hotel & Spa','+91 6432 234 567',
      'reservations@deogharhotel.com','Temple Road, Near Baba Baidyanath Dham',
      'Deoghar, Jharkhand','814112',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80',
      'Where Divine Tranquility Meets Timeless Luxury','in the Sacred City of Deoghar',
      'Elegance and Serenity in the Heart of Jharkhand''s Holiest City',
      'A divine experience awaits you',
      'The Deoghar Grand Hotel & Spa is a premier luxury destination nestled in the sacred city of Deoghar, just steps from the revered Baba Baidyanath Dham. Blending timeless elegance with warm Indian hospitality, our hotel offers an unparalleled retreat for pilgrims, families, and discerning travellers seeking comfort, culture, and spiritual rejuvenation.',
      '@thedeoghargrand','#','#','#'
    )
  `);

  const insertRoom = db.prepare(`INSERT INTO rooms VALUES (?,?,?,?,?,?,?,?,?,?)`);
  const insertBooking = db.prepare(`INSERT INTO bookings VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`);
  const insertGallery = db.prepare(`INSERT INTO gallery VALUES (?,?,?,?,?)`);
  const insertTestimonial = db.prepare(`INSERT INTO testimonials VALUES (?,?,?,?,?,?,?)`);
  const insertOffering = db.prepare(`INSERT INTO offerings VALUES (?,?,?,?,?,?,?,?)`);
  const insertExperience = db.prepare(`INSERT INTO experiences VALUES (?,?,?,?,?,?)`);
  const insertSubscriber = db.prepare(`INSERT INTO subscribers VALUES (?,?,?,?)`);
  const insertAnnouncement = db.prepare(`INSERT INTO announcements VALUES (?,?,?,?,?,?)`);

  db.transaction(() => {
    insertSettings.run();

    [
      ["r1","Classic Comfort Room","standard",3500,"A cosy, well-appointed room with modern amenities and traditional décor, perfect for solo travellers and pilgrims.",JSON.stringify(["Free Wi-Fi","AC","TV","Attached Bathroom","Room Service"]),JSON.stringify(["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80"]),2,1,"2026-01-01"],
      ["r2","Deluxe Heritage Room","deluxe",5500,"Spacious room with heritage-inspired interiors, a king-size bed, and views of the temple precinct.",JSON.stringify(["Free Wi-Fi","AC","TV","Mini Bar","Room Service","Temple View","King Bed"]),JSON.stringify(["https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80"]),3,1,"2026-01-01"],
      ["r3","Premium Suite","suite",8500,"An elegant suite featuring a separate living area, premium furnishings, and panoramic city views.",JSON.stringify(["Free Wi-Fi","AC","TV","Mini Bar","Living Area","Room Service","City View","Bathrobe"]),JSON.stringify(["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80"]),4,1,"2026-01-01"],
      ["r4","Royal Presidential Suite","premium",15000,"Our most luxurious offering — a grand suite with private terrace, jacuzzi, and bespoke butler service.",JSON.stringify(["Free Wi-Fi","AC","TV","Mini Bar","Jacuzzi","Private Terrace","Butler Service","Living & Dining Area","King Bed"]),JSON.stringify(["https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80"]),4,1,"2026-01-01"],
      ["r5","Family Room","deluxe",6500,"Extra-spacious room designed for families, with twin beds, a seating area, and child-safe amenities.",JSON.stringify(["Free Wi-Fi","AC","TV","Extra Beds","Room Service","Child Safe","Seating Area"]),JSON.stringify(["https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80"]),5,1,"2026-01-01"],
      ["r6","Pilgrim Standard Room","standard",2500,"Clean and comfortable room ideal for devotees visiting Baba Baidyanath Dham, with essential amenities.",JSON.stringify(["Free Wi-Fi","AC","TV","Attached Bathroom","Room Service"]),JSON.stringify(["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80"]),2,1,"2026-01-01"],
    ].forEach((r) => insertRoom.run(r));

    [
      ["b1","Rajesh Kumar","rajesh@example.com","+91 98765 43210","r2","Deluxe Heritage Room","2026-03-25","2026-03-28",2,"confirmed",16500,"2026-03-20"],
      ["b2","Priya Sharma","priya@example.com","+91 87654 32100","r3","Premium Suite","2026-03-22","2026-03-24",3,"checked-in",17000,"2026-03-18"],
      ["b3","Amit Patel","amit@example.com","+91 76543 21098","r1","Classic Comfort Room","2026-03-15","2026-03-17",1,"checked-out",7000,"2026-03-10"],
    ].forEach((b) => insertBooking.run(b));

    [
      ["g1","https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80","Luxury hotel suite","rooms",1],
      ["g2","https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80","Hotel pool and courtyard","exterior",2],
      ["g3","https://images.unsplash.com/photo-1544148103-0773bf10d330?w=600&q=80","Fine dining restaurant","dining",3],
      ["g4","https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80","Hotel exterior at dusk","exterior",4],
      ["g5","https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&q=80","Spa wellness area","spa",5],
      ["g6","https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80","Grand lobby with chandelier","exterior",6],
    ].forEach((g) => insertGallery.run(g));

    [
      ["t1","Sunita Devi","Patna, Bihar",5,"Absolutely wonderful stay! The hotel is beautifully maintained and the staff made our pilgrimage trip so comfortable. The temple is just a short walk away.",1,"2026-02-15"],
      ["t2","Vikram Singh","New Delhi",5,"World-class hospitality in Deoghar. The rooms are spacious, food is excellent, and the spa is incredibly relaxing after a long day of sightseeing.",1,"2026-02-20"],
      ["t3","Meera Joshi","Mumbai, Maharashtra",4,"Great location near Baidyanath temple. The family room was perfect for us with two kids. Will definitely return during Shravan.",1,"2026-03-01"],
      ["t4","Anand Tiwari","Ranchi, Jharkhand",5,"Best hotel in Deoghar without a doubt. The food quality is outstanding and the wellness centre helped me truly unwind.",0,"2026-03-10"],
    ].forEach((t) => insertTestimonial.run(t));

    [
      ["o1","Rooms and Suites","Dreamlike rest","Choose from our collection of elegantly appointed rooms and suites, each thoughtfully designed with a blend of traditional Jharkhandi aesthetics and modern luxury. From cosy pilgrim rooms to grand presidential suites, every stay is an experience.","https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80","Luxury hotel room with elegant furnishings",1,1],
      ["o2","Cuisine","Authentic flavours, crafted with love","Savour exquisite North Indian and Jharkhandi cuisine prepared by our master chefs. From pure vegetarian thalis for devotees to a lavish multi-cuisine buffet, every meal at The Deoghar Grand is a celebration of regional flavours.","https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80","Fine dining with Indian cuisine",2,1],
      ["o3","Events and Celebrations","Grand occasions, flawless execution","From sacred ceremonies and grand weddings to corporate conferences and private banquets, our Grand Ballroom and banquet halls provide the perfect setting. Our dedicated events team ensures every detail is impeccable.","https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80","Elegant event hall with luxurious decoration",3,1],
      ["o4","Spa & Wellness","Rejuvenate body and soul","Unwind at Shanti Wellness Centre, our tranquil urban retreat. Enjoy Ayurvedic treatments, modern spa therapies, a fully equipped fitness centre, and yoga sessions — all designed to restore your inner balance.","https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=1200&q=80","Spa and wellness area",4,1],
    ].forEach((o) => insertOffering.run(o));

    [
      ["e1","Pilgrimage Experience","Guided visits to Baba Baidyanath Dham, Basukinath, and nearby sacred sites. Includes VIP darshan assistance, prasad arrangements, and spiritual counselling.","https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",2500,1],
      ["e2","Cultural Heritage Tour","Explore Trikut Hill, Nandan Pahar, Tapovan, and Satsang Ashram. Discover the rich cultural heritage of Deoghar with our expert local guides.","https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=800&q=80",3000,1],
      ["e3","Family Spiritual Retreat","A holistic family package combining temple visits, nature excursions, yoga sessions, and kid-friendly activities. Create lasting memories in the lap of spirituality.","https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80",5000,1],
    ].forEach((e) => insertExperience.run(e));

    [
      ["s1","Rahul Sharma","rahul@example.com","2026-02-01"],
      ["s2","Kavita Kumari","kavita@example.com","2026-02-15"],
    ].forEach((s) => insertSubscriber.run(s));

    [
      ["a1","Shravan season reservations are now open with temple-transfer packages.","offer",1,"2026-05-01","2026-08-31"],
      ["a2","Live devotional music every Saturday evening in the courtyard lounge.","event",1,"2026-01-01","2026-12-31"],
    ].forEach((a) => insertAnnouncement.run(a));
  })();
}

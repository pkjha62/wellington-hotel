/**
 * SQLite-backed store - all data persists to hotel.db in the project root.
 * All function signatures are identical to the previous in-memory version.
 */
import {
  getDb,
  toRoom, toBooking, toGalleryImage, toTestimonial,
  toOffering, toExperience, toSubscriber, toAnnouncement, toSettings,
} from "@/lib/db";
import type {
  Room, Booking, GalleryImage, Testimonial,
  Offering, Experience, Subscriber, SiteSettings,
  Announcement,
} from "@/types";

function genId() {
  return Math.random().toString(36).substring(2, 10);
}

// Settings
export function getSettings(): SiteSettings {
  const db = getDb();
  const row = db.prepare("SELECT * FROM settings WHERE id = 'main'").get() as Record<string, unknown>;
  return toSettings(row);
}
export function updateSettings(data: Partial<SiteSettings>): SiteSettings {
  const db = getDb();
  const fields = Object.keys(data).map((k) => `${k} = @${k}`).join(", ");
  db.prepare(`UPDATE settings SET ${fields} WHERE id = 'main'`).run(data);
  return getSettings();
}

// Rooms
export function getRooms(): Room[] {
  const db = getDb();
  return (db.prepare("SELECT * FROM rooms ORDER BY createdAt").all() as Record<string, unknown>[]).map(toRoom);
}
export function getRoom(id: string): Room | undefined {
  const db = getDb();
  const row = db.prepare("SELECT * FROM rooms WHERE id = ?").get(id) as Record<string, unknown> | undefined;
  return row ? toRoom(row) : undefined;
}
export function addRoom(data: Omit<Room, "id" | "createdAt">): Room {
  const db = getDb();
  const id = genId();
  const createdAt = new Date().toISOString().split("T")[0];
  db.prepare(
    "INSERT INTO rooms (id,name,type,price,description,amenities,images,maxGuests,isAvailable,createdAt) VALUES (?,?,?,?,?,?,?,?,?,?)"
  ).run(id, data.name, data.type, data.price, data.description,
    JSON.stringify(data.amenities), JSON.stringify(data.images),
    data.maxGuests, data.isAvailable ? 1 : 0, createdAt);
  return getRoom(id)!;
}
export function updateRoom(id: string, data: Partial<Room>): Room | null {
  const db = getDb();
  const current = getRoom(id);
  if (!current) return null;
  const merged = { ...current, ...data };
  db.prepare(
    "UPDATE rooms SET name=?,type=?,price=?,description=?,amenities=?,images=?,maxGuests=?,isAvailable=? WHERE id=?"
  ).run(merged.name, merged.type, merged.price, merged.description,
    JSON.stringify(merged.amenities), JSON.stringify(merged.images),
    merged.maxGuests, merged.isAvailable ? 1 : 0, id);
  return getRoom(id)!;
}
export function deleteRoom(id: string): boolean {
  const db = getDb();
  return db.prepare("DELETE FROM rooms WHERE id = ?").run(id).changes > 0;
}

// Bookings
export function getBookings(): Booking[] {
  const db = getDb();
  return (db.prepare("SELECT * FROM bookings ORDER BY createdAt DESC").all() as Record<string, unknown>[]).map(toBooking);
}
export function getBooking(id: string): Booking | undefined {
  const db = getDb();
  const row = db.prepare("SELECT * FROM bookings WHERE id = ?").get(id) as Record<string, unknown> | undefined;
  return row ? toBooking(row) : undefined;
}
export function addBooking(data: Omit<Booking, "id" | "createdAt">): Booking {
  const db = getDb();
  const id = genId();
  const createdAt = new Date().toISOString().split("T")[0];
  db.prepare(
    "INSERT INTO bookings (id,guestName,guestEmail,guestPhone,roomId,roomName,checkIn,checkOut,guests,status,totalAmount,createdAt) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)"
  ).run(id, data.guestName, data.guestEmail, data.guestPhone,
    data.roomId, data.roomName, data.checkIn, data.checkOut,
    data.guests, data.status, data.totalAmount, createdAt);
  return getBooking(id)!;
}
export function updateBooking(id: string, data: Partial<Booking>): Booking | null {
  const db = getDb();
  const current = getBooking(id);
  if (!current) return null;
  const merged = { ...current, ...data };
  db.prepare(
    "UPDATE bookings SET guestName=?,guestEmail=?,guestPhone=?,roomId=?,roomName=?,checkIn=?,checkOut=?,guests=?,status=?,totalAmount=? WHERE id=?"
  ).run(merged.guestName, merged.guestEmail, merged.guestPhone,
    merged.roomId, merged.roomName, merged.checkIn, merged.checkOut,
    merged.guests, merged.status, merged.totalAmount, id);
  return getBooking(id)!;
}
export function deleteBooking(id: string): boolean {
  const db = getDb();
  return db.prepare("DELETE FROM bookings WHERE id = ?").run(id).changes > 0;
}

// Gallery
export function getGallery(): GalleryImage[] {
  const db = getDb();
  return (db.prepare('SELECT * FROM gallery ORDER BY "order"').all() as Record<string, unknown>[]).map(toGalleryImage);
}
export function addGalleryImage(data: Omit<GalleryImage, "id">): GalleryImage {
  const db = getDb();
  const id = genId();
  db.prepare('INSERT INTO gallery (id,src,alt,category,"order") VALUES (?,?,?,?,?)').run(
    id, data.src, data.alt, data.category, data.order);
  return toGalleryImage(db.prepare("SELECT * FROM gallery WHERE id = ?").get(id) as Record<string, unknown>);
}
export function updateGalleryImage(id: string, data: Partial<GalleryImage>): GalleryImage | null {
  const db = getDb();
  const current = db.prepare("SELECT * FROM gallery WHERE id = ?").get(id) as Record<string, unknown> | undefined;
  if (!current) return null;
  const merged = { ...toGalleryImage(current), ...data };
  db.prepare('UPDATE gallery SET src=?,alt=?,category=?,"order"=? WHERE id=?').run(
    merged.src, merged.alt, merged.category, merged.order, id);
  return toGalleryImage(db.prepare("SELECT * FROM gallery WHERE id = ?").get(id) as Record<string, unknown>);
}
export function deleteGalleryImage(id: string): boolean {
  const db = getDb();
  return db.prepare("DELETE FROM gallery WHERE id = ?").run(id).changes > 0;
}

// Testimonials
export function getTestimonials(onlyApproved = false): Testimonial[] {
  const db = getDb();
  const sql = onlyApproved
    ? "SELECT * FROM testimonials WHERE approved = 1 ORDER BY createdAt DESC"
    : "SELECT * FROM testimonials ORDER BY createdAt DESC";
  return (db.prepare(sql).all() as Record<string, unknown>[]).map(toTestimonial);
}
export function addTestimonial(data: Omit<Testimonial, "id" | "createdAt">): Testimonial {
  const db = getDb();
  const id = genId();
  const createdAt = new Date().toISOString().split("T")[0];
  db.prepare(
    "INSERT INTO testimonials (id,guestName,location,rating,comment,approved,createdAt) VALUES (?,?,?,?,?,?,?)"
  ).run(id, data.guestName, data.location, data.rating, data.comment, data.approved ? 1 : 0, createdAt);
  return toTestimonial(db.prepare("SELECT * FROM testimonials WHERE id = ?").get(id) as Record<string, unknown>);
}
export function updateTestimonial(id: string, data: Partial<Testimonial>): Testimonial | null {
  const db = getDb();
  const current = db.prepare("SELECT * FROM testimonials WHERE id = ?").get(id) as Record<string, unknown> | undefined;
  if (!current) return null;
  const merged = { ...toTestimonial(current), ...data };
  db.prepare(
    "UPDATE testimonials SET guestName=?,location=?,rating=?,comment=?,approved=? WHERE id=?"
  ).run(merged.guestName, merged.location, merged.rating, merged.comment, merged.approved ? 1 : 0, id);
  return toTestimonial(db.prepare("SELECT * FROM testimonials WHERE id = ?").get(id) as Record<string, unknown>);
}
export function deleteTestimonial(id: string): boolean {
  const db = getDb();
  return db.prepare("DELETE FROM testimonials WHERE id = ?").run(id).changes > 0;
}

// Offerings
export function getOfferings(onlyVisible = false): Offering[] {
  const db = getDb();
  const sql = onlyVisible
    ? 'SELECT * FROM offerings WHERE visible = 1 ORDER BY "order"'
    : 'SELECT * FROM offerings ORDER BY "order"';
  return (db.prepare(sql).all() as Record<string, unknown>[]).map(toOffering);
}
export function addOffering(data: Omit<Offering, "id">): Offering {
  const db = getDb();
  const id = genId();
  db.prepare(
    'INSERT INTO offerings (id,title,subtitle,description,image,imageAlt,"order",visible) VALUES (?,?,?,?,?,?,?,?)'
  ).run(id, data.title, data.subtitle, data.description, data.image, data.imageAlt, data.order, data.visible ? 1 : 0);
  return toOffering(db.prepare("SELECT * FROM offerings WHERE id = ?").get(id) as Record<string, unknown>);
}
export function updateOffering(id: string, data: Partial<Offering>): Offering | null {
  const db = getDb();
  const current = db.prepare("SELECT * FROM offerings WHERE id = ?").get(id) as Record<string, unknown> | undefined;
  if (!current) return null;
  const merged = { ...toOffering(current), ...data };
  db.prepare(
    'UPDATE offerings SET title=?,subtitle=?,description=?,image=?,imageAlt=?,"order"=?,visible=? WHERE id=?'
  ).run(merged.title, merged.subtitle, merged.description, merged.image, merged.imageAlt, merged.order, merged.visible ? 1 : 0, id);
  return toOffering(db.prepare("SELECT * FROM offerings WHERE id = ?").get(id) as Record<string, unknown>);
}
export function deleteOffering(id: string): boolean {
  const db = getDb();
  return db.prepare("DELETE FROM offerings WHERE id = ?").run(id).changes > 0;
}

// Experiences
export function getExperiences(onlyVisible = false): Experience[] {
  const db = getDb();
  const sql = onlyVisible
    ? "SELECT * FROM experiences WHERE visible = 1"
    : "SELECT * FROM experiences";
  return (db.prepare(sql).all() as Record<string, unknown>[]).map(toExperience);
}
export function addExperience(data: Omit<Experience, "id">): Experience {
  const db = getDb();
  const id = genId();
  db.prepare(
    "INSERT INTO experiences (id,title,description,image,price,visible) VALUES (?,?,?,?,?,?)"
  ).run(id, data.title, data.description, data.image, data.price, data.visible ? 1 : 0);
  return toExperience(db.prepare("SELECT * FROM experiences WHERE id = ?").get(id) as Record<string, unknown>);
}
export function updateExperience(id: string, data: Partial<Experience>): Experience | null {
  const db = getDb();
  const current = db.prepare("SELECT * FROM experiences WHERE id = ?").get(id) as Record<string, unknown> | undefined;
  if (!current) return null;
  const merged = { ...toExperience(current), ...data };
  db.prepare(
    "UPDATE experiences SET title=?,description=?,image=?,price=?,visible=? WHERE id=?"
  ).run(merged.title, merged.description, merged.image, merged.price, merged.visible ? 1 : 0, id);
  return toExperience(db.prepare("SELECT * FROM experiences WHERE id = ?").get(id) as Record<string, unknown>);
}
export function deleteExperience(id: string): boolean {
  const db = getDb();
  return db.prepare("DELETE FROM experiences WHERE id = ?").run(id).changes > 0;
}

// Subscribers
export function getSubscribers(): Subscriber[] {
  const db = getDb();
  return (db.prepare("SELECT * FROM subscribers ORDER BY subscribedAt DESC").all() as Record<string, unknown>[]).map(toSubscriber);
}
export function addSubscriber(data: Omit<Subscriber, "id" | "subscribedAt">): Subscriber | null {
  const db = getDb();
  try {
    const id = genId();
    const subscribedAt = new Date().toISOString().split("T")[0];
    db.prepare("INSERT INTO subscribers (id,name,email,subscribedAt) VALUES (?,?,?,?)").run(
      id, data.name, data.email, subscribedAt);
    return toSubscriber(db.prepare("SELECT * FROM subscribers WHERE id = ?").get(id) as Record<string, unknown>);
  } catch {
    return null; // UNIQUE constraint - duplicate email
  }
}
export function deleteSubscriber(id: string): boolean {
  const db = getDb();
  return db.prepare("DELETE FROM subscribers WHERE id = ?").run(id).changes > 0;
}

// Announcements
export function getAnnouncements(onlyActive = false): Announcement[] {
  const db = getDb();
  const sql = onlyActive
    ? "SELECT * FROM announcements WHERE active = 1 ORDER BY startDate"
    : "SELECT * FROM announcements ORDER BY startDate";
  return (db.prepare(sql).all() as Record<string, unknown>[]).map(toAnnouncement);
}
export function addAnnouncement(data: Omit<Announcement, "id">): Announcement {
  const db = getDb();
  const id = genId();
  db.prepare(
    "INSERT INTO announcements (id,text,type,active,startDate,endDate) VALUES (?,?,?,?,?,?)"
  ).run(id, data.text, data.type, data.active ? 1 : 0, data.startDate, data.endDate);
  return toAnnouncement(db.prepare("SELECT * FROM announcements WHERE id = ?").get(id) as Record<string, unknown>);
}
export function updateAnnouncement(id: string, data: Partial<Announcement>): Announcement | null {
  const db = getDb();
  const current = db.prepare("SELECT * FROM announcements WHERE id = ?").get(id) as Record<string, unknown> | undefined;
  if (!current) return null;
  const merged = { ...toAnnouncement(current), ...data };
  db.prepare(
    "UPDATE announcements SET text=?,type=?,active=?,startDate=?,endDate=? WHERE id=?"
  ).run(merged.text, merged.type, merged.active ? 1 : 0, merged.startDate, merged.endDate, id);
  return toAnnouncement(db.prepare("SELECT * FROM announcements WHERE id = ?").get(id) as Record<string, unknown>);
}
export function deleteAnnouncement(id: string): boolean {
  const db = getDb();
  return db.prepare("DELETE FROM announcements WHERE id = ?").run(id).changes > 0;
}

// Stats helper used by admin dashboard
export function getStats() {
  const db = getDb();
  const totalRooms = (db.prepare("SELECT COUNT(*) as c FROM rooms").get() as { c: number }).c;
  const availableRooms = (db.prepare("SELECT COUNT(*) as c FROM rooms WHERE isAvailable = 1").get() as { c: number }).c;
  const totalBookings = (db.prepare("SELECT COUNT(*) as c FROM bookings").get() as { c: number }).c;
  const activeBookings = (db.prepare("SELECT COUNT(*) as c FROM bookings WHERE status IN ('confirmed','checked-in')").get() as { c: number }).c;
  const totalSubscribers = (db.prepare("SELECT COUNT(*) as c FROM subscribers").get() as { c: number }).c;
  const activeAnnouncements = (db.prepare("SELECT COUNT(*) as c FROM announcements WHERE active = 1").get() as { c: number }).c;
  const totalRevenue = (db.prepare("SELECT COALESCE(SUM(totalAmount), 0) as total FROM bookings WHERE status != 'cancelled'").get() as { total: number }).total;
  const totalTestimonials = (db.prepare("SELECT COUNT(*) as c FROM testimonials WHERE approved = 1").get() as { c: number }).c;
  const pendingTestimonials = (db.prepare("SELECT COUNT(*) as c FROM testimonials WHERE approved = 0").get() as { c: number }).c;

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

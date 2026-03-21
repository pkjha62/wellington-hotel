import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

export const roomSchema = z.object({
  name: z.string().min(3),
  type: z.enum(["standard", "deluxe", "suite", "premium"]),
  price: z.coerce.number().positive(),
  description: z.string().min(20),
  amenities: z.array(z.string().min(1)).min(1),
  images: z.array(z.string().url()).min(1),
  maxGuests: z.coerce.number().int().positive(),
  isAvailable: z.boolean(),
});

export const bookingSchema = z.object({
  guestName: z.string().min(2),
  guestEmail: z.string().email(),
  guestPhone: z.string().min(10),
  roomId: z.string().min(1),
  roomName: z.string().min(1),
  checkIn: z.string().min(1),
  checkOut: z.string().min(1),
  guests: z.coerce.number().int().positive(),
  status: z.enum(["confirmed", "checked-in", "checked-out", "cancelled"]),
  totalAmount: z.coerce.number().nonnegative(),
});

export const publicBookingSchema = bookingSchema.omit({ status: true, totalAmount: true, roomName: true });

export const galleryImageSchema = z.object({
  src: z.string().url(),
  alt: z.string().min(3),
  category: z.enum(["rooms", "dining", "exterior", "events", "spa", "temple"]),
  order: z.coerce.number().int().nonnegative(),
});

export const testimonialSchema = z.object({
  guestName: z.string().min(2),
  location: z.string().min(2),
  rating: z.coerce.number().min(1).max(5),
  comment: z.string().min(10),
  approved: z.boolean(),
});

export const offeringSchema = z.object({
  title: z.string().min(3),
  subtitle: z.string().min(3),
  description: z.string().min(20),
  image: z.string().url(),
  imageAlt: z.string().min(3),
  order: z.coerce.number().int().nonnegative(),
  visible: z.boolean(),
});

export const experienceSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(20),
  image: z.string().url(),
  price: z.coerce.number().nonnegative(),
  visible: z.boolean(),
});

export const subscriberSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

export const settingsSchema = z.object({
  hotelName: z.string().min(3),
  subtitle: z.string().min(2),
  phone: z.string().min(7),
  email: z.string().email(),
  address: z.string().min(5),
  city: z.string().min(2),
  pincode: z.string().min(4),
  heroImage: z.string().url(),
  heroHeadline: z.string().min(10),
  heroSubheadline: z.string().min(3),
  introTitle: z.string().min(10),
  introSubtitle: z.string().min(3),
  introBody: z.string().min(20),
  instagramHandle: z.string().min(2),
  facebookUrl: z.string().url().or(z.literal("#")),
  instagramUrl: z.string().url().or(z.literal("#")),
  twitterUrl: z.string().url().or(z.literal("#")),
});

export const announcementSchema = z.object({
  text: z.string().min(5),
  type: z.enum(["info", "offer", "event"]),
  active: z.boolean(),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
});

import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

export const roomSchema = z.object({
  name: z.string().min(3).max(100),
  type: z.enum(["standard", "deluxe", "suite", "premium"]),
  price: z.coerce.number().positive(),
  description: z.string().min(20).max(2000),
  amenities: z.array(z.string().min(1)).min(1).max(30),
  images: z.array(z.string().min(1)).min(1).max(20),
  maxGuests: z.coerce.number().int().positive(),
  isAvailable: z.boolean(),
});

const bookingBase = z.object({
  guestName: z.string().min(2),
  guestEmail: z.string().email(),
  guestPhone: z.string().min(10).regex(/^\+?[\d\s\-()]{7,15}$/, "Invalid phone number"),
  roomId: z.string().min(1),
  roomName: z.string().min(1),
  checkIn: z.string().min(1),
  checkOut: z.string().min(1),
  guests: z.coerce.number().int().positive(),
  status: z.enum(["confirmed", "checked-in", "checked-out", "cancelled"]),
  totalAmount: z.coerce.number().nonnegative(),
});

const checkOutAfterCheckIn = (d: { checkIn: string; checkOut: string }) =>
  new Date(d.checkOut) > new Date(d.checkIn);

export const bookingSchema = bookingBase.refine(checkOutAfterCheckIn, {
  message: "Check-out must be after check-in",
  path: ["checkOut"],
});

export const publicBookingBase = bookingBase
  .omit({ status: true, totalAmount: true, roomName: true });

export const publicBookingSchema = publicBookingBase
  .refine(checkOutAfterCheckIn, {
    message: "Check-out must be after check-in",
    path: ["checkOut"],
  });

export const galleryImageSchema = z.object({
  src: z.string().min(1),
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
  image: z.string().min(1),
  imageAlt: z.string().min(3),
  order: z.coerce.number().int().nonnegative(),
  visible: z.boolean(),
});

export const experienceSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(20),
  image: z.string().min(1),
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
  heroImage: z.string().min(1),
  heroVideo: z.string().min(1).or(z.literal("")),
  heroHeadline: z.string().min(10),
  heroSubheadline: z.string().min(3),
  introTitle: z.string().min(10),
  introSubtitle: z.string().min(3),
  introBody: z.string().min(20),
  instagramHandle: z.string().min(2),
  facebookUrl: z.string().url().or(z.literal("#")),
  instagramUrl: z.string().url().or(z.literal("#")),
  twitterUrl: z.string().url().or(z.literal("#")),
  whatsappNumber: z.string().min(7),
  metaTitle: z.string().min(5),
  metaDescription: z.string().min(10),
  ogImage: z.string().min(1),
  roomsHeroImage: z.string().min(1).or(z.literal("")),
  diningHeroImage: z.string().min(1).or(z.literal("")),
  spaHeroImage: z.string().min(1).or(z.literal("")),
  eventsHeroImage: z.string().min(1).or(z.literal("")),
  contactHeroImage: z.string().min(1).or(z.literal("")),
  galleryTitle: z.string().min(2),
  testimonialsTitle: z.string().min(2),
  experiencesTitle: z.string().min(2),
  offersTitle: z.string().min(2),
  newsletterTitle: z.string().min(2),
  newsletterDescription: z.string().min(5),
  mapLatitude: z.string(),
  mapLongitude: z.string(),
  locationDescription: z.string().min(5),
});

export const announcementSchema = z.object({
  text: z.string().min(5).max(500),
  type: z.enum(["info", "offer", "event"]),
  active: z.boolean(),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
}).refine(d => new Date(d.endDate) >= new Date(d.startDate), {
  message: "End date must be on or after start date",
  path: ["endDate"],
});

export const faqSchema = z.object({
  question: z.string().min(5).max(300),
  answer: z.string().min(10).max(2000),
  category: z.enum(["general", "bookings", "rooms", "dining", "spa", "events", "temple", "transport"]),
  order: z.coerce.number().int().nonnegative(),
  visible: z.boolean(),
});

export const specialOfferSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().min(10).max(2000),
  price: z.coerce.number().positive(),
  image: z.string().min(1),
  validFrom: z.string().min(1),
  validTo: z.string().min(1),
  visible: z.boolean(),
}).refine(d => new Date(d.validTo) >= new Date(d.validFrom), {
  message: "Valid-to date must be on or after valid-from date",
  path: ["validTo"],
});

export const statFactSchema = z.object({
  label: z.string().min(2),
  value: z.coerce.number().nonnegative(),
  suffix: z.string(),
  order: z.coerce.number().int().nonnegative(),
  visible: z.boolean(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6),
});

export const diningVenueSchema = z.object({
  name: z.string().min(3),
  cuisine: z.string().min(2),
  description: z.string().min(20),
  image: z.string().min(1),
  hours: z.string().min(3),
  order: z.coerce.number().int().nonnegative(),
  visible: z.boolean(),
});

export const spaServiceSchema = z.object({
  name: z.string().min(3),
  category: z.string().min(2),
  description: z.string().min(20),
  duration: z.string().min(2),
  price: z.coerce.number().nonnegative(),
  image: z.string().min(1),
  order: z.coerce.number().int().nonnegative(),
  visible: z.boolean(),
});

export const eventVenueSchema = z.object({
  name: z.string().min(3),
  capacity: z.string().min(2),
  description: z.string().min(20),
  image: z.string().min(1),
  features: z.array(z.string().min(1)).min(1),
  order: z.coerce.number().int().nonnegative(),
  visible: z.boolean(),
});

export const contactEnquirySchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(7).regex(/^\+?[\d\s\-()]{7,15}$/, "Invalid phone number"),
  subject: z.string().min(3).max(200),
  message: z.string().min(10).max(5000),
});

export const contactEnquiryAdminSchema = contactEnquirySchema.extend({
  status: z.enum(["new", "read", "replied"]),
});

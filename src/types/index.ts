export interface Room {
  id: string;
  name: string;
  type: "standard" | "deluxe" | "suite" | "premium";
  price: number;
  description: string;
  amenities: string[];
  images: string[];
  maxGuests: number;
  isAvailable: boolean;
  createdAt: string;
}

export interface Booking {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: "confirmed" | "checked-in" | "checked-out" | "cancelled";
  totalAmount: number;
  createdAt: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: "rooms" | "dining" | "exterior" | "events" | "spa" | "temple";
  order: number;
}

export interface Testimonial {
  id: string;
  guestName: string;
  location: string;
  rating: number;
  comment: string;
  approved: boolean;
  createdAt: string;
}

export interface Offering {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  order: number;
  visible: boolean;
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  visible: boolean;
}

export interface Subscriber {
  id: string;
  name: string;
  email: string;
  subscribedAt: string;
}

export interface Announcement {
  id: string;
  text: string;
  type: "info" | "offer" | "event";
  active: boolean;
  startDate: string;
  endDate: string;
}

export interface SiteSettings {
  hotelName: string;
  subtitle: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  heroImage: string;
  heroVideo: string;
  heroHeadline: string;
  heroSubheadline: string;
  introTitle: string;
  introSubtitle: string;
  introBody: string;
  instagramHandle: string;
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  whatsappNumber: string;
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  /* Page hero images */
  roomsHeroImage: string;
  diningHeroImage: string;
  spaHeroImage: string;
  eventsHeroImage: string;
  contactHeroImage: string;
  /* Section titles */
  galleryTitle: string;
  testimonialsTitle: string;
  experiencesTitle: string;
  offersTitle: string;
  newsletterTitle: string;
  newsletterDescription: string;
  /* Location */
  mapLatitude: string;
  mapLongitude: string;
  locationDescription: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: "general" | "bookings" | "rooms" | "dining" | "spa" | "events" | "temple" | "transport";
  order: number;
  visible: boolean;
}

export interface SpecialOffer {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  validFrom: string;
  validTo: string;
  visible: boolean;
}

export interface StatFact {
  id: string;
  label: string;
  value: number;
  suffix: string;
  order: number;
  visible: boolean;
}

export interface DiningVenue {
  id: string;
  name: string;
  cuisine: string;
  description: string;
  image: string;
  hours: string;
  order: number;
  visible: boolean;
}

export interface SpaService {
  id: string;
  name: string;
  category: string;
  description: string;
  duration: string;
  price: number;
  image: string;
  order: number;
  visible: boolean;
}

export interface EventVenue {
  id: string;
  name: string;
  capacity: string;
  description: string;
  image: string;
  features: string[];
  order: number;
  visible: boolean;
}

export interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: string;
}

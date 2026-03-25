import { describe, it, expect } from "vitest";
import {
  loginSchema,
  roomSchema,
  bookingSchema,
  publicBookingSchema,
  galleryImageSchema,
  testimonialSchema,
  subscriberSchema,
  announcementSchema,
  faqSchema,
  specialOfferSchema,
  contactEnquirySchema,
  changePasswordSchema,
  diningVenueSchema,
  spaServiceSchema,
  eventVenueSchema,
  statFactSchema,
} from "@/lib/schemas";

describe("loginSchema", () => {
  it("accepts valid credentials", () => {
    expect(loginSchema.safeParse({ username: "admin", password: "securePass" }).success).toBe(true);
  });

  it("rejects short username", () => {
    expect(loginSchema.safeParse({ username: "ab", password: "securePass" }).success).toBe(false);
  });

  it("rejects short password", () => {
    expect(loginSchema.safeParse({ username: "admin", password: "12345" }).success).toBe(false);
  });
});

describe("roomSchema", () => {
  const valid = {
    name: "Deluxe Suite",
    type: "deluxe",
    price: 5000,
    description: "A beautifully appointed deluxe room with garden view.",
    amenities: ["Wi-Fi", "AC", "TV"],
    images: ["/img/room1.jpg"],
    maxGuests: 2,
    isAvailable: true,
  };

  it("accepts valid room", () => {
    expect(roomSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects negative price", () => {
    expect(roomSchema.safeParse({ ...valid, price: -100 }).success).toBe(false);
  });

  it("rejects invalid room type", () => {
    expect(roomSchema.safeParse({ ...valid, type: "luxury" }).success).toBe(false);
  });

  it("rejects empty amenities", () => {
    expect(roomSchema.safeParse({ ...valid, amenities: [] }).success).toBe(false);
  });

  it("rejects empty images", () => {
    expect(roomSchema.safeParse({ ...valid, images: [] }).success).toBe(false);
  });

  it("coerces string price to number", () => {
    const result = roomSchema.safeParse({ ...valid, price: "3000" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.price).toBe(3000);
  });
});

describe("bookingSchema", () => {
  const valid = {
    guestName: "John Doe",
    guestEmail: "john@example.com",
    guestPhone: "+91 9876543210",
    roomId: "room-1",
    roomName: "Deluxe Suite",
    checkIn: "2025-08-01",
    checkOut: "2025-08-05",
    guests: 2,
    status: "confirmed",
    totalAmount: 20000,
  };

  it("accepts valid booking", () => {
    expect(bookingSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects checkout before checkin", () => {
    const result = bookingSchema.safeParse({ ...valid, checkOut: "2025-07-30" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    expect(bookingSchema.safeParse({ ...valid, guestEmail: "notanemail" }).success).toBe(false);
  });

  it("rejects invalid phone", () => {
    expect(bookingSchema.safeParse({ ...valid, guestPhone: "abc" }).success).toBe(false);
  });
});

describe("publicBookingSchema", () => {
  const valid = {
    guestName: "Jane Doe",
    guestEmail: "jane@example.com",
    guestPhone: "9876543210",
    roomId: "room-1",
    checkIn: "2025-08-10",
    checkOut: "2025-08-12",
    guests: 1,
  };

  it("accepts valid public booking (no status/totalAmount/roomName)", () => {
    expect(publicBookingSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects checkout before checkin", () => {
    const result = publicBookingSchema.safeParse({ ...valid, checkOut: "2025-08-09" });
    expect(result.success).toBe(false);
  });
});

describe("galleryImageSchema", () => {
  it("accepts valid gallery image", () => {
    expect(galleryImageSchema.safeParse({ src: "/img.jpg", alt: "Hotel exterior", category: "exterior", order: 0 }).success).toBe(true);
  });

  it("rejects invalid category", () => {
    expect(galleryImageSchema.safeParse({ src: "/img.jpg", alt: "Photo", category: "pool", order: 0 }).success).toBe(false);
  });
});

describe("testimonialSchema", () => {
  it("accepts valid testimonial", () => {
    expect(testimonialSchema.safeParse({ guestName: "Alice", location: "Delhi", rating: 5, comment: "Wonderful stay at the hotel!", approved: true }).success).toBe(true);
  });

  it("rejects rating above 5", () => {
    expect(testimonialSchema.safeParse({ guestName: "Alice", location: "Delhi", rating: 6, comment: "Wonderful stay!", approved: true }).success).toBe(false);
  });

  it("rejects rating below 1", () => {
    expect(testimonialSchema.safeParse({ guestName: "Alice", location: "Delhi", rating: 0, comment: "Wonderful stay!", approved: true }).success).toBe(false);
  });
});

describe("subscriberSchema", () => {
  it("accepts valid subscriber", () => {
    expect(subscriberSchema.safeParse({ name: "Bob", email: "bob@example.com" }).success).toBe(true);
  });

  it("rejects invalid email", () => {
    expect(subscriberSchema.safeParse({ name: "Bob", email: "notemail" }).success).toBe(false);
  });
});

describe("announcementSchema", () => {
  it("accepts valid announcement", () => {
    expect(announcementSchema.safeParse({ text: "Summer sale is here!", type: "offer", active: true, startDate: "2025-06-01", endDate: "2025-06-30" }).success).toBe(true);
  });

  it("rejects endDate before startDate", () => {
    expect(announcementSchema.safeParse({ text: "Summer sale!", type: "offer", active: true, startDate: "2025-06-30", endDate: "2025-06-01" }).success).toBe(false);
  });
});

describe("faqSchema", () => {
  it("accepts valid FAQ", () => {
    expect(faqSchema.safeParse({ question: "What is check-in time?", answer: "Check-in is at 2 PM daily.", category: "general", order: 0, visible: true }).success).toBe(true);
  });

  it("rejects invalid category", () => {
    expect(faqSchema.safeParse({ question: "What time?", answer: "At two pm.", category: "invalid", order: 0, visible: true }).success).toBe(false);
  });
});

describe("specialOfferSchema", () => {
  it("accepts valid offer", () => {
    expect(specialOfferSchema.safeParse({ title: "Weekend Deal", description: "Get 20% off on weekend stays at the hotel.", price: 3500, image: "/img.jpg", validFrom: "2025-07-01", validTo: "2025-07-31", visible: true }).success).toBe(true);
  });

  it("rejects validTo before validFrom", () => {
    expect(specialOfferSchema.safeParse({ title: "Weekend Deal", description: "Get 20% off on all stays.", price: 3500, image: "/img.jpg", validFrom: "2025-07-31", validTo: "2025-07-01", visible: true }).success).toBe(false);
  });
});

describe("contactEnquirySchema", () => {
  it("accepts valid enquiry", () => {
    expect(contactEnquirySchema.safeParse({ name: "Alice", email: "alice@example.com", phone: "+91 1234567890", subject: "Room inquiry", message: "I would like to know more about your rooms." }).success).toBe(true);
  });

  it("rejects missing subject", () => {
    expect(contactEnquirySchema.safeParse({ name: "Alice", email: "alice@example.com", phone: "+91 1234567890", message: "Hello there long enough message." }).success).toBe(false);
  });
});

describe("changePasswordSchema", () => {
  it("accepts valid password change", () => {
    expect(changePasswordSchema.safeParse({ currentPassword: "oldPass1", newPassword: "newPass1" }).success).toBe(true);
  });

  it("rejects short new password", () => {
    expect(changePasswordSchema.safeParse({ currentPassword: "oldPass1", newPassword: "12345" }).success).toBe(false);
  });
});

describe("diningVenueSchema", () => {
  it("accepts valid venue", () => {
    expect(diningVenueSchema.safeParse({ name: "The Garden", cuisine: "Indian", description: "A fine dining experience outdoors.", image: "/img.jpg", hours: "12 PM - 10 PM", order: 0, visible: true }).success).toBe(true);
  });
});

describe("spaServiceSchema", () => {
  it("accepts valid spa service", () => {
    expect(spaServiceSchema.safeParse({ name: "Hot Stone", category: "Massage", description: "Relaxing hot stone therapy session.", duration: "60 min", price: 2000, image: "/img.jpg", order: 0, visible: true }).success).toBe(true);
  });
});

describe("eventVenueSchema", () => {
  it("accepts valid event venue", () => {
    expect(eventVenueSchema.safeParse({ name: "Grand Hall", capacity: "500 guests", description: "A large venue for weddings and events.", image: "/img.jpg", features: ["Stage", "Lighting"], order: 0, visible: true }).success).toBe(true);
  });

  it("rejects empty features", () => {
    expect(eventVenueSchema.safeParse({ name: "Grand Hall", capacity: "500", description: "A large venue for weddings.", image: "/img.jpg", features: [], order: 0, visible: true }).success).toBe(false);
  });
});

describe("statFactSchema", () => {
  it("accepts valid stat fact", () => {
    expect(statFactSchema.safeParse({ label: "Rooms", value: 100, suffix: "+", order: 0, visible: true }).success).toBe(true);
  });

  it("rejects negative value", () => {
    expect(statFactSchema.safeParse({ label: "Rooms", value: -5, suffix: "+", order: 0, visible: true }).success).toBe(false);
  });
});

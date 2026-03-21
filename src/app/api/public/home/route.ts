import { json } from "@/lib/api";
import {
  getAnnouncements,
  getExperiences,
  getGallery,
  getOfferings,
  getRooms,
  getSettings,
  getTestimonials,
  getStats,
} from "@/lib/store";

export async function GET() {
  return json({
    settings: getSettings(),
    rooms: getRooms().filter((room) => room.isAvailable),
    offerings: getOfferings(true),
    experiences: getExperiences(true),
    gallery: getGallery(),
    testimonials: getTestimonials(true),
    announcements: getAnnouncements(true),
    stats: getStats(),
  });
}

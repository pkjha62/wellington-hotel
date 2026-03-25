import { error, json, parseJson } from "@/lib/api";
import { addBooking, getRoom } from "@/lib/store";
import { publicBookingSchema } from "@/lib/schemas";
import { sendBookingConfirmation } from "@/lib/email";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { csrfCheck } from "@/lib/csrf";

function nightsBetween(checkIn: string, checkOut: string) {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  return Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
}

export async function POST(request: Request) {
  const csrfError = csrfCheck(request);
  if (csrfError) return csrfError;

  const ip = getClientIp(request);
  if (!rateLimit(`booking:${ip}`, 10)) {
    return error("Too many booking requests. Please try again later.", 429);
  }

  const body = await parseJson(request);
  const parsed = publicBookingSchema.safeParse(body);

  if (!parsed.success) {
    return error(parsed.error.issues[0]?.message || "Invalid booking data");
  }

  const room = getRoom(parsed.data.roomId);
  if (!room) {
    return error("Selected room not found.", 404);
  }

  if (!room.isAvailable) {
    return error("Selected room is not available.", 409);
  }

  if (new Date(parsed.data.checkOut) <= new Date(parsed.data.checkIn)) {
    return error("Check-out date must be after check-in date.");
  }

  const nights = nightsBetween(parsed.data.checkIn, parsed.data.checkOut);
  const booking = addBooking({
    ...parsed.data,
    roomName: room.name,
    status: "confirmed",
    totalAmount: room.price * nights,
  });

  // Fire-and-forget — don't wait so the response stays fast
  sendBookingConfirmation(booking).catch(() => {});

  return json({ booking }, { status: 201 });
}

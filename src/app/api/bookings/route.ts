import { error, json, parseJson } from "@/lib/api";
import { addBooking, getRoom } from "@/lib/store";
import { publicBookingSchema } from "@/lib/schemas";
import { sendBookingConfirmation } from "@/lib/email";

function nightsBetween(checkIn: string, checkOut: string) {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  return Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
}

export async function POST(request: Request) {
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

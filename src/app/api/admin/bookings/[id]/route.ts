import { deleteBooking, getBooking, updateBooking } from "@/lib/store";
import { bookingSchema } from "@/lib/schemas";
import { error, json, parseJson, requireAdmin } from "@/lib/api";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) {
    return error("Unauthorized", 401);
  }

  const { id } = await params;
  if (!getBooking(id)) {
    return error("Booking not found", 404);
  }

  const body = await parseJson(request);
  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return error(parsed.error.issues[0]?.message || "Invalid booking data");
  }

  return json(updateBooking(id, parsed.data));
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) {
    return error("Unauthorized", 401);
  }

  const { id } = await params;
  const deleted = deleteBooking(id);
  if (!deleted) {
    return error("Booking not found", 404);
  }

  return json({ success: true });
}

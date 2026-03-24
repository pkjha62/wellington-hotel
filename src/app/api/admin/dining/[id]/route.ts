import { deleteDiningVenue, updateDiningVenue } from "@/lib/store";
import { diningVenueSchema } from "@/lib/schemas";
import { error, json, parseJson, requireAdmin } from "@/lib/api";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return error("Unauthorized", 401);

  const { id } = await params;
  const body = await parseJson(request);
  const parsed = diningVenueSchema.safeParse(body);
  if (!parsed.success) return error(parsed.error.issues[0]?.message || "Invalid dining venue");

  const updated = updateDiningVenue(id, parsed.data);
  if (!updated) return error("Dining venue not found", 404);
  return json(updated);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return error("Unauthorized", 401);

  const { id } = await params;
  const deleted = deleteDiningVenue(id);
  if (!deleted) return error("Dining venue not found", 404);
  return json({ success: true });
}

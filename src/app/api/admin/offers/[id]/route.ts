import { deleteSpecialOffer, updateSpecialOffer } from "@/lib/store";
import { error, json, parseJson, requireAdmin } from "@/lib/api";
import { specialOfferSchema } from "@/lib/schemas";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) {
    return error("Unauthorized", 401);
  }

  const { id } = await params;
  const body = await parseJson(request);
  const parsed = specialOfferSchema.safeParse(body);
  if (!parsed.success) {
    return error(parsed.error.issues[0]?.message || "Invalid offer data");
  }

  const updated = updateSpecialOffer(id, parsed.data);
  if (!updated) {
    return error("Offer not found", 404);
  }

  return json(updated);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) {
    return error("Unauthorized", 401);
  }

  const { id } = await params;
  const deleted = deleteSpecialOffer(id);
  if (!deleted) {
    return error("Offer not found", 404);
  }

  return json({ success: true });
}

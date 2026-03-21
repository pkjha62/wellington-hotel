import { deleteGalleryImage, updateGalleryImage } from "@/lib/store";
import { galleryImageSchema } from "@/lib/schemas";
import { error, json, parseJson, requireAdmin } from "@/lib/api";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) {
    return error("Unauthorized", 401);
  }

  const { id } = await params;
  const body = await parseJson(request);
  const parsed = galleryImageSchema.safeParse(body);
  if (!parsed.success) {
    return error(parsed.error.issues[0]?.message || "Invalid gallery item");
  }

  const updated = updateGalleryImage(id, parsed.data);
  if (!updated) {
    return error("Gallery item not found", 404);
  }

  return json(updated);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) {
    return error("Unauthorized", 401);
  }

  const { id } = await params;
  const deleted = deleteGalleryImage(id);
  if (!deleted) {
    return error("Gallery item not found", 404);
  }

  return json({ success: true });
}

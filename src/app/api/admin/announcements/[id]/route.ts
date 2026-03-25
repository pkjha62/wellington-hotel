import { deleteAnnouncement, updateAnnouncement } from "@/lib/store";
import { announcementSchema } from "@/lib/schemas";
import { error, json, parseJson, requireAdmin } from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) {
    return error("Unauthorized", 401);
  }

  const { id } = await params;
  const body = await parseJson(request);
  const parsed = announcementSchema.safeParse(body);
  if (!parsed.success) {
    return error(parsed.error.issues[0]?.message || "Invalid announcement");
  }

  const updated = updateAnnouncement(id, parsed.data);
  if (!updated) {
    return error("Announcement not found", 404);
  }

  revalidatePath("/", "layout");
  return json(updated);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) {
    return error("Unauthorized", 401);
  }

  const { id } = await params;
  const deleted = deleteAnnouncement(id);
  if (!deleted) {
    return error("Announcement not found", 404);
  }

  revalidatePath("/", "layout");
  return json({ success: true });
}

import { deleteRoom, getRoom, updateRoom } from "@/lib/store";
import { error, json, parseJson, requireAdmin } from "@/lib/api";
import { roomSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) {
    return error("Unauthorized", 401);
  }

  const { id } = await params;
  if (!getRoom(id)) {
    return error("Room not found", 404);
  }

  const body = await parseJson(request);
  const parsed = roomSchema.safeParse(body);
  if (!parsed.success) {
    return error(parsed.error.issues[0]?.message || "Invalid room data");
  }

  const updated = updateRoom(id, parsed.data);
  revalidatePath("/", "layout");
  return json(updated);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) {
    return error("Unauthorized", 401);
  }

  const { id } = await params;
  const deleted = deleteRoom(id);
  if (!deleted) {
    return error("Room not found", 404);
  }

  revalidatePath("/", "layout");
  return json({ success: true });
}

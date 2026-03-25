import { deleteExperience, updateExperience } from "@/lib/store";
import { experienceSchema } from "@/lib/schemas";
import { error, json, parseJson, requireAdmin } from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) {
    return error("Unauthorized", 401);
  }

  const { id } = await params;
  const body = await parseJson(request);
  const parsed = experienceSchema.safeParse(body);
  if (!parsed.success) {
    return error(parsed.error.issues[0]?.message || "Invalid experience");
  }

  const updated = updateExperience(id, parsed.data);
  if (!updated) {
    return error("Experience not found", 404);
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
  const deleted = deleteExperience(id);
  if (!deleted) {
    return error("Experience not found", 404);
  }

  revalidatePath("/", "layout");
  return json({ success: true });
}

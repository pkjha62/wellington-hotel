import { deleteOffering, updateOffering } from "@/lib/store";
import { offeringSchema } from "@/lib/schemas";
import { error, json, parseJson, requireAdmin } from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) {
    return error("Unauthorized", 401);
  }

  const { id } = await params;
  const body = await parseJson(request);
  const parsed = offeringSchema.safeParse(body);
  if (!parsed.success) {
    return error(parsed.error.issues[0]?.message || "Invalid offering");
  }

  const updated = updateOffering(id, parsed.data);
  if (!updated) {
    return error("Offering not found", 404);
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
  const deleted = deleteOffering(id);
  if (!deleted) {
    return error("Offering not found", 404);
  }

  revalidatePath("/", "layout");
  return json({ success: true });
}

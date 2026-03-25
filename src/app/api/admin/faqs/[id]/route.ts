import { deleteFAQ, updateFAQ } from "@/lib/store";
import { error, json, parseJson, requireAdmin } from "@/lib/api";
import { faqSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) {
    return error("Unauthorized", 401);
  }

  const { id } = await params;
  const body = await parseJson(request);
  const parsed = faqSchema.safeParse(body);
  if (!parsed.success) {
    return error(parsed.error.issues[0]?.message || "Invalid FAQ data");
  }

  const updated = updateFAQ(id, parsed.data);
  if (!updated) {
    return error("FAQ not found", 404);
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
  const deleted = deleteFAQ(id);
  if (!deleted) {
    return error("FAQ not found", 404);
  }

  revalidatePath("/", "layout");
  return json({ success: true });
}

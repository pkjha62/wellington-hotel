import { deleteTestimonial, updateTestimonial } from "@/lib/store";
import { testimonialSchema } from "@/lib/schemas";
import { error, json, parseJson, requireAdmin } from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) {
    return error("Unauthorized", 401);
  }

  const { id } = await params;
  const body = await parseJson(request);
  const parsed = testimonialSchema.safeParse(body);
  if (!parsed.success) {
    return error(parsed.error.issues[0]?.message || "Invalid testimonial");
  }

  const updated = updateTestimonial(id, parsed.data);
  if (!updated) {
    return error("Testimonial not found", 404);
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
  const deleted = deleteTestimonial(id);
  if (!deleted) {
    return error("Testimonial not found", 404);
  }

  revalidatePath("/", "layout");
  return json({ success: true });
}

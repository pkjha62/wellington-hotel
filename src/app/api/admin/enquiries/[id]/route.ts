import { deleteContactEnquiry, updateContactEnquiry } from "@/lib/store";
import { contactEnquiryAdminSchema } from "@/lib/schemas";
import { error, json, parseJson, requireAdmin } from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return error("Unauthorized", 401);

  const { id } = await params;
  const body = await parseJson(request);
  const parsed = contactEnquiryAdminSchema.safeParse(body);
  if (!parsed.success) return error(parsed.error.issues[0]?.message || "Invalid enquiry data");

  const updated = updateContactEnquiry(id, parsed.data);
  if (!updated) return error("Enquiry not found", 404);
  revalidatePath("/", "layout");
  return json(updated);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return error("Unauthorized", 401);

  const { id } = await params;
  const deleted = deleteContactEnquiry(id);
  if (!deleted) return error("Enquiry not found", 404);
  revalidatePath("/", "layout");
  return json({ success: true });
}

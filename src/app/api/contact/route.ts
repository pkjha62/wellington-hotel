import { addContactEnquiry } from "@/lib/store";
import { contactEnquirySchema } from "@/lib/schemas";
import { json, error } from "@/lib/api";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactEnquirySchema.safeParse(body);
  if (!parsed.success) return error(parsed.error.issues[0]?.message || "Invalid enquiry data");

  const enquiry = addContactEnquiry(parsed.data);
  return json({ success: true, enquiry }, { status: 201 });
}

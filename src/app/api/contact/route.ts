import { addContactEnquiry } from "@/lib/store";
import { contactEnquirySchema } from "@/lib/schemas";
import { json, error } from "@/lib/api";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { csrfCheck } from "@/lib/csrf";

export async function POST(request: Request) {
  const csrfError = csrfCheck(request);
  if (csrfError) return csrfError;

  const ip = getClientIp(request);
  if (!rateLimit(`contact:${ip}`, 5)) {
    return error("Too many requests. Please try again later.", 429);
  }

  const body = await request.json();
  const parsed = contactEnquirySchema.safeParse(body);
  if (!parsed.success) return error(parsed.error.issues[0]?.message || "Invalid enquiry data");

  const enquiry = addContactEnquiry(parsed.data);
  return json({ success: true, enquiry }, { status: 201 });
}

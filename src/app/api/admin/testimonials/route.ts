import { addTestimonial, getTestimonials } from "@/lib/store";
import { error, json, parseJson, requireAdmin } from "@/lib/api";
import { testimonialSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return error("Unauthorized", 401);
  }

  return json(getTestimonials());
}

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return error("Unauthorized", 401);
  }

  const body = await parseJson(request);
  const parsed = testimonialSchema.safeParse(body);
  if (!parsed.success) {
    return error(parsed.error.issues[0]?.message || "Invalid testimonial");
  }

  const testimonial = addTestimonial(parsed.data);
  revalidatePath("/", "layout");
  return json(testimonial, { status: 201 });
}

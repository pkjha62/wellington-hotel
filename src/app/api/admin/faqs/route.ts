import { error, json, parseJson, requireAdmin } from "@/lib/api";
import { addFAQ, getFAQs } from "@/lib/store";
import { faqSchema } from "@/lib/schemas";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return error("Unauthorized", 401);
  }

  return json(getFAQs());
}

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return error("Unauthorized", 401);
  }

  const body = await parseJson(request);
  const parsed = faqSchema.safeParse(body);
  if (!parsed.success) {
    return error(parsed.error.issues[0]?.message || "Invalid FAQ data");
  }

  return json(addFAQ(parsed.data), { status: 201 });
}

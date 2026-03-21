import { addExperience, getExperiences } from "@/lib/store";
import { error, json, parseJson, requireAdmin } from "@/lib/api";
import { experienceSchema } from "@/lib/schemas";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return error("Unauthorized", 401);
  }

  return json(getExperiences());
}

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return error("Unauthorized", 401);
  }

  const body = await parseJson(request);
  const parsed = experienceSchema.safeParse(body);
  if (!parsed.success) {
    return error(parsed.error.issues[0]?.message || "Invalid experience");
  }

  return json(addExperience(parsed.data), { status: 201 });
}

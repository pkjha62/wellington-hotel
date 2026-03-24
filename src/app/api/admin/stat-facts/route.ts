import { error, json, parseJson, requireAdmin } from "@/lib/api";
import { addStatFact, getStatFacts } from "@/lib/store";
import { statFactSchema } from "@/lib/schemas";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return error("Unauthorized", 401);
  }

  return json(getStatFacts());
}

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return error("Unauthorized", 401);
  }

  const body = await parseJson(request);
  const parsed = statFactSchema.safeParse(body);
  if (!parsed.success) {
    return error(parsed.error.issues[0]?.message || "Invalid stat data");
  }

  return json(addStatFact(parsed.data), { status: 201 });
}

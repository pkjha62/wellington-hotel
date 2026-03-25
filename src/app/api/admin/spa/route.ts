import { addSpaService, getSpaServices } from "@/lib/store";
import { error, json, parseJson, requireAdmin } from "@/lib/api";
import { spaServiceSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return error("Unauthorized", 401);
  return json(getSpaServices());
}

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) return error("Unauthorized", 401);

  const body = await parseJson(request);
  const parsed = spaServiceSchema.safeParse(body);
  if (!parsed.success) return error(parsed.error.issues[0]?.message || "Invalid spa service data");

  const service = addSpaService(parsed.data);
  revalidatePath("/", "layout");
  return json(service, { status: 201 });
}

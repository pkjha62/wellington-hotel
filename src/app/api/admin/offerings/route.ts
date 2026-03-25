import { addOffering, getOfferings } from "@/lib/store";
import { error, json, parseJson, requireAdmin } from "@/lib/api";
import { offeringSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return error("Unauthorized", 401);
  }

  return json(getOfferings());
}

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return error("Unauthorized", 401);
  }

  const body = await parseJson(request);
  const parsed = offeringSchema.safeParse(body);
  if (!parsed.success) {
    return error(parsed.error.issues[0]?.message || "Invalid offering");
  }

  const offering = addOffering(parsed.data);
  revalidatePath("/", "layout");
  return json(offering, { status: 201 });
}

import { error, json, parseJson, requireAdmin } from "@/lib/api";
import { addSpecialOffer, getSpecialOffers } from "@/lib/store";
import { specialOfferSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return error("Unauthorized", 401);
  }

  return json(getSpecialOffers());
}

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return error("Unauthorized", 401);
  }

  const body = await parseJson(request);
  const parsed = specialOfferSchema.safeParse(body);
  if (!parsed.success) {
    return error(parsed.error.issues[0]?.message || "Invalid offer data");
  }

  const offer = addSpecialOffer(parsed.data);
  revalidatePath("/", "layout");
  return json(offer, { status: 201 });
}

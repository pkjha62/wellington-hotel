import { addDiningVenue, getDiningVenues } from "@/lib/store";
import { error, json, parseJson, requireAdmin } from "@/lib/api";
import { diningVenueSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return error("Unauthorized", 401);
  return json(getDiningVenues());
}

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) return error("Unauthorized", 401);

  const body = await parseJson(request);
  const parsed = diningVenueSchema.safeParse(body);
  if (!parsed.success) return error(parsed.error.issues[0]?.message || "Invalid dining venue data");

  const venue = addDiningVenue(parsed.data);
  revalidatePath("/", "layout");
  return json(venue, { status: 201 });
}

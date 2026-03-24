import { addEventVenue, getEventVenues } from "@/lib/store";
import { error, json, parseJson, requireAdmin } from "@/lib/api";
import { eventVenueSchema } from "@/lib/schemas";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return error("Unauthorized", 401);
  return json(getEventVenues());
}

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) return error("Unauthorized", 401);

  const body = await parseJson(request);
  const parsed = eventVenueSchema.safeParse(body);
  if (!parsed.success) return error(parsed.error.issues[0]?.message || "Invalid event venue data");

  return json(addEventVenue(parsed.data), { status: 201 });
}

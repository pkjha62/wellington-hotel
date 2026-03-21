import { error, json, parseJson, requireAdmin } from "@/lib/api";
import { addRoom, getRooms } from "@/lib/store";
import { roomSchema } from "@/lib/schemas";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return error("Unauthorized", 401);
  }

  return json(getRooms());
}

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return error("Unauthorized", 401);
  }

  const body = await parseJson(request);
  const parsed = roomSchema.safeParse(body);
  if (!parsed.success) {
    return error(parsed.error.issues[0]?.message || "Invalid room data");
  }

  return json(addRoom(parsed.data), { status: 201 });
}

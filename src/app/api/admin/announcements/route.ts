import { addAnnouncement, getAnnouncements } from "@/lib/store";
import { announcementSchema } from "@/lib/schemas";
import { error, json, parseJson, requireAdmin } from "@/lib/api";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return error("Unauthorized", 401);
  }

  return json(getAnnouncements());
}

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return error("Unauthorized", 401);
  }

  const body = await parseJson(request);
  const parsed = announcementSchema.safeParse(body);
  if (!parsed.success) {
    return error(parsed.error.issues[0]?.message || "Invalid announcement");
  }

  return json(addAnnouncement(parsed.data), { status: 201 });
}

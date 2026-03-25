import { addAnnouncement, getAnnouncements } from "@/lib/store";
import { announcementSchema } from "@/lib/schemas";
import { error, json, parseJson, requireAdmin } from "@/lib/api";
import { revalidatePath } from "next/cache";

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

  const announcement = addAnnouncement(parsed.data);
  revalidatePath("/", "layout");
  return json(announcement, { status: 201 });
}

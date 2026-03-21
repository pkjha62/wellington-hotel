import { error, json, parseJson, requireAdmin } from "@/lib/api";
import { getSettings, updateSettings } from "@/lib/store";
import { settingsSchema } from "@/lib/schemas";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return error("Unauthorized", 401);
  }

  return json(getSettings());
}

export async function PATCH(request: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return error("Unauthorized", 401);
  }

  const body = await parseJson(request);
  const parsed = settingsSchema.safeParse(body);
  if (!parsed.success) {
    return error(parsed.error.issues[0]?.message || "Invalid settings payload");
  }

  return json(updateSettings(parsed.data));
}

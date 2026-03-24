import { error, json, parseJson, requireAdmin } from "@/lib/api";
import { changePasswordSchema } from "@/lib/schemas";
import { getAdminPassword, setAdminPassword } from "@/lib/auth";

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return error("Unauthorized", 401);
  }

  const body = await parseJson(request);
  const parsed = changePasswordSchema.safeParse(body);
  if (!parsed.success) {
    return error(parsed.error.issues[0]?.message || "Invalid data");
  }

  if (parsed.data.currentPassword !== getAdminPassword()) {
    return error("Current password is incorrect.", 403);
  }

  setAdminPassword(parsed.data.newPassword);
  return json({ success: true });
}

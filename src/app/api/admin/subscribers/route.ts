import { getSubscribers } from "@/lib/store";
import { error, json, requireAdmin } from "@/lib/api";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return error("Unauthorized", 401);
  }

  return json(getSubscribers());
}

import { error, json, requireAdmin } from "@/lib/api";
import { getStats } from "@/lib/store";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return error("Unauthorized", 401);
  }

  return json(getStats());
}

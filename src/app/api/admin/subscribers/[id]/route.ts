import { deleteSubscriber } from "@/lib/store";
import { error, json, requireAdmin } from "@/lib/api";

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) {
    return error("Unauthorized", 401);
  }

  const { id } = await params;
  const deleted = deleteSubscriber(id);
  if (!deleted) {
    return error("Subscriber not found", 404);
  }

  return json({ success: true });
}

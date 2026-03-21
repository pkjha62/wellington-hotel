import { cookies } from "next/headers";
import { json } from "@/lib/api";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("admin-token");
  return json({ success: true });
}

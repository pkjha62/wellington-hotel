import { cookies } from "next/headers";
import { error, issueAdminToken, json, parseJson } from "@/lib/api";
import { loginSchema } from "@/lib/schemas";
import { getAdminPassword } from "@/lib/auth";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";

export async function POST(request: Request) {
  const body = await parseJson(request);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return error("Invalid credentials.", 401);
  }

  if (
    parsed.data.username !== ADMIN_USERNAME ||
    parsed.data.password !== getAdminPassword()
  ) {
    return error("Invalid credentials.", 401);
  }

  const token = await issueAdminToken();
  const cookieStore = await cookies();
  cookieStore.set("admin-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8,
    path: "/",
  });

  return json({ success: true });
}

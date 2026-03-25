import { cookies } from "next/headers";
import { error, issueAdminToken, json, parseJson } from "@/lib/api";
import { loginSchema } from "@/lib/schemas";
import { verifyAdminPassword } from "@/lib/auth";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (!rateLimit(`login:${ip}`, 5)) {
    return error("Too many login attempts. Please try again later.", 429);
  }

  const body = await parseJson(request);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return error("Invalid credentials.", 401);
  }

  const passwordValid = await verifyAdminPassword(parsed.data.password);

  if (parsed.data.username !== ADMIN_USERNAME || !passwordValid) {
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

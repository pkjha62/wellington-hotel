import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyToken, createToken } from "@/lib/auth";

export function json(data: unknown, init?: ResponseInit) {
  return NextResponse.json(data, init);
}

export function error(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-token")?.value;
  if (!token) {
    return null;
  }

  return verifyToken(token);
}

export async function issueAdminToken() {
  return createToken({ role: "admin" });
}

export async function parseJson<T>(request: Request): Promise<T> {
  return request.json() as Promise<T>;
}

import { SignJWT, jwtVerify } from "jose";

if (!process.env.AUTH_SECRET) {
  throw new Error("AUTH_SECRET environment variable is required");
}

const secret = new TextEncoder().encode(process.env.AUTH_SECRET);

let runtimePassword = process.env.ADMIN_PASSWORD ?? "admin@123";

export function getAdminPassword() { return runtimePassword; }
export function setAdminPassword(pw: string) { runtimePassword = pw; }

export async function createToken(payload: Record<string, unknown>) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(secret);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || "deoghar-grand-hotel-jwt-secret-k8x2m"
);

let runtimePassword = process.env.ADMIN_PASSWORD || "admin@123";

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

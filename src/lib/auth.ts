import { SignJWT, jwtVerify } from "jose";

function getSecret() {
  const key = process.env.AUTH_SECRET;
  if (!key) throw new Error("AUTH_SECRET environment variable is required");
  return new TextEncoder().encode(key);
}

let runtimePassword = process.env.ADMIN_PASSWORD ?? "admin@123";

export function getAdminPassword() { return runtimePassword; }
export function setAdminPassword(pw: string) { runtimePassword = pw; }

export async function createToken(payload: Record<string, unknown>) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(getSecret());
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload;
  } catch {
    return null;
  }
}

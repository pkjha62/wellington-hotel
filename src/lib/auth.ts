import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

function getSecret() {
  const key = process.env.AUTH_SECRET;
  if (!key) throw new Error("AUTH_SECRET environment variable is required");
  return new TextEncoder().encode(key);
}

// Store a bcrypt hash of the admin password at startup
let runtimePasswordHash = bcrypt.hashSync(
  process.env.ADMIN_PASSWORD ?? "admin@123",
  10
);

export async function verifyAdminPassword(plain: string): Promise<boolean> {
  return bcrypt.compare(plain, runtimePasswordHash);
}

export async function setAdminPassword(plain: string): Promise<void> {
  runtimePasswordHash = await bcrypt.hash(plain, 10);
}

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

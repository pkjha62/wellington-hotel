import { NextResponse } from "next/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const allowedOrigins = new Set([
  new URL(SITE_URL).origin,
  "http://localhost:3000",
]);

/**
 * Validates the Origin/Referer header on mutating requests.
 * Returns a 403 response if the origin is not allowed, or null if the request is safe.
 */
export function csrfCheck(request: Request): NextResponse | null {
  const method = request.method.toUpperCase();
  if (method === "GET" || method === "HEAD" || method === "OPTIONS") {
    return null;
  }

  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  if (origin) {
    if (allowedOrigins.has(origin)) return null;
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (referer) {
    try {
      const refererOrigin = new URL(referer).origin;
      if (allowedOrigins.has(refererOrigin)) return null;
    } catch {
      // invalid referer URL
    }
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // No origin or referer — reject for safety
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

function getSecret() {
  const key = process.env.AUTH_SECRET;
  if (!key) return null;
  return new TextEncoder().encode(key);
}

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the login page and all auth/public API routes through
  if (
    pathname === "/admin/login" ||
    pathname.startsWith("/api/auth/") ||
    pathname.startsWith("/api/public/") ||
    pathname.startsWith("/api/bookings") ||
    pathname.startsWith("/api/newsletter") ||
    pathname.startsWith("/api/contact") ||
    pathname.startsWith("/api/checkout")
  ) {
    return NextResponse.next();
  }

  // Protect all /admin/* pages and /api/admin/* routes
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const token = request.cookies.get("admin-token")?.value;

    if (!token) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
      }
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const secret = getSecret();
    if (!secret) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
      }
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Session expired" }, { status: 401 });
      }
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete("admin-token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

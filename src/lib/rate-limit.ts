/**
 * Simple in-memory rate limiter for API routes.
 *
 * NOTE: This works per-process. In serverless environments (Vercel),
 * consider replacing with @upstash/ratelimit for distributed limiting.
 */

const windowMs = 60 * 1000; // 1 minute window

interface Entry {
  count: number;
  resetAt: number;
}

const store = new Map<string, Entry>();

// Cleanup stale entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key);
  }
}, 60_000);

/**
 * Check if a request is rate-limited.
 * @param key - Unique identifier (e.g. IP + route)
 * @param limit - Max requests per window
 * @returns `true` if the request is allowed, `false` if rate-limited
 */
export function rateLimit(key: string, limit: number): boolean {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= limit) {
    return false;
  }

  entry.count++;
  return true;
}

/**
 * Extract client IP from request headers (works behind proxies).
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}

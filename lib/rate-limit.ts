/**
 * Minimal in-memory rate limiter.
 *
 * This is intentionally dependency-free and good enough to stop casual abuse
 * on a single instance. Serverless platforms may run several instances, so for
 * serious protection put a shared store (Upstash Redis, Vercel KV, etc.) behind
 * the same `rateLimit` signature.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;

const buckets = new Map<string, Bucket>();

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  /** Seconds until the window resets. */
  retryAfter: number;
}

export function rateLimit(
  key: string,
  max = MAX_REQUESTS,
  windowMs = WINDOW_MS,
): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now >= bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: max - 1, retryAfter: 0 };
  }

  if (bucket.count >= max) {
    return {
      ok: false,
      remaining: 0,
      retryAfter: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  bucket.count += 1;

  // Opportunistic cleanup so the map cannot grow forever.
  if (buckets.size > 5000) {
    for (const [entryKey, entry] of buckets) {
      if (now >= entry.resetAt) buckets.delete(entryKey);
    }
  }

  return {
    ok: true,
    remaining: max - bucket.count,
    retryAfter: 0,
  };
}

/**
 * Best-effort client IP. Trusts the platform's forwarding headers, which is
 * correct on Vercel and most managed hosts.
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("cf-connecting-ip") ??
    "unknown"
  );
}

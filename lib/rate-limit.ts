type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const requests = new Map<string, RateLimitEntry>();

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 20;

export function rateLimit(identifier: string) {
  const now = Date.now();
  const existing = requests.get(identifier);

  if (!existing || now > existing.resetAt) {
    requests.set(identifier, {
      count: 1,
      resetAt: now + WINDOW_MS,
    });

    return {
      success: true,
      remaining: MAX_REQUESTS - 1,
    };
  }

  if (existing.count >= MAX_REQUESTS) {
    return {
      success: false,
      remaining: 0,
      retryAfter: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  existing.count += 1;

  return {
    success: true,
    remaining: MAX_REQUESTS - existing.count,
  };
}

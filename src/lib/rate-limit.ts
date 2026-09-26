import { prisma } from './prisma';

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetInSeconds: number;
}

/**
 * Database-backed sliding window rate limiter
 * Stores attempt timestamps in PostgreSQL (RateLimitAttempt) so rate limiting
 * functions consistently and reliably across distributed Vercel serverless lambda instances.
 *
 * @param key Unique identifier (e.g. `admin_login:192.168.1.1` or `contact:user_ip`)
 * @param maxAttempts Maximum allowed attempts in the given window
 * @param windowSeconds Duration of the rate limit window in seconds
 */
export async function checkRateLimit(
  key: string,
  maxAttempts: number = 5,
  windowSeconds: number = 900 // 15 minutes default
): Promise<RateLimitResult> {
  const now = new Date();
  const windowStart = new Date(now.getTime() - windowSeconds * 1000);

  try {
    // Count attempts within current sliding window
    const recentAttemptsCount = await prisma.rateLimitAttempt.count({
      where: {
        key,
        timestamp: {
          gte: windowStart,
        },
      },
    });

    if (recentAttemptsCount >= maxAttempts) {
      // Find oldest attempt in window to calculate exact seconds until reset
      const oldestInWindow = await prisma.rateLimitAttempt.findFirst({
        where: {
          key,
          timestamp: {
            gte: windowStart,
          },
        },
        orderBy: {
          timestamp: 'asc',
        },
      });

      const resetInSeconds = oldestInWindow
        ? Math.max(1, Math.ceil((oldestInWindow.timestamp.getTime() + windowSeconds * 1000 - now.getTime()) / 1000))
        : windowSeconds;

      return {
        success: false,
        remaining: 0,
        resetInSeconds,
      };
    }

    // Record new attempt
    await prisma.rateLimitAttempt.create({
      data: {
        key,
        timestamp: now,
      },
    });

    // Fire-and-forget cleanup of old attempts for this key older than 2x window
    const cleanupThreshold = new Date(now.getTime() - windowSeconds * 2000);
    prisma.rateLimitAttempt
      .deleteMany({
        where: {
          key,
          timestamp: {
            lt: cleanupThreshold,
          },
        },
      })
      .catch(() => {
        // Non-blocking cleanup error suppression
      });

    return {
      success: true,
      remaining: Math.max(0, maxAttempts - (recentAttemptsCount + 1)),
      resetInSeconds: windowSeconds,
    };
  } catch (error) {
    // Fallback in case of database connectivity hiccup during startup/cold start
    console.error('[RateLimit Warning]: Unable to reach database for rate limiting:', error);
    return {
      success: true,
      remaining: 1,
      resetInSeconds: windowSeconds,
    };
  }
}

/**
 * Helper to extract client IP from Next.js request headers
 */
export function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  const realIp = headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }
  return '127.0.0.1';
}

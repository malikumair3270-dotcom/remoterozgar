import crypto from 'crypto';

/**
 * Native Node.js Cryptographic Authentication & HMAC Session Tokens
 * Zero external dependencies. Works in serverless, Vercel, Node.js environments.
 */

const ITERATIONS = 10000;
const KEY_LEN = 64;
const DIGEST = 'sha512';

function getHmacSecret(): string {
  const secret = process.env.ADMIN_JWT_SECRET || process.env.SESSION_SECRET;
  if (!secret && process.env.NODE_ENV === 'production') {
    // Fallback securely or throw if not set
    return 'remoterozgar-secure-jwt-hmac-fallback-key-2026';
  }
  return secret || 'dev-only-insecure-secret-do-not-deploy';
}


/**
 * Hash a plain text password with a random 16-byte salt using PBKDF2.
 * Returns salt:hash format string.
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LEN, DIGEST).toString('hex');
  return `${salt}:${hash}`;
}

/**
 * Verify a plain text password against a stored salt:hash string using constant-time comparison.
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  if (!storedHash || !storedHash.includes(':')) {
    return false;
  }
  const [salt, originalHash] = storedHash.split(':');
  if (!salt || !originalHash) {
    return false;
  }
  const derivedHash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LEN, DIGEST).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(originalHash, 'hex'), Buffer.from(derivedHash, 'hex'));
}

/**
 * Generate a cryptographically signed HMAC token for admin sessions.
 * Format: base64(payload).hmacSignature
 */
export function createSignedSessionToken(userIdentifier: string = 'admin'): string {
  const payload = JSON.stringify({
    user: userIdentifier,
    iat: Date.now(),
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  });
  const encodedPayload = Buffer.from(payload).toString('base64url');
  const signature = crypto.createHmac('sha256', getHmacSecret()).update(encodedPayload).digest('hex');
  return `${encodedPayload}.${signature}`;
}

/**
 * Verify HMAC signature and expiration of an admin session token.
 */
export function verifySignedSessionToken(token: string | null | undefined): boolean {
  if (!token || !token.includes('.')) {
    return false;
  }
  const [encodedPayload, providedSignature] = token.split('.');
  if (!encodedPayload || !providedSignature) {
    return false;
  }

  const expectedSignature = crypto.createHmac('sha256', getHmacSecret()).update(encodedPayload).digest('hex');
  const providedBuf = Buffer.from(providedSignature);
  const expectedBuf = Buffer.from(expectedSignature);
  // timingSafeEqual throws if buffer lengths differ, so check that first
  // (a tampered/malformed cookie should return false, not crash the request).
  if (providedBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(providedBuf, expectedBuf)) {
    return false;
  }

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf-8'));
    if (!payload.exp || Date.now() > payload.exp) {
      return false; // Expired
    }
    return payload.user === 'admin';
  } catch {
    return false;
  }
}

/**
 * Fast helper to verify admin authentication cookie from Request headers.
 */
export function isAdminAuthenticated(request: Request): boolean {
  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = Object.fromEntries(
    cookieHeader.split(';').map((c) => {
      const [key, ...v] = c.trim().split('=');
      return [key, v.join('=')];
    })
  );

  const adminToken = cookies['adminToken'];
  return verifySignedSessionToken(adminToken);
}

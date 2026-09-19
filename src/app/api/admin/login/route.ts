import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rateLimit';
import { hashPassword, verifyPassword, createSignedSessionToken } from '@/lib/authCrypto';
import { logger } from '@/lib/logger';

// Salted PBKDF2 hash for the administrative account.
// MUST be set via the ADMIN_SECRET_HASH environment variable in production —
// no hardcoded fallback, because anyone with the source code would otherwise
// know (or be able to brute-force offline) the default admin password.
// Generate one locally with hashPassword('your-new-password') and paste the
// result into Vercel's Environment Variables as ADMIN_SECRET_HASH.
const DEFAULT_HASH = process.env.ADMIN_SECRET_HASH;

if (!DEFAULT_HASH && process.env.NODE_ENV === 'production') {
  throw new Error(
    'ADMIN_SECRET_HASH environment variable is not set. Admin login cannot run securely without it.'
  );
}

export async function POST(request: Request) {
  // Extract client IP address for rate limiting
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '127.0.0.1';

  // 1. Rate Limiting Check (Max 5 attempts per 15 mins per IP)
  const rateLimit = checkRateLimit(ip, 5, 15 * 60 * 1000);
  if (!rateLimit.success) {
    logger.warn('Admin login rate limit exceeded', { userIp: ip });
    return NextResponse.json(
      { success: false, error: 'Too many failed attempts. Please try again in 15 minutes.' },
      {
        status: 429,
        headers: {
          'Retry-After': '900',
        },
      }
    );
  }

  try {
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ success: false, error: 'Invalid JSON payload' }, { status: 400 });
    }

    const { email, password } = body as { email?: string; password?: string };

    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Email and password required' }, { status: 400 });
    }

    // 2. Password Verification using Native PBKDF2 Crypto
    const isPasswordValid = verifyPassword(password, DEFAULT_HASH || '');

    if (!isPasswordValid) {
      logger.warn('Failed admin login attempt', { userIp: ip, email });
      return NextResponse.json(
        { success: false, error: 'Invalid credentials', remainingAttempts: rateLimit.remaining },
        { status: 401 }
      );
    }

    // 3. Issue Cryptographically Signed HMAC Session Token
    const signedToken = createSignedSessionToken('admin');
    const response = NextResponse.json({ success: true, message: 'Authentication successful' });

    response.cookies.set('adminToken', signedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400, // 24 Hours
      path: '/',
    });

    logger.info('Admin logged in successfully', { userIp: ip, email });
    return response;
  } catch (error) {
    logger.error('Admin login server exception', error, { userIp: ip });
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

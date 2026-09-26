import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminCredentials, createAdminSessionToken, setAdminSessionCookie } from '@/lib/auth';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    // 1. Database-backed rate limiting (5 attempts per 15 minutes per IP)
    const ip = getClientIp(request.headers);
    const rateLimit = await checkRateLimit(`admin_login:${ip}`, 5, 900);

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: `Too many login attempts. Please wait ${rateLimit.resetInSeconds} seconds before trying again.`,
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    // 2. Constant-time credential verification against environment variables
    const isValid = verifyAdminCredentials(email, password);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid admin credentials.' },
        { status: 401 }
      );
    }

    // 3. Generate HMAC SHA-256 signed session token
    const token = await createAdminSessionToken(email.trim().toLowerCase());

    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful.',
    });

    // 4. Set HttpOnly HMAC session cookie
    setAdminSessionCookie(response, token);

    return response;
  } catch (error) {
    console.error('[API /api/admin/login Error]:', error);
    return NextResponse.json(
      { error: 'An error occurred during authentication.' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Base64 URL safe decoder
 */
function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

/**
 * Hex string to Uint8Array converter
 */
function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

/**
 * Verifies an HMAC signed token in Edge Runtime
 */
async function verifyTokenInEdge(token: string, secret: string, expectedEmail: string): Promise<boolean> {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return false;

    const [encodedPayload, providedSignatureHex] = parts;
    if (!encodedPayload || !providedSignatureHex) return false;

    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const key = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const signatureBytes = hexToBytes(providedSignatureHex);
    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      signatureBytes as unknown as BufferSource,
      encoder.encode(encodedPayload)
    );

    if (!isValid) return false;

    const payload = JSON.parse(base64UrlDecode(encodedPayload));
    const now = Math.floor(Date.now() / 1000);

    if (!payload.exp || payload.exp < now) return false;
    if (payload.email !== expectedEmail || payload.role !== 'admin') return false;

    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const cookieName = process.env.ADMIN_SESSION_COOKIE_NAME || 'rr_admin_session';
  const secret = process.env.ADMIN_SESSION_HMAC_SECRET || '';
  const adminEmail = process.env.ADMIN_EMAIL || '';

  // Intercept Admin Routes
  if (pathname.startsWith('/admin')) {
    const isLoginPage = pathname === '/admin/login';
    const sessionCookie = request.cookies.get(cookieName)?.value;

    let isAuthenticated = false;
    if (sessionCookie && secret && adminEmail) {
      isAuthenticated = await verifyTokenInEdge(sessionCookie, secret, adminEmail);
    }

    // If authenticated user visits /admin/login, redirect to /admin dashboard
    if (isLoginPage && isAuthenticated) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    // If unauthenticated user visits protected /admin page, redirect to /admin/login
    if (!isLoginPage && !isAuthenticated) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Security Headers for all responses
  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static, _next/image
     * - favicon.ico, ads.txt, robots.txt, sitemap.xml, manifest.json, sw.js
     */
    '/((?!_next/static|_next/image|favicon.ico|ads\\.txt|robots\\.txt|sitemap\\.xml|manifest\\.json|sw\\.js).*)',
  ],
};

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Content-Security-Policy
  // Permissive script-src and connect-src so Next.js hydration, AdSense, and API fetches work seamlessly
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self' https:",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https: https://pagead2.googlesyndication.com https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline' https:",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https: https://pagead2.googlesyndication.com",
      "frame-src 'self' https: https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com",
      "font-src 'self' data: https:",
      "worker-src 'self' blob:",
      "manifest-src 'self'",
    ].join('; ')
  );


  // Prevent MIME-type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // Clickjacking protection
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');

  // Referrer policy
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Permissions policy
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return response;
}

export const config = {
  matcher: '/:path*',
};

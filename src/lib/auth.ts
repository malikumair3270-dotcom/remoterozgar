import { NextRequest, NextResponse } from 'next/server';
import { env } from './env';

export interface AdminSessionPayload {
  email: string;
  role: 'admin';
  iat: number;
  exp: number;
}

/**
 * Base64 URL safe encoder
 */
function base64UrlEncode(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

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
 * Uint8Array to Hex string converter
 */
function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Get CryptoKey for HMAC-SHA256 signing/verifying
 */
async function getHmacKey(): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(env.ADMIN_SESSION_HMAC_SECRET);
  return await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

/**
 * Signs a payload and returns a signed session token: `${base64Payload}.${signatureHex}`
 */
export async function createAdminSessionToken(email: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload: AdminSessionPayload = {
    email,
    role: 'admin',
    iat: now,
    exp: now + env.ADMIN_SESSION_TTL_SECONDS,
  };

  const payloadString = JSON.stringify(payload);
  const encodedPayload = base64UrlEncode(payloadString);

  const key = await getHmacKey();
  const signatureBuffer = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(encodedPayload)
  );

  const signatureHex = bytesToHex(new Uint8Array(signatureBuffer));
  return `${encodedPayload}.${signatureHex}`;
}

/**
 * Verifies an HMAC signed session token. Returns the payload if valid, null if invalid or expired.
 */
export async function verifyAdminSessionToken(token: string | undefined | null): Promise<AdminSessionPayload | null> {
  if (!token || typeof token !== 'string') {
    return null;
  }

  const parts = token.split('.');
  if (parts.length !== 2) {
    return null;
  }

  const [encodedPayload, providedSignatureHex] = parts;
  if (!encodedPayload || !providedSignatureHex) {
    return null;
  }

  try {
    const key = await getHmacKey();
    const signatureBytes = hexToBytes(providedSignatureHex);

    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      signatureBytes as unknown as BufferSource,
      new TextEncoder().encode(encodedPayload)
    );

    if (!isValid) {
      return null;
    }

    const payloadJson = base64UrlDecode(encodedPayload);
    const payload = JSON.parse(payloadJson) as AdminSessionPayload;

    const now = Math.floor(Date.now() / 1000);
    if (!payload.exp || payload.exp < now) {
      return null;
    }

    // Verify user is valid configured admin
    if (payload.email !== env.ADMIN_EMAIL || payload.role !== 'admin') {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Constant-time string comparison for credential checks (prevents timing attacks)
 */
export function timingSafeEqualString(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

/**
 * Verifies admin credentials against environment variables
 */
export function verifyAdminCredentials(email: string, password: string): boolean {
  const isEmailMatch = timingSafeEqualString(email.trim().toLowerCase(), env.ADMIN_EMAIL.toLowerCase());
  const isPasswordMatch = timingSafeEqualString(password, env.ADMIN_PASSWORD);
  return isEmailMatch && isPasswordMatch;
}

/**
 * Reads and verifies the admin session from an incoming Request or NextRequest.
 * Returns true if valid, false otherwise.
 */
export async function verifyAdminSession(request: Request | NextRequest): Promise<boolean> {
  let cookieHeader: string | null = null;

  if ('cookies' in request && typeof (request as NextRequest).cookies?.get === 'function') {
    const cookie = (request as NextRequest).cookies.get(env.ADMIN_SESSION_COOKIE_NAME);
    if (cookie?.value) {
      const session = await verifyAdminSessionToken(cookie.value);
      return session !== null;
    }
  }

  cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) {
    return false;
  }

  const cookieMatch = cookieHeader
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${env.ADMIN_SESSION_COOKIE_NAME}=`));

  if (!cookieMatch) {
    return false;
  }

  const token = cookieMatch.substring(env.ADMIN_SESSION_COOKIE_NAME.length + 1);
  const session = await verifyAdminSessionToken(decodeURIComponent(token));
  return session !== null;
}

/**
 * Sets the HttpOnly admin session cookie on an outgoing NextResponse
 */
export function setAdminSessionCookie(response: NextResponse, token: string): void {
  response.cookies.set({
    name: env.ADMIN_SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: env.IS_PRODUCTION,
    sameSite: 'lax',
    path: '/',
    maxAge: env.ADMIN_SESSION_TTL_SECONDS,
  });
}

/**
 * Clears the admin session cookie on an outgoing NextResponse
 */
export function clearAdminSessionCookie(response: NextResponse): void {
  response.cookies.set({
    name: env.ADMIN_SESSION_COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: env.IS_PRODUCTION,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}

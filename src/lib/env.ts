/**
 * Strict Environment Variable Validation Module
 * 
 * Verifies all required environment variables on startup.
 * Throws a fatal descriptive error if any required secret or configuration is absent.
 * Prohibits hardcoded fallback credentials anywhere in the application.
 */

interface EnvConfig {
  DATABASE_URL: string;
  ADMIN_EMAIL: string;
  ADMIN_PASSWORD: string;
  ADMIN_SESSION_HMAC_SECRET: string;
  ADMIN_SESSION_COOKIE_NAME: string;
  ADMIN_SESSION_TTL_SECONDS: number;
  JOBICY_BASE_URL: string;
  FX_PROVIDER_BASE_URL: string;
  FX_USD_TO_PKR_CACHE_TTL_SECONDS: number;
  SITE_URL: string;
  NEXT_PUBLIC_SITE_NAME: string;
  NEXT_PUBLIC_DEFAULT_CURRENCY: string;
  IS_PRODUCTION: boolean;
}

function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (!value || value.trim() === '') {
    throw new Error(
      `[RemoteRozgar Startup Error]: Required environment variable "${key}" is missing or empty. ` +
      `Check your .env file or Vercel environment variables settings.`
    );
  }
  return value.trim();
}

function getOptionalEnv(key: string, defaultValue: string): string {
  const value = process.env[key];
  return value && value.trim() !== '' ? value.trim() : defaultValue;
}

export function validateEnv(): EnvConfig {
  const isProduction = process.env.NODE_ENV === 'production';

  // These are mandatory in all environments (production and development)
  const databaseUrl = getRequiredEnv('DATABASE_URL');
  const adminEmail = getRequiredEnv('ADMIN_EMAIL');
  const adminPassword = getRequiredEnv('ADMIN_PASSWORD');
  const adminHmacSecret = getRequiredEnv('ADMIN_SESSION_HMAC_SECRET');

  if (adminHmacSecret.length < 32) {
    throw new Error(
      `[RemoteRozgar Startup Error]: ADMIN_SESSION_HMAC_SECRET must be at least 32 characters long for cryptographically secure HMAC signing.`
    );
  }

  const cookieName = getOptionalEnv('ADMIN_SESSION_COOKIE_NAME', 'rr_admin_session');
  const ttlSeconds = parseInt(getOptionalEnv('ADMIN_SESSION_TTL_SECONDS', '86400'), 10);
  const jobicyBaseUrl = getOptionalEnv('JOBICY_BASE_URL', 'https://jobicy.com/api/v2/remote-jobs');
  const fxProviderBaseUrl = getOptionalEnv('FX_PROVIDER_BASE_URL', 'https://open.er-api.com/v6/latest/USD');
  const fxCacheTtl = parseInt(getOptionalEnv('FX_USD_TO_PKR_CACHE_TTL_SECONDS', '21600'), 10);
  const siteUrl = getOptionalEnv('SITE_URL', 'https://remoterozgar.vercel.app').replace(/\/+$/, '');
  const siteName = getOptionalEnv('NEXT_PUBLIC_SITE_NAME', 'RemoteRozgar');
  const defaultCurrency = getOptionalEnv('NEXT_PUBLIC_DEFAULT_CURRENCY', 'PKR');

  return {
    DATABASE_URL: databaseUrl,
    ADMIN_EMAIL: adminEmail,
    ADMIN_PASSWORD: adminPassword,
    ADMIN_SESSION_HMAC_SECRET: adminHmacSecret,
    ADMIN_SESSION_COOKIE_NAME: cookieName,
    ADMIN_SESSION_TTL_SECONDS: isNaN(ttlSeconds) ? 86400 : ttlSeconds,
    JOBICY_BASE_URL: jobicyBaseUrl,
    FX_PROVIDER_BASE_URL: fxProviderBaseUrl,
    FX_USD_TO_PKR_CACHE_TTL_SECONDS: isNaN(fxCacheTtl) ? 21600 : fxCacheTtl,
    SITE_URL: siteUrl,
    NEXT_PUBLIC_SITE_NAME: siteName,
    NEXT_PUBLIC_DEFAULT_CURRENCY: defaultCurrency,
    IS_PRODUCTION: isProduction,
  };
}

export const env = validateEnv();

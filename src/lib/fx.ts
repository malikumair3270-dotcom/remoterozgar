import { prisma } from './prisma';
import { env } from './env';

export interface FxRateData {
  rate: number | null;
  fetchedAt: Date | null;
  formattedRate: string;
}

/**
 * Retrieves the current USD to PKR exchange rate.
 * - First checks the database for a cached rate younger than the TTL (6 hours).
 * - If expired or missing, fetches fresh rates from FX_PROVIDER_BASE_URL.
 * - Stores the fresh rate in the ExchangeRate table.
 * - If the upstream provider fails, returns the latest available rate from the DB.
 * - If no rate has ever been recorded and upstream fails, returns null (never throws or crashes).
 */
export async function getUsdToPkrRate(): Promise<number | null> {
  const ttlMs = env.FX_USD_TO_PKR_CACHE_TTL_SECONDS * 1000;
  const now = new Date();
  const cacheCutoff = new Date(now.getTime() - ttlMs);

  try {
    // 1. Check DB for valid cached rate within TTL
    const recentCachedRate = await prisma.exchangeRate.findFirst({
      where: {
        baseCurrency: 'USD',
        targetCurrency: 'PKR',
        fetchedAt: {
          gte: cacheCutoff,
        },
      },
      orderBy: {
        fetchedAt: 'desc',
      },
    });

    if (recentCachedRate && typeof recentCachedRate.rate === 'number' && !isNaN(recentCachedRate.rate)) {
      return recentCachedRate.rate;
    }

    // 2. Fetch fresh rate from provider
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    try {
      const response = await fetch(env.FX_PROVIDER_BASE_URL, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'RemoteRozgar/1.0',
        },
        next: { revalidate: env.FX_USD_TO_PKR_CACHE_TTL_SECONDS },
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        const pkrRate = data?.rates?.PKR;

        if (typeof pkrRate === 'number' && pkrRate > 0) {
          // Cache in database
          await prisma.exchangeRate.create({
            data: {
              baseCurrency: 'USD',
              targetCurrency: 'PKR',
              rate: pkrRate,
              fetchedAt: now,
            },
          });

          return pkrRate;
        }
      }
    } catch (fetchErr) {
      console.warn('[FX Provider Notice]: Live rate fetch failed, falling back to database cache:', fetchErr);
    }

    // 3. Fallback to latest existing rate in DB even if older than TTL
    const staleRate = await prisma.exchangeRate.findFirst({
      where: {
        baseCurrency: 'USD',
        targetCurrency: 'PKR',
      },
      orderBy: {
        fetchedAt: 'desc',
      },
    });

    if (staleRate && typeof staleRate.rate === 'number') {
      return staleRate.rate;
    }

    return null;
  } catch (dbErr) {
    console.error('[FX Database Error]: Unable to query or store exchange rate:', dbErr);
    return null;
  }
}

export { formatPkr, convertUsdToPkr } from './fx-utils';

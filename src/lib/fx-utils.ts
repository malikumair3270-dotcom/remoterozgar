/**
 * Format a number as Pakistani Rupee representation (e.g. Rs 278,000 or Rs 1.2M)
 */
export function formatPkr(amountInPkr: number): string {
  if (isNaN(amountInPkr) || amountInPkr <= 0) {
    return '—';
  }

  if (amountInPkr >= 10000000) {
    const crores = (amountInPkr / 10000000).toFixed(2);
    return `Rs ${crores} Crore`;
  }

  if (amountInPkr >= 100000) {
    const lacs = (amountInPkr / 100000).toFixed(1);
    return `Rs ${lacs} Lac`;
  }

  return `Rs ${Math.round(amountInPkr).toLocaleString('en-US')}`;
}

/**
 * Converts a USD value to PKR formatted text.
 * Displays "—" if rate is not available (never crashes).
 */
export function convertUsdToPkr(usdAmount: number | null | undefined, rate: number | null): string {
  if (usdAmount === null || usdAmount === undefined || isNaN(usdAmount) || usdAmount <= 0) {
    return '—';
  }

  if (rate === null || isNaN(rate) || rate <= 0) {
    return '—';
  }

  const pkrValue = usdAmount * rate;
  return formatPkr(pkrValue);
}

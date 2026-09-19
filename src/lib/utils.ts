export const USD_TO_PKR_RATE = 278.5; // Current approximate exchange rate

export function formatSalaryPkr(salaryMin?: number, salaryMax?: number, period: string = 'yearly'): string {
  if (!salaryMin && !salaryMax) {
    return 'Negotiable / Market Competitive (in USD)';
  }

  const avgUsd = salaryMax ? (salaryMin ? (salaryMin + salaryMax) / 2 : salaryMax) : (salaryMin || 0);

  if (period.toLowerCase().includes('year')) {
    const monthlyUsd = Math.round(avgUsd / 12);
    const monthlyPkr = Math.round(monthlyUsd * USD_TO_PKR_RATE);
    return `~$${monthlyUsd.toLocaleString()}/mo (~Rs ${monthlyPkr.toLocaleString()} PKR/mo)`;
  } else if (period.toLowerCase().includes('hour')) {
    const hourlyPkr = Math.round(avgUsd * USD_TO_PKR_RATE);
    return `$${avgUsd}/hr (~Rs ${hourlyPkr.toLocaleString()} PKR/hr)`;
  } else {
    const monthlyPkr = Math.round(avgUsd * USD_TO_PKR_RATE);
    return `$${avgUsd.toLocaleString()}/mo (~Rs ${monthlyPkr.toLocaleString()} PKR/mo)`;
  }
}

export function formatRelativeDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 30) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch {
    return 'Recently';
  }
}

export function generateWhatsAppShareText(job: {
  title: string;
  company: string;
  salaryText?: string;
  url: string;
}): string {
  const currentUrl = typeof window !== 'undefined' ? window.location.origin : 'https://remoterozgar.vercel.app';
  const text = `🔥 *Remote Job Opportunity on RemoteRozgar!*

💼 *Role:* ${job.title}
🏢 *Company:* ${job.company}
💰 *Est. Salary:* ${job.salaryText || 'Market Rate (USD)'}
🌍 *Location:* 100% Remote (Work from home)

📲 *View Details & Apply Direct:*
${job.url}

🔍 *Explore more daily remote jobs for Pakistanis:*
${currentUrl}`;

  return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
}

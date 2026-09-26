import { prisma } from './prisma';
import { env } from './env';

import type { RemoteJob } from './job-types';
export type { RemoteJob };

interface JobicyRawJob {
  id: number | string;
  url: string;
  jobSlug: string;
  jobTitle: string;
  companyName: string;
  companyLogo?: string;
  jobIndustry?: string[];
  jobType?: string[];
  jobGeo?: string;
  jobLevel?: string;
  jobExcerpt?: string;
  jobDescription?: string;
  pubDate: string;
  annualSalaryMin?: string | number;
  annualSalaryMax?: string | number;
  salaryCurrency?: string;
}

interface JobicyApiResponse {
  apiVersion?: string;
  jobCount?: number;
  jobs?: JobicyRawJob[];
  statusCode?: number;
  success?: boolean;
}

/**
 * Maps RemoteRozgar categories to Jobicy industry search values
 */
export function mapCategoryToJobicyIndustry(category: string): string {
  const normalized = category.toLowerCase().trim();
  switch (normalized) {
    case 'tech':
    case 'software':
    case 'engineering':
      return 'engineering';
    case 'design':
    case 'creative':
      return 'design-multimedia';
    case 'writing':
    case 'content':
      return 'copywriting';
    case 'support':
    case 'customer support':
      return 'supporting';
    case 'marketing':
    case 'sales':
      return 'marketing';
    case 'business':
    case 'ops':
    case 'operations':
      return 'business';
    default:
      return '';
  }
}

/**
 * Normalizes industry strings into unified site categories
 */
export function normalizeCategory(industries: string[] = []): string {
  const text = industries.join(' ').toLowerCase();
  if (text.includes('engineer') || text.includes('software') || text.includes('dev') || text.includes('tech')) {
    return 'Tech';
  }
  if (text.includes('design') || text.includes('ui') || text.includes('ux') || text.includes('multimedia')) {
    return 'Design';
  }
  if (text.includes('copy') || text.includes('content') || text.includes('writ')) {
    return 'Writing';
  }
  if (text.includes('support') || text.includes('success') || text.includes('customer')) {
    return 'Customer Support';
  }
  if (text.includes('market') || text.includes('growth') || text.includes('seo') || text.includes('sales')) {
    return 'Marketing';
  }
  return 'Business & Operations';
}

/**
 * Converts Jobicy API item into clean RemoteJob
 */
function transformJobicyJob(raw: JobicyRawJob): RemoteJob {
  const minSalary = raw.annualSalaryMin ? Number(raw.annualSalaryMin) : null;
  const maxSalary = raw.annualSalaryMax ? Number(raw.annualSalaryMax) : null;

  let salaryText = 'Competitive';
  if (minSalary && maxSalary) {
    salaryText = `$${Math.round(minSalary / 1000)}k - $${Math.round(maxSalary / 1000)}k / yr`;
  } else if (minSalary) {
    salaryText = `From $${Math.round(minSalary / 1000)}k / yr`;
  } else if (maxSalary) {
    salaryText = `Up to $${Math.round(maxSalary / 1000)}k / yr`;
  }

  // Clean html tags for excerpt if needed
  const cleanExcerpt = raw.jobExcerpt
    ? raw.jobExcerpt.replace(/<[^>]+>/g, '').replace(/&hellip;/g, '...').trim()
    : 'Exciting global remote opportunity with competitive compensation and flexible hours.';

  return {
    id: `jobicy-${raw.id}`,
    title: raw.jobTitle || 'Remote Specialist',
    companyName: raw.companyName || 'Verified Employer',
    companyLogo: raw.companyLogo || null,
    category: normalizeCategory(raw.jobIndustry),
    location: raw.jobGeo || 'Anywhere (Global Remote)',
    jobType: raw.jobType && raw.jobType.length > 0 ? raw.jobType[0] : 'Full-Time',
    salaryMinUsd: minSalary && !isNaN(minSalary) ? Math.round(minSalary / 12) : null, // monthly estimate
    salaryMaxUsd: maxSalary && !isNaN(maxSalary) ? Math.round(maxSalary / 12) : null,
    salaryFormatted: salaryText,
    excerpt: cleanExcerpt,
    description: raw.jobDescription || cleanExcerpt,
    applyUrl: raw.url || 'https://jobicy.com',
    pubDate: raw.pubDate || new Date().toISOString(),
    source: 'jobicy',
    isFeatured: false,
  };
}

/**
 * Fetches live jobs from Jobicy with fallback to database JobSnapshot.
 * GUARANTEE: Never returns 0 jobs simply because upstream API fails or is down.
 */
export async function getAggregatedJobs(options?: {
  category?: string;
  search?: string;
  count?: number;
}): Promise<{ jobs: RemoteJob[]; fromCache: boolean }> {
  const categoryFilter = options?.category || '';
  const searchFilter = options?.search || '';
  const count = Math.min(100, Math.max(10, options?.count || 60));

  let jobicyJobs: RemoteJob[] = [];
  let fromCache = false;

  // 1. Attempt live pull from Jobicy
  try {
    const industryParam = mapCategoryToJobicyIndustry(categoryFilter);
    const queryParams = new URLSearchParams();
    queryParams.set('count', count.toString());
    queryParams.set('geo', 'anywhere');
    if (industryParam) {
      queryParams.set('industry', industryParam);
    }
    if (searchFilter) {
      queryParams.set('tag', searchFilter);
    }

    const apiUrl = `${env.JOBICY_BASE_URL}?${queryParams.toString()}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(apiUrl, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'RemoteRozgar/1.0',
      },
      next: { revalidate: 1800 }, // 30 minutes Next.js cache
    });

    clearTimeout(timeout);

    if (response.ok) {
      const data: JobicyApiResponse = await response.json();
      if (Array.isArray(data.jobs) && data.jobs.length > 0) {
        jobicyJobs = data.jobs.map(transformJobicyJob);

        // Save fresh snapshot to database for offline resiliency
        const snapshotCategory = categoryFilter.toLowerCase() || 'all';
        prisma.jobSnapshot
          .create({
            data: {
              source: 'jobicy',
              category: snapshotCategory,
              data: JSON.stringify(jobicyJobs),
              jobCount: jobicyJobs.length,
            },
          })
          .catch((err) => {
            console.error('[JobSnapshot Cache Error]:', err);
          });
      }
    }
  } catch (error) {
    console.warn('[Jobicy API Warning]: Upstream request timed out or failed. Falling back to DB snapshot:', error);
  }

  // 2. If live pull failed or returned 0, load latest JobSnapshot from DB
  if (jobicyJobs.length === 0) {
    try {
      const snapshotCategory = categoryFilter.toLowerCase() || 'all';
      const latestSnapshot = await prisma.jobSnapshot.findFirst({
        where: {
          source: 'jobicy',
          ...(snapshotCategory !== 'all' ? { category: snapshotCategory } : {}),
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (latestSnapshot && latestSnapshot.data) {
        const parsed: RemoteJob[] = JSON.parse(latestSnapshot.data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          jobicyJobs = parsed;
          fromCache = true;
        }
      }
    } catch (cacheErr) {
      console.error('[JobSnapshot Query Error]: Failed to read snapshot from DB:', cacheErr);
    }
  }

  // 3. Fetch custom approved jobs from database (admin-posted & approved submissions)
  // STRICT RULE: Only status = "APPROVED" jobs are shown to the public
  let dbJobs: RemoteJob[] = [];
  try {
    const customJobs = await prisma.job.findMany({
      where: {
        status: 'APPROVED',
        ...(categoryFilter && categoryFilter.toLowerCase() !== 'all'
          ? { category: { equals: categoryFilter, mode: 'insensitive' } }
          : {}),
      },
      orderBy: [
        { isFeatured: 'desc' },
        { pubDate: 'desc' },
      ],
      take: 50,
    });

    dbJobs = customJobs.map((j) => ({
      id: j.id,
      title: j.title,
      companyName: j.companyName,
      companyLogo: j.companyLogo,
      category: j.category,
      location: j.location,
      jobType: j.jobType,
      salaryMinUsd: j.salaryMinUsd,
      salaryMaxUsd: j.salaryMaxUsd,
      salaryFormatted: j.salaryFormatted || (j.salaryMinUsd ? `$${j.salaryMinUsd} - $${j.salaryMaxUsd || j.salaryMinUsd}/mo` : 'Competitive'),
      excerpt: j.description.slice(0, 180) + '...',
      description: j.description,
      applyUrl: j.applyUrl,
      pubDate: j.pubDate.toISOString(),
      source: j.source === 'SUBMISSION' ? 'submission' : 'admin',
      isFeatured: j.isFeatured,
    }));
  } catch (dbErr) {
    console.error('[Approved Jobs Query Error]: Failed to query approved jobs from DB:', dbErr);
  }

  // 4. Merge DB approved jobs (featured first) with Jobicy remote jobs
  let combined = [...dbJobs, ...jobicyJobs];

  // Apply client-side text filtering if search param provided
  if (searchFilter.trim()) {
    const q = searchFilter.toLowerCase().trim();
    combined = combined.filter(
      (job) =>
        job.title.toLowerCase().includes(q) ||
        job.companyName.toLowerCase().includes(q) ||
        job.category.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q) ||
        job.excerpt.toLowerCase().includes(q)
    );
  }

  return {
    jobs: combined,
    fromCache,
  };
}

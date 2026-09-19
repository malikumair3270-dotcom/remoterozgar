import { NextResponse } from 'next/server';
import { Job } from '@/lib/types';
import { formatSalaryPkr } from '@/lib/utils';
import { getAdminJobs } from '@/lib/adminStore';

export const dynamic = 'force-dynamic';

// High-converting curated remote roles & internships specifically suited for Pakistan/South Asian remote workers
const CURATED_PAKISTAN_ROLES: Job[] = [
  {
    id: 'curated-1',
    title: 'Junior Frontend Developer (React / Tailwind)',
    company: 'TechFlow Global',
    companyLogo: '',
    location: 'Remote (Worldwide / South Asia Friendly)',
    category: 'tech',
    jobType: 'Full-Time',
    salaryMin: 12000,
    salaryMax: 24000,
    salaryCurrency: 'USD',
    salaryPeriod: 'yearly',
    estSalaryPkr: '~$1,000 - $2,000/mo (~Rs 280,000 - 560,000 PKR/mo)',
    url: 'https://remoteok.com',
    pubDate: new Date(Date.now() - 3600000 * 2).toISOString(),
    tags: ['React', 'TypeScript', 'Tailwind', 'Entry-Level'],
    description: 'Looking for an enthusiastic Junior React developer to build responsive client dashboards and interactive user interfaces. Flexible working hours with remote team.',
    featured: true,
  },
  {
    id: 'curated-2',
    title: 'Remote Virtual Assistant & Customer Support Representative',
    company: 'Nexus Scale US',
    companyLogo: '',
    location: 'Remote (Anywhere)',
    category: 'support',
    jobType: 'Full-Time / Part-Time',
    salaryMin: 9600,
    salaryMax: 15000,
    salaryCurrency: 'USD',
    salaryPeriod: 'yearly',
    estSalaryPkr: '~$800 - $1,250/mo (~Rs 220,000 - 350,000 PKR/mo)',
    url: 'https://remoteok.com',
    pubDate: new Date(Date.now() - 3600000 * 5).toISOString(),
    tags: ['Virtual Assistant', 'Email Support', 'Zendesk', 'Chat'],
    description: 'Provide exceptional customer support via live chat, email, and ticket management for US e-commerce brands. Good English communication required.',
    featured: true,
  },
  {
    id: 'curated-3',
    title: 'SEO Content Writer & Copywriter (B2B SaaS)',
    company: 'GrowthForge Media',
    companyLogo: '',
    location: 'Remote (Worldwide)',
    category: 'writing',
    jobType: 'Contract / Flexible',
    salaryMin: 10000,
    salaryMax: 18000,
    salaryCurrency: 'USD',
    salaryPeriod: 'yearly',
    estSalaryPkr: '~$850 - $1,500/mo (~Rs 240,000 - 420,000 PKR/mo)',
    url: 'https://remoteok.com',
    pubDate: new Date(Date.now() - 3600000 * 8).toISOString(),
    tags: ['Content Writing', 'SEO', 'Blogs', 'WordPress'],
    description: 'Produce high-ranking blog posts, product comparisons, and engaging newsletters for international software companies.',
    featured: false,
  },
  {
    id: 'curated-4',
    title: 'Remote UI/UX Designer & Graphic Artist (Figma)',
    company: 'Studio PixelCraft',
    companyLogo: '',
    location: 'Remote (Global)',
    category: 'design',
    jobType: 'Full-Time',
    salaryMin: 14000,
    salaryMax: 28000,
    salaryCurrency: 'USD',
    salaryPeriod: 'yearly',
    estSalaryPkr: '~$1,200 - $2,300/mo (~Rs 330,000 - 640,000 PKR/mo)',
    url: 'https://remoteok.com',
    pubDate: new Date(Date.now() - 3600000 * 12).toISOString(),
    tags: ['Figma', 'UI/UX', 'Mobile Design', 'Web'],
    description: 'Design intuitive, modern web apps and mobile interfaces. Create wireframes, interactive prototypes, and design systems.',
    featured: false,
  },
  {
    id: 'curated-5',
    title: 'Remote Software Development Intern (Summer/Fall)',
    company: 'OpenCloud Labs',
    companyLogo: '',
    location: 'Remote (Open to University Students)',
    category: 'internship',
    jobType: 'Internship / Stipend',
    salaryMin: 6000,
    salaryMax: 10000,
    salaryCurrency: 'USD',
    salaryPeriod: 'yearly',
    estSalaryPkr: '~$500 - $800/mo (~Rs 140,000 - 220,000 PKR/mo)',
    url: 'https://remoteok.com',
    pubDate: new Date(Date.now() - 3600000 * 16).toISOString(),
    tags: ['Internship', 'Python', 'Node.js', 'Mentorship'],
    description: 'Paid internship for passionate computer science students and self-taught programmers. Gain real production code experience with senior mentor guidance.',
    featured: true,
  },
  {
    id: 'curated-6',
    title: 'Social Media & Growth Marketing Specialist',
    company: 'Elevate Brand Agency',
    companyLogo: '',
    location: 'Remote (Worldwide)',
    category: 'marketing',
    jobType: 'Full-Time',
    salaryMin: 12000,
    salaryMax: 22000,
    salaryCurrency: 'USD',
    salaryPeriod: 'yearly',
    estSalaryPkr: '~$1,000 - $1,800/mo (~Rs 280,000 - 500,000 PKR/mo)',
    url: 'https://remoteok.com',
    pubDate: new Date(Date.now() - 3600000 * 20).toISOString(),
    tags: ['TikTok', 'Instagram', 'Meta Ads', 'Organic Growth'],
    description: 'Manage brand social accounts, create short-form viral video hooks, and execute growth campaigns across Instagram, LinkedIn, and TikTok.',
    featured: false,
  },
];

function mapIndustryToCategory(industry: string[] = []): string {
  const ind = industry.map((i) => i.toLowerCase()).join(' ');
  if (ind.includes('eng') || ind.includes('tech') || ind.includes('dev') || ind.includes('data') || ind.includes('software')) return 'tech';
  if (ind.includes('design') || ind.includes('ui') || ind.includes('ux') || ind.includes('creative')) return 'design';
  if (ind.includes('writing') || ind.includes('content') || ind.includes('editor')) return 'writing';
  if (ind.includes('support') || ind.includes('customer') || ind.includes('admin') || ind.includes('assistant')) return 'support';
  if (ind.includes('market') || ind.includes('sales') || ind.includes('growth') || ind.includes('media')) return 'marketing';
  if (ind.includes('intern') || ind.includes('trainee') || ind.includes('junior')) return 'internship';
  return 'tech';
}

// In-memory cache to prevent hitting external rate limits & preserve jobs if third-party API is down
let cachedApiJobs: Job[] = [];
let lastFetchTime = 0;
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = (searchParams.get('category') || 'all').toLowerCase();
  const search = (searchParams.get('search') || '').toLowerCase().trim();

  const now = Date.now();
  let isFromCache = false;
  let isFallback = false;

  // Use cached data if fresh
  if (cachedApiJobs.length > 0 && now - lastFetchTime < CACHE_TTL_MS) {
    isFromCache = true;
  } else {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500); // 3.5s timeout

      const res = await fetch('https://jobicy.com/api/v2/remote-jobs?count=40', {
        signal: controller.signal,
        next: { revalidate: 1800 },
        headers: {
          'User-Agent': 'RemoteRozgar/1.0',
        },
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.jobs && Array.isArray(data.jobs)) {
          cachedApiJobs = data.jobs.map((item: any) => {
            const cat = mapIndustryToCategory(item.jobIndustry);
            const estSalary = formatSalaryPkr(item.salaryMin, item.salaryMax, item.salaryPeriod || 'yearly');

            return {
              id: `jobicy-${item.id}`,
              title: item.jobTitle,
              company: item.companyName,
              companyLogo: item.companyLogo || '',
              location: item.jobGeo || 'Remote (Worldwide)',
              category: cat,
              jobType: Array.isArray(item.jobType) ? item.jobType.join(', ') : (item.jobType || 'Full-Time'),
              salaryMin: item.salaryMin,
              salaryMax: item.salaryMax,
              salaryCurrency: item.salaryCurrency || 'USD',
              salaryPeriod: item.salaryPeriod || 'yearly',
              estSalaryPkr: estSalary,
              url: item.url,
              pubDate: item.pubDate,
              tags: Array.isArray(item.jobIndustry) ? item.jobIndustry : [cat],
              description: item.jobExcerpt || item.jobDescription || '',
              featured: false,
            } as Job;
          });
          lastFetchTime = now;
        }
      } else {
        isFallback = true;
      }
    } catch {
      // If external API fails, we serve existing cache or curated jobs
      isFallback = true;
    }
  }

  const apiJobs = cachedApiJobs;

  // Combine custom admin jobs (top priority) + curated + live API jobs
  const adminJobs = await getAdminJobs();
  let allJobs: Job[] = [...(adminJobs as Job[]), ...CURATED_PAKISTAN_ROLES, ...apiJobs];

  // Filter by category
  if (category !== 'all') {
    allJobs = allJobs.filter((job) => job.category === category);
  }

  // Filter by search query across title, company, tags, and description
  if (search) {
    allJobs = allJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(search) ||
        job.company.toLowerCase().includes(search) ||
        job.tags.some((t) => t.toLowerCase().includes(search)) ||
        job.description.toLowerCase().includes(search)
    );
  }

  return NextResponse.json({
    success: true,
    total: allJobs.length,
    cached: isFromCache,
    fallback: isFallback,
    jobs: allJobs,
  });
}
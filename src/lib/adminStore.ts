import { prisma } from './prisma';

export interface ClientSubmission {
  id: string;
  jobTitle: string;
  companyName: string;
  applyUrl: string;
  contactWhatsApp: string;
  notes: string;
  status: 'Pending Payment (Rs 1,500)' | 'Approved & Live' | 'Archived';
  date: string;
}

export interface AdminCustomJob {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  category: string;
  jobType: string;
  estSalaryPkr: string;
  url: string;
  pubDate: string;
  tags: string[];
  description: string;
  featured: boolean;
}

// ---------------------------------------------------------------------------
// Data layer: uses PostgreSQL via Prisma when DATABASE_URL is configured and
// `npx prisma generate` has run. Otherwise falls back to an in-memory store
// so local dev still works without a database — but note the fallback does
// NOT persist across serverless cold starts or restarts.
// ---------------------------------------------------------------------------

const _submissions: ClientSubmission[] = [
  {
    id: 'sub-1',
    jobTitle: 'Remote Next.js Developer',
    companyName: 'Lahore Softworks',
    applyUrl: 'https://lahoresoftworks.com/apply',
    contactWhatsApp: '+92 300 1234567',
    notes: 'Urgent hiring for full stack developer, paying in USD via Payoneer.',
    status: 'Pending Payment (Rs 1,500)',
    date: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
];

const _adminJobs: AdminCustomJob[] = [];

/** Returns all submissions (newest first). */
export async function getSubmissions(): Promise<ClientSubmission[]> {
  if (prisma) {
    const rows = await prisma.submission.findMany({ orderBy: { date: 'desc' } });
    return rows.map((r: any) => ({
      id: r.id,
      jobTitle: r.jobTitle,
      companyName: r.companyName,
      applyUrl: r.applyUrl,
      contactWhatsApp: r.contactWhatsApp || '',
      notes: r.notes || '',
      status: r.status as ClientSubmission['status'],
      date: r.date.toISOString(),
    }));
  }
  return _submissions;
}

/** Creates and returns a new submission. */
export async function addSubmission(
  data: Omit<ClientSubmission, 'id' | 'status' | 'date'>
): Promise<ClientSubmission> {
  const submission: ClientSubmission = {
    id: `sub-${Date.now()}`,
    ...data,
    status: 'Pending Payment (Rs 1,500)',
    date: new Date().toISOString(),
  };

  if (prisma) {
    await prisma.submission.create({
      data: {
        id: submission.id,
        jobTitle: submission.jobTitle,
        companyName: submission.companyName,
        applyUrl: submission.applyUrl,
        contactWhatsApp: submission.contactWhatsApp,
        notes: submission.notes,
        status: submission.status,
        date: new Date(submission.date),
      },
    });
  } else {
    _submissions.unshift(submission);
  }
  return submission;
}

/** Returns all admin-posted custom jobs (newest first). */
export async function getAdminJobs(): Promise<AdminCustomJob[]> {
  if (prisma) {
    const rows = await prisma.adminJob.findMany({ orderBy: { pubDate: 'desc' } });
    return rows.map((r: any) => ({
      id: r.id,
      title: r.title,
      company: r.company,
      companyLogo: r.companyLogo || '',
      location: r.location,
      category: r.category,
      jobType: r.jobType,
      estSalaryPkr: r.estSalaryPkr,
      url: r.url,
      pubDate: r.pubDate.toISOString(),
      tags: r.tags,
      description: r.description || '',
      featured: r.featured,
    }));
  }
  return _adminJobs;
}

/** Creates and returns a new admin-posted job. */
export async function addAdminJob(
  data: Omit<AdminCustomJob, 'id' | 'pubDate'>
): Promise<AdminCustomJob> {
  const job: AdminCustomJob = {
    ...data,
    id: `admin-job-${Date.now()}`,
    pubDate: new Date().toISOString(),
  };

  if (prisma) {
    await prisma.adminJob.create({
      data: {
        id: job.id,
        title: job.title,
        company: job.company,
        companyLogo: job.companyLogo,
        location: job.location,
        category: job.category,
        jobType: job.jobType,
        estSalaryPkr: job.estSalaryPkr,
        url: job.url,
        pubDate: new Date(job.pubDate),
        tags: job.tags,
        description: job.description,
        featured: job.featured,
      },
    });
  } else {
    _adminJobs.unshift(job);
  }
  return job;
}

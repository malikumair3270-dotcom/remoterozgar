import { getDbPool } from './db';
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
// Data layer: Uses PostgreSQL via connection pool when DATABASE_URL is configured.
// Supported by Prisma models and direct SQL fallback for 100% serverless uptime.
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
  const pool = getDbPool();
  if (pool) {
    try {
      const res = await pool.query('SELECT * FROM "Submission" ORDER BY "date" DESC');
      return res.rows.map((r) => ({
        id: r.id,
        jobTitle: r.jobTitle,
        companyName: r.companyName,
        applyUrl: r.applyUrl,
        contactWhatsApp: r.contactWhatsApp || '',
        notes: r.notes || '',
        status: r.status as ClientSubmission['status'],
        date: new Date(r.date).toISOString(),
      }));
    } catch (err) {
      console.error('Error fetching submissions from PostgreSQL:', err);
    }
  }

  if (prisma) {
    try {
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
    } catch (err) {
      console.error('Error fetching submissions from Prisma:', err);
    }
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

  const pool = getDbPool();
  if (pool) {
    try {
      await pool.query(
        'INSERT INTO "Submission" ("id", "jobTitle", "companyName", "applyUrl", "contactWhatsApp", "notes", "status", "date") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        [
          submission.id,
          submission.jobTitle,
          submission.companyName,
          submission.applyUrl,
          submission.contactWhatsApp || null,
          submission.notes || null,
          submission.status,
          new Date(submission.date),
        ]
      );
      return submission;
    } catch (err) {
      console.error('Error inserting submission into PostgreSQL:', err);
    }
  }

  if (prisma) {
    try {
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
      return submission;
    } catch (err) {
      console.error('Error inserting submission into Prisma:', err);
    }
  }

  _submissions.unshift(submission);
  return submission;
}

/** Returns all admin-posted custom jobs (newest first). */
export async function getAdminJobs(): Promise<AdminCustomJob[]> {
  const pool = getDbPool();
  if (pool) {
    try {
      const res = await pool.query('SELECT * FROM "AdminJob" ORDER BY "pubDate" DESC');
      return res.rows.map((r) => ({
        id: r.id,
        title: r.title,
        company: r.company,
        companyLogo: r.companyLogo || '',
        location: r.location,
        category: r.category,
        jobType: r.jobType,
        estSalaryPkr: r.estSalaryPkr,
        url: r.url,
        pubDate: new Date(r.pubDate).toISOString(),
        tags: Array.isArray(r.tags) ? r.tags : [],
        description: r.description || '',
        featured: r.featured ?? true,
      }));
    } catch (err) {
      console.error('Error fetching admin jobs from PostgreSQL:', err);
    }
  }

  if (prisma) {
    try {
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
    } catch (err) {
      console.error('Error fetching admin jobs from Prisma:', err);
    }
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

  const pool = getDbPool();
  if (pool) {
    try {
      await pool.query(
        'INSERT INTO "AdminJob" ("id", "title", "company", "companyLogo", "location", "category", "jobType", "estSalaryPkr", "url", "pubDate", "tags", "description", "featured") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',
        [
          job.id,
          job.title,
          job.company,
          job.companyLogo || '',
          job.location,
          job.category,
          job.jobType,
          job.estSalaryPkr,
          job.url,
          new Date(job.pubDate),
          job.tags,
          job.description || '',
          job.featured,
        ]
      );
      return job;
    } catch (err) {
      console.error('Error inserting admin job into PostgreSQL:', err);
    }
  }

  if (prisma) {
    try {
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
      return job;
    } catch (err) {
      console.error('Error inserting admin job into Prisma:', err);
    }
  }

  _adminJobs.unshift(job);
  return job;
}

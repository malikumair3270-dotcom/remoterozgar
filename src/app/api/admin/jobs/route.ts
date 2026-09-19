import { NextResponse } from 'next/server';
import { getAdminJobs, addAdminJob, AdminCustomJob } from '@/lib/adminStore';
import { isAdminAuthenticated } from '@/lib/authCrypto';
import { logger } from '@/lib/logger';

export async function GET(request: Request) {
  // 1. Strict Authentication Check
  if (!isAdminAuthenticated(request)) {
    logger.warn('Unauthorized access attempt to GET /api/admin/jobs');
    return NextResponse.json(
      { success: false, error: 'Unauthorized. Admin session required.' },
      { status: 401 }
    );
  }

  const jobs = await getAdminJobs();
  return NextResponse.json({
    success: true,
    total: jobs.length,
    jobs,
  });
}

export async function POST(request: Request) {
  // 1. Strict Authentication Check
  if (!isAdminAuthenticated(request)) {
    logger.warn('Unauthorized access attempt to POST /api/admin/jobs');
    return NextResponse.json(
      { success: false, error: 'Unauthorized. Admin session required.' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    if (!body.title || !body.company) {
      return NextResponse.json(
        { success: false, error: 'Job title and company name are required.' },
        { status: 400 }
      );
    }

    const sanitize = (str: unknown) =>
      typeof str === 'string' ? str.replace(/</g, '&lt;').replace(/>/g, '&gt;').trim() : '';

    const newJob: Omit<AdminCustomJob, 'id' | 'pubDate'> = {
      title: sanitize(body.title),
      company: sanitize(body.company),
      companyLogo: typeof body.companyLogo === 'string' ? body.companyLogo.trim() : '',
      location: sanitize(body.location) || 'Remote (Worldwide)',
      category: body.category || 'tech',
      jobType: body.jobType || 'Full-Time',
      estSalaryPkr: sanitize(body.estSalaryPkr) || 'Market Competitive (USD)',
      url: typeof body.url === 'string' && body.url.startsWith('http') ? body.url.trim() : '#',
      tags: Array.isArray(body.tags) ? body.tags.map(sanitize) : ['Remote', 'Featured'],
      description: sanitize(body.description),
      featured: true,
    };

    const created = await addAdminJob(newJob);
    logger.info('New custom admin job created', { jobId: created.id, title: created.title });

    return NextResponse.json({
      success: true,
      job: created,
    });
  } catch (error) {
    logger.error('Failed to create admin job', error);
    return NextResponse.json({ success: false, error: 'Failed to create job' }, { status: 500 });
  }
}

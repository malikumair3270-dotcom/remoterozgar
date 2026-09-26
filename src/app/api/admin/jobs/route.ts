import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // STRICT RULE: Every admin API route must verify HMAC session server-side and return 401 if invalid
  const isAuthenticated = await verifyAdminSession(request);
  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized: Admin session required' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const source = searchParams.get('source');

    const jobs = await prisma.job.findMany({
      where: {
        ...(status ? { status } : {}),
        ...(source ? { source } : {}),
      },
      orderBy: [
        { createdAt: 'desc' },
      ],
    });

    return NextResponse.json({
      success: true,
      jobs,
      count: jobs.length,
    });
  } catch (error) {
    console.error('[API /api/admin/jobs GET Error]:', error);
    return NextResponse.json({ error: 'Failed to retrieve jobs.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  // STRICT RULE: Every admin API route must verify HMAC session server-side and return 401 if invalid
  const isAuthenticated = await verifyAdminSession(request);
  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized: Admin session required' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      title,
      companyName,
      companyLogo,
      companyWebsite,
      category,
      location,
      jobType,
      salaryMinUsd,
      salaryMaxUsd,
      description,
      applyUrl,
      contactEmail,
      isFeatured,
      status,
      adminNotes,
    } = body;

    if (!title || !companyName || !category || !location || !description || !applyUrl) {
      return NextResponse.json({ error: 'Missing mandatory job fields.' }, { status: 400 });
    }

    let salaryFormatted = 'Competitive';
    if (salaryMinUsd && salaryMaxUsd) {
      salaryFormatted = `$${salaryMinUsd.toLocaleString()} - $${salaryMaxUsd.toLocaleString()} / mo`;
    } else if (salaryMinUsd) {
      salaryFormatted = `From $${salaryMinUsd.toLocaleString()} / mo`;
    } else if (salaryMaxUsd) {
      salaryFormatted = `Up to $${salaryMaxUsd.toLocaleString()} / mo`;
    }

    const newJob = await prisma.job.create({
      data: {
        title: title.trim(),
        companyName: companyName.trim(),
        companyLogo: companyLogo ? companyLogo.trim() : null,
        companyWebsite: companyWebsite ? companyWebsite.trim() : null,
        category: category.trim(),
        location: location.trim(),
        jobType: jobType || 'Full-Time',
        salaryMinUsd: salaryMinUsd ? Number(salaryMinUsd) : null,
        salaryMaxUsd: salaryMaxUsd ? Number(salaryMaxUsd) : null,
        salaryFormatted,
        description: description.trim(),
        applyUrl: applyUrl.trim(),
        contactEmail: contactEmail ? contactEmail.trim().toLowerCase() : null,
        isFeatured: Boolean(isFeatured),
        status: status || 'APPROVED',
        source: 'ADMIN',
        adminNotes: adminNotes || null,
        pubDate: new Date(),
      },
    });

    return NextResponse.json({ success: true, job: newJob }, { status: 201 });
  } catch (error) {
    console.error('[API /api/admin/jobs POST Error]:', error);
    return NextResponse.json({ error: 'Failed to create job.' }, { status: 500 });
  }
}

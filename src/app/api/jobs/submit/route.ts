import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    // 1. Database-backed rate limiting (max 5 submissions per 30 mins per IP)
    const ip = getClientIp(request.headers);
    const rateLimit = await checkRateLimit(`job_submit:${ip}`, 5, 1800);

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: `Too many submissions from your network. Please wait ${rateLimit.resetInSeconds} seconds before trying again.`,
        },
        { status: 429 }
      );
    }

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
    } = body;

    // Strict field validation
    if (!title || !companyName || !category || !location || !description || !applyUrl || !contactEmail) {
      return NextResponse.json(
        { error: 'Missing required fields. Please fill out all mandatory inputs.' },
        { status: 400 }
      );
    }

    // Format salary display string
    let salaryFormatted = 'Competitive';
    if (salaryMinUsd && salaryMaxUsd) {
      salaryFormatted = `$${salaryMinUsd.toLocaleString()} - $${salaryMaxUsd.toLocaleString()} / mo`;
    } else if (salaryMinUsd) {
      salaryFormatted = `From $${salaryMinUsd.toLocaleString()} / mo`;
    } else if (salaryMaxUsd) {
      salaryFormatted = `Up to $${salaryMaxUsd.toLocaleString()} / mo`;
    }

    // Create job with PENDING status and SUBMISSION source
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
        contactEmail: contactEmail.trim().toLowerCase(),
        status: 'PENDING', // PENDING: does NOT appear publicly until approved
        source: 'SUBMISSION',
        isFeatured: false,
        pubDate: new Date(),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Job submitted successfully for review.',
        jobId: newJob.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[API /api/jobs/submit Error]:', error);
    return NextResponse.json(
      { error: 'Internal server error while saving job submission.' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  // STRICT RULE: Every admin API route must verify HMAC session server-side and return 401 if invalid
  const isAuthenticated = await verifyAdminSession(request);
  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized: Admin session required' }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const body = await request.json();
    const updated = await prisma.job.update({
      where: { id },
      data: {
        ...(body.title !== undefined ? { title: body.title.trim() } : {}),
        ...(body.companyName !== undefined ? { companyName: body.companyName.trim() } : {}),
        ...(body.category !== undefined ? { category: body.category.trim() } : {}),
        ...(body.location !== undefined ? { location: body.location.trim() } : {}),
        ...(body.jobType !== undefined ? { jobType: body.jobType } : {}),
        ...(body.salaryMinUsd !== undefined ? { salaryMinUsd: body.salaryMinUsd ? Number(body.salaryMinUsd) : null } : {}),
        ...(body.salaryMaxUsd !== undefined ? { salaryMaxUsd: body.salaryMaxUsd ? Number(body.salaryMaxUsd) : null } : {}),
        ...(body.salaryFormatted !== undefined ? { salaryFormatted: body.salaryFormatted } : {}),
        ...(body.description !== undefined ? { description: body.description.trim() } : {}),
        ...(body.applyUrl !== undefined ? { applyUrl: body.applyUrl.trim() } : {}),
        ...(body.status !== undefined ? { status: body.status } : {}),
        ...(body.isFeatured !== undefined ? { isFeatured: Boolean(body.isFeatured) } : {}),
        ...(body.adminNotes !== undefined ? { adminNotes: body.adminNotes } : {}),
      },
    });

    return NextResponse.json({ success: true, job: updated });
  } catch (error) {
    console.error(`[API /api/admin/jobs/${id} PUT Error]:`, error);
    return NextResponse.json({ error: 'Failed to update job.' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  // STRICT RULE: Every admin API route must verify HMAC session server-side and return 401 if invalid
  const isAuthenticated = await verifyAdminSession(request);
  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized: Admin session required' }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    await prisma.job.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Job deleted successfully.' });
  } catch (error) {
    console.error(`[API /api/admin/jobs/${id} DELETE Error]:`, error);
    return NextResponse.json({ error: 'Failed to delete job.' }, { status: 500 });
  }
}

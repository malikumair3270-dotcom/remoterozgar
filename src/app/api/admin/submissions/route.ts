import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

/**
 * GET: Admin-only endpoint to retrieve all pending client submissions from Job table
 */
export async function GET(request: NextRequest) {
  // STRICT RULE: Every admin API route must verify HMAC session server-side and return 401 if invalid
  const isAuthenticated = await verifyAdminSession(request);
  if (!isAuthenticated) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Admin session required' },
      { status: 401 }
    );
  }

  try {
    const submissions = await prisma.job.findMany({
      where: {
        source: 'SUBMISSION',
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      total: submissions.length,
      submissions,
    });
  } catch (error) {
    console.error('[API /api/admin/submissions GET Error]:', error);
    return NextResponse.json({ success: false, error: 'Failed to retrieve submissions.' }, { status: 500 });
  }
}
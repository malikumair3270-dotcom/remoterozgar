import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getUsdToPkrRate } from '@/lib/fx';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // STRICT RULE: Every admin API route must verify HMAC session server-side and return 401 if invalid
  const isAuthenticated = await verifyAdminSession(request);
  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized: Admin session required' }, { status: 401 });
  }

  try {
    const [
      totalJobs,
      approvedJobs,
      pendingSubmissions,
      rejectedSubmissions,
      totalGuides,
      latestSnapshot,
      usdRate,
    ] = await Promise.all([
      prisma.job.count(),
      prisma.job.count({ where: { status: 'APPROVED' } }),
      prisma.job.count({ where: { status: 'PENDING' } }),
      prisma.job.count({ where: { status: 'REJECTED' } }),
      prisma.guide.count(),
      prisma.jobSnapshot.findFirst({
        orderBy: { createdAt: 'desc' },
      }),
      getUsdToPkrRate(),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        totalJobs,
        approvedJobs,
        pendingSubmissions,
        rejectedSubmissions,
        totalGuides,
        usdToPkrRate: usdRate,
        lastJobicySync: latestSnapshot ? latestSnapshot.createdAt : null,
        lastJobicyCount: latestSnapshot ? latestSnapshot.jobCount : 0,
      },
    });
  } catch (error) {
    console.error('[API /api/admin/stats Error]:', error);
    return NextResponse.json({ error: 'Failed to retrieve admin dashboard stats.' }, { status: 500 });
  }
}

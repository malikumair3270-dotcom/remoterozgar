import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import { getAggregatedJobs } from '@/lib/jobs';

export async function POST(request: NextRequest) {
  // STRICT RULE: Every admin API route must verify HMAC session server-side and return 401 if invalid
  const isAuthenticated = await verifyAdminSession(request);
  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized: Admin session required' }, { status: 401 });
  }

  try {
    const result = await getAggregatedJobs({ count: 100 });

    return NextResponse.json({
      success: true,
      message: `Successfully synchronized ${result.jobs.length} remote jobs.`,
      count: result.jobs.length,
      fromCache: result.fromCache,
    });
  } catch (error) {
    console.error('[API /api/admin/sync-jobs Error]:', error);
    return NextResponse.json({ error: 'Failed to synchronize Jobicy jobs feed.' }, { status: 500 });
  }
}

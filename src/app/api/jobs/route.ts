import { NextRequest, NextResponse } from 'next/server';
import { getAggregatedJobs } from '@/lib/jobs';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || '';
    const search = searchParams.get('search') || '';
    const count = parseInt(searchParams.get('count') || '60', 10);

    const result = await getAggregatedJobs({
      category,
      search,
      count,
    });

    return NextResponse.json({
      success: true,
      jobs: result.jobs,
      fromCache: result.fromCache,
      count: result.jobs.length,
    });
  } catch (error) {
    console.error('[API /api/jobs Error]:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve remote jobs.',
        jobs: [],
        count: 0,
      },
      { status: 500 }
    );
  }
}
import { NextResponse } from 'next/server';
import { getUsdToPkrRate } from '@/lib/fx';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const rate = await getUsdToPkrRate();
    return NextResponse.json({
      success: true,
      rate,
      base: 'USD',
      target: 'PKR',
    });
  } catch (error) {
    console.error('[API /api/fx Error]:', error);
    return NextResponse.json(
      {
        success: false,
        rate: null,
      },
      { status: 500 }
    );
  }
}

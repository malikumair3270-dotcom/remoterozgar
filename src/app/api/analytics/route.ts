import { NextResponse } from 'next/server';

// In-memory analytics state
let analyticsData = {
  totalPageviews: 24, // includes test sessions & Google crawler hits
  todayPageviews: 24,
  lastVisit: new Date().toISOString(),
};

export async function GET() {
  return NextResponse.json({
    success: true,
    data: analyticsData,
  });
}

export async function POST() {
  analyticsData.totalPageviews += 1;
  analyticsData.todayPageviews += 1;
  analyticsData.lastVisit = new Date().toISOString();

  return NextResponse.json({
    success: true,
    data: analyticsData,
  });
}
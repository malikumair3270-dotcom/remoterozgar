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
    const guides = await prisma.guide.findMany({
      orderBy: { publishedDate: 'desc' },
    });

    return NextResponse.json({ success: true, guides, count: guides.length });
  } catch (error) {
    console.error('[API /api/admin/guides GET Error]:', error);
    return NextResponse.json({ error: 'Failed to retrieve guides.' }, { status: 500 });
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
      slug,
      category,
      excerpt,
      body: contentBody,
      coverImage,
      readTimeMinutes,
      isFeatured,
    } = body;

    if (!title || !slug || !category || !excerpt || !contentBody || !coverImage) {
      return NextResponse.json({ error: 'Missing mandatory guide fields.' }, { status: 400 });
    }

    const cleanSlug = slug
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    const newGuide = await prisma.guide.create({
      data: {
        title: title.trim(),
        slug: cleanSlug,
        category: category.trim(),
        excerpt: excerpt.trim(),
        body: contentBody.trim(),
        coverImage: coverImage.trim(),
        readTimeMinutes: Number(readTimeMinutes) || 8,
        isFeatured: Boolean(isFeatured),
        publishedDate: new Date(),
      },
    });

    return NextResponse.json({ success: true, guide: newGuide }, { status: 201 });
  } catch (error) {
    console.error('[API /api/admin/guides POST Error]:', error);
    return NextResponse.json({ error: 'Failed to create guide.' }, { status: 500 });
  }
}

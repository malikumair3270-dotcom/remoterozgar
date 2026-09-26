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
    const updated = await prisma.guide.update({
      where: { id },
      data: {
        ...(body.title !== undefined ? { title: body.title.trim() } : {}),
        ...(body.slug !== undefined ? { slug: body.slug.trim() } : {}),
        ...(body.category !== undefined ? { category: body.category.trim() } : {}),
        ...(body.excerpt !== undefined ? { excerpt: body.excerpt.trim() } : {}),
        ...(body.body !== undefined ? { body: body.body.trim() } : {}),
        ...(body.coverImage !== undefined ? { coverImage: body.coverImage.trim() } : {}),
        ...(body.readTimeMinutes !== undefined ? { readTimeMinutes: Number(body.readTimeMinutes) } : {}),
        ...(body.isFeatured !== undefined ? { isFeatured: Boolean(body.isFeatured) } : {}),
      },
    });

    return NextResponse.json({ success: true, guide: updated });
  } catch (error) {
    console.error(`[API /api/admin/guides/${id} PUT Error]:`, error);
    return NextResponse.json({ error: 'Failed to update guide.' }, { status: 500 });
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
    await prisma.guide.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Guide deleted successfully.' });
  } catch (error) {
    console.error(`[API /api/admin/guides/${id} DELETE Error]:`, error);
    return NextResponse.json({ error: 'Failed to delete guide.' }, { status: 500 });
  }
}

import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';
import { SEED_GUIDES } from '@/lib/guides-seed-data';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.SITE_URL || 'https://remoterozgar.vercel.app').replace(/\/+$/, '');
  const now = new Date();

  // Static routes with priorities
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/jobs`,
      lastModified: now,
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/post-a-job`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ];

  // Dynamic guide routes
  let guideEntries: MetadataRoute.Sitemap = [];
  try {
    const guides = await prisma.guide.findMany({
      select: { slug: true, updatedAt: true, publishedDate: true },
    });

    if (guides.length > 0) {
      guideEntries = guides.map((g) => ({
        url: `${baseUrl}/guides/${g.slug}`,
        lastModified: g.updatedAt || g.publishedDate || now,
        changeFrequency: 'weekly',
        priority: 0.85,
      }));
    }
  } catch {
    // Non-blocking fallback to seed data
  }

  if (guideEntries.length === 0) {
    guideEntries = SEED_GUIDES.map((g) => ({
      url: `${baseUrl}/guides/${g.slug}`,
      lastModified: new Date(g.publishedDate),
      changeFrequency: 'weekly',
      priority: 0.85,
    }));
  }

  return [...staticRoutes, ...guideEntries];
}

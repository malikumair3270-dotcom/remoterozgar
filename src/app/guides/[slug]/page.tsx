import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { SEED_GUIDES } from '@/lib/guides-seed-data';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { TableOfContents } from '@/components/TableOfContents';
import { RelatedGuides } from '@/components/RelatedGuides';
import { GuideListItem } from '@/components/GuideCard';
import { Calendar, Clock, ArrowLeft, Share2, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600; // 1 hour

export async function generateStaticParams() {
  return SEED_GUIDES.map((g) => ({
    slug: g.slug,
  }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide =
    (await prisma.guide.findUnique({ where: { slug } }).catch(() => null)) ||
    SEED_GUIDES.find((g) => g.slug === slug);

  if (!guide) {
    return { title: 'Guide Not Found' };
  }

  return {
    title: guide.title,
    description: guide.excerpt,
    openGraph: {
      title: `${guide.title} | RemoteRozgar`,
      description: guide.excerpt,
      type: 'article',
      publishedTime: new Date(guide.publishedDate).toISOString(),
      authors: ['RemoteRozgar Editorial Team'],
      images: [{ url: guide.coverImage, width: 1200, height: 630, alt: guide.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.excerpt,
      images: [guide.coverImage],
    },
  };
}

export default async function GuideDetailPage({ params }: GuidePageProps) {
  const { slug } = await params;

  // Retrieve current guide
  let guide = await prisma.guide.findUnique({ where: { slug } }).catch(() => null);
  if (!guide) {
    const seedMatch = SEED_GUIDES.find((g) => g.slug === slug);
    if (seedMatch) {
      guide = {
        id: seedMatch.slug,
        slug: seedMatch.slug,
        title: seedMatch.title,
        category: seedMatch.category,
        excerpt: seedMatch.excerpt,
        body: seedMatch.body,
        coverImage: seedMatch.coverImage,
        publishedDate: new Date(seedMatch.publishedDate),
        readTimeMinutes: seedMatch.readTimeMinutes,
        isFeatured: seedMatch.isFeatured,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
  }

  if (!guide) {
    notFound();
  }

  // Retrieve other guides for related recommendations
  let allGuides: GuideListItem[] = [];
  try {
    const dbGuides = await prisma.guide.findMany({ take: 10 });
    if (dbGuides.length > 0) {
      allGuides = dbGuides.map((g) => ({
        slug: g.slug,
        title: g.title,
        category: g.category,
        excerpt: g.excerpt,
        coverImage: g.coverImage,
        publishedDate: g.publishedDate,
        readTimeMinutes: g.readTimeMinutes,
      }));
    }
  } catch {}

  if (allGuides.length === 0) {
    allGuides = SEED_GUIDES.map((g) => ({
      slug: g.slug,
      title: g.title,
      category: g.category,
      excerpt: g.excerpt,
      coverImage: g.coverImage,
      publishedDate: g.publishedDate,
      readTimeMinutes: g.readTimeMinutes,
    }));
  }

  const formattedDate = new Date(guide.publishedDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // Schema.org Article JSON-LD
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.excerpt,
    image: [guide.coverImage],
    datePublished: new Date(guide.publishedDate).toISOString(),
    dateModified: new Date(guide.updatedAt || guide.publishedDate).toISOString(),
    author: {
      '@type': 'Organization',
      name: 'RemoteRozgar Editorial Team',
      url: 'https://remoterozgar.vercel.app/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'RemoteRozgar',
      logo: {
        '@type': 'ImageObject',
        url: 'https://remoterozgar.vercel.app/favicon.ico',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://remoterozgar.vercel.app/guides/${guide.slug}`,
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Schema.org Article JSON-LD Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Navigation Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-coolgray-500 mb-6">
        <Link href="/" className="hover:text-navy-900 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/guides" className="hover:text-navy-900 transition-colors">
          Guides
        </Link>
        <span>/</span>
        <span className="text-navy-900 font-semibold truncate max-w-xs">{guide.title}</span>
      </nav>

      {/* Article Header */}
      <header className="space-y-4 mb-8">
        <div className="flex items-center gap-2.5">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800">
            {guide.category}
          </span>
          <span className="text-xs text-coolgray-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {guide.readTimeMinutes} min read
          </span>
          <span className="text-xs text-coolgray-500 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> {formattedDate}
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 tracking-tight leading-tight">
          {guide.title}
        </h1>

        <p className="text-base sm:text-lg text-coolgray-600 leading-relaxed">
          {guide.excerpt}
        </p>

        {/* Author & Verification Card */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-coolgray-100/70 border border-coolgray-200 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-navy-900 text-white flex items-center justify-center font-bold">
              RR
            </div>
            <div>
              <span className="font-bold text-navy-900 block">RemoteRozgar Editorial Team</span>
              <span className="text-coolgray-500">Research & Verification Desk</span>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Verified for Pakistan (2026)
          </span>
        </div>
      </header>

      {/* Hero Cover Image */}
      <div className="aspect-16/9 w-full overflow-hidden rounded-3xl mb-8 border border-coolgray-200 shadow-sm">
        <img
          src={guide.coverImage}
          alt={guide.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Grid Layout: Table of Contents & Article Body */}
      <div className="space-y-8">
        {/* Table of Contents */}
        <TableOfContents content={guide.body} />

        {/* Markdown Rendered Body */}
        <div className="prose prose-navy max-w-none">
          <MarkdownRenderer content={guide.body} />
        </div>
      </div>

      {/* Related Guides Footer */}
      <RelatedGuides currentSlug={guide.slug} guides={allGuides} />
    </div>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { SEED_GUIDES } from '@/lib/guides-seed-data';
import { GuideCard, GuideListItem } from '@/components/GuideCard';
import { BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Remote Work Career Guides — Practical Blueprints for Pakistan',
  description:
    '14 in-depth career guides written specifically for Pakistani remote workers: FBR tax compliance, receiving USD payments, ATS resumes, time zone management, and scam defense.',
};

export const revalidate = 3600; // 1 hour

export default async function GuidesListingPage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) {
  const categoryFilter = searchParams.category || 'All';
  const searchQuery = (searchParams.search || '').toLowerCase().trim();

  let allGuides: GuideListItem[] = [];
  try {
    const dbGuides = await prisma.guide.findMany({
      orderBy: { publishedDate: 'desc' },
    });

    if (dbGuides.length > 0) {
      allGuides = dbGuides.map((g) => ({
        slug: g.slug,
        title: g.title,
        category: g.category,
        excerpt: g.excerpt,
        coverImage: g.coverImage,
        publishedDate: g.publishedDate,
        readTimeMinutes: g.readTimeMinutes,
        isFeatured: g.isFeatured,
      }));
    }
  } catch {
    // Non-blocking fallback
  }

  if (allGuides.length === 0) {
    allGuides = SEED_GUIDES.map((g) => ({
      slug: g.slug,
      title: g.title,
      category: g.category,
      excerpt: g.excerpt,
      coverImage: g.coverImage,
      publishedDate: g.publishedDate,
      readTimeMinutes: g.readTimeMinutes,
      isFeatured: g.isFeatured,
    }));
  }

  // Filter categories
  const categories = [
    'All',
    'Career Growth',
    'Finance & Payments',
    'Resumes & Portfolios',
    'Skills & Tech',
    'Workplace & Culture',
    'Safety & Verification',
  ];

  const filteredGuides = allGuides.filter((g) => {
    if (categoryFilter !== 'All' && g.category.toLowerCase() !== categoryFilter.toLowerCase()) {
      return false;
    }
    if (searchQuery) {
      return (
        g.title.toLowerCase().includes(searchQuery) ||
        g.excerpt.toLowerCase().includes(searchQuery) ||
        g.category.toLowerCase().includes(searchQuery)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <nav className="flex items-center gap-2 text-xs text-coolgray-500 mb-3">
          <Link href="/" className="hover:text-navy-900 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-navy-900 font-semibold">Career Guides</span>
        </nav>

        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-600 mb-1">
          <BookOpen className="w-4 h-4" /> Comprehensive Knowledge Base
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-navy-900 tracking-tight">
          Remote Career Guides for Pakistan
        </h1>
        <p className="text-sm text-coolgray-600 mt-2 max-w-2xl leading-relaxed">
          In-depth, non-generic tactical roadmaps covering legal tax exemptions, international banking, high-paying skills, and time-zone mastery.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = categoryFilter.toLowerCase() === cat.toLowerCase();
          return (
            <Link
              key={cat}
              href={cat === 'All' ? '/guides' : `/guides?category=${encodeURIComponent(cat)}`}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-navy-900 text-white shadow-xs'
                  : 'bg-white text-coolgray-600 border border-coolgray-200 hover:text-navy-900 hover:bg-coolgray-50'
              }`}
            >
              {cat}
            </Link>
          );
        })}
      </div>

      {/* Guides Grid */}
      {filteredGuides.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-coolgray-200">
          <h3 className="font-bold text-navy-900 text-base">No guides found</h3>
          <p className="text-xs text-coolgray-500 mt-1">Try selecting a different category above.</p>
        </div>
      )}
    </div>
  );
}

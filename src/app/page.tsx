import React from 'react';
import Link from 'next/link';
import { getAggregatedJobs } from '@/lib/jobs';
import { getUsdToPkrRate } from '@/lib/fx';
import { prisma } from '@/lib/prisma';
import { SEED_GUIDES } from '@/lib/guides-seed-data';
import { JobsFeed } from '@/components/JobsFeed';
import { GuideCard, GuideListItem } from '@/components/GuideCard';
import {
  Globe2,
  ShieldCheck,
  Zap,
  ArrowRight,
  TrendingUp,
  FileText,
  DollarSign,
  CheckCircle2,
  Building,
  Users,
} from 'lucide-react';

export const revalidate = 900; // 15 minutes ISR

export default async function HomePage() {
  // Fetch initial aggregated jobs (Jobicy + Approved DB jobs)
  const [jobsResult, usdRate] = await Promise.all([
    getAggregatedJobs({ count: 60 }),
    getUsdToPkrRate(),
  ]);

  // Fetch featured guides from DB or fallback
  let featuredGuides: GuideListItem[] = [];
  try {
    const dbGuides = await prisma.guide.findMany({
      where: { isFeatured: true },
      take: 3,
      orderBy: { publishedDate: 'desc' },
    });

    if (dbGuides.length > 0) {
      featuredGuides = dbGuides.map((g) => ({
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
    // Non-blocking fallback to seed guides
  }

  if (featuredGuides.length === 0) {
    featuredGuides = SEED_GUIDES.filter((g) => g.isFeatured).slice(0, 3).map((g) => ({
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

  // WebSite JSON-LD Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'RemoteRozgar',
    url: 'https://remoterozgar.vercel.app',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://remoterozgar.vercel.app/jobs?search={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Schema.org WebSite Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(56,189,248,0.15),rgba(255,255,255,0))]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Trust Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-800/80 border border-navy-700/80 text-xs font-semibold text-sky-400 backdrop-blur-md shadow-xs animate-in fade-in duration-300">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Dedicated Remote Jobs Platform for Pakistan & South Asia</span>
          </div>

          {/* Headline in IBM Plex Serif & Inter */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight sm:leading-tight">
            Earn in <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">US Dollars</span>,
            Live in <span className="text-white">Pakistan</span>.
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-coolgray-300 max-w-2xl mx-auto leading-relaxed">
            Discover verified global remote engineering, design, writing, and operations roles paying international wages with direct employer application links. No bidding wars. No scams.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href="#jobs-feed"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-navy-950 bg-sky-400 hover:bg-sky-300 shadow-lg shadow-sky-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Verified Jobs</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              href="/resources"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-navy-800/80 border border-navy-700 hover:bg-navy-800 transition-all hover:scale-[1.02]"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Get Free ATS Resume Templates</span>
            </Link>
          </div>

          {/* Metric Bar */}
          <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-navy-800/80 text-left">
            <div className="p-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-white block">100+</span>
              <span className="text-xs text-coolgray-400">Live Global Roles</span>
            </div>
            <div className="p-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 block">
                {usdRate ? `Rs. ${Math.round(usdRate)}` : '278+'}
              </span>
              <span className="text-xs text-coolgray-400">PKR per 1 USD</span>
            </div>
            <div className="p-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-sky-400 block">100%</span>
              <span className="text-xs text-coolgray-400">Direct Employer Apply</span>
            </div>
            <div className="p-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 block">$0</span>
              <span className="text-xs text-coolgray-400">No Bidding or Connects</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Jobs Section */}
      <section id="jobs-feed" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-600 mb-1">
              <Zap className="w-3.5 h-3.5" /> Live Job Aggregator
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
              Latest Remote Openings
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-coolgray-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Direct Company Links
            </span>
            <span className="flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-sky-500" />
              USD to PKR Converted
            </span>
          </div>
        </div>

        {/* Live Client JobsFeed Component */}
        <JobsFeed
          initialJobs={jobsResult.jobs}
          usdRate={usdRate}
          fromCache={jobsResult.fromCache}
        />
      </section>

      {/* Featured Career Guides Section */}
      <section className="bg-coolgray-100/60 py-16 border-y border-coolgray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600 block mb-1">
                Knowledge Base & Guidance
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-navy-900">
                Essential Guides for Pakistani Remote Workers
              </h2>
              <p className="text-xs sm:text-sm text-coolgray-600 mt-1 max-w-xl">
                Written specifically for South Asian professionals: tax filing, banking PRCs, time-zone management, and beating load shedding.
              </p>
            </div>

            <Link
              href="/guides"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700 transition-colors shrink-0"
            >
              <span>View All 14 Guides</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredGuides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </div>
      </section>

      {/* CV Templates Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-navy-900 overflow-hidden text-white p-8 sm:p-12 border border-navy-800 shadow-xl">
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.8),transparent)] pointer-events-none" />

          <div className="relative max-w-2xl space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/20 text-sky-400 border border-sky-400/30 inline-block">
              Free Career Toolkit
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Stop Getting Rejected by Automated ATS Scanners
            </h2>

            <p className="text-sm sm:text-base text-coolgray-300 leading-relaxed">
              Traditional multi-column Pakistani CVs fail automated screening tools at Greenhouse and Ashby. We engineered two 100% ATS-compliant templates designed specifically for remote tech and creative candidates.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <Link
                href="/resources"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-navy-950 bg-sky-400 hover:bg-sky-300 transition-all shadow-md"
              >
                <span>Download ATS Templates</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <span className="text-xs text-coolgray-400">Available in Markdown & Copyable Text</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

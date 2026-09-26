import React from 'react';
import type { Metadata } from 'next';
import { getAggregatedJobs } from '@/lib/jobs';
import { getUsdToPkrRate } from '@/lib/fx';
import { JobsFeed } from '@/components/JobsFeed';
import { Briefcase, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Remote Jobs Board — Verified Global Positions for Pakistan',
  description:
    'Browse verified global remote jobs in Tech, Design, Writing, Customer Support, and Marketing. Direct employer apply links and real-time USD to PKR salary estimates.',
};

export const revalidate = 900; // 15 minutes

export default async function JobsPage() {
  const [jobsResult, usdRate] = await Promise.all([
    getAggregatedJobs({ count: 100 }),
    getUsdToPkrRate(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header & Breadcrumb */}
      <div>
        <nav className="flex items-center gap-2 text-xs text-coolgray-500 mb-3">
          <Link href="/" className="hover:text-navy-900 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-navy-900 font-semibold">Jobs Board</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
          Verified Global Remote Jobs
        </h1>
        <p className="text-sm text-coolgray-600 mt-2 max-w-2xl leading-relaxed">
          Aggregated live from verified remote employers worldwide. Every listing links directly to the real application page with estimated Pakistani Rupee take-home earnings.
        </p>
      </div>

      {/* Feed Component */}
      <JobsFeed
        initialJobs={jobsResult.jobs}
        usdRate={usdRate}
        fromCache={jobsResult.fromCache}
      />
    </div>
  );
}

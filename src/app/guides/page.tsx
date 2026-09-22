import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CAREER_GUIDES } from '@/lib/guidesData';
import { BookOpen, Clock, ArrowRight, DollarSign, ShieldCheck, Sparkles, Compass, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Remote Career Guides & Blueprints for Pakistanis - RemoteRozgar',
  description: 'Comprehensive, actionable guides on landing legitimate USD-paying remote jobs, virtual assistant careers, software engineering roles, ATS resumes, and international payment methods from Pakistan.',
  keywords: [
    'remote jobs pakistan guide',
    'earn usd in pakistan',
    'remote data entry jobs pakistan',
    'payoneer pakistan tax guide',
    'ats resume guide remote jobs',
    'pseb freelancer 0.25 tax',
  ],
};

export default function GuidesHubPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-800">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex-1">
        {/* Header Hero */}
        <div className="bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 rounded-3xl p-8 sm:p-14 text-white shadow-xl mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-4">
              <Compass className="h-3.5 w-3.5" />
              <span>Career Blueprints & Educational Resources</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
              Master the Global Remote Economy from <span className="text-emerald-400">Pakistan</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              In-depth, authentic career roadmaps written specifically for Pakistani freelancers, graduates, and professionals. Learn how to secure legitimate remote contracts paying in US Dollars, optimize your ATS resume, and withdraw earnings legally with minimum taxes.
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-slate-300 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                100% Free & No Upsells
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                Updated for 2026 Standards
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Verified Legal & Tax Guidance
              </span>
            </div>
          </div>
        </div>

        {/* Quick Links / Tools Banner */}
        <div className="mb-10 bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 text-[11px] font-bold uppercase tracking-wider">
              Interactive Tools
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              Calculate Your USD to PKR Take-Home Pay & Check Resume Score
            </h3>
            <p className="text-xs text-slate-500">
              Use our real-time freelance tax calculator and ATS resume checker to optimize your remote job applications.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/tools/tax-calculator"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-brand-700 transition-colors shadow-sm"
            >
              <DollarSign className="h-4 w-4" />
              <span>USD/PKR Tax Calculator</span>
            </Link>
            <Link
              href="/tools/resume-checker"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <span>ATS Resume Audit Tool</span>
            </Link>
          </div>
        </div>

        {/* Section Heading */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">Featured Career Roadmaps</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select a guide below to read step-by-step instructions, skill requirements, and salary benchmarks.
            </p>
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {CAREER_GUIDES.map((guide) => (
            <article
              key={guide.slug}
              className="bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-500/50 transition-all hover:shadow-md flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold">
                    {guide.category}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="h-3 w-3" />
                    {guide.readTime}
                  </span>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                    {guide.subtitle}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-slate-600 font-semibold">
                    <DollarSign className="h-3.5 w-3.5 text-emerald-600" />
                    <span>{guide.salaryRange.usd}</span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {guide.salaryRange.pkr}
                  </span>
                </div>
              </div>

              <div className="bg-slate-50/80 px-6 py-3.5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-medium text-slate-400">
                  By {guide.author.name}
                </span>
                <Link
                  href={`/guides/${guide.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

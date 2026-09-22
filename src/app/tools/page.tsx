import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Calculator,
  FileCheck,
  ArrowRight,
  TrendingUp,
  FileText,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

export const metadata = {
  title: 'Free Remote Career Tools for Pakistani Freelancers - RemoteRozgar',
  description:
    'Free interactive suite of 5 tools for Pakistani remote job seekers: USD to PKR Freelance Tax Calculator, ATS Resume Checker, Hourly Retainer Calculator, Cover Letter Generator, and Remote Interview Simulator.',
};

const TOOLS = [
  {
    title: 'USD to PKR Freelancer Income & Tax Calculator',
    slug: 'tax-calculator',
    category: 'Finance & Tax',
    description:
      'Calculate monthly net take-home pay in PKR from hourly or monthly USD income. Includes Section 154A PSEB 0.25% export tax vs non-filer rates and payment gateway spreads (Payoneer, SadaBiz).',
    icon: Calculator,
    color: 'emerald',
    tags: ['PSEB 0.25% Tax Slabs', 'Payoneer Margins', 'Net PKR In-Hand'],
  },
  {
    title: 'ATS Remote Resume Readiness Audit',
    slug: 'resume-checker',
    category: 'Recruitment & ATS',
    description:
      'Audit your CV against 11 critical international ATS standards before applying to US and European companies. Eliminate disqualifiers like CNIC, photos, and unparseable columns.',
    icon: FileCheck,
    color: 'brand',
    tags: ['US Legal Compliance', 'Google XYZ Formula', 'Instant Score'],
  },
  {
    title: 'Remote Hourly Rate & Retainer Calculator',
    slug: 'hourly-calculator',
    category: 'Pricing Strategy',
    description:
      'Enter your target monthly PKR savings, and calculate the exact minimum USD hourly rate, 20-hour part-time retainer, and 40-hour full-time quote to pitch to international employers.',
    icon: TrendingUp,
    color: 'blue',
    tags: ['Billable Hours', 'Buffer Estimates', 'Full-Time Retainer'],
  },
  {
    title: 'ATS Remote Cover Letter Generator',
    slug: 'cover-letter-generator',
    category: 'Application Prep',
    description:
      'Generate a personalized, high-converting remote cover letter highlighting power redundancy, asynchronous reliability, and quantifiable metrics for US and European startups.',
    icon: FileText,
    color: 'amber',
    tags: ['1-Click Copy', 'US/EU Tailored', 'XYZ Impact Bullets'],
  },
  {
    title: 'International Remote Interview Simulator',
    slug: 'interview-practice',
    category: 'Interview Preparation',
    description:
      'Practice answering the 5 hardest questions foreign hiring managers ask Pakistani applicants. Learn interviewer psychology, ideal response frameworks, and fatal mistakes to avoid.',
    icon: HelpCircle,
    color: 'purple',
    tags: ['Load-Shedding Defense', 'Timezone Strategy', 'Salary Tactics'],
  },
];

export default function ToolsHubPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-800">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 flex-1">
        {/* Hero Header */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl mb-12 text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>5 Interactive Career Utilities • 100% Free</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-3">
            Remote Career &amp; Income <span className="text-emerald-400">Toolkit</span>
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Free, client-side interactive utilities built specifically for Pakistani remote job seekers, graduates, and freelancers. Calculate tax-optimized USD/PKR earnings, audit resumes, craft cover letters, and master foreign interviews.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {TOOLS.map((tool) => {
            const Icon = tool.icon;

            return (
              <div
                key={tool.slug}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-sm flex flex-col justify-between hover:border-emerald-500/60 transition-all hover:shadow-md group"
              >
                <div className="space-y-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 group-hover:scale-105 transition-transform">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                      {tool.category}
                    </span>
                    <h2 className="text-base font-bold text-slate-900 mt-1 line-clamp-2">
                      <Link href={`/tools/${tool.slug}`} className="hover:text-emerald-600 transition-colors">
                        {tool.title}
                      </Link>
                    </h2>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                      {tool.description}
                    </p>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-1.5 text-[10px]">
                    {tool.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-slate-100 mt-5">
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 group-hover:bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white transition-colors shadow-sm"
                  >
                    <span>Launch Tool</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}

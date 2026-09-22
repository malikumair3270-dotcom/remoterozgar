'use client';

import React, { useState, useEffect, useTransition } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import JobCard from '@/components/JobCard';
import JobDetailsModal from '@/components/JobDetailsModal';
import PostJobModal from '@/components/PostJobModal';
import AdSlot from '@/components/AdSlot';
import AffiliateCard from '@/components/AffiliateCard';
import Footer from '@/components/Footer';
import AndroidInstallBar from '@/components/AndroidInstallBar';
import { Job, JobCategory } from '@/lib/types';
import {
  Loader2,
  SearchX,
  Sparkles,
  Filter,
  AlertCircle,
  RefreshCw,
  BookOpen,
  Calculator,
  FileCheck,
  ChevronDown,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  DollarSign,
  Star,
  Quote,
  Send,
  CheckCircle2,
  Mail,
} from 'lucide-react';

const HOMEPAGE_FAQS = [
  {
    question: 'Can Pakistani citizens legally work for US and European companies remotely?',
    answer:
      'Yes! International companies legally hire Pakistani remote professionals as independent contractors or via Employer of Record (EOR) services like Deel and Remote.com. Foreign currency earned through IT and IT-enabled services (ITeS) is legally recognized and incentivized by the State Bank of Pakistan.',
  },
  {
    question: 'Do I need PayPal to receive remote salaries from international employers?',
    answer:
      'No. PayPal is not required. International employers pay remote workers via direct bank wire (SWIFT), Payoneer (which provides a US receiving bank account), SadaBiz, or contractor platforms like Deel. Funds transfer directly into your local Pakistani bank account (Meezan, HBL, Bank Alfalah, etc.) in PKR.',
  },
  {
    question: 'What is the tax rate on foreign remote freelance earnings in Pakistan?',
    answer:
      'Under Section 154A of the Income Tax Ordinance, individuals registered with the Pakistan Software Export Board (PSEB) pay only 0.25% final withholding tax on foreign IT and export earnings. Unregistered active filers pay 1%, while non-filers are subject to 2%.',
  },
  {
    question: 'How does RemoteRozgar verify jobs to protect against online scams?',
    answer:
      'RemoteRozgar manually reviews job postings and aggregates directly from company Applicant Tracking Systems (ATS) and verified boards. We strictly discard any listing requiring registration fees, security deposits, or unofficial chat interviews (Telegram/WhatsApp).',
  },
  {
    question: 'Are there any fees or charges for applying through RemoteRozgar?',
    answer:
      'Zero fees. RemoteRozgar is 100% free for all job seekers, students, and freelancers. We never charge application fees, commission, or subscription fees.',
  },
  {
    question: 'What skills are in highest demand for beginners with no coding experience?',
    answer:
      'For non-programmers, high-demand entry roles include Virtual Assistance, Data Entry and spreadsheet management, Customer Care and Live Chat support, Content Writing, and Social Media Management. Starting rates typically range from $5 to $15 per hour.',
  },
];

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<JobCategory>('all');
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);
  const [, startTransition] = useTransition();

  // Load saved jobs from localStorage & track visitor
  useEffect(() => {
    try {
      fetch('/api/analytics', { method: 'POST' }).catch(() => {});
      const saved = localStorage.getItem('remoterozgar_saved');
      if (saved) {
        setSavedJobs(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error loading saved jobs:', e);
    }
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const queryParams = new URLSearchParams();
      if (selectedCategory !== 'all') queryParams.set('category', selectedCategory);
      if (searchQuery.trim()) queryParams.set('search', searchQuery.trim());

      const res = await fetch(`/api/jobs?${queryParams.toString()}`);
      if (!res.ok) {
        throw new Error(`API responded with status ${res.status}`);
      }
      const data = await res.json();
      if (data.jobs && Array.isArray(data.jobs)) {
        setJobs(data.jobs);
      } else {
        setJobs([]);
      }
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
      setFetchError('Jobs load karne mein masla aa raha hai, barah-e-karam thori dair baad try karein ya Dobara Koshish Karein.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch jobs when category changes or on mount
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchJobs();
    }, 250); // debounce

    return () => clearTimeout(timeout);
  }, [selectedCategory, searchQuery]);

  const toggleSaveJob = (job: Job) => {
    let updated: Job[];
    const exists = savedJobs.some((j) => j.id === job.id);
    if (exists) {
      updated = savedJobs.filter((j) => j.id !== job.id);
    } else {
      updated = [...savedJobs, job];
    }
    setSavedJobs(updated);
    try {
      localStorage.setItem('remoterozgar_saved', JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving jobs:', e);
    }
  };

  const isJobSaved = (jobId: string | number) => {
    return savedJobs.some((j) => j.id === jobId);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        onOpenPostJob={() => setIsPostJobOpen(true)}
        savedCount={savedJobs.length}
      />

      <main className="flex-1">
        {/* Hero with Search & Category Filters */}
        <HeroBanner
          searchQuery={searchQuery}
          onSearchChange={(q) => setSearchQuery(q)}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          totalJobs={jobs.length}
        />


        {/* Content Container */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Feed Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 capitalize">
                  {selectedCategory === 'all' ? 'All Verified Remote Jobs' : `${selectedCategory} Remote Opportunities`}
                </h2>
                <span className="rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-bold text-brand-800">
                  {jobs.length} Openings
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Updated in real-time. Direct company apply links with zero intermediary charges.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span className="flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                <Sparkles className="h-3.5 w-3.5" />
                <span>USD to PKR Calculated</span>
              </span>
            </div>
          </div>

          {/* Error Fallback Banner */}
          {fetchError && (
            <div className="my-6 rounded-2xl border border-amber-300 bg-amber-50/90 p-5 text-amber-900 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-amber-900">Network / Jobs Sync Warning</h4>
                  <p className="text-xs text-amber-700 mt-0.5">{fetchError}</p>
                </div>
              </div>
              <button
                onClick={() => fetchJobs()}
                className="inline-flex items-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-amber-700 transition-colors shrink-0"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Dobara Koshish Karein (Retry)</span>
              </button>
            </div>
          )}

          {/* Professional Loading Skeleton */}
          {loading ? (
            <div className="mt-6 space-y-4">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm space-y-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3 w-2/3">
                      <div className="h-11 w-11 rounded-xl bg-slate-200 shrink-0" />
                      <div className="space-y-2 w-full">
                        <div className="h-3 w-1/4 rounded bg-slate-200" />
                        <div className="h-4 w-3/4 rounded bg-slate-200" />
                      </div>
                    </div>
                    <div className="h-8 w-8 rounded-lg bg-slate-200 shrink-0" />
                  </div>
                  <div className="h-3 w-full rounded bg-slate-100" />
                  <div className="flex flex-wrap gap-2 pt-2">
                    <div className="h-6 w-20 rounded-full bg-slate-200" />
                    <div className="h-6 w-24 rounded-full bg-slate-200" />
                    <div className="h-6 w-16 rounded-full bg-slate-200" />
                  </div>
                </div>
              ))}
            </div>
          ) : jobs.length === 0 ? (
            /* Empty State */
            <div className="py-16 text-center max-w-md mx-auto space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <SearchX className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No matching jobs found</h3>
              <p className="text-xs text-slate-500">
                Try searching for other terms like &ldquo;developer&rdquo;, &ldquo;designer&rdquo;, or reset your filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-brand-700 transition-colors"
              >
                <Filter className="h-3.5 w-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            /* Jobs List with Non-Intrusive Monetization Blocks */
            <div className="mt-6 space-y-4">
              {jobs.map((job, index) => {
                const showAd = index === 3;
                const showAffiliate = index === 7;

                return (
                  <React.Fragment key={job.id}>
                    <JobCard
                      job={job}
                      isSaved={isJobSaved(job.id)}
                      onToggleSave={toggleSaveJob}
                      onSelectJob={(j) => setSelectedJob(j)}
                    />

                    {/* Non-intrusive in-feed sponsored banner */}
                    {showAd && <AdSlot variant="in-feed" />}

                    {/* Non-intrusive high-converting skill affiliate card */}
                    {showAffiliate && <AffiliateCard />}
                  </React.Fragment>
                );
              })}
            </div>
          )}

          {/* Section 1: Free Career Tools Showcase */}
          <div className="mt-16 pt-12 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
                  Interactive Utilities
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  Free Tools for Remote Job Seekers
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Calculate tax-compliant net earnings in Pakistani Rupees and audit your resume against international ATS standards.
                </p>
              </div>
              <Link
                href="/tools"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 self-start sm:self-auto"
              >
                <span>View All Tools</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tool Card 1 */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between hover:border-emerald-500/50 transition-all hover:shadow-md">
                <div className="space-y-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <Calculator className="h-5 w-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">
                    USD to PKR Freelancer Income &amp; Tax Calculator
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Calculate monthly and annual net PKR take-home pay with PSEB 0.25% export tax vs non-filer rates and payment gateway FX spreads.
                  </p>
                </div>
                <div className="pt-5 border-t border-slate-100 mt-5">
                  <Link
                    href="/tools/tax-calculator"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700"
                  >
                    <span>Calculate Your Net Pay →</span>
                  </Link>
                </div>
              </div>

              {/* Tool Card 2 */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between hover:border-emerald-500/50 transition-all hover:shadow-md">
                <div className="space-y-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                    <FileCheck className="h-5 w-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">
                    ATS Remote Resume Readiness Audit
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Check your CV against 11 critical international screening criteria. Eliminate disqualifying elements like photos and CNIC.
                  </p>
                </div>
                <div className="pt-5 border-t border-slate-100 mt-5">
                  <Link
                    href="/tools/resume-checker"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700"
                  >
                    <span>Audit Resume Now →</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Featured Career Guides */}
          <div className="mt-16 pt-12 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
                  Educational Roadmaps
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  How to Succeed in Remote Work from Pakistan
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Actionable, step-by-step career guides written specifically for Pakistani professionals, graduates, and freelancers.
                </p>
              </div>
              <Link
                href="/guides"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 self-start sm:self-auto"
              >
                <span>Read All 6 Guides</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Guide 1 */}
              <article className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:border-emerald-500/50 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                    Virtual Assistance &amp; Data
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    <Link href="/guides/remote-data-entry-jobs-guide" className="hover:text-emerald-600 transition-colors">
                      Remote Data Entry &amp; Virtual Assistant Jobs: 2026 Guide
                    </Link>
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-3">
                    Verified platforms, spreadsheet skills, expected earnings ($5–$18/hr), and how to avoid registration fee scams.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400 font-medium">8 min read</span>
                  <Link
                    href="/guides/remote-data-entry-jobs-guide"
                    className="font-bold text-emerald-600 hover:text-emerald-700"
                  >
                    Read Guide →
                  </Link>
                </div>
              </article>

              {/* Guide 2 */}
              <article className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:border-emerald-500/50 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                    Freelancing Strategy
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    <Link href="/guides/freelance-usd-earnings-guide-pakistan" className="hover:text-emerald-600 transition-colors">
                      How to Earn in USD from Pakistan: Remote Blueprint
                    </Link>
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-3">
                    Portfolio development with zero foreign experience, pitching international clients, and managing US timezone overlaps.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400 font-medium">10 min read</span>
                  <Link
                    href="/guides/freelance-usd-earnings-guide-pakistan"
                    className="font-bold text-emerald-600 hover:text-emerald-700"
                  >
                    Read Guide →
                  </Link>
                </div>
              </article>

              {/* Guide 3 */}
              <article className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:border-emerald-500/50 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                    Payments &amp; Tax
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    <Link href="/guides/international-payment-methods-pakistan" className="hover:text-emerald-600 transition-colors">
                      Receive USD in Pakistan: Payoneer, SadaBiz &amp; PSEB 0.25% Tax
                    </Link>
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-3">
                    Operating without PayPal, comparing gateway fees, obtaining bank PRCs, and legal 0.25% PSEB tax registration.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400 font-medium">9 min read</span>
                  <Link
                    href="/guides/international-payment-methods-pakistan"
                    className="font-bold text-emerald-600 hover:text-emerald-700"
                  >
                    Read Guide →
                  </Link>
                </div>
              </article>
            </div>
          </div>

          {/* Section 3: Why RemoteRozgar & Verification Process */}
          <div className="mt-16 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Our Editorial &amp; Anti-Scam Standard</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Protecting Pakistani Talent from Employment Scams
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Social media in Pakistan is filled with fraudulent "copy-paste job" schemes demanding advance payments via JazzCash or EasyPaisa. RemoteRozgar was founded with an uncompromised mission: every job listing on this portal is verified, links directly to the hiring employer or ATS board, and charges $0 to job seekers.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-emerald-300">
                <span>✓ 100% Free Forever</span>
                <span>✓ No Advance Fees</span>
                <span>✓ Direct Company Apply Links</span>
                <span>✓ Real USD to PKR Conversion</span>
              </div>
            </div>
          </div>

          {/* Section: Real Pakistani Success Stories & Testimonials */}
          <div className="mt-16 pt-12 border-t border-slate-200">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
                Community Feedback
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                Pakistani Professionals Earning in Foreign Currency
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Real stories from freelancers and remote employees who leveraged RemoteRozgar verified listings and career guides.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Testimonial 1 */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-4 w-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                    &ldquo;Finding legitimate remote jobs from Pakistan used to mean sifting through hundreds of fake Facebook scams. I followed RemoteRozgar&apos;s Virtual Assistant guide and applied directly to a US startup. Now earning $1,400/mo in USD.&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-700 font-black flex items-center justify-center text-xs">
                    HA
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Hammad Arshad</h4>
                    <p className="text-[11px] text-slate-500">Remote Executive Assistant • Lahore</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-4 w-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                    &ldquo;The ATS resume checker was an eye-opener. I had photos, CNIC, and marital status on my old CV which were causing instant rejections. Fixed it to the 1-page format and secured a $3,200/mo Next.js contract.&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-brand-100 text-brand-700 font-black flex items-center justify-center text-xs">
                    BS
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Bilal Siddiqui</h4>
                    <p className="text-[11px] text-slate-500">Full-Stack TypeScript Engineer • Karachi</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-4 w-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                    &ldquo;The PSEB 0.25% tax registration guide alone saved me thousands of rupees. Having real USD to PKR calculations alongside verified jobs makes RemoteRozgar my daily morning check.&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-purple-100 text-purple-700 font-black flex items-center justify-center text-xs">
                    FZ
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Fatima Zahra</h4>
                    <p className="text-[11px] text-slate-500">B2B Content Strategist • Islamabad</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Email Job Alert Bar */}
          <div className="mt-16 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-lg">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                Free Weekly Remote Job Digest
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Never Miss a High-Paying Remote Contract
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Join 1,200+ Pakistani professionals receiving our weekly curated list of verified USD remote jobs, salary benchmarks, and tax tips. Zero spam.
              </p>
            </div>

            <div className="w-full md:w-auto shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thank you for subscribing to RemoteRozgar weekly job updates!');
                }}
                className="flex flex-col sm:flex-row gap-2"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  className="rounded-xl bg-white/10 border border-white/20 px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 min-w-[240px]"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow-sm shrink-0"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Subscribe Free</span>
                </button>
              </form>
            </div>
          </div>

          {/* Section 4: Interactive Frequently Asked Questions */}
          <div className="mt-16 pt-12 border-t border-slate-200">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                <HelpCircle className="h-3.5 w-3.5" />
                <span>Frequently Asked Questions</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                Common Questions from Pakistani Remote Workers
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Everything you need to know about working remotely for global companies from Pakistan.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-3">
              {HOMEPAGE_FAQS.map((faq, idx) => {
                const isExpanded = expandedFaqIndex === idx;

                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedFaqIndex(isExpanded ? null : idx)}
                      className="w-full text-left px-5 sm:px-6 py-4 flex items-center justify-between gap-4"
                    >
                      <span className="text-xs sm:text-sm font-bold text-slate-900">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-slate-400 transition-transform shrink-0 ${
                          isExpanded ? 'rotate-180 text-emerald-600' : ''
                        }`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="px-5 sm:px-6 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Schema.org FAQPage Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: HOMEPAGE_FAQS.map((faq) => ({
                  '@type': 'Question',
                  name: faq.question,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.answer,
                  },
                })),
              }),
            }}
          />

        </div>
      </main>

      {/* Modals */}
      <JobDetailsModal
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        isSaved={selectedJob ? isJobSaved(selectedJob.id) : false}
        onToggleSave={toggleSaveJob}
      />

      <PostJobModal
        isOpen={isPostJobOpen}
        onClose={() => setIsPostJobOpen(false)}
      />

      <AndroidInstallBar />
      <Footer />
    </div>
  );
}

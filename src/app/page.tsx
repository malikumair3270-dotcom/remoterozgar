'use client';

import React, { useState, useEffect, useTransition } from 'react';
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
import { Loader2, SearchX, Sparkles, Filter, AlertCircle, RefreshCw } from 'lucide-react';

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<JobCategory>('all');
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
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

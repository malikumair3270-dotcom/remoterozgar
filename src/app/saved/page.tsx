'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import JobCard from '@/components/JobCard';
import JobDetailsModal from '@/components/JobDetailsModal';
import PostJobModal from '@/components/PostJobModal';
import Footer from '@/components/Footer';
import { Job } from '@/lib/types';
import { Bookmark, ArrowLeft, Trash2 } from 'lucide-react';

export default function SavedJobsPage() {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('remoterozgar_saved');
      if (saved) {
        setSavedJobs(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error loading saved jobs:', e);
    }
  }, []);

  const toggleSaveJob = (job: Job) => {
    const updated = savedJobs.filter((j) => j.id !== job.id);
    setSavedJobs(updated);
    try {
      localStorage.setItem('remoterozgar_saved', JSON.stringify(updated));
    } catch (e) {
      console.error('Error updating saved jobs:', e);
    }
  };

  const clearAllSaved = () => {
    if (window.confirm('Are you sure you want to clear all saved jobs?')) {
      setSavedJobs([]);
      localStorage.removeItem('remoterozgar_saved');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        onOpenPostJob={() => setIsPostJobOpen(true)}
        savedCount={savedJobs.length}
      />

      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 mb-2"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to All Jobs</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2">
              <Bookmark className="h-6 w-6 text-brand-600 fill-brand-600" />
              <span>Saved Jobs</span>
              <span className="text-sm font-bold text-slate-500">({savedJobs.length})</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Jobs saved on this device. You can review them anytime and apply directly.
            </p>
          </div>

          {savedJobs.length > 0 && (
            <button
              onClick={clearAllSaved}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Clear All Saved</span>
            </button>
          )}
        </div>

        {savedJobs.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <Bookmark className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No saved jobs yet</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              When you find a remote job you like, click the bookmark icon to save it here for later.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-brand-700 transition-colors"
            >
              Browse Remote Jobs
            </Link>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {savedJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isSaved={true}
                onToggleSave={toggleSaveJob}
                onSelectJob={(j) => setSelectedJob(j)}
              />
            ))}
          </div>
        )}
      </main>

      <JobDetailsModal
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        isSaved={selectedJob ? savedJobs.some((j) => j.id === selectedJob.id) : false}
        onToggleSave={toggleSaveJob}
      />

      <PostJobModal
        isOpen={isPostJobOpen}
        onClose={() => setIsPostJobOpen(false)}
      />

      <Footer />
    </div>
  );
}

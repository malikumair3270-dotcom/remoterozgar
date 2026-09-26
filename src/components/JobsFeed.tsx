'use client';

import React, { useState, useMemo } from 'react';
import type { RemoteJob } from '../lib/job-types';
import { JobCard } from './JobCard';
import { JobModal } from './JobModal';
import { JobFilters } from './JobFilters';
import { Briefcase, AlertCircle, RefreshCw } from 'lucide-react';

interface JobsFeedProps {
  initialJobs: RemoteJob[];
  usdRate: number | null;
  fromCache?: boolean;
}

export const JobsFeed: React.FC<JobsFeedProps> = ({
  initialJobs,
  usdRate,
  fromCache = false,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedJob, setSelectedJob] = useState<RemoteJob | null>(null);
  const [visibleCount, setVisibleCount] = useState(16);

  // Client-side filtering
  const filteredJobs = useMemo(() => {
    return initialJobs.filter((job) => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (job.category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
      }

      // Job Type filter
      if (selectedType !== 'all') {
        if (!job.jobType.toLowerCase().includes(selectedType.toLowerCase())) {
          return false;
        }
      }

      // Text search
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const matchesTitle = job.title.toLowerCase().includes(q);
        const matchesCompany = job.companyName.toLowerCase().includes(q);
        const matchesCategory = job.category.toLowerCase().includes(q);
        const matchesLocation = job.location.toLowerCase().includes(q);
        const matchesExcerpt = job.excerpt.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCompany && !matchesCategory && !matchesLocation && !matchesExcerpt) {
          return false;
        }
      }

      return true;
    });
  }, [initialJobs, search, selectedCategory, selectedType]);

  const visibleJobs = filteredJobs.slice(0, visibleCount);
  const hasMore = visibleCount < filteredJobs.length;

  return (
    <div className="space-y-6">
      {/* Notice if loaded from fallback cache */}
      {fromCache && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            Displaying cached jobs snapshot while upstream aggregator refreshes. All job links remain active.
          </span>
        </div>
      )}

      {/* Filter Toolbar */}
      <JobFilters
        search={search}
        onSearchChange={(val) => {
          setSearch(val);
          setVisibleCount(16);
        }}
        selectedCategory={selectedCategory}
        onCategoryChange={(cat) => {
          setSelectedCategory(cat);
          setVisibleCount(16);
        }}
        selectedType={selectedType}
        onTypeChange={(type) => {
          setSelectedType(type);
          setVisibleCount(16);
        }}
        totalJobs={filteredJobs.length}
      />

      {/* Jobs Grid */}
      {visibleJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {visibleJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              usdRate={usdRate}
              onSelectJob={(j) => setSelectedJob(j)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-white rounded-2xl border border-coolgray-200">
          <div className="w-12 h-12 mx-auto rounded-full bg-coolgray-100 flex items-center justify-center text-coolgray-400 mb-3">
            <Briefcase className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-navy-900 mb-1">No matching jobs found</h3>
          <p className="text-xs text-coolgray-500 max-w-sm mx-auto mb-4">
            Try adjusting your search terms or clearing the category filters to discover more open remote roles.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('all');
              setSelectedType('all');
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-sky-600 bg-sky-50 hover:bg-sky-100 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center pt-4">
          <button
            onClick={() => setVisibleCount((prev) => prev + 16)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-navy-900 bg-white border border-coolgray-200 hover:border-sky-400 hover:shadow-md transition-all"
          >
            <RefreshCw className="w-4 h-4 text-sky-500" />
            <span>Load More Verified Jobs ({filteredJobs.length - visibleCount} remaining)</span>
          </button>
        </div>
      )}

      {/* Detail Modal */}
      {selectedJob && (
        <JobModal
          job={selectedJob}
          usdRate={usdRate}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
};

'use client';

import React from 'react';
import type { RemoteJob } from '../lib/job-types';
import { convertUsdToPkr } from '../lib/fx-utils';
import { MapPin, Briefcase, ExternalLink, Sparkles, Building2, Clock } from 'lucide-react';

interface JobCardProps {
  job: RemoteJob;
  usdRate: number | null;
  onSelectJob?: (job: RemoteJob) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, usdRate, onSelectJob }) => {
  // Compute PKR estimate if monthly USD salary exists
  const pkrEstimateMin = job.salaryMinUsd ? convertUsdToPkr(job.salaryMinUsd, usdRate) : null;
  const pkrEstimateMax = job.salaryMaxUsd ? convertUsdToPkr(job.salaryMaxUsd, usdRate) : null;

  let pkrString = '—';
  if (pkrEstimateMin && pkrEstimateMax && pkrEstimateMin !== '—' && pkrEstimateMax !== '—') {
    pkrString = `${pkrEstimateMin} - ${pkrEstimateMax}/mo`;
  } else if (pkrEstimateMin && pkrEstimateMin !== '—') {
    pkrString = `~${pkrEstimateMin}/mo`;
  }

  // Format relative date
  const timeAgo = (dateStr: string) => {
    try {
      const diffMs = Date.now() - new Date(dateStr).getTime();
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      if (hours < 1) return 'Just now';
      if (hours < 24) return `${hours}h ago`;
      const days = Math.floor(hours / 24);
      if (days === 1) return '1 day ago';
      if (days < 30) return `${days}d ago`;
      return 'Recently';
    } catch {
      return 'Recently';
    }
  };

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl border bg-white p-5 sm:p-6 transition-all duration-200 hover:shadow-xl hover:shadow-sky-500/5 hover:border-sky-300 ${
        job.isFeatured
          ? 'border-amber-300/80 bg-gradient-to-b from-amber-50/20 via-white to-white ring-1 ring-amber-300/50'
          : 'border-coolgray-200/90'
      }`}
    >
      <div>
        {/* Top Header: Category, Badges, Date */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200/60">
              {job.category}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-coolgray-100 text-coolgray-700">
              <Briefcase className="w-3 h-3 mr-1 text-coolgray-400" />
              {job.jobType}
            </span>
            {job.isFeatured && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-navy-950 shadow-xs">
                <Sparkles className="w-3 h-3 fill-navy-950" /> Featured
              </span>
            )}
          </div>

          <span className="text-xs text-coolgray-400 flex items-center gap-1 shrink-0">
            <Clock className="w-3 h-3" />
            {timeAgo(job.pubDate)}
          </span>
        </div>

        {/* Company Info & Job Title */}
        <div className="flex items-start gap-3.5 mb-4">
          {job.companyLogo ? (
            <img
              src={job.companyLogo}
              alt={`${job.companyName} logo`}
              className="w-12 h-12 rounded-xl object-contain border border-coolgray-100 bg-white p-1 shadow-xs shrink-0"
              onError={(e) => {
                // Hide broken image and fall back to building icon
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-navy-900 text-sky-400 flex items-center justify-center font-bold text-lg shadow-xs shrink-0">
              {job.companyName ? job.companyName.charAt(0).toUpperCase() : <Building2 className="w-6 h-6" />}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <h3
              onClick={() => onSelectJob?.(job)}
              className="font-bold text-navy-900 text-base sm:text-lg leading-snug group-hover:text-sky-600 transition-colors cursor-pointer truncate"
              title={job.title}
            >
              {job.title}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-sm text-coolgray-600">
              <span className="font-semibold text-coolgray-800 truncate">{job.companyName}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-xs text-coolgray-500 truncate">
                <MapPin className="w-3 h-3 text-coolgray-400 shrink-0" />
                {job.location}
              </span>
            </div>
          </div>
        </div>

        {/* Excerpt */}
        <p className="text-sm text-coolgray-600 line-clamp-2 mb-4 leading-relaxed">
          {job.excerpt}
        </p>
      </div>

      {/* Footer: Salary + Dynamic PKR & Actions */}
      <div className="pt-3 border-t border-coolgray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Salary block with USD and PKR */}
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-coolgray-800">
            {job.salaryFormatted || 'Competitive Pay'}
          </span>
          {pkrString !== '—' ? (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              ≈ {pkrString} <span className="text-[10px] text-coolgray-400 font-normal">(PKR Est.)</span>
            </span>
          ) : (
            <span className="text-[11px] text-coolgray-400">USD Rate Applied</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {onSelectJob && (
            <button
              type="button"
              onClick={() => onSelectJob(job)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-coolgray-700 bg-coolgray-100 hover:bg-coolgray-200 transition-colors"
            >
              View Details
            </button>
          )}

          <a
            href={job.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-navy-900 hover:bg-sky-600 shadow-xs transition-colors shrink-0"
          >
            <span>Apply Now</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

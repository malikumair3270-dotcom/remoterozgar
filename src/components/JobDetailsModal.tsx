'use client';

import React from 'react';
import { Job } from '@/lib/types';
import { X, Building2, MapPin, DollarSign, Calendar, ExternalLink, Bookmark, ShieldCheck } from 'lucide-react';
import WhatsAppShareBtn from './WhatsAppShareBtn';

interface JobDetailsModalProps {
  job: Job | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (job: Job) => void;
}

export default function JobDetailsModal({
  job,
  onClose,
  isSaved,
  onToggleSave,
}: JobDetailsModalProps) {
  if (!job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl transition-all border border-slate-100 my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 font-bold text-base border border-slate-200">
              {job.companyLogo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={job.companyLogo}
                  alt={job.company}
                  className="h-full w-full rounded-xl object-contain p-1"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <span>{job.company.slice(0, 2).toUpperCase()}</span>
              )}
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                <Building2 className="h-3.5 w-3.5" />
                {job.company}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                {job.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onToggleSave(job)}
              className={`rounded-xl p-2 transition-colors ${
                isSaved
                  ? 'bg-rose-50 text-rose-600'
                  : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
              }`}
              title={isSaved ? 'Remove from saved' : 'Save job'}
            >
              <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-rose-600' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div className="my-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <div className="rounded-xl bg-slate-50 p-3 border border-slate-200/80">
            <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
              <MapPin className="h-3 w-3 text-slate-400" />
              Workplace
            </span>
            <p className="text-xs font-bold text-slate-800 mt-0.5">{job.location}</p>
          </div>

          <div className="rounded-xl bg-emerald-50/70 p-3 border border-emerald-200/80">
            <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
              <DollarSign className="h-3 w-3 text-emerald-600" />
              Estimated Salary
            </span>
            <p className="text-xs font-bold text-emerald-900 mt-0.5 truncate">
              {job.estSalaryPkr || 'Market Competitive'}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-3 border border-slate-200/80">
            <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
              <Calendar className="h-3 w-3 text-slate-400" />
              Job Type
            </span>
            <p className="text-xs font-bold text-slate-800 mt-0.5 capitalize">{job.jobType}</p>
          </div>
        </div>

        {/* Scrollable Description */}
        <div className="flex-1 overflow-y-auto pr-1 text-slate-700 text-xs sm:text-sm space-y-4 my-2">
          <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 rounded-lg p-2.5 border border-emerald-200">
            <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
            <span>100% Free to apply. RemoteRozgar never charges any fees from candidates.</span>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-2">Job Overview & Details</h4>
            <div
              className="prose prose-sm max-w-none text-slate-700 leading-relaxed break-words"
              dangerouslySetInnerHTML={{ __html: job.description }}
            />
          </div>

          {job.tags && job.tags.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-800 mb-2 uppercase tracking-wide">
                Tags & Tech Stack
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {job.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <WhatsAppShareBtn
            job={{
              title: job.title,
              company: job.company,
              salaryText: job.estSalaryPkr,
              url: job.url,
            }}
          />

          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-brand-700 transition-colors"
          >
            <span>Apply on Company Website</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { Job } from '@/lib/types';
import { formatRelativeDate } from '@/lib/utils';
import { Building2, MapPin, DollarSign, ExternalLink, Bookmark, Sparkles } from 'lucide-react';
import WhatsAppShareBtn from './WhatsAppShareBtn';

interface JobCardProps {
  job: Job;
  isSaved: boolean;
  onToggleSave: (job: Job) => void;
  onSelectJob: (job: Job) => void;
}

export default function JobCard({
  job,
  isSaved,
  onToggleSave,
  onSelectJob,
}: JobCardProps) {
  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description || `${job.title} at ${job.company}`,
    datePosted: job.pubDate || new Date().toISOString(),
    employmentType: job.jobType?.toUpperCase().includes('PART') ? 'PART_TIME' : 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: job.company,
      logo: job.companyLogo || 'https://remoterozgar.vercel.app/logo.png',
    },
    jobLocationType: 'TELECOMMUTE',
    applicantLocationRequirements: {
      '@type': 'Country',
      name: 'Pakistan',
    },
    baseSalary: job.salaryMin ? {
      '@type': 'MonetaryAmount',
      currency: job.salaryCurrency || 'USD',
      value: {
        '@type': 'QuantitativeValue',
        minValue: job.salaryMin,
        maxValue: job.salaryMax || job.salaryMin,
        unitText: (job.salaryPeriod || 'YEAR').toUpperCase(),
      },
    } : undefined,
  };

  return (
    <div
      onClick={() => onSelectJob(job)}
      className={`group relative flex flex-col justify-between rounded-2xl border bg-white p-5 sm:p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer ${
        job.featured
          ? 'border-brand-500/60 ring-1 ring-brand-500/20 bg-gradient-to-b from-emerald-50/30 to-white'
          : 'border-slate-200 hover:border-brand-300'
      }`}
    >
      {/* Google JobPosting JSON-LD for Rich Search Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div>
        {/* Top Header: Company + Save Button */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 font-black text-sm border border-slate-200 group-hover:border-brand-300 transition-colors">
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
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                  <Building2 className="h-3.5 w-3.5 text-slate-400" />
                  {job.company}
                </span>
                {job.featured && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                    <Sparkles className="h-2.5 w-2.5 text-amber-600" />
                    Featured
                  </span>
                )}
              </div>
              <h3 className="mt-0.5 text-base sm:text-lg font-bold text-slate-900 group-hover:text-brand-700 transition-colors line-clamp-1">
                {job.title}
              </h3>
            </div>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(job);
            }}
            aria-label={isSaved ? 'Remove from saved' : 'Save job'}
            className={`rounded-xl p-2 transition-colors ${
              isSaved
                ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
            }`}
          >
            <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-rose-600' : ''}`} />
          </button>
        </div>

        {/* Location & Meta */}
        <div className="mt-3 flex flex-wrap items-center gap-y-1.5 gap-x-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-emerald-700 font-medium">{job.location}</span>
          </span>
          <span>•</span>
          <span className="capitalize text-slate-600">{job.jobType}</span>
          <span>•</span>
          <span>{formatRelativeDate(job.pubDate)}</span>
        </div>

        {/* Salary Banner with PKR Conversion */}
        <div className="mt-3.5 rounded-xl bg-slate-50 p-2.5 border border-slate-200/80 flex items-center gap-2 text-xs">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
            <DollarSign className="h-3.5 w-3.5" />
          </div>
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="font-semibold text-slate-800">Est. Salary: </span>
            <span className="font-bold text-emerald-800">{job.estSalaryPkr || 'Market Competitive (USD)'}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {job.tags.slice(0, 4).map((tag, idx) => (
            <span
              key={idx}
              className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600 hover:bg-slate-200 transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <WhatsAppShareBtn
          job={{
            title: job.title,
            company: job.company,
            salaryText: job.estSalaryPkr,
            url: job.url,
          }}
          compact={true}
        />

        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectJob(job);
            }}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Details
          </button>

          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 rounded-lg bg-brand-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-brand-700 transition-colors"
          >
            <span>Apply</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import type { RemoteJob } from '../lib/job-types';
import { convertUsdToPkr } from '../lib/fx-utils';
import { X, ExternalLink, MapPin, Briefcase, Building2, Calendar, DollarSign, ShieldCheck } from 'lucide-react';

interface JobModalProps {
  job: RemoteJob | null;
  usdRate: number | null;
  onClose: () => void;
}

export const JobModal: React.FC<JobModalProps> = ({ job, usdRate, onClose }) => {
  if (!job) return null;

  const pkrEstimateMin = job.salaryMinUsd ? convertUsdToPkr(job.salaryMinUsd, usdRate) : null;
  const pkrEstimateMax = job.salaryMaxUsd ? convertUsdToPkr(job.salaryMaxUsd, usdRate) : null;

  let pkrString = '—';
  if (pkrEstimateMin && pkrEstimateMax && pkrEstimateMin !== '—' && pkrEstimateMax !== '—') {
    pkrString = `${pkrEstimateMin} - ${pkrEstimateMax}/mo`;
  } else if (pkrEstimateMin && pkrEstimateMin !== '—') {
    pkrString = `~${pkrEstimateMin}/mo`;
  }

  // JobPosting JSON-LD schema
  const jobSchema = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: job.pubDate,
    validThrough: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    employmentType: job.jobType.toUpperCase().replace('-', '_'),
    hiringOrganization: {
      '@type': 'Organization',
      name: job.companyName,
      logo: job.companyLogo || undefined,
    },
    jobLocationType: 'TELECOMMUTE',
    applicantLocationRequirements: {
      '@type': 'Country',
      name: 'Worldwide',
    },
    ...(job.salaryMinUsd
      ? {
          baseSalary: {
            '@type': 'MonetaryAmount',
            currency: 'USD',
            value: {
              '@type': 'QuantitativeValue',
              value: job.salaryMinUsd,
              unitText: 'MONTH',
            },
          },
        }
      : {}),
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }}
      />

      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-coolgray-200 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 sm:p-8 border-b border-coolgray-100 bg-coolgray-50/50">
          <div className="flex items-start gap-4">
            {job.companyLogo ? (
              <img
                src={job.companyLogo}
                alt={`${job.companyName} logo`}
                className="w-14 h-14 rounded-2xl object-contain border border-coolgray-200 bg-white p-1.5 shadow-xs"
              />
            ) : (
              <div className="w-14 h-14 rounded-2xl bg-navy-900 text-sky-400 flex items-center justify-center font-bold text-xl shadow-xs">
                {job.companyName ? job.companyName.charAt(0).toUpperCase() : <Building2 className="w-7 h-7" />}
              </div>
            )}

            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-800">
                  {job.category}
                </span>
                <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-coolgray-200 text-coolgray-700">
                  {job.jobType}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-navy-900 leading-tight">
                {job.title}
              </h2>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-coolgray-600">
                <span className="font-semibold text-coolgray-800">{job.companyName}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-coolgray-400" />
                  {job.location}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-coolgray-400 hover:text-navy-900 hover:bg-coolgray-100 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 px-6 sm:px-8 py-4 bg-coolgray-100/60 border-b border-coolgray-200/60 text-xs">
          <div>
            <span className="text-coolgray-500 font-medium block">USD Compensation</span>
            <span className="font-bold text-navy-900 text-sm">{job.salaryFormatted || 'Competitive'}</span>
          </div>
          <div>
            <span className="text-coolgray-500 font-medium block">PKR Equivalent</span>
            <span className="font-bold text-emerald-600 text-sm">
              {pkrString !== '—' ? pkrString : 'Rate pending'}
            </span>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <span className="text-coolgray-500 font-medium block">Verification</span>
            <span className="font-semibold text-sky-700 flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Real Employer Apply
            </span>
          </div>
        </div>

        {/* Scrollable Description */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-sm leading-relaxed text-coolgray-700">
          <div>
            <h3 className="text-base font-bold text-navy-900 mb-3">Job Description</h3>
            <div
              className="prose prose-sm max-w-none prose-navy"
              dangerouslySetInnerHTML={{ __html: job.description }}
            />
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="flex items-center justify-between p-6 border-t border-coolgray-100 bg-white">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-coolgray-700 hover:bg-coolgray-100 transition-colors"
          >
            Close
          </button>

          <a
            href={job.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-navy-900 hover:bg-sky-600 shadow-lg shadow-navy-900/10 transition-all hover:scale-[1.02]"
          >
            <span>Apply on Company Site</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

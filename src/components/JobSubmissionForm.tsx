'use client';

import React, { useState } from 'react';
import { Briefcase, Building2, DollarSign, Globe, Mail, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { CATEGORIES, JOB_TYPES } from './JobFilters';

export const JobSubmissionForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    companyLogo: '',
    companyWebsite: '',
    category: 'Tech',
    location: 'Anywhere (Global Remote)',
    jobType: 'Full-Time',
    salaryMinUsd: '',
    salaryMaxUsd: '',
    description: '',
    applyUrl: '',
    contactEmail: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validCategories = CATEGORIES.filter((c) => c !== 'All');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      const res = await fetch('/api/jobs/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          salaryMinUsd: formData.salaryMinUsd ? parseInt(formData.salaryMinUsd, 10) : null,
          salaryMaxUsd: formData.salaryMaxUsd ? parseInt(formData.salaryMaxUsd, 10) : null,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit job. Please check all required fields.');
      }

      setStatus('success');
      setFormData({
        title: '',
        companyName: '',
        companyLogo: '',
        companyWebsite: '',
        category: 'Tech',
        location: 'Anywhere (Global Remote)',
        jobType: 'Full-Time',
        salaryMinUsd: '',
        salaryMaxUsd: '',
        description: '',
        applyUrl: '',
        contactEmail: '',
      });
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred during submission.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 sm:p-10 rounded-3xl border border-coolgray-200 shadow-sm">
      {status === 'success' && (
        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-base">Job Submitted for Editorial Review!</span>
            <p className="mt-1 text-emerald-800 leading-relaxed">
              Your remote job listing has been saved with <strong>PENDING</strong> status. Our moderation team reviews every submission to ensure scam protection before publishing live to the public board. You will receive an update at your contact email once approved.
            </p>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">Submission Error</span>
            <span>{errorMessage}</span>
          </div>
        </div>
      )}

      {/* Role Details */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-navy-900 flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-sky-500" /> Job Details
        </h3>

        <div>
          <label className="block text-xs font-semibold text-coolgray-700 mb-1.5">
            Job Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Senior Full-Stack Engineer (React & Node.js)"
            className="w-full px-3.5 py-2.5 rounded-xl border border-coolgray-200 text-sm text-navy-900 placeholder:text-coolgray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-coolgray-700 mb-1.5">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-coolgray-200 text-sm text-navy-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            >
              {validCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-coolgray-700 mb-1.5">
              Location / Geo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g. Anywhere, EMEA, US East"
              className="w-full px-3.5 py-2.5 rounded-xl border border-coolgray-200 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-coolgray-700 mb-1.5">
              Job Type <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.jobType}
              onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-coolgray-200 text-sm text-navy-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            >
              {JOB_TYPES.filter((t) => t !== 'All Types').map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-coolgray-700 mb-1.5">
              Monthly Salary Min (USD)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-coolgray-400 text-sm">$</span>
              <input
                type="number"
                min="0"
                step="100"
                value={formData.salaryMinUsd}
                onChange={(e) => setFormData({ ...formData, salaryMinUsd: e.target.value })}
                placeholder="2500"
                className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-coolgray-200 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-coolgray-700 mb-1.5">
              Monthly Salary Max (USD)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-coolgray-400 text-sm">$</span>
              <input
                type="number"
                min="0"
                step="100"
                value={formData.salaryMaxUsd}
                onChange={(e) => setFormData({ ...formData, salaryMaxUsd: e.target.value })}
                placeholder="4500"
                className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-coolgray-200 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-coolgray-700 mb-1.5">
            Direct Application URL <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            required
            value={formData.applyUrl}
            onChange={(e) => setFormData({ ...formData, applyUrl: e.target.value })}
            placeholder="https://company.com/careers/job-123 or Greenhouse/Ashby link"
            className="w-full px-3.5 py-2.5 rounded-xl border border-coolgray-200 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-coolgray-700 mb-1.5">
            Detailed Job Description & Requirements <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            rows={6}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Provide responsibilities, requirements, tech stack, and timezone expectations..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-coolgray-200 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 resize-y"
          />
        </div>
      </div>

      <hr className="border-coolgray-200" />

      {/* Company Details */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-navy-900 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-sky-500" /> Company Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-coolgray-700 mb-1.5">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              placeholder="e.g. Acme Cloud Corp"
              className="w-full px-3.5 py-2.5 rounded-xl border border-coolgray-200 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-coolgray-700 mb-1.5">
              Company Website
            </label>
            <input
              type="url"
              value={formData.companyWebsite}
              onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
              placeholder="https://acme.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-coolgray-200 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-coolgray-700 mb-1.5">
              Company Logo URL (optional)
            </label>
            <input
              type="url"
              value={formData.companyLogo}
              onChange={(e) => setFormData({ ...formData, companyLogo: e.target.value })}
              placeholder="https://company.com/logo.png"
              className="w-full px-3.5 py-2.5 rounded-xl border border-coolgray-200 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-coolgray-700 mb-1.5">
              Contact / Recruiter Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              placeholder="recruiter@acme.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-coolgray-200 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold text-white bg-navy-900 hover:bg-sky-600 disabled:opacity-50 transition-all shadow-md"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Submitting Job for Review...</span>
          </>
        ) : (
          <span>Submit Remote Job for Approval (Free)</span>
        )}
      </button>
    </form>
  );
};

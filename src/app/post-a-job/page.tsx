import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { JobSubmissionForm } from '@/components/JobSubmissionForm';
import { PlusCircle, ShieldCheck, Globe, Users, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Post a Remote Job — Reach Top Pakistani & South Asian Talent',
  description:
    'List your remote engineering, design, writing, or operations opening on RemoteRozgar. Reach verified, English-fluent South Asian remote professionals.',
};

export default function PostAJobPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-coolgray-500 mb-2">
        <Link href="/" className="hover:text-navy-900 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-navy-900 font-semibold">Post a Remote Job</span>
      </nav>

      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-600 mb-1">
          <PlusCircle className="w-4 h-4" /> Employer Hiring Portal
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-900 tracking-tight">
          Hire Extraordinary Remote Talent
        </h1>
        <p className="text-sm sm:text-base text-coolgray-600 mt-2 max-w-2xl leading-relaxed">
          Post your open remote role to thousands of motivated, fluent, and highly skilled software engineers, product designers, writers, and operators across Pakistan and South Asia.
        </p>
      </div>

      {/* Value Pillars for Employers */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-coolgray-200">
          <ShieldCheck className="w-5 h-5 text-emerald-500 mb-2" />
          <h3 className="font-bold text-navy-900 text-sm">Verified Editorial Review</h3>
          <p className="text-xs text-coolgray-500 mt-0.5">
            Every submission is screened by our team within 24 hours to ensure quality and trust.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-coolgray-200">
          <Globe className="w-5 h-5 text-sky-500 mb-2" />
          <h3 className="font-bold text-navy-900 text-sm">Direct Applications</h3>
          <p className="text-xs text-coolgray-500 mt-0.5">
            Applicants are sent directly to your Greenhouse, Lever, Ashby, or custom careers page.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-coolgray-200">
          <Users className="w-5 h-5 text-amber-500 mb-2" />
          <h3 className="font-bold text-navy-900 text-sm">Targeted Reach</h3>
          <p className="text-xs text-coolgray-500 mt-0.5">
            Connect with top graduates from FAST, NUST, LUMS, GIKI, and seasoned remote practitioners.
          </p>
        </div>
      </div>

      {/* Submission Form Component */}
      <JobSubmissionForm />
    </div>
  );
}

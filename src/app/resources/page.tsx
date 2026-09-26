import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CvTemplateCard } from '@/components/CvTemplateCard';
import { CV_TEMPLATES } from '@/lib/cv-templates-data';
import { FileText, CheckCircle2, AlertTriangle, ArrowRight, Zap, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free ATS Resume Templates & Guide for Remote Jobs — RemoteRozgar',
  description:
    'Download 2 battle-tested ATS-compliant resume templates engineered for global remote hiring. Complete with usage guidelines, action verb lists, and ATS parser checklists.',
};

export default function ResourcesPage() {
  const actionVerbs = [
    'Architected',
    'Spearheaded',
    'Engineered',
    'Scaled',
    'Optimized',
    'Refactored',
    'Automated',
    'Streamlined',
    'Shipped',
    'Deployed',
    'Slashed',
    'Accelerated',
    'Facilitated',
    'Audited',
    'Synthesized',
    'Negotiated',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-coolgray-500 mb-2">
        <Link href="/" className="hover:text-navy-900 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-navy-900 font-semibold">Resources</span>
      </nav>

      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-600 mb-1">
          <FileText className="w-4 h-4" /> Career Tooling & Assets
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
          ATS-Compliant Resume Templates & Guide
        </h1>
        <p className="text-sm text-coolgray-600 mt-2 max-w-2xl leading-relaxed">
          Over 75% of global remote job applications are rejected before reaching a human recruiter due to multi-column parsing failures. Use these verified single-column templates to ensure 100% ATS readability.
        </p>
      </div>

      {/* Two Templates Display Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {CV_TEMPLATES.map((tmpl) => (
          <CvTemplateCard key={tmpl.id} template={tmpl} />
        ))}
      </div>

      {/* Comprehensive ATS Usage Guide */}
      <section className="bg-white rounded-3xl border border-coolgray-200 p-6 sm:p-10 space-y-8 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block mb-1">
            Standard Operating Procedure
          </span>
          <h2 className="text-2xl font-bold text-navy-900">
            How to Customize & Format Your Resume for Global Remote Roles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="p-5 rounded-2xl bg-coolgray-50 border border-coolgray-200/80 space-y-2">
            <h3 className="font-bold text-navy-900 text-base flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 1. Layout & Margins
            </h3>
            <p className="text-xs text-coolgray-600 leading-relaxed">
              Use standard 0.75-inch to 1-inch margins on all sides. Strictly stick to a single-column layout. Avoid putting crucial text inside Microsoft Word headers/footers or decorative floating text boxes, as most ATS algorithms bypass them.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-coolgray-50 border border-coolgray-200/80 space-y-2">
            <h3 className="font-bold text-navy-900 text-base flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 2. Typography & Fonts
            </h3>
            <p className="text-xs text-coolgray-600 leading-relaxed">
              Use universal, clean sans-serif or serif fonts: Inter, Arial, Calibri, Roboto, or Georgia. Keep body text between 10pt and 11pt, section headings at 13pt–14pt, and your candidate name at 18pt–22pt bold.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-coolgray-50 border border-coolgray-200/80 space-y-2">
            <h3 className="font-bold text-navy-900 text-base flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 3. The XYZ Formula
            </h3>
            <p className="text-xs text-coolgray-600 leading-relaxed">
              Structure bullet points around tangible outcomes: <em>&quot;Accomplished [X] as measured by [Y], by doing [Z].&quot;</em> Never just list duties. State latency reductions, conversion boosts, revenue saved, or uptime percentages.
            </p>
          </div>
        </div>

        {/* Action Verbs Cloud */}
        <div className="p-6 rounded-2xl bg-navy-950 text-white space-y-4">
          <div>
            <h3 className="font-bold text-base text-white">
              High-Impact Power Verbs for Remote Resumes
            </h3>
            <p className="text-xs text-coolgray-400 mt-1">
              Start every work experience bullet point with one of these active verbs:
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {actionVerbs.map((verb) => (
              <span
                key={verb}
                className="px-3 py-1 rounded-lg bg-navy-800 border border-navy-700 text-xs font-semibold text-sky-300"
              >
                {verb}
              </span>
            ))}
          </div>
        </div>

        {/* Pre-Submission Checklist */}
        <div className="space-y-3 pt-2">
          <h3 className="font-bold text-base text-navy-900">
            Final Pre-Submission Checklist for South Asian Applicants
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-coolgray-700">
            <div className="flex items-start gap-2 p-3 rounded-xl bg-coolgray-50 border border-coolgray-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Removed CNIC, father&apos;s name, marital status, and religion.</span>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-xl bg-coolgray-50 border border-coolgray-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Omitted photo/headshot (standard compliance for US/UK/EU hiring).</span>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-xl bg-coolgray-50 border border-coolgray-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Provided international phone number format (+92 3XX XXXXXXX).</span>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-xl bg-coolgray-50 border border-coolgray-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Live deployment links verified without 404 or certificate errors.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

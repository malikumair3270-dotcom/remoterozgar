'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  FileCheck,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  HelpCircle,
  Download,
  BookOpen,
} from 'lucide-react';

interface ChecklistItem {
  id: string;
  category: string;
  label: string;
  description: string;
  isFatal?: boolean; // If checked false, marks as severe risk
  weight: number;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'single_column',
    category: '1. Formatting & ATS Parsing',
    label: 'Single-Column Minimalist Layout',
    description: 'No 2-column Canva sidebars, complex text boxes, or embedded graphic tables that confuse ATS software.',
    weight: 10,
  },
  {
    id: 'standard_fonts',
    category: '1. Formatting & ATS Parsing',
    label: 'Clean, Standard Sans-Serif Fonts',
    description: 'Uses Inter, Arial, Calibri, or Roboto (10-11pt) without decorative cursive fonts or low-contrast colors.',
    weight: 8,
  },
  {
    id: 'standard_pdf',
    category: '1. Formatting & ATS Parsing',
    label: 'Standard Selectable Text PDF Export',
    description: 'The PDF text can be highlighted and copied with a mouse (not an image or flattened scan).',
    weight: 10,
  },
  {
    id: 'no_photo',
    category: '2. International Privacy & Compliance',
    label: 'Zero Photograph / Headshot Included',
    description: 'US and EU hiring laws penalize resumes with photos to prevent anti-discrimination lawsuits.',
    isFatal: true,
    weight: 12,
  },
  {
    id: 'no_cnic',
    category: '2. International Privacy & Compliance',
    label: 'No CNIC, Father\'s Name, or Religion',
    description: 'Strictly omit Pakistani national ID numbers, familial heritage, marital status, or sectarian data.',
    isFatal: true,
    weight: 12,
  },
  {
    id: 'minimal_location',
    category: '2. International Privacy & Compliance',
    label: 'City & Country Only (No House/Street Address)',
    description: 'Format as "Lahore, Pakistan" or "Islamabad, Pakistan" without house numbers or postal details.',
    weight: 6,
  },
  {
    id: 'xyz_formula',
    category: '3. Measurable Impact & Content',
    label: 'Google XYZ Accomplishment Bullet Points',
    description: 'Bullets follow "Accomplished [X] as measured by [Y] by doing [Z]" with tangible percentage or metric gains.',
    weight: 12,
  },
  {
    id: 'no_skill_bars',
    category: '3. Measurable Impact & Content',
    label: 'No Graphical Skill Bars or Percentages',
    description: 'No arbitrary "80% Python" or "90% English" graphical progress meters that break parsers.',
    weight: 8,
  },
  {
    id: 'timezone_overlap',
    category: '4. Remote Work Readiness',
    label: 'Timezone Overlap Mentioned in Summary',
    description: 'Clearly states availability (e.g., "Available for 4 hours overlap with US EST / CET business hours").',
    weight: 8,
  },
  {
    id: 'remote_tools',
    category: '4. Remote Work Readiness',
    label: 'Remote Collaboration Stack Listed',
    description: 'Explicitly lists tools like Slack, Loom, Notion, Jira, GitHub, or Zoom in your toolchain.',
    weight: 6,
  },
  {
    id: 'portfolio_links',
    category: '4. Remote Work Readiness',
    label: 'Live Working Portfolio / GitHub / LinkedIn Links',
    description: 'Clickable links to a live deployed project, public code repositories, or active LinkedIn profile.',
    weight: 8,
  },
];

export default function ResumeCheckerPage() {
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    CHECKLIST_ITEMS.forEach((item) => {
      initial[item.id] = true;
    });
    return initial;
  });

  const toggleItem = (id: string) => {
    setCheckedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const { score, completedCount, fatalErrors, statusBadge } = useMemo(() => {
    let totalScore = 0;
    let completed = 0;
    const fatalFails: string[] = [];

    CHECKLIST_ITEMS.forEach((item) => {
      if (checkedIds[item.id]) {
        totalScore += item.weight;
        completed++;
      } else if (item.isFatal) {
        fatalFails.push(item.label);
      }
    });

    let badge = {
      title: 'ATS Audit in Progress',
      color: 'bg-amber-50 border-amber-200 text-amber-800',
      description: 'Check the items below that match your CV to test international ATS readiness.',
    };

    if (totalScore >= 85 && fatalFails.length === 0) {
      badge = {
        title: 'ATS Ready for International Remote Jobs',
        color: 'bg-emerald-50 border-emerald-200 text-emerald-800',
        description: 'Standard 100% compliant format following US and European ATS parsing rules.',
      };
    } else if (totalScore >= 60 && fatalFails.length === 0) {
      badge = {
        title: 'Good Progress, Minor Tweaks Recommended',
        color: 'bg-amber-50 border-amber-200 text-amber-800',
        description: 'Review unchecked recommendations below to maximize your interview callback rate.',
      };
    }

    return {
      score: Math.min(100, totalScore),
      completedCount: completed,
      fatalErrors: fatalFails,
      statusBadge: badge,
    };
  }, [checkedIds]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-800">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 flex-1">
        {/* Navigation */}
        <div className="mb-6">
          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Career Tools</span>
          </Link>
        </div>

        {/* Hero Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold">
            <FileCheck className="h-3.5 w-3.5" />
            <span>Interactive Recruitment Audit</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            ATS Remote Resume Readiness Audit
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Over 90% of Pakistani CVs fail automated Applicant Tracking Systems (Greenhouse, Lever, Workday) due to formatting errors, missing metrics, or US legal compliance violations. Test your CV against our 11-point checklist.
          </p>
        </div>

        {/* Score & Status Panel */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Your ATS Readiness Score
              </span>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl sm:text-5xl font-black text-white">{score}%</span>
                <span className="text-xs text-slate-400 font-medium">
                  ({completedCount} of {CHECKLIST_ITEMS.length} verified)
                </span>
              </div>
              <p className="text-xs text-slate-300 max-w-md leading-relaxed">
                {statusBadge.description}
              </p>
            </div>

            <div className="shrink-0 space-y-3">
              <div className={`px-4 py-2.5 rounded-2xl border text-xs font-bold text-center ${statusBadge.color}`}>
                {statusBadge.title}
              </div>
              <Link
                href="/guides/ats-resume-guide-remote-jobs"
                className="inline-flex items-center justify-center gap-1.5 w-full text-xs text-emerald-300 hover:text-emerald-200 underline font-medium"
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>Read Full ATS Resume Guide</span>
              </Link>
            </div>
          </div>

          {/* Helpful Tips Alert */}
          {fatalErrors.length > 0 && (
            <div className="mt-6 pt-5 border-t border-slate-800 flex items-start gap-3 text-amber-200 text-xs">
              <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white font-bold">Important Recommendation: </strong>
                Ensure your CV does not include {fatalErrors.join(' or ')}. International companies in the US and Europe prefer resumes without photos or national IDs to maintain anti-discrimination standards.
              </div>
            </div>
          )}
        </div>

        {/* Interactive Checklist by Category */}
        <div className="space-y-6 mb-12">
          {['1. Formatting & ATS Parsing', '2. International Privacy & Compliance', '3. Measurable Impact & Content', '4. Remote Work Readiness'].map((cat) => {
            const items = CHECKLIST_ITEMS.filter((i) => i.category === cat);

            return (
              <div
                key={cat}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4"
              >
                <h3 className="text-sm sm:text-base font-black text-slate-900 border-b border-slate-100 pb-3">
                  {cat}
                </h3>

                <div className="space-y-3">
                  {items.map((item) => {
                    const isChecked = Boolean(checkedIds[item.id]);

                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className={`cursor-pointer rounded-2xl p-4 border transition-all flex items-start gap-3.5 ${
                          isChecked
                            ? 'border-emerald-200 bg-emerald-50/40'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="pt-0.5 shrink-0">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleItem(item.id)}
                            className="h-4 w-4 rounded accent-emerald-600 cursor-pointer"
                          />
                        </div>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs sm:text-sm font-bold ${
                                isChecked ? 'text-emerald-950' : 'text-slate-800'
                              }`}
                            >
                              {item.label}
                            </span>
                            {item.isFatal && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700">
                                Critical
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Actionable Advice Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm text-center space-y-4">
          <h3 className="text-lg font-bold text-slate-900">
            Next Step: Format Your Resume &amp; Apply
          </h3>
          <p className="text-xs text-slate-500 max-w-lg mx-auto leading-relaxed">
            Use clean markdown or plain Google Docs without two-column templates. Check our verified remote job listings and apply directly on employer hiring portals.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition-colors shadow-sm"
            >
              <span>Explore Verified Jobs</span>
            </Link>
            <Link
              href="/guides/ats-resume-guide-remote-jobs"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <span>Read Resume Guide</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

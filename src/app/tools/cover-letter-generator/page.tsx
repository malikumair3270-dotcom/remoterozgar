'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  FileText,
  ArrowLeft,
  Copy,
  Check,
  Sparkles,
  BookOpen,
  Send,
  RefreshCw,
} from 'lucide-react';

export default function CoverLetterGeneratorPage() {
  const [candidateName, setCandidateName] = useState('Ali Raza');
  const [roleTitle, setRoleTitle] = useState('Remote Virtual Assistant & Operations Specialist');
  const [companyName, setCompanyName] = useState('CloudFlow Technologies');
  const [yearsExperience, setYearsExperience] = useState('3');
  const [keySkills, setKeySkills] = useState('Google Workspace, Notion, Asana, Inbox Triage');
  const [topAchievement, setTopAchievement] = useState('streamlined executive email response times by 40% and coordinated 15+ cross-timezone meetings weekly');
  const [copied, setCopied] = useState(false);

  const generatedLetter = useMemo(() => {
    const name = candidateName.trim() || '[Your Name]';
    const role = roleTitle.trim() || '[Job Title]';
    const company = companyName.trim() || '[Company Name]';
    const years = yearsExperience.trim() || '2+';
    const skills = keySkills.trim() || '[Your Key Skills]';
    const achievement = topAchievement.trim() || '[Your Major Accomplishment]';

    return `Dear Hiring Team at ${company},

I am writing to express my strong interest in the ${role} position. With over ${years} years of dedicated experience supporting remote teams and executing asynchronous workflows across global timezones, I have developed a disciplined approach to driving operational efficiency, maintaining meticulous attention to detail, and collaborating effectively without constant oversight.

In my previous remote engagements, I have leveraged tools including ${skills} to solve high-priority bottlenecks. Most notably, I ${achievement}. Working from Pakistan (UTC+5), I maintain dedicated home office power and high-speed fiber redundancy, ensuring 100% reliable connectivity and comfortable overlap with US and European core business hours.

What excites me most about ${company} is your commitment to high-impact products and autonomous remote culture. I would welcome the opportunity to discuss how my proactive communication, problem-solving skills, and dedication can support your team's quarterly objectives. Thank you for your time and consideration.

Warm regards,

${name}
Remote Professional • Pakistan (UTC+5)
Available for dedicated US/EU business hours overlap`;
  }, [candidateName, roleTitle, companyName, yearsExperience, keySkills, topAchievement]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Free AI-Style Application Utility</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            ATS Remote Cover Letter Generator
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Generate an ATS-compliant, high-converting remote cover letter tailored for international US and European employers in seconds. Highlights asynchronous reliability, home-office power backup, and measurable metrics.
          </p>
        </div>

        {/* Generator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Inputs Panel */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Application Details
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
              <input
                type="text"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Role Title Applied For</label>
              <input
                type="text"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Company / Startup Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Years of Experience</label>
              <input
                type="text"
                value={yearsExperience}
                onChange={(e) => setYearsExperience(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Core Tools &amp; Skills</label>
              <input
                type="text"
                value={keySkills}
                onChange={(e) => setKeySkills(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Top Measurable Achievement</label>
              <textarea
                rows={3}
                value={topAchievement}
                onChange={(e) => setTopAchievement(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Output Preview Panel */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900">Live Cover Letter Preview</span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition-colors shadow-sm"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Copy Letter</span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/70 font-mono text-xs text-slate-800 leading-relaxed whitespace-pre-wrap select-all">
                {generatedLetter}
              </div>

              <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-between">
                <span>Optimized for US &amp; European ATS Systems</span>
                <Link
                  href="/guides/ats-resume-guide-remote-jobs"
                  className="text-emerald-600 font-bold hover:underline"
                >
                  Read ATS Guide →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

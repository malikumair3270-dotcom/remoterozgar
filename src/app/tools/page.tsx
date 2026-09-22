import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calculator, FileCheck, ArrowRight, ShieldCheck, Sparkles, DollarSign } from 'lucide-react';

export const metadata = {
  title: 'Free Remote Career Tools for Pakistani Freelancers - RemoteRozgar',
  description: 'Free interactive tools for Pakistani remote job seekers: USD to PKR Freelancer Income & Tax Calculator (PSEB 0.25% vs non-filer) and ATS Remote Resume Audit Checklist.',
};

export default function ToolsHubPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-800">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 flex-1">
        {/* Hero Header */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl mb-10 text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>100% Free Career Utilities</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-3">
            Remote Career &amp; Income <span className="text-emerald-400">Toolkit</span>
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Interactive, client-side tools designed specifically for Pakistani remote workers to calculate tax-compliant net earnings and optimize CVs for international ATS screening.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Tool 1: Tax Calculator */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:border-emerald-500/60 transition-all hover:shadow-md">
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <Calculator className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
                  Financial Utility
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-1">
                  USD to PKR Freelancer Income &amp; Tax Calculator
                </h2>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Calculate your actual monthly take-home pay in PKR from your hourly or monthly USD rate. Includes Pakistan Software Export Board (PSEB) 0.25% withholding tax vs non-filer rates and bank exchange deductions.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">
                  PSEB 0.25% Tax Slabs
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">
                  Payoneer/Bank Margins
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">
                  Net Monthly In-Hand
                </span>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6">
              <Link
                href="/tools/tax-calculator"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-xs font-bold text-white hover:bg-emerald-700 transition-colors shadow-sm"
              >
                <span>Launch Tax Calculator</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Tool 2: ATS Resume Checker */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:border-emerald-500/60 transition-all hover:shadow-md">
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                <FileCheck className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-brand-600 uppercase tracking-wider">
                  Recruitment Audit
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-1">
                  ATS Remote Resume Readiness Audit
                </h2>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Audit your CV against 12 critical international ATS standards before applying to US and European companies. Eliminate fatal rejection errors like CNIC, photos, and unparseable columns.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">
                  US Legal Compliance
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">
                  Google XYZ Formula
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">
                  Real-time Readiness Score
                </span>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6">
              <Link
                href="/tools/resume-checker"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-xs font-bold text-white hover:bg-slate-800 transition-colors shadow-sm"
              >
                <span>Audit Your Resume</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

'use client';

import React from 'react';
import { BookOpen, ArrowRight, Award, CheckCircle2 } from 'lucide-react';

export default function AffiliateCard() {
  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 p-6 text-white shadow-lg">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300 border border-indigo-500/30">
            <Award className="h-3.5 w-3.5 text-indigo-400" />
            <span>Career Accelerator for Pakistanis</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
            Missing in-demand skills for high-paying $1,000+ remote jobs?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            International companies hire candidates with verified certificates and hands-on portfolio projects. Upgrade your skills in Web Development, UI/UX, or SEO today.
          </p>

          <div className="flex flex-wrap gap-y-1.5 gap-x-4 pt-1 text-xs text-slate-300">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>Free & Affordable Courses</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>Recognized Certificates</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>Self-Paced Learning</span>
            </div>
          </div>
        </div>

        <div className="shrink-0 w-full lg:w-auto">
          <a
            href="https://www.coursera.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-emerald-500 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:from-brand-600 hover:to-emerald-600 transition-all hover:scale-[1.02]"
          >
            <BookOpen className="h-4 w-4" />
            <span>Explore Certified Courses</span>
            <ArrowRight className="h-4 w-4" />
          </a>
          <p className="text-[10px] text-center text-slate-400 mt-2">Affiliate Partner Recommendation</p>
        </div>
      </div>
    </div>
  );
}

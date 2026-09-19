'use client';

import React from 'react';
import { Search, Code2, Palette, PenTool, Headphones, TrendingUp, GraduationCap, Globe } from 'lucide-react';
import { JobCategory } from '@/lib/types';
import { USD_TO_PKR_RATE } from '@/lib/utils';

interface HeroBannerProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: JobCategory;
  onSelectCategory: (cat: JobCategory) => void;
  totalJobs: number;
}

const CATEGORIES = [
  { id: 'all' as JobCategory, label: 'All Jobs', icon: Globe },
  { id: 'tech' as JobCategory, label: 'Tech & Dev', icon: Code2 },
  { id: 'design' as JobCategory, label: 'Design & UI/UX', icon: Palette },
  { id: 'writing' as JobCategory, label: 'Content & Writing', icon: PenTool },
  { id: 'support' as JobCategory, label: 'VA & Support', icon: Headphones },
  { id: 'marketing' as JobCategory, label: 'Marketing & Sales', icon: TrendingUp },
  { id: 'internship' as JobCategory, label: 'Internships', icon: GraduationCap },
];

export default function HeroBanner({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  totalJobs,
}: HeroBannerProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-900 via-emerald-950 to-slate-900 pb-12 pt-10 text-white">
      {/* Background glow effects */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-96 rounded-full bg-brand-500/20 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Live Remote Feed • 0 Fees Forever
          </span>
          <span className="rounded-full bg-slate-800/80 border border-slate-700/60 px-3 py-1 text-slate-300">
            💱 1 USD ≈ {USD_TO_PKR_RATE} PKR
          </span>
        </div>

        {/* Title */}
        <div className="mt-5 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl text-white">
            Ghar Baithe Global Remote Jobs & Internships
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Earn in US Dollars, spend in Pakistani Rupees. Discover verified 100% remote jobs in Tech, Design, Writing, and Virtual Assistance with direct company application links.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="relative flex items-center shadow-xl rounded-2xl bg-white/10 backdrop-blur-md p-1.5 border border-white/20">
            <div className="flex items-center pl-3 text-slate-400">
              <Search className="h-5 w-5 text-brand-300" />
            </div>
            <input
              type="text"
              placeholder="Search by role (e.g. React, Virtual Assistant, Writer, Python)..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-transparent px-3 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="text-xs text-slate-400 hover:text-white px-2"
              >
                Clear
              </button>
            )}
            <div className="hidden sm:block shrink-0 pr-2 text-[11px] font-semibold text-brand-200">
              {totalJobs} Jobs Found
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/30 scale-105'
                    : 'bg-white/10 text-slate-200 hover:bg-white/20 hover:text-white border border-white/10'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isSelected ? 'text-white' : 'text-brand-300'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}

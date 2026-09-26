'use client';

import React from 'react';
import { Search, Filter, X } from 'lucide-react';

interface JobFiltersProps {
  search: string;
  onSearchChange: (val: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  selectedType: string;
  onTypeChange: (type: string) => void;
  totalJobs: number;
}

export const CATEGORIES = [
  'All',
  'Tech',
  'Design',
  'Writing',
  'Customer Support',
  'Marketing',
  'Business & Operations',
];

export const JOB_TYPES = ['All Types', 'Full-Time', 'Contract', 'Part-Time'];

export const JobFilters: React.FC<JobFiltersProps> = ({
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedType,
  onTypeChange,
  totalJobs,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-coolgray-200/90 p-4 sm:p-6 shadow-sm space-y-4">
      {/* Search Input and Job Type Dropdown */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Field */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-coolgray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by job title, tech stack (React, Python, Figma), or company..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-coolgray-200 text-sm text-navy-900 placeholder:text-coolgray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
          />
          {search && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-coolgray-400 hover:text-navy-900"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Job Type Selector */}
        <div className="sm:w-48 shrink-0">
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-coolgray-200 text-sm font-medium text-coolgray-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all cursor-pointer"
          >
            {JOB_TYPES.map((t) => (
              <option key={t} value={t === 'All Types' ? 'all' : t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Pills and Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-coolgray-100">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected =
              (cat === 'All' && (!selectedCategory || selectedCategory === 'all')) ||
              selectedCategory.toLowerCase() === cat.toLowerCase();

            return (
              <button
                key={cat}
                type="button"
                onClick={() => onCategoryChange(cat === 'All' ? 'all' : cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-navy-900 text-white shadow-xs'
                    : 'bg-coolgray-100 text-coolgray-600 hover:bg-coolgray-200 hover:text-navy-900'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="text-xs font-medium text-coolgray-500 shrink-0">
          Showing <span className="font-bold text-navy-900">{totalJobs}</span> verified remote jobs
        </div>
      </div>
    </div>
  );
};

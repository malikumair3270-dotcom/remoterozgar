'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Calculator,
  ArrowLeft,
  DollarSign,
  Briefcase,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Clock,
  TrendingUp,
} from 'lucide-react';

export default function HourlyCalculatorPage() {
  const [targetMonthlyPkr, setTargetMonthlyPkr] = useState<number>(250000);
  const [billableHoursPerWeek, setBillableHoursPerWeek] = useState<number>(30);
  const [exchangeRate, setExchangeRate] = useState<number>(279);
  const [unpaidWeeksPerYear, setUnpaidWeeksPerYear] = useState<number>(4);

  const results = useMemo(() => {
    // Annual target in PKR
    const annualTargetPkr = targetMonthlyPkr * 12;
    // Working weeks per year
    const workingWeeks = Math.max(1, 52 - unpaidWeeksPerYear);
    // Total annual billable hours
    const totalAnnualHours = workingWeeks * billableHoursPerWeek;

    // Gross target in USD (adding 5% buffer for FX conversion fees and payment gateways)
    const annualTargetUsd = (annualTargetPkr / exchangeRate) * 1.05;
    const minHourlyRateUsd = Math.ceil(annualTargetUsd / totalAnnualHours);

    // Common contract tiers
    const fullTimeMonthlyRetainerUsd = minHourlyRateUsd * 40 * 4.33;
    const fullTimeMonthlyRetainerPkr = fullTimeMonthlyRetainerUsd * exchangeRate;

    const partTimeMonthlyRetainerUsd = minHourlyRateUsd * 20 * 4.33;
    const partTimeMonthlyRetainerPkr = partTimeMonthlyRetainerUsd * exchangeRate;

    return {
      minHourlyRateUsd,
      annualTargetUsd: Math.round(annualTargetUsd),
      totalAnnualHours,
      fullTimeMonthlyRetainerUsd: Math.round(fullTimeMonthlyRetainerUsd),
      fullTimeMonthlyRetainerPkr: Math.round(fullTimeMonthlyRetainerPkr),
      partTimeMonthlyRetainerUsd: Math.round(partTimeMonthlyRetainerUsd),
      partTimeMonthlyRetainerPkr: Math.round(partTimeMonthlyRetainerPkr),
    };
  }, [targetMonthlyPkr, billableHoursPerWeek, exchangeRate, unpaidWeeksPerYear]);

  const formatPkr = (num: number) => {
    return 'Rs ' + num.toLocaleString('en-PK');
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
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Pricing &amp; Contract Strategy Tool</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Remote Hourly Rate &amp; Retainer Calculator
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Stop guessing what to quote foreign employers. Enter your target monthly take-home in PKR, and calculate the exact minimum USD hourly rate and monthly retainers you should pitch to international clients.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Controls Panel */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              1. Your Income Goal &amp; Availability
            </h2>

            {/* Target PKR Input */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Target Monthly PKR Take-Home</span>
                <span className="text-emerald-600 font-extrabold">{formatPkr(targetMonthlyPkr)}</span>
              </div>
              <input
                type="range"
                min="50000"
                max="1500000"
                step="25000"
                value={targetMonthlyPkr}
                onChange={(e) => setTargetMonthlyPkr(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Rs 50k (Entry)</span>
                <span>Rs 500k (Mid)</span>
                <span>Rs 1.5M (Senior)</span>
              </div>
            </div>

            {/* Billable Hours Slider */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Billable Hours Per Week</span>
                <span className="text-emerald-600">{billableHoursPerWeek} hrs/week</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                step="5"
                value={billableHoursPerWeek}
                onChange={(e) => setBillableHoursPerWeek(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
              <p className="text-[11px] text-slate-500">
                Most sustainable remote workers target 25-35 focused client hours per week.
              </p>
            </div>

            {/* Exchange Rate */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Interbank USD to PKR Rate</span>
                <span className="text-slate-500 font-normal">{exchangeRate} PKR/USD</span>
              </div>
              <input
                type="number"
                min="200"
                max="400"
                value={exchangeRate}
                onChange={(e) => setExchangeRate(Number(e.target.value) || 279)}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs font-bold text-slate-900 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Results Display Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6">
              <div>
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  Recommended Minimum Rate
                </span>
                <div className="text-4xl sm:text-5xl font-black text-white mt-1">
                  ${results.minHourlyRateUsd}
                  <span className="text-base text-slate-300 font-normal"> / hour</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Equals approx. <span className="text-emerald-300 font-bold">{formatPkr(results.minHourlyRateUsd * exchangeRate)}</span> per billable hour.
                </div>
              </div>

              {/* Retainer Packages */}
              <div className="space-y-3 pt-4 border-t border-slate-800 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="text-slate-400 text-[11px]">Full-Time Monthly Retainer (40h/wk):</div>
                  <div className="text-base font-bold text-white">
                    ${results.fullTimeMonthlyRetainerUsd.toLocaleString()} USD
                    <span className="text-xs text-emerald-300 font-normal ml-2">
                      ({formatPkr(results.fullTimeMonthlyRetainerPkr)}/mo)
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="text-slate-400 text-[11px]">Part-Time Monthly Retainer (20h/wk):</div>
                  <div className="text-base font-bold text-white">
                    ${results.partTimeMonthlyRetainerUsd.toLocaleString()} USD
                    <span className="text-xs text-emerald-300 font-normal ml-2">
                      ({formatPkr(results.partTimeMonthlyRetainerPkr)}/mo)
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center text-xs text-slate-400">
                <span>Annual Hours: {results.totalAnnualHours} hrs</span>
                <span className="text-emerald-400 font-bold">5% Buffer Included</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Calculator,
  ArrowLeft,
  DollarSign,
  ShieldCheck,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileText,
} from 'lucide-react';

export default function TaxCalculatorPage() {
  const [rateType, setRateType] = useState<'monthly' | 'hourly'>('monthly');
  const [usdAmount, setUsdAmount] = useState<number>(1500);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40);
  const [exchangeRate, setExchangeRate] = useState<number>(279);
  const [taxCategory, setTaxCategory] = useState<'pseb' | 'filer' | 'nonfiler'>('pseb');
  const [payoutMethod, setPayoutMethod] = useState<'payoneer' | 'sadabiz' | 'swift'>('payoneer');

  // Calculations
  const results = useMemo(() => {
    const monthlyGrossUsd =
      rateType === 'monthly' ? usdAmount : usdAmount * hoursPerWeek * 4.33;
    const monthlyGrossPkr = monthlyGrossUsd * exchangeRate;

    // Gateway / FX conversion spread
    let gatewayFeePkr = 0;
    if (payoutMethod === 'payoneer') {
      gatewayFeePkr = monthlyGrossPkr * 0.02; // ~2% FX spread
    } else if (payoutMethod === 'sadabiz') {
      gatewayFeePkr = monthlyGrossPkr * 0.015; // ~1.5% FX spread
    } else if (payoutMethod === 'swift') {
      gatewayFeePkr = 25 * exchangeRate; // ~ $25 flat wire fee
    }

    // Pakistan Income Withholding Tax (Section 154A)
    let taxRate = 0.0025; // PSEB default 0.25%
    if (taxCategory === 'filer') {
      taxRate = 0.01; // 1% for unregistered filers
    } else if (taxCategory === 'nonfiler') {
      taxRate = 0.02; // 2% for non-filers
    }

    const taxAmountPkr = monthlyGrossPkr * taxRate;
    const netMonthlyPkr = Math.max(0, monthlyGrossPkr - gatewayFeePkr - taxAmountPkr);
    const netAnnualPkr = netMonthlyPkr * 12;

    // Potential savings if registered with PSEB vs non-filer
    const nonFilerTaxPkr = monthlyGrossPkr * 0.02;
    const psebTaxPkr = monthlyGrossPkr * 0.0025;
    const monthlySavingsWithPseb = nonFilerTaxPkr - psebTaxPkr;

    return {
      monthlyGrossUsd: Math.round(monthlyGrossUsd),
      monthlyGrossPkr: Math.round(monthlyGrossPkr),
      gatewayFeePkr: Math.round(gatewayFeePkr),
      taxAmountPkr: Math.round(taxAmountPkr),
      taxRatePercentage: (taxRate * 100).toFixed(2),
      netMonthlyPkr: Math.round(netMonthlyPkr),
      netAnnualPkr: Math.round(netAnnualPkr),
      monthlySavingsWithPseb: Math.round(monthlySavingsWithPseb),
    };
  }, [rateType, usdAmount, hoursPerWeek, exchangeRate, taxCategory, payoutMethod]);

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
            <Calculator className="h-3.5 w-3.5" />
            <span>Free Financial Tool for Pakistani Remote Workers</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            USD to PKR Freelancer Income &amp; Tax Calculator
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Estimate your true net take-home pay in Pakistani Rupees after factoring in payment gateway currency exchange margins and Pakistan Software Export Board (PSEB) Section 154A export tax deductions.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Controls Panel */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              1. Your Remote Compensation Details
            </h2>

            {/* Monthly vs Hourly Toggle */}
            <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-100 rounded-2xl">
              <button
                type="button"
                onClick={() => setRateType('monthly')}
                className={`py-2 text-xs font-bold rounded-xl transition-all ${
                  rateType === 'monthly'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Monthly Fixed Salary
              </button>
              <button
                type="button"
                onClick={() => setRateType('hourly')}
                className={`py-2 text-xs font-bold rounded-xl transition-all ${
                  rateType === 'hourly'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Hourly Contract Rate
              </button>
            </div>

            {/* USD Input */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                {rateType === 'monthly' ? 'Monthly USD Compensation' : 'Hourly USD Rate ($/hour)'}
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                  $
                </span>
                <input
                  type="number"
                  min="50"
                  max="50000"
                  value={usdAmount}
                  onChange={(e) => setUsdAmount(Number(e.target.value) || 0)}
                  className="w-full rounded-xl border border-slate-300 pl-8 pr-4 py-2.5 text-sm font-bold text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Hourly Hours Slider if applicable */}
            {rateType === 'hourly' && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Hours Worked Per Week</span>
                  <span className="text-emerald-600">{hoursPerWeek} hrs/week</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="5"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>
            )}

            {/* Exchange Rate Input */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Interbank USD to PKR Rate</span>
                <span className="text-[11px] text-slate-400 font-normal">Editable</span>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                  PKR
                </span>
                <input
                  type="number"
                  min="200"
                  max="400"
                  value={exchangeRate}
                  onChange={(e) => setExchangeRate(Number(e.target.value) || 279)}
                  className="w-full rounded-xl border border-slate-300 pl-12 pr-4 py-2 text-xs font-bold text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Tax Category Selector */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700">
                Pakistani Tax Status (Section 154A)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setTaxCategory('pseb')}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    taxCategory === 'pseb'
                      ? 'border-emerald-500 bg-emerald-50/70 text-emerald-950 font-bold ring-1 ring-emerald-500'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <div className="font-bold text-slate-900">PSEB Registered</div>
                  <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">0.25% Tax Rate</div>
                </button>

                <button
                  type="button"
                  onClick={() => setTaxCategory('filer')}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    taxCategory === 'filer'
                      ? 'border-emerald-500 bg-emerald-50/70 text-emerald-950 font-bold ring-1 ring-emerald-500'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <div className="font-bold text-slate-900">Filer (No PSEB)</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">1.0% Tax Rate</div>
                </button>

                <button
                  type="button"
                  onClick={() => setTaxCategory('nonfiler')}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    taxCategory === 'nonfiler'
                      ? 'border-amber-500 bg-amber-50/70 text-amber-950 font-bold ring-1 ring-amber-500'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <div className="font-bold text-slate-900">Non-Filer</div>
                  <div className="text-[11px] text-amber-700 font-semibold mt-0.5">2.0% Tax Rate</div>
                </button>
              </div>
            </div>

            {/* Payout Channel */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700">
                Payment Channel / Withdrawal Gateway
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPayoutMethod('payoneer')}
                  className={`p-2.5 rounded-xl border text-center text-xs transition-all ${
                    payoutMethod === 'payoneer'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  Payoneer (~2%)
                </button>
                <button
                  type="button"
                  onClick={() => setPayoutMethod('sadabiz')}
                  className={`p-2.5 rounded-xl border text-center text-xs transition-all ${
                    payoutMethod === 'sadabiz'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  SadaBiz (~1.5%)
                </button>
                <button
                  type="button"
                  onClick={() => setPayoutMethod('swift')}
                  className={`p-2.5 rounded-xl border text-center text-xs transition-all ${
                    payoutMethod === 'swift'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  Bank Wire ($25)
                </button>
              </div>
            </div>
          </div>

          {/* Results Display Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6">
              <div>
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  Estimated Monthly In-Hand
                </span>
                <div className="text-3xl sm:text-4xl font-black text-white mt-1">
                  {formatPkr(results.netMonthlyPkr)}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Annualized: <span className="text-emerald-300 font-semibold">{formatPkr(results.netAnnualPkr)}</span>
                </div>
              </div>

              {/* Deduction Breakdown */}
              <div className="space-y-3 pt-4 border-t border-slate-800 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Gross USD Equivalent:</span>
                  <span className="font-bold text-white">${results.monthlyGrossUsd.toLocaleString()} USD</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Gross PKR (Before Cuts):</span>
                  <span className="font-bold text-white">{formatPkr(results.monthlyGrossPkr)}</span>
                </div>
                <div className="flex justify-between text-rose-300">
                  <span>Payment Gateway / FX Margin:</span>
                  <span>- {formatPkr(results.gatewayFeePkr)}</span>
                </div>
                <div className="flex justify-between text-rose-300">
                  <span>Withholding Tax ({results.taxRatePercentage}%):</span>
                  <span>- {formatPkr(results.taxAmountPkr)}</span>
                </div>
              </div>

              {/* Net Badge */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Effective Retention Rate:</span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  {(
                    (results.netMonthlyPkr / Math.max(1, results.monthlyGrossPkr)) *
                    100
                  ).toFixed(1)}
                  % Take-Home
                </span>
              </div>
            </div>

            {/* PSEB Savings Alert */}
            {taxCategory !== 'pseb' && (
              <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5 text-amber-950 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <span>You could save {formatPkr(results.monthlySavingsWithPseb)} every month!</span>
                </div>
                <p className="leading-relaxed">
                  Registering with the Pakistan Software Export Board (PSEB) reduces your tax rate from {results.taxRatePercentage}% down to just 0.25%.
                </p>
                <Link
                  href="/guides/international-payment-methods-pakistan"
                  className="inline-flex items-center gap-1 font-bold text-emerald-700 hover:text-emerald-800 underline mt-1"
                >
                  <span>Read our Step-by-Step PSEB Registration Guide →</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Educational FAQ Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Tax &amp; Legal Compliance FAQs for Pakistani Freelancers
            </h3>
            <p className="text-xs text-slate-500">
              Key insights from Pakistan&apos;s Income Tax Ordinance and State Bank of Pakistan foreign remittance rules.
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <h4 className="font-bold text-slate-900">
                What is Section 154A of the Pakistan Income Tax Ordinance?
              </h4>
              <p>
                Section 154A provides a final tax regime for export of computer software, IT services, and IT-enabled services (call centres, data entry, virtual assistance). Registered taxpayers pay 0.25% final tax upon receipt of foreign proceeds through banking channels.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <h4 className="font-bold text-slate-900">
                Do I need to maintain an audited company to qualify for 0.25%?
              </h4>
              <p>
                No. Individual sole proprietors and independent freelancers can register with PSEB under the individual freelancer category for a small registration fee.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <h4 className="font-bold text-slate-900">
                Why is the bank exchange rate slightly lower than Google&apos;s USD rate?
              </h4>
              <p>
                Google displays interbank mid-market rates. Commercial banks and payment providers (Payoneer, SadaPay) apply a small spread (typically 1.5% - 2%) as foreign currency conversion costs.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

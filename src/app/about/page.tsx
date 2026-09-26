import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Heart, Globe, ArrowRight, Zap, Target, Award, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Our Mission — RemoteRozgar',
  description:
    'The story behind RemoteRozgar: empowering Pakistani and South Asian software engineers, designers, and operators to build global remote careers and earn in USD without leaving home.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-coolgray-500 mb-2">
        <Link href="/" className="hover:text-navy-900 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-navy-900 font-semibold">About Us</span>
      </nav>

      {/* Header */}
      <div className="space-y-4">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 inline-block">
          Our Purpose & Mission
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-navy-900 tracking-tight leading-tight">
          Turning Brain Drain into Global Brain Gain for Pakistan
        </h1>
        <p className="text-base sm:text-lg text-coolgray-600 leading-relaxed">
          RemoteRozgar was founded with a single uncompromising thesis: South Asian knowledge workers do not need to leave their families, culture, and homeland behind to earn international wages and build world-class technology.
        </p>
      </div>

      {/* Origin Story Section */}
      <section className="prose prose-navy max-w-none text-coolgray-700 leading-relaxed space-y-4 text-sm sm:text-base">
        <h2 className="font-serif text-2xl font-bold text-navy-900 mt-6 mb-3">
          The Broken Reality of Local Tech & Bidding Marketplaces
        </h2>
        <p>
          For decades, ambitious Pakistani developers, designers, and creative professionals were trapped between two unappealing options:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Local Software Houses:</strong> Facing stagnant rupee wages, high inflation, 60-hour workweeks, and severe currency depreciation that erased yearly increments.
          </li>
          <li>
            <strong>Freelance Marketplaces (Upwork/Fiverr):</strong> Constrained by predatory platform fees, high Connect costs, arbitrary account suspensions, and client races to the bottom where quality engineers were treated like cheap commodities.
          </li>
        </ul>

        <p>
          Meanwhile, the post-pandemic remote work revolution proved that distributed engineering teams from San Francisco to London care about three things: <strong>speed of execution, clean architecture, and reliable asynchronous ownership</strong>. Geography is no longer destiny.
        </p>

        <h2 className="font-serif text-2xl font-bold text-navy-900 mt-8 mb-3">
          Why We Built RemoteRozgar
        </h2>
        <p>
          RemoteRozgar is not an agency or an outsourced middleman taking a 20% cut of your hard work. We are an open public career infrastructure designed to connect Pakistani and South Asian professionals directly to verified international companies hiring globally.
        </p>

        <p>
          We provide the exact tactical knowledge needed to succeed globally:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Real Compensation Clarity:</strong> Displaying both USD and live PKR converted earnings so you understand true market value.</li>
          <li><strong>Legal & Financial Compliance:</strong> Navigating FBR 0.25% PSEB tax exemptions, e-PRC certificates, and bank remittance channels.</li>
          <li><strong>Infrastructure Resilience:</strong> Helping candidates prepare redundant power (UPS/inverters) and dual ISPs so they never drop a sprint.</li>
          <li><strong>Direct Employer Access:</strong> 100% of our application links go straight to the company&apos;s real hiring portal or ATS.</li>
        </ul>
      </section>

      {/* Core Values */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
        <div className="p-6 rounded-2xl bg-white border border-coolgray-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-navy-900 text-base">Zero Scam Tolerance</h3>
          <p className="text-xs text-coolgray-600 leading-relaxed">
            Every submission is screened. We reject Telegram recruitment traps, fake equipment checks, and multi-level marketing nonsense.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-coolgray-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-navy-900 text-base">100% Free for Talent</h3>
          <p className="text-xs text-coolgray-600 leading-relaxed">
            No subscription fees, no connects to buy, and no commissions deducted from your hard-earned paychecks.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-coolgray-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-navy-900 text-base">Community First</h3>
          <p className="text-xs text-coolgray-600 leading-relaxed">
            We measure our success by the number of South Asian households that achieve financial dignity and stability through global remote work.
          </p>
        </div>
      </section>

      {/* CTA Box */}
      <div className="p-8 rounded-3xl bg-navy-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-xl font-bold">Ready to start your remote journey?</h3>
          <p className="text-xs text-coolgray-400">Browse verified listings or read our comprehensive zero-to-offer guides.</p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/jobs"
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-navy-950 bg-sky-400 hover:bg-sky-300 transition-colors"
          >
            Find Remote Jobs
          </Link>
          <Link
            href="/guides"
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-navy-800 border border-navy-700 hover:bg-navy-700 transition-colors"
          >
            Read Guides
          </Link>
        </div>
      </div>
    </div>
  );
}

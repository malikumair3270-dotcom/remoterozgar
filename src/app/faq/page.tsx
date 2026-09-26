import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FaqAccordion } from '@/components/FaqAccordion';
import { HelpCircle, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ) — RemoteRozgar',
  description:
    'Answers to top questions regarding receiving USD payments in Pakistan, FBR freelance tax filing, time zone management, remote equipment, and avoiding employment scams.',
};

export default function FaqPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-coolgray-500 mb-2">
        <Link href="/" className="hover:text-navy-900 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-navy-900 font-semibold">FAQ</span>
      </nav>

      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-600 mb-1">
          <HelpCircle className="w-4 h-4" /> Got Questions?
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-coolgray-600 mt-2 max-w-2xl leading-relaxed">
          Comprehensive, practical answers covering international payments, Pakistani tax obligations, remote hardware setups, and career progression.
        </p>
      </div>

      {/* Interactive Accordion with FAQPage Schema */}
      <FaqAccordion />

      {/* Need more help box */}
      <div className="p-6 rounded-3xl bg-navy-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 mt-12">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-bold text-base">Have a question not listed here?</h3>
          <p className="text-xs text-coolgray-400">Our editorial and career support desk is always here to help.</p>
        </div>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-navy-950 bg-sky-400 hover:bg-sky-300 transition-colors shrink-0"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Contact Support Desk</span>
        </Link>
      </div>
    </div>
  );
}

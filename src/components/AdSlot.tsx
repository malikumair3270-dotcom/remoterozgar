'use client';

import React, { useEffect, useRef } from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
import { AD_CONFIG } from '@/lib/adConfig';

interface AdSlotProps {
  slotId?: string;
  variant?: 'banner' | 'in-feed';
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

export default function AdSlot({ variant = 'in-feed', slotId = AD_CONFIG.slots.inFeedJobs }: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch {
      // Ignored during initial AdSense site review
    }
  }, []);

  return (
    <div className="my-4 overflow-hidden rounded-xl border border-dashed border-emerald-300/80 bg-gradient-to-r from-emerald-50/70 to-teal-50/50 p-4 shadow-sm transition-all hover:border-emerald-400">
      
      {/* Live Google AdSense Unit (Auto Format) */}
      <ins
        ref={adRef}
        className="adsbygoogle block w-full text-center"
        style={{ display: 'block', minHeight: '50px' }}
        data-ad-client={AD_CONFIG.googleAdsenseClientId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />


      {/* Fallback & Complementary Native Card */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-600/10 text-emerald-700">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-200/60 px-2 py-0.5 rounded">
                Sponsored Partner
              </span>
              <span className="text-xs text-slate-400">CPM & CPC Ad Network</span>
            </div>
            <h4 className="mt-1 text-sm font-bold text-slate-900">
              International Bank Account for Freelance Earnings (USD & EUR)
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Receive remote salaries directly into Pakistani JazzCash or local bank with zero transfer delay.
            </p>
          </div>
        </div>

        <a
          href="https://www.payoneer.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-emerald-700 px-3.5 py-2 text-xs font-semibold text-white hover:bg-emerald-800 transition-colors shadow-sm"
        >
          <span>Explore Free Account</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
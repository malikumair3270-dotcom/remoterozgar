'use client';

import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { generateWhatsAppShareText } from '@/lib/utils';

interface WhatsAppShareBtnProps {
  job: {
    title: string;
    company: string;
    salaryText?: string;
    url: string;
  };
  compact?: boolean;
}

export default function WhatsAppShareBtn({ job, compact = false }: WhatsAppShareBtnProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = generateWhatsAppShareText(job);
    window.open(shareUrl, '_blank');
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(job.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (compact) {
    return (
      <button
        onClick={handleShare}
        className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1.5 rounded-lg transition-colors"
        title="Share to WhatsApp"
      >
        <span className="text-sm">💬</span>
        <span>Share</span>
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleShare}
        className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors"
        title="Share to WhatsApp Groups & Friends"
      >
        <span className="text-sm">💬</span>
        <span>WhatsApp Share</span>
      </button>

      <button
        onClick={handleCopy}
        className="flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        title="Copy Job Link"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-emerald-700 font-semibold">Copied!</span>
          </>
        ) : (
          <>
            <Share2 className="h-3.5 w-3.5 text-slate-500" />
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  );
}

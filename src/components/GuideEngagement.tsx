'use client';

import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, CheckCircle2, Mail, Send, Share2 } from 'lucide-react';

interface GuideEngagementProps {
  guideTitle: string;
  guideSlug: string;
}

export default function GuideEngagement({ guideTitle, guideSlug }: GuideEngagementProps) {
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null);
  const [helpfulCount, setHelpfulCount] = useState(142);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleVote = (type: 'yes' | 'no') => {
    if (feedback === null) {
      setFeedback(type);
      if (type === 'yes') {
        setHelpfulCount((prev) => prev + 1);
      }
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="space-y-6 pt-6 border-t border-slate-200">
      {/* Was this helpful feedback bar */}
      <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900">
            Was this career guide helpful?
          </h4>
          <p className="text-[11px] text-slate-500">
            {helpfulCount} Pakistani freelancers found this guide actionable.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={feedback !== null}
            onClick={() => handleVote('yes')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              feedback === 'yes'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:border-emerald-500 hover:text-emerald-700'
            }`}
          >
            <ThumbsUp className="h-3.5 w-3.5" />
            <span>Yes ({helpfulCount})</span>
          </button>

          <button
            type="button"
            disabled={feedback !== null}
            onClick={() => handleVote('no')}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              feedback === 'no'
                ? 'bg-slate-800 text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
            }`}
          >
            <ThumbsDown className="h-3.5 w-3.5" />
            <span>No</span>
          </button>
        </div>
      </div>

      {/* Free Weekly Job Alert Newsletter */}
      <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 rounded-2xl p-6 text-white space-y-3">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
          <Mail className="h-4 w-4" />
          <span>Weekly Remote Job Digest</span>
        </div>
        <h4 className="text-base font-bold text-white">
          Get Verified USD Remote Jobs in Your Inbox Every Monday
        </h4>
        <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
          No spam, no agency promotions. Handpicked remote openings paying in foreign currency with direct company apply links.
        </p>

        {subscribed ? (
          <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>Thank you! You are subscribed to RemoteRozgar weekly job updates.</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md pt-1">
            <input
              type="email"
              required
              placeholder="Enter your email (e.g. ali@gmail.com)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-xl bg-white/10 border border-white/20 px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors shrink-0"
            >
              <span>Subscribe Free</span>
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

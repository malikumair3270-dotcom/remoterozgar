'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, Sparkles, Send } from 'lucide-react';

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PostJobModal({ isOpen, onClose }: PostJobModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    applyUrl: '',
    contactWhatsApp: '',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/admin/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      console.error('Submission sync:', err);
    }
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl transition-all border border-slate-100 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 text-brand-600 font-semibold text-xs uppercase tracking-wider">
              <Sparkles className="h-4 w-4" />
              <span>Direct Monetization Feature</span>
            </div>

            <h2 className="mt-1 text-xl font-bold text-slate-900">
              Feature Your Remote Job on RemoteRozgar
            </h2>
            <p className="mt-1 text-xs text-slate-600">
              Get direct applications from skilled Pakistani software engineers, designers, content writers, and virtual assistants.
            </p>

            {/* Pricing Box */}
            <div className="my-4 rounded-xl border border-brand-200 bg-brand-50/60 p-3.5 text-xs text-slate-800">
              <div className="flex items-center justify-between font-bold text-brand-900 mb-1">
                <span>Featured Listing Package (7 Days)</span>
                <span className="text-sm text-brand-700 font-extrabold">Rs 1,500 PKR</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Includes: Top pinned placement on home page, highlighted border, & broadcast to 5,000+ WhatsApp job seekers.
              </p>
              <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-brand-800">
                <span>💳 Accepted Payments:</span>
                <span className="rounded bg-white px-2 py-0.5 border border-brand-200">JazzCash</span>
                <span className="rounded bg-white px-2 py-0.5 border border-brand-200">EasyPaisa</span>
                <span className="rounded bg-white px-2 py-0.5 border border-brand-200">Bank Transfer</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Flutter Developer"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Agency Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PixelSoft Solutions"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Direct Apply Link or Form *</label>
                <input
                  type="url"
                  required
                  placeholder="https://company.com/apply or Google Form link"
                  value={formData.applyUrl}
                  onChange={(e) => setFormData({ ...formData, applyUrl: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your WhatsApp Number (for instant activation) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. +92 300 1234567"
                  value={formData.contactWhatsApp}
                  onChange={(e) => setFormData({ ...formData, contactWhatsApp: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Additional Notes / Requirements</label>
                <textarea
                  rows={2}
                  placeholder="Mention salary range (USD or PKR), skills needed, or perks..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-2.5 text-xs font-bold text-white shadow-md hover:bg-brand-700 transition-colors"
                >
                  <Send className="h-4 w-4" />
                  <span>Submit Listing Request</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-6 text-center space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Request Received!</h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Thank you! We will connect on WhatsApp (<strong>{formData.contactWhatsApp}</strong>) within 30 minutes with the JazzCash / EasyPaisa payment details to make your listing live.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 rounded-xl bg-slate-900 px-6 py-2 text-xs font-semibold text-white hover:bg-slate-800"
            >
              Back to Jobs
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
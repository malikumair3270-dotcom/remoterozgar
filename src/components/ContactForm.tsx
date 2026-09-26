'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit contact inquiry. Please try again.');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status === 'success' && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">Message Sent Successfully!</span>
            <span>Thank you for reaching out. A member of our editorial or support team will respond within 24–48 business hours.</span>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">Submission Failed</span>
            <span>{errorMessage}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-coolgray-700 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Bilal Khan"
            className="w-full px-3.5 py-2.5 rounded-xl border border-coolgray-200 text-sm text-navy-900 placeholder:text-coolgray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-coolgray-700 mb-1.5">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="e.g. bilal@example.com"
            className="w-full px-3.5 py-2.5 rounded-xl border border-coolgray-200 text-sm text-navy-900 placeholder:text-coolgray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-coolgray-700 mb-1.5">
          Inquiry Subject <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl border border-coolgray-200 text-sm text-navy-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
        >
          <option value="General Inquiry">General Inquiry</option>
          <option value="Employer Hiring & Job Posting">Employer Hiring & Job Posting</option>
          <option value="Report Scam / Suspicious Listing">Report Scam / Suspicious Listing</option>
          <option value="Editorial Contribution or Suggestion">Editorial Contribution or Suggestion</option>
          <option value="Partnership / Sponsorship">Partnership / Sponsorship</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-coolgray-700 mb-1.5">
          Your Message <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="How can we assist you today? Please provide as much context as possible..."
          className="w-full px-3.5 py-2.5 rounded-xl border border-coolgray-200 text-sm text-navy-900 placeholder:text-coolgray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 resize-y"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3 rounded-xl text-sm font-semibold text-white bg-navy-900 hover:bg-sky-600 disabled:opacity-50 transition-all shadow-md"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending Message...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Send Inquiry</span>
          </>
        )}
      </button>
    </form>
  );
};

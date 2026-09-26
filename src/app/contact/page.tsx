import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from '@/components/ContactForm';
import { Mail, Clock, MessageSquare, ShieldCheck, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us — RemoteRozgar',
  description:
    'Reach out to the RemoteRozgar editorial and support team. Inquiries regarding employer job postings, scam reports, partnership proposals, and career guidance.',
};

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-coolgray-500 mb-2">
        <Link href="/" className="hover:text-navy-900 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-navy-900 font-semibold">Contact</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Information Column */}
        <div className="lg:col-span-1 space-y-6">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 inline-block mb-3">
              Get in Touch
            </span>
            <h1 className="text-3xl font-extrabold text-navy-900 tracking-tight">
              We&apos;d Love to Hear From You
            </h1>
            <p className="text-sm text-coolgray-600 mt-2 leading-relaxed">
              Have feedback on our job feed, want to report a suspicious employer, or have questions about remote tax compliance? Send us a note.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-coolgray-200">
              <Mail className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-navy-900 block">Direct Email Support</span>
                <span className="text-xs text-coolgray-500">support@remoterozgar.com</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-coolgray-200">
              <Clock className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-navy-900 block">Response SLA</span>
                <span className="text-xs text-coolgray-500">Typically within 24–48 business hours</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-coolgray-200">
              <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-navy-900 block">Scam Reporting Desk</span>
                <span className="text-xs text-coolgray-500">Submissions investigated immediately</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-coolgray-200 p-6 sm:p-10 shadow-xs">
          <h2 className="text-xl font-bold text-navy-900 mb-2">Send an Inquiry</h2>
          <p className="text-xs text-coolgray-500 mb-6">
            Fill in the form below and our team will get back to you promptly.
          </p>

          <ContactForm />
        </div>
      </div>
    </div>
  );
}

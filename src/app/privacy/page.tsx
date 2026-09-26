import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — RemoteRozgar',
  description: 'Our privacy practices: how RemoteRozgar collects, uses, and safeguards candidate and employer information.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <nav className="flex items-center gap-2 text-xs text-coolgray-500 mb-2">
        <Link href="/" className="hover:text-navy-900 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-navy-900 font-semibold">Privacy Policy</span>
      </nav>

      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-coolgray-500">Last updated: September 2026</p>
      </div>

      <div className="prose prose-navy max-w-none text-coolgray-700 text-sm leading-relaxed space-y-6">
        <section>
          <h2 className="text-lg font-bold text-navy-900">1. Information We Collect</h2>
          <p>
            RemoteRozgar prioritizes user privacy. When browsing our job board, guides, or resources, we do not require account registration or collection of invasive personal credentials from job seekers.
          </p>
          <p>
            We collect information solely when you voluntarily provide it:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Employer Submissions:</strong> Company name, website, job description, salary ranges, and contact email addresses provided via <code>/post-a-job</code>.</li>
            <li><strong>Contact Inquiries:</strong> Name, email address, subject, and message content provided via our contact form.</li>
            <li><strong>Technical Telemetry:</strong> Anonymized standard server access logs including IP address, user agent, and timestamp used strictly for DDoS mitigation and rate-limiting enforcement.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-navy-900">2. How We Use Information</h2>
          <p>We use collected data solely to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Review and moderate employer job postings to protect users from fraudulent listings.</li>
            <li>Respond to candidate and employer inquiries submitted via our contact channel.</li>
            <li>Enforce database-backed rate limiting to defend against brute-force attacks and spam.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-navy-900">3. Third-Party Job Links</h2>
          <p>
            RemoteRozgar lists external links to third-party employers, applicant tracking systems (such as Greenhouse, Lever, and Ashby), and the Jobicy public feed. When clicking an external link, you are governed by the privacy policy of that destination website. We encourage you to review their terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-navy-900">4. Cookies and Local Storage</h2>
          <p>
            We use minimal cookies:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Admin Authentication:</strong> An encrypted, HttpOnly HMAC-signed session cookie (<code>rr_admin_session</code>) used strictly for authenticated administrative access to manage postings.</li>
            <li><strong>Local Browser Cache:</strong> Non-tracking preferences such as filter state and cached exchange rates to accelerate page loads.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-navy-900">5. Contact Regarding Privacy</h2>
          <p>
            If you have questions about our data handling practices or wish to request data deletion, contact our privacy desk at <code>privacy@remoterozgar.com</code> or via our <Link href="/contact" className="text-sky-600 underline">contact page</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}

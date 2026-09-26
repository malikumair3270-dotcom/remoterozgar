import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service — RemoteRozgar',
  description: 'Terms governing the use of the RemoteRozgar job aggregation and career resource platform.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <nav className="flex items-center gap-2 text-xs text-coolgray-500 mb-2">
        <Link href="/" className="hover:text-navy-900 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-navy-900 font-semibold">Terms of Service</span>
      </nav>

      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs text-coolgray-500">Last updated: September 2026</p>
      </div>

      <div className="prose prose-navy max-w-none text-coolgray-700 text-sm leading-relaxed space-y-6">
        <section>
          <h2 className="text-lg font-bold text-navy-900">1. Acceptance of Terms</h2>
          <p>
            By accessing or using RemoteRozgar (&quot;the Platform&quot;), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, please do not use our services.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-navy-900">2. Nature of Services</h2>
          <p>
            RemoteRozgar operates as an informational directory and aggregator of international remote employment opportunities and educational career resources for South Asian talent.
          </p>
          <p>
            <strong>Important Clarification:</strong> RemoteRozgar is not an employment agency, headhunter, employer, or escrow agent. We do not represent either the hiring company or the applicant in employment contracts, negotiations, or dispute resolution. All employment agreements are entered into directly between the candidate and the prospective employer.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-navy-900">3. Employer Job Submissions</h2>
          <p>
            Employers submitting job listings through <code>/post-a-job</code> warrant that:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>The position represents a legitimate, active remote job opportunity.</li>
            <li>No fee, deposit, or purchase of software/training is required from applicants as a condition of applying or interviewing.</li>
            <li>All submitted compensation and role descriptions are accurate and non-misleading.</li>
          </ul>
          <p>
            RemoteRozgar reserves the right to reject, modify, or remove any listing at our sole discretion without prior notice.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-navy-900">4. Currency Conversions & Content Disclaimer</h2>
          <p>
            Pakistani Rupee (PKR) conversions displayed on job cards are estimates calculated from open interbank exchange rates refreshed every 6 hours. Actual take-home payments depend on your receiving bank, intermediary deductions, and date of settlement. Educational guides regarding FBR tax filing and banking procedures represent informational commentary and should not be construed as certified legal or tax counsel.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-navy-900">5. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, RemoteRozgar and its operators shall not be liable for any indirect, incidental, or consequential damages resulting from your use of the platform or transactions with third-party employers.
          </p>
        </section>
      </div>
    </div>
  );
}

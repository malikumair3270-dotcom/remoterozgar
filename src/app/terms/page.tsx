import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Scale, ArrowLeft, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';

export const metadata = {
  title: 'Terms & Conditions - RemoteRozgar',
  description: 'Terms of Service and Disclaimer for RemoteRozgar. Guidelines on job aggregation, fair use, and third-party application safety.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-800">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Remote Jobs</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200/80 space-y-8">
          <div className="border-b border-slate-100 pb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                <Scale className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Terms & Conditions</h1>
                <p className="text-xs text-slate-500 mt-1">Last Updated: September 18, 2026</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mt-3">
              Welcome to RemoteRozgar! These terms and conditions outline the rules and regulations for the use of RemoteRozgar&apos;s Website, located at https://remoterozgar.vercel.app.
            </p>
          </div>

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              1. Acceptance of Terms
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              By accessing this website we assume you accept these terms and conditions. Do not continue to use RemoteRozgar if you do not agree to take all of the terms and conditions stated on this page.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-emerald-600" />
              2. Free Platform & No Application Fees
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              RemoteRozgar is 100% free for job seekers, freelancers, and students. We never charge users any registration, placement, or processing fees for applying to remote positions.
            </p>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed flex items-start gap-2.5">
              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Important Warning:</strong> RemoteRozgar will never ask job applicants for money, bank details, or processing fees. If an employer or external posting asks for money, do not engage and report it to us immediately.
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">3. Third-Party Job Listings & External Links</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              RemoteRozgar aggregates job opportunities from public remote job boards, verified hiring feeds (including Jobicy API), and direct employer submissions. When you click &quot;Apply Now&quot;, you are redirected to the hiring company&apos;s official portal or ATS system.
            </p>
            <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
              <li>We do not control or guarantee the content, privacy policies, or hiring practices of third-party employers.</li>
              <li>RemoteRozgar is not responsible for any agreement or transaction entered into between a candidate and an employer.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">4. Disclaimer of Warranties</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              The materials and listings on RemoteRozgar are provided on an &apos;as is&apos; basis. RemoteRozgar makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability or fitness for a particular purpose.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-lg font-bold text-slate-900">5. Governing Law & Contact</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              If you have any queries regarding any of our terms, please contact us via our{' '}
              <Link href="/contact" className="text-emerald-600 underline font-semibold">
                Contact Form
              </Link>{' '}
              or email us at <strong>support@remoterozgar.com</strong>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

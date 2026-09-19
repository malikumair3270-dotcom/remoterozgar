import React from 'react';
import Metadata from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShieldCheck, Lock, FileText, Eye, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy - RemoteRozgar',
  description: 'Privacy Policy and Data Protection guidelines for RemoteRozgar. Information on Google AdSense cookies, log files, and user privacy.',
};

export default function PrivacyPolicyPage() {
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
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Privacy Policy</h1>
                <p className="text-xs text-slate-500 mt-1">Last Updated: September 18, 2026</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mt-3">
              At RemoteRozgar (accessible from https://remoterozgar.vercel.app), one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by RemoteRozgar and how we use it.
            </p>
          </div>

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="h-5 w-5 text-emerald-600" />
              1. Information We Collect
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              RemoteRozgar operates as a 100% free job discovery portal. You can browse all global remote job listings, filter opportunities by category, and apply directly without registering an account or providing sensitive personal information.
            </p>
            <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
              <li><strong>Contact Form Submissions:</strong> If you contact us directly via our Contact page or support email, we may receive additional information about you such as your name, email address, the contents of the message and/or attachments you may send us.</li>
              <li><strong>Job Posting Requests:</strong> Employers submitting remote job openings provide company details, position titles, and public application URLs.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Lock className="h-5 w-5 text-emerald-600" />
              2. Google AdSense & DoubleClick DART Cookies
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Google is a third-party vendor on our site. It uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet.
            </p>
            <ul className="list-disc pl-5 text-sm text-slate-600 space-y-2">
              <li>
                Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet.
              </li>
              <li>
                Visitors may choose to decline the use of DART cookies by visiting the Google Ad and Content Network Privacy Policy at the following URL:{' '}
                <a
                  href="https://policies.google.com/technologies/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 underline font-medium hover:text-emerald-700"
                >
                  https://policies.google.com/technologies/ads
                </a>
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Eye className="h-5 w-5 text-emerald-600" />
              3. Log Files & Analytics
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              RemoteRozgar follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting services do this as a part of hosting services&apos; analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">4. Third Party Privacy Policies</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              RemoteRozgar&apos;s Privacy Policy does not apply to other advertisers or third-party websites (such as external company hiring portals linked from job cards). Thus, we advise you to consult the respective Privacy Policies of these third-party ad servers or company websites for more detailed information.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-lg font-bold text-slate-900">5. Contact Us Regarding Privacy</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us through our{' '}
              <Link href="/contact" className="text-emerald-600 underline font-semibold">
                Contact Page
              </Link>{' '}
              or via email at <strong>support@remoterozgar.com</strong>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

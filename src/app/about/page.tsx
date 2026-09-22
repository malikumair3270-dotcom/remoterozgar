import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Globe,
  DollarSign,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  Users,
  Briefcase,
  Zap,
  BookOpen,
  Calculator,
  CheckCircle2,
  Mail,
} from 'lucide-react';

export const metadata = {
  title: 'About Us - Our Mission & Story | RemoteRozgar',
  description:
    'Learn about RemoteRozgar, founded in Pakistan to bridge the USD earning gap for local freelancers, graduates, and professionals through verified global remote jobs and educational career roadmaps.',
};

export default function AboutPage() {
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

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl mb-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Apna Rozgar, Apne Ghar Se</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Empowering Pakistani Talent to <span className="text-emerald-400">Earn in USD</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            RemoteRozgar is an independent, 100% free career discovery and educational portal founded to help Pakistani freelancers, students, and professionals overcome local currency depreciation by securing legitimate international remote contracts.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 text-center shadow-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">100%</div>
            <div className="text-xs font-medium text-slate-500 mt-1">Free Access</div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 text-center shadow-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">$0</div>
            <div className="text-xs font-medium text-slate-500 mt-1">Zero Candidate Fees</div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 text-center shadow-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">6+</div>
            <div className="text-xs font-medium text-slate-500 mt-1">Career Roadmaps</div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 text-center shadow-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">USD → PKR</div>
            <div className="text-xs font-medium text-slate-500 mt-1">Tax Calculator</div>
          </div>
        </div>

        {/* Detailed Story & Methodology */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/80 space-y-8 mb-10">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <Globe className="h-6 w-6 text-emerald-600" />
              Our Story: Why RemoteRozgar Exists
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              In Pakistan, economic headwinds and currency devaluation have created an urgent need for sustainable foreign exchange income. Yet, aspiring job seekers face two major obstacles: rampant employment scams demanding &ldquo;security deposits&rdquo; or &ldquo;registration fees&rdquo; on WhatsApp, and lack of knowledge regarding international hiring standards (such as ATS resume formatting, foreign payment channels, and legal tax incentives under PSEB Section 154A).
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              RemoteRozgar was founded as an independent platform to solve both problems. We aggregate and curate genuine remote job openings from global tech hubs, provide real-time USD to PKR earnings calculations, and publish authentic, step-by-step career guides that give every applicant a fighting chance in the global market.
            </p>
          </section>

          {/* Editorial Standards */}
          <section className="space-y-4 pt-4 border-t border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <ShieldCheck className="h-6 w-6 text-emerald-600" />
              Our Editorial &amp; Verification Principles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-600">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Direct Employer Links
                </h3>
                <p>
                  We never act as a rent-seeking middleman. Job applicants apply directly on the hiring company&apos;s ATS portal (Lever, Greenhouse, Workday) or official website.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Strict Zero-Fee Policy
                </h3>
                <p>
                  Any posting requiring payment for interviews, training materials, or equipment purchase is permanently banned and reported.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Actionable Career Roadmaps
                </h3>
                <p>
                  Our guides cover practical realities: from Payoneer and SadaBiz setups to the 0.25% PSEB freelance tax exemption.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Free Interactive Tools
                </h3>
                <p>
                  We provide free client-side tools like the USD to PKR Freelancer Tax Calculator and ATS Resume Checker with zero paywalls.
                </p>
              </div>
            </div>
          </section>

          {/* Contact coordinates */}
          <section className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Have feedback or want to partner?</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Our editorial team welcomes suggestions, guest contributions, and employer listings.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition-colors shadow-sm shrink-0"
            >
              <Mail className="h-4 w-4" />
              <span>Contact Editorial Team</span>
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

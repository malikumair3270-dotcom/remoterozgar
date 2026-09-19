import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Globe, DollarSign, ShieldCheck, Sparkles, ArrowLeft, Users, Briefcase, Zap } from 'lucide-react';

export const metadata = {
  title: 'About Us - RemoteRozgar',
  description: 'Learn about RemoteRozgar mission to connect Pakistani and South Asian freelancers, students, and professionals with verified global remote jobs paying in USD.',
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
            Empowering Talent to <span className="text-emerald-400">Earn in USD</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            RemoteRozgar is a free job discovery platform created to bridge Pakistani and South Asian freelancers, developers, designers, and students with legitimate, high-paying remote jobs and internships worldwide.
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
            <div className="text-xs font-medium text-slate-500 mt-1">No Fees Ever</div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 text-center shadow-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">45+</div>
            <div className="text-xs font-medium text-slate-500 mt-1">Global Categories</div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 text-center shadow-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">USD → PKR</div>
            <div className="text-xs font-medium text-slate-500 mt-1">Instant Calculator</div>
          </div>
        </div>

        {/* Mission Details */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200/80 space-y-8">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <Globe className="h-6 w-6 text-emerald-600" />
              Why We Built RemoteRozgar
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Finding real, verified remote opportunities that accept international candidates from Pakistan can be overwhelming due to scam websites, hidden fees, and location restrictions. RemoteRozgar solves this by aggregating verified remote job openings from global technology hubs, offering direct application links, real-time USD to PKR currency conversions, and mobile-first PWA features.
            </p>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
            <div className="space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">100% Verified Links</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Every job card redirects directly to the company&apos;s official portal, ATS system, or verified board.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <DollarSign className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Earn in USD</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Empowering remote workers to earn in US Dollars while residing in Pakistan, maximizing financial freedom.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Fast & Mobile Ready</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Install as an Android App or iOS PWA directly from your mobile browser for instant daily job updates.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

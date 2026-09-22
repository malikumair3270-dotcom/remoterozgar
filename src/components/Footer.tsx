'use client';

import React from 'react';
import Link from 'next/link';
import { Briefcase, Heart, MessageCircle, Shield, Lock, FileText, Scale, Info, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-400 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 shrink-0 overflow-hidden rounded-xl shadow-md border border-brand-500/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="RemoteRozgar Logo" className="h-full w-full object-cover" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Remote<span className="text-brand-400">Rozgar</span>
              </span>
              <span className="rounded bg-brand-900/60 border border-brand-500/30 px-1.5 py-0.5 text-[10px] font-bold text-brand-300">
                0 FEES
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Empowering Pakistani and South Asian freelancers, students, and professionals to earn in US Dollars by connecting them to worldwide legitimate remote jobs and internships.
            </p>
            <div className="flex items-center gap-2 text-xs text-brand-400 font-medium">
              <Shield className="h-3.5 w-3.5" />
              <span>100% Free Ecosystem • No Upfront Fees Ever</span>
            </div>
          </div>

          {/* Col 2: Guides & Roadmaps */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Career Guides</h4>
            <ul className="space-y-1.5 text-xs">
              <li><Link href="/guides" className="text-emerald-400 font-semibold hover:text-white transition-colors">All Career Guides →</Link></li>
              <li><Link href="/guides/remote-data-entry-jobs-guide" className="hover:text-white transition-colors">Data Entry &amp; VA Guide</Link></li>
              <li><Link href="/guides/freelance-usd-earnings-guide-pakistan" className="hover:text-white transition-colors">Earn USD in Pakistan</Link></li>
              <li><Link href="/guides/international-payment-methods-pakistan" className="hover:text-white transition-colors">Payoneer &amp; Tax Guide</Link></li>
              <li><Link href="/guides/ats-resume-guide-remote-jobs" className="hover:text-white transition-colors">ATS Resume Blueprint</Link></li>
              <li><Link href="/guides/remote-software-engineer-guide" className="hover:text-white transition-colors">Remote Software Engineer</Link></li>
            </ul>
          </div>

          {/* Col 3: Free Tools & Categories */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Free Tools &amp; Jobs</h4>
            <ul className="space-y-1.5 text-xs">
              <li><Link href="/tools/tax-calculator" className="text-emerald-400 font-semibold hover:text-white transition-colors">USD to PKR Tax Tool</Link></li>
              <li><Link href="/tools/resume-checker" className="text-emerald-400 font-semibold hover:text-white transition-colors">ATS Resume Checker</Link></li>
              <li><Link href="/?category=tech" className="hover:text-white transition-colors">Tech &amp; Software Jobs</Link></li>
              <li><Link href="/?category=support" className="hover:text-white transition-colors">Customer Care &amp; VA</Link></li>
              <li><Link href="/?category=internship" className="hover:text-white transition-colors">Paid Internships</Link></li>
            </ul>
          </div>

          {/* Col 4: Legal & Support */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Legal &amp; Support</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/about" className="hover:text-white transition-colors inline-flex items-center gap-1.5">
                  <Info className="h-3 w-3 text-emerald-400" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors inline-flex items-center gap-1.5">
                  <Mail className="h-3 w-3 text-emerald-400" />
                  <span>Contact Us</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors inline-flex items-center gap-1.5">
                  <FileText className="h-3 w-3 text-emerald-400" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors inline-flex items-center gap-1.5">
                  <Scale className="h-3 w-3 text-emerald-400" />
                  <span>Terms &amp; Conditions</span>
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors inline-flex items-center gap-1.5">
                  <Lock className="h-3 w-3" />
                  <span>Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} RemoteRozgar. Built with <Heart className="inline h-3.5 w-3.5 text-rose-500 fill-rose-500" /> for Pakistani freelancers.
          </p>
          <p className="text-[11px]">
            Data feeds powered by Jobicy API. Free for commercial and non-commercial usage.
          </p>
        </div>
      </div>
    </footer>
  );
}
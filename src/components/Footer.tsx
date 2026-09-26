import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { Heart, Globe2, ShieldCheck, Mail, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-950 text-coolgray-300 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" size="lg" />
            <p className="text-sm text-coolgray-400 max-w-sm leading-relaxed">
              RemoteRozgar is Pakistan and South Asia&apos;s premier dedicated platform connecting ambitious
              software engineers, designers, writers, and operators with verified, high-paying global remote opportunities.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-coolgray-400">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-navy-900 border border-navy-800 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Scam-Free Verified
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-navy-900 border border-navy-800 text-sky-400">
                <Globe2 className="w-3.5 h-3.5" /> Worldwide Hiring
              </span>
            </div>
          </div>

          {/* Jobs by Category */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Find Remote Jobs</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/jobs?category=Tech" className="hover:text-sky-400 transition-colors">
                  Software Engineering
                </Link>
              </li>
              <li>
                <Link href="/jobs?category=Design" className="hover:text-sky-400 transition-colors">
                  Product & UI/UX Design
                </Link>
              </li>
              <li>
                <Link href="/jobs?category=Writing" className="hover:text-sky-400 transition-colors">
                  Technical Copywriting
                </Link>
              </li>
              <li>
                <Link href="/jobs?category=Support" className="hover:text-sky-400 transition-colors">
                  Customer Success & Support
                </Link>
              </li>
              <li>
                <Link href="/jobs?category=Marketing" className="hover:text-sky-400 transition-colors">
                  Growth & Digital Marketing
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="text-sky-400 hover:text-sky-300 font-semibold inline-flex items-center gap-1">
                  Browse All Jobs <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Guides */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Career Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/guides" className="hover:text-sky-400 transition-colors">
                  All Career Guides (14)
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-sky-400 transition-colors">
                  ATS Resume Templates
                </Link>
              </li>
              <li>
                <Link href="/guides/receiving-usd-payments-pakistan" className="hover:text-sky-400 transition-colors">
                  Receiving USD in Pakistan
                </Link>
              </li>
              <li>
                <Link href="/guides/freelance-tax-fbr-filing-pakistan" className="hover:text-sky-400 transition-colors">
                  FBR Freelancer Tax Guide
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-sky-400 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/post-a-job" className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1">
                  Post a Remote Job <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Company */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Company & Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-sky-400 transition-colors">
                  Our Mission & Story
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-sky-400 transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-sky-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-sky-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-coolgray-500 hover:text-coolgray-400 transition-colors text-xs">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-navy-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-coolgray-400">
          <p>© {new Date().getFullYear()} RemoteRozgar. Built with pride for Pakistani & South Asian remote professionals.</p>
          <div className="flex items-center gap-6">
            <span>Currency conversions based on 6-hour interbank FX rates.</span>
            <Link href="/contact" className="hover:text-sky-400 inline-flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" /> Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
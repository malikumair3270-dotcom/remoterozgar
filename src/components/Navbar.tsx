'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { Menu, X, Briefcase, BookOpen, FileText, HelpCircle, Info, PlusCircle, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  usdRate?: number | null;
}

export const Navbar: React.FC<NavbarProps> = ({ usdRate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/jobs', label: 'Remote Jobs', icon: Briefcase },
    { href: '/guides', label: 'Career Guides', icon: BookOpen },
    { href: '/resources', label: 'CV Templates', icon: FileText },
    { href: '/faq', label: 'FAQ', icon: HelpCircle },
    { href: '/about', label: 'About', icon: Info },
  ];

  const isActive = (href: string) => {
    if (href === '/jobs') return pathname === '/jobs' || pathname.startsWith('/jobs/');
    if (href === '/guides') return pathname === '/guides' || pathname.startsWith('/guides/');
    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-coolgray-200/80 bg-white/95 backdrop-blur-md transition-all">
      {/* Top Banner: FX Ticker */}
      <div className="bg-navy-950 text-coolgray-300 py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-coolgray-200">Live FX Ticker:</span>
            <span className="font-semibold text-white">
              1 USD = {usdRate ? `Rs. ${usdRate.toFixed(2)} PKR` : '—'}
            </span>
            <span className="hidden sm:inline text-coolgray-400 text-[11px]">(Auto-refreshed every 6 hrs)</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="hidden md:inline text-coolgray-400">100% Verified Global Remote Positions</span>
            <Link
              href="/post-a-job"
              className="text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-0.5 transition-colors"
            >
              Hiring? Post a Job <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Logo size="md" variant="dark" />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? 'bg-navy-900 text-white shadow-sm'
                    : 'text-coolgray-700 hover:text-navy-900 hover:bg-coolgray-100'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/post-a-job"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 shadow-md shadow-sky-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post a Job</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-coolgray-700 hover:text-navy-900 hover:bg-coolgray-100 focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-coolgray-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    active
                      ? 'bg-navy-900 text-white'
                      : 'text-coolgray-700 hover:text-navy-900 hover:bg-coolgray-100'
                  }`}
                >
                  <Icon className="w-5 h-5 text-sky-500" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-coolgray-100">
            <Link
              href="/post-a-job"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 shadow-md transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post a Job Free</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

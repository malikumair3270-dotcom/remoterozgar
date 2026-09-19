'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Briefcase, Bookmark, PlusCircle, Download, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenPostJob?: () => void;
  savedCount?: number;
}

export default function Navbar({ onOpenPostJob, savedCount = 0 }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      window.location.href = '/download';
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
    setDeferredPrompt(null);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-11 w-11 shrink-0 overflow-hidden rounded-xl shadow-md border border-brand-500/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="RemoteRozgar Logo" className="h-full w-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-slate-900">Remote<span className="text-brand-600">Rozgar</span></span>
              <span className="rounded bg-brand-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-800">
                PK 🇵🇰
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-500 hidden sm:block">Apna Rozgar, Apne Ghar Se</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-brand-600 transition-colors">
            Explore Jobs
          </Link>
          <Link href="/?category=internship" className="flex items-center gap-1 hover:text-brand-600 transition-colors">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            Internships
          </Link>
          <Link href="/saved" className="flex items-center gap-1.5 hover:text-brand-600 transition-colors">
            <Bookmark className="h-4 w-4" />
            <span>Saved Jobs</span>
            {savedCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-[11px] font-bold text-white">
                {savedCount}
              </span>
            )}
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={handleInstallClick}
            className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
            title="Install app on your phone"
          >
            <Download className="h-4 w-4 text-brand-600" />
            <span>Install App</span>
          </button>

          <button
            onClick={() => onOpenPostJob?.()}
            className="flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-brand-700 transition-colors"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Post Featured Job</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/saved"
            className="relative p-2 text-slate-600 hover:text-brand-600"
            aria-label="Saved jobs"
          >
            <Bookmark className="h-5 w-5" />
            {savedCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white">
                {savedCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 py-4 md:hidden space-y-3">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="block text-sm font-semibold text-slate-800 py-1.5"
          >
            Browse All Jobs
          </Link>
          <Link
            href="/?category=internship"
            onClick={() => setIsMenuOpen(false)}
            className="block text-sm font-semibold text-amber-600 py-1.5"
          >
            ⭐ Paid Internships
          </Link>
          <Link
            href="/saved"
            onClick={() => setIsMenuOpen(false)}
            className="block text-sm font-semibold text-slate-800 py-1.5"
          >
            Saved Jobs ({savedCount})
          </Link>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsMenuOpen(false);
                handleInstallClick();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 py-2.5 text-xs font-semibold text-slate-700"
            >
              <Download className="h-4 w-4 text-brand-600" />
              <span>Install App on Phone</span>
            </button>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                onOpenPostJob?.();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 py-2.5 text-xs font-semibold text-white shadow-sm"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Post Featured Job (Rs 1,500)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Download, 
  Smartphone, 
  CheckCircle2, 
  Share2, 
  ArrowLeft, 
  Zap, 
  ShieldCheck, 
  DollarSign, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function DownloadPage() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      alert(
        'To install RemoteRozgar on your Android phone:\n\n' +
        '1. Tap the 3 dots menu in your browser (Chrome/Edge/Samsung)\n' +
        '2. Tap "Add to Home screen" or "Install app"\n' +
        '3. The app will be placed directly on your phone home screen!'
      );
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://remoterozgar.vercel.app/download');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareText = encodeURIComponent(
    '📲 Download RemoteRozgar Android App!\n\n' +
    'Get verified US Dollar remote jobs, freelance projects, and paid internships directly on your phone.\n\n' +
    '100% Free - Install now:\n' +
    'https://remoterozgar.vercel.app/download'
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col selection:bg-brand-500 selection:text-white">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur px-4 py-4 sm:px-8 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Jobs Feed</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Android Ready</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-center max-w-xl mx-auto w-full">
        
        {/* App Icon */}
        <div className="relative mb-6">
          <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-slate-800 p-2 shadow-2xl border-2 border-brand-500/40 ring-8 ring-brand-500/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon.png" alt="RemoteRozgar Icon" className="h-full w-full object-cover rounded-2xl" />
          </div>
          <span className="absolute -bottom-2 -right-2 rounded-full bg-emerald-500 px-2.5 py-0.5 text-[10px] font-black uppercase text-slate-950 border-2 border-slate-900 shadow">
            APK / PWA
          </span>
        </div>

        {/* Headings */}
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
          Remote<span className="text-brand-400">Rozgar</span> Mobile App
        </h1>
        <p className="mt-2 text-sm text-slate-300 max-w-md leading-relaxed">
          The ultimate remote job finder for Pakistani freelancers & students. Earn in US Dollars, spend in PKR!
        </p>

        {/* Feature Pills */}
        <div className="mt-6 flex flex-wrap justify-center gap-2 text-[11px] font-semibold">
          <span className="rounded-full bg-slate-800 border border-slate-700 px-3 py-1 text-slate-300 flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-amber-400" />
            0 PKR / 100% Free
          </span>
          <span className="rounded-full bg-slate-800 border border-slate-700 px-3 py-1 text-slate-300 flex items-center gap-1.5">
            <Smartphone className="h-3.5 w-3.5 text-brand-400" />
            Fast &amp; Works Offline
          </span>
          <span className="rounded-full bg-slate-800 border border-slate-700 px-3 py-1 text-slate-300 flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            Verified Employers
          </span>
        </div>

        {/* Main Action Card */}
        <div className="mt-8 w-full rounded-2xl bg-slate-800/80 border border-slate-700 p-6 shadow-xl space-y-4">
          {isInstalled ? (
            <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4 text-emerald-300 flex items-center justify-center gap-2 text-sm font-bold">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              <span>App is already installed on your device!</span>
            </div>
          ) : (
            <button
              onClick={handleInstall}
              className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-emerald-500 px-6 py-4 text-sm font-black text-white shadow-lg hover:from-brand-500 hover:to-emerald-400 active:scale-[0.98] transition-all"
            >
              <Download className="h-5 w-5" />
              <span>Install RemoteRozgar on Phone</span>
            </button>
          )}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <a
              href={`https://api.whatsapp.com/send?text=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-700/50 hover:bg-emerald-600/60 border border-emerald-500/30 py-2.5 text-xs font-bold text-white transition-colors"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>Share on WhatsApp</span>
            </a>

            <button
              onClick={handleCopyLink}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 border border-slate-600 py-2.5 text-xs font-semibold text-slate-200 transition-colors"
            >
              <span>{copied ? '✓ Link Copied!' : 'Copy App Link'}</span>
            </button>
          </div>
        </div>

        {/* 3 Step Installation Guide */}
        <div className="mt-10 w-full text-left space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center">
            How to Install on Android in 5 Seconds
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="rounded-xl bg-slate-800/60 border border-slate-700/60 p-3.5 space-y-1">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-500/20 text-brand-400 font-bold text-[11px]">1</span>
              <p className="font-bold text-slate-200">Tap Browser Menu</p>
              <p className="text-slate-400 text-[11px]">Tap the 3 dots (⋮) in Chrome, Edge, or Samsung browser.</p>
            </div>

            <div className="rounded-xl bg-slate-800/60 border border-slate-700/60 p-3.5 space-y-1">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-500/20 text-brand-400 font-bold text-[11px]">2</span>
              <p className="font-bold text-slate-200">Select &ldquo;Install App&rdquo;</p>
              <p className="text-slate-400 text-[11px]">Tap &ldquo;Install RemoteRozgar&rdquo; or &ldquo;Add to Home screen&rdquo;.</p>
            </div>

            <div className="rounded-xl bg-slate-800/60 border border-slate-700/60 p-3.5 space-y-1">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-500/20 text-brand-400 font-bold text-[11px]">3</span>
              <p className="font-bold text-slate-200">Open App Anytime</p>
              <p className="text-slate-400 text-[11px]">RemoteRozgar will launch directly from your home screen like any real app!</p>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} RemoteRozgar • Free Android Application for Pakistan
      </footer>
    </div>
  );
}

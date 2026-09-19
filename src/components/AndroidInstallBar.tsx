// AndroidInstallBar — loaded only client-side.
// Parent page lazy-loads this so desktop/SSR doesn't include it in the bundle.
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Download, X } from 'lucide-react';

export default function AndroidInstallBar() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Don't show if already installed as PWA
    if (window.matchMedia('(display-mode: standalone)').matches) return;

    const dismissed = sessionStorage.getItem('remoterozgar_install_dismissed');
    if (dismissed) return;

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Fallback: show on mobile after 4 s even without the browser event
    const timer = setTimeout(() => {
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      if (isMobile) setShowBanner(true);
    }, 4000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      clearTimeout(timer);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') setShowBanner(false);
      setDeferredPrompt(null);
    } else {
      window.location.href = '/download';
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    sessionStorage.setItem('remoterozgar_install_dismissed', 'true');
  };

  if (!showBanner) return null;

  return (
    // Added pb-safe-area class and extra bottom margin to avoid overlapping mobile nav
    <div className="fixed bottom-16 inset-x-3 z-50 sm:bottom-3 animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-900 border border-brand-500/40 p-3 shadow-2xl text-white">

        {/* App Logo & Text */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-brand-500/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon.png" alt="RemoteRozgar app icon" className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-white leading-tight truncate">RemoteRozgar Android App</p>
            <p className="text-[10px] text-brand-300 font-medium truncate">0 PKR • Instant USD Job Alerts</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleInstallClick}
            aria-label="Install RemoteRozgar app"
            className="flex items-center gap-1 rounded-xl bg-brand-600 px-3 py-2 text-xs font-bold text-white shadow hover:bg-brand-500 active:scale-95 transition-all"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Install</span>
          </button>

          <button
            onClick={handleDismiss}
            aria-label="Dismiss install banner"
            className="p-1.5 text-slate-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

      </div>
    </div>
  );
}

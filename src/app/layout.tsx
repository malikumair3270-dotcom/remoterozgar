import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RemoteRozgar - Global Remote Jobs & Internships for Pakistan',
  description: 'Find verified global remote jobs and internships. Earn in USD, spend in PKR. 100% free with direct company apply links.',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
  },
  other: {
    'google-adsense-account': 'ca-pub-1222688537346496',
  },
};

export const viewport: Viewport = {
  themeColor: '#059669',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense Account Meta Tag for Crawler Verification */}
        <meta name="google-adsense-account" content="ca-pub-1222688537346496" />
        <meta name="google-adsense-account-alt" content="ca-pub-3674055805574433" />
        {/* Mobile & Android PWA Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="application-name" content="RemoteRozgar" />
        <link rel="apple-touch-icon" href="/icon.png" />
        {/* Raw Static Google AdSense Script for Instant Crawler Verification */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1222688537346496"
          crossOrigin="anonymous"
        />

        {/* Register PWA Service Worker via static script (no dangerouslySetInnerHTML) */}
        <script src="/sw-register.js" defer />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
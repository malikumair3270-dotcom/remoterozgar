import type { Metadata, Viewport } from 'next';
import { Inter, IBM_Plex_Serif } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getUsdToPkrRate } from '@/lib/fx';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-ibm-plex-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://remoterozgar.vercel.app'),
  title: {
    default: 'RemoteRozgar — Global Remote Jobs & Career Platform for Pakistan',
    template: '%s | RemoteRozgar',
  },
  description:
    'Find verified international remote jobs, internships, and career resources for Pakistani and South Asian professionals. Earn in USD, spend in PKR, and build a global career.',
  keywords: [
    'remote jobs pakistan',
    'earn in usd pakistan',
    'freelance jobs karachi lahore islamabad',
    'remote software engineer pakistan',
    'payoneer wise usd pkr',
    'fbr freelance tax 2026',
    'work from home pakistan',
  ],
  authors: [{ name: 'RemoteRozgar Editorial Team' }],
  creator: 'RemoteRozgar',
  publisher: 'RemoteRozgar',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://remoterozgar.vercel.app',
    siteName: 'RemoteRozgar',
    title: 'RemoteRozgar — Global Remote Jobs for Pakistan & South Asia',
    description:
      'Verified international remote jobs with real-time USD to PKR salary estimates, in-depth career guides, and ATS resume templates.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'RemoteRozgar Platform Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RemoteRozgar — Remote Jobs & Career Platform for Pakistan',
    description:
      'Verified international remote jobs with real-time USD to PKR conversion and career guides for South Asian remote talent.',
    images: ['https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#0B1220',
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch cached 6-hr FX rate for the Navbar ticker
  const usdRate = await getUsdToPkrRate();

  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexSerif.variable}`}>
      <head>
        <link rel="canonical" href="https://remoterozgar.vercel.app" />
        <meta name="application-name" content="RemoteRozgar" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="min-h-screen flex flex-col bg-coolgray-50 text-navy-900 font-sans antialiased selection:bg-sky-400 selection:text-navy-950">
        <Navbar usdRate={usdRate} />
        <main className="flex-1">{children}</main>
        <Footer />

        {/* PWA Service Worker Registration Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function(err) {
                    console.log('SW registration skipped or failed:', err);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
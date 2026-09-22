import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CAREER_GUIDES, getGuideBySlug } from '@/lib/guidesData';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  DollarSign,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Share2,
  BookOpen,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CAREER_GUIDES.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return {
      title: 'Guide Not Found - RemoteRozgar',
    };
  }

  return {
    title: `${guide.title} | RemoteRozgar`,
    description: guide.subtitle,
    alternates: {
      canonical: `https://remoterozgar.vercel.app/guides/${guide.slug}`,
    },
    openGraph: {
      title: guide.title,
      description: guide.subtitle,
      url: `https://remoterozgar.vercel.app/guides/${guide.slug}`,
      siteName: 'RemoteRozgar',
      type: 'article',
      publishedTime: guide.publishedAt,
      modifiedTime: guide.lastUpdated,
      authors: [guide.author.name],
    },
  };
}

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  // JSON-LD Structured Data for Google AdSense & SEO crawlers
  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.subtitle,
    author: {
      '@type': 'Organization',
      name: guide.author.name,
      url: 'https://remoterozgar.vercel.app/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'RemoteRozgar',
      logo: {
        '@type': 'ImageObject',
        url: 'https://remoterozgar.vercel.app/logo.png',
      },
    },
    datePublished: guide.publishedAt,
    dateModified: guide.lastUpdated,
    mainEntityOfPage: `https://remoterozgar.vercel.app/guides/${guide.slug}`,
  };

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-800">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      <Navbar />

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 flex-1">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-emerald-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <Link href="/guides" className="hover:text-emerald-600 transition-colors">
            Career Guides
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="text-slate-800 font-semibold truncate max-w-[200px] sm:max-w-xs">
            {guide.category}
          </span>
        </nav>

        {/* Article Header */}
        <header className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm mb-8 space-y-5">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              {guide.category}
            </span>
            <span className="flex items-center gap-1.5 text-slate-500">
              <Clock className="h-3.5 w-3.5" />
              {guide.readTime}
            </span>
            <span className="flex items-center gap-1.5 text-slate-500">
              <Calendar className="h-3.5 w-3.5" />
              Updated: {guide.lastUpdated}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            {guide.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            {guide.subtitle}
          </p>

          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                RR
              </div>
              <div>
                <p className="font-bold text-slate-900">{guide.author.name}</p>
                <p className="text-slate-500 text-[11px]">{guide.author.role}</p>
              </div>
            </div>

            {/* WhatsApp Share Button */}
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                `${guide.title} - Read complete guide on RemoteRozgar: https://remoterozgar.vercel.app/guides/${guide.slug}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 px-3.5 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition-colors border border-emerald-200"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>Share Guide on WhatsApp</span>
            </a>
          </div>
        </header>

        {/* Highlight Snapshot: Salary, Skills, Tools */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold mb-1">
              <DollarSign className="h-4 w-4" />
              <span>Expected Earnings</span>
            </div>
            <div className="text-base font-extrabold text-slate-900">{guide.salaryRange.usd}</div>
            <div className="text-xs text-emerald-700 font-semibold mt-0.5">{guide.salaryRange.pkr}</div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:col-span-2">
            <div className="text-xs font-bold text-slate-900 mb-2">Essential Software & Tools</div>
            <div className="flex flex-wrap gap-1.5">
              {guide.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm mb-8">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-3">
            <BookOpen className="h-4 w-4 text-emerald-600" />
            <span>Guide Table of Contents</span>
          </div>
          <ol className="list-decimal pl-5 text-xs text-slate-600 space-y-1.5 font-medium">
            {guide.sections.map((section, idx) => (
              <li key={idx}>
                <a
                  href={`#section-${idx}`}
                  className="hover:text-emerald-600 hover:underline transition-colors"
                >
                  {section.title}
                </a>
              </li>
            ))}
            <li>
              <a href="#category-faqs" className="hover:text-emerald-600 hover:underline transition-colors">
                Frequently Asked Questions ({guide.faqs.length})
              </a>
            </li>
          </ol>
        </div>

        {/* Content Sections */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-10 mb-10">
          {guide.sections.map((section, idx) => (
            <section key={idx} id={`section-${idx}`} className="space-y-4 pt-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {section.title}
              </h2>

              <p className="text-sm text-slate-700 leading-relaxed">{section.content}</p>

              {section.points && section.points.length > 0 && (
                <ul className="space-y-2.5 pl-2">
                  {section.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{pt}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.warning && (
                <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 sm:p-5 text-amber-900 text-xs sm:text-sm leading-relaxed flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">Scam Caution: </strong>
                    {section.warning}
                  </div>
                </div>
              )}

              {section.tip && (
                <div className="rounded-2xl bg-emerald-50/80 border border-emerald-200 p-4 sm:p-5 text-emerald-950 text-xs sm:text-sm leading-relaxed flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">Pro Tip for Pakistanis: </strong>
                    {section.tip}
                  </div>
                </div>
              )}
            </section>
          ))}

          {/* Interactive FAQs Accordion */}
          <section id="category-faqs" className="pt-8 border-t border-slate-200 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-2">
                <HelpCircle className="h-3.5 w-3.5" />
                <span>Expert Q&amp;A</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {guide.faqs.map((faq, fIdx) => (
                <div
                  key={fIdx}
                  className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-5 space-y-2"
                >
                  <h3 className="text-sm font-bold text-slate-900 flex items-start gap-2">
                    <span className="text-emerald-600 font-extrabold">Q:</span>
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 pl-5 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Bottom CTA / Navigation to Jobs */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-8 text-white text-center space-y-4">
          <h3 className="text-xl font-bold">Ready to Apply for Verified Remote Positions?</h3>
          <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
            Browse active openings in tech, virtual assistance, content, and internships with direct employer links and verified USD to PKR calculations.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors"
            >
              <span>Explore Active Remote Jobs</span>
            </Link>
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-700 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to All Guides</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

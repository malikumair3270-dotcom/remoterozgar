'use client';

import React, { useState } from 'react';
import { ChevronDown, Search, HelpCircle, CheckCircle2 } from 'lucide-react';

export interface FaqItem {
  question: string;
  answer: string;
  category: 'Payments & Tax' | 'Getting Started' | 'Work & Productivity' | 'Legal & Safety';
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    category: 'Legal & Safety',
    question: 'Can I legally work remotely for a US or European company while living in Pakistan?',
    answer: 'Yes, 100% legally. You are considered an independent international contractor or remote employee under Pakistani law. As long as your foreign earnings enter Pakistan via legal banking channels (SWIFT, Payoneer, Wise) and you declare them in your annual FBR tax return, you are fully compliant with the State Bank of Pakistan (SBP) foreign exchange regulations.',
  },
  {
    category: 'Payments & Tax',
    question: 'How do I receive international payments in USD without losing money to excessive bank fees?',
    answer: 'The most cost-effective method depends on your volume: For regular monthly salaries above $2,000, direct international bank wire (SWIFT) with an intermediary deduction of ~$20 is the cheapest. For platform work (Upwork, Fiverr) or contracts under $2,000, Payoneer linked to your Pakistani bank account or JazzCash is reliable. Always instruct your bank to credit remittances under IT export code 154A.',
  },
  {
    category: 'Payments & Tax',
    question: 'Do I need to pay income tax on remote freelance earnings in Pakistan?',
    answer: 'Yes. Freelance earnings are not tax-free. Under Section 154A of the Income Tax Ordinance, foreign exchange remittances from IT and IT-enabled services are subject to a concessionary final tax of 0.25% (if registered with PSEB) or 1.0% (if unregistered). You must obtain an NTN, file your annual return, and remain on the Active Taxpayer List (ATL) to avoid non-filer penalties.',
  },
  {
    category: 'Payments & Tax',
    question: 'How do I register with the Pakistan Software Export Board (PSEB) to qualify for the 0.25% tax rate?',
    answer: 'Visit the PSEB portal (pseb.org.pk) and register under "Individual Freelancer." You will need your CNIC, proof of freelance work (such as an Upwork profile, contract, or bank statement showing foreign inflow), and pay a nominal annual registration fee (~Rs. 2,000–3,000). Once your certificate is issued, provide it to your bank branch.',
  },
  {
    category: 'Payments & Tax',
    question: 'What is an e-PRC and why is it mandatory for my bank account?',
    answer: 'An Electronic Proceeds Realization Certificate (e-PRC) is an official document issued by your bank confirming that foreign currency entered Pakistan through legal banking channels. It is mandatory for claiming the 0.25% PSEB tax rate, defending against FBR wealth audit inquiries, and purchasing declared real estate or vehicles.',
  },
  {
    category: 'Payments & Tax',
    question: 'Can I open a Payoneer or Wise account from Pakistan?',
    answer: 'Payoneer is fully supported in Pakistan with a valid CNIC, local bank account, and proof of address. Wise allows individuals in Pakistan to receive payments, though opening new multi-currency digital balance accounts has periodic regional restrictions. Many freelancers use Payoneer, Elevate Pay, or direct SWIFT banking wires instead.',
  },
  {
    category: 'Work & Productivity',
    question: 'How do I manage the 9-12 hour time difference between Pakistan (PKT) and the US (EST/PST)?',
    answer: 'Adopt the 3-hour overlap model. Rather than working from 9:00 PM to 6:00 AM, do your deep focused work in the afternoon (1:00 PM – 6:00 PM PKT), and maintain a 3-hour overlap window from 6:00 PM to 9:00 PM PKT (which corresponds to 9:00 AM – 12:00 PM US EST) for team syncs and standups. Use async tools like Loom and Linear to communicate before logging off.',
  },
  {
    category: 'Legal & Safety',
    question: 'What should I do if a remote recruiter asks me to interview on Telegram or WhatsApp?',
    answer: 'Walk away immediately. Legitimate international employers never conduct formal interviews, issue offer letters, or send employment contracts over Telegram, WhatsApp, or Signal. Legitimate recruitment is handled through company domain emails (@company.com), Google Meet, Zoom, or recognized ATS platforms (Greenhouse, Lever, Ashby).',
  },
  {
    category: 'Work & Productivity',
    question: 'How can I protect my work from frequent load shedding and internet outages?',
    answer: 'Build a redundant workstation: 1) A pure sine wave hybrid solar/UPS inverter or portable lithium power station for your laptop and monitors; 2) A dedicated mini-router UPS (~Rs. 5,000) that keeps your Wi-Fi router running for 6 hours uninterrupted; 3) Dual internet connections: a primary fiber optic line (StormFiber, PTCL Flash, Nayatel) plus a permanent 4G LTE backup device (Jazz/Zong).',
  },
  {
    category: 'Getting Started',
    question: 'Why do international companies reject traditional Pakistani CV formats?',
    answer: 'Traditional Pakistani CVs use two-column layouts, tables, and include personal details like CNIC, religion, father name, marital status, and photographs. Modern Applicant Tracking Systems (ATS) fail to parse multi-column tables, while US/EU anti-discrimination laws prompt recruiters to immediately discard CVs with photos and demographic details. Use a clean, single-column, metric-driven resume.',
  },
  {
    category: 'Getting Started',
    question: 'Can I negotiate my salary in US Dollars instead of Pakistani Rupees?',
    answer: 'Always negotiate in USD or EUR. Never accept a fixed PKR contract with an international client, as domestic inflation and currency depreciation will erode your real purchasing power over time. State your rate as an hourly USD rate ($20–$50/hr) or a fixed monthly retainer ($2,000–$5,000/mo).',
  },
  {
    category: 'Getting Started',
    question: 'What skills are in highest demand for remote jobs from Pakistan in 2026?',
    answer: 'The top remote disciplines are: 1) Full-Stack Next.js 14/15 & TypeScript; 2) AI Integration & RAG Pipelines; 3) Cloud Infrastructure (AWS, Terraform, Kubernetes); 4) Product Design & Design Systems (Figma); 5) B2B Technical Copywriting; 6) QA Test Automation (Playwright); 7) RevOps & CRM Architecture (HubSpot/Salesforce).',
  },
  {
    category: 'Getting Started',
    question: 'Is Upwork or Fiverr better for a beginner freelancer in Pakistan?',
    answer: 'Fiverr is better for productized, quick-turnaround creative services (e.g., logo design, video editing, standard landing pages) where clients purchase fixed gig packages. Upwork is superior for long-term engagements, software development, complex consulting, and transitioning to monthly retainers. Both should ultimately serve as stepping stones toward direct client relationships.',
  },
  {
    category: 'Work & Productivity',
    question: 'Do international employers provide health insurance or equipment stipends to remote contractors?',
    answer: 'Many progressive companies (especially those using Employer of Record platforms like Deel or Remote.com) offer comprehensive international health insurance, annual learning budgets ($1,000–$2,000), and home office setup stipends ($500–$1,500). If hired as an independent contractor without benefits, factor a 20% premium into your base rate to self-fund private health insurance in Pakistan.',
  },
  {
    category: 'Getting Started',
    question: 'How do I build a portfolio if I don\'t have any past commercial clients?',
    answer: 'Create proof of work: Build 2-3 production-grade applications that solve real business problems (e.g., a multi-tenant SaaS with authentication and payments, or an open-source library), deploy them live on Vercel with clean GitHub documentation, or conduct a speculative redesign of an existing software product and document your technical decisions.',
  },
  {
    category: 'Legal & Safety',
    question: 'What should I do if a foreign client delays or refuses to pay an invoice?',
    answer: 'Prevent non-payment by charging a 50% upfront deposit on new projects, working in weekly milestones, or using platforms with escrow protection. If a direct client delays payment, stop work on upcoming deliverables immediately, send a polite invoice reminder referencing the signed contract, and only release deployment credentials or source code repository access upon full settlement.',
  },
];

export const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Payments & Tax', 'Getting Started', 'Work & Productivity', 'Legal & Safety'];

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    if (selectedCategory !== 'All' && item.category !== selectedCategory) {
      return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      return item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q);
    }
    return true;
  });

  // Schema.org FAQPage JSON-LD
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="space-y-8">
      {/* FAQPage JSON-LD Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Search and Category Filter */}
      <div className="bg-white rounded-2xl border border-coolgray-200 p-4 sm:p-6 shadow-xs space-y-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-coolgray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions (taxes, payment methods, scams, equipment, hours)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-coolgray-200 text-sm text-navy-900 placeholder:text-coolgray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-navy-900 text-white shadow-xs'
                  : 'bg-coolgray-100 text-coolgray-600 hover:bg-coolgray-200 hover:text-navy-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all ${
                isOpen
                  ? 'border-sky-300 bg-sky-50/20 shadow-sm'
                  : 'border-coolgray-200 bg-white hover:border-coolgray-300'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left gap-4"
              >
                <div className="flex items-start gap-3">
                  <span className="p-1 rounded-lg bg-sky-100/70 text-sky-700 mt-0.5 shrink-0">
                    <HelpCircle className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-sky-600 block mb-1">
                      {faq.category}
                    </span>
                    <h3 className="font-bold text-navy-900 text-sm sm:text-base leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                </div>

                <div
                  className={`p-1.5 rounded-lg text-coolgray-400 transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 text-sky-600 bg-sky-100/50' : ''
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-sm text-coolgray-700 leading-relaxed border-t border-coolgray-100/80 animate-in fade-in-50 duration-150">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

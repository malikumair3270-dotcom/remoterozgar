'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  HelpCircle,
  ArrowLeft,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  BookOpen,
} from 'lucide-react';

interface InterviewQuestion {
  id: number;
  category: string;
  question: string;
  interviewerIntent: string;
  idealResponse: string;
  fatalMistake: string;
}

const QUESTIONS: InterviewQuestion[] = [
  {
    id: 1,
    category: 'Remote Culture & Autonomy',
    question: 'How do you handle internet outages or electricity load-shedding while working remotely in Pakistan?',
    interviewerIntent: 'Hiring managers want 100% certainty that local infrastructure issues will not cause missed meetings or missed deadlines.',
    idealResponse: 'I operate with dual redundancy: my primary connection is 50 Mbps fiber internet, backed up by a 4G wireless device on a separate telecom network. For power, my laptop battery provides 4+ hours of backup and my router is connected to a mini-UPS, ensuring uninterrupted uptime during business hours.',
    fatalMistake: 'Saying "Sometimes power goes out in my area but I will try my best to reconnect quickly" without demonstrating physical hardware backups.',
  },
  {
    id: 2,
    category: 'Timezone & Asynchronous Work',
    question: 'How do you manage collaboration with teammates who are 9 hours behind you in US Eastern or Pacific time?',
    interviewerIntent: 'Assesses whether you depend on constant real-time supervision or if you excel at asynchronous documentation.',
    idealResponse: 'I structure my day around partial overlap and asynchronous documentation. I maintain 3-4 hours of direct overlap during US morning hours for synchronous check-ins. Outside of overlap, I write comprehensive Slack updates and Loom screen recordings with clear context so colleagues have everything they need to proceed without waiting on me.',
    fatalMistake: 'Insisting that you need direct live Zoom calls for every minor question.',
  },
  {
    id: 3,
    category: 'Salary & Compensation',
    question: 'What are your compensation expectations for this remote role?',
    interviewerIntent: 'They want to see if you understand international market value or if you will anchor yourself to low local Pakistani PKR salaries.',
    idealResponse: 'Based on the scope of responsibilities, tech stack requirements, and international market standards for remote specialists in this role, my target compensation range is $35,000 to $45,000 annually (approx. $3,000 to $3,750/month). I am open to discussing performance incentives and benefits.',
    fatalMistake: 'Saying "Right now I earn 150,000 PKR locally, so anything above that in dollars is fine with me."',
  },
  {
    id: 4,
    category: 'Problem Solving & Initiative',
    question: 'Tell me about a time you encountered a blocker while your team was asleep. What did you do?',
    interviewerIntent: 'Evaluates your autonomous problem-solving capabilities when direct assistance is not immediately available.',
    idealResponse: 'When working on an API integration that failed due to undocumented payload errors, I investigated the error logs, searched our internal Notion documentation and GitHub pull requests, and tested a non-breaking fallback. I deployed the safe branch to staging and documented the issue clearly on Slack with reproducible steps, allowing the US lead to review it first thing in their morning.',
    fatalMistake: 'Saying "I stopped working and went to sleep until my manager logged in the next day to tell me what to do."',
  },
  {
    id: 5,
    category: 'Motivation & Longevity',
    question: 'Why do you want to work remotely instead of working in a local software house or agency?',
    interviewerIntent: 'They want to see genuine passion for distributed autonomous culture rather than just viewing remote work as a temporary stepping stone.',
    idealResponse: 'Remote work empowers me to collaborate with world-class international talent, master modern product tooling, and produce focused, uninterrupted output. I thrive in documentation-first environments where performance is measured by tangible outcomes rather than physical desk presence.',
    fatalMistake: 'Saying "Because traffic in Karachi/Lahore is bad and I want to save petrol money."',
  },
];

export default function InterviewPracticePage() {
  const [activeId, setActiveId] = useState(1);
  const activeQuestion = QUESTIONS.find((q) => q.id === activeId) || QUESTIONS[0];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-800">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 flex-1">
        {/* Navigation */}
        <div className="mb-6">
          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Career Tools</span>
          </Link>
        </div>

        {/* Hero Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Interactive Interview Simulator</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            International Remote Interview Simulator
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Practice answering the 5 toughest questions US and European hiring managers ask Pakistani applicants. Learn the underlying interviewer psychology, ideal winning responses, and fatal mistakes to avoid.
          </p>
        </div>

        {/* Practice Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Question List Sidebar */}
          <div className="lg:col-span-5 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Select Question to Practice:
            </h2>
            {QUESTIONS.map((q) => {
              const isActive = q.id === activeId;

              return (
                <button
                  key={q.id}
                  onClick={() => setActiveId(q.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                    isActive
                      ? 'border-emerald-500 bg-white shadow-md ring-1 ring-emerald-500'
                      : 'border-slate-200/80 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide">
                      {q.category}
                    </span>
                    <h3 className="text-xs font-bold text-slate-900 line-clamp-2">
                      {q.id}. {q.question}
                    </h3>
                  </div>
                  <ChevronRight
                    className={`h-4 w-4 shrink-0 mt-1 transition-transform ${
                      isActive ? 'text-emerald-600 translate-x-0.5' : 'text-slate-400'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Detailed Question Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                {activeQuestion.category}
              </span>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-3 leading-snug">
                &ldquo;{activeQuestion.question}&rdquo;
              </h2>
            </div>

            {/* What they are really looking for */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1 text-xs sm:text-sm">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Lightbulb className="h-4 w-4 text-emerald-600" />
                <span>What the Interviewer is Really Testing:</span>
              </div>
              <p className="text-slate-600 leading-relaxed pl-6">
                {activeQuestion.interviewerIntent}
              </p>
            </div>

            {/* Winning Pakistani Response */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2 font-bold text-emerald-950">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Winning Response Framework:</span>
              </div>
              <p className="text-slate-800 leading-relaxed pl-6 italic font-medium">
                &ldquo;{activeQuestion.idealResponse}&rdquo;
              </p>
            </div>

            {/* Fatal Mistake to Avoid */}
            <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200 space-y-1 text-xs sm:text-sm">
              <div className="flex items-center gap-2 font-bold text-rose-900">
                <AlertTriangle className="h-4 w-4 text-rose-600" />
                <span>Fatal Mistake to Avoid:</span>
              </div>
              <p className="text-rose-800 leading-relaxed pl-6">
                {activeQuestion.fatalMistake}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

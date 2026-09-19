'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Lock, 
  DollarSign, 
  Briefcase, 
  Send, 
  Users, 
  CheckCircle2, 
  ExternalLink, 
  LogOut, 
  PlusCircle, 
  ArrowLeft,
  Sparkles,
  MessageSquare,
  Smartphone,
  Download,
  Share2,
  Camera,
  RefreshCw
} from 'lucide-react';
import { ClientSubmission, AdminCustomJob } from '@/lib/adminStore';


export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('')
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'submissions' | 'post-job' | 'android' | 'settings'>('submissions');
  const [adminAvatar, setAdminAvatar] = useState<string>('/avatar.png');
  
  // Data states
  const [submissions, setSubmissions] = useState<ClientSubmission[]>([]);
  const [customJobs, setCustomJobs] = useState<AdminCustomJob[]>([]);
  const [visits, setVisits] = useState(24);
  const [loading, setLoading] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);

  // New custom job form
  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    category: 'tech',
    jobType: 'Full-Time',
    estSalaryPkr: '~$1,200/mo (~Rs 335,000 PKR/mo)',
    url: '',
    tags: 'React, Remote, Pakistan',
    description: '',
  });

  // Check login on load
  useEffect(() => {
    const auth = localStorage.getItem('remoterozgar_admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchData();
    }
    const savedPic = localStorage.getItem('remoterozgar_admin_avatar');
    if (savedPic) {
      setAdminAvatar(savedPic);
    }
  }, []);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Enforce 2 MB limit
    if (file.size > 2 * 1024 * 1024) {
      alert('Avatar image must be smaller than 2 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      try {
        localStorage.setItem('remoterozgar_admin_avatar', result);
        setAdminAvatar(result);
      } catch {
        alert('Could not save avatar: storage quota exceeded. Please use a smaller image.');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetAvatar = () => {
    setAdminAvatar('/avatar.png');
    localStorage.removeItem('remoterozgar_admin_avatar');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput, password: passwordInput }),
      });
      if (res.ok) {
        setIsAuthenticated(true);
        localStorage.setItem('remoterozgar_admin_auth', 'true');
        fetchData();
      } else {
        const data = await res.json().catch(() => ({}));
        // Fallback: allow legacy local password for offline/demo use
        if (passwordInput === 'admin786') {
          setIsAuthenticated(true);
          localStorage.setItem('remoterozgar_admin_auth', 'true');
          fetchData();
        } else {
          setLoginError(data.error || 'Invalid credentials. Please try again.');
        }
      }
    } catch {
      // Network error — allow legacy local password as fallback
      if (passwordInput === 'admin786') {
        setIsAuthenticated(true);
        localStorage.setItem('remoterozgar_admin_auth', 'true');
        fetchData();
      } else {
        setLoginError('Could not reach server. Check your connection.');
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('remoterozgar_admin_auth');
  };


  const fetchData = async () => {
    setLoading(true);
    try {
      const [resSub, resJobs, resAnalytics] = await Promise.all([
        fetch('/api/admin/submissions'),
        fetch('/api/admin/jobs'),
        fetch('/api/analytics'),
      ]);
      const dataSub = await resSub.json();
      const dataJobs = await resJobs.json();
      const dataAnalytics = await resAnalytics.json();

      if (dataSub.submissions) setSubmissions(dataSub.submissions);
      if (dataJobs.jobs) setCustomJobs(dataJobs.jobs);
      if (dataAnalytics.data && dataAnalytics.data.totalPageviews) {
        setVisits(dataAnalytics.data.totalPageviews);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tagsArray = newJob.tags.split(',').map((t) => t.trim()).filter(Boolean);
      const res = await fetch('/api/admin/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newJob,
          tags: tagsArray,
        }),
      });

      if (res.ok) {
        setPostSuccess(true);
        fetchData();
        setNewJob({
          title: '',
          company: '',
          category: 'tech',
          jobType: 'Full-Time',
          estSalaryPkr: '~$1,200/mo (~Rs 335,000 PKR/mo)',
          url: '',
          tags: 'React, Remote, Pakistan',
          description: '',
        });
        setTimeout(() => setPostSuccess(false), 4000);
      }
    } catch (err) {
      console.error('Failed to post job:', err);
    }
  };

  // 1. Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl bg-slate-800 border border-slate-700 p-8 shadow-2xl text-white">
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500/20 text-brand-400 border border-brand-500/30">
              <Lock className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-black tracking-tight">RemoteRozgar Admin</h1>
            <p className="text-xs text-slate-400">
              Authorized personnel login to manage job feeds, ads, & client leads.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label htmlFor="admin-email" className="block text-xs font-semibold text-slate-300 mb-1.5">
                Email Address
              </label>
              <input
                id="admin-email"
                type="email"
                required
                placeholder="admin@remoterozgar.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full rounded-xl bg-slate-900/90 border border-slate-700 px-4 py-2.5 text-sm text-white focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="block text-xs font-semibold text-slate-300 mb-1.5">
                Admin Password
              </label>
              <input
                id="admin-password"
                type="password"
                required
                placeholder="Enter password..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full rounded-xl bg-slate-900/90 border border-slate-700 px-4 py-2.5 text-sm text-white focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>

            {loginError && (
              <div role="alert" className="rounded-lg bg-rose-500/10 border border-rose-500/30 p-2.5 text-xs text-rose-400">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full rounded-xl bg-brand-600 py-2.5 text-xs font-bold text-white shadow-md hover:bg-brand-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loginLoading ? 'Verifying...' : 'Unlock Dashboard'}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-700 text-center">
            <Link href="/" className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col">
      
      {/* Top Admin Navbar */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 shrink-0 overflow-hidden rounded-xl shadow border border-brand-500/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="RemoteRozgar" className="h-full w-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black text-slate-900">RemoteRozgar</span>
                <span className="rounded bg-indigo-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-indigo-800">
                  Admin Panel
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">Logged in as: <strong className="text-slate-700 font-bold">Awais Malik (Owner)</strong></p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {/* Admin Avatar Badge */}
          <div className="hidden sm:flex items-center gap-2.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg overflow-hidden shadow-sm border border-brand-500/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={adminAvatar} alt="Awais Malik" className="h-full w-full object-cover" />
              <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 border border-white" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-slate-900 leading-none">Awais Malik</p>
              <p className="text-[10px] text-emerald-600 font-semibold leading-tight mt-0.5">Founder &amp; Super Admin</p>
            </div>
          </div>

          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-brand-600"
          >
            <span>View Live Site</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-8">
          <div className="rounded-2xl border border-brand-200 bg-gradient-to-b from-brand-50/50 to-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-brand-800 uppercase tracking-wider">Live Visits</span>
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="mt-2 text-2xl font-black text-brand-900">{visits}</p>
            <p className="text-[11px] text-emerald-700 font-medium mt-0.5">Total Pageviews Today</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Inbound Leads</span>
              <Users className="h-4 w-4 text-brand-600" />
            </div>
            <p className="mt-2 text-2xl font-black text-slate-900">{submissions.length}</p>
            <p className="text-[11px] text-emerald-600 font-medium mt-0.5">Rs 1,500 Job Inquiries</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Custom Admin Jobs</span>
              <Briefcase className="h-4 w-4 text-indigo-600" />
            </div>
            <p className="mt-2 text-2xl font-black text-slate-900">{customJobs.length}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Manually pinned jobs</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">AdSense Publisher</span>
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
            </div>
            <p className="mt-2 text-xs font-mono font-bold text-slate-900 truncate">ca-pub-1222688537346496</p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">Review Requested (Live)</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">USD to PKR</span>
              <DollarSign className="h-4 w-4 text-amber-600" />
            </div>
            <p className="mt-2 text-2xl font-black text-slate-900">278.5 PKR</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Currency multiplier</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-6">
          <button
            onClick={() => setActiveTab('submissions')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-colors ${
              activeTab === 'submissions'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            Client Submissions ({submissions.length})
          </button>
          <button
            onClick={() => setActiveTab('post-job')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-colors ${
              activeTab === 'post-job'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            + Post New Featured Job
          </button>
          <button
            onClick={() => setActiveTab('android')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-colors flex items-center gap-1.5 ${
              activeTab === 'android'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span>📱 Android App (.apk & Play Store)</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-colors ${
              activeTab === 'settings'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            ⚙️ Profile & Monetization
          </button>
        </div>

        {/* Tab 1: Client Submissions (Rs 1,500 Cash Leads) */}
        {activeTab === 'submissions' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Inbound Featured Job Inquiries</h3>
                <p className="text-xs text-slate-500">
                  Clients who submitted through your website to pay Rs 1,500 via JazzCash/EasyPaisa.
                </p>
              </div>
              <button
                onClick={fetchData}
                className="text-xs font-semibold text-brand-600 hover:underline"
              >
                Refresh List
              </button>
            </div>

            {submissions.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500 text-xs">
                No submissions received yet. When a company fills the &ldquo;Post Featured Job&rdquo; form, it will appear here!
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {submissions.map((sub) => {
                  const cleanPhone = sub.contactWhatsApp.replace(/[^0-9]/g, '');
                  const waLink = `https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(sub.companyName)},%20we%20received%20your%20featured%20job%20request%20on%20RemoteRozgar!`;

                  return (
                    <div
                      key={sub.id}
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{sub.jobTitle}</span>
                          <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                            {sub.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600">
                          Company: <span className="font-semibold text-slate-800">{sub.companyName}</span> • Date: {new Date(sub.date).toLocaleDateString()}
                        </p>
                        {sub.notes && (
                          <p className="text-xs text-slate-500 italic bg-slate-50 p-2 rounded-lg border border-slate-200/60 max-w-xl">
                            &ldquo;{sub.notes}&rdquo;
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition-colors"
                        >
                          <MessageSquare className="h-3.5 w-3.5" />
                          <span>Chat on WhatsApp ({sub.contactWhatsApp})</span>
                        </a>

                        <a
                          href={sub.applyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-xl border border-slate-300 p-2 text-slate-600 hover:bg-slate-50"
                          title="View Apply URL"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Post New Job (Manual Listing) */}
        {activeTab === 'post-job' && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm max-w-2xl mx-auto">
            <div className="flex items-center gap-2 text-brand-600 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="h-4 w-4" />
              <span>Admin Instant Listing Tool</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-1">Post a Custom Job to RemoteRozgar</h3>
            <p className="text-xs text-slate-500 mb-6">
              This job will be pinned with a &ldquo;⭐ Featured&rdquo; badge right at the top of the homepage.
            </p>

            {postSuccess && (
              <div className="mb-4 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs font-semibold text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Job posted successfully! It is now live on the homepage.</span>
              </div>
            )}

            <form onSubmit={handleCreateJob} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Job Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Flutter Developer"
                    value={newJob.title}
                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-brand-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. PixelSoft Pakistan"
                    value={newJob.company}
                    onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newJob.category}
                    onChange={(e) => setNewJob({ ...newJob, category: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-brand-500 focus:outline-none bg-white"
                  >
                    <option value="tech">Tech & Dev</option>
                    <option value="design">Design & UI/UX</option>
                    <option value="writing">Content & Writing</option>
                    <option value="support">Virtual Assistant</option>
                    <option value="marketing">Marketing & Sales</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Job Type</label>
                  <input
                    type="text"
                    placeholder="Full-Time / Part-Time"
                    value={newJob.jobType}
                    onChange={(e) => setNewJob({ ...newJob, jobType: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-brand-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Estimated Salary (USD & PKR)</label>
                  <input
                    type="text"
                    placeholder="~$1,000/mo (~Rs 280,000 PKR)"
                    value={newJob.estSalaryPkr}
                    onChange={(e) => setNewJob({ ...newJob, estSalaryPkr: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Direct Apply Link *</label>
                <input
                  type="url"
                  required
                  placeholder="https://company.com/jobs/apply"
                  value={newJob.url}
                  onChange={(e) => setNewJob({ ...newJob, url: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  placeholder="React, Remote, Full-time"
                  value={newJob.tags}
                  onChange={(e) => setNewJob({ ...newJob, tags: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Job Description</label>
                <textarea
                  rows={3}
                  placeholder="Enter details, responsibilities, or requirements..."
                  value={newJob.description}
                  onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-3 text-xs font-bold text-white shadow-md hover:bg-brand-700 transition-colors"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>Publish Job Directly to Homepage</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 3: Android App & Play Store Management */}
        {activeTab === 'android' && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm max-w-3xl mx-auto space-y-6">
            <div>
              <div className="flex items-center gap-2 text-brand-600 font-bold text-xs uppercase tracking-wider">
                <Smartphone className="h-4 w-4" />
                <span>Mobile Distribution Engine</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">RemoteRozgar Android App (.apk &amp; Play Store)</h3>
              <p className="text-xs text-slate-500">
                100% Free distribution system for Pakistani mobile users (0 PKR budget, no Play Store fee required).
              </p>
            </div>

            {/* Method 1: PWA WebAPK */}
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold text-sm text-emerald-950">Method 1: Direct Android App (100% FREE • Active)</span>
                </div>
                <span className="rounded bg-emerald-200/80 px-2 py-0.5 text-[10px] font-black text-emerald-900">0 PKR</span>
              </div>
              <p className="text-xs text-emerald-900/80 leading-relaxed">
                Service Worker (`sw.js`) and Web Manifest are live! When any Android user opens your site in Chrome, Edge, or Samsung browser, they can install RemoteRozgar directly onto their phone home screen with 1 tap.
              </p>
              
              <div className="pt-2 flex flex-wrap gap-2.5">
                <Link
                  href="/download"
                  target="_blank"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2 text-xs font-bold text-white shadow hover:bg-brand-500 transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>View Public App Download Page</span>
                </Link>

                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent('📲 Download RemoteRozgar Android App!\n\nGet verified US Dollar remote jobs, freelance projects, and paid internships directly on your phone.\n\n100% Free - Install now:\nhttps://remoterozgar.vercel.app/download')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow hover:bg-emerald-500 transition-colors"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  <span>Share App on WhatsApp Groups</span>
                </a>
              </div>
            </div>

            {/* Method 2: PWABuilder Signed .APK & Play Store .AAB */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-slate-900">Method 2: Standalone .APK File &amp; Play Store .AAB Bundle</span>
                <span className="rounded bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-800">PWABuilder Cloud</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Microsoft PWABuilder packages our live website into an official Android `.apk` file (to send on WhatsApp or Google Drive) and a signed `.aab` bundle (for Google Play Store upload).
              </p>

              <div className="rounded-xl bg-white border border-slate-200 p-3 text-xs space-y-1 text-slate-600">
                <p><strong>Pre-configured Target:</strong> <code className="text-brand-600 font-mono">https://remoterozgar.vercel.app</code></p>
                <p><strong>Package Name:</strong> <code className="text-slate-700 font-mono">app.vercel.remoterozgar.twa</code></p>
                <p><strong>Icons &amp; Splash:</strong> 512x512 maskable 3D emerald-gold branding ready</p>
              </div>

              <div className="pt-2">
                <a
                  href="https://www.pwabuilder.com/report?site=https://remoterozgar.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow hover:bg-slate-800 transition-colors"
                >
                  <Download className="h-4 w-4 text-brand-400" />
                  <span>Generate .APK &amp; .AAB on PWABuilder (1-Click Free)</span>
                  <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                </a>
              </div>
            </div>

            {/* Play Store Checklist */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 text-xs">
              <span className="font-bold text-sm text-slate-900">Google Play Store Roadmap (Jab $25 Ready Hon):</span>
              <ol className="list-decimal list-inside space-y-2 text-slate-600 leading-relaxed">
                <li>Create account at <a href="https://play.google.com/console" target="_blank" className="text-brand-600 underline font-semibold">play.google.com/console</a> ($25 one-time fee via SadaPay or NayaPay card).</li>
                <li>Click <strong>&ldquo;Create App&rdquo;</strong> &rarr; Title: <strong>RemoteRozgar - Remote Jobs PK</strong>.</li>
                <li>Click the PWABuilder link above, download the <strong>`.aab`</strong> file, and upload it to Play Console.</li>
                <li>Submit for review — Google approves within 2-4 days!</li>
              </ol>
            </div>
          </div>
        )}

        {/* Tab 4: Settings & Profile */}
        {activeTab === 'settings' && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm max-w-2xl mx-auto space-y-6">
            
            {/* Admin Profile Photo Customizer */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Admin Profile Photo &amp; Identity</h4>
                  <p className="text-[11px] text-slate-500">Customize your avatar displayed across the RemoteRozgar admin suite.</p>
                </div>
                <span className="rounded bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 text-[10px]">Verified Admin</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 shrink-0 rounded-2xl overflow-hidden shadow-md border-2 border-brand-500 ring-4 ring-brand-500/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={adminAvatar} alt="Awais Malik" className="h-full w-full object-cover" />
                  <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white shadow" />
                </div>

                <div className="space-y-1.5 text-xs">
                  <p className="font-bold text-slate-900">Awais Malik (Owner &amp; Super Admin)</p>
                  <p className="text-slate-500 text-[11px]">Rawalpindi, Pakistan • Full Access</p>
                  
                  <div className="flex items-center gap-2 pt-1">
                    <label className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-brand-500 transition-colors shadow-sm">
                      <Camera className="h-3 w-3" />
                      <span>Upload Your Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                      />
                    </label>

                    <button
                      onClick={handleResetAvatar}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                      title="Reset to default handsome avatar"
                    >
                      <RefreshCw className="h-3 w-3" />
                      <span>Reset Photo</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">Monetization &amp; AdSense Controls</h3>
              <p className="text-xs text-slate-500">
                Connected publisher settings for earning CPM &amp; CPC revenue.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
                <span className="font-semibold text-slate-700">Google AdSense Publisher ID:</span>
                <p className="font-mono font-bold text-slate-900 mt-1 text-sm">ca-pub-1222688537346496</p>
                <p className="text-[11px] text-emerald-600 mt-0.5">Status: Verified &amp; Live in HTML head and ads.txt</p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
                <span className="font-semibold text-slate-700">Live `ads.txt` Path:</span>
                <p className="font-mono text-brand-600 mt-1 text-xs">
                  <a href="/ads.txt" target="_blank" className="underline">https://remoterozgar.vercel.app/ads.txt</a>
                </p>
              </div>

              <div className="rounded-xl bg-emerald-50 p-4 border border-emerald-200 space-y-2">
                <span className="font-bold text-emerald-900">Direct JazzCash / EasyPaisa Setup:</span>
                <p className="text-slate-600 text-xs leading-relaxed">
                  When clients request a featured job, they see your payment instructions in the modal. You can send them your JazzCash/EasyPaisa account number via WhatsApp, confirm payment of Rs 1,500, and use the &ldquo;+ Post New Featured Job&rdquo; tab to pin their job to the top!
                </p>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
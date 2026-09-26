'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';
import {
  Briefcase,
  BookOpen,
  Inbox,
  RefreshCw,
  LogOut,
  Plus,
  Check,
  X,
  Trash2,
  DollarSign,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Building2,
  Clock,
  Edit3,
} from 'lucide-react';

interface AdminStats {
  totalJobs: number;
  approvedJobs: number;
  pendingSubmissions: number;
  rejectedSubmissions: number;
  totalGuides: number;
  usdToPkrRate: number | null;
  lastJobicySync: string | null;
  lastJobicyCount: number;
}

interface AdminJobItem {
  id: string;
  title: string;
  companyName: string;
  companyLogo: string | null;
  category: string;
  location: string;
  jobType: string;
  salaryMinUsd: number | null;
  salaryMaxUsd: number | null;
  salaryFormatted: string | null;
  description: string;
  applyUrl: string;
  contactEmail: string | null;
  status: string; // PENDING, APPROVED, REJECTED, ARCHIVED
  source: string; // ADMIN, SUBMISSION
  adminNotes: string | null;
  isFeatured: boolean;
  pubDate: string;
  createdAt: string;
}

interface AdminGuideItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  body: string;
  coverImage: string;
  publishedDate: string;
  readTimeMinutes: number;
  isFeatured: boolean;
}

export default function AdminDashboardPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'submissions' | 'jobs' | 'guides' | 'system'>('submissions');
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [jobs, setJobs] = useState<AdminJobItem[]>([]);
  const [guides, setGuides] = useState<AdminGuideItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // New Job Modal state
  const [newJobOpen, setNewJobOpen] = useState(false);
  const [jobForm, setJobForm] = useState({
    title: '',
    companyName: '',
    category: 'Tech',
    location: 'Anywhere (Global Remote)',
    jobType: 'Full-Time',
    salaryMinUsd: '',
    salaryMaxUsd: '',
    applyUrl: '',
    description: '',
    isFeatured: false,
  });

  // Load dashboard data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, jobsRes, guidesRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/jobs'),
        fetch('/api/admin/guides'),
      ]);

      if (statsRes.status === 401 || jobsRes.status === 401 || guidesRes.status === 401) {
        router.push('/admin/login');
        return;
      }

      const statsData = await statsRes.json();
      const jobsData = await jobsRes.json();
      const guidesData = await guidesRes.json();

      if (statsData.success) setStats(statsData.stats);
      if (jobsData.success) setJobs(jobsData.jobs);
      if (guidesData.success) setGuides(guidesData.guides);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
      showNotice('error', 'Error connecting to admin APIs. Please refresh.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showNotice = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const handleJobStatusChange = async (id: string, newStatus: string) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/jobs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        showNotice('success', `Job status updated to ${newStatus}.`);
        fetchData();
      } else {
        showNotice('error', 'Failed to update job status.');
      }
    } catch {
      showNotice('error', 'Network error.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleJobDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this job?')) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/jobs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showNotice('success', 'Job deleted.');
        fetchData();
      } else {
        showNotice('error', 'Failed to delete job.');
      }
    } catch {
      showNotice('error', 'Network error.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const res = await fetch('/api/admin/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...jobForm,
          salaryMinUsd: jobForm.salaryMinUsd ? parseInt(jobForm.salaryMinUsd, 10) : null,
          salaryMaxUsd: jobForm.salaryMaxUsd ? parseInt(jobForm.salaryMaxUsd, 10) : null,
        }),
      });
      if (res.ok) {
        showNotice('success', 'Admin job created and approved!');
        setNewJobOpen(false);
        setJobForm({
          title: '',
          companyName: '',
          category: 'Tech',
          location: 'Anywhere (Global Remote)',
          jobType: 'Full-Time',
          salaryMinUsd: '',
          salaryMaxUsd: '',
          applyUrl: '',
          description: '',
          isFeatured: false,
        });
        fetchData();
      } else {
        showNotice('error', 'Failed to create job.');
      }
    } catch {
      showNotice('error', 'Network error creating job.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleSyncJobs = async () => {
    setActionLoading(true);
    try {
      const res = await fetch('/api/admin/sync-jobs', { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        showNotice('success', data.message || 'Jobicy jobs synced successfully.');
        fetchData();
      } else {
        showNotice('error', data.error || 'Sync failed.');
      }
    } catch {
      showNotice('error', 'Network error triggering sync.');
    } finally {
      setActionLoading(false);
    }
  };

  const pendingJobs = jobs.filter((j) => j.status === 'PENDING');
  const liveJobs = jobs.filter((j) => j.status === 'APPROVED');

  return (
    <div className="min-h-screen bg-coolgray-50 flex flex-col">
      {/* Admin Top Navigation */}
      <header className="sticky top-0 z-40 bg-navy-950 border-b border-navy-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo variant="light" size="sm" />
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-navy-800 text-sky-400 border border-navy-700">
              Admin Control Panel
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSyncJobs}
              disabled={actionLoading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-coolgray-300 bg-navy-900 border border-navy-800 hover:text-white hover:bg-navy-800 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${actionLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Sync Jobicy Feed</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Notification Toast */}
        {notification && (
          <div
            className={`p-4 rounded-xl text-sm font-semibold flex items-center gap-2.5 animate-in slide-in-from-top-2 ${
              notification.type === 'success'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                : 'bg-red-50 border border-red-200 text-red-900'
            }`}
          >
            {notification.type === 'success' ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600" />
            )}
            <span>{notification.message}</span>
          </div>
        )}

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <div className="bg-white p-4 rounded-2xl border border-coolgray-200/80 shadow-xs">
            <span className="text-[11px] font-bold text-coolgray-400 uppercase tracking-wider block">
              Pending Review
            </span>
            <span className="text-2xl font-extrabold text-amber-500">
              {stats?.pendingSubmissions ?? '—'}
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-coolgray-200/80 shadow-xs">
            <span className="text-[11px] font-bold text-coolgray-400 uppercase tracking-wider block">
              Live Approved
            </span>
            <span className="text-2xl font-extrabold text-emerald-600">
              {stats?.approvedJobs ?? '—'}
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-coolgray-200/80 shadow-xs">
            <span className="text-[11px] font-bold text-coolgray-400 uppercase tracking-wider block">
              Total Guides
            </span>
            <span className="text-2xl font-extrabold text-navy-900">
              {stats?.totalGuides ?? '—'}
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-coolgray-200/80 shadow-xs">
            <span className="text-[11px] font-bold text-coolgray-400 uppercase tracking-wider block">
              USD / PKR FX
            </span>
            <span className="text-xl font-bold text-sky-600 truncate block">
              {stats?.usdToPkrRate ? `Rs. ${stats.usdToPkrRate.toFixed(2)}` : '—'}
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-coolgray-200/80 shadow-xs">
            <span className="text-[11px] font-bold text-coolgray-400 uppercase tracking-wider block">
              Jobicy Cached
            </span>
            <span className="text-2xl font-extrabold text-navy-900">
              {stats?.lastJobicyCount ?? 0}
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-coolgray-200/80 shadow-xs">
            <span className="text-[11px] font-bold text-coolgray-400 uppercase tracking-wider block">
              Total DB Jobs
            </span>
            <span className="text-2xl font-extrabold text-coolgray-700">
              {stats?.totalJobs ?? '—'}
            </span>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex items-center justify-between border-b border-coolgray-200 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('submissions')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'submissions'
                  ? 'bg-navy-900 text-white shadow-xs'
                  : 'bg-white text-coolgray-600 border border-coolgray-200 hover:text-navy-900'
              }`}
            >
              <Inbox className="w-4 h-4" />
              <span>Client Submissions ({pendingJobs.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('jobs')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'jobs'
                  ? 'bg-navy-900 text-white shadow-xs'
                  : 'bg-white text-coolgray-600 border border-coolgray-200 hover:text-navy-900'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Custom Jobs ({jobs.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('guides')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'guides'
                  ? 'bg-navy-900 text-white shadow-xs'
                  : 'bg-white text-coolgray-600 border border-coolgray-200 hover:text-navy-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Guides ({guides.length})</span>
            </button>
          </div>

          {activeTab === 'jobs' && (
            <button
              onClick={() => setNewJobOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-sky-500 hover:bg-sky-600 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Custom Job</span>
            </button>
          )}
        </div>

        {/* Tab 1: Client Submissions Review Queue */}
        {activeTab === 'submissions' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-navy-900">
                Pending Submissions Review Queue
              </h2>
              <span className="text-xs text-coolgray-500">
                Review client submissions before approving them to the public feed.
              </span>
            </div>

            {pendingJobs.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {pendingJobs.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 sm:p-6 rounded-2xl bg-white border border-amber-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-2 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900">
                          PENDING REVIEW
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-coolgray-100 text-coolgray-700">
                          {item.category} • {item.jobType}
                        </span>
                        <span className="text-xs text-coolgray-400">
                          Submitted {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <h3 className="font-bold text-navy-900 text-lg leading-tight">
                        {item.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-coolgray-600">
                        <span className="font-semibold text-navy-900">{item.companyName}</span>
                        <span>•</span>
                        <span>{item.location}</span>
                        <span>•</span>
                        <span className="font-bold text-emerald-600">{item.salaryFormatted}</span>
                        {item.contactEmail && (
                          <>
                            <span>•</span>
                            <span className="text-coolgray-500">Contact: {item.contactEmail}</span>
                          </>
                        )}
                      </div>

                      <p className="text-xs text-coolgray-600 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={item.applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl text-coolgray-600 hover:text-navy-900 hover:bg-coolgray-100 text-xs font-semibold inline-flex items-center gap-1"
                        title="Check external link"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>

                      <button
                        onClick={() => handleJobStatusChange(item.id, 'APPROVED')}
                        disabled={actionLoading}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-xs"
                      >
                        <Check className="w-4 h-4" />
                        <span>Approve Job</span>
                      </button>

                      <button
                        onClick={() => handleJobStatusChange(item.id, 'REJECTED')}
                        disabled={actionLoading}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100"
                      >
                        <X className="w-4 h-4" />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-coolgray-200">
                <Check className="w-8 h-8 mx-auto text-emerald-500 mb-2" />
                <h3 className="font-bold text-navy-900 text-sm">Review Queue Clean</h3>
                <p className="text-xs text-coolgray-500 mt-1">There are no client job submissions awaiting review.</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: All Custom Jobs */}
        {activeTab === 'jobs' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-coolgray-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-coolgray-50 border-b border-coolgray-200 font-bold text-coolgray-600 uppercase">
                    <tr>
                      <th className="p-4">Title & Company</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Source</th>
                      <th className="p-4">Compensation</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-coolgray-100 text-coolgray-700">
                    {jobs.map((job) => (
                      <tr key={job.id} className="hover:bg-coolgray-50/50">
                        <td className="p-4">
                          <span className="font-bold text-navy-900 block text-sm">{job.title}</span>
                          <span className="text-coolgray-500">{job.companyName} • {job.location}</span>
                        </td>
                        <td className="p-4 font-semibold">{job.category}</td>
                        <td className="p-4">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              job.status === 'APPROVED'
                                ? 'bg-emerald-100 text-emerald-800'
                                : job.status === 'PENDING'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {job.status}
                          </span>
                        </td>
                        <td className="p-4 text-coolgray-500 font-medium">{job.source}</td>
                        <td className="p-4 font-bold text-emerald-600">{job.salaryFormatted}</td>
                        <td className="p-4 text-right space-x-1">
                          {job.status === 'PENDING' && (
                            <button
                              onClick={() => handleJobStatusChange(job.id, 'APPROVED')}
                              className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            >
                              Approve
                            </button>
                          )}
                          <button
                            onClick={() => handleJobDelete(job.id)}
                            className="p-1.5 rounded-md text-red-500 hover:bg-red-50"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Guides Manager */}
        {activeTab === 'guides' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-navy-900">
                Published Knowledge Base Guides ({guides.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guides.map((g) => (
                <div
                  key={g.id}
                  className="p-5 rounded-2xl bg-white border border-coolgray-200 shadow-xs flex flex-col justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-700">
                        {g.category}
                      </span>
                      <span className="text-xs text-coolgray-400">{g.readTimeMinutes} min read</span>
                    </div>

                    <h3 className="font-serif font-bold text-navy-900 text-base leading-snug">
                      {g.title}
                    </h3>
                    <p className="text-xs text-coolgray-500 mt-1 line-clamp-2">
                      {g.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-coolgray-100 text-xs">
                    <span className="text-coolgray-400 font-mono text-[11px]">/guides/{g.slug}</span>
                    <a
                      href={`/guides/${g.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-600 hover:text-sky-700 font-semibold inline-flex items-center gap-1"
                    >
                      View Live <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal: Add New Job */}
        {newJobOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-xs">
            <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-coolgray-100 pb-3">
                <h3 className="text-lg font-bold text-navy-900">Add Admin-Approved Job</h3>
                <button onClick={() => setNewJobOpen(false)} className="text-coolgray-400 hover:text-navy-900">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateJob} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-semibold text-coolgray-700 block mb-1">Job Title *</label>
                  <input
                    type="text"
                    required
                    value={jobForm.title}
                    onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-coolgray-200 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-coolgray-700 block mb-1">Company *</label>
                    <input
                      type="text"
                      required
                      value={jobForm.companyName}
                      onChange={(e) => setJobForm({ ...jobForm, companyName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-coolgray-200 text-sm"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-coolgray-700 block mb-1">Category *</label>
                    <select
                      value={jobForm.category}
                      onChange={(e) => setJobForm({ ...jobForm, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-coolgray-200 text-sm bg-white"
                    >
                      <option value="Tech">Tech</option>
                      <option value="Design">Design</option>
                      <option value="Writing">Writing</option>
                      <option value="Customer Support">Customer Support</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Business & Operations">Business & Operations</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-coolgray-700 block mb-1">Salary Min USD/mo</label>
                    <input
                      type="number"
                      value={jobForm.salaryMinUsd}
                      onChange={(e) => setJobForm({ ...jobForm, salaryMinUsd: e.target.value })}
                      placeholder="3000"
                      className="w-full px-3 py-2 rounded-xl border border-coolgray-200 text-sm"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-coolgray-700 block mb-1">Salary Max USD/mo</label>
                    <input
                      type="number"
                      value={jobForm.salaryMaxUsd}
                      onChange={(e) => setJobForm({ ...jobForm, salaryMaxUsd: e.target.value })}
                      placeholder="5000"
                      className="w-full px-3 py-2 rounded-xl border border-coolgray-200 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-coolgray-700 block mb-1">Application URL *</label>
                  <input
                    type="url"
                    required
                    value={jobForm.applyUrl}
                    onChange={(e) => setJobForm({ ...jobForm, applyUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-coolgray-200 text-sm"
                  />
                </div>

                <div>
                  <label className="font-semibold text-coolgray-700 block mb-1">Description *</label>
                  <textarea
                    required
                    rows={4}
                    value={jobForm.description}
                    onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-coolgray-200 text-sm"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={jobForm.isFeatured}
                    onChange={(e) => setJobForm({ ...jobForm, isFeatured: e.target.checked })}
                    className="rounded"
                  />
                  <label htmlFor="featured" className="text-coolgray-700 font-semibold cursor-pointer">
                    Mark as Featured Job (top placement)
                  </label>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-coolgray-100">
                  <button
                    type="button"
                    onClick={() => setNewJobOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-coolgray-600 hover:bg-coolgray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-navy-900 hover:bg-sky-600 shadow-xs"
                  >
                    Publish Approved Job
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
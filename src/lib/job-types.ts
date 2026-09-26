export interface RemoteJob {
  id: string;
  title: string;
  companyName: string;
  companyLogo: string | null;
  category: string;
  location: string;
  jobType: string;
  salaryMinUsd: number | null;
  salaryMaxUsd: number | null;
  salaryFormatted: string;
  excerpt: string;
  description: string;
  applyUrl: string;
  pubDate: string;
  source: 'jobicy' | 'admin' | 'submission';
  isFeatured: boolean;
}

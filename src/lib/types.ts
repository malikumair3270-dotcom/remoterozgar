export interface Job {
  id: string | number;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  category: string;
  jobType: string;
  salaryUsd?: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;
  salaryPeriod?: string;
  estSalaryPkr?: string;
  url: string;
  pubDate: string;
  tags: string[];
  description: string;
  featured?: boolean;
}

export type JobCategory =
  | 'all'
  | 'tech'
  | 'design'
  | 'writing'
  | 'support'
  | 'marketing'
  | 'internship';

export interface CategoryOption {
  id: JobCategory;
  label: string;
  iconName: string;
  description: string;
}

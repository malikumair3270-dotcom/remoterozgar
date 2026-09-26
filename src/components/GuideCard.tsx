import React from 'react';
import Link from 'next/link';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

export interface GuideListItem {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  coverImage: string;
  publishedDate: string | Date;
  readTimeMinutes: number;
  isFeatured?: boolean;
}

interface GuideCardProps {
  guide: GuideListItem;
}

export const GuideCard: React.FC<GuideCardProps> = ({ guide }) => {
  const formattedDate = new Date(guide.publishedDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-coolgray-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/5 hover:border-sky-300">
      <div>
        {/* Cover Image Container */}
        <div className="relative aspect-16/9 w-full overflow-hidden bg-coolgray-100">
          <img
            src={guide.coverImage}
            alt={guide.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-navy-950/80 text-white backdrop-blur-xs shadow-xs">
              {guide.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-3 text-xs text-coolgray-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formattedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {guide.readTimeMinutes} min read
            </span>
          </div>

          <h3 className="font-serif text-lg sm:text-xl font-bold text-navy-900 group-hover:text-sky-600 transition-colors leading-snug line-clamp-2">
            <Link href={`/guides/${guide.slug}`}>
              {guide.title}
            </Link>
          </h3>

          <p className="text-sm text-coolgray-600 line-clamp-3 leading-relaxed">
            {guide.excerpt}
          </p>
        </div>
      </div>

      {/* Footer Read More Link */}
      <div className="px-5 sm:px-6 pb-5 pt-2">
        <Link
          href={`/guides/${guide.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 group-hover:text-sky-700 transition-colors"
        >
          <span>Read Full Guide</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
};

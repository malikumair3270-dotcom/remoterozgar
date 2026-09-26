import React from 'react';
import Link from 'next/link';
import { GuideListItem } from './GuideCard';
import { ArrowRight, Clock } from 'lucide-react';

interface RelatedGuidesProps {
  currentSlug: string;
  guides: GuideListItem[];
}

export const RelatedGuides: React.FC<RelatedGuidesProps> = ({ currentSlug, guides }) => {
  const related = guides.filter((g) => g.slug !== currentSlug).slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="pt-10 border-t border-coolgray-200 mt-12">
      <h3 className="font-serif text-2xl font-bold text-navy-900 mb-6">Related Career Guides</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group flex flex-col justify-between p-5 rounded-2xl border border-coolgray-200 bg-white hover:border-sky-300 hover:shadow-lg transition-all"
          >
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-50 text-sky-700 mb-2">
                {guide.category}
              </span>
              <h4 className="font-serif font-bold text-base text-navy-900 group-hover:text-sky-600 transition-colors line-clamp-2 leading-snug">
                {guide.title}
              </h4>
              <p className="text-xs text-coolgray-500 mt-2 line-clamp-2">
                {guide.excerpt}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-coolgray-400 mt-4 pt-3 border-t border-coolgray-100">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {guide.readTimeMinutes} min
              </span>
              <span className="text-sky-600 font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center">
                Read <ArrowRight className="w-3 h-3 ml-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

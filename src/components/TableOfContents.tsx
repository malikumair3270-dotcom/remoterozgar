'use client';

import React from 'react';
import { ListOrdered } from 'lucide-react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  // Extract h2 and h3 markdown headings
  const headings: TocItem[] = React.useMemo(() => {
    const lines = content.split('\n');
    const items: TocItem[] = [];

    for (const line of lines) {
      const h2Match = line.match(/^##\s+(.+)$/);
      if (h2Match) {
        const text = h2Match[1].trim();
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
        items.push({ id, text, level: 2 });
        continue;
      }

      const h3Match = line.match(/^###\s+(.+)$/);
      if (h3Match) {
        const text = h3Match[1].trim();
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
        items.push({ id, text, level: 3 });
      }
    }

    return items;
  }, [content]);

  if (headings.length === 0) return null;

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="p-5 rounded-2xl border border-coolgray-200 bg-coolgray-50/70 space-y-3">
      <div className="flex items-center gap-2 text-xs font-bold text-navy-900 uppercase tracking-wider">
        <ListOrdered className="w-4 h-4 text-sky-500" />
        <span>Table of Contents</span>
      </div>

      <ul className="space-y-1.5 text-xs text-coolgray-600">
        {headings.map((item, index) => (
          <li
            key={index}
            className={`${item.level === 3 ? 'pl-4 text-coolgray-500' : 'font-medium text-coolgray-700'}`}
          >
            <button
              type="button"
              onClick={() => scrollToHeading(item.id)}
              className="text-left hover:text-sky-600 hover:underline transition-colors line-clamp-1"
            >
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

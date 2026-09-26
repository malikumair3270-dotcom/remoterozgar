import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Simple, robust server/client markdown processor
  const renderBlocks = () => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let inTable = false;
    let tableRows: string[][] = [];

    const flushTable = (key: string) => {
      if (tableRows.length > 0) {
        const header = tableRows[0];
        const body = tableRows.slice(2); // Skip separator row

        elements.push(
          <div key={key} className="overflow-x-auto my-6 rounded-xl border border-coolgray-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-coolgray-100 text-navy-950 font-bold border-b border-coolgray-200">
                <tr>
                  {header.map((col, idx) => (
                    <th key={idx} className="p-3">
                      {col.trim()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-coolgray-200">
                {body.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-coolgray-50/50">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-3 text-coolgray-700">
                        {cell.trim()}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        tableRows = [];
      }
      inTable = false;
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();

      // Table line
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        inTable = true;
        const cols = trimmed.slice(1, -1).split('|');
        tableRows.push(cols);
        return;
      } else if (inTable) {
        flushTable(`table-${idx}`);
      }

      // Empty line
      if (!trimmed) {
        return;
      }

      // Horizontal Rule
      if (trimmed === '---' || trimmed === '***') {
        elements.push(<hr key={idx} className="my-8 border-coolgray-200" />);
        return;
      }

      // Headings
      if (trimmed.startsWith('## ')) {
        const title = trimmed.replace('## ', '');
        const id = title
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
        elements.push(
          <h2
            key={idx}
            id={id}
            className="font-serif text-2xl sm:text-3xl font-bold text-navy-900 mt-10 mb-4 scroll-mt-24"
          >
            {title}
          </h2>
        );
        return;
      }

      if (trimmed.startsWith('### ')) {
        const title = trimmed.replace('### ', '');
        const id = title
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
        elements.push(
          <h3
            key={idx}
            id={id}
            className="font-serif text-xl sm:text-2xl font-bold text-navy-900 mt-6 mb-3 scroll-mt-24"
          >
            {title}
          </h3>
        );
        return;
      }

      // Blockquotes
      if (trimmed.startsWith('> ')) {
        const quote = trimmed.replace('> ', '');
        elements.push(
          <blockquote
            key={idx}
            className="border-l-4 border-sky-500 bg-sky-50/50 p-4 rounded-r-xl my-4 text-sm italic text-navy-900 leading-relaxed"
          >
            {quote}
          </blockquote>
        );
        return;
      }

      // Unordered lists
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const itemText = trimmed.slice(2);
        elements.push(
          <li key={idx} className="ml-5 list-disc text-sm text-coolgray-700 my-1 leading-relaxed">
            {formatInlineText(itemText)}
          </li>
        );
        return;
      }

      // Ordered lists
      const olMatch = trimmed.match(/^(\d+)\.\s+(.+)$/);
      if (olMatch) {
        elements.push(
          <li key={idx} className="ml-5 list-decimal text-sm text-coolgray-700 my-1 leading-relaxed">
            {formatInlineText(olMatch[2])}
          </li>
        );
        return;
      }

      // Standard Paragraph
      elements.push(
        <p key={idx} className="text-sm sm:text-base text-coolgray-700 my-3 leading-relaxed">
          {formatInlineText(trimmed)}
        </p>
      );
    });

    if (inTable) {
      flushTable('table-end');
    }

    return elements;
  };

  return <div className="space-y-1">{renderBlocks()}</div>;
};

/**
 * Format inline bold, code, and links
 */
function formatInlineText(text: string): React.ReactNode {
  // Replace bold **text** with <strong>
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);

  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-bold text-navy-950">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="px-1.5 py-0.5 rounded bg-coolgray-100 text-sky-800 font-mono text-xs">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

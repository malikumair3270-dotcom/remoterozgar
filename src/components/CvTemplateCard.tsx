'use client';

import React, { useState } from 'react';
import { Download, Copy, Check, FileText, CheckCircle2, Eye } from 'lucide-react';

import { CvTemplate, CV_TEMPLATES } from '../lib/cv-templates-data';
export type { CvTemplate };
export { CV_TEMPLATES };

export const CvTemplateCard: React.FC<{ template: CvTemplate }> = ({ template }) => {
  const [copied, setCopied] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(template.markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([template.markdownContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${template.id}-ats-template.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col justify-between rounded-3xl border border-coolgray-200 bg-white p-6 sm:p-8 shadow-sm hover:shadow-xl hover:shadow-sky-500/5 hover:border-sky-300 transition-all">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="p-3 rounded-2xl bg-sky-50 text-sky-600">
            <FileText className="w-6 h-6" />
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            100% ATS-Compliant
          </span>
        </div>

        <h3 className="text-xl font-bold text-navy-900 mb-1">{template.name}</h3>
        <p className="text-xs font-semibold text-sky-600 mb-3">{template.targetRole}</p>
        <p className="text-sm text-coolgray-600 leading-relaxed mb-6">
          {template.description}
        </p>

        {/* Feature List */}
        <div className="space-y-2 mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-coolgray-400 block mb-2">
            Why this template wins interviews:
          </span>
          {template.features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-coolgray-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5 pt-4 border-t border-coolgray-100">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-navy-900 hover:bg-sky-600 shadow-sm transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .MD</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-coolgray-700 bg-coolgray-100 hover:bg-coolgray-200 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Text'}</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setPreviewOpen(!previewOpen)}
          className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-sky-600 hover:text-sky-700"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{previewOpen ? 'Hide Structure Preview' : 'Inspect Structure Preview'}</span>
        </button>

        {previewOpen && (
          <div className="mt-3 p-4 rounded-xl bg-coolgray-900 text-coolgray-200 font-mono text-[11px] leading-relaxed max-h-64 overflow-y-auto">
            <pre className="whitespace-pre-wrap">{template.markdownContent}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

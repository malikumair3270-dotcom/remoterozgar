import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'dark',
  size = 'md',
}) => {
  const isDark = variant === 'dark'; // Dark text on light background
  
  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl md:text-2xl',
    lg: 'text-2xl md:text-3xl',
  };

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8 md:w-9 md:h-9',
    lg: 'w-10 h-10 md:w-11 md:h-11',
  };

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 font-bold tracking-tight select-none group transition-opacity hover:opacity-90 ${className}`}
    >
      {/* Mark Icon */}
      <div
        className={`${iconSizes[size]} relative flex items-center justify-center rounded-xl bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 p-1.5 shadow-md shadow-navy-900/10 ring-1 ring-white/10`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full text-sky-400"
        >
          {/* Global network / compass mark */}
          <circle cx="12" cy="12" r="9" className="text-slate-600/60" strokeWidth="1.5" />
          <path d="M12 3a9 9 0 0 0 0 18" strokeDasharray="3 3" className="text-sky-300/40" />
          <path d="M3 12h18" strokeDasharray="2 2" className="text-sky-300/30" />
          {/* Signal / Rozgar ray */}
          <path
            d="m8 15 4-4 4 4"
            className="text-emerald-400"
            strokeWidth="2.5"
          />
          <path
            d="M12 11V7"
            className="text-emerald-400"
            strokeWidth="2.5"
          />
        </svg>
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-navy-900 animate-pulse" />
      </div>

      {/* Brand Text */}
      <div className="flex flex-col leading-none">
        <span className={`${textSizes[size]} font-extrabold tracking-tight ${isDark ? 'text-navy-900' : 'text-white'}`}>
          Remote<span className="text-sky-500 group-hover:text-sky-400 transition-colors">Rozgar</span>
        </span>
        <span className={`text-[10px] uppercase tracking-wider font-semibold ${isDark ? 'text-coolgray-500' : 'text-coolgray-400'}`}>
          Global Jobs • PK Talent
        </span>
      </div>
    </Link>
  );
};

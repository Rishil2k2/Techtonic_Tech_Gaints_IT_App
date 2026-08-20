import React from 'react';
import { OpportunityStatus, SystemOutcome, RiskLevel } from '../../types';

interface StatusBadgeProps {
  status: OpportunityStatus | SystemOutcome | RiskLevel | string;
  size?: 'sm' | 'md' | 'lg';
  showDot?: boolean;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  size = 'md', 
  showDot = true,
  className = '' 
}) => {
  const normalized = status?.toUpperCase() || 'UNKNOWN';

  let bg = 'bg-slate-100 text-slate-700 border-slate-200';
  let dotColor = 'bg-slate-500';

  if (normalized === 'ACT NOW' || normalized === 'ACT') {
    bg = 'bg-blue-50 text-blue-700 border-blue-200 font-semibold';
    dotColor = 'bg-blue-600 animate-pulse';
  } else if (normalized === 'WATCH') {
    bg = 'bg-amber-50 text-amber-700 border-amber-200 font-medium';
    dotColor = 'bg-amber-500';
  } else if (normalized === 'IGNORE') {
    bg = 'bg-slate-100 text-slate-600 border-slate-200 font-medium';
    dotColor = 'bg-slate-400';
  } else if (normalized === 'ESCALATE' || normalized === 'BLOCKED' || normalized === 'HIGH' || normalized === 'FAIL') {
    bg = 'bg-red-50 text-red-700 border-red-200 font-semibold';
    dotColor = 'bg-red-500 animate-pulse';
  } else if (normalized === 'APPROVED' || normalized === 'READY' || normalized === 'ACTIVATED' || normalized === 'PASS') {
    bg = 'bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold';
    dotColor = 'bg-emerald-500';
  } else if (normalized === 'IN PROGRESS' || normalized === 'ACTIVE' || normalized === 'AI PROCESSING') {
    bg = 'bg-cyan-50 text-cyan-800 border-cyan-200 font-medium';
    dotColor = 'bg-cyan-500 animate-ping';
  } else if (normalized === 'LOW') {
    bg = 'bg-emerald-50 text-emerald-700 border-emerald-200 font-medium';
    dotColor = 'bg-emerald-500';
  } else if (normalized === 'MEDIUM') {
    bg = 'bg-amber-50 text-amber-700 border-amber-200 font-medium';
    dotColor = 'bg-amber-500';
  } else if (normalized === 'REVIEW_REQUIRED' || normalized === 'WARNING') {
    bg = 'bg-orange-50 text-orange-700 border-orange-200 font-semibold';
    dotColor = 'bg-orange-500 animate-pulse';
  }

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5',
    lg: 'px-3 py-1.5 text-sm gap-2'
  }[size];

  return (
    <span 
      id={`status-badge-${normalized.toLowerCase().replace(/\s+/g, '-')}`}
      className={`inline-flex items-center rounded-full border whitespace-nowrap leading-none ${sizeClasses} ${bg} ${className}`}
    >
      {showDot && (
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} />
      )}
      <span>{status}</span>
    </span>
  );
};

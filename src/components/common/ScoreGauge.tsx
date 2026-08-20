import React from 'react';
import { ScoreBreakdown } from '../../types';

interface ScoreGaugeProps {
  score: ScoreBreakdown | number;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showDimensions?: boolean;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ 
  score, 
  size = 'md',
  showDimensions = false 
}) => {
  const numericScore = typeof score === 'number' ? score : score.overall;
  
  let scoreColor = 'text-blue-600 border-blue-500';
  let badgeBg = 'bg-blue-50 text-blue-700';

  if (numericScore >= 80) {
    scoreColor = 'text-blue-600 border-blue-600';
    badgeBg = 'bg-blue-50 text-blue-700';
  } else if (numericScore >= 65) {
    scoreColor = 'text-amber-600 border-amber-500';
    badgeBg = 'bg-amber-50 text-amber-700';
  } else {
    scoreColor = 'text-slate-500 border-slate-400';
    badgeBg = 'bg-slate-50 text-slate-600';
  }

  const dimensions = typeof score === 'object' ? [
    { label: 'Brand Fit', value: score.brandFit, max: 100 },
    { label: 'Consumer Relevance', value: score.consumerRelevance, max: 100 },
    { label: 'Cultural Relevance', value: score.culturalRelevance, max: 100 },
    { label: 'Velocity', value: score.velocity, max: 100 },
    { label: 'Commercial Potential', value: score.commercialPotential, max: 100 },
    { label: 'Execution Feasibility', value: score.executionFeasibility, max: 100 },
  ] : [];

  if (size === 'hero') {
    return (
      <div id="hero-score-gauge" className="bg-white rounded-xl border border-[#DCE6F2] p-5 shadow-xs">
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#DCE6F2]">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#5B6B7A] font-semibold">Opportunity Score</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-4xl font-bold text-[#0B1F3A] tracking-tight">{numericScore}</span>
              <span className="text-lg text-[#5B6B7A] font-medium">/ 100</span>
            </div>
          </div>
          <div className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider border ${badgeBg}`}>
            {numericScore >= 85 ? 'High Momentum' : numericScore >= 65 ? 'Moderate' : 'Low Resonance'}
          </div>
        </div>

        {showDimensions && dimensions.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
            {dimensions.map((dim, idx) => (
              <div key={idx} className="bg-[#F5F9FF] rounded-lg p-2.5 border border-[#DCE6F2]/60">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[#5B6B7A] font-medium truncate">{dim.label}</span>
                  <span className="font-semibold text-[#0B1F3A]">{dim.value}</span>
                </div>
                <div className="w-full bg-[#DCE6F2] h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#1769E0] h-full rounded-full transition-all duration-500" 
                    style={{ width: `${dim.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (size === 'lg') {
    return (
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#F5F9FF] border-2 border-[#1769E0]">
          <span className="text-lg font-bold text-[#0B1F3A]">{numericScore}</span>
        </div>
        <div>
          <div className="text-xs font-medium text-[#5B6B7A]">Score</div>
          <div className="text-sm font-semibold text-[#0B1F3A]">{numericScore >= 80 ? 'High Priority' : 'Tracked'}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F5F9FF] border border-[#DCE6F2]">
      <span className="text-xs font-semibold text-[#5B6B7A]">Score</span>
      <span className={`text-sm font-bold ${scoreColor.split(' ')[0]}`}>{numericScore}</span>
    </div>
  );
};

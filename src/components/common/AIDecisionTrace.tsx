import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';

interface AIDecisionTraceProps {
  evidenceConsidered: string[];
  decisionLogic: string;
  defaultExpanded?: boolean;
  className?: string;
}

export const AIDecisionTrace: React.FC<AIDecisionTraceProps> = ({
  evidenceConsidered,
  decisionLogic,
  defaultExpanded = false,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div id="ai-decision-trace-panel" className={`border border-[#DCE6F2] rounded-xl overflow-hidden bg-white ${className}`}>
      <button
        type="button"
        id="toggle-ai-decision-trace"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-[#F5F9FF] hover:bg-[#EBF3FF] transition-colors text-left"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#1769E0]/10 flex items-center justify-center text-[#1769E0]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-semibold text-[#0B1F3A]">Why did NEXT recommend this?</div>
            <div className="text-xs text-[#5B6B7A]">Deterministic synthesis of velocity, brand fit, and governance risk</div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-[#1769E0]">
          <span>{isExpanded ? 'Collapse Trace' : 'View Decision Trace'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isExpanded && (
        <div className="p-5 border-t border-[#DCE6F2] space-y-4 text-xs">
          <div>
            <div className="text-[11px] uppercase tracking-wider font-semibold text-[#5B6B7A] mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1769E0]" />
              Evidence Considered
            </div>
            <ul className="space-y-1.5 pl-1">
              {(evidenceConsidered || []).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[#0B1F3A]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1769E0] mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-3 border-t border-[#DCE6F2]/60">
            <div className="text-[11px] uppercase tracking-wider font-semibold text-[#5B6B7A] mb-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
              Decision Logic
            </div>
            <p className="text-xs text-[#0B1F3A] bg-[#F5F9FF] p-3 rounded-lg border border-[#DCE6F2] leading-relaxed">
              {decisionLogic}
            </p>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#5B6B7A] pt-1">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> Auto-evaluated by NEXT Opportunity Engine v2.4
            </span>
            <span className="text-[#1769E0] font-medium">Enterprise Deterministic Reasoning</span>
          </div>
        </div>
      )}
    </div>
  );
};

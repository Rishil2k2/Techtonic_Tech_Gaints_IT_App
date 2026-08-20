import React from 'react';
import { 
  GitMerge, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight, 
  User, 
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';

export const WorkflowsManager: React.FC = () => {
  const { workflows, selectOpportunity, setActiveModule } = useApp();

  return (
    <div id="workflows-manager-module" className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0B1F3A] tracking-tight">
            Brand Execution Workflows
          </h1>
          <p className="text-xs sm:text-sm text-[#5B6B7A] mt-0.5">
            Orchestration tracker coordinating cross-functional handoffs, brand manager gates, and SLA countdowns.
          </p>
        </div>

        <span className="text-[11px] px-3 py-1 bg-blue-50 text-[#1769E0] border border-blue-200 rounded-lg font-semibold self-start sm:self-auto">
          Autonomous SLA Monitor
        </span>
      </div>

      {/* Summary KPI Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#DCE6F2] shadow-xs">
          <span className="text-xs font-semibold text-[#5B6B7A]">Total Active</span>
          <div className="text-2xl font-extrabold text-[#0B1F3A] mt-1">4</div>
          <span className="text-[10px] text-[#1769E0] font-semibold">Across 3 Brands</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#DCE6F2] shadow-xs">
          <span className="text-xs font-semibold text-[#5B6B7A]">Pending Human Gates</span>
          <div className="text-2xl font-extrabold text-amber-600 mt-1">1</div>
          <span className="text-[10px] text-amber-700 font-semibold">Aarav Mehta (Brand Manager)</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#DCE6F2] shadow-xs">
          <span className="text-xs font-semibold text-[#5B6B7A]">SLA Health</span>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">100%</div>
          <span className="text-[10px] text-emerald-700 font-semibold">Zero Breaches Recorded</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#DCE6F2] shadow-xs">
          <span className="text-xs font-semibold text-[#5B6B7A]">Avg Handoff Speed</span>
          <div className="text-2xl font-extrabold text-[#1769E0] mt-1">2.4 min</div>
          <span className="text-[10px] text-slate-500 font-semibold">vs 18 hrs legacy</span>
        </div>
      </div>

      {/* Workflows List */}
      <div className="space-y-4">
        {workflows.map(wf => (
          <div
            key={wf.id}
            id={`workflow-card-${wf.id}`}
            className="bg-white rounded-2xl border border-[#DCE6F2] p-6 shadow-xs hover:border-[#1769E0]/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-[#1769E0] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                  {wf.brand}
                </span>
                <span className="text-xs text-[#5B6B7A] font-medium">{wf.market}</span>
                <span className="text-slate-300">•</span>
                <StatusBadge status={wf.status} size="sm" />
              </div>

              <div>
                <h3 className="font-extrabold text-base text-[#0B1F3A]">
                  {wf.title}
                </h3>
                <div className="flex items-center gap-4 text-xs text-[#5B6B7A] mt-1">
                  <span>Current Stage: <strong className="text-[#0B1F3A] uppercase">{wf.currentStage}</strong></span>
                  <span>Owner: <strong className="text-[#0B1F3A]">{wf.owner}</strong></span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1 max-w-md">
                <div className="flex justify-between text-[11px] text-[#5B6B7A]">
                  <span>Stage Progression</span>
                  <span className="font-bold text-[#0B1F3A]">{wf.progressPercent}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
                  <div 
                    className="bg-[#1769E0] h-full rounded-full transition-all duration-500" 
                    style={{ width: `${wf.progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Next Action & SLA countdown */}
            <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-between gap-4 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-[#DCE6F2]">
              <div className="text-left md:text-right space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#5B6B7A] block">Next Action Directive</span>
                <span className="text-xs font-bold text-[#0B1F3A] block">{wf.nextAction}</span>
                <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-mono font-bold">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>SLA: {wf.slaRemaining}</span>
                </div>
              </div>

              <button
                type="button"
                id={`resume-workflow-${wf.id}-btn`}
                onClick={() => {
                  selectOpportunity(wf.opportunityId);
                  setActiveModule('opportunities');
                }}
                className="px-4 py-2 bg-[#1769E0] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span>Resume Workflow</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import React from 'react';
import { WorkflowStage } from '../../types';
import { Check, CircleDot, Circle } from 'lucide-react';

interface WorkflowTrackerProps {
  currentStage: WorkflowStage;
  onSelectStage?: (stage: WorkflowStage) => void;
  className?: string;
}

const STAGES: { id: WorkflowStage; label: string }[] = [
  { id: 'signal', label: 'Signal' },
  { id: 'insight', label: 'Insight' },
  { id: 'opportunity', label: 'Opportunity' },
  { id: 'strategy', label: 'Strategy' },
  { id: 'creative', label: 'Creative' },
  { id: 'governance', label: 'Governance' },
  { id: 'localization', label: 'Localization' },
  { id: 'activation', label: 'Activation' },
  { id: 'learning', label: 'Learning' }
];

export const WorkflowTracker: React.FC<WorkflowTrackerProps> = ({
  currentStage,
  onSelectStage,
  className = ''
}) => {
  const currentIndex = STAGES.findIndex(s => s.id === currentStage);

  return (
    <div id="workflow-tracker" className={`w-full overflow-x-auto py-2 ${className}`}>
      <div className="flex items-center justify-between min-w-[720px] bg-white border border-[#DCE6F2] rounded-xl px-4 py-3 shadow-xs">
        {STAGES.map((stage, idx) => {
          const isCompleted = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          const isUpcoming = idx > currentIndex;

          return (
            <React.Fragment key={stage.id}>
              <button
                type="button"
                id={`workflow-step-${stage.id}`}
                onClick={() => onSelectStage && (isCompleted || isCurrent) && onSelectStage(stage.id)}
                disabled={!onSelectStage || isUpcoming}
                className={`flex items-center gap-2 group text-left transition-all ${
                  isCompleted || isCurrent ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all ${
                    isCompleted
                      ? 'bg-emerald-500 text-white font-bold'
                      : isCurrent
                      ? 'bg-[#1769E0] text-white ring-4 ring-[#1769E0]/15 font-bold animate-pulse'
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  ) : isCurrent ? (
                    <CircleDot className="w-3.5 h-3.5 stroke-[2.5]" />
                  ) : (
                    <Circle className="w-3 h-3" />
                  )}
                </div>

                <div className="flex flex-col">
                  <span
                    className={`text-xs whitespace-nowrap font-medium transition-colors ${
                      isCurrent
                        ? 'text-[#1769E0] font-semibold'
                        : isCompleted
                        ? 'text-[#0B1F3A]'
                        : 'text-[#5B6B7A]'
                    }`}
                  >
                    {stage.label}
                  </span>
                  <span className="text-[10px] text-[#5B6B7A] leading-tight">
                    {isCompleted ? 'Done' : isCurrent ? 'In Progress' : 'Pending'}
                  </span>
                </div>
              </button>

              {idx < STAGES.length - 1 && (
                <div className="flex-1 mx-2 h-0.5 min-w-4 bg-slate-200 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      idx < currentIndex ? 'bg-emerald-500' : 'bg-transparent'
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

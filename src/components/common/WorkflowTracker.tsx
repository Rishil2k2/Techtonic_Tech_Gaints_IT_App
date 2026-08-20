import React from 'react';
import { WorkflowStage } from '../../types';
import { Check, CircleDot, Circle, Ban, RotateCcw } from 'lucide-react';

interface WorkflowTrackerProps {
  currentStage: WorkflowStage;
  canceledStages?: WorkflowStage[];
  onSelectStage?: (stage: WorkflowStage) => void;
  onRetraceStage?: (stage: WorkflowStage) => void;
  className?: string;
}

const STAGES: { id: WorkflowStage; label: string; num: number }[] = [
  { id: 'signal', label: 'Signal', num: 1 },
  { id: 'insight', label: 'Insight', num: 2 },
  { id: 'opportunity', label: 'Decision', num: 3 },
  { id: 'strategy', label: 'Strategy', num: 4 },
  { id: 'creative', label: 'Creative', num: 5 },
  { id: 'governance', label: 'Governance', num: 6 },
  { id: 'localization', label: 'Localization', num: 7 },
  { id: 'activation', label: 'Activation', num: 8 },
  { id: 'learning', label: 'Learning', num: 9 }
];

export const WorkflowTracker: React.FC<WorkflowTrackerProps> = ({
  currentStage,
  canceledStages = [],
  onSelectStage,
  onRetraceStage,
  className = ''
}) => {
  const currentIndex = STAGES.findIndex(s => s.id === currentStage);

  return (
    <div id="workflow-tracker" className={`w-full overflow-x-auto py-2 ${className}`}>
      <div className="flex items-center justify-between min-w-[760px] bg-white border border-[#DCE6F2] rounded-xl px-4 py-3 shadow-xs">
        {STAGES.map((stage, idx) => {
          const isCompleted = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          const isUpcoming = idx > currentIndex;
          const isCanceled = canceledStages.includes(stage.id);

          return (
            <React.Fragment key={stage.id}>
              <div className="flex items-center gap-1.5 group relative">
                <button
                  type="button"
                  id={`workflow-step-${stage.id}`}
                  onClick={() => onSelectStage && onSelectStage(stage.id)}
                  className="flex items-center gap-2 text-left cursor-pointer transition-all hover:opacity-90"
                  title={`View Stage ${stage.num}: ${stage.label}`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all ${
                      isCanceled
                        ? 'bg-rose-600 text-white font-bold ring-2 ring-rose-200'
                        : isCompleted
                        ? 'bg-emerald-500 text-white font-bold'
                        : isCurrent
                        ? 'bg-[#1769E0] text-white ring-4 ring-[#1769E0]/15 font-bold animate-pulse'
                        : 'bg-slate-100 text-slate-400 border border-slate-200'
                    }`}
                  >
                    {isCanceled ? (
                      <Ban className="w-3.5 h-3.5 stroke-[2.5]" />
                    ) : isCompleted ? (
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
                        isCanceled
                          ? 'text-rose-700 font-bold line-through'
                          : isCurrent
                          ? 'text-[#1769E0] font-semibold'
                          : isCompleted
                          ? 'text-[#0B1F3A]'
                          : 'text-[#5B6B7A]'
                      }`}
                    >
                      {stage.label}
                    </span>
                    <span className={`text-[10px] leading-tight ${isCanceled ? 'text-rose-600 font-semibold' : 'text-[#5B6B7A]'}`}>
                      {isCanceled ? 'Canceled' : isCompleted ? 'Done' : isCurrent ? 'In Progress' : 'Pending'}
                    </span>
                  </div>
                </button>

                {/* Quick Retrace icon button for past completed stages */}
                {isCompleted && onRetraceStage && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRetraceStage(stage.id);
                    }}
                    title={`Retrace pipeline back to ${stage.label}`}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-blue-50 text-[#1769E0] transition-opacity cursor-pointer text-[10px]"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                )}
              </div>

              {idx < STAGES.length - 1 && (
                <div className="flex-1 mx-2 h-0.5 min-w-3 bg-slate-200 overflow-hidden">
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

import React from 'react';
import { 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Play, 
  CheckCircle2,
  Zap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DemoWalkthroughOverlay: React.FC = () => {
  const { 
    isDemoActive, 
    demoStepIndex, 
    demoSteps, 
    nextDemoStep, 
    prevDemoStep, 
    stopDemo 
  } = useApp();

  if (!isDemoActive) return null;

  const currentStep = demoSteps[demoStepIndex];
  const progressPercent = ((demoStepIndex + 1) / demoSteps.length) * 100;

  return (
    <div 
      id="demo-walkthrough-floating-banner" 
      className="fixed bottom-6 right-6 left-6 md:left-auto md:w-[480px] z-50 bg-[#0B1F3A] text-white rounded-2xl border-2 border-cyan-400 shadow-2xl p-5 space-y-3 animate-in slide-in-from-bottom-5 duration-300"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-cyan-400 text-[#0B1F3A] flex items-center justify-center font-bold text-xs">
            <Zap className="w-3.5 h-3.5 fill-current" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
            Interactive Walkthrough ({demoStepIndex + 1} of {demoSteps.length})
          </span>
        </div>

        <button
          type="button"
          onClick={stopDemo}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          title="Exit Guided Demo"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
        <div 
          className="bg-gradient-to-r from-cyan-400 to-[#1769E0] h-full rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Step Content */}
      <div className="space-y-1">
        <h4 className="text-sm font-extrabold text-white">
          {currentStep.title}
        </h4>
        <p className="text-xs text-slate-300 leading-relaxed">
          {currentStep.description}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-700/80">
        <button
          type="button"
          disabled={demoStepIndex === 0}
          onClick={prevDemoStep}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
            demoStepIndex === 0
              ? 'opacity-40 cursor-not-allowed text-slate-400'
              : 'text-slate-200 hover:bg-white/10 cursor-pointer'
          }`}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={nextDemoStep}
          className="px-4 py-2 bg-gradient-to-r from-[#1769E0] to-cyan-500 hover:from-blue-600 hover:to-cyan-400 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
        >
          <span>{demoStepIndex === demoSteps.length - 1 ? 'Finish Guided Walkthrough' : 'Next Step'}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Play, 
  Pause,
  RotateCcw,
  FastForward,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Globe2,
  TrendingUp,
  Radio,
  Target,
  Compass,
  Palette,
  Cpu,
  Layers,
  BarChart3,
  ThumbsUp,
  Share2,
  Clock,
  ArrowRight,
  Zap,
  Info,
  Check,
  Eye,
  Sliders
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';

// Presenter Notes for each stage
const PRESENTER_NOTES: Record<number, string> = {
  1: "Presenter Note: NEXT actively listens to live cultural telemetry rather than waiting for static quarterly briefs.",
  2: "Presenter Note: The Insight Agent contextualizes 'what is happening' into 'what it means' for consumer behavior and brand equity.",
  3: "Presenter Note: NEXT calculates a multi-dimensional opportunity score (0-100) to decide whether to act before writing a single line of copy.",
  4: "Presenter Note: Critical human-in-the-loop control point. The brand manager retains full authority to approve, modify, or reject.",
  5: "Presenter Note: Strategy Agent converts approved opportunity into strategic intent, channel blueprint, and key message in seconds.",
  6: "Presenter Note: Context is carried forward automatically across nodes—eliminating manual brief re-entry.",
  7: "Presenter Note: Creative Orchestrator generates multi-format concepts tailored to channel mechanics and strategic territories.",
  8: "Presenter Note: Real enterprise governance scanning brand tone, substantiated claims, and legal/cultural compliance.",
  9: "Presenter Note: Core enterprise principle: Localize expression, not strategy. Preserves global brand integrity while adapting nuance.",
  10: "Presenter Note: Market leads review and approve local expressions with one-click approval workflows.",
  11: "Presenter Note: Automated packaging validates all governance checks and approvals before firing live activation.",
  12: "Presenter Note: Post-activation telemetry captures real-time social velocity, sentiment lift, and commercial conversion.",
  13: "Presenter Note: Closing the loop. Empirical campaign learnings dynamically update future AI scoring weights.",
  14: "Presenter Note: AI accelerated the nodes. NEXT orchestrated the handoffs."
};

const STAGES_NAV = [
  { step: 1, label: '1 Signal', stageKey: 'signal' },
  { step: 2, label: '2 Insight', stageKey: 'insight' },
  { step: 3, label: '3 Decide', stageKey: 'opportunity' },
  { step: 5, label: '4 Strategize', stageKey: 'strategy' },
  { step: 7, label: '5 Create', stageKey: 'creative' },
  { step: 8, label: '6 Govern', stageKey: 'governance' },
  { step: 9, label: '7 Localize', stageKey: 'localization' },
  { step: 11, label: '8 Activate', stageKey: 'activation' },
  { step: 13, label: '9 Learn', stageKey: 'learning' }
];

export const DemoWalkthroughOverlay: React.FC = () => {
  const { 
    demoMode, 
    demoStep, 
    demoScenario,
    isPresenterMode,
    isDemoPlaying,
    setDemoStep,
    setDemoScenario,
    togglePresenterMode,
    setIsDemoPlaying,
    nextDemoStep, 
    prevDemoStep, 
    skipDemoStep,
    restartDemo,
    exitDemo,
    opportunities,
    approveOpportunityDecision,
    approveStrategy,
    approveBrief,
    selectCreativeConcept,
    approveGovernance,
    approveMarketLocalization,
    activateCampaign,
    applyLearningsToFuture,
    openIngestModal
  } = useApp();

  // Local interaction states within demo
  const [analyzingChecklist, setAnalyzingChecklist] = useState<number>(0);
  const [animatedScore, setAnimatedScore] = useState<number>(0);
  const [selectedCreativeTab, setSelectedCreativeTab] = useState<string>('concept-1');
  const [isActivatingAnimation, setIsActivatingAnimation] = useState<boolean>(false);
  const [selectedMarketTab, setSelectedMarketTab] = useState<'india' | 'brazil' | 'uk'>('india');
  const [approvedMarketsMap, setApprovedMarketsMap] = useState<Record<string, boolean>>({
    india: true,
    brazil: true,
    uk: true
  });
  const [learningAppliedNotice, setLearningAppliedNotice] = useState<boolean>(false);

  // Active opportunity object
  const currentOpp = opportunities.find(o => o.id === demoScenario) || opportunities[0];

  // Auto-play timer for demo
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isDemoPlaying && demoMode) {
      // Don't auto-advance at human decision gates (step 4, step 7, step 8, step 10, step 11)
      const isHumanGate = [4, 7, 8, 10, 11].includes(demoStep);
      if (!isHumanGate && demoStep < 14) {
        timer = setTimeout(() => {
          setDemoStep(prev => Math.min(prev + 1, 14));
        }, 5500);
      } else if (isHumanGate) {
        setIsDemoPlaying(false);
      }
    }
    return () => clearTimeout(timer);
  }, [isDemoPlaying, demoStep, demoMode, setDemoStep, setIsDemoPlaying]);

  // Checklist animation for Step 1
  useEffect(() => {
    if (demoStep === 1) {
      setAnalyzingChecklist(0);
      const t1 = setTimeout(() => setAnalyzingChecklist(1), 400);
      const t2 = setTimeout(() => setAnalyzingChecklist(2), 800);
      const t3 = setTimeout(() => setAnalyzingChecklist(3), 1200);
      const t4 = setTimeout(() => setAnalyzingChecklist(4), 1600);
      const t5 = setTimeout(() => setAnalyzingChecklist(5), 2000);
      return () => {
        clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5);
      };
    }
  }, [demoStep]);

  // Score count-up animation for Step 3
  useEffect(() => {
    if (demoStep === 3) {
      setAnimatedScore(0);
      const steps = [0, 24, 47, 68, 82, 91];
      steps.forEach((val, idx) => {
        setTimeout(() => {
          setAnimatedScore(val);
        }, idx * 250);
      });
    }
  }, [demoStep]);

  // Confetti on Activation (Step 11) and Final Screen (Step 14)
  useEffect(() => {
    if (demoStep === 11 || demoStep === 14) {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.log(e);
      }
    }
  }, [demoStep]);

  if (!demoMode) return null;

  // Handlers that trigger real application mutations
  const handleApproveOpportunity = () => {
    approveOpportunityDecision(currentOpp.id, 'Approved via Live Demo simulation gate.');
    nextDemoStep();
  };

  const handleApproveStrategy = () => {
    approveStrategy(currentOpp.id);
    nextDemoStep();
  };

  const handleApproveBrief = () => {
    approveBrief(currentOpp.id);
    nextDemoStep();
  };

  const handleSelectCreative = (conceptId: string) => {
    selectCreativeConcept(currentOpp.id, conceptId);
    setSelectedCreativeTab(conceptId);
    nextDemoStep();
  };

  const handleApproveGovernance = () => {
    approveGovernance(currentOpp.id, 'Governance audit confirmed. Passed compliance.');
    nextDemoStep();
  };

  const handleApproveMarket = (marketId: 'india' | 'brazil' | 'uk') => {
    approveMarketLocalization(currentOpp.id, marketId);
    setApprovedMarketsMap(prev => ({ ...prev, [marketId]: true }));
  };

  const handleApproveAllMarkets = () => {
    ['india', 'brazil', 'uk'].forEach(m => approveMarketLocalization(currentOpp.id, m));
    setApprovedMarketsMap({ india: true, brazil: true, uk: true });
    nextDemoStep();
  };

  const handleActivateCampaign = () => {
    setIsActivatingAnimation(true);
    setTimeout(() => {
      activateCampaign(currentOpp.id);
      setIsActivatingAnimation(false);
      nextDemoStep();
    }, 1800);
  };

  const handleApplyLearning = () => {
    applyLearningsToFuture(currentOpp.id);
    setLearningAppliedNotice(true);
    setTimeout(() => {
      setLearningAppliedNotice(false);
      nextDemoStep();
    }, 1500);
  };

  return (
    <div 
      id="project-next-interactive-demo-overlay"
      className="fixed inset-0 z-50 bg-[#071326]/95 backdrop-blur-md flex flex-col text-white font-sans overflow-hidden animate-in fade-in duration-200 select-none"
    >
      {/* ========================================================================= */}
      {/* TOP BAR: BRAND IDENTITY, SCENARIO PICKER & GLOBAL WORKSPACE CONTROLS */}
      {/* ========================================================================= */}
      <header className="h-16 border-b border-slate-700/70 bg-[#0B1F3A]/90 px-4 sm:px-6 flex items-center justify-between gap-4 shrink-0">
        {/* Left: Brand Identity & Scenario */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-[#1769E0] flex items-center justify-center shadow-md shadow-cyan-500/20 text-[#0B1F3A] font-black text-sm">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-cyan-300">
                PROJECT NEXT — LIVE PRODUCT DEMO
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-cyan-950/80 text-cyan-300 font-semibold border border-cyan-500/30">
                Interactive Journey
              </span>
            </div>
            {/* Scenario Selector Dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-slate-300">
              <span className="font-semibold text-white">Scenario:</span>
              <select
                id="demo-scenario-select"
                value={demoScenario}
                onChange={(e) => setDemoScenario(e.target.value)}
                className="bg-[#112F56] border border-slate-600 rounded px-2 py-0.5 text-xs text-cyan-200 font-medium focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                <option value="opp-rexona-referee">Rexona | India (Football Referee Moment - Hero)</option>
                <option value="opp-vaseline-hack">Vaseline | UK (Slugging Hack Risk Containment)</option>
                <option value="opp-surf-excel-cricket">Surf Excel | India (Muddy Cricket Catch)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Center: Stage Progress Pipeline */}
        <div className="hidden xl:flex items-center gap-1.5 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800">
          {STAGES_NAV.map((s, idx) => {
            const isActive = demoStep >= s.step && (idx === STAGES_NAV.length - 1 || demoStep < STAGES_NAV[idx + 1].step);
            const isCompleted = idx < STAGES_NAV.length - 1 && demoStep >= STAGES_NAV[idx + 1].step;
            return (
              <button
                key={s.step}
                type="button"
                onClick={() => setDemoStep(s.step)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#1769E0] to-cyan-500 text-white shadow-xs' 
                    : isCompleted
                    ? 'text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {isCompleted && <Check className="w-3 h-3 text-cyan-400 stroke-[3]" />}
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Controls (Play, Pause, Skip, Restart, Presenter Mode, Exit) */}
        <div className="flex items-center gap-2">
          {/* Presenter Mode Toggle */}
          <button
            type="button"
            id="demo-presenter-mode-toggle"
            onClick={togglePresenterMode}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
              isPresenterMode
                ? 'bg-amber-400/20 border-amber-400/40 text-amber-300'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
            title="Toggle presenter notes for executive presentation"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Presenter Notes</span>
            <span className={`w-1.5 h-1.5 rounded-full ${isPresenterMode ? 'bg-amber-400 animate-pulse' : 'bg-slate-500'}`} />
          </button>

          {/* Auto-Play / Pause */}
          <button
            type="button"
            id="demo-play-pause-btn"
            onClick={() => setIsDemoPlaying(prev => !prev)}
            className={`p-1.5 rounded-lg border text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
              isDemoPlaying
                ? 'bg-emerald-500 text-white border-emerald-400 shadow-xs'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
            title={isDemoPlaying ? 'Pause automatic progression' : 'Play automatic progression'}
          >
            {isDemoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          </button>

          {/* Restart */}
          <button
            type="button"
            id="demo-restart-btn"
            onClick={restartDemo}
            className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-all cursor-pointer"
            title="Restart demo from Step 1"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Exit */}
          <button
            type="button"
            id="demo-exit-btn"
            onClick={exitDemo}
            className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:bg-rose-900/40 transition-all cursor-pointer"
            title="Exit Demo to Live Workspace"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* SUB-HEADER: PRESENTER NOTES (OPTIONAL) & STAGE BREADCRUMBS */}
      {/* ========================================================================= */}
      <div className="bg-[#0B1F3A] border-b border-slate-800 px-6 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2 py-0.5 rounded-full bg-blue-900/60 text-cyan-300 font-bold border border-blue-700/50">
            Step {demoStep} of 14
          </span>
          <span className="text-slate-400">•</span>
          <span className="font-semibold text-slate-200">
            {demoStep === 1 && "Live Signal Ingestion & Anomaly Detection"}
            {demoStep === 2 && "Consumer Insight Synthesis & Cultural Tension"}
            {demoStep === 3 && "Autonomous Opportunity Scoring (0-100)"}
            {demoStep === 4 && "AI Recommendation & Human Decision Gate"}
            {demoStep === 5 && "Autonomous Strategy Formulation"}
            {demoStep === 6 && "Structured Creative Brief Generation"}
            {demoStep === 7 && "Creative Studio Orchestration"}
            {demoStep === 8 && "Automated Multi-Layer Governance Audit"}
            {demoStep === 9 && "Global-to-Local Expression Mapping"}
            {demoStep === 10 && "Multi-Market Approval & Sign-Off"}
            {demoStep === 11 && "Omnichannel Activation Packaging"}
            {demoStep === 12 && "Post-Activation Telemetry & Intelligence"}
            {demoStep === 13 && "Closed-Loop Learning & Brand Memory"}
            {demoStep === 14 && "Demo Summary: Signal to Action Complete"}
          </span>
        </div>

        {/* Presenter Note Banner if enabled */}
        {isPresenterMode && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-950/60 border border-amber-500/40 text-amber-200 text-xs font-medium animate-in fade-in">
            <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{PRESENTER_NOTES[demoStep] || PRESENTER_NOTES[1]}</span>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MAIN STEP CANVAS: 14 INTERACTIVE STAGES */}
      {/* ========================================================================= */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-center max-w-7xl mx-auto w-full">
        {/* ----------------------------------------------------------------- */}
        {/* STEP 1: SIGNAL DETECTION */}
        {/* ----------------------------------------------------------------- */}
        {demoStep === 1 && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold">
                <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>LIVE SIGNAL DETECTED</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Football Referee Moment
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
                Brand: <strong className="text-cyan-300">{currentOpp.brand}</strong> • Market: <strong className="text-white">{currentOpp.market}</strong> • Status: <strong className="text-emerald-400">Rapidly Accelerating</strong>
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              {/* Left: Telemetry Feed */}
              <div className="lg:col-span-3 bg-[#0B1F3A] rounded-2xl p-5 border border-slate-700/80 space-y-4 flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Live Telemetry</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div className="space-y-3">
                  <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 font-medium">Social Conversation</span>
                    <div className="text-xl font-extrabold text-emerald-400 mt-0.5">↑ 342%</div>
                  </div>
                  <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 font-medium">Search Interest</span>
                    <div className="text-xl font-extrabold text-cyan-400 mt-0.5">↑ 118%</div>
                  </div>
                  <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 font-medium">Sports Conversation</span>
                    <div className="text-xl font-extrabold text-blue-400 mt-0.5">↑ 76%</div>
                  </div>
                  <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 font-medium">Positive Sentiment</span>
                    <div className="text-xl font-extrabold text-indigo-300 mt-0.5">76%</div>
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 font-mono text-center">
                  Listening on X, TikTok, IG & Broadcasts
                </div>
              </div>

              {/* Center: Signal Card */}
              <div className="lg:col-span-5 bg-gradient-to-br from-[#0B1F3A] to-[#112F56] rounded-2xl p-6 border-2 border-cyan-400/40 shadow-xl flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 font-bold border border-cyan-400/30">
                      Unplanned Cultural Occurrence
                    </span>
                    <span className="text-xs text-slate-400 font-mono">18m ago</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white">
                    Football Referee Moment
                  </h3>
                  <blockquote className="p-4 rounded-xl bg-slate-900/80 border-l-4 border-cyan-400 text-sm text-slate-200 italic leading-relaxed">
                    "{currentOpp.summary || "Rexona logo captured beneath referee's arm during stoppage time. Fans are sharing screenshots and turning the moment into memes."}"
                  </blockquote>
                </div>

                {/* Sample Live Evidence */}
                <div className="bg-[#071326]/80 p-3.5 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-semibold text-cyan-300">@FootyBanterHub on X</span>
                    <span>22m ago • 42.8K likes</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    "Referee checking VAR in the 95th minute under insane stadium pressure, but at least his Rexona protection is doing overtime 😭🔥"
                  </p>
                </div>

                <div className="text-xs text-cyan-200 font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>NEXT actively listens to live cultural telemetry rather than waiting for static briefs.</span>
                </div>
              </div>

              {/* Right: NEXT Signal Agent Processing */}
              <div className="lg:col-span-4 bg-[#0B1F3A] rounded-2xl p-5 border border-slate-700/80 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-cyan-400 animate-spin" />
                      <span className="text-xs font-bold uppercase tracking-wider text-white">NEXT Signal Agent</span>
                    </div>
                    <span className="text-[10px] text-cyan-300 font-mono">● Analysing</span>
                  </div>

                  <div className="space-y-2.5 mt-4">
                    {[
                      'Signal identified',
                      'Conversation clustered',
                      'Audience identified',
                      'Brand mention detected',
                      'Cultural context established'
                    ].map((stepLabel, idx) => {
                      const isDone = analyzingChecklist > idx;
                      return (
                        <div 
                          key={stepLabel}
                          className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all ${
                            isDone 
                              ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/30' 
                              : 'bg-slate-900/50 text-slate-500 border border-slate-800'
                          }`}
                        >
                          <span>{stepLabel}</span>
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-600 border-t-cyan-400 animate-spin" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-400/40 text-center">
                    <span className="text-xs font-bold text-cyan-200">✓ Signal qualified</span>
                  </div>

                  <button
                    type="button"
                    onClick={nextDemoStep}
                    className="w-full py-3 bg-gradient-to-r from-[#1769E0] to-cyan-500 hover:from-blue-600 hover:to-cyan-400 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Continue to Insight</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* STEP 2: INSIGHT GENERATION */}
        {/* ----------------------------------------------------------------- */}
        {demoStep === 2 && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="text-center space-y-1">
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <span>WHAT IS HAPPENING?</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-cyan-300 font-extrabold">WHAT DOES IT MEAN?</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Consumer Insight Synthesis
              </h2>
              <p className="text-xs text-slate-300 max-w-xl mx-auto">
                NEXT Insight Agent extracts the human tension and brand equity vector behind the viral moment.
              </p>
            </div>

            {/* Core Consumer Insight Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-900/40 via-[#0B1F3A] to-cyan-950/40 border-2 border-cyan-400/40 shadow-xl space-y-2">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-cyan-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Primary Consumer Insight</span>
              </span>
              <p className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                "{currentOpp.insight?.headline || "Consumers are organically transforming an unexpected brand appearance into participatory social content."}"
              </p>
            </div>

            {/* 4 Dimension Analysis Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#0B1F3A] rounded-2xl p-4 border border-slate-700/80 space-y-1.5">
                <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider">Consumer Behaviour</span>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {currentOpp.insight?.consumerBehaviour || "Fans are turning the moment into memes and screenshots without cynicism."}
                </p>
              </div>

              <div className="bg-[#0B1F3A] rounded-2xl p-4 border border-slate-700/80 space-y-1.5">
                <span className="text-[11px] font-bold text-blue-300 uppercase tracking-wider">Cultural Tension</span>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {currentOpp.insight?.culturalTension || "Consumers reward brands that participate naturally in cultural moments over stiff corporate ads."}
                </p>
              </div>

              <div className="bg-[#0B1F3A] rounded-2xl p-4 border border-slate-700/80 space-y-1.5">
                <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider">Brand Implication</span>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {currentOpp.insight?.brandImplication || "The moment aligns with Rexona's association with composure under supreme pressure."}
                </p>
              </div>

              <div className="bg-[#0B1F3A] rounded-2xl p-4 border border-slate-700/80 space-y-1.5">
                <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">Audience Focus</span>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {currentOpp.signal?.evidence?.targetAudienceConcentration || "18–34 sports and culture audiences on vertical video."}
                </p>
              </div>
            </div>

            {/* Evidence & Bottom Action */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <div className="text-xs text-slate-400">
                <strong className="text-slate-200">Evidence Base:</strong> 183K social mentions • 8.7M estimated reach • 76% positive sentiment
              </div>
              <button
                type="button"
                onClick={nextDemoStep}
                className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-[#1769E0] to-cyan-500 hover:from-blue-600 hover:to-cyan-400 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Evaluate Opportunity Score</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* STEP 3: OPPORTUNITY SCORING (HERO MOMENT) */}
        {/* ----------------------------------------------------------------- */}
        {demoStep === 3 && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                <Target className="w-3.5 h-3.5 text-cyan-400" />
                <span>SHOULD REXONA ACT?</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Opportunity Scoring Engine
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
                Deterministic decisioning matrix evaluates brand fit, cultural velocity, upside and risk.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Giant Hero Score Gauge */}
              <div className="lg:col-span-5 bg-gradient-to-b from-[#0B1F3A] to-[#071326] p-6 rounded-3xl border-2 border-cyan-400/50 shadow-2xl flex flex-col items-center justify-center text-center space-y-3">
                <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-300">
                  Opportunity Score
                </span>
                <div className="text-6xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-blue-400 font-mono">
                  {animatedScore} <span className="text-2xl text-slate-400 font-normal">/ 100</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/40">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>High-Priority Opportunity Tier</span>
                </div>
                <p className="text-[11px] text-slate-400 max-w-xs">
                  Prototype decision outputs generated from Unilever Brand DNA & cultural velocity telemetry.
                </p>
              </div>

              {/* Dimension Breakdown Table */}
              <div className="lg:col-span-7 bg-[#0B1F3A] rounded-3xl p-6 border border-slate-700/80 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Dimension</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Score</span>
                </div>

                <div className="space-y-2.5">
                  {[
                    { label: 'Brand Fit', score: currentOpp.score?.brandFit || 94, color: 'bg-cyan-400' },
                    { label: 'Consumer Relevance', score: currentOpp.score?.consumerRelevance || 89, color: 'bg-blue-400' },
                    { label: 'Cultural Relevance', score: currentOpp.score?.culturalRelevance || 96, color: 'bg-indigo-400' },
                    { label: 'Velocity', score: currentOpp.score?.velocity || 98, color: 'bg-emerald-400' },
                    { label: 'Commercial Potential', score: currentOpp.score?.commercialPotential || 84, color: 'bg-amber-400' },
                    { label: 'Feasibility', score: currentOpp.score?.executionFeasibility || 91, color: 'bg-teal-400' },
                    { label: 'Risk', score: 'LOW', color: 'text-emerald-400 font-bold', isText: true }
                  ].map((dim) => (
                    <div key={dim.label} className="flex items-center justify-between text-xs py-1">
                      <span className="font-semibold text-slate-300">{dim.label}</span>
                      {dim.isText ? (
                        <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold border border-emerald-500/30">
                          {dim.score}
                        </span>
                      ) : (
                        <div className="flex items-center gap-3 w-48">
                          <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${dim.color}`} style={{ width: `${dim.score}%` }} />
                          </div>
                          <span className="w-8 text-right font-mono font-bold text-white">{dim.score}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-700/60 flex justify-end">
                  <button
                    type="button"
                    onClick={nextDemoStep}
                    className="px-6 py-2.5 bg-gradient-to-r from-[#1769E0] to-cyan-500 hover:from-blue-600 hover:to-cyan-400 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View AI Recommendation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* STEP 4: AI RECOMMENDATION & HUMAN DECISION GATE (CRITICAL PAUSE) */}
        {/* ----------------------------------------------------------------- */}
        {demoStep === 4 && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300 max-w-4xl mx-auto w-full">
            <div className="text-center space-y-1">
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
                AI DECISION ENGINE
              </span>
              <div className="text-4xl sm:text-5xl font-black text-emerald-400 tracking-tight flex items-center justify-center gap-3">
                <Zap className="w-8 h-8 fill-emerald-400" />
                <span>ACT NOW</span>
              </div>
              <p className="text-sm text-slate-200 max-w-xl mx-auto font-medium mt-2">
                "High cultural velocity, strong brand alignment, strong audience relevance and low immediate risk make this a time-sensitive activation opportunity."
              </p>
            </div>

            {/* Why Now? Urgency Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-[#0B1F3A] p-4 rounded-xl border border-slate-700 text-center">
                <span className="text-[11px] text-slate-400">Opportunity Window</span>
                <div className="text-base font-bold text-cyan-300 mt-1">High (4-6 Hours)</div>
              </div>
              <div className="bg-[#0B1F3A] p-4 rounded-xl border border-slate-700 text-center">
                <span className="text-[11px] text-slate-400">Trend Velocity</span>
                <div className="text-base font-bold text-emerald-400 mt-1">Accelerating (+342%)</div>
              </div>
              <div className="bg-[#0B1F3A] p-4 rounded-xl border border-slate-700 text-center">
                <span className="text-[11px] text-slate-400">Decay Risk</span>
                <div className="text-base font-bold text-amber-300 mt-1">High If Delayed</div>
              </div>
            </div>

            {/* Human Gate Modal / Box */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0B1F3A] via-[#112F56] to-[#071326] border-2 border-amber-400/60 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-400 text-[#0B1F3A] flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white">
                      Human Decision Required
                    </h3>
                    <p className="text-xs text-slate-300">
                      Brand Manager: <strong className="text-cyan-300">Aarav Mehta</strong> • Recommended: <strong className="text-emerald-400">ACT NOW</strong>
                    </p>
                  </div>
                </div>
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30 animate-pulse">
                  Paused For Sign-Off
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                The evaluator gets to physically approve this opportunity. This demonstrates genuine human-in-the-loop decisioning rather than autonomous black-box marketing.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  id="demo-approve-opportunity-btn"
                  onClick={handleApproveOpportunity}
                  className="flex-1 py-3 px-5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Approve Opportunity</span>
                </button>

                <button
                  type="button"
                  onClick={nextDemoStep}
                  className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl border border-slate-700 transition-all cursor-pointer"
                >
                  Modify
                </button>

                <button
                  type="button"
                  onClick={nextDemoStep}
                  className="py-3 px-4 bg-slate-800 hover:bg-rose-950/50 text-rose-300 font-semibold text-xs rounded-xl border border-slate-700 transition-all cursor-pointer"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* STEP 5: STRATEGY GENERATION */}
        {/* ----------------------------------------------------------------- */}
        {demoStep === 5 && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300 max-w-4xl mx-auto w-full">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold">
                <Compass className="w-3.5 h-3.5 text-cyan-400" />
                <span>NEXT STRATEGY AGENT</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                AI Strategic Response Formulation
              </h2>
              <p className="text-xs text-slate-300">
                NEXT converted the approved moment into an actionable brand strategy in <strong>8 seconds</strong>.
              </p>
            </div>

            <div className="bg-[#0B1F3A] rounded-3xl p-6 sm:p-8 border-2 border-cyan-400/40 shadow-xl space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Objective</span>
                  <p className="text-sm font-semibold text-white">
                    {currentOpp.strategy?.objective || "Own the cultural moment without interrupting it."}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Target Audience</span>
                  <p className="text-sm font-semibold text-white">
                    {currentOpp.strategy?.audience || "18–34 sports and culture audiences across mobile video."}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Brand Role</span>
                  <p className="text-sm font-semibold text-white">
                    {currentOpp.strategy?.brandRole || "Rexona reinforces composure under pressure."}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Channels</span>
                  <p className="text-sm font-semibold text-cyan-300">
                    Instagram • TikTok • X (Twitter)
                  </p>
                </div>
              </div>

              {/* Core Message Callout */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-900/60 to-[#071326] border border-cyan-400/50 text-center space-y-1">
                <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-widest">Core Campaign Message</span>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  "Never Lose Your Cool"
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-700/60">
                <span className="text-xs text-slate-400 font-mono">
                  Strategy generated in 8 seconds (Simulated)
                </span>
                <button
                  type="button"
                  id="demo-approve-strategy-btn"
                  onClick={handleApproveStrategy}
                  className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-[#1769E0] to-cyan-500 hover:from-blue-600 hover:to-cyan-400 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Approve Strategy & Generate Brief</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* STEP 6: BRIEF CREATION */}
        {/* ----------------------------------------------------------------- */}
        {demoStep === 6 && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300 max-w-4xl mx-auto w-full">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>CREATIVE BRIEF GENERATED</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Context Carried Forward Automatically
              </h2>
              <p className="text-xs text-slate-300">
                Zero re-entry of data. The entire signal and strategy context flows directly into the brief.
              </p>
            </div>

            {/* Brief Sheet Matrix */}
            <div className="bg-[#0B1F3A] rounded-3xl p-6 sm:p-8 border border-slate-700/80 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-700/60">
                <div>
                  <span className="text-slate-400 font-bold uppercase">Context:</span>
                  <p className="text-slate-200 mt-0.5">Stoppage-time referee broadcast logo appearance.</p>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase">Consumer Insight:</span>
                  <p className="text-slate-200 mt-0.5">Fans transforming high pressure into viral social humor.</p>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase">Objective:</span>
                  <p className="text-slate-200 mt-0.5">Own the stoppage time moment without interrupting it.</p>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase">Target Audience:</span>
                  <p className="text-slate-200 mt-0.5">18–34 sports and culture audiences.</p>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase">Brand Role:</span>
                  <p className="text-slate-200 mt-0.5">Confidence and composure under pressure.</p>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase">Message:</span>
                  <p className="text-cyan-300 font-bold mt-0.5">Never Lose Your Cool.</p>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase">Creative Territory:</span>
                  <p className="text-slate-200 mt-0.5">High-Stakes Stoppage Time Composure.</p>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase">Target Markets:</span>
                  <p className="text-slate-200 mt-0.5">🇮🇳 India • 🇧🇷 Brazil • 🇬🇧 United Kingdom.</p>
                </div>
              </div>

              {/* Automatic Context Forwarding Badge */}
              <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-400/40 flex items-center gap-2 text-cyan-200 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>NEXT carried all intelligence and brand guardrails forward without human copy-pasting.</span>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  id="demo-approve-brief-btn"
                  onClick={handleApproveBrief}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#1769E0] to-cyan-500 hover:from-blue-600 hover:to-cyan-400 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Proceed to Creative Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* STEP 7: CREATIVE GENERATION & SELECTION */}
        {/* ----------------------------------------------------------------- */}
        {demoStep === 7 && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold">
                <Palette className="w-3.5 h-3.5 text-cyan-400" />
                <span>CREATIVE STUDIO ORCHESTRATOR</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Select Creative Direction
              </h2>
              <p className="text-xs text-slate-300">
                Choose the primary creative territory to route into Governance and Localization.
              </p>
            </div>

            {/* 3 Creative Concept Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  id: 'concept-1',
                  number: '01',
                  title: 'Never Lose Your Cool',
                  tone: 'Bold / Humorous',
                  headline: '95th Minute. Maximum Heat. Zero Sweat.',
                  caption: 'When 80,000 fans are yelling and VAR is checking, you stay composed. Rexona has your back (and your underarms). #NeverLoseYourCool',
                  platform: 'Instagram Reels & TikTok (9:16)',
                  rationale: 'Taps directly into viral referee gesture with self-aware meme humor.'
                },
                {
                  id: 'concept-2',
                  number: '02',
                  title: 'Pressure? Handled.',
                  tone: 'Minimal / Premium',
                  headline: 'The Toughest Calls Require The Coolest Heads.',
                  caption: 'Big decisions demand absolute freshness. Tested in the most heated arenas in sport. #PressureHandled #RexonaProtection',
                  platform: 'Instagram Carousel & X (1:1)',
                  rationale: 'High-aesthetic athletic focus emphasizing 72-hour clinical durability.'
                },
                {
                  id: 'concept-3',
                  number: '03',
                  title: 'The Moment Finds You',
                  tone: 'Culture-Led / UGC',
                  headline: 'When The Spotlight Hits, Be Ready.',
                  caption: 'You never know when stoppage time will put you on camera. Stay protected, stay confident. #RexonaMoments',
                  platform: 'YouTube Shorts & TikTok (9:16)',
                  rationale: 'Organic UGC compilation celebrating unexpected high-pressure moments.'
                }
              ].map((concept) => (
                <div 
                  key={concept.id}
                  className={`bg-[#0B1F3A] rounded-3xl p-5 border-2 transition-all flex flex-col justify-between space-y-4 ${
                    selectedCreativeTab === concept.id
                      ? 'border-cyan-400 shadow-xl shadow-cyan-500/10 ring-2 ring-cyan-400/20'
                      : 'border-slate-700/80 hover:border-slate-600'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                        Concept {concept.number}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400">
                        {concept.tone}
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-white">
                      {concept.title}
                    </h3>

                    {/* Mock Visual Frame */}
                    <div className="h-32 rounded-xl bg-gradient-to-br from-slate-900 to-[#112F56] border border-slate-700 flex flex-col items-center justify-center p-3 text-center">
                      <span className="text-xs font-black text-cyan-200">
                        "{concept.headline}"
                      </span>
                      <span className="text-[10px] text-slate-400 mt-1">
                        Vertical Video Mockup • 9:16
                      </span>
                    </div>

                    <div className="space-y-1 text-xs">
                      <span className="text-slate-400 font-bold">Caption:</span>
                      <p className="text-slate-300 text-[11px] leading-relaxed line-clamp-3">
                        {concept.caption}
                      </p>
                    </div>

                    <div className="text-[10px] text-slate-400">
                      <strong>Platform:</strong> {concept.platform}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-700/60">
                    <button
                      type="button"
                      id={`demo-select-creative-${concept.id}`}
                      onClick={() => handleSelectCreative(concept.id)}
                      className="w-full py-2.5 bg-gradient-to-r from-[#1769E0] to-cyan-500 hover:from-blue-600 hover:to-cyan-400 text-white rounded-xl font-bold text-xs shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Select This Direction</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* STEP 8: GOVERNANCE CHECK */}
        {/* ----------------------------------------------------------------- */}
        {demoStep === 8 && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300 max-w-4xl mx-auto w-full">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>ENTERPRISE GOVERNANCE GATE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Automated Multi-Layer Compliance Audit
              </h2>
              <p className="text-xs text-slate-300">
                Automated checks completed. Final accountability remains with the human approver.
              </p>
            </div>

            <div className="bg-[#0B1F3A] rounded-3xl p-6 sm:p-8 border-2 border-emerald-400/50 shadow-xl space-y-5">
              {/* Score Top Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-[#0B1F3A] flex items-center justify-center font-black text-lg">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white">
                      94% Governance Confidence Score
                    </h3>
                    <p className="text-xs text-emerald-300 font-semibold">
                      HUMAN APPROVAL REQUIRED FOR LOCALIZATION
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-300">
                  Unilever Claims Dossier #RD-72H-REX
                </span>
              </div>

              {/* Checklist Items */}
              <div className="space-y-2.5 text-xs">
                {[
                  { label: 'Brand Identity & Visual Standards', status: 'PASS', details: 'Accurate Rexona Shieldmark logo spacing & aerosol typography.' },
                  { label: 'Tone of Voice Compliance', status: 'PASS', details: 'Playful, confident sports commentary; non-derogatory framing.' },
                  { label: 'Substantiated Claims Validation', status: 'PASS', details: 'Verified 72H anti-perspirant sweat & odor protection claim.' },
                  { label: 'Cultural Sensitivity & Fair Use', status: 'PASS', details: 'Parody and cultural commentary adhere to fair-use broadcast norms.' },
                  { label: 'Market Regulatory Standards', status: 'REVIEW', details: 'Review recommended for local advertising codes (India ASCI, Brazil CONAR).' }
                ].map((item) => (
                  <div key={item.label} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start justify-between gap-3">
                    <div className="space-y-0.5">
                      <span className="font-bold text-white">{item.label}</span>
                      <p className="text-[11px] text-slate-400">{item.details}</p>
                    </div>
                    {item.status === 'PASS' ? (
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold border border-emerald-500/30 text-[10px] shrink-0">
                        ✓ PASS
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 font-bold border border-amber-500/30 text-[10px] shrink-0">
                        ⚠ Review
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-700/60">
                <span className="text-xs text-slate-400">
                  Compliance officer accountability: Aarav Mehta
                </span>
                <button
                  type="button"
                  id="demo-approve-governance-btn"
                  onClick={handleApproveGovernance}
                  className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Approve for Localization</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* STEP 9: LOCALIZATION (GLOBAL -> LOCAL) */}
        {/* ----------------------------------------------------------------- */}
        {demoStep === 9 && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>GLOBAL → LOCAL ARCHITECTURE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Localize Expression, Not Strategy
              </h2>
              <p className="text-xs text-slate-300 max-w-xl mx-auto">
                One global core idea ("Never Lose Your Cool") adapted into three culturally native market executions.
              </p>
            </div>

            {/* Market Tabs */}
            <div className="flex items-center justify-center gap-3">
              {[
                { key: 'india', label: '🇮🇳 India', sub: 'Hinglish • Instagram & X' },
                { key: 'brazil', label: '🇧🇷 Brazil', sub: 'Portuguese • TikTok' },
                { key: 'uk', label: '🇬🇧 United Kingdom', sub: 'British English • X & IG' }
              ].map((m) => (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => setSelectedMarketTab(m.key as any)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border text-left cursor-pointer ${
                    selectedMarketTab === m.key
                      ? 'bg-gradient-to-r from-[#1769E0] to-cyan-500 text-white border-cyan-400 shadow-md'
                      : 'bg-[#0B1F3A] text-slate-300 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  <div>{m.label}</div>
                  <div className="text-[10px] text-slate-300 font-normal opacity-80">{m.sub}</div>
                </button>
              ))}
            </div>

            {/* Selected Market Detail */}
            <div className="bg-[#0B1F3A] rounded-3xl p-6 sm:p-8 border border-slate-700/80 space-y-4 max-w-3xl mx-auto">
              {selectedMarketTab === 'india' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
                    <span className="text-xs font-bold text-cyan-300 uppercase">🇮🇳 India Market Execution</span>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 font-bold border border-emerald-500/30">
                      Ready for Approval
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 font-bold">Local Headline:</span>
                      <p className="text-sm font-extrabold text-white mt-0.5">"Full Time Ho Ya Extra Time. Sweat Free, Har Time."</p>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold">Local Copy:</span>
                      <p className="text-slate-200 mt-0.5 leading-relaxed">
                        "Jab pressure high ho, tab Rexona saath ho. Whether it's a last-minute office pitch or a match finale, stay 100% fresh! ⚽🔥 #NeverLoseYourCool #RexonaIndia"
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold">Cultural Nuance:</span>
                      <p className="text-slate-300 mt-0.5">Blends cricket/football stoppage excitement with Hinglish idioms for high-pressure daily work and gaming moments.</p>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold">CTA & Commerce:</span>
                      <p className="text-cyan-300 font-semibold mt-0.5">Shop 72H Shield on Blinkit / Zepto Instant Commerce</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedMarketTab === 'brazil' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
                    <span className="text-xs font-bold text-cyan-300 uppercase">🇧🇷 Brazil Market Execution</span>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 font-bold border border-emerald-500/30">
                      Ready for Approval
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 font-bold">Local Headline:</span>
                      <p className="text-sm font-extrabold text-white mt-0.5">"Nos Acréscimos Ou No Apito Final: Rexona Não Te Abandona."</p>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold">Local Copy:</span>
                      <p className="text-slate-200 mt-0.5 leading-relaxed">
                        "Jogo quente, decisão tensa no VAR e zero preocupação com suor. O ref já sabe: confiança total até o último segundo! 🇧🇷⚡ #RexonaNaoTeAbandona #FutebolBrasileiro"
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold">Cultural Nuance:</span>
                      <p className="text-slate-300 mt-0.5">Leverages famous Brazilian tagline 'Rexona não te abandona' with passionate football VAR banter.</p>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold">CTA & Commerce:</span>
                      <p className="text-cyan-300 font-semibold mt-0.5">Compre Rexona Clinical na Droga Raia</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedMarketTab === 'uk' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
                    <span className="text-xs font-bold text-cyan-300 uppercase">🇬🇧 United Kingdom Market Execution</span>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 font-bold border border-emerald-500/30">
                      Ready for Approval
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 font-bold">Local Headline:</span>
                      <p className="text-sm font-extrabold text-white mt-0.5">"Added Time Drama. Zero Underarm Drama."</p>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold">Local Copy:</span>
                      <p className="text-slate-200 mt-0.5 leading-relaxed">
                        "90+6 on the clock and the tension is palpable. At least one person on the pitch is staying completely calm. Keep your cool. #NeverLoseYourCool #Sure72H #PremierMoments"
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold">Cultural Nuance:</span>
                      <p className="text-slate-300 mt-0.5">Understated British dry humor referencing the local brand equivalent (Sure/Rexona) with iconic football matchday banter.</p>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold">CTA & Commerce:</span>
                      <p className="text-cyan-300 font-semibold mt-0.5">Find in Boots & Sainsbury's</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-3 border-t border-slate-700/60">
                <button
                  type="button"
                  onClick={nextDemoStep}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#1769E0] to-cyan-500 hover:from-blue-600 hover:to-cyan-400 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Proceed to Market Approvals</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* STEP 10: MARKET APPROVAL */}
        {/* ----------------------------------------------------------------- */}
        {demoStep === 10 && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300 max-w-4xl mx-auto w-full">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>HUMAN-IN-THE-LOOP MARKET GATES</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Market Approval Station
              </h2>
              <p className="text-xs text-slate-300">
                Regional leads sign off on local expressions before assets are staged for activation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: 'india', name: 'India', flag: '🇮🇳', lead: 'Priya Sharma (Media Lead)' },
                { id: 'brazil', name: 'Brazil', flag: '🇧🇷', lead: 'Lucas Silva (LATAM Brand Lead)' },
                { id: 'uk', name: 'United Kingdom', flag: '🇬🇧', lead: 'James Campbell (UK Brand Lead)' }
              ].map((m) => (
                <div key={m.id} className="bg-[#0B1F3A] rounded-2xl p-5 border border-slate-700/80 space-y-3 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-extrabold text-white">{m.flag} {m.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold border border-emerald-500/30">
                        {approvedMarketsMap[m.id] ? 'Approved ✓' : 'Pending'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">Reviewer: {m.lead}</p>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <button
                      type="button"
                      onClick={() => handleApproveMarket(m.id as any)}
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Check className="w-3 h-3 stroke-[3]" />
                      <span>Approve Market</span>
                    </button>
                    <button
                      type="button"
                      className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 text-[10px] rounded-lg transition-all"
                    >
                      Request Changes
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
              <span className="text-xs text-slate-400">
                All 3 markets validated against local regulatory standards.
              </span>
              <button
                type="button"
                id="demo-approve-all-markets-btn"
                onClick={handleApproveAllMarkets}
                className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-[#1769E0] to-cyan-500 hover:from-blue-600 hover:to-cyan-400 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Approve All Markets & Advance</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* STEP 11: ACTIVATION */}
        {/* ----------------------------------------------------------------- */}
        {demoStep === 11 && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300 max-w-3xl mx-auto w-full">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>CAMPAIGN READY</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Ready to Activate
              </h2>
              <p className="text-xs text-slate-300">
                All governance audits passed and market approvals finalized.
              </p>
            </div>

            {/* Campaign Manifest Checklist */}
            <div className="bg-[#0B1F3A] rounded-3xl p-6 sm:p-8 border-2 border-emerald-400/50 shadow-2xl space-y-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Campaign</span>
                  <div className="text-white font-extrabold text-sm mt-0.5">Never Lose Your Cool</div>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Brand</span>
                  <div className="text-cyan-300 font-extrabold text-sm mt-0.5">Rexona</div>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Markets</span>
                  <div className="text-white font-extrabold text-sm mt-0.5">India, Brazil, UK</div>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Assets</span>
                  <div className="text-emerald-400 font-extrabold text-sm mt-0.5">6 Multi-Format</div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Channels: Instagram Reels, TikTok, X, Blinkit Instant Commerce</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Governance: ✓ Passed (94% Confidence)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Regional Approvals: ✓ Complete</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  id="demo-activate-campaign-btn"
                  disabled={isActivatingAnimation}
                  onClick={handleActivateCampaign}
                  className="w-full py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-400 text-white font-black text-base rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isActivatingAnimation ? (
                    <>
                      <Cpu className="w-5 h-5 animate-spin" />
                      <span>Packaging & Firing Activation Manifest...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 fill-current" />
                      <span>Activate Campaign Across All Channels</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-[10px] text-center text-slate-400 font-mono">
                Prototype activation simulation • Injects into live campaigns registry
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* STEP 12: PERFORMANCE */}
        {/* ----------------------------------------------------------------- */}
        {demoStep === 12 && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
                <span>POST-LAUNCH TELEMETRY</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Campaign Intelligence & Velocity
              </h2>
              <p className="text-xs text-slate-300">
                Simulated 24-hour performance telemetry demonstrating cultural resonance and commercial conversion.
              </p>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { label: 'Total Reach', value: '14.8M', change: '+210% vs goal', color: 'text-cyan-300' },
                { label: 'Engagements', value: '1.42M', change: '9.6% Rate', color: 'text-emerald-400' },
                { label: 'Positive Sentiment', value: '88%', change: '+12% Lift', color: 'text-blue-300' },
                { label: 'CTR', value: '3.4%', change: '2.1x Benchmark', color: 'text-indigo-300' },
                { label: 'Purchase Intent', value: '+18.4%', change: 'Brand Lift', color: 'text-teal-300' },
                { label: 'ROAS (Est.)', value: '4.8x', change: 'Commercial', color: 'text-amber-300' }
              ].map((kpi) => (
                <div key={kpi.label} className="bg-[#0B1F3A] p-4 rounded-2xl border border-slate-700/80 space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">{kpi.label}</span>
                  <div className={`text-xl font-extrabold ${kpi.color}`}>{kpi.value}</div>
                  <span className="text-[10px] font-semibold text-emerald-400">{kpi.change}</span>
                </div>
              ))}
            </div>

            {/* Hourly Momentum Chart Frame */}
            <div className="bg-[#0B1F3A] p-6 rounded-3xl border border-slate-700/80 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">Cultural Momentum & Instant Commerce Conversions</span>
                <span className="text-slate-400 font-mono">T+0h to T+24h</span>
              </div>

              {/* Graphical representation bars */}
              <div className="h-36 flex items-end gap-2 sm:gap-4 pt-4 px-2 border-b border-slate-800">
                {[
                  { hour: '0h', val: 15 },
                  { hour: '2h', val: 45 },
                  { hour: '4h', val: 95 },
                  { hour: '6h', val: 100 },
                  { hour: '8h', val: 88 },
                  { hour: '12h', val: 74 },
                  { hour: '18h', val: 62 },
                  { hour: '24h', val: 48 }
                ].map((item) => (
                  <div key={item.hour} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <div 
                      className="w-full bg-gradient-to-t from-[#1769E0] to-cyan-400 rounded-t-md transition-all duration-700 hover:brightness-125"
                      style={{ height: `${item.val}%` }}
                    />
                    <span className="text-[10px] text-slate-400 font-mono">{item.hour}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <span className="text-xs text-slate-400">
                  Peak conversion window observed within first 4 hours of match broadcast.
                </span>
                <button
                  type="button"
                  onClick={nextDemoStep}
                  className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-[#1769E0] to-cyan-500 hover:from-blue-600 hover:to-cyan-400 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Synthesize Campaign Learnings</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* STEP 13: LEARNING (CLOSING THE LOOP) */}
        {/* ----------------------------------------------------------------- */}
        {demoStep === 13 && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300 max-w-4xl mx-auto w-full">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                <span>CLOSING THE LOOP</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                What Did NEXT Learn?
              </h2>
              <p className="text-xs text-slate-300">
                Empirical learnings from post-launch telemetry feed back into Unilever Brand Memory.
              </p>
            </div>

            {/* 4 Structured Learnings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#0B1F3A] p-5 rounded-2xl border border-slate-700/80 space-y-1">
                <span className="text-xs font-bold text-cyan-300 uppercase">Audience Interaction</span>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  Sports audiences aged 18–34 showed the strongest interaction (11.2% engagement rate).
                </p>
              </div>

              <div className="bg-[#0B1F3A] p-5 rounded-2xl border border-slate-700/80 space-y-1">
                <span className="text-xs font-bold text-blue-300 uppercase">Creative Format</span>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  Humor-led creative outperformed product-led creative by 2.4x in organic shares.
                </p>
              </div>

              <div className="bg-[#0B1F3A] p-5 rounded-2xl border border-slate-700/80 space-y-1">
                <span className="text-xs font-bold text-indigo-300 uppercase">Channel Efficacy</span>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  Short-form vertical video generated 74% of all positive meme remakes.
                </p>
              </div>

              <div className="bg-[#0B1F3A] p-5 rounded-2xl border border-slate-700/80 space-y-1">
                <span className="text-xs font-bold text-emerald-300 uppercase">Cultural Signal</span>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  Unexpected brand appearances produced 3.1x higher recall than planned promotional posts.
                </p>
              </div>
            </div>

            {/* AI Recommendation Banner & Apply Button */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0B1F3A] via-[#112F56] to-cyan-950 border-2 border-cyan-400/50 space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-cyan-300">
                  NEXT Strategic Recommendation
                </span>
                <p className="text-sm sm:text-base font-extrabold text-white leading-snug">
                  "Prioritize culturally native short-form executions when similar high-velocity opportunities emerge."
                </p>
              </div>

              {learningAppliedNotice ? (
                <div className="p-3.5 rounded-xl bg-emerald-950 border border-emerald-400/50 text-emerald-300 font-bold text-xs text-center flex items-center justify-center gap-2 animate-in zoom-in-95">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>✓ Future Opportunity Scoring Weights Updated (+15% weight to cultural meme velocity)</span>
                </div>
              ) : (
                <button
                  type="button"
                  id="demo-apply-learning-btn"
                  onClick={handleApplyLearning}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Apply Learning to Brand Memory</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* STEP 14: FINAL DEMO SUMMARY SCREEN (THESIS) */}
        {/* ----------------------------------------------------------------- */}
        {demoStep === 14 && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300 max-w-4xl mx-auto w-full py-4">
            <div className="text-center space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-300">
                FROM SIGNAL → ACTION COMPLETE
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                AI accelerated the nodes.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-[#1769E0]">
                  NEXT orchestrated the handoffs.
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
                In under 20 minutes of simulated time, an unplanned stoppage-time broadcast moment was captured, strategized, governed, localized across 3 markets, and activated.
              </p>
            </div>

            {/* 5 Proved Capabilities Checklist */}
            <div className="bg-[#0B1F3A] rounded-3xl p-6 sm:p-8 border border-slate-700/80 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                What This Prototype Proves:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-white">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>1. NEXT understands the signal</span>
                  </div>
                  <p className="text-[11px] text-slate-400 pl-6">
                    Doesn't just generate text; interprets cultural context, emotion, and brand fit.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-white">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>2. NEXT makes a decision</span>
                  </div>
                  <p className="text-[11px] text-slate-400 pl-6">
                    Determines whether an opportunity is worth acting on before spending resources.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-white">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>3. NEXT orchestrates the workflow</span>
                  </div>
                  <p className="text-[11px] text-slate-400 pl-6">
                    Carries intelligence forward between nodes without manual copy-pasting.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-white">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>4. Humans stay in control</span>
                  </div>
                  <p className="text-[11px] text-slate-400 pl-6">
                    Pauses at consequential decision gates: opportunity, creative, governance, and market approvals.
                  </p>
                </div>

                <div className="col-span-1 sm:col-span-2 p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-cyan-200">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>5. NEXT closes the loop</span>
                  </div>
                  <p className="text-[11px] text-slate-300 pl-6">
                    Empirical campaign telemetry dynamically tunes future scoring weights and brand intelligence.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-slate-700/60">
                <button
                  type="button"
                  id="demo-replay-btn"
                  onClick={restartDemo}
                  className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Replay Demo</span>
                </button>

                <button
                  type="button"
                  id="demo-finish-explore-btn"
                  onClick={exitDemo}
                  className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[#1769E0] to-cyan-500 hover:from-blue-600 hover:to-cyan-400 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Explore Application Independently</span>
                </button>

                <button
                  type="button"
                  id="demo-ingest-custom-btn"
                  onClick={() => {
                    exitDemo();
                    openIngestModal();
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-[#071326] hover:bg-slate-900 text-cyan-300 font-bold text-xs rounded-xl border border-cyan-400/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>+ Ingest Custom Signal</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* FOOTER CONTROLS BAR: BACK, STEP COUNTER, NEXT, SKIP */}
      {/* ========================================================================= */}
      <footer className="h-16 border-t border-slate-700/70 bg-[#0B1F3A]/90 px-4 sm:px-6 flex items-center justify-between shrink-0">
        <button
          type="button"
          disabled={demoStep === 1}
          onClick={prevDemoStep}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            demoStep === 1
              ? 'opacity-30 cursor-not-allowed text-slate-500 bg-slate-900'
              : 'text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Step</span>
        </button>

        {/* Center Step Counter Indicator */}
        <div className="flex items-center gap-2">
          <div className="text-xs text-slate-400 font-medium">
            <strong className="text-white">{demoStep}</strong> of <strong className="text-white">14</strong>
          </div>
          <div className="hidden sm:block w-32 bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-cyan-400 to-[#1769E0] h-full rounded-full transition-all duration-300"
              style={{ width: `${(demoStep / 14) * 100}%` }}
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {demoStep < 14 && (
            <button
              type="button"
              onClick={skipDemoStep}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all cursor-pointer"
              title="Skip this step"
            >
              <span>Skip</span>
            </button>
          )}

          {demoStep < 14 ? (
            <button
              type="button"
              onClick={nextDemoStep}
              className="px-5 py-2 bg-gradient-to-r from-[#1769E0] to-cyan-500 hover:from-blue-600 hover:to-cyan-400 text-white rounded-xl text-xs font-extrabold shadow transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Next Step</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={exitDemo}
              className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-extrabold shadow transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Finish Demo</span>
            </button>
          )}
        </div>
      </footer>
    </div>
  );
};

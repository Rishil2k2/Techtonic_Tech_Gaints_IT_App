import React from 'react';
import { 
  Radio, 
  Target, 
  GitMerge, 
  Clock, 
  TrendingUp, 
  Sparkles, 
  ChevronRight, 
  Play,
  Activity,
  ArrowRight,
  Cpu,
  CheckCircle2,
  Share2,
  ShieldCheck,
  Zap,
  Globe2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';
import { ScoreGauge } from '../common/ScoreGauge';
import { AgentArchitectureFlow } from '../common/AgentArchitectureFlow';

export const CommandCenter: React.FC = () => {
  const { 
    opportunities, 
    workflows, 
    agents, 
    selectOpportunity, 
    setActiveModule,
    startDemo,
    openIngestModal
  } = useApp();

  const heroOpp = opportunities.find(o => o.id === 'opp-rexona-referee') || opportunities[0];
  const otherLiveOpps = opportunities.slice(0, 4);

  return (
    <div id="command-center-module" className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Header & Fast Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#DCE6F2]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl lg:text-3xl font-extrabold text-[#0B1F3A] tracking-tight">
              Command Center
            </h1>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Agent Swarm Active
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#5B6B7A] mt-1 font-medium">
            Autonomous multi-agent brand lifecycle orchestration • Sensing cultural moments to real-time activation
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            id="command-center-ingest-btn"
            onClick={() => openIngestModal()}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0B1F3A] hover:bg-[#112F56] text-white text-xs font-bold shadow-xs transition-all border border-[#112F56] cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <span>+ Ingest Custom Signal</span>
          </button>

          <button
            type="button"
            onClick={startDemo}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1769E0] text-white text-xs font-bold shadow-xs hover:bg-blue-700 transition-all cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Launch Seeded Referee Demo</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MASTER BENTO GRID: ROW 1 (STRATEGIC THESIS & SPEED BENCHMARK) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-12 gap-5">
        {/* Bento Block 1: Strategic Mission & Ingestion Pulse (Span 8) */}
        <div className="col-span-12 lg:col-span-8 relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B1F3A] via-[#112F56] to-[#1769E0] p-6 text-white shadow-sm flex flex-col justify-between min-h-[170px]">
          <div className="relative z-10 space-y-2">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-400/20 border border-cyan-400/30 text-cyan-300 text-[10px] font-semibold">
                <Sparkles className="w-3 h-3" />
                <span>Autonomous Brand Operating System</span>
              </div>
              <span className="text-[11px] text-slate-300 font-mono">Unilever Brand Mesh v2.4</span>
            </div>
            
            <h2 className="text-xl lg:text-2xl font-extrabold tracking-tight text-white leading-snug">
              Sense faster. Decide smarter. Orchestrate everything that happens next.
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed font-normal max-w-2xl">
              PROJECT NEXT converts real-time cultural tensions into compliant, multi-market campaigns in minutes.
              <span className="text-cyan-200 font-medium ml-1">AI accelerates the nodes • NEXT orchestrates the governance.</span>
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-4 pt-3 border-t border-white/10 text-[11px] text-slate-300">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-300" />
              100% Brand Safety Guardrails
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-cyan-300" />
              Multi-Market Localized Synthesis
            </span>
          </div>

          {/* Decorative subtle background icon */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none flex items-center justify-end pr-6">
            <Activity className="w-56 h-56 text-cyan-300 stroke-[1]" />
          </div>
        </div>

        {/* Bento Block 2: Turnaround Speed Multiplier Card (Span 4) */}
        <div className="col-span-12 lg:col-span-4 bg-white rounded-2xl border border-[#DCE6F2] p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-[#DCE6F2]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5B6B7A]">
              Speed to Market
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 font-bold border border-purple-200">
              400x Acceleration
            </span>
          </div>

          <div className="py-2">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-3xl font-extrabold text-[#1769E0]">18 min</span>
                <span className="text-xs text-[#5B6B7A] block font-medium mt-0.5">Signal Detection &rarr; Live Activation</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-slate-400 line-through">120 hrs</span>
                <span className="text-[10px] text-slate-400 block">Traditional Agency SLA</span>
              </div>
            </div>

            <div className="mt-3 w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
              <div className="bg-[#1769E0] h-full rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#DCE6F2] text-[10px] text-[#5B6B7A] flex items-center justify-between">
            <span>Gemini 1.5 Pro Pipeline</span>
            <span className="font-semibold text-emerald-600">Zero SLA Breaches</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MASTER BENTO GRID: ROW 2 (4 COHESIVE KPI MODULES) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-white rounded-2xl border border-[#DCE6F2] p-4 shadow-xs hover:border-[#1769E0]/40 transition-all">
          <div className="flex items-center justify-between text-[#5B6B7A] mb-2">
            <span className="text-xs font-semibold">Live Signals Ingested</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#1769E0] flex items-center justify-center">
              <Radio className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-[#0B1F3A]">128</span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +24% today
            </span>
          </div>
          <div className="text-[10px] text-[#5B6B7A] mt-1.5 font-medium flex items-center justify-between">
            <span>Multi-channel stream</span>
            <span className="text-[#1769E0] font-semibold">Active</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white rounded-2xl border border-[#DCE6F2] p-4 shadow-xs hover:border-[#1769E0]/40 transition-all">
          <div className="flex items-center justify-between text-[#5B6B7A] mb-2">
            <span className="text-xs font-semibold">High-Value Opportunities</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-[#0B1F3A]">7</span>
            <span className="text-xs font-semibold text-[#1769E0] bg-blue-50 px-1.5 py-0.5 rounded">
              3 ACT NOW
            </span>
          </div>
          <div className="text-[10px] text-[#5B6B7A] mt-1.5 font-medium flex items-center justify-between">
            <span>Score threshold &gt; 75</span>
            <span className="text-emerald-600 font-semibold">Qualified</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white rounded-2xl border border-[#DCE6F2] p-4 shadow-xs hover:border-[#1769E0]/40 transition-all">
          <div className="flex items-center justify-between text-[#5B6B7A] mb-2">
            <span className="text-xs font-semibold">Active Workflows</span>
            <div className="w-7 h-7 rounded-lg bg-cyan-50 text-cyan-700 flex items-center justify-center">
              <GitMerge className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-[#0B1F3A]">4</span>
            <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
              1 Gate Pending
            </span>
          </div>
          <div className="text-[10px] text-[#5B6B7A] mt-1.5 font-medium flex items-center justify-between">
            <span>Rexona, Surf, Dove</span>
            <span className="text-amber-600 font-semibold">Review</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white rounded-2xl border border-[#DCE6F2] p-4 shadow-xs hover:border-[#1769E0]/40 transition-all">
          <div className="flex items-center justify-between text-[#5B6B7A] mb-2">
            <span className="text-xs font-semibold">Omnichannel Mesh</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-[#0B1F3A]">9</span>
            <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded">
              Synced
            </span>
          </div>
          <div className="text-[10px] text-[#5B6B7A] mt-1.5 font-medium flex items-center justify-between">
            <span>Social + Quick-Commerce</span>
            <span className="text-purple-600 font-semibold">Connected</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MASTER BENTO GRID: ROW 3 (HERO SPOTLIGHT + LIVE QUEUE) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-12 gap-5">
        {/* Bento Block 3: Hero Opportunity Spotlight (Span 7) */}
        <div className="col-span-12 lg:col-span-7 bg-white rounded-2xl border-2 border-[#1769E0]/40 p-6 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 bg-[#1769E0] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-xs">
            Hero Opportunity Spotlight
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-bold text-xs text-[#1769E0] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                {heroOpp.brand}
              </span>
              <span className="text-xs text-[#5B6B7A] font-medium">{heroOpp.market}</span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-[#5B6B7A]">{heroOpp.detectedAt}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DCE6F2]">
              <div>
                <h3 
                  className="text-xl font-bold text-[#0B1F3A] hover:text-[#1769E0] transition-colors cursor-pointer" 
                  onClick={() => selectOpportunity(heroOpp.id)}
                >
                  {heroOpp.title}
                </h3>
                <p className="text-xs text-[#5B6B7A] mt-1 max-w-xl line-clamp-2">
                  {heroOpp.summary}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                <ScoreGauge score={heroOpp.score} size="lg" />
              </div>
            </div>

            {/* Signal & Evidence Highlights */}
            <div className="grid grid-cols-3 gap-3 py-4 text-xs">
              <div className="bg-[#F5F9FF] p-3 rounded-xl border border-[#DCE6F2]/60">
                <span className="text-[10px] uppercase font-bold text-[#5B6B7A] block">Velocity</span>
                <span className="text-sm font-bold text-[#1769E0]">+{heroOpp.signal.evidence.velocityPercent}%</span>
              </div>
              <div className="bg-[#F5F9FF] p-3 rounded-xl border border-[#DCE6F2]/60">
                <span className="text-[10px] uppercase font-bold text-[#5B6B7A] block">Social Mentions</span>
                <span className="text-sm font-bold text-[#0B1F3A]">{heroOpp.signal.evidence.socialMentions}</span>
              </div>
              <div className="bg-[#F5F9FF] p-3 rounded-xl border border-[#DCE6F2]/60">
                <span className="text-[10px] uppercase font-bold text-[#5B6B7A] block">Sentiment</span>
                <span className="text-sm font-bold text-emerald-600">{heroOpp.signal.evidence.positiveSentimentPercent}% Positive</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#DCE6F2] mt-2">
            <div className="flex items-center gap-2">
              <StatusBadge status={heroOpp.status} size="lg" />
              <span className="text-xs text-[#5B6B7A] font-medium hidden sm:inline">
                High brand fit + explosive stoppage time momentum
              </span>
            </div>

            <button
              type="button"
              id="hero-review-opportunity-btn"
              onClick={() => selectOpportunity(heroOpp.id)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1769E0] text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
            >
              <span>Review 9-Stage Pipeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bento Block 4: Live Opportunities Prioritized Queue (Span 5) */}
        <div className="col-span-12 lg:col-span-5 bg-white rounded-2xl border border-[#DCE6F2] p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE6F2]">
              <div>
                <h3 className="text-sm font-bold text-[#0B1F3A]">Live Opportunities Queue</h3>
                <p className="text-[11px] text-[#5B6B7A]">Prioritized by NEXT Opportunity Engine</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveModule('opportunities')}
                className="text-xs font-semibold text-[#1769E0] hover:underline cursor-pointer"
              >
                View all ({opportunities.length})
              </button>
            </div>

            <div className="divide-y divide-slate-100 mt-2 space-y-1">
              {otherLiveOpps.slice(1, 4).map(opp => (
                <div
                  key={opp.id}
                  onClick={() => selectOpportunity(opp.id)}
                  className="py-2.5 px-2.5 rounded-xl hover:bg-[#F5F9FF] cursor-pointer transition-colors group"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-[#0B1F3A] group-hover:text-[#1769E0] transition-colors truncate">
                      {opp.title}
                    </span>
                    <span className="text-xs font-extrabold text-[#0B1F3A] shrink-0 bg-slate-100 px-2 py-0.5 rounded">
                      {opp.score.overall}/100
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#5B6B7A]">
                    <span className="font-semibold text-[#1769E0]">{opp.brand} • {opp.market}</span>
                    <StatusBadge status={opp.status} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[#DCE6F2]/80 mt-2">
            <button
              type="button"
              onClick={() => setActiveModule('opportunities')}
              className="w-full py-2 bg-[#F5F9FF] text-[#1769E0] hover:bg-blue-100 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Explore All Opportunities Catalog</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MASTER BENTO GRID: ROW 4 (USER DATA FREEDOM & INGESTION SANDBOX) */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-[#DCE6F2] p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DCE6F2]">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[#0B1F3A]">User Data Freedom & Ingestion Engine</h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-[#1769E0] font-bold border border-blue-200">
                Interactive Testing
              </span>
            </div>
            <p className="text-[11px] text-[#5B6B7A] mt-0.5">
              Found an organic trend, consumer comment, or brand idea? Ingest it now to test the 9-stage multi-agent orchestration.
            </p>
          </div>

          <button
            type="button"
            onClick={() => openIngestModal()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#1769E0] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <span>+ Ingest Custom Data</span>
          </button>
        </div>

        {/* 4 Quick-test Preset Bento Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div 
            onClick={() => openIngestModal('cricket')}
            className="p-3.5 rounded-xl border border-[#DCE6F2] bg-[#F5F9FF]/70 hover:bg-[#F5F9FF] hover:border-[#1769E0] transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold text-[#1769E0] bg-white px-2 py-0.5 rounded border border-blue-200">
                Rexona • India
              </span>
              <span className="text-[10px] text-emerald-600 font-bold">+94% Vel</span>
            </div>
            <div className="font-bold text-xs text-[#0B1F3A] group-hover:text-[#1769E0] transition-colors">
              Final Over Cricket Tension
            </div>
            <p className="text-[11px] text-[#5B6B7A] mt-1 line-clamp-2">
              Viral social memes on sweating through tense cricket finishes.
            </p>
            <div className="mt-2 text-[10px] text-[#1769E0] font-semibold flex items-center gap-1">
              <span>Test Ingestion &rarr;</span>
            </div>
          </div>

          <div 
            onClick={() => openIngestModal('monsoon')}
            className="p-3.5 rounded-xl border border-[#DCE6F2] bg-[#F5F9FF]/70 hover:bg-[#F5F9FF] hover:border-[#1769E0] transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold text-[#1769E0] bg-white px-2 py-0.5 rounded border border-blue-200">
                Surf Excel • India
              </span>
              <span className="text-[10px] text-emerald-600 font-bold">+86% Vel</span>
            </div>
            <div className="font-bold text-xs text-[#0B1F3A] group-hover:text-[#1769E0] transition-colors">
              Monsoon Mud & Instant Delivery
            </div>
            <p className="text-[11px] text-[#5B6B7A] mt-1 line-clamp-2">
              Heartwarming rainy day play paired with 10-min detergent delivery.
            </p>
            <div className="mt-2 text-[10px] text-[#1769E0] font-semibold flex items-center gap-1">
              <span>Test Ingestion &rarr;</span>
            </div>
          </div>

          <div 
            onClick={() => openIngestModal('ceramide')}
            className="p-3.5 rounded-xl border border-[#DCE6F2] bg-[#F5F9FF]/70 hover:bg-[#F5F9FF] hover:border-[#1769E0] transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold text-[#1769E0] bg-white px-2 py-0.5 rounded border border-blue-200">
                Vaseline • Global
              </span>
              <span className="text-[10px] text-emerald-600 font-bold">+91% Vel</span>
            </div>
            <div className="font-bold text-xs text-[#0B1F3A] group-hover:text-[#1769E0] transition-colors">
              Viral Barrier Slugging Debate
            </div>
            <p className="text-[11px] text-[#5B6B7A] mt-1 line-clamp-2">
              Dermatology video debating $90 creams vs pure Vaseline jelly.
            </p>
            <div className="mt-2 text-[10px] text-[#1769E0] font-semibold flex items-center gap-1">
              <span>Test Ingestion &rarr;</span>
            </div>
          </div>

          <div 
            onClick={() => openIngestModal('gym_odour')}
            className="p-3.5 rounded-xl border border-[#DCE6F2] bg-[#F5F9FF]/70 hover:bg-[#F5F9FF] hover:border-[#1769E0] transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold text-[#1769E0] bg-white px-2 py-0.5 rounded border border-blue-200">
                Axe • Brazil
              </span>
              <span className="text-[10px] text-emerald-600 font-bold">+82% Vel</span>
            </div>
            <div className="font-bold text-xs text-[#0B1F3A] group-hover:text-[#1769E0] transition-colors">
              Gym to Transit Commute Test
            </div>
            <p className="text-[11px] text-[#5B6B7A] mt-1 line-clamp-2">
              São Paulo subway debates on staying fresh after morning CrossFit.
            </p>
            <div className="mt-2 text-[10px] text-[#1769E0] font-semibold flex items-center gap-1">
              <span>Test Ingestion &rarr;</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MASTER BENTO GRID: ROW 5 (WORKFLOWS & AGENT SWARM MONITOR) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-12 gap-5">
        {/* Bento Block 5: Active Workflows & SLA Matrix (Span 7) */}
        <div className="col-span-12 lg:col-span-7 bg-white rounded-2xl border border-[#DCE6F2] p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE6F2]">
              <div>
                <h3 className="text-sm font-bold text-[#0B1F3A]">Active Enterprise Workflows</h3>
                <p className="text-[11px] text-[#5B6B7A]">Autonomous handoffs, human decision gates, and SLA countdowns</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveModule('workflows')}
                className="text-xs font-semibold text-[#1769E0] hover:underline cursor-pointer"
              >
                Manage All
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
              {workflows.map(wf => (
                <div
                  key={wf.id}
                  onClick={() => selectOpportunity(wf.opportunityId)}
                  className="p-3.5 rounded-xl border border-[#DCE6F2] bg-[#F5F9FF]/50 hover:bg-[#F5F9FF] hover:border-[#1769E0]/40 transition-all cursor-pointer shadow-2xs space-y-2.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#1769E0]">{wf.brand}</span>
                    <span className="text-[11px] font-mono text-[#5B6B7A] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-500" />
                      {wf.slaRemaining}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-[#0B1F3A] line-clamp-1">{wf.title}</h4>
                    <div className="text-[11px] text-[#5B6B7A] mt-0.5">Stage: <strong className="text-[#0B1F3A] capitalize">{wf.currentStage}</strong></div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-[10px] text-[#5B6B7A] mb-1">
                      <span>Progress</span>
                      <span className="font-semibold text-[#0B1F3A]">{wf.progressPercent}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#1769E0] h-full rounded-full" style={{ width: `${wf.progressPercent}%` }} />
                    </div>
                  </div>

                  <div className="pt-1.5 border-t border-[#DCE6F2]/60 text-[10px] text-[#5B6B7A] flex items-center justify-between">
                    <span className="truncate">Owner: <strong>{wf.owner.split(' ')[0]}</strong></span>
                    <span className="text-[#1769E0] font-semibold">Action &rarr;</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bento Block 6: Real-Time Agent Swarm Health & Latency (Span 5) */}
        <div className="col-span-12 lg:col-span-5 bg-white rounded-2xl border border-[#DCE6F2] p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE6F2]">
              <div>
                <h3 className="text-sm font-bold text-[#0B1F3A]">Agent Swarm Telemetry</h3>
                <p className="text-[11px] text-[#5B6B7A]">Live status of 6 specialized Gemini orchestration nodes</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                100% Online
              </span>
            </div>

            <div className="divide-y divide-slate-100 mt-2 space-y-1 text-xs">
              {(agents || []).slice(0, 5).map(agent => (
                <div key={agent.id} className="py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <div>
                      <span className="font-bold text-[#0B1F3A] block">{agent.name}</span>
                      <span className="text-[10px] text-[#5B6B7A] line-clamp-1 max-w-[180px]">{agent.purpose.slice(0, 45)}...</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] font-mono text-[#1769E0] font-semibold">{agent.avgLatency || '1.2s'}</span>
                    <span className="text-[10px] text-emerald-600 block">{agent.status === 'ACTIVE' ? '99.4% Accuracy' : 'Standby'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[#DCE6F2] mt-2 flex items-center justify-between text-[11px] text-[#5B6B7A]">
            <span className="flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-[#1769E0]" />
              Model: Gemini 1.5 Pro / Flash
            </span>
            <span className="font-medium text-[#0B1F3A]">Total Latency: ~1.2s</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FULL-WIDTH BENTO BLOCK: 9-STAGE AGENT ARCHITECTURE MAP */}
      {/* ========================================================================= */}
      <AgentArchitectureFlow agents={agents} />
    </div>
  );
};

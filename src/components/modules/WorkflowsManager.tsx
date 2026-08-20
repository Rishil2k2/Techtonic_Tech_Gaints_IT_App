import React, { useState } from 'react';
import { 
  GitMerge, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight, 
  User, 
  ArrowRight,
  Sparkles,
  Layers,
  Search,
  Radio,
  TrendingUp,
  Cpu,
  ShieldCheck,
  Zap,
  Filter
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';

const TRENDING_DISCOVERY_TAGS = [
  { tag: '#VARRefereeControversy', brand: 'Rexona', market: 'India', velocity: '+96%' },
  { tag: '#MonsoonMudStreetSports', brand: 'Surf Excel', market: 'India', velocity: '+91%' },
  { tag: '#SkinBarrierMicroSlugging', brand: 'Vaseline', market: 'India', velocity: '+88%' },
  { tag: '#SummerGymSweatSpike', brand: 'Axe', market: 'India', velocity: '+85%' },
  { tag: '#FestiveRadianceGlow', brand: 'Dove', market: 'India', velocity: '+89%' }
];

export const WorkflowsManager: React.FC = () => {
  const { 
    workflows, 
    selectOpportunity, 
    setActiveModule, 
    openOpportunityGenerator,
    openIngestModal
  } = useApp();

  const [trendSearchInput, setTrendSearchInput] = useState<string>('');
  const [selectedBrandFilter, setSelectedBrandFilter] = useState<string>('All');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openOpportunityGenerator(trendSearchInput.trim() || 'Emerging Cultural Trends');
  };

  const handleQuickTagClick = (topicName: string) => {
    setTrendSearchInput(topicName);
    openOpportunityGenerator(topicName);
  };

  const filteredWorkflows = workflows.filter(wf => {
    if (selectedBrandFilter === 'All') return true;
    return wf.brand === selectedBrandFilter;
  });

  return (
    <div id="workflows-manager-module" className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Top Header & Actions Ribbon */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-[#0B1F3A] tracking-tight">
              Brand Execution Workflows & Pipeline Manager
            </h1>
            <span className="text-[11px] px-2.5 py-0.5 bg-blue-50 text-[#1769E0] border border-blue-200 rounded-lg font-bold">
              Autonomous SLA Monitor
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#5B6B7A] mt-0.5">
            Orchestration tracker coordinating cross-functional handoffs, brand manager gates, and SLA countdowns.
          </p>
        </div>

        {/* Global Action Buttons in Workflows Bar */}
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <button
            type="button"
            id="workflows-generate-opportunity-btn"
            onClick={() => openOpportunityGenerator()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-[#1769E0] to-cyan-600 text-white text-xs font-extrabold shadow-sm hover:opacity-95 transition-all cursor-pointer ring-2 ring-blue-300/40"
          >
            <Sparkles className="w-4 h-4 text-cyan-200" />
            <span>✨ Generate New Opportunities</span>
          </button>

          <button
            type="button"
            id="workflows-ingest-btn"
            onClick={() => openIngestModal()}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#DCE6F2] hover:bg-slate-50 text-[#0B1F3A] text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <span>+ Ingest Data</span>
          </button>
        </div>
      </div>

      {/* Interactive Market Trend & Social Analysis Bar */}
      <div className="bg-linear-to-r from-blue-50/80 via-white to-indigo-50/50 p-5 rounded-2xl border border-blue-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#1769E0] text-white flex items-center justify-center font-bold">
              <Radio className="w-4 h-4 text-cyan-200 animate-pulse" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-[#0B1F3A]">
                Market Trend & Social Listening Analysis Bar
              </h3>
              <p className="text-xs text-[#5B6B7A]">
                Search latest cultural trends, sports drama, or product rituals to synthesize new ecosystem opportunities.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#5B6B7A] font-semibold">Filter Brand:</span>
            <select
              value={selectedBrandFilter}
              onChange={(e) => setSelectedBrandFilter(e.target.value)}
              className="bg-white border border-[#DCE6F2] rounded-lg px-2.5 py-1 text-xs font-bold text-[#0B1F3A] focus:outline-hidden focus:border-[#1769E0]"
            >
              <option value="All">All Portfolio Brands</option>
              <option value="Rexona">Rexona</option>
              <option value="Vaseline">Vaseline</option>
              <option value="Surf Excel">Surf Excel</option>
              <option value="Dove">Dove</option>
              <option value="Axe">Axe</option>
            </select>
          </div>
        </div>

        {/* Input Bar Form */}
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#5B6B7A] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="workflow-trend-search-input"
              value={trendSearchInput}
              onChange={(e) => setTrendSearchInput(e.target.value)}
              placeholder="Search latest market trends & social analysis (e.g. Cricket super over, Slugging skincare, Monsoon football)..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#DCE6F2] rounded-xl text-xs sm:text-sm font-medium text-[#0B1F3A] placeholder-[#5B6B7A]/60 shadow-xs focus:outline-hidden focus:border-[#1769E0] focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>

          <button
            type="submit"
            id="workflow-analyze-trend-btn"
            className="px-4 py-2.5 rounded-xl bg-[#1769E0] hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
            <span>Scan & Discover</span>
          </button>
        </form>

        {/* Trending Topic Fast Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] font-bold text-[#5B6B7A] flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-emerald-600" />
            Trending Right Now:
          </span>
          {TRENDING_DISCOVERY_TAGS.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleQuickTagClick(item.tag.replace('#', ''))}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#DCE6F2] hover:border-[#1769E0] hover:bg-blue-50/50 text-[11px] font-semibold text-[#0B1F3A] transition-all cursor-pointer shadow-2xs"
            >
              <span className="text-[#1769E0] font-bold">{item.tag}</span>
              <span className="text-slate-400">|</span>
              <span className="text-[#5B6B7A]">{item.brand}</span>
              <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-1 py-0.2 rounded">
                {item.velocity}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Summary KPI Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#DCE6F2] shadow-xs">
          <span className="text-xs font-semibold text-[#5B6B7A]">Total Active Workflows</span>
          <div className="text-2xl font-extrabold text-[#0B1F3A] mt-1">{filteredWorkflows.length}</div>
          <span className="text-[10px] text-[#1769E0] font-semibold">Across Unilever Portfolio</span>
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
          <span className="text-xs font-semibold text-[#5B6B7A]">Avg Execution Velocity</span>
          <div className="text-2xl font-extrabold text-[#1769E0] mt-1">2.4 min</div>
          <span className="text-[10px] text-slate-500 font-semibold">vs 18 hrs legacy</span>
        </div>
      </div>

      {/* Workflows List */}
      <div className="space-y-4">
        {filteredWorkflows.map(wf => (
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

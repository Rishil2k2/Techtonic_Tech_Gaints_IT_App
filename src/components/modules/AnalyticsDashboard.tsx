import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Globe2,
  Layers,
  Award,
  Radio,
  Target,
  Swords,
  Rocket,
  Flame,
  Filter,
  Eye,
  Share2,
  ThumbsUp,
  DollarSign,
  Activity,
  ChevronRight,
  RefreshCw,
  Cpu,
  Compass,
  Palette,
  FileText,
  AlertTriangle,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { 
  SEEDED_PIPELINE_STAGE_METRICS, 
  SEEDED_MARKET_TRENDS, 
  SEEDED_COMPETITIVE_INTELLIGENCE, 
  SEEDED_POST_CAMPAIGN_DATA 
} from '../../data/analyticsData';

export const AnalyticsDashboard: React.FC = () => {
  const { applyLearningsToFuture, selectedOpportunity, opportunities, selectOpportunity } = useApp();

  // Tab State: Adaptive Pipeline Metrics, Market Trends & Drivers, Competitive Analysis, Post-Launch Campaign Analytics
  const [activeTab, setActiveTab] = useState<'pipeline' | 'trends' | 'competitive' | 'post-launch'>('pipeline');
  
  // Pipeline Stage Filter
  const [selectedPipelineStage, setSelectedPipelineStage] = useState<string>('all');

  // Post-Campaign Scenario Selector
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(
    selectedOpportunity ? selectedOpportunity.id : 'opp-rexona-referee'
  );

  // Competitive Category Filter
  const [competitiveCategoryFilter, setCompetitiveCategoryFilter] = useState<string>('All');

  // Market Trend Filter
  const [trendCategoryFilter, setTrendCategoryFilter] = useState<string>('All');

  // Selected Campaign Post-Launch Data
  const activeCampaignData = SEEDED_POST_CAMPAIGN_DATA[selectedCampaignId] || SEEDED_POST_CAMPAIGN_DATA['opp-rexona-referee'];

  const filteredPipelineMetrics = selectedPipelineStage === 'all' 
    ? SEEDED_PIPELINE_STAGE_METRICS 
    : SEEDED_PIPELINE_STAGE_METRICS.filter(m => m.stageKey === selectedPipelineStage);

  const filteredCompetitive = competitiveCategoryFilter === 'All'
    ? SEEDED_COMPETITIVE_INTELLIGENCE
    : SEEDED_COMPETITIVE_INTELLIGENCE.filter(c => c.category.includes(competitiveCategoryFilter) || c.unileverRivalBrand === competitiveCategoryFilter);

  const filteredTrends = trendCategoryFilter === 'All'
    ? SEEDED_MARKET_TRENDS
    : SEEDED_MARKET_TRENDS.filter(t => t.category.includes(trendCategoryFilter));

  return (
    <div id="analytics-dashboard-module" className="space-y-6 max-w-7xl mx-auto pb-16 font-sans">
      {/* ========================================================================= */}
      {/* HEADER SECTION */}
      {/* ========================================================================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#DCE6F2] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-[#1769E0] font-extrabold text-[11px] uppercase tracking-wider border border-blue-200">
              Enterprise Performance Suite
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs text-emerald-600 font-bold">Live Telemetry Synchronized</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] tracking-tight mt-1">
            Enterprise Intelligence & Analytics
          </h1>
          <p className="text-xs sm:text-sm text-[#5B6B7A] mt-0.5">
            Stage-adaptive pipeline efficiency, real-time cultural velocity trends, competitor speed-to-market benchmarks, and closed-loop post-launch ROI.
          </p>
        </div>

        {/* Global Tab Navigation */}
        <div className="flex items-center bg-[#F5F9FF] p-1.5 rounded-xl border border-[#DCE6F2] self-start md:self-auto overflow-x-auto max-w-full">
          <button
            type="button"
            onClick={() => setActiveTab('pipeline')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'pipeline'
                ? 'bg-[#1769E0] text-white shadow-xs'
                : 'text-[#5B6B7A] hover:text-[#0B1F3A] hover:bg-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Pipeline Telemetry (9 Stages)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('trends')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'trends'
                ? 'bg-[#1769E0] text-white shadow-xs'
                : 'text-[#5B6B7A] hover:text-[#0B1F3A] hover:bg-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Market Trends & Velocity</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('competitive')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'competitive'
                ? 'bg-[#1769E0] text-white shadow-xs'
                : 'text-[#5B6B7A] hover:text-[#0B1F3A] hover:bg-white'
            }`}
          >
            <Swords className="w-3.5 h-3.5" />
            <span>Competitive Analysis</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('post-launch')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'post-launch'
                ? 'bg-[#1769E0] text-white shadow-xs'
                : 'text-[#5B6B7A] hover:text-[#0B1F3A] hover:bg-white'
            }`}
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>Post-Launch Campaign Analytics</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: ADAPTIVE PIPELINE TELEMETRY (STEP-BY-STEP ORCHESTRATION) */}
      {/* ========================================================================= */}
      {activeTab === 'pipeline' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* North-Star Metric Banner */}
          <div className="bg-gradient-to-tr from-[#0B1F3A] via-[#112F56] to-[#1769E0] rounded-2xl p-6 lg:p-8 text-white shadow-md relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/20 text-cyan-300 text-xs font-bold border border-cyan-400/30">
                  <Zap className="w-3.5 h-3.5" />
                  <span>North-Star End-to-End Acceleration</span>
                </div>
                <span className="text-xs text-slate-300 font-mono">
                  Autonomous Multi-Agent Handshake Engine
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                {/* Legacy Comparison */}
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/15">
                  <span className="text-xs text-slate-300 uppercase font-bold tracking-wider block">
                    Legacy Enterprise Workflow
                  </span>
                  <div className="text-3xl font-black text-slate-300 line-through mt-1">
                    120.0 Hours
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Fragmented across creative agency, media desk, brand team, legal review, and regional translators.
                  </p>
                </div>

                {/* NEXT Speed */}
                <div className="bg-white/15 backdrop-blur-md p-4 rounded-xl border-2 border-cyan-400/60 shadow-lg">
                  <span className="text-xs text-cyan-300 uppercase font-bold tracking-wider block">
                    PROJECT NEXT Orchestrated
                  </span>
                  <div className="text-3xl font-black text-white mt-1 flex items-baseline gap-2">
                    <span>18.4 Minutes</span>
                    <span className="text-xs font-extrabold text-cyan-300 bg-cyan-400/20 px-2 py-0.5 rounded">
                      390x Faster
                    </span>
                  </div>
                  <p className="text-[11px] text-cyan-100 mt-1">
                    Context flows seamlessly across 9 specialized AI nodes with deterministic human governance gates.
                  </p>
                </div>

                {/* Quality & Governance Accuracy */}
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/15">
                  <span className="text-xs text-emerald-300 uppercase font-bold tracking-wider block">
                    Governance Confidence
                  </span>
                  <div className="text-3xl font-black text-white mt-1 flex items-baseline gap-2">
                    <span>99.4%</span>
                    <span className="text-xs font-extrabold text-emerald-400 bg-emerald-400/20 px-2 py-0.5 rounded">
                      Zero Claim Breach
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Simultaneous Brand DNA, legal claim substantiation, and ASCI/CONAR compliance scanning.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pipeline Stage Quick Filter */}
          <div className="bg-white p-4 rounded-2xl border border-[#DCE6F2] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#1769E0]" />
              <span className="text-xs font-bold text-[#0B1F3A]">Filter Pipeline Stage:</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setSelectedPipelineStage('all')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedPipelineStage === 'all'
                    ? 'bg-[#1769E0] text-white shadow-2xs'
                    : 'bg-[#F5F9FF] text-[#5B6B7A] hover:bg-slate-100'
                }`}
              >
                All 9 Stages
              </button>
              {SEEDED_PIPELINE_STAGE_METRICS.map(m => (
                <button
                  key={m.stageKey}
                  type="button"
                  onClick={() => setSelectedPipelineStage(m.stageKey)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedPipelineStage === m.stageKey
                      ? 'bg-[#1769E0] text-white shadow-2xs'
                      : 'bg-[#F5F9FF] text-[#5B6B7A] hover:bg-slate-100'
                  }`}
                >
                  {m.stageName.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Stage-by-Stage Telemetry Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPipelineMetrics.map((stage, idx) => (
              <div 
                key={stage.stageKey}
                className="bg-white rounded-2xl border border-[#DCE6F2] p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#1769E0]/60 hover:shadow-md transition-all group"
              >
                <div className="space-y-3">
                  {/* Top Badge & Node Tag */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#1769E0] bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                      Stage {idx + 1}: {stage.stageKey.toUpperCase()}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      ● {stage.status}
                    </span>
                  </div>

                  {/* Title & Agent */}
                  <div>
                    <h3 className="text-base font-extrabold text-[#0B1F3A] group-hover:text-[#1769E0] transition-colors">
                      {stage.stageName}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-[#5B6B7A] mt-0.5">
                      <Cpu className="w-3.5 h-3.5 text-[#1769E0]" />
                      <span className="font-semibold">{stage.agentName}</span>
                    </div>
                  </div>

                  {/* Stage Insight */}
                  <p className="text-xs text-[#5B6B7A] leading-relaxed bg-[#F5F9FF] p-3 rounded-xl border border-[#E3EDFA]">
                    {stage.stageInsight}
                  </p>

                  {/* Latency Comparison */}
                  <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-semibold uppercase">Legacy Manual</span>
                      <div className="font-mono text-sm font-bold text-slate-600 mt-0.5 line-through">
                        {stage.legacyLatency}
                      </div>
                    </div>

                    <div className="bg-blue-50/80 p-2.5 rounded-xl border border-blue-200">
                      <span className="text-[10px] text-[#1769E0] font-semibold uppercase">NEXT Agent Latency</span>
                      <div className="font-mono text-sm font-extrabold text-[#1769E0] mt-0.5">
                        {stage.avgLatency}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Stats Footer */}
                <div className="pt-3 border-t border-[#DCE6F2] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#5B6B7A] font-medium">Throughput Capacity:</span>
                    <span className="font-bold text-[#0B1F3A] font-mono">{stage.throughput}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#5B6B7A] font-medium">Speedup Factor:</span>
                    <span className="font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {stage.speedup}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#5B6B7A] font-medium">Human Control Point:</span>
                    <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {stage.humanTouchRate}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Full Pipeline Latency Matrix Table */}
          <div className="bg-white rounded-2xl border border-[#DCE6F2] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE6F2]">
              <div>
                <h3 className="text-base font-extrabold text-[#0B1F3A]">Comprehensive Pipeline Acceleration Matrix</h3>
                <p className="text-xs text-[#5B6B7A]">Granular latency savings, accuracy indices, and human intervention rates across all 9 workflow nodes.</p>
              </div>
              <span className="text-xs px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                Avg Pipeline Speedup: 22,000x
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#F5F9FF] text-[#5B6B7A] uppercase text-[10px] font-extrabold tracking-wider border-b border-[#DCE6F2]">
                  <tr>
                    <th className="py-3 px-4">Stage & Responsible Agent</th>
                    <th className="py-3 px-3">Legacy Duration</th>
                    <th className="py-3 px-3">NEXT Duration</th>
                    <th className="py-3 px-3">Accuracy Index</th>
                    <th className="py-3 px-3">Data Processed</th>
                    <th className="py-3 px-4 text-right">Acceleration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {SEEDED_PIPELINE_STAGE_METRICS.map((m, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-bold text-[#0B1F3A]">{m.stageName}</div>
                        <div className="text-[11px] text-[#5B6B7A]">{m.agentName}</div>
                      </td>
                      <td className="py-3 px-3 text-slate-500 font-mono">{m.legacyLatency}</td>
                      <td className="py-3 px-3 font-extrabold text-[#1769E0] font-mono">{m.avgLatency}</td>
                      <td className="py-3 px-3">
                        <span className="font-bold text-emerald-600">{m.accuracyScore}%</span>
                      </td>
                      <td className="py-3 px-3 text-[#5B6B7A]">{m.dataPointsProcessed}</td>
                      <td className="py-3 px-4 text-right font-extrabold text-emerald-600">
                        <span className="px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200">
                          {m.speedup}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: MARKET TRENDS & CULTURAL VELOCITY */}
      {/* ========================================================================= */}
      {activeTab === 'trends' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Trends Summary Banner */}
          <div className="bg-white p-6 rounded-2xl border border-[#DCE6F2] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded border border-purple-200">
                Real-Time Cultural Radar
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B1F3A] mt-1">
                Active Cultural Trends & Market Drivers
              </h2>
              <p className="text-xs sm:text-sm text-[#5B6B7A] mt-0.5">
                Monitoring conversational spikes, geographic epicenter clustering, and brand equity synergy scoring.
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto">
              {['All', 'Sports', 'Beauty', 'Resilience', 'Personal Care'].map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setTrendCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    trendCategoryFilter === cat
                      ? 'bg-[#1769E0] text-white shadow-2xs'
                      : 'bg-[#F5F9FF] text-[#5B6B7A] hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Market Trends Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredTrends.map((trend) => (
              <div 
                key={trend.id}
                className="bg-white rounded-2xl border border-[#DCE6F2] p-6 shadow-xs flex flex-col justify-between space-y-5 hover:border-[#1769E0]/60 hover:shadow-md transition-all"
              >
                <div className="space-y-4">
                  {/* Category & Velocity Header */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#1769E0] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100">
                      {trend.category}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-bounce" />
                      <span className="text-xs font-black text-amber-600 font-mono">
                        +{trend.velocityChange}% Velocity
                      </span>
                    </div>
                  </div>

                  {/* Title & Macro Driver */}
                  <div>
                    <h3 className="text-lg font-extrabold text-[#0B1F3A]">
                      {trend.topic}
                    </h3>
                    <p className="text-xs text-[#5B6B7A] leading-relaxed mt-1.5 bg-[#F5F9FF] p-3 rounded-xl border border-[#E3EDFA]">
                      <strong className="text-[#0B1F3A]">Macro Driver:</strong> {trend.macroDriver}
                    </p>
                  </div>

                  {/* Volume & Geographic Hotspots */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-bold uppercase">24H Social Volume</span>
                      <div className="text-xl font-extrabold text-[#0B1F3A] mt-0.5">{trend.volumeMentions24h}</div>
                      <span className="text-[10px] text-slate-400">Multi-channel aggregated mentions</span>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-500 font-bold uppercase">Opportunity Window</span>
                      <div className="text-xs font-bold text-amber-600 mt-1">{trend.peakWindowRemaining}</div>
                      <span className="text-[10px] text-slate-400">{trend.demographicConcentration}</span>
                    </div>
                  </div>

                  {/* Sentiment Bar */}
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-[#5B6B7A]">
                      <span>Sentiment Distribution:</span>
                      <span className="text-emerald-600 font-bold">{trend.sentimentBreakdown.positive}% Positive</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full flex overflow-hidden">
                      <div style={{ width: `${trend.sentimentBreakdown.positive}%` }} className="bg-emerald-500" title="Positive" />
                      <div style={{ width: `${trend.sentimentBreakdown.neutral}%` }} className="bg-slate-400" title="Neutral" />
                      <div style={{ width: `${trend.sentimentBreakdown.negative}%` }} className="bg-rose-500" title="Negative" />
                    </div>
                  </div>

                  {/* Geographic Clusters */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-[#5B6B7A] uppercase tracking-wider">Geographic Epicenters:</span>
                    <div className="flex flex-wrap gap-2">
                      {trend.geographicHotspots.map((geo, gIdx) => (
                        <span key={gIdx} className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-[#0B1F3A] font-semibold flex items-center gap-1">
                          <Globe2 className="w-3 h-3 text-[#1769E0]" />
                          <span>{geo.market}: <strong className="text-[#1769E0]">{geo.growth}</strong></span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Unilever Brand Opportunity Fit */}
                  <div className="pt-2 space-y-2">
                    <span className="text-[11px] font-bold text-[#0B1F3A] uppercase tracking-wider block">
                      Brand Portfolio Opportunities:
                    </span>
                    <div className="space-y-2">
                      {trend.brandOpportunityFit.map((bFit, bIdx) => (
                        <div key={bIdx} className="p-3 rounded-xl border border-blue-100 bg-blue-50/60 flex items-center justify-between gap-3 text-xs">
                          <div>
                            <span className="font-extrabold text-[#1769E0]">{bFit.brand}</span>
                            <p className="text-[11px] text-[#0B1F3A] mt-0.5">{bFit.strategicAngle}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-600 text-white font-extrabold font-mono">
                              {bFit.fitScore}/100
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: COMPETITIVE BENCHMARKING & SPEED-TO-MARKET ANALYSIS */}
      {/* ========================================================================= */}
      {activeTab === 'competitive' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Competitive Header */}
          <div className="bg-white p-6 rounded-2xl border border-[#DCE6F2] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded border border-rose-200">
                Market Share of Voice & Reaction Speed
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B1F3A] mt-1">
                Competitive Intelligence & Speed-to-Market Benchmarks
              </h2>
              <p className="text-xs sm:text-sm text-[#5B6B7A] mt-0.5">
                Benchmarking Unilever brands against P&G, L'Oréal, and Beiersdorf across cultural reactivity and social share-of-voice.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto">
              {['All', 'Rexona', 'Vaseline', 'Surf Excel', 'Axe'].map(brand => (
                <button
                  key={brand}
                  type="button"
                  onClick={() => setCompetitiveCategoryFilter(brand)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    competitiveCategoryFilter === brand
                      ? 'bg-[#1769E0] text-white shadow-2xs'
                      : 'bg-[#F5F9FF] text-[#5B6B7A] hover:bg-slate-100'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Competitive Comparison Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCompetitive.map((comp) => (
              <div 
                key={comp.id}
                className="bg-white rounded-2xl border border-[#DCE6F2] p-6 shadow-xs flex flex-col justify-between space-y-5 hover:border-[#1769E0]/60 transition-all"
              >
                <div className="space-y-4">
                  {/* Top Rivalry Header */}
                  <div className="flex items-center justify-between border-b border-[#DCE6F2] pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 font-extrabold border border-rose-200">
                        {comp.competitorBrand}
                      </span>
                      <span className="text-xs text-slate-400 font-bold">vs</span>
                      <span className="text-xs px-2.5 py-1 rounded-lg bg-blue-50 text-[#1769E0] font-extrabold border border-blue-200">
                        Unilever {comp.unileverRivalBrand}
                      </span>
                    </div>

                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                      comp.threatLevel === 'HIGH' ? 'bg-rose-100 text-rose-800' :
                      comp.threatLevel === 'MEDIUM' ? 'bg-amber-100 text-amber-800' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {comp.threatLevel} Threat
                    </span>
                  </div>

                  {/* Competitor Recent Move */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Competitor Recent Action</span>
                    <p className="text-xs text-[#0B1F3A] font-semibold mt-0.5 leading-relaxed">
                      "{comp.recentCampaignOrMove}"
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                      <span>Detected: <strong>{comp.detectedAt}</strong></span>
                      <span>•</span>
                      <span>Competitor Lag: <strong className="text-rose-600">{comp.speedToMarketEstimate}</strong></span>
                    </div>
                  </div>

                  {/* Share of Voice Gauge */}
                  <div className="bg-[#F5F9FF] p-4 rounded-xl border border-[#E3EDFA] space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-[#1769E0]">Unilever {comp.unileverRivalBrand}: {comp.unileverShareOfVoice}% SOV</span>
                      <span className="text-rose-700">{comp.competitorBrand}: {comp.socialShareOfVoice}% SOV</span>
                    </div>
                    <div className="h-3 w-full bg-slate-200 rounded-full flex overflow-hidden">
                      <div style={{ width: `${comp.unileverShareOfVoice}%` }} className="bg-[#1769E0]" />
                      <div style={{ width: `${comp.socialShareOfVoice}%` }} className="bg-rose-500" />
                    </div>
                  </div>

                  {/* Unilever Advantage Factor Callout */}
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-1">
                    <span className="text-[11px] font-extrabold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Unilever NEXT Advantage</span>
                    </span>
                    <p className="text-emerald-950 font-medium leading-relaxed">
                      {comp.unileverAdvantageFactor}
                    </p>
                  </div>

                  {/* Recommended Counter Action */}
                  <div className="space-y-1 text-xs">
                    <span className="font-bold text-[#0B1F3A] uppercase tracking-wider text-[11px]">Recommended Counter Action:</span>
                    <p className="text-[#5B6B7A] bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      {comp.recommendedCounterAction}
                    </p>
                  </div>

                  {/* Competitor Channel Spend Estimates */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Competitor Channel Estimates:</span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {comp.channelBreakdown.map((ch, chIdx) => (
                        <div key={chIdx} className="bg-slate-50 p-2 rounded-lg border border-slate-200 flex justify-between">
                          <span className="text-slate-600 font-medium">{ch.channel}</span>
                          <span className="font-mono font-bold text-rose-700">{ch.competitorSpendEstimated}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: POST-LAUNCH CAMPAIGN PERFORMANCE & CLOSED-LOOP ROI */}
      {/* ========================================================================= */}
      {activeTab === 'post-launch' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Campaign Selector Banner */}
          <div className="bg-white p-6 rounded-2xl border border-[#DCE6F2] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                  Live Post-Launch Telemetry
                </span>
                <span className="text-xs text-slate-400">• {activeCampaignData.durationActive}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B1F3A] mt-1">
                {activeCampaignData.campaignTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[#5B6B7A] mt-0.5">
                Brand: <strong className="text-[#1769E0]">{activeCampaignData.brand}</strong> • Markets: <strong className="text-[#0B1F3A]">{activeCampaignData.market}</strong> • ID: <strong className="font-mono text-slate-500">{activeCampaignData.campaignId}</strong>
              </p>
            </div>

            {/* Campaign Dropdown */}
            <div className="flex items-center gap-2 self-start md:self-auto">
              <span className="text-xs font-bold text-[#0B1F3A]">Select Campaign:</span>
              <select
                id="analytics-post-campaign-select"
                value={selectedCampaignId}
                onChange={(e) => {
                  setSelectedCampaignId(e.target.value);
                  selectOpportunity(e.target.value);
                }}
                className="bg-[#F5F9FF] border border-[#DCE6F2] text-xs font-bold text-[#0B1F3A] rounded-xl px-3 py-2 focus:outline-none focus:border-[#1769E0] cursor-pointer"
              >
                <option value="opp-rexona-referee">Rexona | Referee Moment (Hero)</option>
                <option value="opp-vaseline-hack">Vaseline | Slugging Guide</option>
                <option value="opp-surf-excel-cricket">Surf Excel | Dirt of Champions</option>
              </select>
            </div>
          </div>

          {/* 4-Stat Executive Scorecard Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#DCE6F2] shadow-xs">
              <span className="text-xs font-bold text-[#5B6B7A] uppercase tracking-wider block">Total Impressions</span>
              <div className="text-2xl sm:text-3xl font-black text-[#0B1F3A] mt-1">
                {activeCampaignData.overview.totalImpressions}
              </div>
              <span className="text-[11px] font-semibold text-emerald-600 mt-1 block">
                {activeCampaignData.overview.organicImpressionsRatio}
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#DCE6F2] shadow-xs">
              <span className="text-xs font-bold text-[#5B6B7A] uppercase tracking-wider block">Total Engagements</span>
              <div className="text-2xl sm:text-3xl font-black text-[#1769E0] mt-1">
                {activeCampaignData.overview.totalEngagements}
              </div>
              <span className="text-[11px] font-semibold text-[#1769E0] mt-1 block">
                Avg Rate: <strong>{activeCampaignData.overview.overallEngagementRate}</strong>
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#DCE6F2] shadow-xs">
              <span className="text-xs font-bold text-[#5B6B7A] uppercase tracking-wider block">Sentiment Lift</span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">
                {activeCampaignData.overview.positiveSentimentLift}
              </div>
              <span className="text-[11px] font-semibold text-slate-500 mt-1 block">
                Brand Favorability Index: <strong>{activeCampaignData.overview.brandFavorabilityIndex}/100</strong>
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#DCE6F2] shadow-xs">
              <span className="text-xs font-bold text-[#5B6B7A] uppercase tracking-wider block">Commercial ROAS & CAC</span>
              <div className="text-2xl sm:text-3xl font-black text-purple-700 mt-1">
                {activeCampaignData.overview.roasEstimated}
              </div>
              <span className="text-[11px] font-semibold text-purple-700 mt-1 block">
                CAC Reduction: <strong>{activeCampaignData.overview.cacReductionFactor}</strong>
              </span>
            </div>
          </div>

          {/* 24-Hour Velocity Curve & Channel Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Velocity Stream */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-[#DCE6F2] p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#DCE6F2]">
                <div>
                  <h3 className="text-base font-extrabold text-[#0B1F3A]">Post-Launch Velocity Trajectory</h3>
                  <p className="text-xs text-[#5B6B7A]">Hourly impression surge and organic meme reshares</p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded bg-blue-50 text-[#1769E0] font-bold border border-blue-200 font-mono">
                  Earned Media: {activeCampaignData.overview.earnedMediaValueEstimated}
                </span>
              </div>

              {/* Bar Chart Simulation */}
              <div className="space-y-3 pt-2">
                {activeCampaignData.hourlyVelocity.map((hItem) => (
                  <div key={hItem.hour} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-[#0B1F3A] w-12">{hItem.hour}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-slate-500 font-mono">{hItem.shares.toLocaleString()} shares</span>
                        <span className="font-mono font-extrabold text-[#1769E0]">{(hItem.impressions / 1000000).toFixed(2)}M Impr</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-[#1769E0] to-cyan-400 h-full rounded-full transition-all"
                        style={{ width: `${(hItem.impressions / 15000000) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Regional Market Uplift */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-[#DCE6F2] p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#DCE6F2]">
                <h3 className="text-base font-extrabold text-[#0B1F3A]">Regional Market Uplift</h3>
                <Globe2 className="w-4 h-4 text-[#1769E0]" />
              </div>

              <div className="space-y-3">
                {activeCampaignData.regionalUplift.map((reg, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#F5F9FF] border border-[#DCE6F2] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-[#0B1F3A] text-sm">{reg.market}</span>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {reg.sentimentLift}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                      <div>
                        <span className="text-[10px] text-[#5B6B7A] block">Local Reach</span>
                        <span className="font-bold text-[#1769E0] font-mono">{reg.impressions}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#5B6B7A] block">Market Share Gain</span>
                        <span className="font-bold text-emerald-600 font-mono">{reg.marketShareDelta}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Omnichannel Performance Breakdown Table */}
          <div className="bg-white rounded-2xl border border-[#DCE6F2] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE6F2]">
              <h3 className="text-base font-extrabold text-[#0B1F3A]">Omnichannel Format Diagnostics & Attribution</h3>
              <span className="text-xs text-[#5B6B7A]">Aggregated programmatic and native feed diagnostics</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#F5F9FF] text-[#5B6B7A] uppercase text-[10px] font-extrabold tracking-wider border-b border-[#DCE6F2]">
                  <tr>
                    <th className="py-3 px-4">Channel & Top Performing Asset Format</th>
                    <th className="py-3 px-3">Impressions</th>
                    <th className="py-3 px-3">CTR</th>
                    <th className="py-3 px-3">Engagement Rate</th>
                    <th className="py-3 px-3">Conversion / Sales Lift</th>
                    <th className="py-3 px-4 text-right">Sentiment Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {activeCampaignData.channelPerformance.map((ch, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-bold text-[#0B1F3A]">{ch.channel}</div>
                        <div className="text-[11px] text-[#1769E0] font-medium">{ch.topAssetFormat}</div>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-[#0B1F3A]">{ch.impressions}</td>
                      <td className="py-3 px-3 font-mono font-bold text-emerald-600">{ch.ctr}</td>
                      <td className="py-3 px-3 font-mono font-bold text-[#1769E0]">{ch.engagementRate}</td>
                      <td className="py-3 px-3 font-semibold text-purple-700">{ch.conversionLift}</td>
                      <td className="py-3 px-4 text-right">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-extrabold border border-emerald-200">
                          {ch.sentimentScore}/100
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Closed-Loop Learning & Brand Memory Update */}
          <div className="bg-gradient-to-br from-[#0B1F3A] to-[#112F56] rounded-2xl p-6 text-white shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-cyan-400 text-[#0B1F3A] flex items-center justify-center font-black">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">Closed-Loop Learning & Deterministic Weight Calibration</h3>
                  <p className="text-xs text-slate-300">Empirical campaign outcomes directly tune future AI opportunity scoring parameters.</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => applyLearningsToFuture(activeCampaignData.opportunityId)}
                className="px-4 py-2 bg-gradient-to-r from-[#1769E0] to-cyan-500 hover:from-blue-600 hover:to-cyan-400 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Apply Learnings to Brand Memory</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {activeCampaignData.closedLoopLearnings.map((learn, lIdx) => (
                <div key={lIdx} className="p-4 rounded-xl bg-white/10 border border-white/15 space-y-2">
                  <span className="text-cyan-300 font-extrabold uppercase text-[10px] tracking-wider block">
                    Hypothesis vs Actual Telemetry:
                  </span>
                  <p className="text-slate-200 leading-relaxed font-medium">
                    {learn.actualResult}
                  </p>
                  <div className="p-2.5 rounded-lg bg-black/30 border border-white/10 text-[11px] text-cyan-200">
                    <strong>Rule Update:</strong> {learn.unileverMemoryUpdate}
                  </div>
                  <div className="text-[10px] font-mono text-emerald-400 font-bold">
                    ➔ {learn.weightAdjustment}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

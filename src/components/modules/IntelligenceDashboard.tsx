import React, { useState } from 'react';
import { 
  Radio, 
  Sparkles, 
  TrendingUp, 
  Filter, 
  Search, 
  BarChart2, 
  Flame, 
  Activity, 
  Globe, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { IntelligenceSignal } from '../../types';

export const IntelligenceDashboard: React.FC = () => {
  const { 
    intelligenceSignals, 
    selectOpportunity, 
    setActiveModule, 
    openIngestModal,
    openOpportunityGenerator 
  } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const categories = ['All', 'Sports Culture', 'Confidence & Freshness', 'Self-Expression', 'Beauty & Skin', 'Sustainability'];

  const filteredSignals = intelligenceSignals.filter(sig => {
    const matchesCategory = selectedCategory === 'All' || sig.category === selectedCategory;
    const matchesSearch = search === '' || sig.title.toLowerCase().includes(search.toLowerCase()) || sig.summary.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="intelligence-dashboard-module" className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0B1F3A] tracking-tight">
            Consumer Intelligence & Cultural Listening
          </h1>
          <p className="text-xs sm:text-sm text-[#5B6B7A] mt-0.5">
            Real-time cultural signal ingestion, velocity monitoring, and Unilever category sentiment tracking.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => openOpportunityGenerator()}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-linear-to-r from-[#1769E0] to-cyan-600 hover:from-blue-700 hover:to-cyan-500 text-white text-xs font-extrabold shadow-xs transition-all cursor-pointer ring-2 ring-blue-300/30"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
            <span>✨ Scan & Discover Opportunities</span>
          </button>

          <button
            type="button"
            onClick={() => openIngestModal()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0B1F3A] text-white text-xs font-bold shadow-xs hover:bg-[#112F56] transition-all cursor-pointer"
          >
            <span>+ Ingest Custom Signal</span>
          </button>
        </div>
      </div>

      {/* Top Velocity Trends */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#DCE6F2] shadow-xs">
          <span className="text-xs font-semibold text-[#5B6B7A] block">Sports Culture</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-[#0B1F3A]">+24%</span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> Surging
            </span>
          </div>
          <span className="text-[10px] text-[#5B6B7A]">Rexona & Sure alignment</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#DCE6F2] shadow-xs">
          <span className="text-xs font-semibold text-[#5B6B7A] block">Confidence & Composure</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-[#1769E0]">+18%</span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> High
            </span>
          </div>
          <span className="text-[10px] text-[#5B6B7A]">Monsoon & fitness tests</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#DCE6F2] shadow-xs">
          <span className="text-xs font-semibold text-[#5B6B7A] block">Authentic Self-Expression</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-[#0B1F3A]">+13%</span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> Growing
            </span>
          </div>
          <span className="text-[10px] text-[#5B6B7A]">Surf Excel & Dove</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#DCE6F2] shadow-xs">
          <span className="text-xs font-semibold text-[#5B6B7A] block">Beauty DIY Hacks</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-amber-600">+210%</span>
            <span className="text-xs font-semibold text-red-600 flex items-center">
              <Flame className="w-3 h-3 mr-0.5" /> Risk Alert
            </span>
          </div>
          <span className="text-[10px] text-[#5B6B7A]">Vaseline safety escalation</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#DCE6F2] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1769E0] text-white shadow-2xs'
                  : 'bg-[#F5F9FF] text-[#5B6B7A] hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#5B6B7A] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter signals..."
            className="w-full text-xs bg-[#F5F9FF] border border-[#DCE6F2] rounded-lg pl-8 pr-3 py-1.5 text-[#0B1F3A] focus:outline-none"
          />
        </div>
      </div>

      {/* Signals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSignals.map(signal => (
          <div
            key={signal.id}
            className="bg-white rounded-xl border border-[#DCE6F2] p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#1769E0]/50 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1769E0] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                  {signal.category}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  signal.status === 'SURGING' ? 'bg-purple-100 text-purple-800' :
                  signal.status === 'EMERGING' ? 'bg-blue-100 text-blue-800' :
                  'bg-slate-100 text-slate-700'
                }`}>
                  {signal.status}
                </span>
              </div>

              <h3 className="font-bold text-sm text-[#0B1F3A] leading-snug">
                {signal.title}
              </h3>
              <p className="text-xs text-[#5B6B7A] mt-1 leading-relaxed">
                {signal.summary}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-[#F5F9FF] p-2.5 rounded-lg text-center text-xs">
              <div>
                <span className="text-[10px] text-[#5B6B7A] block">Volume</span>
                <span className="font-bold text-[#0B1F3A]">{signal.volume}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#5B6B7A] block">Velocity</span>
                <span className="font-bold text-[#1769E0]">+{signal.velocityPercent}%</span>
              </div>
              <div>
                <span className="text-[10px] text-[#5B6B7A] block">Sentiment</span>
                <span className="font-bold text-emerald-600">{signal.sentimentPercent}% Pos</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#DCE6F2] text-xs">
              <span className="text-[11px] text-[#5B6B7A]">
                Brand Alignment: <strong>{signal.brandAlignment}</strong>
              </span>
              <button
                type="button"
                onClick={() => {
                  const signalMap: Record<string, string> = {
                    'intel-1': 'opp-rexona-referee',
                    'intel-2': 'opp-rexona-workout',
                    'intel-3': 'opp-surf-excel-cricket',
                    'intel-4': 'opp-dove-body-positivity',
                    'intel-5': 'opp-axe-gamer-sweat',
                    'intel-6': 'opp-vaseline-hack'
                  };
                  const targetOppId = signalMap[signal.id] || 'opp-rexona-referee';
                  selectOpportunity(targetOppId);
                  setActiveModule('opportunities');
                }}
                className="px-3 py-1 bg-blue-50 text-[#1769E0] hover:bg-[#1769E0] hover:text-white rounded-lg font-bold text-xs flex items-center gap-1 transition-all cursor-pointer"
              >
                <span>Synthesize Pipeline</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

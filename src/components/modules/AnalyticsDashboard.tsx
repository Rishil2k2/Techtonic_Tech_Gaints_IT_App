import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Globe,
  Layers,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AnalyticsDashboard: React.FC = () => {
  const { applyLearningsToFuture, selectedOpportunity } = useApp();

  const opp = selectedOpportunity;

  const comparisonMetrics = [
    { name: 'Cultural Signal → Decision', legacy: '6.0 hrs', next: '4 mins', speedup: '90x faster' },
    { name: 'Strategic Brief Generation', legacy: '24.0 hrs', next: '3 mins', speedup: '480x faster' },
    { name: 'Creative Directions & Copy', legacy: '48.0 hrs', next: '4 mins', speedup: '720x faster' },
    { name: 'Governance & Claims Audit', legacy: '48.0 hrs', next: '2 mins', speedup: '1,440x faster' },
    { name: 'Multi-Market Localization', legacy: '36.0 hrs', next: '5 mins', speedup: '430x faster' },
  ];

  return (
    <div id="analytics-dashboard-module" className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0B1F3A] tracking-tight">
            Analytics & Benchmark Telemetry
          </h1>
          <p className="text-xs sm:text-sm text-[#5B6B7A] mt-0.5">
            Velocity transformation, cross-stage latency benchmarks, and closed-loop AI learning repository.
          </p>
        </div>

        <span className="text-[11px] px-3 py-1 bg-blue-50 text-[#1769E0] border border-blue-200 rounded-lg font-semibold self-start sm:self-auto">
          Operational Intelligence Benchmark
        </span>
      </div>

      {/* North-Star Metric Showcase */}
      <div className="bg-gradient-to-tr from-[#0B1F3A] via-[#112F56] to-[#1769E0] rounded-2xl p-6 lg:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/20 text-cyan-300 text-xs font-semibold border border-cyan-400/30">
            <Zap className="w-3.5 h-3.5" />
            <span>North-Star Acceleration Metric</span>
          </div>

          <h2 className="text-xl lg:text-3xl font-extrabold tracking-tight">
            Signal → Activation Turnaround Time
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Legacy Time */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/15">
              <span className="text-xs text-slate-300 uppercase font-semibold block">
                Simulated Legacy Enterprise Workflow
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-slate-300 line-through">120 hrs</span>
                <span className="text-xs text-slate-400">(5 days across multiple silos)</span>
              </div>
            </div>

            {/* NEXT Velocity */}
            <div className="bg-white/15 backdrop-blur-md p-4 rounded-xl border-2 border-cyan-400/60 shadow-inner">
              <span className="text-xs text-cyan-300 uppercase font-bold tracking-wider block">
                PROJECT NEXT Orchestrated Workflow
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-white">18 min</span>
                <span className="text-xs font-bold text-cyan-300 bg-cyan-400/20 px-2 py-0.5 rounded">
                  400x Velocity Increase
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Latency Comparison Matrix */}
      <div className="bg-white rounded-2xl border border-[#DCE6F2] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#DCE6F2]">
          <div>
            <h3 className="text-sm font-bold text-[#0B1F3A]">Handoff Latency Transformation</h3>
            <p className="text-xs text-[#5B6B7A]">Stage-by-stage comparison between manual handoffs vs AI orchestration</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F5F9FF] text-[#5B6B7A] uppercase text-[10px] font-bold tracking-wider border-b border-[#DCE6F2]">
              <tr>
                <th className="py-3 px-4">Brand Lifecycle Stage</th>
                <th className="py-3 px-3">Legacy Turnaround</th>
                <th className="py-3 px-3">NEXT Turnaround</th>
                <th className="py-3 px-4 text-right">Acceleration Factor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {comparisonMetrics.map((m, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-[#0B1F3A]">{m.name}</td>
                  <td className="py-3 px-3 text-slate-500 font-mono">{m.legacy}</td>
                  <td className="py-3 px-3 font-bold text-[#1769E0] font-mono">{m.next}</td>
                  <td className="py-3 px-4 text-right font-bold text-emerald-600">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                      {m.speedup}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Closed-Loop Learning Repository */}
      <div className="bg-white rounded-2xl border border-[#DCE6F2] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#DCE6F2]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#1769E0]" />
            <h3 className="text-sm font-bold text-[#0B1F3A]">Closed-Loop AI Learning Repository</h3>
          </div>
          <span className="text-xs text-[#1769E0] font-semibold">Continuous Optimization</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-[#DCE6F2] bg-[#F5F9FF] space-y-1">
            <span className="font-bold text-[#1769E0] block">Sports Reactive Format Insight</span>
            <p className="text-[#0B1F3A] leading-relaxed">
              Humor-led reactive creative generated 2.8x higher engagement and positive sentiment compared to standard product feature ads.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[#DCE6F2] bg-[#F5F9FF] space-y-1">
            <span className="font-bold text-[#0B1F3A] block">Demographic Response Elasticity</span>
            <p className="text-[#0B1F3A] leading-relaxed">
              Sports and gaming audiences aged 18–34 exhibited the highest share rate (38.4K shares in first 3 hours) and organic meme remakes.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[#DCE6F2] bg-[#F5F9FF] space-y-1">
            <span className="font-bold text-purple-700 block">Asset Format Efficiency</span>
            <p className="text-[#0B1F3A] leading-relaxed">
              Split-screen reactive video with subtle brand mist animations outperformed static visual formats by 190% in click-through velocity.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[#DCE6F2] bg-[#F5F9FF] space-y-1">
            <span className="font-bold text-emerald-700 block">System Opportunity Weight Recommendation</span>
            <p className="text-[#0B1F3A] leading-relaxed">
              Prioritize culturally native short-form video and instant commerce links for all future live sports stoppage-time opportunities.
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-[#DCE6F2] flex items-center justify-between">
          <span className="text-[11px] text-[#5B6B7A]">
            Learnings automatically update deterministic scoring weights in NEXT Opportunity Engine.
          </span>

          <button
            type="button"
            onClick={() => opp && applyLearningsToFuture(opp.id)}
            className="px-4 py-2 bg-[#1769E0] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Apply Learning to Future Opportunities</span>
          </button>
        </div>
      </div>
    </div>
  );
};

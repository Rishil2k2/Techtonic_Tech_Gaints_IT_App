import React, { useState } from 'react';
import { 
  Megaphone, 
  Globe, 
  TrendingUp, 
  Sparkles, 
  ExternalLink, 
  CheckCircle2, 
  Search,
  Filter,
  Eye
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';

export const CampaignsLibrary: React.FC = () => {
  const { campaigns, selectOpportunity, setActiveModule } = useApp();
  const [selectedBrand, setSelectedBrand] = useState('All');

  const filteredCampaigns = campaigns.filter(c => 
    selectedBrand === 'All' || c.brand === selectedBrand
  );

  return (
    <div id="campaigns-library-module" className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0B1F3A] tracking-tight">
            Campaign Library
          </h1>
          <p className="text-xs sm:text-sm text-[#5B6B7A] mt-0.5">
            Orchestrated Unilever reactive and strategic brand campaigns across global and local markets.
          </p>
        </div>

        {/* Brand filter */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-[#DCE6F2]">
          {['All', 'Rexona', 'Surf Excel', 'Dove', 'Axe'].map(brand => (
            <button
              key={brand}
              type="button"
              onClick={() => setSelectedBrand(brand)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedBrand === brand
                  ? 'bg-[#1769E0] text-white shadow-2xs'
                  : 'text-[#5B6B7A] hover:bg-slate-50'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCampaigns.map(camp => (
          <div
            key={camp.id}
            id={`campaign-card-${camp.id}`}
            className="bg-white rounded-2xl border border-[#DCE6F2] p-6 shadow-xs flex flex-col justify-between space-y-5 hover:border-[#1769E0]/40 transition-colors"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#1769E0] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                    {camp.brand}
                  </span>
                  <span className="text-xs text-[#5B6B7A]">{camp.liveSince}</span>
                </div>
                <StatusBadge status={camp.stage === 'Activated' ? 'ACTIVATED' : 'IN PROGRESS'} size="sm" />
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-[#0B1F3A]">
                  {camp.name}
                </h3>
                <div className="flex items-center gap-2 text-xs text-[#5B6B7A] mt-1">
                  <Globe className="w-3.5 h-3.5 text-[#1769E0]" />
                  <span>Markets: <strong>{camp.markets.join(', ')}</strong></span>
                </div>
              </div>

              {/* Visual Banner Preview */}
              <div className="aspect-21/9 bg-gradient-to-r from-[#0B1F3A] to-[#1769E0] rounded-xl p-4 text-white flex items-center justify-between shadow-inner">
                <div>
                  <span className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider block">Campaign Creative</span>
                  <span className="text-sm font-extrabold text-white">"{camp.name}"</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-300 block">Performance</span>
                  <span className="text-sm font-bold text-emerald-400">{camp.sentiment}</span>
                </div>
              </div>

              {/* Telemetry Metrics */}
              <div className="grid grid-cols-3 gap-2 bg-[#F5F9FF] p-3 rounded-xl border border-[#DCE6F2] text-center text-xs">
                <div>
                  <span className="text-[10px] text-[#5B6B7A] block">Projected Reach</span>
                  <span className="font-extrabold text-[#0B1F3A]">{camp.reach}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#5B6B7A] block">Engagement</span>
                  <span className="font-extrabold text-[#1769E0]">{camp.engagementRate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#5B6B7A] block">Target ROI</span>
                  <span className="font-extrabold text-emerald-600">{camp.roi}</span>
                </div>
              </div>

              {/* Channels */}
              <div className="flex flex-wrap gap-1.5">
                {camp.channels.map((ch, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                    {ch}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#DCE6F2] flex items-center justify-between text-xs">
              <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {camp.approvalStatus}
              </span>

              <button
                type="button"
                onClick={() => {
                  const oppId = camp.id.replace('camp-', '');
                  const directMap: Record<string, string> = {
                    '1': 'opp-rexona-referee',
                    '2': 'opp-surf-excel-cricket',
                    '3': 'opp-dove-body-positivity',
                    '4': 'opp-axe-gamer-sweat'
                  };
                  const targetId = directMap[oppId] || oppId || 'opp-rexona-referee';
                  selectOpportunity(targetId);
                  setActiveModule('opportunities');
                }}
                className="px-3 py-1 bg-blue-50 text-[#1769E0] hover:bg-[#1769E0] hover:text-white rounded-lg font-bold text-xs flex items-center gap-1 transition-all cursor-pointer"
              >
                <span>Inspect 9-Stage Pipeline &rarr;</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

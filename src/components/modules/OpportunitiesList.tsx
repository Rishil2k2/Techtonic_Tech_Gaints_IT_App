import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Target, 
  ArrowUpDown, 
  ChevronRight, 
  Layers, 
  LayoutGrid, 
  LayoutList,
  Sparkles,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';
import { ScoreGauge } from '../common/ScoreGauge';
import { Opportunity } from '../../types';

export const OpportunitiesList: React.FC = () => {
  const { 
    opportunities, 
    selectOpportunity,
    searchQuery,
    setSearchQuery,
    filterBrand,
    setFilterBrand,
    filterStatus,
    setFilterStatus,
    filterMarket,
    setFilterMarket,
    openIngestModal,
    openOpportunityGenerator
  } = useApp();

  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [filterRisk, setFilterRisk] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'score' | 'velocity' | 'date'>('score');

  // Filter opportunities
  const filteredOpps = opportunities.filter(opp => {
    const matchesSearch = searchQuery === '' || 
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.brand.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBrand = filterBrand === 'All' || opp.brand === filterBrand;
    const matchesStatus = filterStatus === 'All' || opp.status === filterStatus || opp.recommendation === filterStatus;
    const matchesMarket = filterMarket === 'All' || opp.market.includes(filterMarket);
    const matchesRisk = filterRisk === 'All' || opp.risk === filterRisk;

    return matchesSearch && matchesBrand && matchesStatus && matchesMarket && matchesRisk;
  }).sort((a, b) => {
    if (sortBy === 'score') return b.score.overall - a.score.overall;
    if (sortBy === 'velocity') return b.signal.evidence.velocityPercent - a.signal.evidence.velocityPercent;
    return 0;
  });

  return (
    <div id="opportunities-list-module" className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0B1F3A] tracking-tight">
            Live Opportunities Catalog
          </h1>
          <p className="text-xs sm:text-sm text-[#5B6B7A] mt-0.5">
            Continuously evaluated cultural signals ranked by commercial upside, brand fit, and execution feasibility.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            id="opportunities-generate-btn"
            onClick={() => openOpportunityGenerator()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-linear-to-r from-[#1769E0] to-cyan-600 hover:from-blue-700 hover:to-cyan-500 text-white text-xs font-bold shadow-xs transition-all cursor-pointer ring-2 ring-blue-300/30"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
            <span>✨ Generate Opportunities</span>
          </button>

          <button
            type="button"
            id="opportunities-ingest-btn"
            onClick={() => openIngestModal()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B1F3A] hover:bg-[#112F56] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            <span>+ Ingest Data</span>
          </button>

          <div className="bg-slate-100 p-1 rounded-lg flex items-center border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'table' ? 'bg-white shadow-xs text-[#1769E0]' : 'text-slate-500'}`}
              title="Table View"
            >
              <LayoutList className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-xs text-[#1769E0]' : 'text-slate-500'}`}
              title="Grid Cards View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-xl border border-[#DCE6F2] p-4 shadow-xs space-y-3">
        <div className="flex flex-col lg:flex-row gap-3 items-center justify-between">
          {/* Search */}
          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 text-[#5B6B7A] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search opportunity keywords, brands, memes..."
              className="w-full text-xs bg-[#F5F9FF] border border-[#DCE6F2] rounded-lg pl-9 pr-3 py-2 text-[#0B1F3A] focus:outline-none focus:ring-2 focus:ring-[#1769E0]/20"
            />
          </div>

          {/* Quick Filter Selectors */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {/* Brand Filter */}
            <select
              value={filterBrand}
              onChange={(e) => setFilterBrand(e.target.value)}
              className="text-xs bg-[#F5F9FF] border border-[#DCE6F2] rounded-lg px-2.5 py-2 text-[#0B1F3A] focus:outline-none"
            >
              <option value="All">All Brands</option>
              <option value="Rexona">Rexona</option>
              <option value="Vaseline">Vaseline</option>
              <option value="Surf Excel">Surf Excel</option>
              <option value="Dove">Dove</option>
              <option value="Axe">Axe</option>
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-xs bg-[#F5F9FF] border border-[#DCE6F2] rounded-lg px-2.5 py-2 text-[#0B1F3A] focus:outline-none"
            >
              <option value="All">All Outcomes / Statuses</option>
              <option value="ACT NOW">ACT NOW</option>
              <option value="WATCH">WATCH</option>
              <option value="IGNORE">IGNORE</option>
              <option value="ESCALATE">ESCALATE</option>
              <option value="IN PROGRESS">IN PROGRESS</option>
              <option value="APPROVED">APPROVED</option>
            </select>

            {/* Market Filter */}
            <select
              value={filterMarket}
              onChange={(e) => setFilterMarket(e.target.value)}
              className="text-xs bg-[#F5F9FF] border border-[#DCE6F2] rounded-lg px-2.5 py-2 text-[#0B1F3A] focus:outline-none"
            >
              <option value="All">All Markets</option>
              <option value="India">India</option>
              <option value="Brazil">Brazil</option>
              <option value="United Kingdom">United Kingdom</option>
            </select>

            {/* Risk Filter */}
            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              className="text-xs bg-[#F5F9FF] border border-[#DCE6F2] rounded-lg px-2.5 py-2 text-[#0B1F3A] focus:outline-none"
            >
              <option value="All">All Risk Tiers</option>
              <option value="LOW">Low Risk</option>
              <option value="MEDIUM">Medium Risk</option>
              <option value="HIGH">High Risk</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs bg-[#F5F9FF] border border-[#DCE6F2] rounded-lg px-2.5 py-2 text-[#0B1F3A] focus:outline-none font-semibold"
            >
              <option value="score">Sort: Opportunity Score</option>
              <option value="velocity">Sort: Velocity (%/hr)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-[#5B6B7A] pt-1">
          <span>Showing <strong>{filteredOpps.length}</strong> evaluated opportunities</span>
          <span>Click any opportunity row to open its full end-to-end lifecycle workspace</span>
        </div>
      </div>

      {/* Table View */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-xl border border-[#DCE6F2] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F5F9FF] border-b border-[#DCE6F2] text-[#5B6B7A] uppercase font-bold text-[10px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Opportunity</th>
                  <th className="py-3.5 px-3">Brand</th>
                  <th className="py-3.5 px-3">Market</th>
                  <th className="py-3.5 px-3">Score</th>
                  <th className="py-3.5 px-3">Velocity</th>
                  <th className="py-3.5 px-3">Risk</th>
                  <th className="py-3.5 px-3">Recommendation</th>
                  <th className="py-3.5 px-3">Status</th>
                  <th className="py-3.5 px-3">Owner</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOpps.map(opp => (
                  <tr
                    key={opp.id}
                    id={`opp-row-${opp.id}`}
                    onClick={() => selectOpportunity(opp.id)}
                    className="hover:bg-[#F5F9FF]/80 transition-colors cursor-pointer group"
                  >
                    <td className="py-3 px-4 font-semibold text-[#0B1F3A] max-w-[240px]">
                      <div className="font-bold text-[#0B1F3A] group-hover:text-[#1769E0] transition-colors truncate">
                        {opp.title}
                      </div>
                      <div className="text-[10px] text-[#5B6B7A] font-normal truncate mt-0.5">
                        {opp.summary}
                      </div>
                    </td>

                    <td className="py-3 px-3 font-semibold text-[#0B1F3A]">
                      {opp.brand}
                    </td>

                    <td className="py-3 px-3 text-[#5B6B7A] whitespace-nowrap">
                      {opp.market.split('(')[0]}
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="font-bold text-sm text-[#0B1F3A]">{opp.score.overall}</span>
                      <span className="text-[10px] text-[#5B6B7A]">/100</span>
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap font-bold text-[#1769E0]">
                      +{opp.signal.evidence.velocityPercent}%
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <StatusBadge status={opp.risk} size="sm" />
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap font-bold text-xs">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        opp.recommendation === 'ACT' ? 'bg-blue-100 text-[#1769E0]' :
                        opp.recommendation === 'WATCH' ? 'bg-amber-100 text-amber-800' :
                        opp.recommendation === 'ESCALATE' ? 'bg-red-100 text-red-800' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {opp.recommendation}
                      </span>
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <StatusBadge status={opp.status} size="sm" />
                    </td>

                    <td className="py-3 px-3 text-[#5B6B7A] truncate max-w-[120px]">
                      {opp.owner.split('(')[0]}
                    </td>

                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-[#1769E0] font-semibold text-xs group-hover:translate-x-0.5 transition-transform">
                        Open <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Grid Cards View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOpps.map(opp => (
            <div
              key={opp.id}
              onClick={() => selectOpportunity(opp.id)}
              className="bg-white rounded-xl border border-[#DCE6F2] p-5 shadow-xs hover:shadow-md hover:border-[#1769E0]/50 transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-[#1769E0] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    {opp.brand}
                  </span>
                  <StatusBadge status={opp.status} size="sm" />
                </div>

                <h3 className="font-bold text-sm text-[#0B1F3A] group-hover:text-[#1769E0] transition-colors line-clamp-1">
                  {opp.title}
                </h3>
                <p className="text-xs text-[#5B6B7A] mt-1 line-clamp-2 leading-relaxed">
                  {opp.summary}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 py-2 bg-[#F5F9FF] rounded-lg p-2 text-center text-xs">
                <div>
                  <span className="text-[10px] text-[#5B6B7A] block">Score</span>
                  <span className="font-extrabold text-[#0B1F3A]">{opp.score.overall}/100</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#5B6B7A] block">Velocity</span>
                  <span className="font-bold text-[#1769E0]">+{opp.signal.evidence.velocityPercent}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#5B6B7A] block">Risk</span>
                  <span className="font-bold text-[#0B1F3A]">{opp.risk}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#DCE6F2] text-xs">
                <span className="text-[11px] text-[#5B6B7A]">{opp.market}</span>
                <span className="text-[#1769E0] font-semibold flex items-center gap-1">
                  Review &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

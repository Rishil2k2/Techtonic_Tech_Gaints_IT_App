import React, { useState } from 'react';
import { 
  Settings, 
  ShieldCheck, 
  Cpu, 
  Link2, 
  RotateCcw, 
  Save, 
  CheckCircle2, 
  Building2, 
  Sliders, 
  User, 
  AlertCircle,
  Database,
  Radio
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SettingsView: React.FC = () => {
  const { agents, resetDemoData, userWorkspace, updateUserWorkspace } = useApp();
  const [selectedBrand, setSelectedBrand] = useState(userWorkspace.currentBrand);
  const [notificationState, setNotificationState] = useState(true);
  const [thresholdScore, setThresholdScore] = useState(75);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    updateUserWorkspace({ currentBrand: selectedBrand });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const integrations = [
    { name: 'Unilever People Data Centre (PDC)', type: 'Consumer Data', status: 'Connected', ping: '12ms' },
    { name: 'Social Ingestion & Meme Firehose', type: 'Cultural Ingestion', status: 'Connected', ping: '24ms' },
    { name: 'Unilever DAM & Brand Asset Hub', type: 'Asset Storage', status: 'Connected', ping: '45ms' },
    { name: 'Legal & Claims Governance Registry', type: 'Compliance', status: 'Connected', ping: '18ms' },
    { name: 'Retail Media & DSP Activation Ingress', type: 'Media Deployment', status: 'Connected', ping: '31ms' },
    { name: 'Quick-Commerce Fulfillment Feed', type: 'Instant Commerce', status: 'Connected', ping: '29ms' },
  ];

  return (
    <div id="settings-module" className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0B1F3A] tracking-tight">
            System & Enterprise Settings
          </h1>
          <p className="text-xs sm:text-sm text-[#5B6B7A] mt-0.5">
            Configure brand thresholds, governance parameters, AI agent pipeline models, and enterprise connectors.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={resetDemoData}
            className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Workspace</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 bg-[#1769E0] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            {savedSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Saved Changes!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Workspace Config</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Brand & User Workspace Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-[#DCE6F2] p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#DCE6F2]">
            <Building2 className="w-4 h-4 text-[#1769E0]" />
            <h3 className="text-sm font-bold text-[#0B1F3A]">Brand & Category Focus</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-[#0B1F3A] block mb-1">Active Brand Profile</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-[#F5F9FF] border border-[#DCE6F2] rounded-lg p-2 text-xs text-[#0B1F3A] focus:outline-none"
              >
                <option value="Rexona">Rexona (Deodorant & Confidence)</option>
                <option value="Vaseline">Vaseline (Skin Health & Healing)</option>
                <option value="Surf Excel">Surf Excel (Laundry & Dirt Is Good)</option>
                <option value="Dove">Dove (Real Beauty & Care)</option>
                <option value="Axe">Axe / Lynx (Attraction & Fragrance)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-[#0B1F3A] block mb-1">Opportunity Scoring Threshold (ACT NOW Gate)</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="60"
                  max="95"
                  value={thresholdScore}
                  onChange={(e) => setThresholdScore(Number(e.target.value))}
                  className="w-full accent-[#1769E0]"
                />
                <span className="font-extrabold text-sm text-[#1769E0] w-12 text-right">{thresholdScore}/100</span>
              </div>
              <span className="text-[10px] text-[#5B6B7A] block mt-0.5">
                Signals scoring above {thresholdScore} automatically trigger ACT NOW prioritization and Brand Manager alerts.
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#DCE6F2] p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#DCE6F2]">
            <ShieldCheck className="w-4 h-4 text-[#1769E0]" />
            <h3 className="text-sm font-bold text-[#0B1F3A]">Governance & Compliance Gates</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#F5F9FF] border border-[#DCE6F2]">
              <div>
                <span className="font-bold text-[#0B1F3A] block">Mandatory Brand Manager Gate</span>
                <span className="text-[10px] text-[#5B6B7A]">Require explicit human authorization prior to creative generation</span>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Enforced</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#F5F9FF] border border-[#DCE6F2]">
              <div>
                <span className="font-bold text-[#0B1F3A] block">Multi-Market Legal Escalation</span>
                <span className="text-[10px] text-[#5B6B7A]">Auto-route comparative claims to regional legal councils</span>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Agent Pipeline Status Table */}
      <div className="bg-white rounded-2xl border border-[#DCE6F2] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#DCE6F2]">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#1769E0]" />
            <h3 className="text-sm font-bold text-[#0B1F3A]">AI Agent Pipeline Orchestration Mesh</h3>
          </div>
          <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> All 7 Agents Healthy
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F5F9FF] text-[#5B6B7A] uppercase text-[10px] font-bold tracking-wider border-b border-[#DCE6F2]">
              <tr>
                <th className="py-3 px-4">Agent Name</th>
                <th className="py-3 px-3">Role & Scope</th>
                <th className="py-3 px-3">Model Core</th>
                <th className="py-3 px-3">Target Latency</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {agents.map(ag => (
                <tr key={ag.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-[#0B1F3A]">{ag.name}</td>
                  <td className="py-3 px-3 text-[#5B6B7A]">{ag.role}</td>
                  <td className="py-3 px-3 font-mono text-[11px] text-[#1769E0] font-semibold">{ag.model}</td>
                  <td className="py-3 px-3 text-slate-500 font-mono">{ag.latency}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                      {ag.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Integration Connections */}
      <div className="bg-white rounded-2xl border border-[#DCE6F2] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#DCE6F2]">
          <div className="flex items-center gap-2">
            <Link2 className="w-4 h-4 text-[#1769E0]" />
            <h3 className="text-sm font-bold text-[#0B1F3A]">Enterprise Data Connectors</h3>
          </div>
          <span className="text-[11px] text-[#5B6B7A] italic">Prototype simulated integration mesh</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.map((integ, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-[#DCE6F2] bg-[#F5F9FF] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-[#5B6B7A]">{integ.type}</span>
                <span className="px-2 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                  {integ.status}
                </span>
              </div>
              <h4 className="font-bold text-xs text-[#0B1F3A]">{integ.name}</h4>
              <div className="text-[10px] text-slate-400 font-mono">Ping Latency: {integ.ping}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

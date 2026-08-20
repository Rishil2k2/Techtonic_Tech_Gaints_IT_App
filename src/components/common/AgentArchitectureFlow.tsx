import React, { useState } from 'react';
import { 
  Radio, 
  Sparkles, 
  Target, 
  Compass, 
  Palette, 
  ShieldCheck, 
  Globe, 
  Cpu, 
  ChevronRight, 
  Activity,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { AIAgentDefinition } from '../../types';

interface AgentArchitectureFlowProps {
  agents: AIAgentDefinition[];
  className?: string;
  compact?: boolean;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Radio: <Radio className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
  Target: <Target className="w-4 h-4" />,
  Compass: <Compass className="w-4 h-4" />,
  Palette: <Palette className="w-4 h-4" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4" />,
  Globe: <Globe className="w-4 h-4" />,
  Cpu: <Cpu className="w-4 h-4" />
};

export const AgentArchitectureFlow: React.FC<AgentArchitectureFlowProps> = ({
  agents,
  className = '',
  compact = false
}) => {
  const [selectedAgentId, setSelectedAgentId] = useState<string>(agents[0]?.id || 'agent-1');
  const activeAgent = agents.find(a => a.id === selectedAgentId) || agents[0];

  return (
    <div id="ai-agent-architecture-panel" className={`bg-white rounded-xl border border-[#DCE6F2] p-5 shadow-xs ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#DCE6F2]">
        <div>
          <h3 className="text-sm font-bold text-[#0B1F3A] flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#1769E0]" />
            NEXT AI Agent Orchestration Pipeline
          </h3>
          <p className="text-xs text-[#5B6B7A]">
            8 coordinated specialist agents executing the Unilever brand lifecycle handoffs
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            All Nodes Synchronized
          </span>
        </div>
      </div>

      {/* Linear Pipeline Node Chain */}
      <div className="py-4 overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-[760px] pb-2">
          {agents.map((agent, idx) => {
            const isSelected = agent.id === selectedAgentId;
            return (
              <React.Fragment key={agent.id}>
                <button
                  type="button"
                  id={`agent-node-${agent.id}`}
                  onClick={() => setSelectedAgentId(agent.id)}
                  className={`flex-1 flex flex-col items-center text-center p-2.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#F5F9FF] border-[#1769E0] shadow-xs ring-2 ring-[#1769E0]/20'
                      : 'bg-white border-[#DCE6F2] hover:bg-slate-50'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center mb-1.5 transition-colors ${
                      isSelected
                        ? 'bg-[#1769E0] text-white shadow-xs'
                        : 'bg-slate-100 text-[#5B6B7A]'
                    }`}
                  >
                    {ICON_MAP[agent.icon] || <Cpu className="w-4 h-4" />}
                  </div>
                  <span className="text-[11px] font-semibold text-[#0B1F3A] truncate w-full">
                    {agent.name.replace(' Agent', '')}
                  </span>
                  <span className="text-[10px] text-[#5B6B7A]">{agent.avgLatency}</span>
                </button>

                {idx < agents.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Selected Agent Inspector */}
      {activeAgent && !compact && (
        <div className="bg-[#F5F9FF] rounded-xl p-4 border border-[#DCE6F2] text-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-[#0B1F3A]">{activeAgent.name}</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-[#1769E0]">
                Node #{activeAgent.order}
              </span>
            </div>
            <span className="text-[11px] text-[#5B6B7A] flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#1769E0]" /> Avg Turnaround: {activeAgent.avgLatency}
            </span>
          </div>

          <p className="text-[#0B1F3A] leading-relaxed">
            {activeAgent.purpose}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div className="bg-white p-3 rounded-lg border border-[#DCE6F2]">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#5B6B7A] block mb-1">
                Input Telemetry / Contracts
              </span>
              <span className="text-[#0B1F3A] text-xs leading-tight">{activeAgent.input}</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-[#DCE6F2]">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#5B6B7A] block mb-1">
                Output Artifacts & Routing
              </span>
              <span className="text-[#0B1F3A] text-xs leading-tight">{activeAgent.output}</span>
            </div>
          </div>

          {activeAgent.currentTask && (
            <div className="flex items-center gap-2 pt-1 text-[11px] text-[#1769E0] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#1769E0] animate-ping shrink-0" />
              <span>Current Task: {activeAgent.currentTask}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

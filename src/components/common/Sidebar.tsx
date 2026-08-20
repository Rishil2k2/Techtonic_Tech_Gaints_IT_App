import React from 'react';
import { 
  LayoutDashboard, 
  Target, 
  Lightbulb, 
  GitMerge, 
  Megaphone, 
  BarChart3, 
  Settings, 
  Sparkles,
  Layers,
  Building2,
  User,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string | number;
}

interface NavGroup {
  groupTitle: string;
  items: NavItem[];
}

export const Sidebar: React.FC = () => {
  const { 
    activeModule, 
    setActiveModule, 
    selectOpportunity,
    userWorkspace, 
    opportunities,
    workflows 
  } = useApp();

  const actNowCount = opportunities.filter(o => o.status === 'ACT NOW').length;
  const activeWfCount = workflows.filter(w => w.status === 'ACTIVE').length;

  const NAV_GROUPS: NavGroup[] = [
    {
      groupTitle: 'COMMAND',
      items: [
        {
          id: 'command-center',
          label: 'Command Center',
          icon: <LayoutDashboard className="w-4 h-4" />
        }
      ]
    },
    {
      groupTitle: 'INTELLIGENCE',
      items: [
        {
          id: 'opportunities',
          label: 'Opportunities',
          icon: <Target className="w-4 h-4" />,
          badge: actNowCount > 0 ? actNowCount : undefined
        },
        {
          id: 'intelligence',
          label: 'Intelligence',
          icon: <Lightbulb className="w-4 h-4" />
        }
      ]
    },
    {
      groupTitle: 'EXECUTION',
      items: [
        {
          id: 'workflows',
          label: 'Workflows',
          icon: <GitMerge className="w-4 h-4" />,
          badge: activeWfCount > 0 ? activeWfCount : undefined
        },
        {
          id: 'campaigns',
          label: 'Campaigns',
          icon: <Megaphone className="w-4 h-4" />
        }
      ]
    },
    {
      groupTitle: 'MEASUREMENT',
      items: [
        {
          id: 'analytics',
          label: 'Analytics',
          icon: <BarChart3 className="w-4 h-4" />
        }
      ]
    },
    {
      groupTitle: 'SYSTEM',
      items: [
        {
          id: 'settings',
          label: 'Settings',
          icon: <Settings className="w-4 h-4" />
        }
      ]
    }
  ];

  const handleNavClick = (id: string) => {
    if (id === 'opportunities') {
      selectOpportunity(null);
    }
    setActiveModule(id);
  };

  return (
    <aside 
      id="project-next-sidebar" 
      className="w-64 h-screen bg-[#0B1F3A] text-white border-r border-[#112F56] flex flex-col shrink-0 select-none z-30 sticky top-0"
    >
      {/* Brand Header */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#1769E0] to-[#06B6D4] flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-extrabold text-white tracking-tight">PROJECT NEXT</h1>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-gradient-to-r from-[#1769E0] to-[#06B6D4] text-white font-bold tracking-wide shadow-xs">ENTERPRISE</span>
            </div>
            <p className="text-[11px] font-medium text-slate-400 leading-tight mt-0.5">
              AI Brand Lifecycle Orchestration
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
        {NAV_GROUPS.map(group => (
          <div key={group.groupTitle} className="space-y-1">
            <div className="px-3 text-[10px] font-bold tracking-wider text-slate-400/90 uppercase">
              {group.groupTitle}
            </div>

            <div className="space-y-0.5 pt-1">
              {group.items.map(item => {
                const isActive = activeModule === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    id={`nav-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group relative cursor-pointer ${
                      isActive
                        ? 'bg-[#1769E0] text-white font-semibold shadow-md shadow-blue-600/30'
                        : 'text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-2 bottom-2 w-1 bg-cyan-300 rounded-r-full" />
                    )}

                    <div className="flex items-center gap-2.5">
                      <span className={`transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== undefined && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        isActive 
                          ? 'bg-white text-[#1769E0]' 
                          : 'bg-white/10 text-cyan-300 border border-cyan-400/20'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Current Workspace Footer */}
      <div className="p-3.5 border border-white/10 bg-white/5 m-3 rounded-2xl backdrop-blur-xs">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
          <span>Current Workspace</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-emerald-400/30" title="Connected" />
        </div>

        <div className="space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-cyan-400" />
              {userWorkspace.brand}
            </span>
            <span className="text-[11px] font-medium text-slate-300 bg-white/10 px-2 py-0.5 rounded-lg border border-white/10">
              {userWorkspace.market}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1.5 border-t border-white/10 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5 truncate text-slate-300">
              <User className="w-3 h-3 text-cyan-400" />
              {userWorkspace.userName}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">{userWorkspace.userRole}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  HelpCircle, 
  Sparkles, 
  Play, 
  Check, 
  X, 
  ExternalLink,
  ChevronRight,
  Info,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const { 
    activeModule, 
    selectedOpportunity, 
    notifications, 
    unreadCount, 
    userWorkspace, 
    searchQuery, 
    setSearchQuery,
    startDemo,
    demoMode,
    exitDemo,
    markNotificationAsRead,
    markAllNotificationsRead,
    resetAllData,
    selectOpportunity,
    setActiveModule,
    openIngestModal
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  // Map module titles
  const moduleTitles: Record<string, { title: string; subtitle: string }> = {
    'command-center': { title: 'Command Center', subtitle: 'Real-time brand pulse & cultural signal orchestration' },
    'opportunities': { 
      title: selectedOpportunity ? selectedOpportunity.title : 'Live Opportunities', 
      subtitle: selectedOpportunity ? `${selectedOpportunity.brand} • ${selectedOpportunity.market}` : 'Prioritized cultural moments and commercial opportunities' 
    },
    'intelligence': { title: 'Consumer Intelligence', subtitle: 'Multi-stream cultural telemetry and emerging category signals' },
    'workflows': { title: 'Brand Workflows', subtitle: 'Cross-functional handoff coordination and SLA monitoring' },
    'campaigns': { title: 'Campaign Library', subtitle: 'Multi-market activated and scheduled brand campaigns' },
    'analytics': { title: 'Performance & Learning', subtitle: 'Signal-to-activation velocity and closed-loop AI learnings' },
    'settings': { title: 'System & Agent Settings', subtitle: 'Brand DNA, governance thresholds and agent orchestration pipelines' }
  };

  const currentMeta = moduleTitles[activeModule] || { title: 'Project NEXT', subtitle: 'AI Brand Lifecycle Orchestration' };

  return (
    <header 
      id="project-next-topbar" 
      className="h-16 bg-white border-b border-[#DCE6F2] px-6 flex items-center justify-between sticky top-0 z-20"
    >
      {/* Left: Breadcrumbs & Titles */}
      <div className="flex items-center gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-[#5B6B7A]">
            <span className="font-semibold text-[#0B1F3A]">PROJECT NEXT</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="capitalize font-medium text-[#1769E0]">
              {activeModule.replace('-', ' ')}
            </span>
            {selectedOpportunity && activeModule === 'opportunities' && (
              <>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="text-[#0B1F3A] font-semibold truncate max-w-[200px]">
                  {selectedOpportunity.title}
                </span>
              </>
            )}
          </div>
          <h2 className="text-base font-bold text-[#0B1F3A] leading-tight">
            {currentMeta.title}
          </h2>
        </div>
      </div>

      {/* Right Action Tools */}
      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <div className="relative hidden md:block w-56 lg:w-64">
          <Search className="w-3.5 h-3.5 text-[#5B6B7A] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            id="global-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search signals, briefs, brands..."
            className="w-full bg-[#F5F9FF] border border-[#DCE6F2] text-xs rounded-lg pl-8 pr-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#1769E0]/20 focus:border-[#1769E0] placeholder-[#5B6B7A]/70 text-[#0B1F3A]"
          />
        </div>

        {/* Global Ingest Signal & Data Button */}
        <button
          type="button"
          id="header-ingest-signal-btn"
          onClick={() => openIngestModal()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0B1F3A] hover:bg-[#112F56] text-white text-xs font-bold shadow-xs transition-all border border-[#112F56] hover:border-cyan-400/30 cursor-pointer"
          title="Input custom data, posts or research signals to test AI pipeline"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          <span className="hidden sm:inline">+ Ingest Data / Signal</span>
          <span className="sm:hidden">+ Ingest</span>
        </button>

        {/* Demo Mode Button */}
        {!demoMode ? (
          <button
            type="button"
            id="run-demo-button"
            onClick={startDemo}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#1769E0] to-[#06B6D4] text-white text-xs font-bold shadow-xs hover:opacity-95 transition-all cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Run Hero Demo</span>
          </button>
        ) : (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-100 border border-blue-300 text-xs">
            <span className="flex items-center gap-1.5 font-bold text-[#1769E0]">
              <span className="w-2 h-2 rounded-full bg-[#1769E0] animate-ping" />
              Demo Walkthrough Active
            </span>
            <button
              type="button"
              onClick={exitDemo}
              className="text-xs text-[#5B6B7A] hover:text-[#0B1F3A] font-medium underline cursor-pointer"
            >
              Exit
            </button>
          </div>
        )}

        {/* Reset System Workspace Data */}
        <button
          type="button"
          id="reset-data-button"
          onClick={resetAllData}
          title="Reset Seeded Enterprise Data"
          className="p-2 text-[#5B6B7A] hover:text-[#0B1F3A] hover:bg-[#F5F9FF] rounded-lg border border-transparent hover:border-[#DCE6F2] transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        {/* Help / Architectural Thesis Modal Trigger */}
        <button
          type="button"
          id="help-thesis-button"
          onClick={() => setShowHelpModal(true)}
          className="p-2 text-[#5B6B7A] hover:text-[#0B1F3A] hover:bg-[#F5F9FF] rounded-lg border border-transparent hover:border-[#DCE6F2] transition-colors"
          title="Product Thesis & Philosophy"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            type="button"
            id="notifications-button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-[#5B6B7A] hover:text-[#0B1F3A] hover:bg-[#F5F9FF] rounded-lg border border-transparent hover:border-[#DCE6F2] transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#DC2626] ring-2 ring-white" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-[#DCE6F2] overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="p-3 bg-[#F5F9FF] border-b border-[#DCE6F2] flex items-center justify-between">
                <span className="text-xs font-bold text-[#0B1F3A]">Notifications & Action Gates</span>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllNotificationsRead}
                    className="text-[11px] text-[#1769E0] font-medium hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 text-xs">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-[#5B6B7A]">No new notifications</div>
                ) : (
                  notifications.map(notif => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        markNotificationAsRead(notif.id);
                        if (notif.opportunityId) {
                          selectOpportunity(notif.opportunityId);
                          setActiveModule('opportunities');
                          setShowNotifications(false);
                        }
                      }}
                      className={`p-3 hover:bg-slate-50 cursor-pointer transition-colors ${
                        !notif.read ? 'bg-blue-50/40' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-[#0B1F3A] text-xs">{notif.title}</span>
                        <span className="text-[10px] text-slate-400 shrink-0">{notif.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-[#5B6B7A] mt-1 leading-snug">{notif.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Workspace Pill */}
        <div className="hidden sm:flex items-center gap-2.5 pl-2 border-l border-[#DCE6F2]">
          <div className="w-8 h-8 rounded-full bg-[#1769E0] text-white font-bold flex items-center justify-center text-xs shadow-2xs">
            AM
          </div>
          <div className="text-left leading-tight">
            <div className="text-xs font-bold text-[#0B1F3A]">{userWorkspace.userName}</div>
            <div className="text-[10px] text-[#5B6B7A] font-medium">{userWorkspace.brand} • {userWorkspace.market}</div>
          </div>
        </div>
      </div>

      {/* Product Thesis & Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-[#DCE6F2] overflow-hidden">
            <div className="bg-[#F5F9FF] px-6 py-4 border-b border-[#DCE6F2] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#1769E0] text-white flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0B1F3A]">PROJECT NEXT Architecture Thesis</h3>
                  <p className="text-[11px] text-[#5B6B7A]">Unilever AI Brand Lifecycle Orchestration Platform</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setShowHelpModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-[#0B1F3A]">
              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200">
                <div className="text-xs font-bold text-[#1769E0] mb-1">Product Principle:</div>
                <div className="text-sm font-semibold text-[#0B1F3A]">
                  "AI accelerates the nodes. NEXT orchestrates the handoffs."
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-bold text-[#0B1F3A]">The 10-Stage Closed Loop:</div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded bg-slate-50 border">1. Cultural Signal Detection</div>
                  <div className="p-2 rounded bg-slate-50 border">2. Consumer Insight Synthesis</div>
                  <div className="p-2 rounded bg-slate-50 border">3. Opportunity & Recommendation</div>
                  <div className="p-2 rounded bg-slate-50 border font-bold text-[#1769E0]">4. Human Decision Gate</div>
                  <div className="p-2 rounded bg-slate-50 border">5. Strategy & Creative Brief</div>
                  <div className="p-2 rounded bg-slate-50 border">6. Creative Studio & Routing</div>
                  <div className="p-2 rounded bg-slate-50 border">7. Automated Governance & Safety</div>
                  <div className="p-2 rounded bg-slate-50 border">8. Multi-Market Localization</div>
                  <div className="p-2 rounded bg-slate-50 border font-bold text-emerald-700">9. Live Multi-Channel Activation</div>
                  <div className="p-2 rounded bg-slate-50 border font-bold text-cyan-700">10. Closed-Loop Telemetry & Learning</div>
                </div>
              </div>

              <div className="text-[11px] text-[#5B6B7A] pt-2 border-t">
                Enterprise Edition: Autonomous multi-agent pipeline mapped to Unilever Brand DNA, legal safety thresholds, and quick-commerce endpoints.
              </div>
            </div>

            <div className="bg-slate-50 px-6 py-3 border-t border-[#DCE6F2] flex justify-end">
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="px-4 py-1.5 text-xs font-semibold bg-[#1769E0] text-white rounded-lg hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/common/Sidebar';
import { Header } from './components/common/Header';
import { CommandCenter } from './components/modules/CommandCenter';
import { OpportunitiesList } from './components/modules/OpportunitiesList';
import { OpportunityDetail } from './components/modules/OpportunityDetail';
import { IntelligenceDashboard } from './components/modules/IntelligenceDashboard';
import { WorkflowsManager } from './components/modules/WorkflowsManager';
import { CampaignsLibrary } from './components/modules/CampaignsLibrary';
import { AnalyticsDashboard } from './components/modules/AnalyticsDashboard';
import { SettingsView } from './components/modules/SettingsView';
import { DemoWalkthroughOverlay } from './components/modules/DemoWalkthroughOverlay';
import { IngestDataModal } from './components/common/IngestDataModal';
import { OpportunityGeneratorModal } from './components/common/OpportunityGeneratorModal';

const AppContent: React.FC = () => {
  const { activeModule, selectedOpportunityId } = useApp();

  return (
    <div className="flex h-screen bg-[#F5F9FF] font-sans antialiased text-[#0B1F3A] overflow-hidden">
      {/* Persistent Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {activeModule === 'command-center' && <CommandCenter />}

          {activeModule === 'opportunities' && (
            selectedOpportunityId ? <OpportunityDetail /> : <OpportunitiesList />
          )}

          {activeModule === 'intelligence' && <IntelligenceDashboard />}

          {activeModule === 'workflows' && <WorkflowsManager />}

          {activeModule === 'campaigns' && <CampaignsLibrary />}

          {activeModule === 'analytics' && <AnalyticsDashboard />}

          {activeModule === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* Guided Walkthrough Overlay */}
      <DemoWalkthroughOverlay />

      {/* Global Ingest Signal & Data Modal */}
      <IngestDataModal />

      {/* Global AI Opportunity Generator & Market Trend Search Modal */}
      <OpportunityGeneratorModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

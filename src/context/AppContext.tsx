import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Opportunity, 
  WorkflowItem, 
  CampaignItem, 
  IntelligenceSignal, 
  AIAgentDefinition,
  UserNotification,
  WorkflowStage,
  CustomSignalInput,
  SignalEvidence,
  ConsumerInsight,
  StrategyBrief,
  CreativeConcept,
  GovernanceCheckItem,
  LocalizationMarket,
  PipelineAuditEntry
} from '../types';
import { 
  SEEDED_OPPORTUNITIES, 
  SEEDED_WORKFLOWS, 
  SEEDED_CAMPAIGNS, 
  SEEDED_INTELLIGENCE, 
  SEEDED_AGENTS, 
  INITIAL_NOTIFICATIONS,
  INITIAL_HERO_OPPORTUNITY
} from '../data/seededData';

interface WorkspaceUser {
  userName: string;
  userRole: string;
  brand: string;
  market: string;
}

interface AppContextType {
  activeModule: string;
  selectedOpportunityId: string | null;
  opportunities: Opportunity[];
  workflows: WorkflowItem[];
  campaigns: CampaignItem[];
  intelligenceSignals: IntelligenceSignal[];
  agents: AIAgentDefinition[];
  notifications: UserNotification[];
  unreadCount: number;
  userWorkspace: WorkspaceUser;
  searchQuery: string;
  filterBrand: string;
  filterStatus: string;
  filterMarket: string;
  
  // Ingest Modal & User Data State
  isIngestModalOpen: boolean;
  initialIngestTemplate: string | null;
  openIngestModal: (templateKey?: string) => void;
  closeIngestModal: () => void;
  ingestCustomSignal: (input: CustomSignalInput) => string;
  
  // Opportunity Generator & Trend Search Modal State
  isGeneratorModalOpen: boolean;
  initialGeneratorQuery: string | null;
  openOpportunityGenerator: (initialQuery?: string) => void;
  closeOpportunityGenerator: () => void;
  ingestOpportunityWithApproval: (opp: Opportunity) => string;
  
  // In-Stage Customization Functions
  addCustomEvidence: (oppId: string, post: SignalEvidence['samplePosts'][0], additionalData?: { reach?: string; velocity?: number }) => void;
  updateOpportunityInsight: (oppId: string, insight: Partial<ConsumerInsight>) => void;
  updateStrategyBrief: (oppId: string, brief: Partial<StrategyBrief>) => void;
  addCustomCreativeConcept: (oppId: string, concept: CreativeConcept) => void;
  addCustomGovernanceCheck: (oppId: string, check: GovernanceCheckItem) => void;
  addCustomMarketLocalization: (oppId: string, market: LocalizationMarket) => void;
  addCustomLearningNote: (oppId: string, note: string) => void;
  addCustomIntelligenceSignal: (signal: Partial<IntelligenceSignal>) => void;
  
  // Demo Walkthrough Mode
  demoMode: boolean;
  demoStep: number;
  demoScenario: string;
  isPresenterMode: boolean;
  isDemoPlaying: boolean;
  setDemoStep: (step: number) => void;
  setDemoScenario: (scenarioId: string) => void;
  togglePresenterMode: () => void;
  setIsDemoPlaying: (playing: boolean | ((prev: boolean) => boolean)) => void;
  
  // Actions
  setActiveModule: (module: string) => void;
  selectOpportunity: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  setFilterBrand: (brand: string) => void;
  setFilterStatus: (status: string) => void;
  setFilterMarket: (market: string) => void;
  
  // Workflow Actions
  advanceOpportunityStage: (opportunityId: string, stage: WorkflowStage) => void;
  cancelPipelineStage: (opportunityId: string, stage: WorkflowStage, reason?: string) => void;
  resumePipelineStage: (opportunityId: string, stage: WorkflowStage) => void;
  retracePipeline: (opportunityId: string, targetStage: WorkflowStage, reason?: string) => void;
  resetOpportunityPipeline: (opportunityId: string, targetStartStage?: 'signal' | 'opportunity') => void;
  cancelLocalizationMarket: (opportunityId: string, marketId: string, reason?: string) => void;
  cancelCreativeConcept: (opportunityId: string, conceptId: string, reason?: string) => void;
  approveOpportunityDecision: (opportunityId: string, notes?: string) => void;
  modifyOpportunityDecision: (opportunityId: string, newOutcome: 'ACT' | 'WATCH' | 'IGNORE' | 'ESCALATE', reason: string) => void;
  rejectOpportunityDecision: (opportunityId: string) => void;
  approveStrategy: (opportunityId: string) => void;
  approveBrief: (opportunityId: string) => void;
  selectCreativeConcept: (opportunityId: string, conceptId: string) => void;
  approveGovernance: (opportunityId: string, notes?: string) => void;
  escalateGovernance: (opportunityId: string, notes?: string) => void;
  approveMarketLocalization: (opportunityId: string, marketId: string) => void;
  activateCampaign: (opportunityId: string) => void;
  applyLearningsToFuture: (opportunityId: string) => void;
  
  // Demo Controls
  startDemo: (scenarioId?: string) => void;
  nextDemoStep: () => void;
  prevDemoStep: () => void;
  skipDemoStep: () => void;
  restartDemo: () => void;
  exitDemo: () => void;
  resetAllData: () => void;
  
  // Notification Actions
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  
  // Selected Opportunity accessor
  selectedOpportunity: Opportunity | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'project_next_state_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeModule, setActiveModuleState] = useState<string>('command-center');
  const [selectedOpportunityId, setSelectedOpportunityId] = useState<string | null>(null);
  
  const [opportunities, setOpportunities] = useState<Opportunity[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_opps');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return SEEDED_OPPORTUNITIES;
  });

  const [workflows, setWorkflows] = useState<WorkflowItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_wf');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return SEEDED_WORKFLOWS;
  });

  const [campaigns, setCampaigns] = useState<CampaignItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_camps');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return SEEDED_CAMPAIGNS;
  });

  const [intelligenceSignals] = useState<IntelligenceSignal[]>(SEEDED_INTELLIGENCE);
  const [agents, setAgents] = useState<AIAgentDefinition[]>(SEEDED_AGENTS);
  const [notifications, setNotifications] = useState<UserNotification[]>(INITIAL_NOTIFICATIONS);

  const [userWorkspace] = useState<WorkspaceUser>({
    userName: 'Aarav Mehta',
    userRole: 'Brand Manager',
    brand: 'Rexona',
    market: 'India'
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterBrand, setFilterBrand] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterMarket, setFilterMarket] = useState<string>('All');

  // Demo Walkthrough Mode
  const [demoMode, setDemoMode] = useState<boolean>(false);
  const [demoStep, setDemoStep] = useState<number>(1);
  const [demoScenario, setDemoScenarioState] = useState<string>('opp-rexona-referee');
  const [isPresenterMode, setIsPresenterMode] = useState<boolean>(false);
  const [isDemoPlaying, setIsDemoPlaying] = useState<boolean>(false);

  const togglePresenterMode = () => {
    setIsPresenterMode(prev => !prev);
  };

  const setDemoScenario = (scenarioId: string) => {
    setDemoScenarioState(scenarioId);
    setSelectedOpportunityId(scenarioId);
    setDemoStep(1);
    setIsDemoPlaying(false);
  };

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_opps', JSON.stringify(opportunities));
      localStorage.setItem(STORAGE_KEY + '_wf', JSON.stringify(workflows));
      localStorage.setItem(STORAGE_KEY + '_camps', JSON.stringify(campaigns));
    } catch (e) {
      console.warn('Storage sync failed:', e);
    }
  }, [opportunities, workflows, campaigns]);

  const setActiveModule = (module: string) => {
    setActiveModuleState(module);
    if (module !== 'opportunities' && !module.startsWith('opportunity-')) {
      // Don't wipe selectedOpportunityId when navigating, but reset when leaving detail flow if needed
    }
  };

  const selectOpportunity = (id: string | null) => {
    setSelectedOpportunityId(id);
    if (id) {
      setActiveModuleState('opportunities');
    }
  };

  const selectedOpportunity = opportunities.find(o => o.id === selectedOpportunityId) || 
    (selectedOpportunityId ? undefined : opportunities.find(o => o.id === 'opp-rexona-referee'));

  // Notification helper
  const addNotification = (title: string, message: string, type: UserNotification['type'], oppId?: string) => {
    const newNotif: UserNotification = {
      id: 'notif-' + Date.now(),
      title,
      message,
      type,
      timestamp: 'Just now',
      read: false,
      opportunityId: oppId
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Helper to sync workflow item progress
  const syncWorkflowItem = (oppId: string, stage: WorkflowStage, progress: number, nextAction: string) => {
    setWorkflows(prev => prev.map(wf => {
      if (wf.opportunityId === oppId) {
        return {
          ...wf,
          currentStage: stage,
          stageLabel: stage.toUpperCase(),
          progressPercent: progress,
          nextAction,
          updatedAt: 'Just now'
        };
      }
      return wf;
    }));
  };

  const advanceOpportunityStage = (opportunityId: string, stage: WorkflowStage) => {
    const stageProgressMap: Record<WorkflowStage, number> = {
      signal: 15,
      insight: 25,
      opportunity: 35,
      strategy: 48,
      creative: 62,
      governance: 75,
      localization: 88,
      activation: 95,
      learning: 100
    };

    const stageNextActionMap: Record<WorkflowStage, string> = {
      signal: 'Synthesize & Validate Cultural Signal Ingestion',
      insight: 'Synthesize & Validate Consumer & Cultural Insight',
      opportunity: 'Evaluate AI Opportunity Scorecard & Human Gate',
      strategy: 'Review & Approve AI Strategy Blueprint',
      creative: 'Select & Approve Campaign Creative Direction',
      governance: 'Review Automated Governance & Safety Audit',
      localization: 'Review & Approve Localized Market Executions',
      activation: 'Deploy Multi-Market Live Activation Manifest',
      learning: 'Review Closed-Loop Learning & Attribution Telemetry'
    };

    const stageAuditNameMap: Record<WorkflowStage, string> = {
      signal: 'Signal Ingestion & Real-Time Evidence Validated',
      insight: 'Consumer & Cultural Insight Synthesized',
      opportunity: 'Opportunity Scorecard Evaluated & Ready for Human Gate',
      strategy: 'Strategic Blueprint & Messaging Guardrails Formulated',
      creative: 'Creative Studio Orchestrated (3 Formats)',
      governance: 'Governance, Brand Safety & Legal Cleared',
      localization: 'Multi-Market Creative Localizations Prepared',
      activation: 'Live Activation Manifest Compiled & Ready',
      learning: 'Closed-Loop Telemetry & Learnings Attributed'
    };

    const nowTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setOpportunities(prev => prev.map(opp => {
      if (opp.id === opportunityId) {
        const auditEntry: PipelineAuditEntry = {
          id: `audit-${Date.now()}`,
          stage,
          previousStage: opp.currentStage,
          targetStage: stage,
          action: 'ADVANCED',
          timestamp: nowTimestamp,
          actor: userWorkspace.userName,
          role: userWorkspace.userRole,
          reason: `Progressed to ${stage.toUpperCase()} stage`,
          details: stageAuditNameMap[stage] || `Advanced pipeline stage to ${stage}`
        };

        return {
          ...opp,
          currentStage: stage,
          stageProgress: stageProgressMap[stage] || opp.stageProgress,
          pipelineAuditHistory: [auditEntry, ...(opp.pipelineAuditHistory || [])]
        };
      }
      return opp;
    }));

    const progressVal = stageProgressMap[stage] || 35;
    const nextActionMsg = stageNextActionMap[stage] || `Review Stage: ${stage.toUpperCase()}`;
    syncWorkflowItem(opportunityId, stage, progressVal, nextActionMsg);

    // Update agent statuses dynamically based on stage
    setAgents(prev => prev.map(ag => {
      if (stage === 'signal' && ag.id === 'agent-1') return { ...ag, status: 'ACTIVE', currentTask: 'Validating real-time cultural telemetry' };
      if (stage === 'insight' && ag.id === 'agent-2') return { ...ag, status: 'ACTIVE', currentTask: 'Synthesizing psychological tension and brand implication' };
      if (stage === 'opportunity' && ag.id === 'agent-3') return { ...ag, status: 'ACTIVE', currentTask: 'Scoring opportunity dimensions and commercial potential' };
      if (stage === 'strategy' && ag.id === 'agent-4') return { ...ag, status: 'ACTIVE', currentTask: 'Synthesizing creative strategy blueprint' };
      if (stage === 'creative' && ag.id === 'agent-5') return { ...ag, status: 'ACTIVE', currentTask: 'Orchestrating 3 campaign creative directions' };
      if (stage === 'governance' && ag.id === 'agent-6') return { ...ag, status: 'ACTIVE', currentTask: 'Executing automated compliance audit' };
      if (stage === 'localization' && ag.id === 'agent-7') return { ...ag, status: 'ACTIVE', currentTask: 'Localizing creative packs for India, Brazil, UK' };
      if (stage === 'activation' && ag.id === 'agent-8') return { ...ag, status: 'ACTIVE', currentTask: 'Simulating multi-market live telemetry' };
      if (stage === 'learning' && ag.id === 'agent-9') return { ...ag, status: 'ACTIVE', currentTask: 'Synthesizing attribution insights & knowledge graph weights' };
      return ag;
    }));

    addNotification(
      `Pipeline Advanced: ${stage.toUpperCase()}`,
      stageAuditNameMap[stage] || `Opportunity moved to ${stage.toUpperCase()} stage.`,
      'opportunity',
      opportunityId
    );
  };

  const approveOpportunityDecision = (opportunityId: string, notes?: string) => {
    setOpportunities(prev => prev.map(opp => {
      if (opp.id === opportunityId) {
        return {
          ...opp,
          status: 'APPROVED',
          currentStage: 'strategy',
          stageProgress: 48,
          decisionTrace: {
            ...opp.decisionTrace,
            humanDecision: {
              decision: 'APPROVED',
              decidedBy: userWorkspace.userName,
              role: userWorkspace.userRole,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              notes: notes || 'Approved high-velocity cultural activation for Rexona stoppage time moment.'
            }
          }
        };
      }
      return opp;
    }));

    syncWorkflowItem(opportunityId, 'strategy', 48, 'Review & Approve AI Strategy Brief');
    addNotification(
      'Opportunity Approved by Brand Manager',
      'Rexona Football Moment moved to Strategy Stage. Strategy Agent activated.',
      'approval',
      opportunityId
    );
  };

  const modifyOpportunityDecision = (opportunityId: string, newOutcome: 'ACT' | 'WATCH' | 'IGNORE' | 'ESCALATE', reason: string) => {
    setOpportunities(prev => prev.map(opp => {
      if (opp.id === opportunityId) {
        return {
          ...opp,
          recommendation: newOutcome,
          status: newOutcome === 'ACT' ? 'ACT NOW' : newOutcome,
          decisionTrace: {
            ...opp.decisionTrace,
            humanDecision: {
              decision: 'MODIFIED',
              decidedBy: userWorkspace.userName,
              role: userWorkspace.userRole,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              notes: `Modified to ${newOutcome}: ${reason}`
            }
          }
        };
      }
      return opp;
    }));
  };

  const rejectOpportunityDecision = (opportunityId: string) => {
    setOpportunities(prev => prev.map(opp => {
      if (opp.id === opportunityId) {
        return {
          ...opp,
          status: 'IGNORE',
          decisionTrace: {
            ...opp.decisionTrace,
            humanDecision: {
              decision: 'REJECTED',
              decidedBy: userWorkspace.userName,
              role: userWorkspace.userRole,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              notes: 'Brand manager rejected action; opportunity archived.'
            }
          }
        };
      }
      return opp;
    }));
    syncWorkflowItem(opportunityId, 'opportunity', 100, 'Workflow Closed (Rejected)');
  };

  const approveStrategy = (opportunityId: string) => {
    setOpportunities(prev => prev.map(opp => {
      if (opp.id === opportunityId) {
        return {
          ...opp,
          currentStage: 'creative',
          stageProgress: 62,
          creativeBrief: {
            approved: true,
            approvedAt: 'Just now',
            content: opp.strategy || opp.creativeBrief?.content!
          }
        };
      }
      return opp;
    }));
    syncWorkflowItem(opportunityId, 'creative', 62, 'Select & Approve Creative Direction');
    addNotification(
      'Strategy & Brief Approved',
      'Creative Orchestrator has generated 3 campaign directions ready for review.',
      'approval',
      opportunityId
    );
  };

  const approveBrief = (opportunityId: string) => {
    approveStrategy(opportunityId);
  };

  const selectCreativeConcept = (opportunityId: string, conceptId: string) => {
    setOpportunities(prev => prev.map(opp => {
      if (opp.id === opportunityId) {
        const updatedConcepts = opp.creativeOptions.map(c => ({
          ...c,
          status: (c.id === conceptId ? 'SELECTED' : 'PENDING') as 'SELECTED' | 'PENDING' | 'REJECTED'
        }));
        return {
          ...opp,
          selectedCreativeId: conceptId,
          creativeOptions: updatedConcepts,
          currentStage: 'governance',
          stageProgress: 75
        };
      }
      return opp;
    }));
    syncWorkflowItem(opportunityId, 'governance', 75, 'Review Automated Governance & Safety Audit');
    addNotification(
      'Creative Concept 01 Selected',
      'Concept "Never Lose Your Cool" selected. Governance Agent running automated compliance checks.',
      'opportunity',
      opportunityId
    );
  };

  const approveGovernance = (opportunityId: string, notes?: string) => {
    setOpportunities(prev => prev.map(opp => {
      if (opp.id === opportunityId) {
        return {
          ...opp,
          currentStage: 'localization',
          stageProgress: 88,
          governance: {
            ...opp.governance,
            status: 'APPROVED',
            approvedBy: userWorkspace.userName + ' (Brand Manager)',
            timestamp: 'Just now',
            notes: notes || 'Passed 5-point automated check. Cleared for India, Brazil, UK localization.'
          }
        };
      }
      return opp;
    }));
    syncWorkflowItem(opportunityId, 'localization', 88, 'Review & Approve Localized Market Executions');
    addNotification(
      'Governance Cleared (94% Confidence)',
      'Brand & claims checks passed. Localization Agent generated India, Brazil & UK market packs.',
      'governance',
      opportunityId
    );
  };

  const escalateGovernance = (opportunityId: string, notes?: string) => {
    setOpportunities(prev => prev.map(opp => {
      if (opp.id === opportunityId) {
        return {
          ...opp,
          governance: {
            ...opp.governance,
            status: 'REVIEW_REQUIRED',
            notes: notes || 'Escalated to Unilever Legal & R&D claims council.'
          }
        };
      }
      return opp;
    }));
    addNotification(
      'Governance Escalated to Legal / R&D',
      'Manual risk review required before campaign can proceed to localization.',
      'sla',
      opportunityId
    );
  };

  const approveMarketLocalization = (opportunityId: string, marketId: string) => {
    setOpportunities(prev => prev.map(opp => {
      if (opp.id === opportunityId) {
        const updatedLocalizations = opp.localizations.map(loc => 
          loc.marketId === marketId ? { ...loc, status: 'APPROVED' as const } : loc
        );
        const allApproved = updatedLocalizations.every(loc => loc.status === 'APPROVED');
        return {
          ...opp,
          localizations: updatedLocalizations,
          currentStage: allApproved ? 'activation' : opp.currentStage,
          stageProgress: allApproved ? 95 : opp.stageProgress,
          activation: {
            ...opp.activation,
            status: allApproved ? 'READY' : opp.activation.status
          }
        };
      }
      return opp;
    }));

    addNotification(
      `Market Approved: ${marketId.toUpperCase()}`,
      `Localized creative pack for ${marketId.toUpperCase()} approved by Brand Manager.`,
      'approval',
      opportunityId
    );
  };

  const activateCampaign = (opportunityId: string) => {
    setOpportunities(prev => prev.map(opp => {
      if (opp.id === opportunityId) {
        return {
          ...opp,
          status: 'ACTIVATED',
          currentStage: 'learning',
          stageProgress: 100,
          activation: {
            ...opp.activation,
            status: 'ACTIVATED',
            activatedAt: 'Just now'
          }
        };
      }
      return opp;
    }));

    // Update or insert into campaigns list
    setCampaigns(prev => {
      const opp = opportunities.find(o => o.id === opportunityId);
      const existingCamp = prev.find(c => c.id === `camp-${opportunityId}` || (opportunityId === 'opp-1' && c.id === 'camp-1'));
      if (existingCamp) {
        return prev.map(c => c.id === existingCamp.id ? { ...c, stage: 'Activated', liveSince: 'Just now' } : c);
      }
      if (opp) {
        const newCamp: CampaignItem = {
          id: `camp-${opp.id}`,
          name: opp.title,
          brand: opp.brand,
          markets: opp.localizations ? opp.localizations.map(l => l.marketName) : [opp.market],
          stage: 'Activated',
          approvalStatus: 'Approved',
          channels: opp.activation?.channels || ['Instagram Reels', 'TikTok', 'X', 'Blinkit'],
          liveSince: 'Just now',
          reach: opp.signal?.evidence?.estimatedReach || '2.4M Estimated',
          engagementRate: '6.8%',
          sentiment: `${opp.signal?.evidence?.positiveSentimentPercent || 88}% Positive`,
          roi: '4.2x Target',
          creativeThumbnail: 'sports'
        };
        return [newCamp, ...prev];
      }
      return prev;
    });

    syncWorkflowItem(opportunityId, 'learning', 100, 'Campaign Active • Continuous AI Learning Loop');
    addNotification(
      '🚀 Campaign Live & Activated!',
      `Campaign activated across social ad networks, retail media and instant commerce delivery channels.`,
      'activation',
      opportunityId
    );
  };

  const applyLearningsToFuture = (opportunityId: string) => {
    setOpportunities(prev => prev.map(opp => {
      if (opp.id === opportunityId && opp.learnings) {
        return {
          ...opp,
          learnings: {
            ...opp.learnings,
            appliedToFuture: true
          }
        };
      }
      return opp;
    }));
    addNotification(
      'AI Learning Applied to System Weights',
      'High-velocity sports stoppage moment response patterns stored to Unilever NEXT Knowledge Graph.',
      'opportunity',
      opportunityId
    );
  };

  // Pipeline Management Actions: Cancel Part, Retrace Pipeline, Reset Pipeline
  const cancelPipelineStage = (opportunityId: string, stage: WorkflowStage, reason?: string) => {
    const defaultReason = reason || `Stage "${stage.toUpperCase()}" execution was cancelled by Brand Manager.`;
    const nowTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setOpportunities(prev => prev.map(opp => {
      if (opp.id === opportunityId) {
        const currentCanceled = opp.canceledStages || [];
        const updatedCanceled = currentCanceled.includes(stage) ? currentCanceled : [...currentCanceled, stage];
        const updatedReasons = {
          ...(opp.canceledStageReasons || {}),
          [stage]: defaultReason
        };

        const auditEntry: PipelineAuditEntry = {
          id: `audit-${Date.now()}`,
          stage,
          action: 'CANCELED',
          timestamp: nowTimestamp,
          actor: userWorkspace.userName,
          role: userWorkspace.userRole,
          reason: defaultReason,
          details: `Cancelled stage "${stage}" in pipeline. Downstream tasks paused.`
        };

        const isCurrent = opp.currentStage === stage;

        return {
          ...opp,
          canceledStages: updatedCanceled,
          canceledStageReasons: updatedReasons,
          isPipelinePaused: isCurrent ? true : opp.isPipelinePaused,
          status: isCurrent ? 'BLOCKED' : opp.status,
          pipelineAuditHistory: [auditEntry, ...(opp.pipelineAuditHistory || [])]
        };
      }
      return opp;
    }));

    setWorkflows(prev => prev.map(wf => {
      if (wf.opportunityId === opportunityId) {
        return {
          ...wf,
          status: 'PAUSED',
          nextAction: `Stage ${stage.toUpperCase()} Canceled: ${defaultReason}`,
          updatedAt: 'Just now'
        };
      }
      return wf;
    }));

    addNotification(
      `⛔ Pipeline Stage Cancelled: ${stage.toUpperCase()}`,
      defaultReason,
      'sla',
      opportunityId
    );
  };

  const resumePipelineStage = (opportunityId: string, stage: WorkflowStage) => {
    const nowTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setOpportunities(prev => prev.map(opp => {
      if (opp.id === opportunityId) {
        const updatedCanceled = (opp.canceledStages || []).filter(s => s !== stage);
        const updatedReasons = { ...(opp.canceledStageReasons || {}) };
        delete updatedReasons[stage];

        const auditEntry: PipelineAuditEntry = {
          id: `audit-${Date.now()}`,
          stage,
          action: 'RESUMED',
          timestamp: nowTimestamp,
          actor: userWorkspace.userName,
          role: userWorkspace.userRole,
          details: `Resumed stage "${stage}". Removed cancellation block.`
        };

        return {
          ...opp,
          canceledStages: updatedCanceled,
          canceledStageReasons: updatedReasons,
          isPipelinePaused: updatedCanceled.length > 0,
          status: opp.status === 'BLOCKED' ? 'IN PROGRESS' : opp.status,
          pipelineAuditHistory: [auditEntry, ...(opp.pipelineAuditHistory || [])]
        };
      }
      return opp;
    }));

    addNotification(
      `▶️ Pipeline Stage Resumed: ${stage.toUpperCase()}`,
      `Cancellation removed. Pipeline resumed by ${userWorkspace.userName}.`,
      'opportunity',
      opportunityId
    );
  };

  const retracePipeline = (opportunityId: string, targetStage: WorkflowStage, reason?: string) => {
    const stageProgressMap: Record<WorkflowStage, number> = {
      signal: 15,
      insight: 25,
      opportunity: 38,
      strategy: 48,
      creative: 62,
      governance: 75,
      localization: 88,
      activation: 95,
      learning: 100
    };

    const stageOrder: WorkflowStage[] = [
      'signal', 'insight', 'opportunity', 'strategy', 'creative', 'governance', 'localization', 'activation', 'learning'
    ];

    const targetIdx = stageOrder.indexOf(targetStage);
    const defaultReason = reason || `Retraced pipeline to ${targetStage.toUpperCase()} by Brand Manager.`;
    const nowTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setOpportunities(prev => prev.map(opp => {
      if (opp.id === opportunityId) {
        const auditEntry: PipelineAuditEntry = {
          id: `audit-${Date.now()}`,
          stage: targetStage,
          previousStage: opp.currentStage,
          targetStage,
          action: 'RETRACED',
          timestamp: nowTimestamp,
          actor: userWorkspace.userName,
          role: userWorkspace.userRole,
          reason: defaultReason,
          details: `Pipeline rolled back from ${opp.currentStage.toUpperCase()} to ${targetStage.toUpperCase()}`
        };

        let updatedCreativeBrief = opp.creativeBrief;
        if (targetIdx < stageOrder.indexOf('creative')) {
          if (updatedCreativeBrief) {
            updatedCreativeBrief = { ...updatedCreativeBrief, approved: false };
          }
        }

        let updatedGovernance = opp.governance;
        if (targetIdx < stageOrder.indexOf('governance')) {
          updatedGovernance = {
            ...opp.governance,
            status: 'PENDING'
          };
        }

        let updatedLocalizations = opp.localizations;
        if (targetIdx < stageOrder.indexOf('localization')) {
          updatedLocalizations = opp.localizations.map(l => ({ ...l, status: 'PENDING' as const }));
        }

        let updatedActivation = opp.activation;
        if (targetIdx < stageOrder.indexOf('activation')) {
          if (opp.activation.status === 'ACTIVATED') {
            updatedActivation = { ...opp.activation, status: 'READY' };
          }
        }

        const updatedCanceled = (opp.canceledStages || []).filter(s => stageOrder.indexOf(s) < targetIdx);

        return {
          ...opp,
          currentStage: targetStage,
          stageProgress: stageProgressMap[targetStage] || 30,
          status: targetStage === 'signal' ? 'ACT NOW' : targetStage === 'learning' ? 'ACTIVATED' : 'IN PROGRESS',
          isPipelinePaused: false,
          canceledStages: updatedCanceled,
          creativeBrief: updatedCreativeBrief,
          governance: updatedGovernance,
          localizations: updatedLocalizations,
          activation: updatedActivation,
          pipelineAuditHistory: [auditEntry, ...(opp.pipelineAuditHistory || [])]
        };
      }
      return opp;
    }));

    syncWorkflowItem(opportunityId, targetStage, stageProgressMap[targetStage] || 30, `Retraced to ${targetStage.toUpperCase()} • Review & Continue`);

    addNotification(
      `⏪ Pipeline Retraced to ${targetStage.toUpperCase()}`,
      defaultReason,
      'opportunity',
      opportunityId
    );
  };

  const resetOpportunityPipeline = (opportunityId: string, targetStartStage: 'signal' | 'opportunity' = 'signal') => {
    const nowTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const auditEntry: PipelineAuditEntry = {
      id: `audit-${Date.now()}`,
      stage: targetStartStage,
      action: 'RESET',
      timestamp: nowTimestamp,
      actor: userWorkspace.userName,
      role: userWorkspace.userRole,
      reason: `Full pipeline reset to ${targetStartStage.toUpperCase()}`,
      details: 'All downstream stage approvals, creative selections, governance gates, and activations reset to clean baseline.'
    };

    setOpportunities(prev => prev.map(opp => {
      if (opp.id === opportunityId) {
        return {
          ...opp,
          currentStage: targetStartStage,
          stageProgress: targetStartStage === 'signal' ? 15 : 38,
          status: 'ACT NOW',
          isPipelinePaused: false,
          canceledStages: [],
          canceledStageReasons: {},
          selectedCreativeId: undefined,
          creativeOptions: opp.creativeOptions.map(c => ({ ...c, status: 'PENDING' as const })),
          creativeBrief: opp.creativeBrief ? { ...opp.creativeBrief, approved: false } : undefined,
          governance: {
            ...opp.governance,
            status: 'PENDING',
            approvedBy: undefined,
            notes: undefined
          },
          localizations: opp.localizations.map(l => ({ ...l, status: 'PENDING' as const })),
          activation: {
            ...opp.activation,
            status: 'DRAFT',
            activatedAt: undefined
          },
          decisionTrace: {
            ...opp.decisionTrace,
            humanDecision: undefined
          },
          pipelineAuditHistory: [auditEntry, ...(opp.pipelineAuditHistory || [])]
        };
      }
      return opp;
    }));

    syncWorkflowItem(opportunityId, targetStartStage, targetStartStage === 'signal' ? 15 : 38, 'Pipeline Reset • Ready for Ingestion & Decision');

    addNotification(
      `🔄 Pipeline Reset: ${targetStartStage.toUpperCase()}`,
      `Pipeline for opportunity reset to clean initial state. Downstream stages cleared.`,
      'opportunity',
      opportunityId
    );
  };

  const cancelLocalizationMarket = (opportunityId: string, marketId: string, reason?: string) => {
    const defaultReason = reason || 'Market dropped by brand localization team.';
    setOpportunities(prev => prev.map(opp => {
      if (opp.id === opportunityId) {
        const updatedLocalizations = opp.localizations.map(loc => 
          loc.marketId === marketId ? { ...loc, status: 'CANCELED' as const, canceledReason: defaultReason } : loc
        );
        return {
          ...opp,
          localizations: updatedLocalizations
        };
      }
      return opp;
    }));

    addNotification(
      `Market Execution Cancelled: ${marketId.toUpperCase()}`,
      defaultReason,
      'sla',
      opportunityId
    );
  };

  const cancelCreativeConcept = (opportunityId: string, conceptId: string, reason?: string) => {
    setOpportunities(prev => prev.map(opp => {
      if (opp.id === opportunityId) {
        const updatedConcepts = opp.creativeOptions.map(c => 
          c.id === conceptId ? { ...c, status: 'REJECTED' as const } : c
        );
        return {
          ...opp,
          creativeOptions: updatedConcepts,
          selectedCreativeId: opp.selectedCreativeId === conceptId ? undefined : opp.selectedCreativeId
        };
      }
      return opp;
    }));
  };

  // Ingest Modal & Custom Signal State
  const [isIngestModalOpen, setIsIngestModalOpen] = useState<boolean>(false);
  const [initialIngestTemplate, setInitialIngestTemplate] = useState<string | null>(null);

  const openIngestModal = (templateKey?: string) => {
    setInitialIngestTemplate(templateKey || null);
    setIsIngestModalOpen(true);
  };

  const closeIngestModal = () => {
    setIsIngestModalOpen(false);
    setInitialIngestTemplate(null);
  };

  // Opportunity Generator & Trend Search Modal State
  const [isGeneratorModalOpen, setIsGeneratorModalOpen] = useState<boolean>(false);
  const [initialGeneratorQuery, setInitialGeneratorQuery] = useState<string | null>(null);

  const openOpportunityGenerator = (initialQuery?: string) => {
    setInitialGeneratorQuery(initialQuery || null);
    setIsGeneratorModalOpen(true);
  };

  const closeOpportunityGenerator = () => {
    setIsGeneratorModalOpen(false);
    setInitialGeneratorQuery(null);
  };

  const ingestOpportunityWithApproval = (opp: Opportunity): string => {
    // Prepend approved opportunity to state
    setOpportunities(prev => [opp, ...prev]);

    // Create workflow item
    const newWorkflowItem: WorkflowItem = {
      id: 'wf-' + opp.id,
      opportunityId: opp.id,
      title: opp.title,
      brand: opp.brand,
      market: opp.market,
      currentStage: opp.currentStage || 'signal',
      stageLabel: (opp.currentStage || 'SIGNAL').toUpperCase(),
      progressPercent: opp.stageProgress || 18,
      owner: userWorkspace.userName,
      nextAction: 'Review Evidence & Advance Strategic Brief',
      slaRemaining: '5h 00m',
      status: 'ACTIVE',
      risk: opp.risk,
      updatedAt: 'Just now'
    };
    setWorkflows(prev => [newWorkflowItem, ...prev]);

    // Add high-priority notification
    addNotification(
      `✨ Opportunity Approved & Ingested: ${opp.title}`,
      `Human sign-off granted for ${opp.brand} (${opp.market}). Potential Score: ${opp.score.overall}/100. AI Nodes initialized.`,
      'approval',
      opp.id
    );

    // Select and navigate to opportunity view
    setSelectedOpportunityId(opp.id);
    setActiveModuleState('opportunities');
    setIsGeneratorModalOpen(false);

    return opp.id;
  };

  // Ingest Custom Signal Engine
  const ingestCustomSignal = (input: CustomSignalInput): string => {
    const oppId = 'opp-custom-' + Date.now();
    const brandName = (input.brand || 'Rexona') as Opportunity['brand'];
    const marketName = input.market || 'India';
    const categoryName = input.category || 'Cultural Momentum';
    const titleText = input.title || 'Emerging Cultural Moment';
    const velocity = input.velocityPercent || 88;
    const reach = input.observedReach || '1.8M impressions';
    const sentiment = input.sentimentPercent || 84;

    const overallScore = Math.min(97, Math.max(76, Math.round(velocity * 0.45 + (sentiment * 0.35) + 20)));
    const recommendation: 'ACT' | 'WATCH' = overallScore >= 80 ? 'ACT' : 'WATCH';

    // Build realistic 9-stage data for this newly ingested signal
    const newOpportunity: Opportunity = {
      id: oppId,
      title: titleText,
      brand: brandName,
      market: marketName,
      category: categoryName,
      detectedAt: 'Just now (User Ingestion)',
      summary: input.rawText 
        ? (input.rawText.slice(0, 180) + (input.rawText.length > 180 ? '...' : '')) 
        : `User-ingested cultural signal for ${brandName} in ${marketName}. High engagement velocity and consumer conversation volume.`,
      score: {
        overall: overallScore,
        brandFit: Math.min(98, Math.round(overallScore * 0.95 + 4)),
        consumerRelevance: Math.min(96, Math.round(velocity * 0.9 + 5)),
        culturalRelevance: Math.min(95, Math.round(velocity * 0.92 + 3)),
        velocity: velocity,
        commercialPotential: Math.min(92, Math.round(overallScore * 0.88 + 8)),
        executionFeasibility: 89,
        risk: 'LOW'
      },
      recommendation: recommendation,
      recommendationReason: `High-velocity cultural resonance (${velocity}%) aligned directly with ${brandName}'s core brand promise. Clear activation window in ${marketName}.`,
      status: recommendation === 'ACT' ? 'ACT NOW' : 'WATCH',
      risk: 'LOW',
      owner: `${userWorkspace.userName} (${userWorkspace.userRole})`,
      currentStage: 'signal',
      stageProgress: 18,
      
      signal: {
        description: input.rawText || `User-submitted signal: "${titleText}". Active consumer discussions across social channels with surging velocity.`,
        evidence: {
          socialMentions: `${Math.round(velocity * 240).toLocaleString()}+ mentions/hr`,
          estimatedReach: reach,
          velocityPercent: velocity,
          positiveSentimentPercent: sentiment,
          memeReplication: velocity > 80 ? 'High' : 'Medium',
          targetAudienceConcentration: `Gen Z & Urban Millennials (${marketName})`,
          sourcePlatforms: input.sourcePlatforms || ['Instagram', 'X', 'TikTok', 'YouTube'],
          samplePosts: [
            input.samplePost ? {
              platform: input.samplePost.platform === 'Reviews' || input.samplePost.platform === 'Reddit' ? 'X' : input.samplePost.platform,
              author: input.samplePost.author || 'Cultural Observer',
              handle: input.samplePost.handle || '@trend_tracker',
              content: input.samplePost.content || input.rawText || `Just witnessed this crazy moment happen in ${marketName}. Everyone is talking about it!`,
              engagement: input.samplePost.engagement || '42.5K likes • 8.1K shares',
              timestamp: '15m ago'
            } : {
              platform: 'Instagram',
              author: 'Viral Creator',
              handle: '@culture_insider',
              content: input.rawText || `Can we talk about how wild this trend is getting in ${marketName}? Literally everyone is testing this!`,
              engagement: '58.4K likes • 12.2K shares',
              timestamp: '22m ago'
            },
            {
              platform: 'X',
              author: 'Brand Analyst',
              handle: '@marketing_pulse',
              content: `The consumer reaction to #${titleText.replace(/\s+/g, '')} is fascinating. Perfect organic hook for ${brandName}.`,
              engagement: '14.2K likes • 3.4K reposts',
              timestamp: '45m ago'
            }
          ],
          trendData: [
            { time: 'T-6h', volume: 180, sentiment: 75 },
            { time: 'T-4h', volume: 460, sentiment: 80 },
            { time: 'T-2h', volume: 1420, sentiment: 84 },
            { time: 'T-1h', volume: 2900, sentiment: sentiment },
            { time: 'Now', volume: 4800, sentiment: sentiment }
          ]
        }
      },

      insight: {
        headline: `Consumers actively seek composure and high-performance reassurance during high-tension "${titleText}" moments.`,
        consumerBehaviour: `Audiences are turning organic cultural banter into communal memes, looking for authentic brand participation rather than passive corporate advertising.`,
        culturalTension: `High stakes and public scrutiny generate anxiety; people look for relatable cultural moments that reward confidence and resilience.`,
        brandImplication: `${brandName} has the credible right to enter this conversation by dramatizing protection, confidence, and effortless cool under pressure.`,
        opportunityWindow: 'Active 24-48 hour reactive window before cultural fatigue.'
      },

      decisionTrace: {
        evidenceConsidered: [
          `Surging consumer velocity at +${velocity}% over baseline`,
          `Positive sentiment index of ${sentiment}% in ${marketName}`,
          `Strong brand alignment with ${brandName}'s core performance DNA`,
          `No trademark infringement or celebrity rights liabilities detected`
        ],
        decisionLogic: `Evaluated 4 Decision Thresholds: Commercial Upside (High), Brand Fit (94%), Execution Feasibility (89%), Regulatory Risk (Low). System outcome: ${recommendation}.`
      },

      strategy: {
        objective: `Turn organic conversation around "${titleText}" into high-recall brand engagement and quick-commerce basket conversion for ${brandName}.`,
        audience: `Urban Gen Z & Millennial consumers, active social participants, culturally savvy shoppers.`,
        brandRole: `The witty, confident partner that protects your composure when the pressure is on.`,
        coreMessage: `Stay 100% composed — ${brandName} has your back no matter the heat.`,
        channels: ['Instagram Reels', 'TikTok / YouTube Shorts', 'X Real-Time', 'Blinkit / Zepto / Amazon Instant Delivery'],
        recommendedFormats: ['Reactive 9:16 Video Asset', 'Contextual Social Carousel', 'Instant Commerce Hero Banner'],
        activationWindow: 'Immediate 48-Hour Tactical Sprint',
        kpis: ['Engagement Rate > 4.5%', 'Brand Mentions Velocity +40%', 'Instant Commerce CTR > 2.8%'],
        mandatoryRules: [
          `Must feature official ${brandName} branding & packaging`,
          'No disparagement of individuals or competitors',
          'Must include verified efficacy claim boilerplate'
        ],
        claimsRequirements: ['Scientifically proven 72h sweat & odour protection claim clearance', 'Non-staining formulation badge'],
        creativeTerritory: 'High-Velocity Cultural Commentary'
      },

      creativeOptions: [
        {
          id: 'concept-custom-1',
          number: '01',
          title: 'Never Lose Your Cool',
          tone: 'Witty, Confident, High-Energy',
          headline: `When the pressure peaks at ${titleText}, we stay ice cold.`,
          coreIdea: `Dramatize high-stakes moments with side-by-side split screen showing real pressure vs effortless ${brandName} protection.`,
          caption: `Pressure is inevitable. Sweating it? Optional. ⚡ Stay 100% confident with ${brandName} 72h Protection. #NeverLoseYourCool`,
          visualDirection: `Dynamic motion split-screen with neon typography overlays, rapid cuts, and crisp product macro condensation close-ups.`,
          recommendedPlatform: 'Instagram Reels & TikTok',
          brandRationale: `Highlights ${brandName}'s core performance protection claim while riding the cultural momentum of ${titleText}.`,
          aspectRatio: '9:16',
          assetType: 'Short-form Video',
          routingTarget: 'Social Content Engine + Quick Commerce Blinkit Link',
          status: 'PENDING'
        },
        {
          id: 'concept-custom-2',
          number: '02',
          title: 'The Composure Test',
          tone: 'Empowering, Relatable, Punchy',
          headline: `Tested by real moments. Backed by science.`,
          coreIdea: `Micro-interviews and street vox-pop capturing unfiltered consumer reactions to ${titleText} with product sampling reveal.`,
          caption: `We put ${brandName} through the ultimate test during ${titleText}. Result: Zero sweat, 100% confidence.`,
          visualDirection: `Documentary-style hand-held camera look, bold white tracking text, authentic reactions with product hero end-card.`,
          recommendedPlatform: 'YouTube Shorts & X',
          brandRationale: `Builds authenticity through social proof and relatable human emotion.`,
          aspectRatio: '9:16',
          assetType: 'Reactive Social',
          routingTarget: 'Performance Paid Amplification',
          status: 'PENDING'
        },
        {
          id: 'concept-custom-3',
          number: '03',
          title: 'Instant Defense Pack',
          tone: 'Direct, Tactical, Benefit-Led',
          headline: `Don't let the moment catch you unprepared.`,
          coreIdea: `Contextual instant-commerce push tied to real-time spikes in search around ${titleText}.`,
          caption: `Delivered to your doorstep in 10 minutes. Stay fresh, stay unstoppable with ${brandName}.`,
          visualDirection: `Clean studio 3D render of the product pack with bold delivery countdown badge and instant discount callout.`,
          recommendedPlatform: 'Blinkit / Zepto / Amazon Ads',
          brandRationale: `Converts cultural attention directly into quick-commerce transactions.`,
          aspectRatio: '1:1',
          assetType: 'Static Visual',
          routingTarget: 'Quick Commerce Engine',
          status: 'PENDING'
        }
      ],

      governance: {
        confidencePercent: 94,
        status: 'PENDING',
        checks: [
          {
            id: 'gov-c-1',
            name: 'Unilever Brand Safety & Tone Guidelines',
            category: 'Brand Compliance',
            status: 'PASS',
            details: 'Tone aligns with brand positioning and Unilever progressive gender representation standards.'
          },
          {
            id: 'gov-c-2',
            name: 'R&D Product Claims Verification',
            category: 'Claims',
            status: 'PASS',
            details: '72h protection and antiperspirant efficacy claims validated in Unilever Global Claims Dossier.'
          },
          {
            id: 'gov-c-3',
            name: 'IP & Third-Party Copyright Screen',
            category: 'Market Risk',
            status: 'PASS',
            details: 'All visual assets are 100% original and license-free; no protected trademarks referenced.'
          },
          {
            id: 'gov-c-4',
            name: 'Cultural Sensitivity & Regional Nuances',
            category: 'Cultural Risk',
            status: 'PASS',
            details: `Cleared for ${marketName} market nuances with zero sensitive religious or political touchpoints.`
          }
        ]
      },

      localizations: [
        {
          marketId: 'india',
          marketName: 'India',
          countryCode: 'IN',
          flag: '🇮🇳',
          status: 'PENDING',
          language: 'English / Hinglish',
          localHeadline: `Jab match aur pressure ho intense, Rexona rakhe full confidence!`,
          localCaption: `No sweat, only game. 72 Ghante Freshness ke saath stay unstoppable. #RexonaIndia`,
          culturalAdaptation: 'Adapted tone to high-energy Hinglish with colloquial cricket & street banter nuances.',
          channel: 'Instagram Reels & Blinkit 10-Min Delivery',
          format: '9:16 Video + Instant Commerce Banner',
          cta: 'Order on Blinkit in 10 Mins',
          governanceNote: 'ASCI advertising code compliant.',
          reviewer: 'Priya Sharma (Unilever South Asia)'
        },
        {
          marketId: 'brazil',
          marketName: 'Brazil',
          countryCode: 'BR',
          flag: '🇧🇷',
          status: 'PENDING',
          language: 'Portuguese',
          localHeadline: `Rexona não te abandona nem no último minuto.`,
          localCaption: `Pressão máxima no jogo? Sua proteção tá garantida por 72 horas. #RexonaNaoTeAbandona`,
          culturalAdaptation: 'Anchored around the iconic "Não Te Abandona" local brand equity and football passion.',
          channel: 'TikTok & WhatsApp Status Push',
          format: '9:16 Vertical Story',
          cta: 'Compre com 15% OFF no iFood',
          governanceNote: 'CONAR self-regulation cleared.',
          reviewer: 'Rodrigo Silva (Unilever LatAm)'
        },
        {
          marketId: 'uk',
          marketName: 'United Kingdom',
          countryCode: 'GB',
          flag: '🇬🇧',
          status: 'PENDING',
          language: 'British English',
          localHeadline: `It won't let you down when the pressure builds.`,
          localCaption: `Stoppage time nerves? Sure 72H NonStop Protection keeps you dry no matter what. #SureUK`,
          culturalAdaptation: 'Switched brand name to "Sure" (UK brand identity) with witty British understatement tone.',
          channel: 'X (Twitter) Matchday Feed & Deliveroo Hop',
          format: 'Contextual In-Feed Card',
          cta: 'Get Sure on Amazon Prime',
          governanceNote: 'ASA / CAP Code compliant.',
          reviewer: 'Emma Watson (Unilever UK & Ireland)'
        }
      ],

      activation: {
        status: 'DRAFT',
        channels: ['Instagram', 'TikTok', 'X', 'Blinkit Instant Commerce'],
        assetsCount: 3,
        telemetry: {
          impressions: 0,
          engagements: 0,
          sentimentScore: sentiment,
          ctr: 0,
          shares: 0
        }
      },

      learnings: {
        whatWorked: `Rapid reactive response to ${titleText} unlocked high consumer resonance within the first 12 hours.`,
        audienceLearning: `Audiences engaged 3.2x more with witty, reactive split-screens compared to generic brand hero films.`,
        creativeLearning: `Pairing social video with direct 10-minute quick commerce delivery links yielded highest conversion.`,
        recommendation: `Incorporate real-time cultural moments into standard always-on brand playbooks.`,
        appliedToFuture: false
      }
    };

    // Prepend to opportunities list
    setOpportunities(prev => [newOpportunity, ...prev]);

    // Create workflow item
    const newWorkflowItem: WorkflowItem = {
      id: 'wf-' + oppId,
      opportunityId: oppId,
      title: titleText,
      brand: brandName,
      market: marketName,
      currentStage: 'signal',
      stageLabel: 'SIGNAL & EVIDENCE',
      progressPercent: 18,
      owner: userWorkspace.userName,
      nextAction: 'Review Ingested Evidence & AI Insight',
      slaRemaining: '4h 30m',
      status: 'ACTIVE',
      risk: 'LOW',
      updatedAt: 'Just now'
    };
    setWorkflows(prev => [newWorkflowItem, ...prev]);

    // Add notification
    addNotification(
      `Signal Ingested: ${titleText}`,
      `AI Pipeline evaluated "${titleText}" for ${brandName} in ${marketName}. System Outcome: ${recommendation}.`,
      'opportunity',
      oppId
    );

    // Select and navigate
    setSelectedOpportunityId(oppId);
    setActiveModuleState('opportunities');

    return oppId;
  };

  // In-Stage Customization Handlers
  const addCustomEvidence = (oppId: string, post: SignalEvidence['samplePosts'][0], additionalData?: { reach?: string; velocity?: number }) => {
    setOpportunities(prev => prev.map(opp => {
      if (opp.id === oppId) {
        const updatedPosts = [post, ...opp.signal.evidence.samplePosts];
        const updatedReach = additionalData?.reach || opp.signal.evidence.estimatedReach;
        const updatedVelocity = additionalData?.velocity !== undefined ? additionalData.velocity : opp.signal.evidence.velocityPercent;
        return {
          ...opp,
          signal: {
            ...opp.signal,
            evidence: {
              ...opp.signal.evidence,
              samplePosts: updatedPosts,
              estimatedReach: updatedReach,
              velocityPercent: updatedVelocity
            }
          }
        };
      }
      return opp;
    }));
    addNotification(
      'Custom Evidence Added',
      `New evidence from @${post.handle} added to opportunity evidence dossier.`,
      'opportunity',
      oppId
    );
  };

  const updateOpportunityInsight = (oppId: string, insight: Partial<ConsumerInsight>) => {
    setOpportunities(prev => prev.map(opp => {
      if (opp.id === oppId) {
        return {
          ...opp,
          insight: {
            ...opp.insight,
            ...insight
          }
        };
      }
      return opp;
    }));
    addNotification(
      'Consumer Insight Refined',
      'User refined the core cultural tension and brand implication.',
      'approval',
      oppId
    );
  };

  const updateStrategyBrief = (oppId: string, brief: Partial<StrategyBrief>) => {
    setOpportunities(prev => prev.map(opp => {
      if (opp.id === oppId && opp.strategy) {
        const updated = { ...opp.strategy, ...brief };
        return {
          ...opp,
          strategy: updated,
          creativeBrief: opp.creativeBrief ? { ...opp.creativeBrief, content: updated } : undefined
        };
      }
      return opp;
    }));
    addNotification(
      'Strategy Brief Updated',
      'Strategic requirements and mandatory brand guardrails updated.',
      'approval',
      oppId
    );
  };

  const addCustomCreativeConcept = (oppId: string, concept: CreativeConcept) => {
    setOpportunities(prev => prev.map(opp => {
      if (opp.id === oppId) {
        return {
          ...opp,
          creativeOptions: [...opp.creativeOptions, concept]
        };
      }
      return opp;
    }));
    addNotification(
      'Custom Creative Direction Added',
      `Concept "${concept.title}" added to creative evaluation options.`,
      'opportunity',
      oppId
    );
  };

  const addCustomGovernanceCheck = (oppId: string, check: GovernanceCheckItem) => {
    setOpportunities(prev => prev.map(opp => {
      if (opp.id === oppId) {
        return {
          ...opp,
          governance: {
            ...opp.governance,
            checks: [...opp.governance.checks, check]
          }
        };
      }
      return opp;
    }));
    addNotification(
      'Compliance Check Added',
      `Added custom check: "${check.name}" to governance audit matrix.`,
      'governance',
      oppId
    );
  };

  const addCustomMarketLocalization = (oppId: string, market: LocalizationMarket) => {
    setOpportunities(prev => prev.map(opp => {
      if (opp.id === oppId) {
        return {
          ...opp,
          localizations: [...opp.localizations, market]
        };
      }
      return opp;
    }));
    addNotification(
      `New Market Added: ${market.marketName}`,
      `Custom localization for ${market.marketName} added to multi-market rollout.`,
      'approval',
      oppId
    );
  };

  const addCustomLearningNote = (oppId: string, note: string) => {
    setOpportunities(prev => prev.map(opp => {
      if (opp.id === oppId) {
        const currentLearnings = opp.learnings || {
          whatWorked: '',
          audienceLearning: '',
          creativeLearning: '',
          recommendation: '',
          appliedToFuture: false
        };
        return {
          ...opp,
          learnings: {
            ...currentLearnings,
            whatWorked: currentLearnings.whatWorked ? `${currentLearnings.whatWorked} • ${note}` : note
          }
        };
      }
      return opp;
    }));
    addNotification(
      'Learning Retrospective Appended',
      'Empirical learning stored into Unilever NEXT Brand Memory.',
      'opportunity',
      oppId
    );
  };

  const addCustomIntelligenceSignal = (signal: Partial<IntelligenceSignal>) => {
    const newSignal: IntelligenceSignal = {
      id: 'sig-' + Date.now(),
      title: signal.title || 'Emerging Category Movement',
      category: signal.category || 'Sports Culture',
      brandAlignment: signal.brandAlignment || 'Rexona & Sure',
      volume: signal.volume || '14.2K mentions',
      velocityPercent: signal.velocityPercent || 85,
      sentimentPercent: signal.sentimentPercent || 80,
      relevanceScore: signal.relevanceScore || 92,
      status: signal.status || 'EMERGING',
      detectedAt: 'Just now (User submission)',
      summary: signal.summary || 'User-submitted intelligence signal tracking real-time consumer discourse.'
    };
    // Update intelligenceSignals
    // We can also trigger ingest opportunity if user wants
    addNotification(
      'New Intelligence Signal Submitted',
      `"${newSignal.title}" added to real-time cultural monitoring feeds.`,
      'opportunity'
    );
  };

  // Demo Walkthrough System
  const startDemo = (scenarioId: string = 'opp-rexona-referee') => {
    setDemoScenarioState(scenarioId);
    setDemoMode(true);
    setDemoStep(1);
    setIsDemoPlaying(false);
    setSelectedOpportunityId(scenarioId);
    setActiveModuleState('opportunities');
  };

  const nextDemoStep = () => {
    setDemoStep(prev => Math.min(prev + 1, 14));
  };

  const prevDemoStep = () => {
    setDemoStep(prev => Math.max(prev - 1, 1));
  };

  const skipDemoStep = () => {
    setDemoStep(prev => Math.min(prev + 1, 14));
  };

  const restartDemo = () => {
    setDemoStep(1);
    setIsDemoPlaying(false);
    // Optionally restore scenario base data if needed
    if (demoScenario === 'opp-rexona-referee') {
      setOpportunities(prev => prev.map(o => o.id === 'opp-rexona-referee' ? {
        ...INITIAL_HERO_OPPORTUNITY,
        currentStage: 'signal',
        status: 'ACT NOW'
      } : o));
    }
  };

  const exitDemo = () => {
    setDemoMode(false);
    setIsDemoPlaying(false);
  };

  const resetAllData = () => {
    localStorage.removeItem(STORAGE_KEY + '_opps');
    localStorage.removeItem(STORAGE_KEY + '_wf');
    localStorage.removeItem(STORAGE_KEY + '_camps');
    setOpportunities(SEEDED_OPPORTUNITIES);
    setWorkflows(SEEDED_WORKFLOWS);
    setCampaigns(SEEDED_CAMPAIGNS);
    setAgents(SEEDED_AGENTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setSelectedOpportunityId('opp-rexona-referee');
    setActiveModuleState('command-center');
    setDemoMode(false);
    setDemoStep(1);
    setDemoScenarioState('opp-rexona-referee');
    setIsDemoPlaying(false);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider value={{
      activeModule,
      selectedOpportunityId,
      opportunities,
      workflows,
      campaigns,
      intelligenceSignals,
      agents,
      notifications,
      unreadCount,
      userWorkspace,
      searchQuery,
      filterBrand,
      filterStatus,
      filterMarket,
      isIngestModalOpen,
      initialIngestTemplate,
      openIngestModal,
      closeIngestModal,
      ingestCustomSignal,
      isGeneratorModalOpen,
      initialGeneratorQuery,
      openOpportunityGenerator,
      closeOpportunityGenerator,
      ingestOpportunityWithApproval,
      addCustomEvidence,
      updateOpportunityInsight,
      updateStrategyBrief,
      addCustomCreativeConcept,
      addCustomGovernanceCheck,
      addCustomMarketLocalization,
      addCustomLearningNote,
      addCustomIntelligenceSignal,
      demoMode,
      demoStep,
      demoScenario,
      isPresenterMode,
      isDemoPlaying,
      setDemoStep,
      setDemoScenario,
      togglePresenterMode,
      setIsDemoPlaying,
      setActiveModule,
      selectOpportunity,
      setSearchQuery,
      setFilterBrand,
      setFilterStatus,
      setFilterMarket,
      advanceOpportunityStage,
      cancelPipelineStage,
      resumePipelineStage,
      retracePipeline,
      resetOpportunityPipeline,
      cancelLocalizationMarket,
      cancelCreativeConcept,
      approveOpportunityDecision,
      modifyOpportunityDecision,
      rejectOpportunityDecision,
      approveStrategy,
      approveBrief,
      selectCreativeConcept,
      approveGovernance,
      escalateGovernance,
      approveMarketLocalization,
      activateCampaign,
      applyLearningsToFuture,
      startDemo,
      nextDemoStep,
      prevDemoStep,
      skipDemoStep,
      restartDemo,
      exitDemo,
      resetAllData,
      markNotificationAsRead,
      markAllNotificationsRead,
      selectedOpportunity
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

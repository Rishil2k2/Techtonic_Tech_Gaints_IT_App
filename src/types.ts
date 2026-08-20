export type SystemOutcome = 'ACT' | 'WATCH' | 'IGNORE' | 'ESCALATE';

export type OpportunityStatus = 
  | 'ACT NOW'
  | 'WATCH'
  | 'IGNORE'
  | 'ESCALATE'
  | 'IN PROGRESS'
  | 'APPROVED'
  | 'BLOCKED'
  | 'READY'
  | 'ACTIVATED';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export type WorkflowStage = 
  | 'signal'
  | 'insight'
  | 'opportunity'
  | 'strategy'
  | 'creative'
  | 'governance'
  | 'localization'
  | 'activation'
  | 'learning';

export interface ScoreBreakdown {
  overall: number;
  brandFit: number;
  consumerRelevance: number;
  culturalRelevance: number;
  velocity: number;
  commercialPotential: number;
  executionFeasibility: number;
  risk: RiskLevel;
}

export interface SignalEvidence {
  socialMentions: string;
  estimatedReach: string;
  velocityPercent: number;
  positiveSentimentPercent: number;
  memeReplication: 'High' | 'Medium' | 'Low';
  targetAudienceConcentration: string;
  sourcePlatforms: string[];
  samplePosts: {
    platform: 'Instagram' | 'X' | 'TikTok' | 'YouTube';
    author: string;
    handle: string;
    content: string;
    engagement: string;
    timestamp: string;
  }[];
  trendData: { time: string; volume: number; sentiment: number }[];
}

export interface ConsumerInsight {
  headline: string;
  consumerBehaviour: string;
  culturalTension: string;
  brandImplication: string;
  opportunityWindow: string;
}

export interface StrategyBrief {
  objective: string;
  audience: string;
  brandRole: string;
  coreMessage: string;
  channels: string[];
  recommendedFormats: string[];
  activationWindow: string;
  kpis: string[];
  mandatoryRules: string[];
  claimsRequirements: string[];
  creativeTerritory: string;
}

export interface CreativeApprovalMetadata {
  approvedAt: string;
  approvedBy: string;
  pipelineStatus: 'IN_STUDIO' | 'QUEUED_FOR_GOVERNANCE' | 'AUDIT_IN_PROGRESS' | 'GOVERNANCE_PASSED' | 'GOVERNANCE_WARNING' | 'GOVERNANCE_REJECTED';
  governanceQueueId: string;
  assetTags: string[];
  extractedClaims: string[];
  safetyScore: number;
  contentDigest?: string;
  pushedToQueueAt?: string;
}

export interface CreativeConcept {
  id: string;
  number: string;
  title: string;
  tone: string;
  headline: string;
  coreIdea: string;
  caption: string;
  visualDirection: string;
  recommendedPlatform: string;
  brandRationale: string;
  aspectRatio: string;
  assetType: 'Short-form Video' | 'Reactive Social' | 'Static Visual' | 'Carousel';
  imageUrl?: string;
  routingTarget: string;
  status: 'PENDING' | 'SELECTED' | 'REJECTED';
  tags?: string[];
  approvalMetadata?: CreativeApprovalMetadata;
}

export interface GovernanceAssetQueueItem {
  id: string;
  assetId: string;
  conceptNumber: string;
  title: string;
  headline: string;
  assetType: string;
  aspectRatio: string;
  recommendedPlatform: string;
  pushedAt: string;
  pushedBy: string;
  queueStatus: 'QUEUED' | 'IN_SCAN' | 'PASSED' | 'FLAGGED';
  assetTags: string[];
  detectedClaims: string[];
  safetyScore: number;
  governanceChecks?: GovernanceCheckItem[];
}

export interface GovernanceCheckItem {
  id: string;
  name: string;
  category: 'Brand Compliance' | 'Claims' | 'Cultural Risk' | 'Market Risk';
  status: 'PASS' | 'WARNING' | 'FAIL';
  details: string;
  assetId?: string;
  assetHeadline?: string;
  verifiedClaim?: string;
}

export interface LocalizationMarket {
  marketId: 'india' | 'brazil' | 'uk';
  marketName: string;
  countryCode: string;
  flag: string;
  status: 'PENDING' | 'APPROVED' | 'MODIFIED' | 'ESCALATED';
  language: string;
  localHeadline: string;
  localCaption: string;
  culturalAdaptation: string;
  channel: string;
  format: string;
  cta: string;
  governanceNote: string;
  reviewer: string;
}

export interface Opportunity {
  id: string;
  title: string;
  brand: 'Rexona' | 'Vaseline' | 'Surf Excel' | 'Dove' | 'Axe';
  market: string;
  category: string;
  detectedAt: string;
  summary: string;
  score: ScoreBreakdown;
  recommendation: SystemOutcome;
  recommendationReason: string;
  status: OpportunityStatus;
  risk: RiskLevel;
  owner: string;
  currentStage: WorkflowStage;
  stageProgress: number; // 0 to 100
  
  // Stages Data
  signal: {
    description: string;
    evidence: SignalEvidence;
  };
  insight: ConsumerInsight;
  decisionTrace: {
    evidenceConsidered: string[];
    decisionLogic: string;
    humanDecision?: {
      decision: 'APPROVED' | 'MODIFIED' | 'REJECTED';
      decidedBy: string;
      role: string;
      timestamp: string;
      notes?: string;
    };
  };
  strategy?: StrategyBrief;
  creativeBrief?: {
    approved: boolean;
    approvedAt?: string;
    content: StrategyBrief;
  };
  creativeOptions: CreativeConcept[];
  selectedCreativeId?: string;
  governance: {
    confidencePercent: number;
    status: 'PENDING' | 'APPROVED' | 'REVIEW_REQUIRED' | 'REJECTED';
    checks: GovernanceCheckItem[];
    assetQueue?: GovernanceAssetQueueItem[];
    lastAuditedAt?: string;
    autoScanned?: boolean;
    approvedBy?: string;
    timestamp?: string;
    notes?: string;
  };
  localizations: LocalizationMarket[];
  activation: {
    status: 'DRAFT' | 'READY' | 'ACTIVATING' | 'ACTIVATED';
    activatedAt?: string;
    campaignId?: string;
    channels: string[];
    assetsCount: number;
    telemetry: {
      impressions: number;
      engagements: number;
      sentimentScore: number;
      ctr: number;
      shares: number;
    };
  };
  learnings?: {
    whatWorked: string;
    audienceLearning: string;
    creativeLearning: string;
    recommendation: string;
    appliedToFuture: boolean;
  };
}

export interface WorkflowItem {
  id: string;
  opportunityId: string;
  title: string;
  brand: string;
  market: string;
  currentStage: WorkflowStage;
  stageLabel: string;
  progressPercent: number;
  owner: string;
  nextAction: string;
  slaRemaining: string;
  status: 'ACTIVE' | 'BLOCKED' | 'COMPLETED' | 'PAUSED';
  risk: RiskLevel;
  updatedAt: string;
}

export interface CampaignItem {
  id: string;
  name: string;
  brand: string;
  markets: string[];
  stage: 'Activated' | 'In Production' | 'Testing' | 'Completed';
  approvalStatus: 'Approved' | 'Pending Review' | 'Escalated';
  channels: string[];
  liveSince: string;
  reach: string;
  engagementRate: string;
  sentiment: string;
  roi: string;
  creativeThumbnail: string;
}

export interface IntelligenceSignal {
  id: string;
  title: string;
  category: 'Sports Culture' | 'Confidence & Freshness' | 'Self-Expression' | 'Beauty & Skin' | 'Sustainability';
  brandAlignment: string;
  volume: string;
  velocityPercent: number;
  sentimentPercent: number;
  relevanceScore: number;
  status: 'EMERGING' | 'SURGING' | 'STABLE' | 'PEAKING';
  detectedAt: string;
  summary: string;
}

export interface AIAgentDefinition {
  id: string;
  name: string;
  order: number;
  icon: string;
  purpose: string;
  input: string;
  output: string;
  status: 'ACTIVE' | 'PROCESSING' | 'STANDBY';
  avgLatency: string;
  currentTask?: string;
}

export interface CustomSignalInput {
  title: string;
  sourceType: 'social' | 'feedback' | 'market_report' | 'idea' | 'raw_paste';
  brand: 'Rexona' | 'Vaseline' | 'Surf Excel' | 'Dove' | 'Axe' | string;
  market: string;
  category: string;
  rawText: string;
  observedReach?: string;
  velocityPercent?: number;
  sentimentPercent?: number;
  sourcePlatforms?: string[];
  samplePost?: {
    platform: 'Instagram' | 'X' | 'TikTok' | 'YouTube' | 'Reddit' | 'Reviews';
    author: string;
    handle: string;
    content: string;
    engagement: string;
  };
}

export interface UserNotification {
  id: string;
  title: string;
  message: string;
  type: 'opportunity' | 'approval' | 'governance' | 'activation' | 'sla';
  timestamp: string;
  read: boolean;
  opportunityId?: string;
}

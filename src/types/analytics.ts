export interface PipelineStageMetric {
  stageKey: string;
  stageName: string;
  agentName: string;
  throughput: string;
  avgLatency: string;
  legacyLatency: string;
  speedup: string;
  accuracyScore: number;
  humanTouchRate: string;
  dataPointsProcessed: string;
  status: 'OPTIMAL' | 'ACTIVE' | 'EVALUATING';
  stageInsight: string;
}

export interface MarketTrendIntelligence {
  id: string;
  topic: string;
  category: string;
  macroDriver: string;
  velocityChange: number; // e.g. +340
  velocityDirection: 'SURGING' | 'HIGH' | 'STABLE' | 'EMERGING';
  sentimentBreakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
  volumeMentions24h: string;
  geographicHotspots: { market: string; sharePercent: number; growth: string }[];
  demographicConcentration: string;
  brandOpportunityFit: {
    brand: 'Rexona' | 'Vaseline' | 'Surf Excel' | 'Dove' | 'Axe';
    fitScore: number;
    strategicAngle: string;
  }[];
  peakWindowRemaining: string;
}

export interface CompetitiveIntelligenceItem {
  id: string;
  competitorBrand: string;
  parentCompany: string;
  category: string;
  unileverRivalBrand: 'Rexona' | 'Vaseline' | 'Surf Excel' | 'Dove' | 'Axe';
  recentCampaignOrMove: string;
  detectedAt: string;
  speedToMarketEstimate: string;
  socialShareOfVoice: number; // 0-100
  unileverShareOfVoice: number; // 0-100
  sentimentIndex: number; // 0-100
  unileverAdvantageFactor: string;
  threatLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  recommendedCounterAction: string;
  channelBreakdown: {
    channel: string;
    competitorSpendEstimated: string;
    engagementRate: string;
  }[];
}

export interface PostCampaignAnalyticsData {
  campaignId: string;
  opportunityId: string;
  campaignTitle: string;
  brand: string;
  market: string;
  launchedAt: string;
  durationActive: string;
  status: 'LIVE_STREAMING' | 'COMPLETED';
  
  // Executive Scorecard
  overview: {
    totalImpressions: string;
    organicImpressionsRatio: string;
    totalEngagements: string;
    overallEngagementRate: string;
    positiveSentimentLift: string; // e.g. +14.2%
    brandFavorabilityIndex: number; // e.g. 88
    earnedMediaValueEstimated: string; // e.g. $420,000
    roasEstimated: string; // e.g. 4.8x
    cacReductionFactor: string; // e.g. -38%
  };

  // Hourly velocity stream
  hourlyVelocity: {
    hour: string;
    impressions: number;
    shares: number;
    sentimentScore: number;
  }[];

  // Channel attribution breakdown
  channelPerformance: {
    channel: string;
    impressions: string;
    ctr: string;
    engagementRate: string;
    conversionLift: string;
    sentimentScore: number;
    topAssetFormat: string;
  }[];

  // Market Regional Uplift
  regionalUplift: {
    market: string;
    impressions: string;
    sentimentLift: string;
    localBuzzVolume: string;
    marketShareDelta: string;
  }[];

  // A/B Format telemetry
  formatDiagnostics: {
    formatName: string;
    ctr: string;
    vtr: string; // View Through Rate
    shareRate: string;
    governanceScore: number;
    verdict: string;
  }[];

  // Synthesis & Brand Memory Loop
  closedLoopLearnings: {
    hypothesis: string;
    actualResult: string;
    unileverMemoryUpdate: string;
    weightAdjustment: string;
  }[];
}

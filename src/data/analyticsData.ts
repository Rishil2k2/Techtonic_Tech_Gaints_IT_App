import { 
  PipelineStageMetric, 
  MarketTrendIntelligence, 
  CompetitiveIntelligenceItem, 
  PostCampaignAnalyticsData 
} from '../types/analytics';

export const SEEDED_PIPELINE_STAGE_METRICS: PipelineStageMetric[] = [
  {
    stageKey: 'signal',
    stageName: 'Signal Ingestion & Filtering',
    agentName: 'NEXT Signal Agent',
    throughput: '42,000 signals/hr',
    avgLatency: '1.2s',
    legacyLatency: '6.0 hrs',
    speedup: '18,000x',
    accuracyScore: 98.4,
    humanTouchRate: '12% flagged for review',
    dataPointsProcessed: '18.4M multi-platform posts',
    status: 'OPTIMAL',
    stageInsight: 'Real-time NLP and anomaly clustering isolates cultural spikes 6 hours before competitor social listening tools detect statistical deviation.'
  },
  {
    stageKey: 'insight',
    stageName: 'Consumer Insight Synthesis',
    agentName: 'NEXT Insight Agent',
    throughput: '1,200 insights/hr',
    avgLatency: '4.8s',
    legacyLatency: '18.0 hrs',
    speedup: '13,500x',
    accuracyScore: 94.7,
    humanTouchRate: '18% enriched by brand lead',
    dataPointsProcessed: '420K verbatim conversational units',
    status: 'OPTIMAL',
    stageInsight: 'Synthesizes cultural tensions, consumer behavior, and brand equity alignment into actionable strategic anchors.'
  },
  {
    stageKey: 'opportunity',
    stageName: 'Decision & Opportunity Scoring',
    agentName: 'NEXT Decision Engine',
    throughput: '850 evaluations/hr',
    avgLatency: '2.1s',
    legacyLatency: '24.0 hrs',
    speedup: '41,100x',
    accuracyScore: 96.2,
    humanTouchRate: '100% human-in-the-loop gate',
    dataPointsProcessed: '7 weighted deterministic dimensions',
    status: 'OPTIMAL',
    stageInsight: 'Applies Unilever Brand DNA rules, commercial headroom, and velocity thresholds to recommend ACT NOW / WATCH / PASS.'
  },
  {
    stageKey: 'strategy',
    stageName: 'Strategy Formulation',
    agentName: 'NEXT Strategy Agent',
    throughput: '450 strategies/hr',
    avgLatency: '6.4s',
    legacyLatency: '24.0 hrs',
    speedup: '13,500x',
    accuracyScore: 93.8,
    humanTouchRate: '25% tuned by planner',
    dataPointsProcessed: 'Full context forward pipeline',
    status: 'OPTIMAL',
    stageInsight: 'Generates channel architecture, core campaign message, audience segmentation, and key strategic territories in seconds.'
  },
  {
    stageKey: 'brief',
    stageName: 'Brief Creation & Context Flow',
    agentName: 'NEXT Brief Agent',
    throughput: '600 briefs/hr',
    avgLatency: '1.8s',
    legacyLatency: '12.0 hrs',
    speedup: '24,000x',
    accuracyScore: 99.1,
    humanTouchRate: '8% edited before sign-off',
    dataPointsProcessed: 'Zero manual re-entry of data',
    status: 'OPTIMAL',
    stageInsight: 'Eliminates brief rework by locking and transferring unified semantic parameters directly into creative generation.'
  },
  {
    stageKey: 'creative',
    stageName: 'Creative Studio Orchestration',
    agentName: 'NEXT Creative Orchestrator',
    throughput: '320 asset packages/hr',
    avgLatency: '8.6s',
    legacyLatency: '48.0 hrs',
    speedup: '20,000x',
    accuracyScore: 91.5,
    humanTouchRate: '35% concept selection',
    dataPointsProcessed: 'Multi-ratio vertical & horizontal assets',
    status: 'OPTIMAL',
    stageInsight: 'Produces multi-format visual, copy, audio prompt, and narrative concepts tuned to native platform algorithms.'
  },
  {
    stageKey: 'governance',
    stageName: 'Automated Governance Audit',
    agentName: 'NEXT Governance Guard',
    throughput: '1,800 audits/hr',
    avgLatency: '1.5s',
    legacyLatency: '48.0 hrs',
    speedup: '115,200x',
    accuracyScore: 99.8,
    humanTouchRate: '2% flagged for legal counsel',
    dataPointsProcessed: '5-layer automated rule audit matrix',
    status: 'OPTIMAL',
    stageInsight: 'Simultaneously audits Brand DNA, claims substantiation, ASCI/CONAR/ASA legal codes, inclusivity, and competitive safety.'
  },
  {
    stageKey: 'localization',
    stageName: 'Global-to-Local Expression',
    agentName: 'NEXT Localization Agent',
    throughput: '540 market adaptations/hr',
    avgLatency: '5.2s',
    legacyLatency: '36.0 hrs',
    speedup: '24,900x',
    accuracyScore: 95.0,
    humanTouchRate: '20% regional lead review',
    dataPointsProcessed: '18 regional dialect & cultural dictionaries',
    status: 'OPTIMAL',
    stageInsight: 'Preserves universal brand strategy while adapting colloquial slang, local sports nuances, and regional media consumption.'
  },
  {
    stageKey: 'activation',
    stageName: 'Omnichannel Activation',
    agentName: 'NEXT Activation Hub',
    throughput: '250 live deployments/hr',
    avgLatency: '3.0s',
    legacyLatency: '24.0 hrs',
    speedup: '28,800x',
    accuracyScore: 99.9,
    humanTouchRate: '100% pre-launch release lock',
    dataPointsProcessed: 'Real-time API packaging for X, Meta, TikTok',
    status: 'OPTIMAL',
    stageInsight: 'Validates all governance signatures, sets up live tracking tags, and pushes multi-asset bundles across ad managers.'
  },
  {
    stageKey: 'learning',
    stageName: 'Post-Launch Learning Loop',
    agentName: 'NEXT Learning Memory',
    throughput: 'Continuous stream',
    avgLatency: 'Real-time',
    legacyLatency: '30.0 days (QBR)',
    speedup: '720x',
    accuracyScore: 97.2,
    humanTouchRate: '10% memory rule override',
    dataPointsProcessed: 'Live conversion, sentiment, and sales lift',
    status: 'OPTIMAL',
    stageInsight: 'Feeds empirical campaign performance back into opportunity scoring models to continually sharpen future recommendations.'
  }
];

export const SEEDED_MARKET_TRENDS: MarketTrendIntelligence[] = [
  {
    id: 'trend-stoppage-time-drama',
    topic: 'Live Sports Stoppage-Time Pressure & Composure',
    category: 'Sports & Adrenaline Culture',
    macroDriver: 'High-stakes football/cricket broadcast viewership shifting from passive viewing to split-screen second-screen meme creation.',
    velocityChange: 342,
    velocityDirection: 'SURGING',
    sentimentBreakdown: { positive: 78, neutral: 16, negative: 6 },
    volumeMentions24h: '412K',
    geographicHotspots: [
      { market: 'India', sharePercent: 44, growth: '+280%' },
      { market: 'Brazil', sharePercent: 32, growth: '+410%' },
      { market: 'UK', sharePercent: 24, growth: '+195%' }
    ],
    demographicConcentration: 'Gen Z & Millennials (18-34), 68% Mobile Native, 72% Sports-Engaged',
    brandOpportunityFit: [
      { brand: 'Rexona', fitScore: 96, strategicAngle: 'Confidence and sweat protection in clutch, heart-racing moments.' },
      { brand: 'Axe', fitScore: 82, strategicAngle: 'Pre-match freshness and swagger under intense pressure.' },
      { brand: 'Surf Excel', fitScore: 65, strategicAngle: 'Celebrating the physical dirt and effort of winning games.' }
    ],
    peakWindowRemaining: '4 - 6 Hours before trend plateau'
  },
  {
    id: 'trend-slugging-risk',
    topic: 'DIY Skincare Slugging & Extreme Barrier Occlusion',
    category: 'Beauty & Skin Health',
    macroDriver: 'TikTok creator-led beauty hacks encouraging unregulated heavy petrolatum layering causing pore congestion concerns.',
    velocityChange: 210,
    velocityDirection: 'HIGH',
    sentimentBreakdown: { positive: 42, neutral: 31, negative: 27 },
    volumeMentions24h: '188K',
    geographicHotspots: [
      { market: 'UK', sharePercent: 51, growth: '+190%' },
      { market: 'US', sharePercent: 34, growth: '+140%' },
      { market: 'India', sharePercent: 15, growth: '+85%' }
    ],
    demographicConcentration: 'Female Skincare Enthusiasts (16-29), High TikTok Beauty Search Vol',
    brandOpportunityFit: [
      { brand: 'Vaseline', fitScore: 92, strategicAngle: 'Dermatologist-backed guidance on correct micro-slugging technique & barrier repair.' },
      { brand: 'Dove', fitScore: 78, strategicAngle: 'Gentle cleansing and skin nourishment balance.' }
    ],
    peakWindowRemaining: '12 - 24 Hours'
  },
  {
    id: 'trend-muddy-street-cricket',
    topic: 'Monsoon Street Sports Passion & Unstoppable Grit',
    category: 'Local Sports & Resilience',
    macroDriver: 'Viral reels of amateur street athletes refusing to let torrential rain stop passionate neighborhood matches.',
    velocityChange: 175,
    velocityDirection: 'SURGING',
    sentimentBreakdown: { positive: 94, neutral: 5, negative: 1 },
    volumeMentions24h: '260K',
    geographicHotspots: [
      { market: 'India', sharePercent: 82, growth: '+310%' },
      { market: 'Bangladesh', sharePercent: 12, growth: '+160%' },
      { market: 'UK South Asian Diaspora', sharePercent: 6, growth: '+95%' }
    ],
    demographicConcentration: 'Families & Sports Enthusiasts (18-45), High Emotional Shareability',
    brandOpportunityFit: [
      { brand: 'Surf Excel', fitScore: 98, strategicAngle: '"Daag Achhe Hain" — Dirt earned in genuine pursuit of joy is pure triumph.' },
      { brand: 'Rexona', fitScore: 71, strategicAngle: 'Staying active and odor-free despite extreme humidity.' }
    ],
    peakWindowRemaining: '48 - 72 Hours'
  },
  {
    id: 'trend-anti-filter-authenticity',
    topic: 'Real Gym Skin & Sweat Acceptance',
    category: 'Personal Care & Self-Image',
    macroDriver: 'Backlash against overly filtered fitness influencers; gym-goers posting unretouched sweat patches and natural flushed skin.',
    velocityChange: 128,
    velocityDirection: 'EMERGING',
    sentimentBreakdown: { positive: 86, neutral: 10, negative: 4 },
    volumeMentions24h: '145K',
    geographicHotspots: [
      { market: 'UK', sharePercent: 48, growth: '+135%' },
      { market: 'Brazil', sharePercent: 28, growth: '+110%' },
      { market: 'India', sharePercent: 24, growth: '+165%' }
    ],
    demographicConcentration: 'Wellness & Fitness Community (20-38), 64% Female',
    brandOpportunityFit: [
      { brand: 'Dove', fitScore: 94, strategicAngle: 'Celebrating real, hardworking skin without artificial perfection.' },
      { brand: 'Rexona', fitScore: 89, strategicAngle: 'Sweat is proof of effort; 72H protection gives freedom to move.' }
    ],
    peakWindowRemaining: '5 - 7 Days'
  }
];

export const SEEDED_COMPETITIVE_INTELLIGENCE: CompetitiveIntelligenceItem[] = [
  {
    id: 'comp-nivea-men-sports',
    competitorBrand: 'Nivea Men (Beiersdorf)',
    parentCompany: 'Beiersdorf AG',
    category: 'Deodorant & Antiperspirant',
    unileverRivalBrand: 'Rexona',
    recentCampaignOrMove: 'Reactive sponsorship banner on football recap app following referee VAR controversy.',
    detectedAt: '3.5 hrs after viral referee moment',
    speedToMarketEstimate: '6 - 8 hours (Semi-manual agency briefing)',
    socialShareOfVoice: 28,
    unileverShareOfVoice: 72,
    sentimentIndex: 64,
    unileverAdvantageFactor: 'NEXT launched Rexona "Never Lose Your Cool" reactive content in 18 minutes, capturing 72% organic SOV before Nivea placed static ads.',
    threatLevel: 'MEDIUM',
    recommendedCounterAction: 'Double-down on interactive creator split-screens and live stoppage-time clock countdown triggers.',
    channelBreakdown: [
      { channel: 'Instagram Reels', competitorSpendEstimated: '$45,000', engagementRate: '2.4%' },
      { channel: 'X / Twitter', competitorSpendEstimated: '$18,000', engagementRate: '1.8%' },
      { channel: 'TikTok', competitorSpendEstimated: '$32,000', engagementRate: '2.9%' }
    ]
  },
  {
    id: 'comp-garnier-barrier',
    competitorBrand: 'Garnier SkinActive (L\'Oréal)',
    parentCompany: 'L\'Oréal Group',
    category: 'Skincare Barrier Care',
    unileverRivalBrand: 'Vaseline',
    recentCampaignOrMove: 'Promoting hyaluronic moisture gels as a modern alternative to traditional petroleum slugging.',
    detectedAt: 'Yesterday',
    speedToMarketEstimate: '48 hours (Standard digital flight)',
    socialShareOfVoice: 42,
    unileverShareOfVoice: 58,
    sentimentIndex: 71,
    unileverAdvantageFactor: 'Vaseline launched dermatologist-backed Micro-Slugging Education cards, neutralizing misinformation while reinforcing pure healing efficacy.',
    threatLevel: 'HIGH',
    recommendedCounterAction: 'Deploy verified dermatologist stitch videos answering common slugging myths across UK & US feeds.',
    channelBreakdown: [
      { channel: 'TikTok Spark Ads', competitorSpendEstimated: '$85,000', engagementRate: '3.6%' },
      { channel: 'YouTube Shorts', competitorSpendEstimated: '$40,000', engagementRate: '2.1%' }
    ]
  },
  {
    id: 'comp-ariel-monsoon',
    competitorBrand: 'Ariel (Procter & Gamble)',
    parentCompany: 'Procter & Gamble',
    category: 'Fabric Care & Laundry',
    unileverRivalBrand: 'Surf Excel',
    recentCampaignOrMove: 'Running heavy 30s TVC + YouTube preroll on 1-wash tough stain removal guarantee.',
    detectedAt: '2 days ago',
    speedToMarketEstimate: 'Planned seasonal TV campaign (4-6 weeks production cycle)',
    socialShareOfVoice: 31,
    unileverShareOfVoice: 69,
    sentimentIndex: 77,
    unileverAdvantageFactor: 'Surf Excel\'s reactive "Dirt of Champions" agile tribute generated 4.3x higher organic user reshares because it celebrated emotional triumph over sterile product claims.',
    threatLevel: 'LOW',
    recommendedCounterAction: 'Leverage user-generated monsoon sports clips for hyper-local regional cutdowns.',
    channelBreakdown: [
      { channel: 'Hotstar Live Cricket Ads', competitorSpendEstimated: '$140,000', engagementRate: '1.2%' },
      { channel: 'Instagram Ads', competitorSpendEstimated: '$35,000', engagementRate: '2.0%' }
    ]
  },
  {
    id: 'comp-old-spice-twitch',
    competitorBrand: 'Old Spice (Procter & Gamble)',
    parentCompany: 'Procter & Gamble',
    category: 'Men\'s Body Spray & Grooming',
    unileverRivalBrand: 'Axe',
    recentCampaignOrMove: 'Contracted 3 esports streamers for sponsored broadcast banner takeovers.',
    detectedAt: '12 hrs ago',
    speedToMarketEstimate: '2 weeks influencer agreement cycle',
    socialShareOfVoice: 48,
    unileverShareOfVoice: 52,
    sentimentIndex: 79,
    unileverAdvantageFactor: 'Axe deployed interactive Twitch chat command bot triggering instant discount codes during clutch rounds with zero agency lag.',
    threatLevel: 'MEDIUM',
    recommendedCounterAction: 'Expand real-time stream overlays with live gamer heart rate integrations.',
    channelBreakdown: [
      { channel: 'Twitch Overlays', competitorSpendEstimated: '$60,000', engagementRate: '5.2%' },
      { channel: 'Discord Community Drop', competitorSpendEstimated: '$15,000', engagementRate: '6.8%' }
    ]
  }
];

export const SEEDED_POST_CAMPAIGN_DATA: Record<string, PostCampaignAnalyticsData> = {
  'opp-rexona-referee': {
    campaignId: 'CMP-REX-REF-091',
    opportunityId: 'opp-rexona-referee',
    campaignTitle: 'Rexona — Never Lose Your Cool (Referee Clutch Moment)',
    brand: 'Rexona',
    market: 'India, Brazil & United Kingdom',
    launchedAt: 'Live 18m post signal detection',
    durationActive: '24 Hours Post-Launch',
    status: 'LIVE_STREAMING',
    overview: {
      totalImpressions: '14.8M',
      organicImpressionsRatio: '78% Organic / 22% Paid',
      totalEngagements: '1.42M',
      overallEngagementRate: '9.6%',
      positiveSentimentLift: '+18.4%',
      brandFavorabilityIndex: 92,
      earnedMediaValueEstimated: '$640,000',
      roasEstimated: '5.4x',
      cacReductionFactor: '-42%'
    },
    hourlyVelocity: [
      { hour: 'H+1', impressions: 420000, shares: 18400, sentimentScore: 78 },
      { hour: 'H+2', impressions: 1250000, shares: 64200, sentimentScore: 82 },
      { hour: 'H+4', impressions: 3400000, shares: 142000, sentimentScore: 86 },
      { hour: 'H+8', impressions: 6800000, shares: 290000, sentimentScore: 89 },
      { hour: 'H+12', impressions: 10400000, shares: 410000, sentimentScore: 91 },
      { hour: 'H+18', impressions: 13100000, shares: 520000, sentimentScore: 92 },
      { hour: 'H+24', impressions: 14800000, shares: 590000, sentimentScore: 93 }
    ],
    channelPerformance: [
      {
        channel: 'Instagram Reels & Stories',
        impressions: '6.4M',
        ctr: '4.8%',
        engagementRate: '11.2%',
        conversionLift: '+34%',
        sentimentScore: 94,
        topAssetFormat: 'Split-Screen Referee Pressure Reaction (9:16)'
      },
      {
        channel: 'TikTok Video',
        impressions: '4.9M',
        ctr: '5.6%',
        engagementRate: '12.8%',
        conversionLift: '+41%',
        sentimentScore: 92,
        topAssetFormat: 'Stitch Meme Format with Matchday Sound'
      },
      {
        channel: 'X (Twitter) Conversational Card',
        impressions: '2.3M',
        ctr: '3.9%',
        engagementRate: '7.4%',
        conversionLift: '+22%',
        sentimentScore: 88,
        topAssetFormat: 'Instant Replay Meme Visual with Cool Meter'
      },
      {
        channel: 'Quick-Commerce In-App Banners (Zepto/Blinkit/Rappi)',
        impressions: '1.2M',
        ctr: '8.4%',
        engagementRate: '14.1%',
        conversionLift: '+86% Add-to-Cart',
        sentimentScore: 96,
        topAssetFormat: '10-Min Emergency Deodorant Delivery Banner'
      }
    ],
    regionalUplift: [
      {
        market: 'India',
        impressions: '7.8M',
        sentimentLift: '+22.1%',
        localBuzzVolume: '440K Mentions',
        marketShareDelta: '+1.4% Category Gain'
      },
      {
        market: 'Brazil',
        impressions: '4.6M',
        sentimentLift: '+17.8%',
        localBuzzVolume: '290K Mentions',
        marketShareDelta: '+1.1% Category Gain'
      },
      {
        market: 'United Kingdom',
        impressions: '2.4M',
        sentimentLift: '+12.4%',
        localBuzzVolume: '160K Mentions',
        marketShareDelta: '+0.8% Category Gain'
      }
    ],
    formatDiagnostics: [
      {
        formatName: '9:16 Split Screen Video (Hero)',
        ctr: '5.2%',
        vtr: '68%',
        shareRate: '8.4%',
        governanceScore: 98,
        verdict: 'Top Performer: Highest organic virality and click through across sports fans.'
      },
      {
        formatName: '1:1 Social Stat Meme Graphic',
        ctr: '3.4%',
        vtr: 'N/A',
        shareRate: '6.1%',
        governanceScore: 99,
        verdict: 'Strong on X and WhatsApp community reshares; excellent low-cost reach.'
      },
      {
        formatName: '16:9 Broadcast Overlay Mockup',
        ctr: '2.8%',
        vtr: '54%',
        shareRate: '3.2%',
        governanceScore: 95,
        verdict: 'Good contextual credibility, but lower mobile engagement than vertical video.'
      }
    ],
    closedLoopLearnings: [
      {
        hypothesis: 'Sports stoppage-time pressure resonates universally when framed with relatable humor rather than generic sweat stats.',
        actualResult: 'Positive sentiment rose to 93% (vs 76% baseline). Engagement rate exceeded benchmark by 3.2x.',
        unileverMemoryUpdate: 'Update Rexona Brand Rule: When sports stoppage time signals occur, favor humor + composure narrative over clinical antiperspirant copy.',
        weightAdjustment: 'Velocity Weight: +10% | Cultural Relevance Weight: +15% for live sports opportunities.'
      },
      {
        hypothesis: 'Pairing reactive social posts with quick-commerce instant delivery links drives immediate commercial impulse conversion.',
        actualResult: 'Quick-commerce in-app CTR hit 8.4% with +86% add-to-cart spike during the match 2-hour window.',
        unileverMemoryUpdate: 'Standardize direct-to-app deep links for all high-velocity reactive sports activations.',
        weightAdjustment: 'Commercial Potential Weight: +12% when quick-commerce inventory is available.'
      }
    ]
  },
  'opp-vaseline-hack': {
    campaignId: 'CMP-VAS-HAK-044',
    opportunityId: 'opp-vaseline-hack',
    campaignTitle: 'Vaseline — The Dermatologist Guide to Slugging',
    brand: 'Vaseline',
    market: 'United Kingdom & United States',
    launchedAt: 'Live 45m post signal alert',
    durationActive: '48 Hours Post-Launch',
    status: 'COMPLETED',
    overview: {
      totalImpressions: '8.4M',
      organicImpressionsRatio: '65% Organic / 35% Paid',
      totalEngagements: '820K',
      overallEngagementRate: '8.2%',
      positiveSentimentLift: '+14.6%',
      brandFavorabilityIndex: 89,
      earnedMediaValueEstimated: '$390,000',
      roasEstimated: '4.2x',
      cacReductionFactor: '-28%'
    },
    hourlyVelocity: [
      { hour: 'H+1', impressions: 180000, shares: 8200, sentimentScore: 68 },
      { hour: 'H+4', impressions: 940000, shares: 38000, sentimentScore: 74 },
      { hour: 'H+8', impressions: 2200000, shares: 92000, sentimentScore: 81 },
      { hour: 'H+16', impressions: 4800000, shares: 180000, sentimentScore: 86 },
      { hour: 'H+24', impressions: 6900000, shares: 260000, sentimentScore: 89 },
      { hour: 'H+48', impressions: 8400000, shares: 320000, sentimentScore: 91 }
    ],
    channelPerformance: [
      {
        channel: 'TikTok Dermatologist Stitches',
        impressions: '4.8M',
        ctr: '4.2%',
        engagementRate: '9.8%',
        conversionLift: '+28%',
        sentimentScore: 92,
        topAssetFormat: 'Doctor Reaction & Do / Don\'t Slugging Guide'
      },
      {
        channel: 'Instagram Carousel Guide',
        impressions: '2.6M',
        ctr: '3.6%',
        engagementRate: '7.4%',
        conversionLift: '+19%',
        sentimentScore: 88,
        topAssetFormat: '5-Step Micro-Slugging Routine Cards'
      },
      {
        channel: 'Boots & Superdrug Retail Banners',
        impressions: '1.0M',
        ctr: '6.2%',
        engagementRate: '11.0%',
        conversionLift: '+44% Retail Sell-Through',
        sentimentScore: 94,
        topAssetFormat: 'Original Pure Jelly Safety Seal Graphic'
      }
    ],
    regionalUplift: [
      {
        market: 'United Kingdom',
        impressions: '5.2M',
        sentimentLift: '+16.2%',
        localBuzzVolume: '220K Mentions',
        marketShareDelta: '+0.9% Barrier Care Share'
      },
      {
        market: 'United States',
        impressions: '3.2M',
        sentimentLift: '+12.8%',
        localBuzzVolume: '140K Mentions',
        marketShareDelta: '+0.7% Barrier Care Share'
      }
    ],
    formatDiagnostics: [
      {
        formatName: 'TikTok Stitched Video with Derm Partner',
        ctr: '4.6%',
        vtr: '74%',
        shareRate: '9.2%',
        governanceScore: 100,
        verdict: 'Highest trust authority: Completely contained misinformation narrative.'
      },
      {
        formatName: 'Carousel Infographic Cards',
        ctr: '3.8%',
        vtr: 'N/A',
        shareRate: '8.1%',
        governanceScore: 100,
        verdict: 'Highest save-rate on Instagram (14.2K saves).'
      }
    ],
    closedLoopLearnings: [
      {
        hypothesis: 'Fast educational intervention by dermatologists protects brand safety while converting DIY hackers into loyal barrier-care users.',
        actualResult: 'Misinformation sentiment dropped from 27% negative to <4% negative within 24 hours.',
        unileverMemoryUpdate: 'Auto-pair all beauty DIY risk signals with pre-cleared dermatologist advisory templates.',
        weightAdjustment: 'Risk Mitigation Weight: +20% for DIY skincare trend triggers.'
      }
    ]
  },
  'opp-surf-excel-cricket': {
    campaignId: 'CMP-SRF-CRK-019',
    opportunityId: 'opp-surf-excel-cricket',
    campaignTitle: 'Surf Excel — Dirt of Champions (Muddy Cricket Catch)',
    brand: 'Surf Excel',
    market: 'India',
    launchedAt: 'Live 30m post viral match video',
    durationActive: '36 Hours Post-Launch',
    status: 'COMPLETED',
    overview: {
      totalImpressions: '11.2M',
      organicImpressionsRatio: '84% Organic / 16% Paid',
      totalEngagements: '1.18M',
      overallEngagementRate: '10.5%',
      positiveSentimentLift: '+24.0%',
      brandFavorabilityIndex: 96,
      earnedMediaValueEstimated: '$520,000',
      roasEstimated: '6.1x',
      cacReductionFactor: '-45%'
    },
    hourlyVelocity: [
      { hour: 'H+1', impressions: 380000, shares: 22000, sentimentScore: 92 },
      { hour: 'H+4', impressions: 1600000, shares: 89000, sentimentScore: 94 },
      { hour: 'H+8', impressions: 4100000, shares: 210000, sentimentScore: 96 },
      { hour: 'H+16', impressions: 7800000, shares: 390000, sentimentScore: 96 },
      { hour: 'H+24', impressions: 9800000, shares: 480000, sentimentScore: 97 },
      { hour: 'H+36', impressions: 11200000, shares: 540000, sentimentScore: 97 }
    ],
    channelPerformance: [
      {
        channel: 'Instagram Reels',
        impressions: '5.8M',
        ctr: '5.1%',
        engagementRate: '12.4%',
        conversionLift: '+38%',
        sentimentScore: 98,
        topAssetFormat: 'Slow-Motion Mud Catch Tribute Video'
      },
      {
        channel: 'JioCinema / Hotstar Match Stream Overlays',
        impressions: '3.4M',
        ctr: '4.4%',
        engagementRate: '8.6%',
        conversionLift: '+29%',
        sentimentScore: 95,
        topAssetFormat: 'Dynamic In-Stream Banner with Live Match Score'
      },
      {
        channel: 'WhatsApp Status Pack & Stickers',
        impressions: '2.0M',
        ctr: '9.2%',
        engagementRate: '16.0%',
        conversionLift: '+52% Organic Reshares',
        sentimentScore: 99,
        topAssetFormat: '"Daag Achhe Hain" Cricket Catch Sticker'
      }
    ],
    regionalUplift: [
      {
        market: 'India (Pan-India Regional Cutdowns)',
        impressions: '11.2M',
        sentimentLift: '+24.0%',
        localBuzzVolume: '620K Mentions',
        marketShareDelta: '+1.8% Detergent Value Share'
      }
    ],
    formatDiagnostics: [
      {
        formatName: 'Slow-Motion Reel with Hindi Commentary',
        ctr: '5.8%',
        vtr: '79%',
        shareRate: '11.2%',
        governanceScore: 100,
        verdict: 'Exceptional emotional resonance; ranked #1 trending reel in sports category.'
      }
    ],
    closedLoopLearnings: [
      {
        hypothesis: 'UGC cricket moments paired with the classic "Daag Achhe Hain" ethos outperform polished commercial studio shoots in organic virality.',
        actualResult: 'Achieved 84% organic reach ratio and generated over 540K organic community reshares.',
        unileverMemoryUpdate: 'Prioritize grassroots sporting triumphs for rapid-response Surf Excel reactive slots.',
        weightAdjustment: 'Brand Fit Weight: +15% for grassroots sports dirt stories.'
      }
    ]
  }
};

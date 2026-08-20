import { 
  Opportunity, 
  WorkflowItem, 
  CampaignItem, 
  IntelligenceSignal, 
  AIAgentDefinition,
  UserNotification
} from '../types';

export const SEEDED_AGENTS: AIAgentDefinition[] = [
  {
    id: 'agent-1',
    name: 'Cultural Signal Agent',
    order: 1,
    icon: 'Radio',
    purpose: 'Continuously monitors social media, streaming broadcasts, sports feeds, and meme trends to capture unexpected brand occurrences in real time.',
    input: 'Multi-platform live ingestion streams (X, TikTok, Instagram, broadcast transcripts)',
    output: 'Structured signal packet with velocity, volume, audio/video OCR detection, and raw sentiment',
    status: 'ACTIVE',
    avgLatency: '1.2s',
    currentTask: 'Ingesting 128 multi-market cultural telemetry streams'
  },
  {
    id: 'agent-2',
    name: 'Insight Agent',
    order: 2,
    icon: 'Sparkles',
    purpose: 'Synthesizes cultural signals into meaningful human consumer behaviors, cultural tensions, and underlying brand implications.',
    input: 'Signal packet + Unilever category taxonomy & historical consumer research corpus',
    output: 'Consumer Insight Synthesis with cultural tension analysis & opportunity window',
    status: 'ACTIVE',
    avgLatency: '2.4s',
    currentTask: 'Synthesizing sports cultural tension vectors'
  },
  {
    id: 'agent-3',
    name: 'Opportunity Agent',
    order: 3,
    icon: 'Target',
    purpose: 'Calculates multi-dimensional brand fit, velocity, commercial upside, and safety risk to generate deterministic system recommendations (ACT, WATCH, IGNORE, ESCALATE).',
    input: 'Insight Synthesis + Brand DNA guidelines + category priority matrices',
    output: 'Opportunity Scorecard (0-100) + Action Recommendation + Decision Trace',
    status: 'ACTIVE',
    avgLatency: '1.8s',
    currentTask: 'Scoring Rexona stoppage-time broadcast moment'
  },
  {
    id: 'agent-4',
    name: 'Strategy Agent',
    order: 4,
    icon: 'Compass',
    purpose: 'Formulates the cultural response strategy, strategic objectives, channel mix, audience targeting, and structured creative briefs.',
    input: 'Approved Opportunity + Brand guidelines + market objectives',
    output: 'Full strategic brief, channel blueprint, key message, mandatory claims constraints',
    status: 'STANDBY',
    avgLatency: '3.1s',
    currentTask: 'Idle / Ready for brand manager direction'
  },
  {
    id: 'agent-5',
    name: 'Creative Orchestrator',
    order: 5,
    icon: 'Palette',
    purpose: 'Determines required asset formats and routes generation tasks to appropriate specialized engines (video, copy, generative images, asset adaptation).',
    input: 'Approved Strategic Brief + Brand design language',
    output: '3 multi-format campaign directions with headlines, copy, visual blueprints & routing manifests',
    status: 'STANDBY',
    avgLatency: '4.2s',
    currentTask: 'Idle / Awaiting brief confirmation'
  },
  {
    id: 'agent-6',
    name: 'Governance Agent',
    order: 6,
    icon: 'ShieldCheck',
    purpose: 'Performs multi-layered automated compliance audits across Brand Tone, Substantiated Claims, Legal safety, Cultural sensitivities, and Market risks.',
    input: 'Generated creative concepts + Unilever global claims matrix + regional legal dictionaries',
    output: 'Governance Scorecard (Confidence %), check results, required escalation routing',
    status: 'ACTIVE',
    avgLatency: '1.5s',
    currentTask: 'Auditing 6 active creative variants for claim substantiation'
  },
  {
    id: 'agent-7',
    name: 'Localization Agent',
    order: 7,
    icon: 'Globe',
    purpose: 'Localizes cultural expression, colloquial idioms, hashtags, and market-specific formats while strictly preserving global strategic intent.',
    input: 'Approved Global Creative + Local market personas + regional platform nuance',
    output: 'Market-specific execution packs (India Hinglish, Brazil Portuguese, UK English)',
    status: 'ACTIVE',
    avgLatency: '2.8s',
    currentTask: 'Localizing reactive social formats for India & UK'
  },
  {
    id: 'agent-8',
    name: 'Activation & Learning Agent',
    order: 8,
    icon: 'Cpu',
    purpose: 'Packages multi-market activation manifests for human deployment, tracks post-launch performance telemetry, and closes the loop with reusable brand learnings.',
    input: 'Approved Local Executions + Activation confirmation',
    output: 'Live simulation telemetry, closed-loop insights & future recommendation weights',
    status: 'ACTIVE',
    avgLatency: '1.9s',
    currentTask: 'Simulating engagement telemetry & synthesis of audience learnings'
  }
];

export const INITIAL_HERO_OPPORTUNITY: Opportunity = {
  id: 'opp-rexona-referee',
  title: 'Football Referee Moment',
  brand: 'Rexona',
  market: 'India (Global Relevance)',
  category: 'Sports & Culture',
  detectedAt: '18 mins ago',
  summary: 'During stoppage time in a football match, cameras captured the Rexona logo visible beneath the referee\'s arm. The clip was rapidly shared across social platforms and became a meme.',
  score: {
    overall: 91,
    brandFit: 94,
    consumerRelevance: 89,
    culturalRelevance: 96,
    velocity: 98,
    commercialPotential: 84,
    executionFeasibility: 91,
    risk: 'LOW'
  },
  recommendation: 'ACT',
  recommendationReason: 'This opportunity combines high brand relevance, strong audience alignment, rapid cultural momentum (+342%) and low immediate risk. Delaying action materially reduces the probability of capturing the moment.',
  status: 'ACT NOW',
  risk: 'LOW',
  owner: 'Aarav Mehta (Brand Manager)',
  currentStage: 'opportunity',
  stageProgress: 35,
  signal: {
    description: 'During 90+4 stoppage time in a major football match, referee raised both arms to signal contentious VAR check, clearly exposing the Rexona logo on his sleeve/underarm. Online communities seized on the extreme high-pressure context, creating viral reaction clips.',
    evidence: {
      socialMentions: '183K',
      estimatedReach: '8.7M',
      velocityPercent: 342,
      positiveSentimentPercent: 76,
      memeReplication: 'High',
      targetAudienceConcentration: 'Sports & Culture Enthusiasts (18-34)',
      sourcePlatforms: ['Instagram Reels', 'X (Twitter)', 'TikTok', 'YouTube Shorts'],
      samplePosts: [
        {
          platform: 'X',
          author: 'Football Banter Daily',
          handle: '@FootyBanterHub',
          content: 'Referee checking VAR in the 95th minute under insane stadium pressure, but at least his Rexona protection is doing overtime 😭🔥',
          engagement: '42.8K likes • 8.1K retweets',
          timestamp: '22m ago'
        },
        {
          platform: 'Instagram',
          author: 'Meme Central India',
          handle: '@memecentral.in',
          content: 'When life puts you under maximum pressure but you still smell like absolute composure 👔⚡ #NeverLoseYourCool #FootballMemes',
          engagement: '89.4K likes • 1.4K comments',
          timestamp: '15m ago'
        },
        {
          platform: 'TikTok',
          author: 'Matchday POV',
          handle: '@matchdayreax',
          content: 'Rexona getting free stoppage time marketing during the most stressful 3 minutes of the season lmao',
          engagement: '14.2K shares • 210K views',
          timestamp: '11m ago'
        }
      ],
      trendData: [
        { time: 'T-60m', volume: 1200, sentiment: 62 },
        { time: 'T-45m', volume: 8400, sentiment: 68 },
        { time: 'T-30m', volume: 46000, sentiment: 74 },
        { time: 'T-15m', volume: 118000, sentiment: 76 },
        { time: 'Now', volume: 183000, sentiment: 79 }
      ]
    }
  },
  insight: {
    headline: 'Consumers are organically connecting Rexona with staying composed in high-pressure moments.',
    consumerBehaviour: 'People are actively turning an unexpected brand appearance into user-generated humor and social content without cynicism.',
    culturalTension: 'Audiences reward brands that participate naturally and playfully in live cultural moments instead of interrupting with stiff, scripted corporate ads.',
    brandImplication: 'The moment reinforces Rexona\'s core brand equity: staying confident, cool, and protected when the stakes are highest.',
    opportunityWindow: 'Peak engagement window is 4 to 12 hours. Acting within this window captures authentic organic engagement.'
  },
  decisionTrace: {
    evidenceConsidered: [
      'Signal velocity: +342% acceleration in past 45 minutes',
      'Brand relevance: 94/100 alignment with "Protection under pressure" equity',
      'Audience alignment: 72% concentration in core 18-34 male & co-ed sports demographic',
      'Cultural context: Organic humor, non-derogatory meme framing',
      'Risk evaluation: No IP violation, safe broadcast origin, low regulatory friction',
      'Timing window: High short-term cultural momentum requiring sub-2-hour activation'
    ],
    decisionLogic: 'High relevance, explosive momentum, strong audience alignment and low immediate risk make this prime for rapid, agile reactive activation rather than passive observation.'
  },
  strategy: {
    objective: 'Own the cultural moment without interrupting it by celebrating composure under supreme pressure.',
    audience: '18–34 sports and culture audiences across mobile video channels.',
    brandRole: 'Position Rexona as the definitive brand for staying confident, calm, and fresh under pressure.',
    coreMessage: 'Never lose your cool. 72hr protection for life\'s high-stakes stoppage time moments.',
    channels: ['Instagram Reels', 'TikTok', 'X (Twitter)'],
    recommendedFormats: ['Reactive Social Card', 'Short-form Meme Video', 'Rapid Response Community Dialogue'],
    activationWindow: 'Immediate (Next 2-4 Hours)',
    kpis: ['Organic Reach (>5M)', 'Engagement Rate (>6.5%)', 'Positive Sentiment (>80%)', 'Brand Association Lift'],
    mandatoryRules: ['Include Rexona iconic logo & 72H Freshness claim', 'Do not mention specific referee names', 'Maintain playful, high-energy tone'],
    claimsRequirements: ['Only use substantiated "72H sweat & odor protection" claim'],
    creativeTerritory: 'High-Stakes Stoppage Time Composure'
  },
  creativeBrief: {
    approved: false,
    content: {
      objective: 'Own the cultural moment without interrupting it.',
      audience: '18–34 sports and culture audiences.',
      brandRole: 'Position Rexona as the brand associated with staying confident under pressure.',
      coreMessage: 'Never lose your cool.',
      channels: ['Instagram', 'TikTok', 'X'],
      recommendedFormats: ['Reactive social', 'Short-form video', 'Meme-style creative'],
      activationWindow: 'Immediate',
      kpis: ['Reach', 'Engagement', 'Positive sentiment', 'Brand interaction'],
      mandatoryRules: ['Ensure Unilever Brand Safety Standards', 'Feature Rexona Shieldmark'],
      claimsRequirements: ['Pre-cleared 72H anti-perspirant efficacy'],
      creativeTerritory: 'Pressure? Handled.'
    }
  },
  creativeOptions: [
    {
      id: 'concept-1',
      number: '01',
      title: 'Never Lose Your Cool',
      tone: 'Bold / Humorous / Reactive',
      headline: '95th Minute. Maximum Heat. Zero Sweat.',
      coreIdea: 'Side-by-side split visual contrasting chaotic, heated stoppage-time drama with pure, relaxed underarm confidence.',
      caption: 'When 80,000 fans are yelling and VAR is checking, you stay composed. Rexona has your back (and your underarms) through all 90+ minutes. #NeverLoseYourCool #Rexona72H',
      visualDirection: 'Crisp split-screen: Left shows high-octane blurred stadium intensity; Right shows razor-sharp Rexona aerosol canister with cool cyan mist accents.',
      recommendedPlatform: 'Instagram Reels & X (Twitter)',
      brandRationale: 'Taps directly into the viral referee gesture with self-aware humor while reinforcing anti-perspirant performance.',
      aspectRatio: '9:16 & 1:1',
      assetType: 'Reactive Social',
      routingTarget: 'NEXT Copy Engine + Generative Asset Adaptation',
      status: 'SELECTED'
    },
    {
      id: 'concept-2',
      number: '02',
      title: 'Pressure? Handled.',
      tone: 'Minimal / Premium / Confident',
      headline: 'The Toughest Calls Require The Coolest Heads.',
      coreIdea: 'High-aesthetic minimalism focusing on pulse-rate telemetry and the calm assurance of 72-hour protection.',
      caption: 'Big decisions demand absolute freshness. Tested in the most heated arenas in sport. #PressureHandled #RexonaProtection',
      visualDirection: 'Deep navy background with illuminated stadium lights and clean white typographic layout.',
      recommendedPlatform: 'X (Twitter) & LinkedIn Sports Marketing',
      brandRationale: 'Appeals to brand authority and premium brand codes for broader leadership positioning.',
      aspectRatio: '1:1',
      assetType: 'Static Visual',
      routingTarget: 'Image Generation Studio',
      status: 'PENDING'
    },
    {
      id: 'concept-3',
      number: '03',
      title: 'The Moment Finds You',
      tone: 'Culture-Led / Social-First',
      headline: 'Caught On Camera Doing What We Do Best.',
      coreIdea: 'Fast-paced audio-reactive TikTok remix highlighting relatable high-pressure moments where you need protection.',
      caption: 'Didn\'t expect to make a cameo in stoppage time, but we\'re always ready. What\'s your 90+4 minute moment? 👇 #TheMomentFindsYou #RexonaStayFresh',
      visualDirection: 'Quick-cut montage of high-pressure relatable scenarios (job interview, missed bus, stadium final).',
      recommendedPlatform: 'TikTok & YouTube Shorts',
      brandRationale: 'Maximizes UGC replication and community engagement across Gen-Z creators.',
      aspectRatio: '9:16',
      assetType: 'Short-form Video',
      routingTarget: 'Video Generation Engine',
      status: 'PENDING'
    }
  ],
  selectedCreativeId: 'concept-1',
  governance: {
    confidencePercent: 94,
    status: 'APPROVED',
    approvedBy: 'Auto-Audit (Tier 1 Passed) + Legal Pre-Clearance',
    timestamp: 'Just now',
    checks: [
      {
        id: 'gov-1',
        name: 'Brand Identity & Tone Compliance',
        category: 'Brand Compliance',
        status: 'PASS',
        details: 'Visual assets utilize approved Rexona deep navy (#0B1F3A) and cyan (#06B6D4) color hierarchy with official shieldmark placement.'
      },
      {
        id: 'gov-2',
        name: 'Positioning & Equity Alignment',
        category: 'Brand Compliance',
        status: 'PASS',
        details: 'Theme strictly adheres to "Protection Under Pressure" global brand equity playbook.'
      },
      {
        id: 'gov-3',
        name: 'Substantiated Claims Audit',
        category: 'Claims',
        status: 'PASS',
        details: 'Efficacy reference matches Unilever R&D Dossier #RD-2024-72H-REX (No unverified medical or physical claims).'
      },
      {
        id: 'gov-4',
        name: 'Cultural Sensitivity & Fair Use Analysis',
        category: 'Cultural Risk',
        status: 'PASS',
        details: 'Parody and cultural commentary adhere to fair-use guidelines; no protected trademarked team crests or personal defamation detected.'
      },
      {
        id: 'gov-5',
        name: 'Market Nuance & Regulatory Review',
        category: 'Market Risk',
        status: 'PASS',
        details: 'Local advertising standards in India (ASCI), UK (ASA), and Brazil (CONAR) cleared for reactive social media commentary.'
      }
    ]
  },
  localizations: [
    {
      marketId: 'india',
      marketName: 'India',
      countryCode: 'IN',
      flag: '🇮🇳',
      status: 'APPROVED',
      language: 'English / Hinglish',
      localHeadline: 'Full Time Ho Ya Extra Time. Sweat Free, Har Time.',
      localCaption: 'Jab pressure high ho, tab Rexona saath ho. Whether it\'s a last-minute office pitch or a match finale, stay 100% fresh! ⚽🔥 #NeverLoseYourCool #RexonaIndia #FullTimeFreshness',
      culturalAdaptation: 'Blends cricket/football stoppage excitement with Hinglish idioms for high-pressure daily work and gaming moments.',
      channel: 'Instagram Reels & X',
      format: 'Vertical Video (9:16) & Carousel',
      cta: 'Shop 72H Shield on Blinkit / Zepto',
      governanceNote: 'ASCI digital influencer and reactive advertising compliant.',
      reviewer: 'Priya Sharma (India Media Lead)'
    },
    {
      marketId: 'brazil',
      marketName: 'Brazil',
      countryCode: 'BR',
      flag: '🇧🇷',
      status: 'APPROVED',
      language: 'Portuguese (BR)',
      localHeadline: 'Nos Acréscimos Ou No Apito Final: Rexona Não Te Abandona.',
      localCaption: 'Jogo quente, decisão tensa no VAR e zero preocupação com suor. O ref já sabe: confiança total até o último segundo! 🇧🇷⚡ #RexonaNaoTeAbandona #FutebolBrasileiro',
      culturalAdaptation: 'Leverages the famous Brazilian brand tagline "Rexona não te abandona" with intense passion for VAR controversies in football.',
      channel: 'TikTok & Instagram',
      format: 'Short-form Video (9:16)',
      cta: 'Compre Rexona Clinical na Droga Raia',
      governanceNote: 'CONAR self-regulation validated for sports reactive social.',
      reviewer: 'Lucas Silva (LATAM Brand Lead)'
    },
    {
      marketId: 'uk',
      marketName: 'United Kingdom',
      countryCode: 'GB',
      flag: '🇬🇧',
      status: 'APPROVED',
      language: 'British English',
      localHeadline: 'Added Time Drama. Zero Underarm Drama.',
      localCaption: '90+6 on the clock and the tension is palpable. At least one person on the pitch is staying completely calm. Keep your cool. #NeverLoseYourCool #Sure72H #PremierMoments',
      culturalAdaptation: 'Understated British dry humor referencing the local brand equivalent (Sure/Rexona) with iconic football matchday banter.',
      channel: 'X (Twitter) & Instagram Stories',
      format: 'Reactive Social Card & Poll',
      cta: 'Find in Boots & Sainsbury\'s',
      governanceNote: 'ASA sports broadcast commentary standards cleared.',
      reviewer: 'James Campbell (UK Brand Lead)'
    }
  ],
  activation: {
    status: 'READY',
    channels: ['Instagram Reels', 'TikTok', 'X (Twitter)', 'Blinkit Instant Commerce'],
    assetsCount: 6,
    telemetry: {
      impressions: 4820000,
      engagements: 412000,
      sentimentScore: 88,
      ctr: 4.8,
      shares: 38400
    }
  },
  learnings: {
    whatWorked: 'Humor-led reactive creative generated 2.8x higher engagement and positive sentiment compared to standard product feature ads.',
    audienceLearning: 'Sports and gaming audiences aged 18–34 exhibited the highest share rate (38.4K shares in first 3 hours) and organic meme remakes.',
    creativeLearning: 'Split-screen reactive video with subtle brand mist animations outperformed static visual formats by 190% in click-through velocity.',
    recommendation: 'Prioritize culturally native short-form video and instant commerce links for all future live sports stoppage-time opportunities.',
    appliedToFuture: true
  }
};

export const SEEDED_OPPORTUNITIES: Opportunity[] = [
  INITIAL_HERO_OPPORTUNITY,
  {
    id: 'opp-rexona-workout',
    title: 'Post-Workout Freshness Conversation',
    brand: 'Rexona',
    market: 'India & Southeast Asia',
    category: 'Fitness & Lifestyle',
    detectedAt: '2 hrs ago',
    summary: 'Rising discussion among fitness influencers comparing 48H vs 72H anti-perspirants during high-humidity HIIT workouts.',
    score: {
      overall: 76,
      brandFit: 91,
      consumerRelevance: 84,
      culturalRelevance: 71,
      velocity: 64,
      commercialPotential: 78,
      executionFeasibility: 86,
      risk: 'LOW'
    },
    recommendation: 'WATCH',
    recommendationReason: 'Strong brand alignment with steady organic growth. Velocity is currently moderate; recommend automated tracking before committing dedicated creative sprint.',
    status: 'WATCH',
    risk: 'LOW',
    owner: 'Priya Sharma (CMI Analyst)',
    currentStage: 'opportunity',
    stageProgress: 30,
    signal: {
      description: 'Micro-influencers in Mumbai and Bengaluru sharing gym locker room routines highlighting sweat resistance in monsoon humidity.',
      evidence: {
        socialMentions: '34K',
        estimatedReach: '1.4M',
        velocityPercent: 64,
        positiveSentimentPercent: 82,
        memeReplication: 'Low',
        targetAudienceConcentration: 'Active Gymgoers & Runners (20-35)',
        sourcePlatforms: ['Instagram Reels', 'YouTube Shorts'],
        samplePosts: [
          {
            platform: 'Instagram',
            author: 'FitWithKunal',
            handle: '@fit_kunal',
            content: 'Monsoon humidity is ruthless. Tested 3 roll-ons during CrossFit — only one survived without reapplication 💦💪',
            engagement: '8.4K likes',
            timestamp: '3h ago'
          }
        ],
        trendData: [
          { time: 'Day -3', volume: 4200, sentiment: 78 },
          { time: 'Day -2', volume: 9800, sentiment: 80 },
          { time: 'Yesterday', volume: 18000, sentiment: 81 },
          { time: 'Today', volume: 34000, sentiment: 82 }
        ]
      }
    },
    insight: {
      headline: 'Urban athletes seek definitive proof of anti-perspirant durability under high humidity.',
      consumerBehaviour: 'Consumers are conducting DIY sweat tests and sharing unedited workout sweat patches.',
      culturalTension: 'Consumers mistrust traditional lab claims and demand real-world extreme condition validation.',
      brandImplication: 'Opportunity to showcase Rexona Clinical Protection with real-time biometric telemetry.',
      opportunityWindow: 'Evergreen / 2-week campaign window.'
    },
    decisionTrace: {
      evidenceConsidered: ['Moderate velocity (+64%)', 'High brand fit (91/100)', 'Low immediate perishability'],
      decisionLogic: 'Signal is valuable for scheduled campaign inclusion but does not require instant reactive intervention. Set to WATCH.'
    },
    creativeOptions: [],
    governance: {
      confidencePercent: 96,
      status: 'APPROVED',
      checks: []
    },
    localizations: [],
    activation: {
      status: 'DRAFT',
      channels: ['Instagram Reels'],
      assetsCount: 2,
      telemetry: { impressions: 0, engagements: 0, sentimentScore: 0, ctr: 0, shares: 0 }
    }
  },
  {
    id: 'opp-vaseline-hack',
    title: 'Viral DIY Vaseline Slugging Hack',
    brand: 'Vaseline',
    market: 'United Kingdom & Global',
    category: 'Skincare & Beauty',
    detectedAt: '45 mins ago',
    summary: 'TikTok creators promoting an unconventional DIY under-eye mixture combining petroleum jelly with citrus juice for dark circle removal.',
    score: {
      overall: 68,
      brandFit: 62,
      consumerRelevance: 88,
      culturalRelevance: 85,
      velocity: 210,
      commercialPotential: 54,
      executionFeasibility: 40,
      risk: 'HIGH'
    },
    recommendation: 'ESCALATE',
    recommendationReason: 'High conversation velocity (+210%) involving product misuse. Scientific validation and R&D / Legal safety escalation mandatory prior to brand response.',
    status: 'ESCALATE',
    risk: 'HIGH',
    owner: 'Dr. Sarah Jenkins (R&D / Claims Lead)',
    currentStage: 'opportunity',
    stageProgress: 30,
    signal: {
      description: 'Viral TikTok trend with 4.2M views showing users applying citrus-mixed petroleum jelly directly near the eye contour.',
      evidence: {
        socialMentions: '92K',
        estimatedReach: '4.2M',
        velocityPercent: 210,
        positiveSentimentPercent: 44,
        memeReplication: 'High',
        targetAudienceConcentration: 'Gen-Z Skincare Enthusiasts (16-24)',
        sourcePlatforms: ['TikTok', 'Instagram'],
        samplePosts: [
          {
            platform: 'TikTok',
            author: 'GlowHacks101',
            handle: '@glowhacks_uk',
            content: 'Mix lemon drops with Vaseline for overnight brightening?? Tried it and my eyes feel weird 🤔',
            engagement: '31K likes • 4.8K comments',
            timestamp: '50m ago'
          }
        ],
        trendData: [
          { time: 'T-4h', volume: 3000, sentiment: 60 },
          { time: 'T-2h', volume: 22000, sentiment: 48 },
          { time: 'Now', volume: 92000, sentiment: 44 }
        ]
      }
    },
    insight: {
      headline: 'Consumers are risking eye irritation through unverified DIY hacks using Vaseline packaging.',
      consumerBehaviour: 'Gen-Z skincare users experiment with extreme DIY cocktails without dermatological guidance.',
      culturalTension: 'The desire for fast, cheap skin brightening clashes with dermatological safety.',
      brandImplication: 'Vaseline must protect consumer safety by issuing clear expert dermatologist advice without sounding punitive.',
      opportunityWindow: 'Urgent risk containment within 6 hours.'
    },
    decisionTrace: {
      evidenceConsidered: ['Product safety risk', 'Negative sentiment trending downward (44%)', 'R&D chemical contraindication with acidic citrus'],
      decisionLogic: 'Unsubstantiated skin hack presents brand reputation and consumer safety risk. Auto-escalated to Chief Medical Officer & Legal.'
    },
    creativeOptions: [],
    governance: {
      confidencePercent: 42,
      status: 'REVIEW_REQUIRED',
      checks: [
        {
          id: 'gov-v1',
          name: 'Dermatological Safety Contraindication',
          category: 'Claims',
          status: 'FAIL',
          details: 'Applying citrus to peri-orbital area can cause severe phytophotodermatitis. Requires safety disclaimer.'
        }
      ]
    },
    localizations: [],
    activation: {
      status: 'DRAFT',
      channels: ['TikTok Clarification'],
      assetsCount: 1,
      telemetry: { impressions: 0, engagements: 0, sentimentScore: 0, ctr: 0, shares: 0 }
    }
  },
  {
    id: 'opp-low-relevance',
    title: 'Viral Celebrity Red Carpet Outfit Meme',
    brand: 'Rexona',
    market: 'United States & UK',
    category: 'Celebrity & Pop Culture',
    detectedAt: '3 hrs ago',
    summary: 'Massive trending meme about an avant-garde silver foil outfit worn at an awards gala. High aggregate volume with virtually zero category resonance.',
    score: {
      overall: 41,
      brandFit: 22,
      consumerRelevance: 78,
      culturalRelevance: 82,
      velocity: 180,
      commercialPotential: 15,
      executionFeasibility: 35,
      risk: 'LOW'
    },
    recommendation: 'IGNORE',
    recommendationReason: 'High conversation volume but extremely weak brand relevance (22/100). Intervening would constitute brand intrusion and wasteful media spend.',
    status: 'IGNORE',
    risk: 'LOW',
    owner: 'NEXT Automated Decision Filter',
    currentStage: 'opportunity',
    stageProgress: 20,
    signal: {
      description: 'Pop culture memes joking that celebrity dress looks like an emergency foil blanket.',
      evidence: {
        socialMentions: '310K',
        estimatedReach: '18M',
        velocityPercent: 180,
        positiveSentimentPercent: 65,
        memeReplication: 'High',
        targetAudienceConcentration: 'General Entertainment (18-49)',
        sourcePlatforms: ['X', 'Instagram', 'TikTok'],
        samplePosts: [],
        trendData: []
      }
    },
    insight: {
      headline: 'General entertainment meme without functional or emotional brand connection.',
      consumerBehaviour: 'Passive entertainment sharing.',
      culturalTension: 'None related to personal care or confidence.',
      brandImplication: 'Forced participation would feel like out-of-touch corporate marketing.',
      opportunityWindow: 'Extinguished.'
    },
    decisionTrace: {
      evidenceConsidered: ['Brand fit score below threshold (22 < 60)', 'Zero category search correlation', 'Low commercial upside'],
      decisionLogic: 'NEXT rules engine enforces discipline: high volume does not equal brand opportunity. Rejecting action.'
    },
    creativeOptions: [],
    governance: { confidencePercent: 100, status: 'PENDING', checks: [] },
    localizations: [],
    activation: { status: 'DRAFT', channels: [], assetsCount: 0, telemetry: { impressions: 0, engagements: 0, sentimentScore: 0, ctr: 0, shares: 0 } }
  },
  {
    id: 'opp-surf-excel-cricket',
    title: 'Muddy Cricket Match Winning Catch',
    brand: 'Surf Excel',
    market: 'India',
    category: 'Sports & Heritage',
    detectedAt: '5 hrs ago',
    summary: 'A grassroots school cricket tournament clip showing a fielder making a heroic diving catch in deep mud, celebrating proudly despite dirt-covered whites.',
    score: {
      overall: 88,
      brandFit: 96,
      consumerRelevance: 92,
      culturalRelevance: 90,
      velocity: 145,
      commercialPotential: 82,
      executionFeasibility: 88,
      risk: 'LOW'
    },
    recommendation: 'ACT',
    recommendationReason: 'Exceptional alignment with "Daag Acche Hain" (Dirt is Good) brand equity (+96% fit). Wholesome, inspiring community storytelling.',
    status: 'IN PROGRESS',
    risk: 'LOW',
    owner: 'Ananya Deshmukh (Surf Excel Brand Manager)',
    currentStage: 'creative',
    stageProgress: 60,
    signal: {
      description: 'Young player in Chennai diving 6 feet into rain mud to take game-winning catch in inter-school semifinal.',
      evidence: {
        socialMentions: '78K',
        estimatedReach: '3.6M',
        velocityPercent: 145,
        positiveSentimentPercent: 94,
        memeReplication: 'Medium',
        targetAudienceConcentration: 'Families & Sports Fans (25-45)',
        sourcePlatforms: ['Instagram', 'YouTube', 'WhatsApp'],
        samplePosts: [],
        trendData: []
      }
    },
    insight: {
      headline: 'Authentic celebration of grit, passion, and carefree effort over pristine cleanliness.',
      consumerBehaviour: 'Parents and cricket enthusiasts sharing the video as an example of dedication and joy.',
      culturalTension: 'Fear of stains vs celebrating true youthful passion and triumph.',
      brandImplication: 'Perfect real-life reaffirmation that dirt earned in the pursuit of greatness is a badge of honor.',
      opportunityWindow: '24-48 hours.'
    },
    decisionTrace: {
      evidenceConsidered: ['Iconic brand equity match (96/100)', '94% overwhelmingly positive sentiment', 'Clean legal context'],
      decisionLogic: 'Unanimous ACT NOW recommendation. Initiated "Dirt of Champions" reactive tribute.'
    },
    creativeOptions: [],
    governance: { confidencePercent: 98, status: 'APPROVED', checks: [] },
    localizations: [],
    activation: { status: 'DRAFT', channels: ['Instagram', 'Hotstar'], assetsCount: 3, telemetry: { impressions: 0, engagements: 0, sentimentScore: 0, ctr: 0, shares: 0 } }
  },
  {
    id: 'opp-axe-gamer-sweat',
    title: 'Gamer Streamer 24-Hour Sweatathon',
    brand: 'Axe',
    market: 'Brazil & UK',
    category: 'Gaming & Gen-Z',
    detectedAt: '6 hrs ago',
    summary: 'Top Twitch streamer joking about room temperature and body spray during an intense 24-hour esports championship qualifiers stream.',
    score: {
      overall: 82,
      brandFit: 85,
      consumerRelevance: 86,
      culturalRelevance: 88,
      velocity: 115,
      commercialPotential: 79,
      executionFeasibility: 85,
      risk: 'LOW'
    },
    recommendation: 'ACT',
    recommendationReason: 'High Gen-Z gaming audience concentration. Opportunity to deliver reactive digital care package and interactive livestream overlays.',
    status: 'IN PROGRESS',
    risk: 'LOW',
    owner: 'Carlos Mendes (Axe Brand Lead)',
    currentStage: 'strategy',
    stageProgress: 45,
    signal: {
      description: 'Streamer audience spamming chat with deodorant jokes during tense clutch rounds.',
      evidence: {
        socialMentions: '52K',
        estimatedReach: '2.1M',
        velocityPercent: 115,
        positiveSentimentPercent: 81,
        memeReplication: 'Medium',
        targetAudienceConcentration: 'Gamers (16-28)',
        sourcePlatforms: ['Twitch', 'TikTok', 'X'],
        samplePosts: [],
        trendData: []
      }
    },
    insight: {
      headline: 'Gaming marathon endurance requires relatable, non-judgmental freshness reassurance.',
      consumerBehaviour: 'Gamers bond over the physical toll and humor of long multiplayer sessions.',
      culturalTension: 'Hardcore gaming intensity vs maintaining confidence and freshness.',
      brandImplication: 'Establishes Axe as the ultimate gaming battle-station grooming partner.',
      opportunityWindow: '12 hours.'
    },
    decisionTrace: {
      evidenceConsidered: ['Target demographic exact match', 'Streamer brand safe', 'Direct Twitch integration capability'],
      decisionLogic: 'ACT NOW approved for dynamic Twitch stream chat activation.'
    },
    creativeOptions: [],
    governance: { confidencePercent: 92, status: 'APPROVED', checks: [] },
    localizations: [],
    activation: { status: 'DRAFT', channels: ['Twitch', 'Discord'], assetsCount: 2, telemetry: { impressions: 0, engagements: 0, sentimentScore: 0, ctr: 0, shares: 0 } }
  },
  {
    id: 'opp-dove-body-positivity',
    title: 'Gym Underarm Confidence Dialogue',
    brand: 'Dove',
    market: 'United Kingdom',
    category: 'Body Confidence',
    detectedAt: '8 hrs ago',
    summary: 'Rising discussion questioning unrealistic airbrushed underarms in fitness marketing, promoting skin nourishment and real texture.',
    score: {
      overall: 84,
      brandFit: 95,
      consumerRelevance: 88,
      culturalRelevance: 86,
      velocity: 78,
      commercialPotential: 80,
      executionFeasibility: 90,
      risk: 'LOW'
    },
    recommendation: 'ACT',
    recommendationReason: 'Superb alignment with Dove Real Beauty mission. Steady organic momentum with strong community trust building potential.',
    status: 'IN PROGRESS',
    risk: 'LOW',
    owner: 'Emma Watson (Dove Brand Manager)',
    currentStage: 'localization',
    stageProgress: 75,
    signal: {
      description: 'Fitness creators showing unretouched skin textures under gym lighting with #RealGymSkin.',
      evidence: {
        socialMentions: '41K',
        estimatedReach: '1.9M',
        velocityPercent: 78,
        positiveSentimentPercent: 91,
        memeReplication: 'Low',
        targetAudienceConcentration: 'Women 18-40 (Fitness & Wellness)',
        sourcePlatforms: ['Instagram', 'TikTok'],
        samplePosts: [],
        trendData: []
      }
    },
    insight: {
      headline: 'Women are rejecting idealized underarm beauty standards in favor of skin barrier care and comfort.',
      consumerBehaviour: 'Positive affirmation and real skin sharing.',
      culturalTension: 'Unattainable smooth aesthetics vs real healthy skin care.',
      brandImplication: 'Highlights Dove 1/4 Moisturising Cream formula as nourishing care, not cosmetic concealment.',
      opportunityWindow: '3-5 days.'
    },
    decisionTrace: {
      evidenceConsidered: ['Core Dove brand purpose match (95/100)', 'Zero risk', 'High emotional resonance'],
      decisionLogic: 'ACT approved for thought-leadership and creator partnership campaign.'
    },
    creativeOptions: [],
    governance: { confidencePercent: 97, status: 'APPROVED', checks: [] },
    localizations: [],
    activation: { status: 'DRAFT', channels: ['Instagram'], assetsCount: 4, telemetry: { impressions: 0, engagements: 0, sentimentScore: 0, ctr: 0, shares: 0 } }
  },
  {
    id: 'opp-sensitive-slang',
    title: 'Ambiguous Regional Street Slang Trend',
    brand: 'Rexona',
    market: 'India (Regional)',
    category: 'Language & Slang',
    detectedAt: '12 hrs ago',
    summary: 'Trending regional collegiate meme phrase with double entendre connotations gaining traction on youth messaging apps.',
    score: {
      overall: 35,
      brandFit: 18,
      consumerRelevance: 55,
      culturalRelevance: 62,
      velocity: 140,
      commercialPotential: 20,
      executionFeasibility: 25,
      risk: 'HIGH'
    },
    recommendation: 'ESCALATE',
    recommendationReason: 'Cultural risk assessment flags slang phrase as carrying potential vulgar or exclusionary innuendo. Escalated to regional linguistics council; recommended IGNORE.',
    status: 'ESCALATE',
    risk: 'HIGH',
    owner: 'NEXT Brand Safety Watchdog',
    currentStage: 'opportunity',
    stageProgress: 20,
    signal: {
      description: 'Catchphrase appearing in college reels with split interpretations.',
      evidence: {
        socialMentions: '62K',
        estimatedReach: '1.1M',
        velocityPercent: 140,
        positiveSentimentPercent: 38,
        memeReplication: 'High',
        targetAudienceConcentration: 'Tier 2/3 College Students',
        sourcePlatforms: ['Instagram', 'Telegram'],
        samplePosts: [],
        trendData: []
      }
    },
    insight: {
      headline: 'High velocity youth slang with contested cultural sensitivity.',
      consumerBehaviour: 'Viral meme adoption without consensus meaning.',
      culturalTension: 'Edgy slang vs brand family safety standards.',
      brandImplication: 'High risk of public relations backlash if co-opted improperly.',
      opportunityWindow: 'Blocked.'
    },
    decisionTrace: {
      evidenceConsidered: ['Brand safety risk index high', 'Negative sentiment index 62%', 'Linguistics check ambiguous'],
      decisionLogic: 'Automatic containment. High risk requires Brand Director & Legal sign-off before any action.'
    },
    creativeOptions: [],
    governance: { confidencePercent: 32, status: 'REVIEW_REQUIRED', checks: [] },
    localizations: [],
    activation: { status: 'DRAFT', channels: [], assetsCount: 0, telemetry: { impressions: 0, engagements: 0, sentimentScore: 0, ctr: 0, shares: 0 } }
  }
];

export const SEEDED_WORKFLOWS: WorkflowItem[] = [
  {
    id: 'wf-1',
    opportunityId: 'opp-rexona-referee',
    title: 'Football Referee Stoppage Time Moment',
    brand: 'Rexona',
    market: 'India / Brazil / UK',
    currentStage: 'opportunity',
    stageLabel: 'Pending Decision Gate',
    progressPercent: 35,
    owner: 'Aarav Mehta',
    nextAction: 'Approve Opportunity Recommendation (ACT NOW)',
    slaRemaining: '01:42:15',
    status: 'ACTIVE',
    risk: 'LOW',
    updatedAt: '2 mins ago'
  },
  {
    id: 'wf-2',
    opportunityId: 'opp-surf-excel-cricket',
    title: 'Muddy Cricket Match Winning Catch',
    brand: 'Surf Excel',
    market: 'India',
    currentStage: 'creative',
    stageLabel: 'Creative Concept Review',
    progressPercent: 60,
    owner: 'Ananya Deshmukh',
    nextAction: 'Approve Concept 02: Dirt of Champions',
    slaRemaining: '03:15:00',
    status: 'ACTIVE',
    risk: 'LOW',
    updatedAt: '25 mins ago'
  },
  {
    id: 'wf-3',
    opportunityId: 'opp-dove-body-positivity',
    title: 'Gym Underarm Skin Confidence',
    brand: 'Dove',
    market: 'United Kingdom',
    currentStage: 'localization',
    stageLabel: 'Market Adaptation Review',
    progressPercent: 75,
    owner: 'Emma Watson',
    nextAction: 'Approve UK Boots Retail Pack',
    slaRemaining: '06:30:00',
    status: 'ACTIVE',
    risk: 'LOW',
    updatedAt: '1 hr ago'
  },
  {
    id: 'wf-4',
    opportunityId: 'opp-vaseline-hack',
    title: 'Viral DIY Vaseline Slugging Hack',
    brand: 'Vaseline',
    market: 'UK & Global',
    currentStage: 'governance',
    stageLabel: 'R&D Safety Escalation',
    progressPercent: 30,
    owner: 'Dr. Sarah Jenkins',
    nextAction: 'Conduct R&D Chemical Safety Review',
    slaRemaining: '00:45:00',
    status: 'BLOCKED',
    risk: 'HIGH',
    updatedAt: '12 mins ago'
  }
];

export const SEEDED_CAMPAIGNS: CampaignItem[] = [
  {
    id: 'camp-1',
    name: 'Never Lose Your Cool',
    brand: 'Rexona',
    markets: ['India', 'Brazil', 'United Kingdom'],
    stage: 'Activated',
    approvalStatus: 'Approved',
    channels: ['Instagram Reels', 'TikTok', 'X', 'Blinkit'],
    liveSince: 'Live Production',
    reach: '8.7M Projected',
    engagementRate: '7.4%',
    sentiment: '88% Positive',
    roi: '3.8x Target',
    creativeThumbnail: 'sports'
  },
  {
    id: 'camp-2',
    name: 'Dirt of Champions',
    brand: 'Surf Excel',
    markets: ['India'],
    stage: 'In Production',
    approvalStatus: 'Approved',
    channels: ['Hotstar', 'Instagram', 'YouTube'],
    liveSince: 'Launch in 4h',
    reach: '4.2M Estimated',
    engagementRate: '8.1%',
    sentiment: '95% Positive',
    roi: '4.1x Target',
    creativeThumbnail: 'cricket'
  },
  {
    id: 'camp-3',
    name: 'Real Gym Skin Care',
    brand: 'Dove',
    markets: ['United Kingdom'],
    stage: 'Testing',
    approvalStatus: 'Pending Review',
    channels: ['Instagram', 'TikTok'],
    liveSince: 'Launch in 12h',
    reach: '1.9M Estimated',
    engagementRate: '5.6%',
    sentiment: '92% Positive',
    roi: '2.9x Target',
    creativeThumbnail: 'skincare'
  },
  {
    id: 'camp-4',
    name: 'Game-Ready Freshness',
    brand: 'Axe',
    markets: ['Brazil', 'UK'],
    stage: 'In Production',
    approvalStatus: 'Approved',
    channels: ['Twitch', 'Discord', 'YouTube'],
    liveSince: 'Launch in 8h',
    reach: '2.8M Estimated',
    engagementRate: '6.9%',
    sentiment: '84% Positive',
    roi: '3.2x Target',
    creativeThumbnail: 'gaming'
  }
];

export const SEEDED_INTELLIGENCE: IntelligenceSignal[] = [
  {
    id: 'intel-1',
    title: 'Sports Stoppage Time & VAR Tension Memes',
    category: 'Sports Culture',
    brandAlignment: 'Rexona (+94%)',
    volume: '183K mentions',
    velocityPercent: 342,
    sentimentPercent: 76,
    relevanceScore: 96,
    status: 'SURGING',
    detectedAt: '18m ago',
    summary: 'Referee gesture during high-stress stoppage time creating viral meme format across football fandoms worldwide.'
  },
  {
    id: 'intel-2',
    title: 'Monsoon Humidity & Extreme Workout Testing',
    category: 'Confidence & Freshness',
    brandAlignment: 'Rexona (+91%)',
    volume: '34K mentions',
    velocityPercent: 64,
    sentimentPercent: 82,
    relevanceScore: 84,
    status: 'EMERGING',
    detectedAt: '2h ago',
    summary: 'CrossFit and running athletes in South Asia testing anti-perspirant endurance against 90%+ humidity.'
  },
  {
    id: 'intel-3',
    title: 'Raw Grassroots Sports Triumphs (#DaagAccheHain)',
    category: 'Self-Expression',
    brandAlignment: 'Surf Excel (+96%)',
    volume: '78K mentions',
    velocityPercent: 145,
    sentimentPercent: 94,
    relevanceScore: 92,
    status: 'SURGING',
    detectedAt: '5h ago',
    summary: 'Inter-school cricket match muddy heroic catches celebrating relentless determination and carefree effort.'
  },
  {
    id: 'intel-4',
    title: 'Unretouched Underarm & Body Realness',
    category: 'Beauty & Skin',
    brandAlignment: 'Dove (+95%)',
    volume: '41K mentions',
    velocityPercent: 78,
    sentimentPercent: 91,
    relevanceScore: 88,
    status: 'EMERGING',
    detectedAt: '8h ago',
    summary: 'Gen-Z female creators advocating for nourishing skin hydration over artificial cosmetic smoothing.'
  },
  {
    id: 'intel-5',
    title: 'Marathon Streamer Sweat & Energy Jokes',
    category: 'Sports Culture',
    brandAlignment: 'Axe (+85%)',
    volume: '52K mentions',
    velocityPercent: 115,
    sentimentPercent: 81,
    relevanceScore: 86,
    status: 'STABLE',
    detectedAt: '6h ago',
    summary: 'Twitch esports qualifiers highlighting relatable gaming station heat and freshness challenges.'
  },
  {
    id: 'intel-6',
    title: 'DIY Slugging Cocktails & Acidic Mixtures',
    category: 'Beauty & Skin',
    brandAlignment: 'Vaseline (+62% / Safety Warning)',
    volume: '92K mentions',
    velocityPercent: 210,
    sentimentPercent: 44,
    relevanceScore: 68,
    status: 'SURGING',
    detectedAt: '45m ago',
    summary: 'TikTok DIY skin brightening trend using lemon and petroleum jelly near eyes; requires corrective dermatological guidance.'
  },
  {
    id: 'intel-7',
    title: 'Micro-Refillable & Zero Waste Deodorants',
    category: 'Sustainability',
    brandAlignment: 'Unilever Brand Portfolio (+88%)',
    volume: '65K mentions',
    velocityPercent: 32,
    sentimentPercent: 89,
    relevanceScore: 79,
    status: 'STABLE',
    detectedAt: '1d ago',
    summary: 'Eco-conscious consumers discussing durable aluminum cases and refill cartridge convenience.'
  },
  {
    id: 'intel-8',
    title: 'High-Temperature Commuter Confidence Hacks',
    category: 'Confidence & Freshness',
    brandAlignment: 'Rexona (+89%)',
    volume: '48K mentions',
    velocityPercent: 58,
    sentimentPercent: 84,
    relevanceScore: 81,
    status: 'STABLE',
    detectedAt: '1d ago',
    summary: 'Public transit commuters sharing summer morning survival routines with clinical antiperspirant.'
  }
];

export const INITIAL_NOTIFICATIONS: UserNotification[] = [
  {
    id: 'notif-1',
    title: 'Urgent Signal Detected (Rexona)',
    message: 'Football Referee Stoppage Time moment surging (+342% velocity). ACT NOW recommendation ready for review.',
    type: 'opportunity',
    timestamp: '18m ago',
    read: false,
    opportunityId: 'opp-rexona-referee'
  },
  {
    id: 'notif-2',
    title: 'Decision Gate Awaiting Brand Manager',
    message: 'Human approval required on Rexona Football Moment before strategic briefing engine unlocks.',
    type: 'approval',
    timestamp: '12m ago',
    read: false,
    opportunityId: 'opp-rexona-referee'
  },
  {
    id: 'notif-3',
    title: 'Governance Auto-Audit Complete',
    message: 'Automated 5-point compliance audit passed with 94% confidence for Rexona Reactive Campaign.',
    type: 'governance',
    timestamp: '5m ago',
    read: false,
    opportunityId: 'opp-rexona-referee'
  },
  {
    id: 'notif-4',
    title: 'R&D Escalation Triggered',
    message: 'Vaseline DIY Slugging Hack flagged as High Risk (Product Misuse). Assigned to Dr. Sarah Jenkins.',
    type: 'sla',
    timestamp: '35m ago',
    read: true,
    opportunityId: 'opp-vaseline-hack'
  }
];

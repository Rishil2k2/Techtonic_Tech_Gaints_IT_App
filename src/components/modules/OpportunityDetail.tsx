import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Globe, 
  TrendingUp, 
  Check, 
  Zap, 
  ChevronRight,
  UserCheck,
  RefreshCw,
  Cpu,
  Radio,
  FileText,
  Share2,
  Clock,
  Layers,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';
import { ScoreGauge } from '../common/ScoreGauge';
import { WorkflowTracker } from '../common/WorkflowTracker';
import { AIDecisionTrace } from '../common/AIDecisionTrace';
import { HumanGateModal } from '../common/HumanGateModal';
import { WorkflowStage } from '../../types';

export const OpportunityDetail: React.FC = () => {
  const { 
    selectedOpportunity, 
    selectOpportunity,
    approveOpportunityDecision,
    modifyOpportunityDecision,
    rejectOpportunityDecision,
    approveStrategy,
    selectCreativeConcept,
    approveGovernance,
    escalateGovernance,
    approveMarketLocalization,
    activateCampaign,
    applyLearningsToFuture,
    userWorkspace,
    addCustomEvidence,
    updateOpportunityInsight,
    updateStrategyBrief,
    addCustomCreativeConcept,
    addCustomGovernanceCheck,
    addCustomMarketLocalization,
    addCustomLearningNote,
  } = useApp();

  const [activeTab, setActiveTab] = useState<WorkflowStage>('signal');
  const [showHumanGateModal, setShowHumanGateModal] = useState(false);
  const [isActivating, setIsActivating] = useState(false);
  
  // Custom user input state handlers across the 9 stages
  const [showAddEvidence, setShowAddEvidence] = useState(false);
  const [newEvAuthor, setNewEvAuthor] = useState('');
  const [newEvPlatform, setNewEvPlatform] = useState<'Instagram' | 'TikTok' | 'X' | 'YouTube' | 'Reddit' | 'Reviews'>('Instagram');
  const [newEvContent, setNewEvContent] = useState('');
  const [newEvEngagement, setNewEvEngagement] = useState('');

  const [isEditingInsight, setIsEditingInsight] = useState(false);
  const [editInsightHeadline, setEditInsightHeadline] = useState('');
  const [editInsightBehaviour, setEditInsightBehaviour] = useState('');
  const [editInsightTension, setEditInsightTension] = useState('');
  const [editInsightImplication, setEditInsightImplication] = useState('');
  const [editInsightWindow, setEditInsightWindow] = useState('');

  const [isEditingStrategy, setIsEditingStrategy] = useState(false);
  const [editStratObjective, setEditStratObjective] = useState('');
  const [editStratAudience, setEditStratAudience] = useState('');
  const [editStratCoreMessage, setEditStratCoreMessage] = useState('');
  const [newRuleInput, setNewRuleInput] = useState('');

  const [showAddConceptModal, setShowAddConceptModal] = useState(false);
  const [newCcHeadline, setNewCcHeadline] = useState('');
  const [newCcCoreIdea, setNewCcCoreIdea] = useState('');
  const [newCcPlatform, setNewCcPlatform] = useState('Instagram Reels & Stories');
  const [newCcAssetType, setNewCcAssetType] = useState('Short-form Video');
  const [newCcTone, setNewCcTone] = useState('High Urgency & Witty');
  const [newCcCaption, setNewCcCaption] = useState('');

  const [showAddGovernanceModal, setShowAddGovernanceModal] = useState(false);
  const [newGovName, setNewGovName] = useState('');
  const [newGovCategory, setNewGovCategory] = useState('Brand Guidelines');
  const [newGovDetails, setNewGovDetails] = useState('');

  const [showAddMarketModal, setShowAddMarketModal] = useState(false);
  const [newLocMarketName, setNewLocMarketName] = useState('Japan');
  const [newLocFlag, setNewLocFlag] = useState('🇯🇵');
  const [newLocLanguage, setNewLocLanguage] = useState('Japanese');
  const [newLocHeadline, setNewLocHeadline] = useState('');
  const [newLocCaption, setNewLocCaption] = useState('');
  const [newLocNuance, setNewLocNuance] = useState('');

  const [showAddLearningModal, setShowAddLearningModal] = useState(false);
  const [newLearnWorked, setNewLearnWorked] = useState('');
  const [newLearnRecommendation, setNewLearnRecommendation] = useState('');

  if (!selectedOpportunity) {
    return (
      <div className="p-12 text-center text-[#5B6B7A]">
        <p>No opportunity selected.</p>
        <button
          type="button"
          onClick={() => selectOpportunity('opp-rexona-referee')}
          className="mt-4 px-4 py-2 bg-[#1769E0] text-white text-xs font-semibold rounded-xl cursor-pointer"
        >
          Load Rexona Football Moment
        </button>
      </div>
    );
  }

  const opp = selectedOpportunity;

  // Safe fallback objects for submodules
  const signalEvidence = opp.signal?.evidence || {
    socialMentions: '120K',
    estimatedReach: '5.4M',
    velocityPercent: 180,
    positiveSentimentPercent: 88,
    memeReplication: 'High',
    targetAudienceConcentration: '18-34 Core Audience',
    sourcePlatforms: ['Instagram', 'TikTok', 'X'],
    samplePosts: [],
    trendData: []
  };

  const signalPosts = (signalEvidence.samplePosts && signalEvidence.samplePosts.length > 0)
    ? signalEvidence.samplePosts
    : ((signalEvidence as any).posts || []);

  const insightData = opp.insight || {
    headline: opp.summary || 'Real-time consumer conversation with strong cultural relevance.',
    consumerBehaviour: 'Consumers actively engage with high-urgency cultural moments.',
    culturalTension: 'The balance between unexpected high-pressure moments and maintaining confidence.',
    brandImplication: `Direct opportunity for ${opp.brand} to reinforce its core product promise.`,
    opportunityWindow: 'Next 6 to 24 hours (Urgent Reactive Window)'
  };

  const strategyData = opp.strategy || {
    objective: `Drive contextual relevance and brand resonance for ${opp.brand} around "${opp.title}".`,
    audience: 'Target demographic & trend participants',
    coreMessage: `${opp.brand}: Step Up with Confidence`,
    tone: 'High-Urgency & Culturally Witty',
    channels: ['Instagram Reels', 'TikTok Spark Ads', 'X In-Stream', 'Quick Commerce'],
    mandatories: [
      'Strict adherence to Unilever Responsible AI & Brand Safety Charter',
      'Accurate category claims substantiation',
      'High-contrast brand asset integration'
    ]
  };

  const creativeList = (opp.creativeOptions && opp.creativeOptions.length > 0)
    ? opp.creativeOptions
    : [
        {
          id: 'concept-default-1',
          number: 1,
          headline: `When the pressure peaks, ${opp.brand} delivers.`,
          coreIdea: 'Real-time reactive visual hook framing peak pressure vs effortless cool.',
          recommendedPlatform: 'Instagram Reels & Stories',
          assetType: 'Short-form Video 9:16',
          tone: 'High-Energy & Confident',
          aspectRatio: '9:16',
          caption: `Pressure is inevitable. Losing your cool isn't. #${opp.brand} #NeverLoseYourCool`,
          brandRationale: 'Taps into instant cultural relevance while reinforcing 72H protection equity.'
        }
      ];

  const governanceData = opp.governance || {
    confidencePercent: 96,
    status: 'APPROVED',
    checks: [
      {
        id: 'gov-chk-1',
        name: 'Brand Tone & Safety Charter',
        category: 'Brand Guidelines',
        status: 'PASS',
        details: 'Full alignment with Unilever brand equity and responsible AI guidelines.'
      },
      {
        id: 'gov-chk-2',
        name: 'Claim Substantiation & Legal',
        category: 'Claims Substantiation',
        status: 'PASS',
        details: 'Verified against global R&D efficacy databases.'
      }
    ]
  };

  const localizationsList = (opp.localizations && opp.localizations.length > 0)
    ? opp.localizations
    : [
        {
          marketId: 'loc-uk',
          marketName: 'United Kingdom',
          flag: '🇬🇧',
          language: 'British English',
          status: 'APPROVED',
          localHeadline: strategyData.coreMessage || 'Keep Your Cool',
          localCaption: `When the heat is on, ${opp.brand} keeps you fresh. #NeverLoseYourCool`,
          culturalAdaptation: 'Adapted for UK cultural sporting and social nuance.',
          format: 'Instagram Reels 9:16',
          cta: 'Shop Now',
          reviewer: userWorkspace.userName
        },
        {
          marketId: 'loc-in',
          marketName: 'India',
          flag: '🇮🇳',
          language: 'Hinglish',
          status: 'APPROVED',
          localHeadline: 'Pressure Chahe Kitna Bhi Ho, Stay Cool.',
          localCaption: `Stoppage time drama or everyday hustle — ${opp.brand} has your back! #ConfidenceUnstoppable`,
          culturalAdaptation: 'Hinglish phrasing with quick-commerce Blinkit/Zepto 10-min integration.',
          format: 'Reels + Quick Commerce 9:16',
          cta: 'Get in 10 Mins on Blinkit',
          reviewer: userWorkspace.userName
        }
      ];

  const activationData = opp.activation || {
    status: 'DRAFT',
    channels: ['Instagram Reels', 'TikTok', 'Blinkit Quick Commerce'],
    assetsCount: 4,
    telemetry: {
      impressions: 1420000,
      engagements: 88400,
      sentimentScore: 94,
      ctr: 4.8,
      shares: 18200
    }
  };

  const telemetryData = activationData.telemetry || {
    impressions: 1420000,
    engagements: 88400,
    sentimentScore: 94,
    ctr: 4.8,
    shares: 18200
  };

  const learningData = opp.learnings || {
    whatWorked: 'High-urgency real-time sports tie-in delivered 2.4x higher organic resonance.',
    audienceLearning: 'Gen-Z and sports audiences engaged heavily with reactive meme humor.',
    creativeLearning: '9:16 vertical video with direct dynamic audio cut-through had highest conversion.',
    recommendation: 'Autonomous pipeline should pre-trigger sports stoppage time signal detectors.',
    appliedToFuture: true
  };

  // Sync tab with stage if on initial load
  React.useEffect(() => {
    setActiveTab(opp.currentStage);
  }, [opp.currentStage]);

  const handleHumanApproveClick = () => {
    setShowHumanGateModal(true);
  };

  const handleActivateClick = () => {
    setIsActivating(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      activateCampaign(opp.id);
      setIsActivating(false);
      setActiveTab('learning');
    }, 1200);
  };

  return (
    <div id="opportunity-detail-workspace" className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* ========================================================================= */}
      {/* TOP HEADER BENTO BAR */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-[#DCE6F2] p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            id="back-to-opportunities-btn"
            onClick={() => selectOpportunity(null)}
            className="p-2 rounded-xl border border-[#DCE6F2] hover:bg-[#F5F9FF] text-[#5B6B7A] hover:text-[#0B1F3A] transition-colors cursor-pointer shrink-0"
            title="Back to Catalog"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div>
            <div className="flex items-center gap-2 text-xs text-[#5B6B7A] mb-0.5">
              <span className="font-bold text-[#1769E0] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {opp.brand}
              </span>
              <span>{opp.market}</span>
              <span>•</span>
              <span className="capitalize">{opp.category}</span>
              <span>•</span>
              <span className="text-[11px] text-slate-400">ID: {opp.id}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0B1F3A] tracking-tight">
              {opp.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 bg-[#F5F9FF] px-3 py-1.5 rounded-xl border border-[#DCE6F2]">
            <span className="text-[10px] uppercase font-bold text-[#5B6B7A]">Score</span>
            <span className="text-sm font-extrabold text-[#1769E0]">{opp.score.overall}/100</span>
          </div>
          <StatusBadge status={opp.status} size="lg" />
        </div>
      </div>

      {/* Dynamic Workflow Tracker Breadcrumb */}
      <WorkflowTracker
        currentStage={opp.currentStage}
        onSelectStage={(stage) => setActiveTab(stage)}
      />

      {/* Stage Tab Navigation Buttons */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-[#DCE6F2] text-xs">
        {[
          { id: 'signal', label: '1. Signal & Evidence' },
          { id: 'insight', label: '2. Consumer Insight' },
          { id: 'opportunity', label: '3. Decision Engine' },
          { id: 'strategy', label: '4. AI Strategy & Brief' },
          { id: 'creative', label: '5. Creative Studio' },
          { id: 'governance', label: '6. Governance & Safety' },
          { id: 'localization', label: '7. Global → Local' },
          { id: 'activation', label: '8. Activation' },
          { id: 'learning', label: '9. Closed-Loop Learning' }
        ].map(tab => {
          const isCurrentActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              id={`tab-button-${tab.id}`}
              onClick={() => setActiveTab(tab.id as WorkflowStage)}
              className={`px-3 py-2 rounded-xl font-medium whitespace-nowrap transition-all cursor-pointer ${
                isCurrentActive
                  ? 'bg-[#1769E0] text-white shadow-xs font-semibold'
                  : 'text-[#5B6B7A] hover:bg-slate-100 hover:text-[#0B1F3A]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* STAGE 1: SIGNAL INTELLIGENCE (BENTO GRID) */}
      {/* ========================================================================= */}
      {activeTab === 'signal' && (
        <div id="stage-signal-panel" className="space-y-5 animate-in fade-in duration-200">
          <div className="grid grid-cols-12 gap-5">
            {/* Bento 1.1: What Happened Narrative (Span 7) */}
            <div className="col-span-12 lg:col-span-7 bg-white rounded-2xl border border-[#DCE6F2] p-6 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#DCE6F2]">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#1769E0] flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5" />
                    Cultural Signal Ingestion
                  </span>
                  <span className="text-[11px] text-[#5B6B7A]">{opp.detectedAt}</span>
                </div>

                <div className="mt-3">
                  <h2 className="text-lg font-bold text-[#0B1F3A]">What Happened in Culture?</h2>
                  <p className="text-xs sm:text-sm text-[#0B1F3A] mt-2.5 leading-relaxed bg-[#F5F9FF] p-4 rounded-xl border border-[#DCE6F2]">
                    {opp.signal.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#DCE6F2] flex items-center justify-between text-xs text-[#5B6B7A]">
                <span>Source: Multi-Platform Ingestion Stream</span>
                <span className="font-semibold text-[#1769E0]">Verified Cultural Trigger</span>
              </div>
            </div>

            {/* Bento 1.2: Signal Evidence Telemetry Matrix (Span 5) */}
            <div className="col-span-12 lg:col-span-5 bg-white rounded-2xl border border-[#DCE6F2] p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#DCE6F2]">
                  <h3 className="text-xs uppercase font-bold tracking-wider text-[#5B6B7A]">
                    Signal Evidence Telemetry
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-[#1769E0] font-bold border border-blue-200">
                    Live Stream
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-3">
                  <div className="bg-[#F5F9FF] p-3 rounded-xl border border-[#DCE6F2]">
                    <span className="text-[10px] uppercase font-bold text-[#5B6B7A] block">Social Mentions</span>
                    <span className="text-base font-extrabold text-[#0B1F3A]">{signalEvidence.socialMentions}</span>
                  </div>
                  <div className="bg-[#F5F9FF] p-3 rounded-xl border border-[#DCE6F2]">
                    <span className="text-[10px] uppercase font-bold text-[#5B6B7A] block">Estimated Reach</span>
                    <span className="text-base font-extrabold text-[#0B1F3A]">{signalEvidence.estimatedReach}</span>
                  </div>
                  <div className="bg-[#F5F9FF] p-3 rounded-xl border border-[#DCE6F2]">
                    <span className="text-[10px] uppercase font-bold text-[#5B6B7A] block">Velocity</span>
                    <span className="text-base font-extrabold text-[#1769E0]">+{signalEvidence.velocityPercent}%</span>
                  </div>
                  <div className="bg-[#F5F9FF] p-3 rounded-xl border border-[#DCE6F2]">
                    <span className="text-[10px] uppercase font-bold text-[#5B6B7A] block">Positive Sentiment</span>
                    <span className="text-base font-extrabold text-emerald-600">{signalEvidence.positiveSentimentPercent}%</span>
                  </div>
                  <div className="bg-[#F5F9FF] p-3 rounded-xl border border-[#DCE6F2]">
                    <span className="text-[10px] uppercase font-bold text-[#5B6B7A] block">Meme Replication</span>
                    <span className="text-base font-extrabold text-purple-700">{signalEvidence.memeReplication}</span>
                  </div>
                  <div className="bg-[#F5F9FF] p-3 rounded-xl border border-[#DCE6F2]">
                    <span className="text-[10px] uppercase font-bold text-[#5B6B7A] block">Target Cohort</span>
                    <span className="text-xs font-bold text-[#0B1F3A] truncate block mt-1">{signalEvidence.targetAudienceConcentration || 'Core Target Demographic'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-[10px] text-slate-400 text-right">
                Synthesized by Gemini 1.5 Flash Ingestor
              </div>
            </div>

            {/* Bento 1.3: Real-Time Velocity Curve Chart (Span 5) */}
            <div className="col-span-12 lg:col-span-5 bg-white rounded-2xl border border-[#DCE6F2] p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs pb-3 border-b border-[#DCE6F2]">
                  <span className="font-bold text-[#0B1F3A] flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-[#1769E0]" />
                    Real-Time Velocity Curve (Past 60 Min)
                  </span>
                  <span className="text-emerald-600 font-semibold">+342% Ramp</span>
                </div>

                <div className="h-32 flex items-end justify-between gap-3 pt-4 px-2">
                  {(signalEvidence.trendData || []).length > 0 ? (
                    (signalEvidence.trendData || []).map((point, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                        <div className="text-[9px] font-bold text-[#1769E0] opacity-80 group-hover:opacity-100">
                          {(point.volume / 1000).toFixed(0)}k
                        </div>
                        <div className="w-full bg-blue-100 rounded-t-md overflow-hidden h-20 flex items-end">
                          <div
                            className="w-full bg-gradient-to-t from-[#1769E0] to-cyan-400 rounded-t-md transition-all duration-500 group-hover:brightness-110"
                            style={{ height: `${Math.min(100, Math.max(15, (point.volume / 183000) * 100))}%` }}
                          />
                        </div>
                        <span className="text-[9px] font-medium text-[#5B6B7A]">{point.time}</span>
                      </div>
                    ))
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-xs text-[#5B6B7A] gap-1">
                      <TrendingUp className="w-5 h-5 text-[#1769E0]/60" />
                      <span>Live cultural telemetry streaming & indexing</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-[#DCE6F2] text-[10px] text-[#5B6B7A] flex items-center justify-between">
                <span>Momentum Peak: T-10 min</span>
                <span className="font-semibold text-emerald-600">High Viral Receptivity</span>
              </div>
            </div>

            {/* Bento 1.4: Observed Signals & Evidence Cards (Span 7) */}
            <div className="col-span-12 lg:col-span-7 bg-white rounded-2xl border border-[#DCE6F2] p-5 shadow-xs flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#DCE6F2]">
                  <h3 className="text-xs uppercase font-bold tracking-wider text-[#5B6B7A]">
                    Observed Signal Cards & Social Proof
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowAddEvidence(!showAddEvidence)}
                    className="inline-flex items-center gap-1 text-xs text-[#1769E0] font-bold hover:underline cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{showAddEvidence ? 'Cancel' : '+ Add Custom Evidence'}</span>
                  </button>
                </div>

                {/* Inline Custom Evidence Form */}
                {showAddEvidence && (
                  <div className="p-3.5 my-2 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2.5 text-xs">
                    <div className="font-bold text-[#0B1F3A] flex items-center justify-between">
                      <span>Input Custom Evidence / Post</span>
                      <span className="text-[10px] text-[#5B6B7A]">Direct injection</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div>
                        <label className="block text-[10px] font-semibold text-[#5B6B7A]">Platform</label>
                        <select
                          value={newEvPlatform}
                          onChange={(e) => setNewEvPlatform(e.target.value as any)}
                          className="w-full text-xs bg-white border border-[#DCE6F2] rounded-lg p-1.5 text-[#0B1F3A]"
                        >
                          <option value="Instagram">Instagram</option>
                          <option value="TikTok">TikTok</option>
                          <option value="X">X (Twitter)</option>
                          <option value="YouTube">YouTube</option>
                          <option value="Reddit">Reddit</option>
                          <option value="Reviews">Reviews</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold text-[#5B6B7A]">Author</label>
                        <input
                          type="text"
                          value={newEvAuthor}
                          onChange={(e) => setNewEvAuthor(e.target.value)}
                          placeholder="@handle"
                          className="w-full text-xs bg-white border border-[#DCE6F2] rounded-lg p-1.5 text-[#0B1F3A]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold text-[#5B6B7A]">Engagement</label>
                        <input
                          type="text"
                          value={newEvEngagement}
                          onChange={(e) => setNewEvEngagement(e.target.value)}
                          placeholder="e.g. 14.2k likes"
                          className="w-full text-xs bg-white border border-[#DCE6F2] rounded-lg p-1.5 text-[#0B1F3A]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-[#5B6B7A]">Content Quote</label>
                      <input
                        type="text"
                        value={newEvContent}
                        onChange={(e) => setNewEvContent(e.target.value)}
                        placeholder="Quoted user reaction or quote..."
                        className="w-full text-xs bg-white border border-[#DCE6F2] rounded-lg p-1.5 text-[#0B1F3A]"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setShowAddEvidence(false)}
                        className="px-2.5 py-1 rounded-lg bg-slate-200 text-[#5B6B7A] text-xs font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        disabled={!newEvContent.trim()}
                        onClick={() => {
                          addCustomEvidence(opp.id, {
                            platform: newEvPlatform,
                            author: newEvAuthor.trim() || '@brand_tracker',
                            content: newEvContent.trim(),
                            engagement: newEvEngagement.trim() || 'Organic spike'
                          });
                          setNewEvAuthor('');
                          setNewEvContent('');
                          setNewEvEngagement('');
                          setShowAddEvidence(false);
                        }}
                        className="px-3 py-1 rounded-lg bg-[#1769E0] text-white text-xs font-bold hover:bg-blue-700 disabled:opacity-50"
                      >
                        Save Evidence Card
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-2 mt-2">
                  {(signalPosts || []).length > 0 ? (
                    (signalPosts || []).map((post: any, pIdx: number) => (
                      <div key={post.id || pIdx} className="p-3 rounded-xl border border-[#DCE6F2] bg-[#F5F9FF] flex items-start justify-between gap-3 text-xs">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#0B1F3A]">{post.author || post.handle || '@trend_tracker'}</span>
                            <span className="text-[10px] text-slate-500 font-medium">{post.platform || 'Social'}</span>
                          </div>
                          <p className="text-[#0B1F3A] text-xs leading-snug">
                            "{post.content || 'Observed high-velocity brand discussion in real-time stream.'}"
                          </p>
                        </div>
                        <span className="text-[10px] font-mono text-[#1769E0] shrink-0 font-semibold bg-white px-2 py-0.5 rounded border border-blue-200">
                          {post.engagement || 'Spike'}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 bg-[#F5F9FF] rounded-xl text-center text-xs text-[#5B6B7A]">
                      No individual post quotes captured yet. Custom evidence cards can be added above.
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-[#DCE6F2] flex justify-end">
                <button
                  type="button"
                  id="next-to-insight-btn"
                  onClick={() => setActiveTab('insight')}
                  className="px-4 py-2 bg-[#1769E0] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span>Synthesize Consumer Insight</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 2: INSIGHT SYNTHESIS (BENTO GRID) */}
      {/* ========================================================================= */}
      {activeTab === 'insight' && (
        <div id="stage-insight-panel" className="space-y-5 animate-in fade-in duration-200">
          <div className="grid grid-cols-12 gap-5">
            {/* Bento 2.1: Core Insight Headline & Tension (Span 8) */}
            <div className="col-span-12 lg:col-span-8 bg-white rounded-2xl border border-[#DCE6F2] p-6 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#DCE6F2]">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#1769E0] block">
                    Consumer & Cultural Insight
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (!isEditingInsight) {
                        setEditInsightHeadline(insightData.headline);
                        setEditInsightBehaviour(insightData.consumerBehaviour);
                        setEditInsightTension(insightData.culturalTension);
                        setEditInsightImplication(insightData.brandImplication);
                        setEditInsightWindow(insightData.opportunityWindow);
                      }
                      setIsEditingInsight(!isEditingInsight);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#1769E0] text-[#1769E0] hover:bg-blue-50 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isEditingInsight ? 'Close Editor' : 'Custom Refine / Edit Insight'}</span>
                  </button>
                </div>

                <div className="pt-2">
                  <h2 className="text-xl font-extrabold text-[#0B1F3A] leading-snug">
                    "{insightData.headline}"
                  </h2>
                  <p className="text-xs text-[#5B6B7A] mt-1">
                    Synthesized by NEXT Consumer Insight Engine from multi-market cultural sentiment.
                  </p>
                </div>

                {/* Custom Edit Form or Quick Display */}
                {isEditingInsight && (
                  <div className="p-4 mt-3 rounded-xl bg-blue-50/50 border border-blue-200 space-y-3 text-xs">
                    <div className="font-bold text-[#0B1F3A]">
                      Direct User Input: Customize & Refine Insight
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-[#5B6B7A] mb-1">Core Insight Headline</label>
                      <input
                        type="text"
                        value={editInsightHeadline}
                        onChange={(e) => setEditInsightHeadline(e.target.value)}
                        className="w-full text-xs bg-white border border-[#DCE6F2] rounded-lg p-2 font-bold text-[#0B1F3A]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[10px] font-bold text-[#5B6B7A] mb-0.5">Consumer Behaviour</label>
                        <textarea
                          rows={2}
                          value={editInsightBehaviour}
                          onChange={(e) => setEditInsightBehaviour(e.target.value)}
                          className="w-full text-xs bg-white border border-[#DCE6F2] rounded-lg p-1.5 text-[#0B1F3A]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-[#5B6B7A] mb-0.5">Cultural Tension</label>
                        <textarea
                          rows={2}
                          value={editInsightTension}
                          onChange={(e) => setEditInsightTension(e.target.value)}
                          className="w-full text-xs bg-white border border-[#DCE6F2] rounded-lg p-1.5 text-[#0B1F3A]"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-1 border-t border-blue-200">
                      <button
                        type="button"
                        onClick={() => setIsEditingInsight(false)}
                        className="px-3 py-1 rounded-lg bg-slate-200 text-[#5B6B7A] text-xs font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          updateOpportunityInsight(opp.id, {
                            headline: editInsightHeadline || insightData.headline,
                            consumerBehaviour: editInsightBehaviour || insightData.consumerBehaviour,
                            culturalTension: editInsightTension || insightData.culturalTension,
                            brandImplication: editInsightImplication || insightData.brandImplication,
                            opportunityWindow: editInsightWindow || insightData.opportunityWindow
                          });
                          setIsEditingInsight(false);
                        }}
                        className="px-4 py-1 rounded-lg bg-[#1769E0] text-white text-xs font-bold hover:bg-blue-700"
                      >
                        Apply Refined Insight
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 rounded-xl bg-[#F5F9FF] border border-[#DCE6F2] space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-700 block">
                  Cultural Tension
                </span>
                <p className="text-xs text-[#0B1F3A] leading-relaxed">
                  {insightData.culturalTension}
                </p>
              </div>
            </div>

            {/* Bento 2.2: Brand Implication Card (Span 4) */}
            <div className="col-span-12 lg:col-span-4 bg-white rounded-2xl border border-[#DCE6F2] p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="pb-3 border-b border-[#DCE6F2]">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">
                    Brand Category Implication
                  </span>
                </div>
                <div className="pt-3 space-y-2">
                  <p className="text-xs text-[#0B1F3A] leading-relaxed bg-[#F5F9FF] p-4 rounded-xl border border-[#DCE6F2]">
                    {insightData.brandImplication}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#DCE6F2] text-[11px] text-[#5B6B7A]">
                Brand: <strong className="text-[#1769E0]">{opp.brand}</strong> • Category: <strong className="capitalize text-[#0B1F3A]">{opp.category}</strong>
              </div>
            </div>

            {/* Bento 2.3: Consumer Behaviour Shift (Span 6) */}
            <div className="col-span-12 md:col-span-6 bg-white rounded-2xl border border-[#DCE6F2] p-5 shadow-xs space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1769E0] block">
                Observed Consumer Behaviour
              </span>
              <p className="text-xs text-[#0B1F3A] leading-relaxed bg-[#F5F9FF] p-3.5 rounded-xl border border-[#DCE6F2]">
                {insightData.consumerBehaviour}
              </p>
            </div>

            {/* Bento 2.4: Opportunity Window & Timing (Span 6) */}
            <div className="col-span-12 md:col-span-6 bg-white rounded-2xl border border-[#DCE6F2] p-5 shadow-xs space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block">
                  Opportunity Window & Expiry
                </span>
                <p className="text-xs text-[#0B1F3A] leading-relaxed bg-[#F5F9FF] p-3.5 rounded-xl border border-[#DCE6F2]">
                  {insightData.opportunityWindow}
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  id="next-to-opportunity-btn"
                  onClick={() => setActiveTab('opportunity')}
                  className="px-4 py-2 bg-[#1769E0] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span>Evaluate Opportunity Scorecard</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 3: OPPORTUNITY DECISION ENGINE & HUMAN GATE (BENTO GRID) */}
      {/* ========================================================================= */}
      {activeTab === 'opportunity' && (
        <div id="stage-opportunity-panel" className="space-y-5 animate-in fade-in duration-200">
          <div className="grid grid-cols-12 gap-5">
            {/* Bento 3.1: Scorecard Hero Breakdown (Span 7) */}
            <div className="col-span-12 lg:col-span-7 space-y-5">
              <ScoreGauge score={opp.score} size="hero" showDimensions={true} />

              <div className="bg-white rounded-2xl border-2 border-blue-200 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider text-[#5B6B7A]">
                      AI System Recommendation
                    </span>
                    <h3 className="text-2xl font-extrabold text-[#1769E0] mt-0.5">
                      {opp.recommendation === 'ACT' ? 'ACT NOW' : opp.recommendation}
                    </h3>
                  </div>

                  <span className="px-3 py-1 bg-blue-50 text-[#1769E0] border border-blue-200 rounded-xl text-xs font-bold">
                    Risk Assessment: {opp.risk}
                  </span>
                </div>

                <p className="text-xs text-[#0B1F3A] leading-relaxed bg-[#F5F9FF] p-3.5 rounded-xl border border-[#DCE6F2]">
                  {opp.recommendationReason}
                </p>

                {/* Collapsible Explainable AI Decision Trace */}
                <AIDecisionTrace
                  evidenceConsidered={opp.decisionTrace.evidenceConsidered}
                  decisionLogic={opp.decisionTrace.decisionLogic}
                  defaultExpanded={true}
                />
              </div>
            </div>

            {/* Bento 3.2: Human Decision Gate & Authorization Panel (Span 5) */}
            <div className="col-span-12 lg:col-span-5 bg-white rounded-2xl border border-[#DCE6F2] p-6 shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-[#DCE6F2]">
                  <div className="w-9 h-9 rounded-xl bg-[#1769E0] text-white flex items-center justify-center shadow-xs">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#0B1F3A]">Human Decision Gate</h3>
                    <p className="text-[11px] text-[#5B6B7A]">Brand Manager Accountability</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-[#5B6B7A]">Brand Owner:</span>
                    <span className="font-semibold text-[#0B1F3A]">{userWorkspace.userName}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-[#5B6B7A]">Role:</span>
                    <span className="font-semibold text-[#0B1F3A]">{userWorkspace.userRole}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-[#5B6B7A]">Stage Gate:</span>
                    <span className="font-bold text-[#1769E0] uppercase">{opp.currentStage}</span>
                  </div>
                </div>

                {opp.decisionTrace.humanDecision ? (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-1.5">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Opportunity Approved</span>
                    </div>
                    <p className="text-[11px] text-emerald-900 leading-snug">
                      {opp.decisionTrace.humanDecision.notes}
                    </p>
                    <span className="text-[10px] text-emerald-700 block">
                      Signed: {opp.decisionTrace.humanDecision.decidedBy} at {opp.decisionTrace.humanDecision.timestamp}
                    </span>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                    AI does not bypass humans. Consequential brand activations require explicit Brand Manager authorization.
                  </div>
                )}
              </div>

              <div className="space-y-2.5 pt-4 border-t border-[#DCE6F2]">
                <button
                  type="button"
                  id="approve-opportunity-gate-btn"
                  onClick={handleHumanApproveClick}
                  className="w-full py-3 bg-[#1769E0] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>{opp.status === 'APPROVED' || opp.currentStage !== 'opportunity' ? 'Re-review Decision Gate' : 'Approve Opportunity (ACT NOW)'}</span>
                </button>

                {opp.currentStage !== 'opportunity' && (
                  <button
                    type="button"
                    onClick={() => setActiveTab('strategy')}
                    className="w-full py-2.5 bg-[#F5F9FF] text-[#1769E0] rounded-xl text-xs font-bold hover:bg-blue-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Proceed to Strategy & Brief</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 4: AI STRATEGY & CREATIVE BRIEF (BENTO GRID) */}
      {/* ========================================================================= */}
      {activeTab === 'strategy' && (
        <div id="stage-strategy-panel" className="space-y-5 animate-in fade-in duration-200">
          <div className="grid grid-cols-12 gap-5">
            {/* Bento 4.1: Strategic Objective & Core Message (Span 7) */}
            <div className="col-span-12 lg:col-span-7 bg-white rounded-2xl border border-[#DCE6F2] p-6 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#DCE6F2]">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider text-[#1769E0] block">
                      Strategy Engine Output
                    </span>
                    <h2 className="text-lg font-bold text-[#0B1F3A]">AI Strategic Blueprint</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (!isEditingStrategy) {
                        setEditStratObjective(strategyData.objective || '');
                        setEditStratAudience(strategyData.audience || '');
                        setEditStratCoreMessage(strategyData.coreMessage || '');
                      }
                      setIsEditingStrategy(!isEditingStrategy);
                    }}
                    className="px-3 py-1.5 border border-[#1769E0] text-[#1769E0] hover:bg-blue-50 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isEditingStrategy ? 'Close' : 'Edit Blueprint'}</span>
                  </button>
                </div>

                {isEditingStrategy ? (
                  <div className="p-4 mt-3 rounded-xl bg-blue-50/60 border border-blue-200 space-y-3 text-xs">
                    <div className="font-bold text-[#0B1F3A]">
                      Customize Strategic Blueprint & Guardrails
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#5B6B7A] mb-1">Strategic Objective</label>
                      <textarea
                        rows={2}
                        value={editStratObjective}
                        onChange={(e) => setEditStratObjective(e.target.value)}
                        className="w-full text-xs bg-white border border-[#DCE6F2] rounded-lg p-2 text-[#0B1F3A]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#5B6B7A] mb-1">Core Campaign Message</label>
                      <textarea
                        rows={2}
                        value={editStratCoreMessage}
                        onChange={(e) => setEditStratCoreMessage(e.target.value)}
                        className="w-full text-xs bg-white border border-[#DCE6F2] rounded-lg p-2 text-[#0B1F3A]"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-1 border-t border-blue-200">
                      <button
                        type="button"
                        onClick={() => setIsEditingStrategy(false)}
                        className="px-3 py-1 rounded-lg bg-slate-200 text-[#5B6B7A] text-xs font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          updateStrategyBrief(opp.id, {
                            objective: editStratObjective || strategyData.objective,
                            audience: editStratAudience || strategyData.audience,
                            coreMessage: editStratCoreMessage || strategyData.coreMessage
                          });
                          setIsEditingStrategy(false);
                        }}
                        className="px-4 py-1 rounded-lg bg-[#1769E0] text-white text-xs font-bold hover:bg-blue-700"
                      >
                        Save Blueprint
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 pt-2">
                    <div className="p-4 bg-[#F5F9FF] rounded-xl border border-[#DCE6F2] space-y-1">
                      <span className="text-[10px] font-bold uppercase text-[#1769E0] block">Strategic Objective</span>
                      <p className="text-xs text-[#0B1F3A] leading-relaxed font-medium">{strategyData.objective}</p>
                    </div>

                    <div className="p-4 bg-[#F5F9FF] rounded-xl border border-[#DCE6F2] space-y-1">
                      <span className="text-[10px] font-bold uppercase text-[#1769E0] block">Core Campaign Message</span>
                      <p className="text-sm font-extrabold text-[#0B1F3A]">"{strategyData.coreMessage}"</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#DCE6F2] flex items-center justify-between">
                <span className="text-[11px] text-[#5B6B7A]">Tone: <strong className="text-[#0B1F3A]">{strategyData.tone}</strong></span>
                <button
                  type="button"
                  id="approve-strategy-btn"
                  onClick={() => approveStrategy(opp.id)}
                  className="px-4 py-2 bg-[#1769E0] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Approve Strategy & Unlock Brief</span>
                </button>
              </div>
            </div>

            {/* Bento 4.2: Target Audience & Cultural Insight (Span 5) */}
            <div className="col-span-12 lg:col-span-5 bg-white rounded-2xl border border-[#DCE6F2] p-6 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="pb-3 border-b border-[#DCE6F2]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#5B6B7A] block">
                    Audience & Psychological Trigger
                  </span>
                </div>

                <div className="pt-2 space-y-3">
                  <div className="p-3.5 bg-[#F5F9FF] rounded-xl border border-[#DCE6F2] space-y-1">
                    <span className="text-[10px] font-bold uppercase text-purple-700 block">Target Audience Persona</span>
                    <p className="text-xs text-[#0B1F3A] leading-relaxed">{strategyData.audience}</p>
                  </div>

                  <div className="p-3.5 bg-[#F5F9FF] rounded-xl border border-[#DCE6F2] space-y-1">
                    <span className="text-[10px] font-bold uppercase text-emerald-700 block">Core Category Role</span>
                    <p className="text-xs text-[#0B1F3A] leading-relaxed">
                      Reinforcing 72H odor and sweat protection during peak high-stakes pressure moments.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-[10px] text-slate-400">
                Aligned with Unilever Personal Care Brand DNA
              </div>
            </div>

            {/* Bento 4.3: Distribution Channels (Span 6) */}
            <div className="col-span-12 sm:col-span-6 bg-white rounded-2xl border border-[#DCE6F2] p-5 shadow-xs space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1769E0] block">
                Recommended Channels & Platforms
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {(strategyData.channels || []).map((chan, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-[#F5F9FF] text-[#0B1F3A] rounded-xl text-xs font-semibold border border-[#DCE6F2]">
                    {chan}
                  </span>
                ))}
              </div>
            </div>

            {/* Bento 4.4: Mandatory Guardrails (Span 6) */}
            <div className="col-span-12 sm:col-span-6 bg-white rounded-2xl border border-[#DCE6F2] p-5 shadow-xs space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block">
                  Mandatory Brand Guardrails
                </span>
                <ul className="mt-2 space-y-1.5 text-xs text-[#0B1F3A]">
                  {(strategyData.mandatories || []).map((mand, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-[#F5F9FF] p-2 rounded-lg border border-[#DCE6F2]/60">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{mand}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  id="next-to-creative-btn"
                  onClick={() => setActiveTab('creative')}
                  className="px-4 py-2 bg-[#1769E0] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span>Open Creative Studio</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 5: CREATIVE STUDIO & ROUTING (BENTO GRID) */}
      {/* ========================================================================= */}
      {activeTab === 'creative' && (
        <div id="stage-creative-panel" className="space-y-5 animate-in fade-in duration-200">
          {/* Creative Routing Architecture Banner */}
          <div className="bg-[#F5F9FF] rounded-2xl border border-blue-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#1769E0]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#1769E0]">
                  NEXT Creative Routing Architecture
                </h3>
                <span className="text-[10px] px-2 py-0.2 rounded bg-blue-200 text-blue-900 font-bold">Enterprise Mesh</span>
              </div>
              <p className="text-xs text-[#0B1F3A] max-w-2xl leading-relaxed">
                NEXT routes structured briefs and guardrails to specialised AI generation engines.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAddConceptModal(!showAddConceptModal)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#1769E0] text-[#1769E0] hover:bg-blue-50 text-xs font-bold transition-colors cursor-pointer shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{showAddConceptModal ? 'Cancel' : '+ Add Custom Concept'}</span>
            </button>
          </div>

          {/* Custom Concept Creator Modal Form */}
          {showAddConceptModal && (
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-3 text-xs">
              <div className="font-bold text-[#0B1F3A]">
                Inject Human-Authored Concept or Agency Creative Asset
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-semibold text-[#5B6B7A] mb-0.5">Headline</label>
                  <input
                    type="text"
                    value={newCcHeadline}
                    onChange={(e) => setNewCcHeadline(e.target.value)}
                    placeholder="e.g. In Extra Time? Keep Your Cool."
                    className="w-full text-xs bg-white border border-[#DCE6F2] rounded-lg p-2 font-bold text-[#0B1F3A]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-[#5B6B7A] mb-0.5">Platform & Media Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={newCcPlatform}
                      onChange={(e) => setNewCcPlatform(e.target.value)}
                      className="w-full text-xs bg-white border border-[#DCE6F2] rounded-lg p-2 text-[#0B1F3A]"
                    >
                      <option value="Instagram Reels & Stories">Instagram Reels</option>
                      <option value="TikTok & Reels">TikTok</option>
                      <option value="X (Twitter) & In-Stream">X In-Stream</option>
                      <option value="YouTube Shorts">YouTube Shorts</option>
                    </select>

                    <select
                      value={newCcAssetType}
                      onChange={(e) => setNewCcAssetType(e.target.value)}
                      className="w-full text-xs bg-white border border-[#DCE6F2] rounded-lg p-2 text-[#0B1F3A]"
                    >
                      <option value="Short-form Video">Short-form Video</option>
                      <option value="Static Social Frame">Static Social</option>
                      <option value="Interactive Dynamic Poll">Interactive Poll</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-semibold text-[#5B6B7A] mb-0.5">Core Creative Hook</label>
                  <textarea
                    rows={2}
                    value={newCcCoreIdea}
                    onChange={(e) => setNewCcCoreIdea(e.target.value)}
                    placeholder="Describe the visual execution and narrative hook..."
                    className="w-full text-xs bg-white border border-[#DCE6F2] rounded-lg p-2 text-[#0B1F3A]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-[#5B6B7A] mb-0.5">Caption Script</label>
                  <textarea
                    rows={2}
                    value={newCcCaption}
                    onChange={(e) => setNewCcCaption(e.target.value)}
                    placeholder="Enter copy, call to action, and hashtags..."
                    className="w-full text-xs bg-white border border-[#DCE6F2] rounded-lg p-2 text-[#0B1F3A]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAddConceptModal(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-200 text-[#5B6B7A] text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!newCcHeadline.trim() || !newCcCoreIdea.trim()}
                  onClick={() => {
                    addCustomCreativeConcept(opp.id, {
                      headline: newCcHeadline.trim(),
                      coreIdea: newCcCoreIdea.trim(),
                      recommendedPlatform: newCcPlatform,
                      assetType: newCcAssetType,
                      tone: newCcTone,
                      caption: newCcCaption.trim() || `${newCcHeadline.trim()} #Rexona72H`,
                      aspectRatio: '9:16',
                      brandRationale: 'Custom team input directly uploaded into the orchestration pipeline.'
                    });
                    setNewCcHeadline('');
                    setNewCcCoreIdea('');
                    setNewCcCaption('');
                    setShowAddConceptModal(false);
                  }}
                  className="px-4 py-1.5 rounded-lg bg-[#1769E0] text-white text-xs font-bold hover:bg-blue-700 disabled:opacity-50"
                >
                  Add Concept to Studio
                </button>
              </div>
            </div>
          )}

          {/* 3 Creative Direction Bento Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {opp.creativeOptions.map(concept => {
              const isSelected = concept.id === opp.selectedCreativeId;
              return (
                <div
                  key={concept.id}
                  id={`concept-card-${concept.id}`}
                  className={`bg-white rounded-2xl border-2 transition-all p-5 shadow-xs flex flex-col justify-between space-y-4 ${
                    isSelected
                      ? 'border-[#1769E0] ring-4 ring-[#1769E0]/15 shadow-md'
                      : 'border-[#DCE6F2] hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1769E0] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                        Concept {concept.number}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                        {concept.tone}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-extrabold text-base text-[#0B1F3A] leading-snug">
                        "{concept.headline}"
                      </h3>
                      <p className="text-xs text-[#5B6B7A] mt-1 line-clamp-2">
                        {concept.coreIdea}
                      </p>
                    </div>

                    {/* Creative Visual Mockup Frame */}
                    <div className="aspect-video bg-gradient-to-tr from-[#0B1F3A] to-[#1769E0] rounded-xl p-4 text-white flex flex-col justify-between relative overflow-hidden shadow-inner">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-bold tracking-wider text-cyan-300 uppercase">REXONA 72H</span>
                        <span className="bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">{concept.assetType}</span>
                      </div>

                      <div className="text-center py-2 space-y-1">
                        <span className="text-xs font-extrabold tracking-tight text-white block">
                          {concept.headline}
                        </span>
                        <span className="text-[10px] text-cyan-200">#NeverLoseYourCool</span>
                      </div>

                      <div className="flex items-center justify-between text-[9px] text-slate-300">
                        <span>{concept.recommendedPlatform}</span>
                        <span>{concept.aspectRatio}</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-[#F5F9FF] border border-[#DCE6F2] text-[11px] text-[#0B1F3A] leading-relaxed">
                        <span className="font-bold block text-[#1769E0] mb-0.5">Caption Preview:</span>
                        {concept.caption}
                      </div>

                      <div className="text-[11px] text-[#5B6B7A]">
                        <strong className="text-[#0B1F3A]">Brand Rationale:</strong> {concept.brandRationale}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#DCE6F2]">
                    <button
                      type="button"
                      id={`select-concept-${concept.id}-btn`}
                      onClick={() => selectCreativeConcept(opp.id, concept.id)}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        isSelected
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-[#1769E0] text-white hover:bg-blue-700'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Concept Selected & Approved</span>
                        </>
                      ) : (
                        <span>Select Concept {concept.number}</span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#DCE6F2]">
            <button
              type="button"
              onClick={() => setActiveTab('strategy')}
              className="px-4 py-2 border border-[#DCE6F2] text-[#5B6B7A] rounded-xl text-xs font-semibold hover:bg-slate-50"
            >
              &larr; Back to Strategy
            </button>

            <button
              type="button"
              id="next-to-governance-btn"
              onClick={() => setActiveTab('governance')}
              className="px-5 py-2.5 bg-[#1769E0] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <span>Audit Governance & Safety</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 6: GOVERNANCE & SAFETY (BENTO GRID) */}
      {/* ========================================================================= */}
      {activeTab === 'governance' && (
        <div id="stage-governance-panel" className="space-y-5 animate-in fade-in duration-200">
          <div className="grid grid-cols-12 gap-5">
            {/* Bento 6.1: Governance Health & Confidence Scorecard (Span 4) */}
            <div className="col-span-12 lg:col-span-4 bg-white rounded-2xl border border-[#DCE6F2] p-6 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#DCE6F2]">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#1769E0] block">
                    Automated Compliance
                  </span>
                  <StatusBadge status={governanceData.status} size="sm" />
                </div>

                <div className="pt-4 text-center space-y-2">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-xs">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-[#0B1F3A]">{governanceData.confidencePercent}%</h3>
                  <span className="text-xs font-bold text-emerald-600 block">Automated Compliance Score</span>
                  <p className="text-xs text-[#5B6B7A] mt-1">
                    Zero critical brand safety, R&D claim, or trademark violations detected.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 font-medium">
                Passes Unilever Personal Care Responsible AI Safety Charter.
              </div>
            </div>

            {/* Bento 6.2: Automated Compliance Checks Matrix (Span 8) */}
            <div className="col-span-12 lg:col-span-8 bg-white rounded-2xl border border-[#DCE6F2] p-6 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#DCE6F2]">
                  <h3 className="text-xs uppercase font-bold tracking-wider text-[#5B6B7A]">
                    Audit Results & Compliance Matrix
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowAddGovernanceModal(!showAddGovernanceModal)}
                    className="inline-flex items-center gap-1 text-xs text-[#1769E0] font-bold hover:underline cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{showAddGovernanceModal ? 'Cancel' : '+ Add Policy Check'}</span>
                  </button>
                </div>

                {/* Custom Policy Adder Form */}
                {showAddGovernanceModal && (
                  <div className="p-3.5 my-2 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2.5 text-xs">
                    <div className="font-bold text-[#0B1F3A]">Log Custom Policy Check</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={newGovName}
                        onChange={(e) => setNewGovName(e.target.value)}
                        placeholder="Policy / Check Name"
                        className="text-xs bg-white border border-[#DCE6F2] rounded-lg p-2"
                      />
                      <select
                        value={newGovCategory}
                        onChange={(e) => setNewGovCategory(e.target.value)}
                        className="text-xs bg-white border border-[#DCE6F2] rounded-lg p-2"
                      >
                        <option value="Brand Guidelines">Brand Guidelines</option>
                        <option value="Claims Substantiation">Claims Substantiation</option>
                        <option value="Legal & Trademark">Legal & Trademark</option>
                        <option value="Cultural Safety & Bias">Cultural Safety & Bias</option>
                      </select>
                    </div>
                    <textarea
                      rows={2}
                      value={newGovDetails}
                      onChange={(e) => setNewGovDetails(e.target.value)}
                      placeholder="Audit note..."
                      className="w-full text-xs bg-white border border-[#DCE6F2] rounded-lg p-2"
                    />
                    <div className="flex justify-end gap-2">
                      <button type="button" onClick={() => setShowAddGovernanceModal(false)} className="px-3 py-1 rounded-lg bg-slate-200 text-xs">Cancel</button>
                      <button
                        type="button"
                        disabled={!newGovName.trim()}
                        onClick={() => {
                          addCustomGovernanceCheck(opp.id, {
                            name: newGovName.trim(),
                            category: newGovCategory,
                            status: 'PASS',
                            details: newGovDetails.trim() || 'Verified compliant with Unilever brand risk requirements.'
                          });
                          setNewGovName('');
                          setNewGovDetails('');
                          setShowAddGovernanceModal(false);
                        }}
                        className="px-4 py-1 rounded-lg bg-[#1769E0] text-white text-xs font-bold hover:bg-blue-700"
                      >
                        Save Check
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-2.5 mt-2">
                  {(governanceData.checks || []).map(chk => (
                    <div key={chk.id} className="p-3 rounded-xl border border-[#DCE6F2] bg-[#F5F9FF] flex items-start justify-between gap-3 text-xs">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#0B1F3A]">{chk.name}</span>
                          <span className="text-[10px] px-2 py-0.2 rounded bg-white text-slate-600 border border-slate-200 font-medium">
                            {chk.category}
                          </span>
                        </div>
                        <p className="text-slate-700 text-xs leading-relaxed">
                          {chk.details}
                        </p>
                      </div>

                      <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-bold text-[11px] shrink-0 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> PASS
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#DCE6F2] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => escalateGovernance(opp.id, 'Escalated for second legal audit.')}
                  className="text-xs font-semibold text-amber-700 hover:underline"
                >
                  Request Legal / R&D Escalation
                </button>

                <button
                  type="button"
                  id="approve-governance-btn"
                  onClick={() => {
                    approveGovernance(opp.id);
                    setActiveTab('localization');
                  }}
                  className="px-5 py-2.5 bg-[#1769E0] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Approve Governance for Localization</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 7: GLOBAL → LOCAL (BENTO GRID) */}
      {/* ========================================================================= */}
      {activeTab === 'localization' && (
        <div id="stage-localization-panel" className="space-y-5 animate-in fade-in duration-200">
          {/* Bento 7.1: Localization Thesis Card */}
          <div className="bg-[#F5F9FF] rounded-2xl border border-[#DCE6F2] p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1769E0]">
                Localization North Star
              </span>
              <p className="text-base font-extrabold text-[#0B1F3A]">
                "Localize expression, not strategy."
              </p>
              <p className="text-xs text-[#5B6B7A] max-w-2xl">
                Global core confidence thesis remains stable • Local languages, slang, and quick-commerce channels adapt.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAddMarketModal(!showAddMarketModal)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#1769E0] text-[#1769E0] hover:bg-blue-50 text-xs font-bold transition-colors cursor-pointer shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{showAddMarketModal ? 'Cancel' : '+ Add Market Adaptation'}</span>
            </button>
          </div>

          {/* Custom Market Adder Form */}
          {showAddMarketModal && (
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-3 text-xs">
              <div className="font-bold text-[#0B1F3A]">Direct Localization Input: Add New Country Execution</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newLocFlag}
                    onChange={(e) => setNewLocFlag(e.target.value)}
                    placeholder="🇯🇵"
                    className="w-12 text-center text-sm bg-white border border-[#DCE6F2] rounded-lg p-2"
                  />
                  <input
                    type="text"
                    value={newLocMarketName}
                    onChange={(e) => setNewLocMarketName(e.target.value)}
                    placeholder="e.g. Japan"
                    className="flex-1 text-xs bg-white border border-[#DCE6F2] rounded-lg p-2 font-medium"
                  />
                </div>
                <input
                  type="text"
                  value={newLocLanguage}
                  onChange={(e) => setNewLocLanguage(e.target.value)}
                  placeholder="Language"
                  className="text-xs bg-white border border-[#DCE6F2] rounded-lg p-2"
                />
                <input
                  type="text"
                  value={newLocHeadline}
                  onChange={(e) => setNewLocHeadline(e.target.value)}
                  placeholder="Localized Headline"
                  className="text-xs bg-white border border-[#DCE6F2] rounded-lg p-2 font-bold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <textarea
                  rows={2}
                  value={newLocCaption}
                  onChange={(e) => setNewLocCaption(e.target.value)}
                  placeholder="Localized copy..."
                  className="text-xs bg-white border border-[#DCE6F2] rounded-lg p-2"
                />
                <textarea
                  rows={2}
                  value={newLocNuance}
                  onChange={(e) => setNewLocNuance(e.target.value)}
                  placeholder="Cultural adaptation notes..."
                  className="text-xs bg-white border border-[#DCE6F2] rounded-lg p-2"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddMarketModal(false)} className="px-3 py-1 rounded-lg bg-slate-200 text-xs">Cancel</button>
                <button
                  type="button"
                  disabled={!newLocMarketName.trim() || !newLocHeadline.trim()}
                  onClick={() => {
                    addCustomMarketLocalization(opp.id, {
                      marketName: newLocMarketName.trim(),
                      flag: newLocFlag.trim() || '🌐',
                      language: newLocLanguage.trim() || 'English',
                      localHeadline: newLocHeadline.trim(),
                      localCaption: newLocCaption.trim() || newLocHeadline.trim(),
                      culturalAdaptation: newLocNuance.trim() || 'Adapted for local media customs.',
                      format: 'Local In-Feed 9:16',
                      cta: 'Shop Online',
                      reviewer: userWorkspace.userName
                    });
                    setNewLocHeadline('');
                    setNewLocCaption('');
                    setNewLocNuance('');
                    setShowAddMarketModal(false);
                  }}
                  className="px-4 py-1 rounded-lg bg-[#1769E0] text-white text-xs font-bold hover:bg-blue-700"
                >
                  Save Adaptation
                </button>
              </div>
            </div>
          )}

          {/* Regional Bento Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {localizationsList.map(loc => (
              <div
                key={loc.marketId}
                id={`market-card-${loc.marketId}`}
                className="bg-white rounded-2xl border border-[#DCE6F2] p-5 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#DCE6F2]">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{loc.flag}</span>
                      <div>
                        <h4 className="font-bold text-sm text-[#0B1F3A]">{loc.marketName}</h4>
                        <span className="text-[10px] text-[#5B6B7A]">{loc.language}</span>
                      </div>
                    </div>

                    <StatusBadge status={loc.status} size="sm" />
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#1769E0] block">Local Headline</span>
                      <p className="font-bold text-sm text-[#0B1F3A]">"{loc.localHeadline}"</p>
                    </div>

                    <div className="p-3 bg-[#F5F9FF] rounded-xl border border-[#DCE6F2] text-[11px] text-[#0B1F3A] leading-relaxed">
                      <span className="font-bold text-[#5B6B7A] block mb-1">Local Copy & Tags:</span>
                      {loc.localCaption}
                    </div>

                    <div className="text-[11px] text-[#5B6B7A]">
                      <strong className="text-[#0B1F3A]">Cultural Nuance:</strong> {loc.culturalAdaptation}
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-[#5B6B7A] pt-1">
                      <span><strong>Format:</strong> {loc.format}</span>
                      <span><strong>CTA:</strong> {loc.cta}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#DCE6F2] space-y-2">
                  <div className="text-[10px] text-slate-500">
                    Reviewer: <strong>{loc.reviewer}</strong>
                  </div>
                  <button
                    type="button"
                    id={`approve-market-${loc.marketId}-btn`}
                    onClick={() => approveMarketLocalization(opp.id, loc.marketId)}
                    className={`w-full py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      loc.status === 'APPROVED'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                        : 'bg-[#1769E0] text-white hover:bg-blue-700'
                    }`}
                  >
                    {loc.status === 'APPROVED' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Market Execution Approved</span>
                      </>
                    ) : (
                      <span>Approve {loc.marketName} Execution</span>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#DCE6F2]">
            <button
              type="button"
              onClick={() => setActiveTab('governance')}
              className="px-4 py-2 border border-[#DCE6F2] text-[#5B6B7A] rounded-xl text-xs font-semibold hover:bg-slate-50"
            >
              &larr; Back to Governance
            </button>

            <button
              type="button"
              id="next-to-activation-btn"
              onClick={() => setActiveTab('activation')}
              className="px-5 py-2.5 bg-[#1769E0] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <span>Prepare Activation Manifest</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 8: ACTIVATION MODULE (BENTO GRID) */}
      {/* ========================================================================= */}
      {activeTab === 'activation' && (
        <div id="stage-activation-panel" className="space-y-5 animate-in fade-in duration-200">
          <div className="grid grid-cols-12 gap-5">
            {/* Bento 8.1: Activation Hero Trigger Card (Span 7) */}
            <div className="col-span-12 lg:col-span-7 bg-white rounded-2xl border-2 border-emerald-500/40 p-8 shadow-sm flex flex-col justify-between space-y-6 text-center">
              <div className="space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                  <Zap className="w-8 h-8 fill-current" />
                </div>

                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-emerald-600">
                    Activation Gate Cleared
                  </span>
                  <h2 className="text-2xl font-extrabold text-[#0B1F3A] mt-1">
                    Campaign Ready to Deploy
                  </h2>
                  <p className="text-xs text-[#5B6B7A] mt-1">
                    Multi-channel manifest compiled for India, Brazil, and UK across social & quick commerce.
                  </p>
                </div>

                {/* Campaign Summary Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left text-xs bg-[#F5F9FF] p-4 rounded-xl border border-[#DCE6F2]">
                  <div>
                    <span className="text-[10px] text-[#5B6B7A] uppercase font-bold block">Campaign</span>
                    <span className="font-bold text-[#0B1F3A]">Never Lose Cool</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#5B6B7A] uppercase font-bold block">Brand</span>
                    <span className="font-bold text-[#1769E0]">Rexona</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#5B6B7A] uppercase font-bold block">Markets</span>
                    <span className="font-bold text-[#0B1F3A]">{localizationsList.length} Configured</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#5B6B7A] uppercase font-bold block">Assets</span>
                    <span className="font-bold text-emerald-600">{creativeList.length} Multi-Channel</span>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  id="activate-campaign-hero-btn"
                  disabled={isActivating || activationData.status === 'ACTIVATED'}
                  onClick={handleActivateClick}
                  className={`w-full py-4 rounded-2xl text-sm font-extrabold shadow-md transition-all cursor-pointer ${
                    activationData.status === 'ACTIVATED'
                      ? 'bg-emerald-600 text-white cursor-default'
                      : 'bg-gradient-to-r from-[#1769E0] to-[#06B6D4] text-white hover:opacity-95'
                  }`}
                >
                  {isActivating ? (
                    <span className="flex items-center justify-center gap-2">
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Deploying Multi-Market Activation Manifest...
                    </span>
                  ) : activationData.status === 'ACTIVATED' ? (
                    <span className="flex items-center justify-center gap-2">
                      <Check className="w-5 h-5" />
                      Campaign Live & Deployed to Multi-Channel Mesh
                    </span>
                  ) : (
                    <span>🚀 Activate Campaign Across Channels Now</span>
                  )}
                </button>
              </div>
            </div>

            {/* Bento 8.2: Live Endpoint Channel Status (Span 5) */}
            <div className="col-span-12 lg:col-span-5 bg-white rounded-2xl border border-[#DCE6F2] p-6 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="pb-3 border-b border-[#DCE6F2]">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#5B6B7A] block">
                    Target Deployment Mesh
                  </span>
                  <p className="text-xs text-[#0B1F3A] mt-0.5 font-medium">
                    Direct automated API connectors
                  </p>
                </div>

                <div className="space-y-2.5 pt-3 text-xs">
                  <div className="p-2.5 bg-[#F5F9FF] rounded-xl border border-[#DCE6F2] flex items-center justify-between">
                    <span className="font-bold text-[#0B1F3A]">Instagram Reels & Stories</span>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">Ready</span>
                  </div>
                  <div className="p-2.5 bg-[#F5F9FF] rounded-xl border border-[#DCE6F2] flex items-center justify-between">
                    <span className="font-bold text-[#0B1F3A]">TikTok Spark Ads</span>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">Ready</span>
                  </div>
                  <div className="p-2.5 bg-[#F5F9FF] rounded-xl border border-[#DCE6F2] flex items-center justify-between">
                    <span className="font-bold text-[#0B1F3A]">Blinkit / Zepto 10-min Storefronts</span>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">Synced</span>
                  </div>
                  <div className="p-2.5 bg-[#F5F9FF] rounded-xl border border-[#DCE6F2] flex items-center justify-between">
                    <span className="font-bold text-[#0B1F3A]">Deliveroo / iFood Quick Commerce</span>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">Synced</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-[10px] text-slate-400">
                Encrypted Unilever DSP Production Gateway
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 9: CLOSED-LOOP PERFORMANCE & AI LEARNING (BENTO GRID) */}
      {/* ========================================================================= */}
      {activeTab === 'learning' && (
        <div id="stage-learning-panel" className="space-y-5 animate-in fade-in duration-200">
          <div className="grid grid-cols-12 gap-5">
            {/* Bento 9.1: Live Campaign Telemetry (Span 12) */}
            <div className="col-span-12 bg-white rounded-2xl border border-[#DCE6F2] p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DCE6F2]">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-[#1769E0] block mb-0.5">
                    Closed-Loop Telemetry & Knowledge Graph
                  </span>
                  <h2 className="text-xl font-extrabold text-[#0B1F3A]">AI Learning & Performance Synthesis</h2>
                </div>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold shrink-0">
                  Telemetry Active
                </span>
              </div>

              {/* 4 Telemetry Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-[#F5F9FF] rounded-xl border border-[#DCE6F2]">
                  <span className="text-[10px] uppercase font-bold text-[#5B6B7A] block">Total Impressions</span>
                  <span className="text-2xl font-extrabold text-[#0B1F3A]">
                    {(telemetryData.impressions / 1000000).toFixed(1)}M
                  </span>
                  <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">+142% vs Benchmark</span>
                </div>
                <div className="p-4 bg-[#F5F9FF] rounded-xl border border-[#DCE6F2]">
                  <span className="text-[10px] uppercase font-bold text-[#5B6B7A] block">Engagements</span>
                  <span className="text-2xl font-extrabold text-[#1769E0]">
                    {(telemetryData.engagements / 1000).toFixed(0)}k
                  </span>
                  <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">7.4% Eng. Rate</span>
                </div>
                <div className="p-4 bg-[#F5F9FF] rounded-xl border border-[#DCE6F2]">
                  <span className="text-[10px] uppercase font-bold text-[#5B6B7A] block">Sentiment Lift</span>
                  <span className="text-2xl font-extrabold text-emerald-600">
                    {telemetryData.sentimentScore}%
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">Shifted +12 pts</span>
                </div>
                <div className="p-4 bg-[#F5F9FF] rounded-xl border border-[#DCE6F2]">
                  <span className="text-[10px] uppercase font-bold text-[#5B6B7A] block">Organic Shares</span>
                  <span className="text-2xl font-extrabold text-purple-700">
                    {(telemetryData.shares / 1000).toFixed(1)}k
                  </span>
                  <span className="text-[10px] text-purple-600 font-semibold block mt-0.5">Viral Replication</span>
                </div>
              </div>
            </div>

            {/* Bento 9.2: Knowledge Graph Learnings (Span 12) */}
            <div className="col-span-12 bg-white rounded-2xl border border-[#DCE6F2] p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#DCE6F2]">
                <h3 className="text-xs uppercase font-bold tracking-wider text-[#5B6B7A]">
                  Autonomous & Brand Team Strategic Learnings
                </h3>
                <button
                  type="button"
                  onClick={() => setShowAddLearningModal(!showAddLearningModal)}
                  className="inline-flex items-center gap-1 text-xs text-[#1769E0] font-bold hover:underline cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{showAddLearningModal ? 'Cancel' : '+ Log Human Brand Learning'}</span>
                </button>
              </div>

              {/* Custom Learning Form */}
              {showAddLearningModal && (
                <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2.5 text-xs">
                  <div className="font-bold text-[#0B1F3A]">Record Qualitative Takeaway & Future Recommendation</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <textarea
                      rows={2}
                      value={newLearnWorked}
                      onChange={(e) => setNewLearnWorked(e.target.value)}
                      placeholder="What worked & success metric..."
                      className="text-xs bg-white border border-[#DCE6F2] rounded-lg p-2"
                    />
                    <textarea
                      rows={2}
                      value={newLearnRecommendation}
                      onChange={(e) => setNewLearnRecommendation(e.target.value)}
                      placeholder="System recommendation for future opportunities..."
                      className="text-xs bg-white border border-[#DCE6F2] rounded-lg p-2"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => setShowAddLearningModal(false)} className="px-3 py-1 rounded-lg bg-slate-200 text-xs">Cancel</button>
                    <button
                      type="button"
                      disabled={!newLearnWorked.trim()}
                      onClick={() => {
                        addCustomLearningNote(opp.id, {
                          whatWorked: newLearnWorked.trim(),
                          recommendation: newLearnRecommendation.trim() || 'Feed insights back into Unilever scoring weightings.'
                        });
                        setNewLearnWorked('');
                        setNewLearnRecommendation('');
                        setShowAddLearningModal(false);
                      }}
                      className="px-4 py-1 rounded-lg bg-[#1769E0] text-white text-xs font-bold hover:bg-blue-700"
                    >
                      Commit to Knowledge Graph
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-[#DCE6F2] bg-[#F5F9FF] space-y-1">
                  <span className="text-xs font-bold text-[#1769E0] block">What worked?</span>
                  <p className="text-xs text-[#0B1F3A] leading-relaxed">{learningData.whatWorked}</p>
                </div>

                <div className="p-4 rounded-xl border border-[#DCE6F2] bg-[#F5F9FF] space-y-1">
                  <span className="text-xs font-bold text-[#0B1F3A] block">Audience Learning</span>
                  <p className="text-xs text-[#0B1F3A] leading-relaxed">{learningData.audienceLearning}</p>
                </div>

                <div className="p-4 rounded-xl border border-[#DCE6F2] bg-[#F5F9FF] space-y-1">
                  <span className="text-xs font-bold text-purple-700 block">Creative Format Learning</span>
                  <p className="text-xs text-[#0B1F3A] leading-relaxed">{learningData.creativeLearning}</p>
                </div>

                <div className="p-4 rounded-xl border border-[#DCE6F2] bg-[#F5F9FF] space-y-1">
                  <span className="text-xs font-bold text-emerald-700 block">System Recommendation for Future Opportunities</span>
                  <p className="text-xs text-[#0B1F3A] leading-relaxed">{learningData.recommendation}</p>
                </div>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#DCE6F2]">
                <div className="text-xs text-[#5B6B7A]">
                  {learningData.appliedToFuture ? (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Learned weights applied to Unilever Knowledge Graph
                    </span>
                  ) : (
                    <span>Apply this learning to automatically boost future sports stoppage time signals.</span>
                  )}
                </div>

                <button
                  type="button"
                  id="apply-learning-btn"
                  onClick={() => applyLearningsToFuture(opp.id)}
                  className="px-4 py-2 bg-[#1769E0] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Apply Learning to Future Opportunities</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Human Decision Modal */}
      <HumanGateModal
        isOpen={showHumanGateModal}
        onClose={() => setShowHumanGateModal(false)}
        title="Human Decision Required"
        role={userWorkspace.userRole}
        userName={userWorkspace.userName}
        aiRecommendation={opp.recommendation === 'ACT' ? 'ACT NOW' : opp.recommendation}
        recommendationReason={opp.recommendationReason}
        onApprove={(notes) => {
          approveOpportunityDecision(opp.id, notes);
          setActiveTab('strategy');
        }}
        onModify={(newOutcome, reason) => {
          modifyOpportunityDecision(opp.id, newOutcome, reason);
        }}
        onReject={() => {
          rejectOpportunityDecision(opp.id);
        }}
      />
    </div>
  );
};

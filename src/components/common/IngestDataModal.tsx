import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  UploadCloud, 
  FileText, 
  MessageSquare, 
  Share2, 
  TrendingUp, 
  CheckCircle2, 
  Sliders, 
  Zap, 
  Database,
  Globe,
  Tag,
  Flame,
  FileCode,
  ArrowRight,
  Loader2,
  Cpu
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CustomSignalInput } from '../../types';

interface PresetTemplate {
  key: string;
  name: string;
  badge: string;
  brand: 'Rexona' | 'Vaseline' | 'Surf Excel' | 'Dove' | 'Axe';
  market: string;
  category: string;
  title: string;
  sourceType: 'social' | 'feedback' | 'market_report' | 'idea' | 'raw_paste';
  rawText: string;
  reach: string;
  velocity: number;
  sentiment: number;
  samplePost: {
    platform: 'Instagram' | 'X' | 'TikTok' | 'YouTube' | 'Reddit' | 'Reviews';
    author: string;
    handle: string;
    content: string;
    engagement: string;
  };
}

const PRESETS: PresetTemplate[] = [
  {
    key: 'cricket',
    name: 'Cricket Final Over Tension',
    badge: 'Trending Moment',
    brand: 'Rexona',
    market: 'India',
    category: 'Sports & Movement',
    title: 'Final Over Sweat & Composure Drama',
    sourceType: 'social',
    rawText: 'Cricket viewers are sharing clips of captains sweating through tense final-over decisions with memes about heart-rate spikes and intense summer heat during evening matches.',
    reach: '3.4M Impressions',
    velocity: 94,
    sentiment: 88,
    samplePost: {
      platform: 'Instagram',
      author: 'Cricket Memes India',
      handle: '@cric_fever_in',
      content: 'That 19th over had 1.4 billion people sweating bullets 😭🔥 How is the bowler looking calmer than my entire family right now??',
      engagement: '92.4K likes • 18.1K shares'
    }
  },
  {
    key: 'monsoon',
    name: 'Monsoon Mud & 10-Min Clean',
    badge: 'Seasonal Spike',
    brand: 'Surf Excel',
    market: 'India',
    category: 'Fabric Care & Stains',
    title: 'Monsoon Football Puddle Joy & Stains',
    sourceType: 'social',
    rawText: 'Parents sharing heartwarming videos of children playing football in torrential monsoon mud, juxtaposed with quick-commerce orders for stain removal detergents arriving in 10 minutes.',
    reach: '2.1M Impressions',
    velocity: 86,
    sentiment: 92,
    samplePost: {
      platform: 'TikTok',
      author: 'Urban Mom Diaries',
      handle: '@riya_parenting',
      content: 'Let them get dirty in the rain! Dirt is good when memories are made ❤️ Zepto just delivered our Surf Excel pack before their bath even finished!',
      engagement: '64.8K likes • 9.3K saves'
    }
  },
  {
    key: 'ceramide',
    name: 'Ceramide Barrier Skincare Myth',
    badge: 'Beauty & Skin Trend',
    brand: 'Vaseline',
    market: 'Global',
    category: 'Skin Care & Repair',
    title: 'Viral Petroleum Jelly Slug Skincare Debate',
    sourceType: 'social',
    rawText: 'Dermatology influencers debating the barrier repair efficacy of pure petroleum jelly slugging vs expensive $80 peptide creams, driving massive organic search volume for Vaseline healing jelly.',
    reach: '4.8M Impressions',
    velocity: 91,
    sentiment: 85,
    samplePost: {
      platform: 'TikTok',
      author: 'Dr. Skin Lab',
      handle: '@derm_insights',
      content: 'Stop spending $90 on barrier creams when classic Vaseline Jelly does the exact same occlusion at 1/20th the price. Science doesn’t lie 🧬',
      engagement: '142.1K likes • 34.6K saves'
    }
  },
  {
    key: 'gym_odour',
    name: 'Gym Commute Freshness Test',
    badge: 'Lifestyle Debate',
    brand: 'Axe',
    market: 'Brazil',
    category: 'Fragrance & Freshness',
    title: 'Post-Workout Public Transit Confidence',
    sourceType: 'social',
    rawText: 'Young professionals debating gym hygiene and the challenge of rushing straight from intense 7 AM CrossFit workouts into packed subway commutes without losing freshness.',
    reach: '1.6M Impressions',
    velocity: 82,
    sentiment: 79,
    samplePost: {
      platform: 'X',
      author: 'Lucas Mendes',
      handle: '@lucas_fit_sp',
      content: 'Treino pesado às 7h e metrô lotado às 8h30. Só Axe e Rexona pra segurar esse calor de São Paulo sem passar vergonha 🥵🇧🇷',
      engagement: '18.9K likes • 4.2K reposts'
    }
  }
];

export const IngestDataModal: React.FC = () => {
  const { isIngestModalOpen, closeIngestModal, initialIngestTemplate, ingestCustomSignal } = useApp();

  const [sourceTab, setSourceTab] = useState<'social' | 'feedback' | 'market_report' | 'idea' | 'raw_paste'>('social');
  const [selectedBrand, setSelectedBrand] = useState<'Rexona' | 'Vaseline' | 'Surf Excel' | 'Dove' | 'Axe'>('Rexona');
  const [market, setMarket] = useState<string>('India');
  const [category, setCategory] = useState<string>('Sports & Movement');
  const [title, setTitle] = useState<string>('');
  const [rawText, setRawText] = useState<string>('');
  const [velocity, setVelocity] = useState<number>(88);
  const [sentiment, setSentiment] = useState<number>(84);
  const [reach, setReach] = useState<string>('1.8M Impressions');
  
  // Sample Post info
  const [postPlatform, setPostPlatform] = useState<'Instagram' | 'X' | 'TikTok' | 'YouTube' | 'Reddit' | 'Reviews'>('Instagram');
  const [postAuthor, setPostAuthor] = useState<string>('Cultural Observer');
  const [postHandle, setPostHandle] = useState<string>('@trend_watcher');
  const [postContent, setPostContent] = useState<string>('');
  const [postEngagement, setPostEngagement] = useState<string>('45.2K likes • 8.4K shares');

  // Multi-Agent Ingestion Pipeline state
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [pipelineStep, setPipelineStep] = useState<number>(0);

  const pipelineStages = [
    { name: 'Agent 01 • Cultural Signal Extractor', desc: 'Parsing entities, meme velocity & engagement signals' },
    { name: 'Agent 02 • Consumer Insight Synthesizer', desc: 'Distilling psychological tension & brand role' },
    { name: 'Agent 03 • Opportunity Decision Engine', desc: 'Scoring commercial upside, feasibility & brand fit' },
    { name: 'Agent 04 • Strategy Brief Formulator', desc: 'Defining channel matrix & mandatory guardrails' },
    { name: 'Agent 05 • Creative Studio Orchestrator', desc: 'Generating 3 multi-format campaign concepts' },
    { name: 'Agent 06 • Governance & Safety Auditor', desc: 'Executing 4-point claims & regulatory clearance' },
    { name: 'Agent 07 • Global-to-Local Adapter', desc: 'Localizing creative packs for India, Brazil, UK' }
  ];

  // Load template if preset passed
  useEffect(() => {
    if (initialIngestTemplate) {
      const preset = PRESETS.find(p => p.key === initialIngestTemplate);
      if (preset) {
        applyPreset(preset);
        return;
      }
    }
    // Default preset
    if (!title && PRESETS[0]) {
      applyPreset(PRESETS[0]);
    }
  }, [initialIngestTemplate, isIngestModalOpen]);

  const applyPreset = (preset: PresetTemplate) => {
    setSelectedBrand(preset.brand);
    setMarket(preset.market);
    setCategory(preset.category);
    setTitle(preset.title);
    setSourceTab(preset.sourceType);
    setRawText(preset.rawText);
    setReach(preset.reach);
    setVelocity(preset.velocity);
    setSentiment(preset.sentiment);
    setPostPlatform(preset.samplePost.platform);
    setPostAuthor(preset.samplePost.author);
    setPostHandle(preset.samplePost.handle);
    setPostContent(preset.samplePost.content);
    setPostEngagement(preset.samplePost.engagement);
  };

  const handleClearForm = () => {
    setTitle('');
    setRawText('');
    setPostContent('');
    setReach('500K Impressions');
    setVelocity(75);
    setSentiment(80);
    setPostAuthor('User Ingested');
    setPostHandle('@observer');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsProcessing(true);
    setPipelineStep(0);

    // Animate through agents
    const interval = setInterval(() => {
      setPipelineStep(prev => {
        if (prev < pipelineStages.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            const inputData: CustomSignalInput = {
              title: title.trim(),
              sourceType: sourceTab,
              brand: selectedBrand,
              market: market,
              category: category,
              rawText: rawText || postContent || title,
              observedReach: reach,
              velocityPercent: velocity,
              sentimentPercent: sentiment,
              sourcePlatforms: [postPlatform, 'Instagram', 'X', 'TikTok'],
              samplePost: {
                platform: postPlatform,
                author: postAuthor || 'Observer',
                handle: postHandle.startsWith('@') ? postHandle : `@${postHandle}`,
                content: postContent || rawText || title,
                engagement: postEngagement || '30K likes'
              }
            };

            ingestCustomSignal(inputData);
            setIsProcessing(false);
            closeIngestModal();
          }, 400);
          return prev;
        }
      });
    }, 280);
  };

  if (!isIngestModalOpen) return null;

  return (
    <div 
      id="ingest-data-modal-backdrop" 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
    >
      <div 
        id="ingest-data-modal-container" 
        className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-[#DCE6F2] overflow-hidden my-8"
      >
        {/* Modal Header */}
        <div className="bg-[#0B1F3A] text-white px-6 py-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#1769E0] to-[#06B6D4] flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-white tracking-tight">
                  Ingest Cultural Signal & Custom Data
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-400/20 text-cyan-300 font-bold border border-cyan-400/30">
                  AI Pipeline
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Input raw data, viral posts, customer feedback, or brand hypotheses to evaluate through the 9-stage lifecycle.
              </p>
            </div>
          </div>

          {!isProcessing && (
            <button
              type="button"
              id="close-ingest-modal-btn"
              onClick={closeIngestModal}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Processing State View */}
        {isProcessing ? (
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto text-[#1769E0] relative shadow-inner">
              <Cpu className="w-8 h-8 animate-pulse text-[#1769E0]" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full ring-2 ring-white animate-ping" />
            </div>

            <div className="max-w-md mx-auto">
              <h4 className="text-lg font-bold text-[#0B1F3A]">
                Running NEXT Multi-Agent Pipeline
              </h4>
              <p className="text-xs text-[#5B6B7A] mt-1">
                Synthesizing consumer insights, generating creative directions, and executing governance audits for <strong className="text-[#0B1F3A]">"{title}"</strong>.
              </p>
            </div>

            {/* Pipeline Step Progress */}
            <div className="max-w-lg mx-auto bg-[#F5F9FF] border border-[#DCE6F2] rounded-xl p-4 text-left space-y-2.5">
              {pipelineStages.map((stage, idx) => {
                const isPassed = idx < pipelineStep;
                const isCurrent = idx === pipelineStep;
                return (
                  <div 
                    key={stage.name}
                    className={`flex items-center gap-3 text-xs transition-all ${
                      isCurrent ? 'font-bold text-[#1769E0] scale-[1.01]' : isPassed ? 'text-emerald-700 font-medium' : 'text-slate-400'
                    }`}
                  >
                    <div className="shrink-0">
                      {isPassed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : isCurrent ? (
                        <Loader2 className="w-4 h-4 text-[#1769E0] animate-spin" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[9px] text-slate-400">
                          {idx + 1}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 truncate">
                      <div className="truncate">{stage.name}</div>
                      {isCurrent && (
                        <div className="text-[10px] text-[#5B6B7A] font-normal">{stage.desc}</div>
                      )}
                    </div>
                    {isPassed && <span className="text-[10px] text-emerald-600 shrink-0 font-bold">Done</span>}
                    {isCurrent && <span className="text-[10px] text-[#1769E0] shrink-0 font-bold animate-pulse">Running</span>}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Quick One-Click Template Presets */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#0B1F3A] flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#1769E0]" />
                  Quick Inspiration & Test Presets
                </span>
                <button
                  type="button"
                  onClick={handleClearForm}
                  className="text-[11px] text-[#5B6B7A] hover:text-[#1769E0] font-medium underline"
                >
                  Start with Blank Canvas
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {PRESETS.map(preset => {
                  const isSelected = title === preset.title;
                  return (
                    <button
                      key={preset.key}
                      type="button"
                      onClick={() => applyPreset(preset)}
                      className={`p-2.5 rounded-xl border text-left transition-all text-xs cursor-pointer ${
                        isSelected 
                          ? 'border-[#1769E0] bg-blue-50/70 shadow-xs' 
                          : 'border-[#DCE6F2] hover:bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-white text-[#1769E0] border border-blue-200">
                          {preset.brand}
                        </span>
                        <span className="text-[9px] text-[#5B6B7A]">{preset.market}</span>
                      </div>
                      <div className="font-bold text-[#0B1F3A] truncate leading-snug">{preset.name}</div>
                      <div className="text-[10px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-1">
                        <TrendingUp className="w-2.5 h-2.5" /> +{preset.velocity}% velocity
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input Source Tabs */}
            <div className="space-y-2 pt-2 border-t border-[#DCE6F2]">
              <label className="block text-xs font-bold text-[#0B1F3A]">
                1. Select Input Source Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 bg-[#F5F9FF] p-1.5 rounded-xl border border-[#DCE6F2]">
                {[
                  { id: 'social', label: 'Social & Viral Post', icon: MessageSquare },
                  { id: 'feedback', label: 'Customer Reviews / VOC', icon: Share2 },
                  { id: 'market_report', label: 'Market Research', icon: TrendingUp },
                  { id: 'idea', label: 'Brand Campaign Pitch', icon: Sparkles },
                  { id: 'raw_paste', label: 'Raw Paste / Document', icon: FileCode }
                ].map(tab => {
                  const Icon = tab.icon;
                  const isActive = sourceTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setSourceTab(tab.id as any)}
                      className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-semibold transition-all ${
                        isActive 
                          ? 'bg-white text-[#1769E0] shadow-xs border border-[#DCE6F2]' 
                          : 'text-[#5B6B7A] hover:text-[#0B1F3A]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span className="truncate">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Core Metadata Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50/60 p-4 rounded-xl border border-[#DCE6F2]">
              {/* Brand Selector */}
              <div>
                <label className="block text-[11px] font-bold text-[#0B1F3A] mb-1">
                  Target Unilever Brand *
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value as any)}
                  className="w-full text-xs bg-white border border-[#DCE6F2] rounded-lg px-3 py-2 text-[#0B1F3A] focus:outline-none focus:ring-2 focus:ring-[#1769E0]/20 font-medium"
                >
                  <option value="Rexona">Rexona (Deodorant & Movement)</option>
                  <option value="Vaseline">Vaseline (Skin Care & Healing)</option>
                  <option value="Surf Excel">Surf Excel (Fabric Care & Stains)</option>
                  <option value="Dove">Dove (Beauty & Self-Esteem)</option>
                  <option value="Axe">Axe / Lynx (Fragrance & Attraction)</option>
                </select>
              </div>

              {/* Target Market */}
              <div>
                <label className="block text-[11px] font-bold text-[#0B1F3A] mb-1">
                  Primary Market / Geography *
                </label>
                <select
                  value={market}
                  onChange={(e) => setMarket(e.target.value)}
                  className="w-full text-xs bg-white border border-[#DCE6F2] rounded-lg px-3 py-2 text-[#0B1F3A] focus:outline-none focus:ring-2 focus:ring-[#1769E0]/20 font-medium"
                >
                  <option value="India">India (South Asia)</option>
                  <option value="Brazil">Brazil (Latin America)</option>
                  <option value="United Kingdom">United Kingdom (Europe)</option>
                  <option value="United States">United States (North America)</option>
                  <option value="Indonesia">Indonesia (Southeast Asia)</option>
                  <option value="Global">Global Cross-Market</option>
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="block text-[11px] font-bold text-[#0B1F3A] mb-1">
                  Territory & Category
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Sports & Movement, Skincare, Monsoon"
                  className="w-full text-xs bg-white border border-[#DCE6F2] rounded-lg px-3 py-2 text-[#0B1F3A] focus:outline-none focus:ring-2 focus:ring-[#1769E0]/20"
                />
              </div>
            </div>

            {/* Signal Title & Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0B1F3A] mb-1">
                  Opportunity Title / Cultural Moment Headline *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Last Over Cricket Composure Debate, Monsoon Mud Stains, Skincare Slugging"
                  className="w-full text-sm font-semibold bg-white border border-[#DCE6F2] rounded-lg px-3 py-2.5 text-[#0B1F3A] focus:outline-none focus:ring-2 focus:ring-[#1769E0]/20"
                />
              </div>

              {/* Context / Raw Text */}
              <div>
                <label className="block text-xs font-bold text-[#0B1F3A] mb-1">
                  Observation / Raw Content / Context
                </label>
                <textarea
                  rows={3}
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  placeholder="Describe what you observed, what consumers are discussing, or paste article/feedback snippet..."
                  className="w-full text-xs bg-white border border-[#DCE6F2] rounded-lg p-3 text-[#0B1F3A] focus:outline-none focus:ring-2 focus:ring-[#1769E0]/20 leading-relaxed"
                />
              </div>

              {/* Sample Evidence Post Details */}
              <div className="bg-[#F5F9FF] p-4 rounded-xl border border-[#DCE6F2] space-y-3">
                <div className="text-xs font-bold text-[#0B1F3A] flex items-center justify-between">
                  <span>Evidence Sample (Social Post / Review / Source)</span>
                  <span className="text-[11px] font-normal text-[#5B6B7A]">Optional evidence card</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-[#5B6B7A] mb-1">Source Platform</label>
                    <select
                      value={postPlatform}
                      onChange={(e) => setPostPlatform(e.target.value as any)}
                      className="w-full text-xs bg-white border border-[#DCE6F2] rounded-lg px-2.5 py-1.5 text-[#0B1F3A]"
                    >
                      <option value="Instagram">Instagram</option>
                      <option value="TikTok">TikTok</option>
                      <option value="X">X (Twitter)</option>
                      <option value="YouTube">YouTube Shorts</option>
                      <option value="Reddit">Reddit</option>
                      <option value="Reviews">Customer Reviews</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#5B6B7A] mb-1">Author / Handle</label>
                    <input
                      type="text"
                      value={postHandle}
                      onChange={(e) => setPostHandle(e.target.value)}
                      placeholder="@handle or username"
                      className="w-full text-xs bg-white border border-[#DCE6F2] rounded-lg px-2.5 py-1.5 text-[#0B1F3A]"
                    >
                    </input>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#5B6B7A] mb-1">Engagement Metrics</label>
                    <input
                      type="text"
                      value={postEngagement}
                      onChange={(e) => setPostEngagement(e.target.value)}
                      placeholder="e.g. 52.4K likes • 8.1K shares"
                      className="w-full text-xs bg-white border border-[#DCE6F2] rounded-lg px-2.5 py-1.5 text-[#0B1F3A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#5B6B7A] mb-1">Post Text / Quote</label>
                  <input
                    type="text"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder="Enter what the creator or user said verbatim..."
                    className="w-full text-xs bg-white border border-[#DCE6F2] rounded-lg px-3 py-1.5 text-[#0B1F3A]"
                  />
                </div>
              </div>

              {/* Observed Metrics Sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-bold text-[#0B1F3A] mb-1">
                    <span>Velocity Score</span>
                    <span className="text-[#1769E0]">+{velocity}%</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="100"
                    value={velocity}
                    onChange={(e) => setVelocity(Number(e.target.value))}
                    className="w-full accent-[#1769E0]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-[#0B1F3A] mb-1">
                    <span>Positive Sentiment</span>
                    <span className="text-emerald-600">{sentiment}%</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="100"
                    value={sentiment}
                    onChange={(e) => setSentiment(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-[#0B1F3A] mb-1">
                    <span>Estimated Reach</span>
                  </div>
                  <input
                    type="text"
                    value={reach}
                    onChange={(e) => setReach(e.target.value)}
                    placeholder="e.g. 2.4M impressions"
                    className="w-full text-xs bg-white border border-[#DCE6F2] rounded-lg px-2.5 py-1 text-[#0B1F3A]"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="pt-4 border-t border-[#DCE6F2] flex items-center justify-between">
              <div className="text-[11px] text-[#5B6B7A]">
                Will create new opportunity & orchestrate 9-stage lifecycle.
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={closeIngestModal}
                  className="px-4 py-2 text-xs font-semibold text-[#5B6B7A] hover:text-[#0B1F3A] bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  id="submit-ingest-signal-btn"
                  disabled={!title.trim()}
                  className="px-5 py-2 text-xs font-bold text-white bg-[#1769E0] hover:bg-blue-700 rounded-xl transition-all shadow-md shadow-blue-600/20 flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                  <span>Process through NEXT AI Pipeline</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

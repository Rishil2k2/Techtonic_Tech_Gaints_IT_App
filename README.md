# Unilever Cultural Opportunity & Activation Engine

An enterprise-grade, real-time cultural intelligence and brand activation platform built for FMCG brand marketing, legal, creative, and media teams. The platform detects micro-trends and cultural moments, evaluates brand fit, synthesizes strategy and multi-format creative assets, enforces governance, adapts messaging across regional markets, and pushes live campaigns directly into DSP and retail media channels.

---

## Key Features

### 1. Real-Time Command Center & KPI Telemetry
- **Portfolio-Wide Health**: Live tracking of active cultural opportunities, pipeline pipeline valuation, SLA compliance, and deployed campaigns.
- **SLA Countdown Matrix**: Real-time urgency clocks categorize incoming signals into `ACT NOW`, `IN PROGRESS`, `WATCH`, and `ACTIVATED` states to capture cultural moments before relevance windows close.
- **Multi-Brand & Geographic Filtering**: Instant filtering across Unilever power brands (*Dove, Rexona, Surf Excel, Vaseline, Lifebuoy, Sunsilk, Horlicks, Pond's*) and regional markets (*India, UK, US, Indonesia, Brazil, Philippines, South Africa*).

### 2. Grounded Cultural Intelligence & Trend Discovery
- **Google Search Grounding**: Integrates real-time web search and social conversation signals via Gemini models with verifiable web citations and source attribution.
- **Multi-Signal Ingestion**: Ingests custom research feeds, social listening data, weather triggers, and quick-commerce search spikes.
- **Brand Safety & Safe Harbor Re-Framing**: Automatically detects sensitive or non-commercial terms and reframes them into legitimate, safe consumer tension points (e.g., late-night screen fatigue or high-pressure composure).

### 3. Structured 9-Stage Campaign Pipeline
1. **Signal & Evidence Ingestion**: Real-time validation of trend velocity, sentiment polarity, mention volumes, and verified social proof.
2. **Consumer Insight Synthesis**: Deep-dive analysis of core psychological tensions, consumer behaviors, and the specific brand role.
3. **Opportunity Decision Gate**: Algorithmic decision scoring with an interactive **Human-in-the-Loop Gate** (*Approve, Modify Outcome, Reject, Escalate*).
4. **AI Strategy & Brief Formulation**: Generates complete strategy briefs containing target personas, key messaging pillars, proof points, and channel distribution mix.
5. **Creative Studio & Multi-Format Routing**: Rapid prototyping for 9:16 vertical video reels, OTT pause banners, in-app quick-commerce cards, and social hooks.
6. **Governance, Legal & Brand Safety Gate**: Automated compliance audits against safe harbor guidelines, claim substantiations, and R&D verifications with manager sign-off.
7. **Localization & Regional Adaptations**: Multi-market adaptation engine with localized copy, cultural nuances, and individual market approvals.
8. **Live Activation & Media Push**: One-click deployment pipelines for DSPs, social ad networks, and quick-commerce retail media (Blinkit, Zepto, Instacart).
9. **Closed-Loop Learning & Attribution**: Post-campaign attribution tracking realized ROAS, basket lift, incremental reach, and institutional learning.

### 4. Enterprise Pipeline Lifecycle Controls
- **Pipeline Retracing**: Roll back any opportunity to a previous stage (e.g., from Localization back to Creative or Strategy) with automated dependency resetting.
- **Modular Stage & Market Cancellation**: Selectively cancel specific phases or individual regional markets with categorized audit justifications.
- **One-Click Resumption & Pipeline Reset**: Resume cancelled phases or reset workflows to clean baseline states.
- **Full Audit Trail**: Chronological logging of all stage transitions, human approvals, modifications, and cancellations with actor attribution and timestamps.

### 5. Analytics & Attribution Dashboard
- **Commercial Attribution**: Recharts-powered visual models comparing projected vs. realized ROAS and quick-commerce basket lift.
- **Channel Efficiency Matrix**: Multi-channel comparison across Social, Quick-Commerce Retail Media, OTT Streaming, and Search.
- **Speed-to-Market Tracking**: Reduction of campaign development cycles from weeks down to hours.

---

## Tech Stack & Architecture

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide React, Motion (Framer Motion), Recharts, Canvas Confetti.
- **Backend**: Express.js (Node.js runtime with `tsx` & `esbuild`).
- **AI & Grounding**: `@google/genai` (Google Gen AI SDK) utilizing Gemini with Google Search Grounding for live cultural trend analysis.
- **Data Architecture**: Fully reactive client-server architecture with in-memory persistence and full audit logging.

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
1. Clone the repository or open the project root directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Copy `.env.example` to `.env` (if applicable) and add your `GEMINI_API_KEY`:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

### Development Mode
Start the full-stack dev server (Express backend + Vite middleware on Port 3000):
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### Production Build
Build the frontend and bundle the backend server:
```bash
npm run build
npm run start
```

---

## Project Structure

```
├── server.ts                           # Express backend with Gemini Grounding & API routes
├── src/
│   ├── main.tsx                        # Client entry point
│   ├── App.tsx                         # Primary view routing and shell layout
│   ├── types.ts                        # Central TypeScript interfaces and data models
│   ├── context/
│   │   └── AppContext.tsx              # Global state manager, pipeline lifecycle & audit engine
│   ├── data/
│   │   ├── seededData.ts               # Pre-populated cultural opportunities & campaigns
│   │   └── analyticsData.ts            # Attribution & performance metrics
│   └── components/
│       ├── common/
│       │   ├── Header.tsx              # Top navigation, global search, and role switcher
│       │   ├── Sidebar.tsx             # Main module navigation
│       │   ├── WorkflowTracker.tsx     # 9-stage interactive pipeline progress breadcrumb
│       │   ├── HumanGateModal.tsx      # Human-in-the-loop decision gate modal
│       │   ├── OpportunityGeneratorModal.tsx # AI trend generation with Google Search Grounding
│       │   ├── IngestDataModal.tsx     # Custom signal ingestion modal
│       │   ├── AIDecisionTrace.tsx     # Algorithmic decision breakdown card
│       │   └── ScoreGauge.tsx          # Dynamic score gauge component
│       └── modules/
│           ├── CommandCenter.tsx       # Executive overview, KPI widgets, and urgency matrix
│           ├── OpportunityDetail.tsx   # Comprehensive 9-stage opportunity execution workspace
│           ├── OpportunitiesList.tsx   # Filterable opportunity catalog & pipeline grid
│           ├── WorkflowsManager.tsx    # Kanban & list workflow progression tracker
│           ├── CampaignsLibrary.tsx    # Asset archive and multi-format preview library
│           ├── AnalyticsDashboard.tsx  # ROAS attribution & channel performance charts
│           ├── IntelligenceDashboard.tsx# Signal velocity matrix & social listening feeds
│           ├── SettingsView.tsx        # Persona switcher, AI thresholds & system settings
│           └── DemoWalkthroughOverlay.tsx # Interactive guided onboarding overlay
├── metadata.json                       # Applet configuration and permissions
└── package.json                        # Project dependencies and build scripts
```

---

## User Personas & Role-Based Workspaces

The platform supports 4 operational personas selectable from the Header or Settings:
- **Brand Manager** (Full lifecycle access, strategic briefing, and creative selection)
- **Legal & Compliance Officer** (Governance sign-off, claim substantiation, and risk escalation)
- **Media Activation Lead** (DSP connection, budget allocation, and retail media deployment)
- **Regional Localization Specialist** (Regional copy adaptation, dialect nuance, and market approval)

---

## License

Internal Enterprise Application — Unilever Brand & Digital Commerce Operations.

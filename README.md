<div align="center">

# 🌟 Spirit Search

### _AI-Powered Deep Research Platform_

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Groq](https://img.shields.io/badge/Groq-AI-orange?style=for-the-badge&logo=ai)](https://groq.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

_Transform your curiosity into comprehensive knowledge with AI-driven research automation_

[Features](#-core-features) • [Architecture](#-architecture) • [Getting Started](#-getting-started) • [API Reference](#-api-reference) • [How It Works](#-how-it-works)

</div>

---

## 📖 What is Spirit Search?

**Spirit Search** is an intelligent research assistant that leverages cutting-edge AI to conduct comprehensive, iterative research on any topic. Unlike traditional search engines that return a list of links, Spirit Search:

- 🤖 **Asks clarifying questions** to understand your research intent
- 🔍 **Performs multi-iteration searches** to gather comprehensive information
- 🧠 **Analyzes and synthesizes** data from multiple sources
- 📝 **Generates detailed reports** with citations and structured insights
- ⚡ **Streams results in real-time** for immediate feedback

Spirit Search is built for researchers, students, developers, and curious minds who need deep, structured knowledge on complex topics.

---

## ✨ Core Features

### 🎯 Intelligent Query Refinement
The system asks targeted follow-up questions to understand:
- Scope and depth of research required
- Specific aspects you're interested in
- Preferred sources and perspectives
- Technical level and audience

### 🔄 Iterative Research Pipeline
Multi-stage research process:
1. **Planning Phase** - Analyzes your topic and generates search strategies
2. **Extraction Phase** - Searches across web sources using Exa AI
3. **Analysis Phase** - Evaluates information sufficiency and generates new queries
4. **Synthesis Phase** - Compiles findings into structured reports

### 📊 Structured Output Generation
Produces comprehensive markdown reports including:
- Executive summaries
- Detailed findings organized by subtopics
- Source citations with URLs
- Related research suggestions
- Key takeaways

### 💨 Real-Time Streaming
Watch your research unfold with:
- Live progress updates
- Streaming report generation
- Activity tracking
- Token usage monitoring

---

## 🏗️ Architecture

### Technology Stack

```
┌─────────────────────────────────────────────────────────┐
│                     Frontend Layer                       │
│  Next.js 16 • React 19 • TypeScript • Tailwind CSS 4   │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────┴────────────────────────────────┐
│                    API Layer (Next.js)                   │
│  • /api/deep-research (Main Pipeline)                   │
│  • /api/generate-questions (Query Refinement)           │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────┴────────────────────────────────┐
│                    AI/ML Services                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Groq API   │  │   Exa AI     │  │ Vercel AI    │ │
│  │ (LLM Provider)  │ (Search API) │  │     SDK      │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Key Dependencies

| Package | Purpose | Version |
|---------|---------|---------|
| `@ai-sdk/groq` | Groq AI integration | 2.0.32 |
| `ai` (Vercel AI SDK) | AI utilities & streaming | 5.0.104 |
| `exa-js` | Web search API | 2.0.11 |
| `zod` | Schema validation | 4.1.13 |
| `zustand` | State management | 5.0.8 |

### AI Models Used

**Primary Model**: `openai/gpt-oss-120b`
- ✅ Supports structured JSON outputs (via `generateObject`)
- ✅ 120 billion parameters for high-quality responses
- ✅ Free tier available on Groq
- ✅ Extremely fast inference (<1s for most operations)

**Model Configuration**:
```typescript
MODELS = {
  PLANNING: "openai/gpt-oss-120b",
  EXTRACTION: "openai/gpt-oss-120b", 
  ANALYSIS: "openai/gpt-oss-120b",
  REPORT: "openai/gpt-oss-120b"
}
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **Groq API Key** (free at [console.groq.com](https://console.groq.com/keys))
- **Exa AI API Key** (get at [exa.ai](https://exa.ai))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/SpiritOfKedar/spiritsearch.git
cd spiritsearch
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:

```bash
GROQ_API_KEY=your_groq_api_key_here
EXA_AI_API=your_exa_api_key_here
```

> 💡 **Tip**: The Groq API offers generous free tier limits (30 requests/min, 14,400 tokens/min)

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

### Verify Installation

The app should load with:
- ✅ Clean, modern UI with gradient text
- ✅ Topic input field
- ✅ Questions generation prompt

---

## 🧠 How It Works

### User Flow

```
1. User enters topic
   ↓
2. AI generates clarifying questions
   ↓
3. User answers questions
   ↓
4. Deep research pipeline starts
   ↓
5. Iterative search & analysis
   ↓
6. Comprehensive report generated
```

### Deep Research Pipeline

The core research algorithm runs in **iterative cycles**:

#### **Iteration Loop** (up to 5 iterations)

```typescript
while (iteration < maxIterations && !analysis.sufficient) {
  // 1. SEARCH PHASE
  const searchResults = await searchWeb(queries);
  
  // 2. ANALYSIS PHASE  
  const analysis = await analyzeResults(searchResults);
  
  // 3. QUERY GENERATION
  if (!analysis.sufficient) {
    queries = analysis.newQueries; // Refine search
  }
  
  iteration++;
}

// 4. REPORT GENERATION
const report = await generateReport(allResults);
```

#### Phases Explained

**🔍 Phase 1: Planning**
- Takes user topic + answers
- Generates initial search strategy
- Creates targeted search queries

**📥 Phase 2: Search & Extract**
- Queries Exa AI for web results
- Retrieves text content from sources
- Filters and ranks by relevance

**🔬 Phase 3: Analysis**
- Evaluates information sufficiency
- Identifies knowledge gaps
- Generates refined queries for next iteration

**📝 Phase 4: Report Synthesis**
- Compiles all findings
- Structures information hierarchically
- Adds citations and sources
- Formats as readable markdown

### Streaming Architecture

Results stream back to the client using **Server-Sent Events (SSE)**:

```typescript
// Server (route.ts)
const stream = createDataStreamResponse({
  execute: async (dataStreamWriter) => {
    dataStreamWriter.writeData('Starting research...');
    // ... research logic
    dataStreamWriter.writeData(reportChunk);
  }
});

// Client (components)
const { messages, append } = useChat({
  onFinish: (message) => {
    // Handle completed report
  }
});
```

---

## 🔌 API Reference

### `POST /api/generate-questions`

Generates clarifying questions for a research topic.

**Request**:
```json
{
  "topic": "How to run llama LLM locally"
}
```

**Response**:
```json
{
  "questions": [
    "Are you interested in setting up LLaMA on CPU, GPU, or both?",
    "Do you need a step-by-step guide for installation?",
    "Should the research focus on official Meta releases?"
  ]
}
```

### `POST /api/deep-research`

Executes the full research pipeline with streaming responses.

**Request**:
```json
{
  "messages": [
    {
      "role": "user",
      "content": "How to run llama LLM locally"
    },
    {
      "role": "user", 
      "content": "I want to run on GPU with CUDA"
    }
  ]
}
```

**Response**: Server-Sent Events (SSE) stream with:
- Activity updates
- Progress markers
- Final markdown report

---

## 🎨 UI Components

Built with **Radix UI** and **Tailwind CSS** for a modern, accessible interface:

- `UserInput` - Topic input with gradient styling
- `QnA` - Interactive question/answer flow
- `ResearchReport` - Markdown renderer with syntax highlighting
- Custom form controls (Dialog, Select, Radio, Tabs)

**Design Philosophy**:
- 🎨 Vibrant gradients and modern aesthetics
- ♿ Fully accessible (keyboard navigation, ARIA labels)
- 📱 Responsive design (mobile, tablet, desktop)
- 🌓 Theme support ready (via next-themes)

---

## 📁 Project Structure

```
spiritsearch/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── deep-research/      # Core research pipeline
│   │   │   │   ├── route.ts        # API endpoint
│   │   │   │   ├── main.ts         # Main orchestration logic
│   │   │   │   ├── research-functions.ts  # Search & analysis
│   │   │   │   ├── model-caller.ts # AI model interface
│   │   │   │   ├── prompts.ts      # System prompts
│   │   │   │   ├── constants.ts    # Model configs
│   │   │   │   ├── types.ts        # TypeScript types
│   │   │   │   ├── services.ts     # External services
│   │   │   │   ├── utils.ts        # Helper functions
│   │   │   │   └── activity-tracker.ts
│   │   │   └── generate-questions/ # Question generation
│   │   │       └── route.ts
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Home page
│   │   └── globals.css             # Global styles
│   ├── components/
│   │   ├── research/               # Research-specific components
│   │   └── ui/                     # Reusable UI components
│   ├── hooks/                      # Custom React hooks
│   ├── lib/                        # Utility libraries
│   └── store/                      # Zustand state stores
├── public/                         # Static assets
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

---

## 🔧 Configuration

### Model Selection

Edit `src/app/api/deep-research/constants.ts`:

```typescript
export const MODELS = {
  PLANNING: "openai/gpt-oss-120b",
  EXTRACTION: "openai/gpt-oss-120b",
  ANALYSIS: "openai/gpt-oss-120b",
  REPORT: "openai/gpt-oss-120b"
};
```

**Supported Models**:
- ✅ `openai/gpt-oss-120b` (recommended)
- ✅ `openai/gpt-oss-20b`
- ✅ `meta-llama/llama-4-maverick-17b-128e-instruct`
- ✅ `meta-llama/llama-4-scout-17b-16e-instruct`

### Research Parameters

Adjust in `constants.ts`:

```typescript
export const CONFIG = {
  MAX_ITERATIONS: 5,        // Max search iterations
  MAX_RESULTS_PER_QUERY: 5, // Results per search
  TEMPERATURE: 0.7,         // Model creativity (0-1)
};
```

---

## 🐛 Troubleshooting

### Common Issues

**❌ "Model does not support json_schema"**
- **Cause**: Using a Llama model without structured output support
- **Fix**: Switch to `openai/gpt-oss-120b` in `constants.ts`

**❌ "401 Unauthorized"**
- **Cause**: Invalid or missing API keys
- **Fix**: Verify `.env` file has correct `GROQ_API_KEY` and `EXA_AI_API`

**❌ "429 Rate Limit"**
- **Cause**: Too many requests to Groq API
- **Fix**: Wait 60 seconds or upgrade to paid tier

**❌ Empty responses**
- **Cause**: Environment variables not loaded
- **Fix**: Restart dev server after updating `.env`

### Debug Mode

Enable console logging in `main.ts`:

```typescript
console.log('🔍 Search results:', searchResults);
console.log('🧠 Analysis:', analysis);
```

---

## 🚢 Deployment

### Deploy to Vercel

1. Push to GitHub:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. Import to Vercel:
- Visit [vercel.com/new](https://vercel.com/new)
- Import your repository
- Add environment variables (`GROQ_API_KEY`, `EXA_AI_API`)
- Deploy!

### Environment Variables (Production)

In Vercel dashboard → Settings → Environment Variables:

```
GROQ_API_KEY=gsk_...
EXA_AI_API=...
```

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🙏 Acknowledgments

Built with:
- [Vercel AI SDK](https://sdk.vercel.ai/docs) - AI utilities
- [Groq](https://groq.com/) - Ultra-fast AI inference
- [Exa AI](https://exa.ai/) - Semantic web search
- [Radix UI](https://www.radix-ui.com/) - Accessible components
- [Next.js](https://nextjs.org/) - React framework

---

<div align="center">

**Made with 💜 by [Spirit of Kedar](https://github.com/SpiritOfKedar)**

[⬆ Back to Top](#-spirit-search)

</div>

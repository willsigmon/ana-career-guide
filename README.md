# Ana's Career Guide

Interactive career transition guide helping Ana move from education to full-time worship ministry.

**Live site:** [anasguide.vercel.app](https://anasguide.vercel.app)

## Features

- **Dashboard** — Progress tracking, weekly focus areas, quick actions
- **Preparation** — Qualifications checklist, experience translations, materials tracker
- **Job Listings** — 16 curated worship pastor positions in NC/SC area
- **Action Checklist** — 24 tasks across 6 categories with localStorage persistence
- **Resources** — Interview prep, questions to ask, salary context
- **AI Career Coach** — Chat assistant for interview prep and encouragement (powered by Gemini)

## Tech Stack

- **Framework:** Next.js 16 + React 19
- **Language:** TypeScript 5.9
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **AI:** Google Gemini 3 Flash via Vercel AI SDK
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 20+
- Google AI API key ([get one here](https://aistudio.google.com/app/apikey))

### Installation

```bash
# Clone the repo
git clone https://github.com/willsigmon/ana-career-guide.git
cd ana-career-guide

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Add your Google AI API key to .env.local
# GOOGLE_GENERATIVE_AI_API_KEY=your_key_here

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Project Structure

```
src/
├── app/
│   ├── api/chat/route.ts   # AI chat endpoint
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── CareerGuide.tsx     # Main dashboard component
│   └── ChatWidget.tsx      # AI chat sidebar
└── data/
    ├── jobs.ts             # Job listings data
    ├── tasks.ts            # Checklist tasks data
    └── content.ts          # Qualifications, tips, resources
```

## Data Management

- **Task completion** is stored in `localStorage` under key `ana-career-tasks`
- **Chat history** is stored in `localStorage` under key `ana-chat-history`
- Job listings and content are in `src/data/` for easy updates

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GOOGLE_GENERATIVE_AI_API_KEY` | Yes | API key for Gemini AI chat |

## Deployment

The app is deployed on Vercel. Push to `main` triggers automatic deployment.

For manual deployment:
```bash
npm run build
npx vercel --prod
```

## License

MIT

---

Made with love for Ana's next chapter 💛

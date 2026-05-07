# HantavirusPrevention.org

Public health information site for hantavirus prevention, outbreak status, risk
indicators, trend dashboards, official-first news aggregation, and localized SEO pages.

## Stack

- Next.js App Router, React Compiler, TypeScript, Tailwind CSS
- PostgreSQL with Drizzle ORM
- MapLibre GL risk map and Apache ECharts trend dashboard
- Vercel Cron ingestion endpoint and Resend-ready alert API
- Vitest unit tests and Playwright E2E smoke tests

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Verification

```bash
npm run lint
npm run test
npm run build
```

## Editorial guardrails

- AI summaries must include source URLs, publication dates, citations, and editorial review.
- Risk labels summarize available public information and are not medical predictions.
- Monetization slots are inactive by default and must not appear inside urgent symptom or outbreak guidance.
- Official agencies and peer-reviewed resources outrank news feeds.

# CLAUDE.md — OnlineLegalCourses.com

## Project Overview
Legal education platform and attorney lead generation site monetized via affiliate marketing.
Domain: onlinelegalcourses.com
Owner: samuelhiggs
Repo: https://github.com/samuelhiggs/onlinelegalcourses

## Tech Stack
- **Framework**: Next.js 15 (App Router, TypeScript, Tailwind CSS)
- **UI**: shadcn/ui + custom components
- **CMS**: Sanity.io (Free tier — content for blog, reviews, comparisons)
- **Database**: Supabase (PostgreSQL — leads, form submissions)
- **Email**: Resend (transactional — lead confirmations, admin alerts)
- **Hosting**: Vercel Pro (auto-deploy on merge to main)
- **Analytics**: GA4, Google Search Console, Microsoft Clarity

## Architecture Rules
- All pages MUST have generateMetadata() with unique title + description
- All content pages MUST include JSON-LD structured data (Course, FAQ, BreadcrumbList, Article, Review)
- Every page with affiliate links MUST include FTC disclosure above the fold
- Every page MUST include "not a lawyer referral service" disclaimer in footer
- Lead forms MUST include TCPA-compliant consent language
- State CLE data lives in src/data/cle-requirements.ts (typed, not JSON)
- Affiliate links use UTM params: ?ref=olc&utm_source=onlinelegalcourses&utm_medium=affiliate
- Images use next/image with WebP, proper alt text, lazy loading
- No `any` types — strict TypeScript throughout
- Use Server Components by default; 'use client' only when needed

## Design System
- Primary: #1B3A5C (navy — authority)
- Accent: #C5930C (gold — premium)
- Text: #1a1a1a
- Muted: #6b7280
- Background: #ffffff
- Alt Background: #f8f9fa
- Success: #059669
- Error: #dc2626
- Headings: Merriweather (serif)
- Body: Inter (sans-serif, 16px min)
- Border radius: 12px on cards, 8px on buttons
- Max content width: 1200px

## SEO Requirements
- Target Lighthouse SEO ≥ 95, Performance ≥ 90, Accessibility ≥ 90
- No duplicate meta titles or descriptions across any pages
- Every page has canonical URL
- Open Graph + Twitter Card metadata on every page
- Internal linking: every content page links to ≥ 3 related pages
- Blog posts minimum 1,500 words with proper heading hierarchy (single H1, structured H2/H3)
- All state CLE pages include FAQ schema with 5-8 questions

## Legal Compliance
- Site is an ADVERTISING PLATFORM, NOT a lawyer referral service
- Footer disclaimer on every page: "OnlineLegalCourses.com is an advertising-supported educational resource. We are NOT a lawyer referral service. We do not endorse, recommend, or vouch for any attorney or legal service provider."
- FTC affiliate disclosure: "This page contains affiliate links. We may earn a commission if you purchase through our links, at no extra cost to you."
- Lead form consent: "By submitting this form, I consent to be contacted by phone, text, or email regarding my inquiry. I understand this is not a lawyer referral service and this consent is not a condition of service."
- CCPA: Privacy policy link accessible from every page

## Commands
```
npm run dev          # Local dev server
npm run build        # Production build
npm run lint         # ESLint
npm run typecheck    # TypeScript strict check
npm run test         # Vitest unit tests
npm run test:e2e     # Playwright E2E tests
```

## Git Conventions
- Conventional commits: feat:, fix:, content:, seo:, chore:, docs:, test:
- All work goes through PRs — never commit directly to main
- Branch naming: feat/description, fix/description, content/description

## Environment Variables Required
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
SANITY_API_TOKEN
SANITY_REVALIDATE_SECRET
RESEND_API_KEY
NEXT_PUBLIC_GA_MEASUREMENT_ID
NEXT_PUBLIC_CLARITY_ID
NEXT_PUBLIC_SITE_URL=https://onlinelegalcourses.com
```

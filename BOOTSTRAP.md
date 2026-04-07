# BOOTSTRAP.md — Full Build Specification for OnlineLegalCourses.com

You are building a complete, production-ready legal education platform from scratch. This is a Next.js 15 site that serves three purposes: (1) helps attorneys find CLE/MCLE courses via comparison and review content, (2) helps law students find bar prep courses, and (3) connects potential clients with attorneys via a lead capture form. Revenue comes from affiliate links to legal education providers and legal tech tools.

Execute every section below in order. After each major section, stage and commit your work with a conventional commit message. When the entire build is complete, push everything to a new branch called `feat/initial-scaffold` and create a PR.

---

## SECTION 1: Project Scaffolding

1. Initialize Next.js 15 with App Router:
```bash
npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*" --use-npm
```
Note: The current directory already has a README.md and .git — if create-next-app complains, initialize in a temp directory and move files, or use --yes to overwrite.

2. Install production dependencies:
```bash
npm install @supabase/supabase-js resend @next/third-parties next-sitemap clsx tailwind-merge lucide-react
```

3. Install dev dependencies:
```bash
npm install -D @playwright/test vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom prettier eslint-config-prettier
```

4. Install shadcn/ui and initialize it:
```bash
npx shadcn@latest init
```
Choose: New York style, Slate base color, CSS variables: yes.
Then add core components:
```bash
npx shadcn@latest add button card input label select textarea badge separator sheet navigation-menu accordion
```

5. Configure Tailwind with the project's design tokens. Update tailwind.config.ts to include:
   - Custom colors: primary (#1B3A5C), accent (#C5930C), and all design system colors from CLAUDE.md
   - Font families: Merriweather for headings, Inter for body
   - Max-width: 1200px content container

6. Add Google Fonts (Merriweather + Inter) via next/font/google in the root layout.

7. Create npm scripts in package.json:
```json
{
  "typecheck": "tsc --noEmit",
  "test": "vitest run",
  "test:watch": "vitest",
  "test:e2e": "playwright test"
}
```

8. Create vitest.config.ts and playwright.config.ts with sensible defaults.

9. Create a `.env.local.example` file listing all required environment variables (from CLAUDE.md) with placeholder values.

10. Commit: `feat: scaffold Next.js 15 project with dependencies and tooling`

---

## SECTION 2: Core Layout and Shared Components

Build these files:

### src/app/layout.tsx
- Root layout with Merriweather + Inter fonts
- Metadata: title template "%s | OnlineLegalCourses.com", default title, description, Open Graph defaults
- Include Header and Footer components
- Include Google Analytics via @next/third-parties (read NEXT_PUBLIC_GA_MEASUREMENT_ID from env)
- Viewport and theme-color meta tags

### src/components/Header.tsx
- Responsive navigation with mobile hamburger menu (use Sheet from shadcn)
- Logo text: "OnlineLegalCourses" with a small scale-of-justice or book icon (use Lucide)
- Nav links: CLE Requirements, Bar Prep, Compare Providers, Find an Attorney, Blog
- Sticky header with subtle backdrop blur on scroll
- Gold accent CTA button: "Find an Attorney" linking to /find-attorney

### src/components/Footer.tsx
- Four-column layout: Company (About, Contact, Privacy, Terms), Resources (CLE Guide, Bar Prep, Blog), Legal (Disclaimer, Privacy Policy, Terms of Service), Connect (placeholder social links)
- Full legal disclaimer text (from CLAUDE.md) in smaller text below columns
- Copyright line: © 2026 OnlineLegalCourses.com. All rights reserved.
- Sitemap link

### src/components/ui/CTAButton.tsx
- Reusable call-to-action button with variants: primary (gold), secondary (navy), outline
- Accepts href prop for link behavior
- Subtle hover animation (scale + shadow)

### src/components/ui/TrustBar.tsx
- Horizontal strip of trust signals: "Trusted by 50,000+ Legal Professionals" with placeholder certification badge icons
- Subtle background (#f8f9fa), centered, used on homepage and lead form page

### src/components/ui/AffiliateCard.tsx
- Card component for displaying a legal education provider
- Props: name, description, rating (1-5 stars), features (string[]), ctaText, ctaUrl, badge (e.g., "Editor's Choice"), priceRange
- Includes FTC disclosure text below the CTA link
- Tracks click events via data attributes

### src/components/ui/DisclaimerBanner.tsx
- Thin banner (can be placed at top or bottom of pages) stating the site is not a lawyer referral service
- Dismissible with a small X button, remembers dismissal via cookie/state

### src/lib/utils.ts
- cn() function combining clsx + tailwind-merge (standard shadcn pattern)
- formatDate() helper
- slugify() helper
- generateId() helper

### src/lib/seo.ts
- Helper function: generatePageMetadata(title, description, path, additionalMeta?) → returns Next.js Metadata object with full Open Graph, Twitter Card, canonical URL
- Helper function: generateBreadcrumbSchema(items: {name, url}[]) → returns JSON-LD BreadcrumbList
- Helper function: generateFAQSchema(faqs: {question, answer}[]) → returns JSON-LD FAQPage
- Helper function: generateCourseSchema(course: {...}) → returns JSON-LD Course
- Helper function: generateArticleSchema(article: {...}) → returns JSON-LD Article
- All schema functions return proper JSON-LD script tag content

### src/lib/supabase.ts
- Server-side Supabase client using SUPABASE_SERVICE_ROLE_KEY
- Client-side Supabase client using NEXT_PUBLIC_SUPABASE_ANON_KEY
- Typed exports

### src/lib/resend.ts
- Resend client initialization
- sendLeadConfirmation(to, name) function
- sendAdminNotification(lead) function

Commit: `feat: build core layout, shared components, and utility libraries`

---

## SECTION 3: Homepage

### src/app/page.tsx

Build a compelling, conversion-optimized homepage with these sections in order:

1. **Hero Section**
   - Large heading: "Find the Right Legal Education & Attorney for You"
   - Subheading: "Compare CLE courses, bar prep programs, and connect with qualified attorneys across all 50 states"
   - Two CTAs: "Find an Attorney" (primary/gold) and "Compare CLE Providers" (secondary/outline)
   - Subtle background pattern or gradient (navy to slightly lighter navy)
   - Trust indicator below CTAs: "Trusted by 50,000+ legal professionals nationwide"

2. **Three Value Cards**
   - "CLE & MCLE Courses" — Find accredited continuing legal education → links to /cle-requirements
   - "Bar Exam Prep" — Compare top bar prep courses → links to /bar-prep
   - "Find an Attorney" — Connect with qualified lawyers → links to /find-attorney
   - Each card has a Lucide icon, short description, and "Learn More →" link

3. **Featured Provider Comparison**
   - Section heading: "Top-Rated Legal Education Providers"
   - Display 3 AffiliateCards for: Lawline, BARBRI, Themis (use realistic but placeholder data)
   - "View All Comparisons →" link to /compare

4. **State CLE Requirements Grid**
   - Section heading: "CLE Requirements by State"
   - Grid of all 50 states as clickable pills/badges linking to /cle-requirements/[state]
   - Organized alphabetically, responsive grid (5-6 columns desktop, 3 mobile)

5. **How It Works**
   - 3-step visual: "Browse Providers" → "Compare Options" → "Start Learning"
   - Clean horizontal layout with numbered circles and connecting lines

6. **Blog Preview**
   - Section heading: "Latest from Our Blog"
   - 3 placeholder blog post cards with title, excerpt, date, "Read More →"
   - Link to /blog

7. **Final CTA**
   - Full-width banner: "Ready to advance your legal career?"
   - CTA: "Get Started Today" → /find-attorney

Include full metadata via generatePageMetadata() and BreadcrumbList schema.

Commit: `feat: build homepage with hero, providers, state grid, and CTAs`

---

## SECTION 4: State CLE Requirements — Programmatic SEO Pages

### src/data/cle-requirements.ts

Create a TypeScript file exporting a typed array of ALL 53 jurisdictions (50 states + DC + US Virgin Islands + Puerto Rico). Each entry must be fully typed:

```typescript
export interface StateRequirement {
  name: string;              // "California"
  abbreviation: string;       // "CA"
  slug: string;              // "california"
  totalHours: number;        // 25
  compliancePeriod: string;  // "3 years"
  ethicsHours: number;       // 4
  specialRequirements: string[]; // ["1 hr competence issues", "1 hr substance abuse"]
  newAdmitteeHours: number | null;
  newAdmitteeDeadline: string | null;
  reportingDeadline: string; // "Last day of birth month, every 3 years"
  carryoverAllowed: boolean;
  carryoverLimit: string | null;
  selfStudyLimit: string | null;
  onlineAllowed: boolean;
  officialBarUrl: string;    // Link to the state bar CLE page
  accreditedProviders: string[]; // ["Lawline", "PLI", "NBI"]
  notes: string;             // Any special notes
}
```

Research and fill in ACCURATE data for all 53 jurisdictions. Use these official sources:
- Each state bar association's CLE page
- ACLEA (Association for Continuing Legal Education)
- ABA MCLE comparison chart

For the top 15 states by attorney population (CA, NY, TX, FL, IL, PA, OH, NJ, GA, MA, VA, MI, NC, MD, WA), include detailed, researched data. For remaining states, include your best knowledge with a note that data should be verified.

### src/app/cle-requirements/page.tsx
- Hub page listing all 53 jurisdictions in a searchable, filterable grid
- Filter by: total hours required (range), online allowed (yes/no), compliance period
- Each state card shows: name, total hours, compliance period, "View Details →"
- Metadata: "CLE Requirements by State 2026 | Complete Guide to Continuing Legal Education"
- FAQ schema with 5 general CLE questions

### src/app/cle-requirements/[state]/page.tsx
- generateStaticParams() returning all 53 slugs
- Dynamic metadata: "[State] CLE Requirements 2026 | Hours, Deadlines & Approved Providers"
- Page content:
  - H1: "[State] Continuing Legal Education (CLE) Requirements"
  - Quick-reference card: total hours, ethics hours, compliance period, deadline
  - Detailed requirements table
  - Special requirements section
  - Approved online providers section with AffiliateCards
  - "New admittee" section if applicable
  - Carryover and self-study rules
  - Link to official state bar CLE page
  - 300-500 words of unique editorial content about CLE in that state
  - FAQ section with 5-8 state-specific questions and FAQ schema
  - BreadcrumbList schema: Home > CLE Requirements > [State]
  - Internal links to: 3 neighboring/similar states, the CLE hub, bar prep page
  - AffiliateCards for providers accredited in that state

Commit: `feat: build 53 state CLE requirement pages with programmatic SEO`

---

## SECTION 5: Bar Prep Section

### src/app/bar-prep/page.tsx
- Hub page for bar prep resources
- Overview of the bar exam (MBE, MEE, MPT, UBE explanation)
- Comparison table of top bar prep providers: BARBRI, Themis, Kaplan, UWorld, Quimbee, AdaptiBar
- Table columns: Provider, Price Range, Format, Pass Guarantee, Best For
- AffiliateCards for each provider
- FAQ schema about bar prep
- Metadata: "Best Bar Prep Courses 2026 | Compare BARBRI, Themis & More"

### src/app/bar-prep/[provider]/page.tsx
- Individual review pages for each major provider
- generateStaticParams for: barbri, themis, kaplan, uworld, quimbee, adaptibar
- Each page: overview, pros/cons, pricing, features, verdict, rating
- Create a src/data/bar-prep-providers.ts with structured data for each provider
- AffiliateCard with CTA at top and bottom of page
- Internal links to comparison page and other provider reviews

Commit: `feat: build bar prep hub and individual provider review pages`

---

## SECTION 6: Comparison Pages

### src/app/compare/page.tsx
- Hub listing all available comparisons
- Cards for each comparison with versus-style design

### src/app/compare/[slug]/page.tsx
- generateStaticParams for: barbri-vs-themis, barbri-vs-kaplan, themis-vs-uworld, lawline-vs-nbi, best-online-cle-providers
- Create src/data/comparisons.ts with structured comparison data
- Each page has:
  - Side-by-side comparison table
  - Detailed breakdown by category (price, features, support, content quality)
  - Verdict section with recommendation
  - AffiliateCards for both/all providers
  - FAQ schema
  - Unique meta title: "[Provider A] vs [Provider B] 2026: Which Is Better?"

Commit: `feat: build comparison pages for providers`

---

## SECTION 7: Lead Capture — Find an Attorney

### src/app/find-attorney/page.tsx
- Multi-step form (3 steps) built as a client component
- Step 1 (33% progress): Name + Email fields
- Step 2 (66% progress): Practice Area dropdown (Family Law, Criminal Defense, Personal Injury, Immigration, Business Law, Real Estate, Estate Planning, Employment Law, Bankruptcy, Tax Law, Other) + State dropdown (all 50 states + DC)
- Step 3 (100% progress): Phone + Brief description textarea + Consent checkbox
- Consent text from CLAUDE.md
- Animated progress bar at top
- Form validation with helpful error messages
- On submit: POST to /api/leads/route.ts
- Success state: "Thank you! A qualified attorney will contact you within 24 hours." + related CLE/bar prep recommendations

### src/app/api/leads/route.ts
- POST handler that:
  1. Validates all required fields server-side
  2. Inserts lead into Supabase `leads` table
  3. Sends confirmation email to the user via Resend
  4. Sends admin notification email via Resend (to a configurable admin email)
  5. Returns success/error JSON response
- Rate limiting: max 5 submissions per IP per hour (simple in-memory store)
- Input sanitization

### Trust elements on the form page:
- TrustBar component at top
- Sidebar (desktop) or section (mobile) with: "Your information is secure", "No obligation", "Free consultation", privacy assurance
- Testimonial placeholder

Commit: `feat: build multi-step lead capture form with API route`

---

## SECTION 8: Blog Infrastructure

### src/app/blog/page.tsx
- Blog listing page with placeholder posts
- Card layout: title, excerpt, date, estimated read time, category badge
- Pagination-ready structure (show 10 per page)

### src/app/blog/[slug]/page.tsx
- Individual blog post page reading from MDX files in src/content/blog/
- Includes: author byline, publish date, estimated read time, category
- Table of contents generated from headings
- Article schema JSON-LD
- Social share buttons (placeholder)
- "Related Posts" section at bottom
- AffiliateCards inserted contextually

### src/content/blog/
Create 3 full blog posts as .mdx files (each ≥ 1,500 words):

1. `what-is-cle.mdx` — "What Is CLE? A Complete Guide to Continuing Legal Education"
   - Explain CLE, why it exists, who needs it, how to earn credits
   - Internal links to state CLE pages
   - FAQ section

2. `barbri-vs-themis-2026.mdx` — "BARBRI vs Themis 2026: The Definitive Comparison"
   - Detailed comparison of both bar prep courses
   - Pricing, features, pass rates, user experience
   - AffiliateCards for both

3. `free-cle-courses-online.mdx` — "How to Get Free CLE Credits Online in 2026"
   - List free CLE providers and methods
   - State-specific notes
   - AffiliateCards for paid alternatives

Commit: `feat: build blog infrastructure with 3 initial posts`

---

## SECTION 9: Legal/Compliance Pages

### src/app/privacy/page.tsx
- Comprehensive privacy policy covering: data collection, cookies, third-party services, CCPA rights, contact info
- Plain language, properly sectioned

### src/app/terms/page.tsx
- Terms of service: usage terms, disclaimer of legal advice, limitation of liability, affiliate disclosure

### src/app/disclaimer/page.tsx
- Full legal disclaimer emphasizing: not a lawyer referral service, no attorney endorsement, advertising platform, independent editorial

### src/app/about/page.tsx
- About page: mission statement, how the site works, editorial standards, contact information

Commit: `feat: build legal compliance pages (privacy, terms, disclaimer, about)`

---

## SECTION 10: SEO Configuration

### next-sitemap.config.js
- Generate sitemap.xml and robots.txt
- Include all static pages, state CLE pages, bar prep pages, comparison pages, blog posts
- Set priority: homepage 1.0, state pages 0.9, comparisons 0.8, blog 0.7
- Changefreq: state pages monthly, blog weekly, comparisons monthly

### src/app/robots.ts
- Allow all crawlers
- Reference sitemap location

### src/app/sitemap.ts
- Dynamic sitemap generation including all routes

### Structured Data Verification
- Verify every page type has correct JSON-LD
- Homepage: Organization schema
- State pages: FAQ + BreadcrumbList
- Blog posts: Article + BreadcrumbList
- Bar prep reviews: Review + BreadcrumbList
- Comparison pages: FAQ + BreadcrumbList

Commit: `seo: configure sitemap, robots.txt, and verify structured data`

---

## SECTION 11: Testing

### Vitest Unit Tests (src/__tests__/)
- `seo.test.ts`: Test all schema generation functions produce valid JSON-LD
- `cle-data.test.ts`: Verify all 53 states exist, have required fields, slugs are unique, URLs are valid
- `utils.test.ts`: Test slugify, formatDate, cn utilities
- `lead-validation.test.ts`: Test form validation logic (valid/invalid emails, required fields, phone format)

### Playwright E2E Tests (e2e/)
- `homepage.spec.ts`: Page loads, navigation works, CTAs link correctly, Lighthouse score check
- `cle-pages.spec.ts`: Hub page loads, California detail page renders all sections, links work
- `lead-form.spec.ts`: Complete 3-step form flow, validation errors display, successful submission
- `navigation.spec.ts`: Mobile menu opens/closes, all nav links resolve, footer links work

Commit: `test: add unit tests and E2E tests for critical paths`

---

## SECTION 12: GitHub Actions CI/CD

### .github/workflows/ci.yml
```yaml
name: CI
on:
  pull_request:
    branches: [main, master]
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run test
      - run: npm run build
```

### .github/workflows/claude-agent.yml
```yaml
name: Claude Agent
on:
  issues:
    types: [opened, labeled]
  issue_comment:
    types: [created]
  schedule:
    - cron: '0 6 * * 1'    # Weekly maintenance Monday 6am UTC
    - cron: '0 8 1,15 * *'  # Content generation 1st and 15th
jobs:
  agent:
    if: |
      (github.event_name == 'issues' && contains(github.event.issue.labels.*.name, 'claude')) ||
      (github.event_name == 'issue_comment' && contains(github.event.comment.body, '@claude')) ||
      (github.event_name == 'schedule')
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
      issues: write
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
```

Commit: `chore: add CI pipeline and Claude agent GitHub Actions`

---

## SECTION 13: Content Queue

### src/data/content-queue.json
Create a queue of 20 planned content items for the agent to work through:
- 10 blog posts targeting specific CLE and bar prep keywords
- 5 additional provider review pages
- 5 additional comparison pages
Each entry: id, type, title, target_keywords[], status ("pending"), priority (1-3)

Commit: `content: add content queue for autonomous agent`

---

## SECTION 14: Final Polish

1. Run `npm run lint` and fix all linting errors
2. Run `npm run typecheck` and fix all TypeScript errors
3. Run `npm run build` and ensure it builds successfully with zero errors
4. Run `npm run test` and ensure all unit tests pass
5. Review every page for:
   - Correct metadata (no duplicates, no missing titles)
   - FTC disclosure present on affiliate pages
   - Legal disclaimer in footer
   - Internal links working
   - Mobile responsiveness (use responsive Tailwind classes)
6. Verify the sitemap config will generate correct URLs

Commit: `chore: final polish — fix lint, types, build, and test issues`

---

## SECTION 15: Create PR

1. Ensure all changes are committed on the `feat/initial-scaffold` branch
2. Push the branch to origin
3. Create a pull request with:
   - Title: "feat: complete initial scaffold of OnlineLegalCourses.com"
   - Body: Summary of everything built, organized by section, with a checklist of all major features
   - Request review (if collaborators exist)

---

## IMPORTANT REMINDERS

- Read CLAUDE.md before starting for design tokens, compliance rules, and architecture decisions
- Every single page needs unique metadata — no duplicates anywhere
- Use Server Components by default; only add 'use client' for interactive elements
- The lead form and mobile nav are the only components that NEED to be client components
- Commit after each section — do not try to do everything in one giant commit
- If any npm install fails, try alternative approaches and document what you did
- If you cannot complete a section (e.g., need API keys for Sanity), stub it with TODO comments and move on
- The site must BUILD SUCCESSFULLY even without environment variables (use fallbacks/conditionals)
- Test that `npm run build` works before creating the PR

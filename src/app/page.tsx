import Link from "next/link"
import {
  BookOpen,
  GraduationCap,
  Users,
  ArrowRight,
} from "lucide-react"
import { CTAButton } from "@/components/ui/CTAButton"
import { TrustBar } from "@/components/ui/TrustBar"
import { AffiliateCard } from "@/components/ui/AffiliateCard"
import { Badge } from "@/components/ui/badge"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/seo"

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada",
  "New Hampshire","New Jersey","New Mexico","New York","North Carolina",
  "North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island",
  "South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont",
  "Virginia","Washington","West Virginia","Wisconsin","Wyoming",
  "District of Columbia","Puerto Rico","US Virgin Islands",
]

function stateToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-")
}

export const metadata = generatePageMetadata(
  "OnlineLegalCourses.com | Legal Education & Attorney Resources",
  "Discover accredited CLE courses, bar prep programs, and connect with qualified attorneys across all 50 states. Compare top legal education providers.",
  "/",
  {
    keywords: [
      "CLE courses",
      "bar prep",
      "continuing legal education",
      "find attorney",
      "MCLE requirements",
    ],
  }
)

const FEATURED_PROVIDERS = [
  {
    name: "Lawline",
    description:
      "Accredited CLE courses for attorneys in all 50 states. Over 1,800 programs in 30+ practice areas with on-demand and live options.",
    rating: 5 as const,
    features: [
      "Accredited in all 50 states",
      "1,800+ course catalog",
      "Monthly and annual plans",
      "Mobile-friendly platform",
    ],
    ctaText: "Visit Lawline",
    ctaUrl: "https://www.lawline.com",
    badge: "Editor's Choice",
    priceRange: "$29/mo - $399/yr",
  },
  {
    name: "BARBRI",
    description:
      "The most trusted name in bar prep with 50+ years of proven results. Comprehensive study plans, practice exams, and expert instruction.",
    rating: 5 as const,
    features: [
      "Highest pass rates in the industry",
      "Personalized study plans",
      "10,000+ practice questions",
      "Full money-back guarantee",
    ],
    ctaText: "Visit BARBRI",
    ctaUrl: "https://www.barbri.com",
    badge: "Most Popular",
    priceRange: "$2,999 - $4,499",
  },
  {
    name: "Themis",
    description:
      "Affordable, tech-forward bar prep built by law professors. Adaptive learning and video lectures at a fraction of the cost.",
    rating: 4 as const,
    features: [
      "Up to 75% less than competitors",
      "Adaptive learning technology",
      "Directed study program",
      "UBE and state-specific content",
    ],
    ctaText: "Visit Themis",
    ctaUrl: "https://www.themisbar.com",
    priceRange: "$1,295 - $2,495",
  },
]

const BLOG_POSTS = [
  {
    title: "What Is CLE? A Complete Guide to Continuing Legal Education",
    excerpt:
      "Everything attorneys need to know about CLE requirements, earning credits, and maintaining licensure across all 50 states.",
    date: "March 15, 2026",
    slug: "what-is-cle",
  },
  {
    title: "BARBRI vs Themis 2026: The Definitive Comparison",
    excerpt:
      "We compare pricing, features, pass rates, and student experience to help you choose the right bar prep course.",
    date: "March 8, 2026",
    slug: "barbri-vs-themis-2026",
  },
  {
    title: "How to Get Free CLE Credits Online in 2026",
    excerpt:
      "Discover legitimate ways to earn free CLE credits online, including pro bono opportunities and complimentary provider offers.",
    date: "February 28, 2026",
    slug: "free-cle-courses-online",
  },
]

export default function HomePage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
  ])

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "OnlineLegalCourses.com",
    url: "https://onlinelegalcourses.com",
    description:
      "Legal education platform helping attorneys find CLE courses, bar prep programs, and connect with legal resources.",
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-navy py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-[#0f2440] opacity-90" />
        <div className="relative mx-auto max-w-[1200px] px-4 text-center">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Find the Right Legal Education
            <br className="hidden sm:block" />
            <span className="text-gold"> & Attorney for You</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            Compare CLE courses, bar prep programs, and connect with qualified
            attorneys across all 50 states
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <CTAButton href="/find-attorney" variant="primary" size="lg">
              Find an Attorney
            </CTAButton>
            <CTAButton
              href="/compare"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-navy"
            >
              Compare CLE Providers
            </CTAButton>
          </div>
          <p className="mt-8 text-sm text-white/60">
            Trusted by 50,000+ legal professionals nationwide
          </p>
        </div>
      </section>

      <TrustBar />

      {/* Three Value Cards */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: BookOpen,
                title: "CLE & MCLE Courses",
                description:
                  "Find accredited continuing legal education courses in your state. Compare providers, pricing, and formats.",
                href: "/cle-requirements",
              },
              {
                icon: GraduationCap,
                title: "Bar Exam Prep",
                description:
                  "Compare top bar prep courses including BARBRI, Themis, and Kaplan. Find the best fit for your learning style.",
                href: "/bar-prep",
              },
              {
                icon: Users,
                title: "Find an Attorney",
                description:
                  "Connect with qualified lawyers in your area for a free consultation. Family law, criminal defense, and more.",
                href: "/find-attorney",
              },
            ].map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group rounded-xl border border-border bg-white p-8 shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
              >
                <card.icon className="size-10 text-gold" aria-hidden="true" />
                <h2 className="mt-4 font-heading text-xl font-bold text-navy">
                  {card.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                  {card.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold transition-colors group-hover:text-gold/80">
                  Learn More
                  <ArrowRight className="size-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Provider Comparison */}
      <section className="bg-alt-bg py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="text-center">
            <h2 className="font-heading text-2xl font-bold text-navy sm:text-3xl">
              Top-Rated Legal Education Providers
            </h2>
            <p className="mt-3 text-foreground/70">
              Compare the best CLE and bar prep providers side by side
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {FEATURED_PROVIDERS.map((provider) => (
              <AffiliateCard key={provider.name} {...provider} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <CTAButton href="/compare" variant="outline" size="md">
              View All Comparisons
              <ArrowRight className="ml-2 size-4" aria-hidden="true" />
            </CTAButton>
          </div>
        </div>
      </section>

      {/* State CLE Requirements Grid */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="text-center">
            <h2 className="font-heading text-2xl font-bold text-navy sm:text-3xl">
              CLE Requirements by State
            </h2>
            <p className="mt-3 text-foreground/70">
              Click your state to view detailed CLE/MCLE requirements
            </p>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {US_STATES.map((state) => (
              <Link
                key={state}
                href={`/cle-requirements/${stateToSlug(state)}`}
              >
                <Badge
                  variant="outline"
                  className="cursor-pointer border-navy/20 px-3 py-1.5 text-sm font-medium text-navy transition-all hover:bg-navy hover:text-white"
                >
                  {state}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-alt-bg py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4">
          <h2 className="text-center font-heading text-2xl font-bold text-navy sm:text-3xl">
            How It Works
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                step: 1,
                title: "Browse Providers",
                description:
                  "Explore our curated directory of CLE providers, bar prep courses, and legal education resources.",
              },
              {
                step: 2,
                title: "Compare Options",
                description:
                  "Read expert reviews, compare features and pricing, and see what other attorneys recommend.",
              },
              {
                step: 3,
                title: "Start Learning",
                description:
                  "Enroll in the course that fits your needs and start earning CLE credits or preparing for the bar.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-navy text-xl font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-navy">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="text-center">
            <h2 className="font-heading text-2xl font-bold text-navy sm:text-3xl">
              Latest from Our Blog
            </h2>
            <p className="mt-3 text-foreground/70">
              Expert insights on legal education, CLE, and career development
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-xl border border-border bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
              >
                <time className="text-xs font-medium text-text-muted">
                  {post.date}
                </time>
                <h3 className="mt-2 font-heading text-lg font-bold text-navy transition-colors group-hover:text-gold">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold">
                  Read More
                  <ArrowRight className="size-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <CTAButton href="/blog" variant="outline" size="md">
              View All Posts
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-navy py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 text-center">
          <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
            Ready to Advance Your Legal Career?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Whether you need CLE credits, bar prep courses, or want to connect
            with a qualified attorney, we can help.
          </p>
          <div className="mt-8">
            <CTAButton href="/find-attorney" variant="primary" size="lg">
              Get Started Today
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  )
}

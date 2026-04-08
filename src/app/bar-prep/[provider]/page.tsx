import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { Check, X, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AffiliateCard } from "@/components/ui/AffiliateCard"
import { CTAButton } from "@/components/ui/CTAButton"
import {
  barPrepProviders,
  getProviderBySlug,
  getAllProviderSlugs,
} from "@/data/bar-prep-providers"
import {
  generatePageMetadata,
  generateBreadcrumbSchema,
} from "@/lib/seo"

interface PageProps {
  params: Promise<{ provider: string }>
}

export function generateStaticParams() {
  return getAllProviderSlugs().map((slug) => ({ provider: slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { provider: slug } = await params
  const provider = getProviderBySlug(slug)
  if (!provider) return {}

  return generatePageMetadata(
    `${provider.name} Bar Prep Review 2026 | Pricing, Features & Verdict`,
    `In-depth review of ${provider.name} bar prep course. ${provider.priceRange}, ${provider.format} format. Pros, cons, pricing, and our expert verdict.`,
    `/bar-prep/${provider.slug}`,
    {
      keywords: [
        `${provider.name} review`,
        `${provider.name} bar prep`,
        `${provider.name} pricing`,
        "bar prep review 2026",
      ],
    }
  )
}

export default async function ProviderReviewPage({ params }: PageProps) {
  const { provider: slug } = await params
  const provider = getProviderBySlug(slug)

  if (!provider) notFound()

  const otherProviders = barPrepProviders.filter((p) => p.slug !== slug).slice(0, 2)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Bar Prep", url: "/bar-prep" },
    { name: provider.name, url: `/bar-prep/${provider.slug}` },
  ])

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Product",
      name: `${provider.name} Bar Prep`,
      description: provider.description,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: provider.rating,
      bestRating: 5,
    },
    author: {
      "@type": "Organization",
      name: "OnlineLegalCourses.com",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      {/* Hero */}
      <section className="bg-navy py-10 lg:py-14">
        <div className="mx-auto max-w-[1200px] px-4">
          <nav className="mb-4 text-sm text-white/60">
            <Link href="/" className="hover:text-white/80">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/bar-prep" className="hover:text-white/80">Bar Prep</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{provider.name}</span>
          </nav>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-heading text-3xl font-bold text-white">
                {provider.name} Bar Prep Review 2026
              </h1>
              <div className="mt-2 flex items-center gap-3">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`size-5 ${i < provider.rating ? "fill-gold text-gold" : "fill-white/20 text-white/20"}`}
                    />
                  ))}
                </div>
                <span className="text-white/80">{provider.rating}/5</span>
                <Badge className="bg-gold text-white">{provider.priceRange}</Badge>
              </div>
            </div>
            <CTAButton href={`${provider.url}?ref=olc&utm_source=onlinelegalcourses&utm_medium=affiliate`} variant="primary" size="lg">
              Visit {provider.name}
            </CTAButton>
          </div>
        </div>
      </section>

      {/* FTC Disclosure */}
      <div className="bg-alt-bg border-b border-border py-2">
        <p className="mx-auto max-w-[1200px] px-4 text-xs text-muted-foreground">
          This page contains affiliate links. We may earn a commission if you purchase through our links, at no extra cost to you.
        </p>
      </div>

      <div className="mx-auto max-w-[1200px] px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <section>
              <h2 className="font-heading text-xl font-bold text-navy">Overview</h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground/80">{provider.overview}</p>
            </section>

            {/* Pros & Cons */}
            <section>
              <h2 className="font-heading text-xl font-bold text-navy">Pros & Cons</h2>
              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-success text-base">Pros</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {provider.pros.map((pro) => (
                        <li key={pro} className="flex items-start gap-2 text-sm">
                          <Check className="mt-0.5 size-4 shrink-0 text-success" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-error text-base">Cons</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {provider.cons.map((con) => (
                        <li key={con} className="flex items-start gap-2 text-sm">
                          <X className="mt-0.5 size-4 shrink-0 text-error" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Features */}
            <section>
              <h2 className="font-heading text-xl font-bold text-navy">Key Features</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {provider.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 rounded-lg border border-border p-3 text-sm">
                    <Check className="size-4 shrink-0 text-gold" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Pricing */}
            <section>
              <h2 className="font-heading text-xl font-bold text-navy">Pricing</h2>
              <div className="mt-4 space-y-3">
                {provider.pricing.map((plan) => (
                  <Card key={plan.plan}>
                    <CardContent className="flex items-center justify-between py-4">
                      <div>
                        <h3 className="font-semibold text-navy">{plan.plan}</h3>
                        <p className="text-sm text-muted-foreground">{plan.details}</p>
                      </div>
                      <span className="text-xl font-bold text-navy">{plan.price}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {provider.passGuarantee && provider.passGuaranteeDetails && (
                <div className="mt-4 rounded-lg bg-success/10 border border-success/20 p-4">
                  <p className="text-sm font-medium text-success">
                    Pass Guarantee: {provider.passGuaranteeDetails}
                  </p>
                </div>
              )}
            </section>

            {/* Verdict */}
            <section>
              <h2 className="font-heading text-xl font-bold text-navy">Our Verdict</h2>
              <Card className="mt-4 border-gold/30 bg-gradient-to-br from-white to-alt-bg">
                <CardContent className="pt-6">
                  <p className="text-sm leading-relaxed text-foreground/80">{provider.verdict}</p>
                  <div className="mt-6">
                    <CTAButton
                      href={`${provider.url}?ref=olc&utm_source=onlinelegalcourses&utm_medium=affiliate`}
                      variant="primary"
                      size="lg"
                    >
                      Get Started with {provider.name}
                    </CTAButton>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <AffiliateCard
              name={provider.name}
              description={provider.description}
              rating={provider.rating}
              features={provider.features.slice(0, 4)}
              ctaText={`Visit ${provider.name}`}
              ctaUrl={provider.url}
              priceRange={provider.priceRange}
            />

            <Separator />

            <div>
              <h3 className="font-heading text-lg font-bold text-navy">
                Compare with Other Providers
              </h3>
              <div className="mt-4 space-y-3">
                {otherProviders.map((other) => (
                  <Link
                    key={other.slug}
                    href={`/bar-prep/${other.slug}`}
                    className="flex items-center justify-between rounded-lg border border-border p-3 text-sm transition-colors hover:bg-alt-bg"
                  >
                    <span className="font-medium text-navy">{other.name}</span>
                    <span className="text-muted-foreground">{other.priceRange}</span>
                  </Link>
                ))}
                <Link href="/bar-prep" className="flex items-center gap-1 text-sm font-semibold text-gold">
                  View All Providers →
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-heading text-lg font-bold text-navy">
                Head-to-Head Comparisons
              </h3>
              <div className="mt-4 space-y-2">
                <Link href="/compare/barbri-vs-themis" className="block rounded-lg border border-border p-3 text-sm font-medium text-navy hover:bg-alt-bg transition-colors">
                  BARBRI vs Themis →
                </Link>
                <Link href="/compare/barbri-vs-kaplan" className="block rounded-lg border border-border p-3 text-sm font-medium text-navy hover:bg-alt-bg transition-colors">
                  BARBRI vs Kaplan →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}

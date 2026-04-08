import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { Trophy } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AffiliateCard } from "@/components/ui/AffiliateCard"
import { CTAButton } from "@/components/ui/CTAButton"
import {
  comparisons,
  getComparisonBySlug,
  getAllComparisonSlugs,
} from "@/data/comparisons"
import {
  generatePageMetadata,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/seo"

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllComparisonSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const comparison = getComparisonBySlug(slug)
  if (!comparison) return {}

  return generatePageMetadata(
    comparison.metaTitle,
    comparison.metaDescription,
    `/compare/${comparison.slug}`,
    {
      keywords: [
        comparison.providerA.name,
        comparison.providerB.name,
        `${comparison.providerA.name} vs ${comparison.providerB.name}`,
        "comparison 2026",
      ],
    }
  )
}

export default async function ComparisonPage({ params }: PageProps) {
  const { slug } = await params
  const comparison = getComparisonBySlug(slug)

  if (!comparison) notFound()

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Compare Providers", url: "/compare" },
    { name: comparison.title, url: `/compare/${comparison.slug}` },
  ])

  const faqSchema = generateFAQSchema(comparison.faqs)

  const otherComparisons = comparisons.filter((c) => c.slug !== slug).slice(0, 3)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="bg-navy py-10 lg:py-14">
        <div className="mx-auto max-w-[1200px] px-4">
          <nav className="mb-4 text-sm text-white/60">
            <Link href="/" className="hover:text-white/80">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/compare" className="hover:text-white/80">Compare</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{comparison.title}</span>
          </nav>
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            {comparison.metaTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">{comparison.introduction}</p>
        </div>
      </section>

      {/* FTC Disclosure */}
      <div className="bg-alt-bg border-b border-border py-2">
        <p className="mx-auto max-w-[1200px] px-4 text-xs text-muted-foreground">
          This page contains affiliate links. We may earn a commission if you purchase through our links, at no extra cost to you.
        </p>
      </div>

      <div className="mx-auto max-w-[1200px] px-4 py-10">
        {/* Quick Summary */}
        <div className="grid gap-6 sm:grid-cols-2 mb-10">
          <Card className="border-navy/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-navy">{comparison.providerA.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-bold text-navy">{comparison.providerA.priceRange}</p>
              <div className="mt-2 flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={`text-lg ${i < comparison.providerA.rating ? "text-gold" : "text-muted"}`}>★</span>
                ))}
              </div>
              <CTAButton
                href={`${comparison.providerA.url}?ref=olc&utm_source=onlinelegalcourses&utm_medium=affiliate`}
                variant="primary"
                size="sm"
                className="mt-4"
              >
                Visit {comparison.providerA.name}
              </CTAButton>
            </CardContent>
          </Card>
          <Card className="border-gold/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-navy">{comparison.providerB.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-bold text-navy">{comparison.providerB.priceRange}</p>
              <div className="mt-2 flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={`text-lg ${i < comparison.providerB.rating ? "text-gold" : "text-muted"}`}>★</span>
                ))}
              </div>
              {comparison.providerB.url !== "#" && (
                <CTAButton
                  href={`${comparison.providerB.url}?ref=olc&utm_source=onlinelegalcourses&utm_medium=affiliate`}
                  variant="secondary"
                  size="sm"
                  className="mt-4"
                >
                  Visit {comparison.providerB.name}
                </CTAButton>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Comparison Table */}
        <h2 className="font-heading text-2xl font-bold text-navy">Side-by-Side Comparison</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-navy/20">
                <th className="px-4 py-3 text-left font-heading font-semibold text-navy">Category</th>
                <th className="px-4 py-3 text-left font-heading font-semibold text-navy">{comparison.providerA.name}</th>
                <th className="px-4 py-3 text-left font-heading font-semibold text-navy">{comparison.providerB.name}</th>
                <th className="px-4 py-3 text-center font-heading font-semibold text-navy">Winner</th>
              </tr>
            </thead>
            <tbody>
              {comparison.categories.map((cat) => (
                <tr key={cat.name} className="border-b border-border hover:bg-alt-bg transition-colors">
                  <td className="px-4 py-3 font-medium">{cat.name}</td>
                  <td className={`px-4 py-3 ${cat.winner === "A" ? "font-semibold text-navy" : ""}`}>{cat.providerA}</td>
                  <td className={`px-4 py-3 ${cat.winner === "B" ? "font-semibold text-navy" : ""}`}>{cat.providerB}</td>
                  <td className="px-4 py-3 text-center">
                    {cat.winner === "A" && (
                      <Badge className="bg-navy text-white">{comparison.providerA.name}</Badge>
                    )}
                    {cat.winner === "B" && (
                      <Badge className="bg-gold text-white">{comparison.providerB.name}</Badge>
                    )}
                    {cat.winner === "tie" && (
                      <Badge variant="outline">Tie</Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Separator className="my-10" />

        {/* Verdict */}
        <section>
          <h2 className="font-heading text-2xl font-bold text-navy flex items-center gap-2">
            <Trophy className="size-6 text-gold" />
            Our Verdict
          </h2>
          <Card className="mt-6 border-gold/30 bg-gradient-to-br from-white to-alt-bg">
            <CardContent className="pt-6 space-y-4">
              <p className="text-sm leading-relaxed text-foreground/80">{comparison.verdict}</p>
              <p className="text-sm leading-relaxed font-medium text-navy">{comparison.recommendation}</p>
            </CardContent>
          </Card>
        </section>

        {/* Provider CTAs */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <AffiliateCard
            name={comparison.providerA.name}
            description={`Top-rated provider with ${comparison.providerA.priceRange} pricing.`}
            rating={comparison.providerA.rating}
            features={["Comprehensive course materials", "Expert instruction", "Pass guarantee available"]}
            ctaText={`Visit ${comparison.providerA.name}`}
            ctaUrl={comparison.providerA.url}
            priceRange={comparison.providerA.priceRange}
          />
          {comparison.providerB.url !== "#" && (
            <AffiliateCard
              name={comparison.providerB.name}
              description={`Quality provider with ${comparison.providerB.priceRange} pricing.`}
              rating={comparison.providerB.rating}
              features={["Quality course content", "Flexible learning options", "Competitive pricing"]}
              ctaText={`Visit ${comparison.providerB.name}`}
              ctaUrl={comparison.providerB.url}
              priceRange={comparison.providerB.priceRange}
            />
          )}
        </div>

        <Separator className="my-10" />

        {/* FAQ */}
        {comparison.faqs.length > 0 && (
          <section>
            <h2 className="font-heading text-2xl font-bold text-navy">
              Frequently Asked Questions
            </h2>
            <div className="mt-6 space-y-4">
              {comparison.faqs.map((faq) => (
                <div key={faq.question} className="rounded-lg border border-border p-6">
                  <h3 className="font-heading text-base font-semibold text-navy">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Other Comparisons */}
        <section className="mt-10">
          <h2 className="font-heading text-xl font-bold text-navy">More Comparisons</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {otherComparisons.map((comp) => (
              <Link
                key={comp.slug}
                href={`/compare/${comp.slug}`}
                className="rounded-lg border border-border p-4 text-sm transition-colors hover:bg-alt-bg"
              >
                <span className="font-semibold text-navy">{comp.title}</span>
                <p className="mt-1 text-muted-foreground line-clamp-2">{comp.metaDescription}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

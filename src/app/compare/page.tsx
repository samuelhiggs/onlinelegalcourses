import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { comparisons } from "@/data/comparisons"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/seo"

export const metadata = generatePageMetadata(
  "Compare Legal Education Providers 2026 | Side-by-Side Reviews",
  "Head-to-head comparisons of top bar prep and CLE providers. BARBRI vs Themis, Lawline vs NBI, and more — find the best fit for your needs.",
  "/compare",
  {
    keywords: [
      "bar prep comparison",
      "CLE provider comparison",
      "BARBRI vs Themis",
      "best bar prep",
      "compare legal education",
    ],
  }
)

export default function ComparePage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Compare Providers", url: "/compare" },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="bg-navy py-12 lg:py-16">
        <div className="mx-auto max-w-[1200px] px-4 text-center">
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Compare Legal Education Providers
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Head-to-head comparisons to help you choose the right course
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {comparisons.map((comp) => (
              <Link key={comp.slug} href={`/compare/${comp.slug}`}>
                <Card className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-navy text-white">{comp.providerA.name}</Badge>
                      <span className="text-sm font-bold text-muted-foreground">VS</span>
                      <Badge variant="outline" className="border-navy text-navy">{comp.providerB.name}</Badge>
                    </div>
                    <CardTitle className="mt-3 text-lg text-navy">{comp.metaTitle}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/70 line-clamp-2">{comp.introduction}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold">
                      Read Comparison
                      <ArrowRight className="size-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

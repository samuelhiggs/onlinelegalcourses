import Link from "next/link"
import { AffiliateCard } from "@/components/ui/AffiliateCard"
import { CTAButton } from "@/components/ui/CTAButton"
import { Badge } from "@/components/ui/badge"
import { barPrepProviders } from "@/data/bar-prep-providers"
import {
  generatePageMetadata,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/seo"

export const metadata = generatePageMetadata(
  "Best Bar Prep Courses 2026 | Compare BARBRI, Themis & More",
  "Compare top bar prep courses for 2026. Side-by-side analysis of BARBRI, Themis, Kaplan, UWorld, Quimbee, and AdaptiBar — pricing, features, and pass rates.",
  "/bar-prep",
  {
    keywords: [
      "bar prep courses",
      "best bar prep 2026",
      "BARBRI review",
      "Themis review",
      "bar exam preparation",
    ],
  }
)

const BAR_PREP_FAQS = [
  {
    question: "When should I start studying for the bar exam?",
    answer: "Most experts recommend starting bar prep 8-10 weeks before the exam. Full-time study of 8-10 hours per day is typical, though part-time schedules over a longer period are also available.",
  },
  {
    question: "What is the UBE (Uniform Bar Examination)?",
    answer: "The Uniform Bar Examination is a standardized bar exam adopted by the majority of US jurisdictions. It consists of three components: the MBE (Multistate Bar Examination), MEE (Multistate Essay Examination), and MPT (Multistate Performance Test). UBE scores are portable across participating jurisdictions.",
  },
  {
    question: "How much does bar prep cost?",
    answer: "Bar prep courses range from $395 for supplemental MBE tools like AdaptiBar to $4,499 for comprehensive programs like BARBRI's Ultimate package. Most full-service courses cost between $1,295 and $3,999.",
  },
  {
    question: "Is a bar prep course worth it?",
    answer: "Yes, for most students. Bar prep courses provide structured study plans, practice questions, and expert instruction. National bar pass rates are significantly higher among students who use bar prep courses compared to self-study.",
  },
  {
    question: "Can I use more than one bar prep course?",
    answer: "Absolutely. Many students pair a full-service course (BARBRI or Themis) with a specialized MBE tool (UWorld or AdaptiBar) for maximum preparation.",
  },
]

export default function BarPrepPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Bar Prep", url: "/bar-prep" },
  ])
  const faqSchema = generateFAQSchema(BAR_PREP_FAQS)

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
      <section className="bg-navy py-12 lg:py-16">
        <div className="mx-auto max-w-[1200px] px-4 text-center">
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Best Bar Prep Courses 2026
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Compare top bar prep providers side by side. Find the right course
            for your learning style, budget, and timeline.
          </p>
        </div>
      </section>

      {/* Bar Exam Overview */}
      <section className="py-12">
        <div className="mx-auto max-w-[1200px] px-4">
          <h2 className="font-heading text-2xl font-bold text-navy">
            Understanding the Bar Exam
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "MBE", desc: "200 multiple-choice questions testing 7 subjects over 6 hours" },
              { title: "MEE", desc: "6 essay questions testing analytical and writing skills in 3 hours" },
              { title: "MPT", desc: "2 performance tests simulating real legal tasks in 3 hours" },
              { title: "UBE", desc: "Combined exam adopted by 41+ jurisdictions with portable scores" },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-white p-6">
                <h3 className="font-heading text-lg font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm text-foreground/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-alt-bg py-12">
        <div className="mx-auto max-w-[1200px] px-4">
          <h2 className="font-heading text-2xl font-bold text-navy">
            Provider Comparison Table
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-navy/20 text-left">
                  <th className="px-4 py-3 font-heading font-semibold text-navy">Provider</th>
                  <th className="px-4 py-3 font-heading font-semibold text-navy">Price Range</th>
                  <th className="px-4 py-3 font-heading font-semibold text-navy">Format</th>
                  <th className="px-4 py-3 font-heading font-semibold text-navy">Pass Guarantee</th>
                  <th className="px-4 py-3 font-heading font-semibold text-navy">Best For</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {barPrepProviders.map((provider) => (
                  <tr key={provider.slug} className="border-b border-border hover:bg-white transition-colors">
                    <td className="px-4 py-3 font-semibold text-navy">
                      {provider.name}
                    </td>
                    <td className="px-4 py-3">{provider.priceRange}</td>
                    <td className="px-4 py-3">{provider.format}</td>
                    <td className="px-4 py-3">
                      <Badge className={provider.passGuarantee ? "bg-success text-white" : "bg-muted"}>
                        {provider.passGuarantee ? "Yes" : "No"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-foreground/70">{provider.bestFor}</td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/bar-prep/${provider.slug}`}
                        className="text-gold font-semibold hover:underline whitespace-nowrap"
                      >
                        Review →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Provider Cards */}
      <section className="py-12">
        <div className="mx-auto max-w-[1200px] px-4">
          <h2 className="font-heading text-2xl font-bold text-navy">
            Detailed Provider Reviews
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {barPrepProviders.map((provider) => (
              <AffiliateCard
                key={provider.slug}
                name={provider.name}
                description={provider.description}
                rating={provider.rating}
                features={provider.features.slice(0, 4)}
                ctaText={`Visit ${provider.name}`}
                ctaUrl={provider.url}
                priceRange={provider.priceRange}
                badge={provider.slug === "barbri" ? "Most Popular" : provider.slug === "themis" ? "Best Value" : undefined}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-alt-bg py-12">
        <div className="mx-auto max-w-[1200px] px-4">
          <h2 className="font-heading text-2xl font-bold text-navy">
            Frequently Asked Questions About Bar Prep
          </h2>
          <div className="mt-8 space-y-4">
            {BAR_PREP_FAQS.map((faq) => (
              <div key={faq.question} className="rounded-lg border border-border bg-white p-6">
                <h3 className="font-heading text-base font-semibold text-navy">{faq.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-12">
        <div className="mx-auto max-w-[1200px] px-4 text-center">
          <h2 className="font-heading text-2xl font-bold text-white">
            Need Help Choosing a Bar Prep Course?
          </h2>
          <p className="mt-3 text-white/70">
            Compare providers head-to-head to find the best fit for your needs.
          </p>
          <div className="mt-6">
            <CTAButton href="/compare/barbri-vs-themis" variant="primary" size="lg">
              Compare BARBRI vs Themis
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  )
}

import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { ExternalLink, Check, ArrowRight, BookOpen } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AffiliateCard } from "@/components/ui/AffiliateCard"
import { CTAButton } from "@/components/ui/CTAButton"
import {
  stateRequirements,
  getStateBySlug,
  getAllStateSlugs,
} from "@/data/cle-requirements"
import {
  generatePageMetadata,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/seo"

interface PageProps {
  params: Promise<{ state: string }>
}

export function generateStaticParams() {
  return getAllStateSlugs().map((slug) => ({ state: slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state: slug } = await params
  const state = getStateBySlug(slug)
  if (!state) return {}

  return generatePageMetadata(
    `${state.name} CLE Requirements 2026 | Hours, Deadlines & Approved Providers`,
    `Complete guide to ${state.name} CLE requirements: ${state.totalHours} hours every ${state.compliancePeriod}, ${state.ethicsHours} ethics hours required. Find approved providers and deadlines.`,
    `/cle-requirements/${state.slug}`,
    {
      keywords: [
        `${state.name} CLE requirements`,
        `${state.abbreviation} MCLE`,
        `${state.name} continuing legal education`,
        `${state.name} bar CLE`,
      ],
    }
  )
}

function getNeighboringStates(currentSlug: string): typeof stateRequirements {
  const idx = stateRequirements.findIndex((s) => s.slug === currentSlug)
  const neighbors: typeof stateRequirements = []
  if (idx > 0) neighbors.push(stateRequirements[idx - 1])
  if (idx < stateRequirements.length - 1) neighbors.push(stateRequirements[idx + 1])
  if (neighbors.length < 3 && idx > 1) neighbors.push(stateRequirements[idx - 2])
  return neighbors.slice(0, 3)
}

function generateStateFAQs(state: (typeof stateRequirements)[0]) {
  return [
    {
      question: `How many CLE hours are required in ${state.name}?`,
      answer: `${state.name} requires ${state.totalHours} hours of continuing legal education every ${state.compliancePeriod}, including ${state.ethicsHours} hours of ethics or professional responsibility.`,
    },
    {
      question: `Can I take CLE courses online in ${state.name}?`,
      answer: state.onlineAllowed
        ? `Yes, ${state.name} allows attorneys to complete CLE courses online. ${state.selfStudyLimit ? `Self-study is limited to ${state.selfStudyLimit}.` : "Check with the state bar for any specific limitations."}`
        : `${state.name} has restrictions on online CLE. Check with the state bar for current policies.`,
    },
    {
      question: `What is the CLE reporting deadline in ${state.name}?`,
      answer: `The reporting deadline for ${state.name} CLE is: ${state.reportingDeadline}.`,
    },
    {
      question: `Can I carry over excess CLE hours in ${state.name}?`,
      answer: state.carryoverAllowed
        ? `Yes, ${state.name} allows carryover of excess CLE hours. ${state.carryoverLimit ? `The limit is ${state.carryoverLimit}.` : "Check with the state bar for specific limits."}`
        : `No, ${state.name} does not allow carryover of excess CLE hours to the next compliance period.`,
    },
    {
      question: `Are there special CLE requirements for new admittees in ${state.name}?`,
      answer: state.newAdmitteeHours
        ? `Yes, newly admitted attorneys in ${state.name} must complete ${state.newAdmitteeHours} hours${state.newAdmitteeDeadline ? ` within ${state.newAdmitteeDeadline}` : ""}.`
        : `${state.name} does not have separate CLE requirements for newly admitted attorneys beyond the standard requirements.`,
    },
    {
      question: `What are the ethics CLE requirements in ${state.name}?`,
      answer: `${state.name} requires ${state.ethicsHours} hours of ethics or professional responsibility CLE every ${state.compliancePeriod}.`,
    },
  ]
}

const PROVIDER_URLS: Record<string, string> = {
  Lawline: "https://www.lawline.com",
  "PLI": "https://www.pli.edu",
  "NBI": "https://www.nbi-sems.com",
  "BARBRI CLE": "https://www.barbri.com/cle",
  "CLE Center": "https://www.clecenter.com",
  "Practising Law Institute": "https://www.pli.edu",
  Quimbee: "https://www.quimbee.com",
  LexisNexis: "https://www.lexisnexis.com",
  Westlaw: "https://legal.thomsonreuters.com",
  "West LegalEdCenter": "https://westlegaledcenter.com",
}

export default async function StateCLEPage({ params }: PageProps) {
  const { state: slug } = await params
  const state = getStateBySlug(slug)

  if (!state) notFound()

  const faqs = generateStateFAQs(state)
  const neighborStates = getNeighboringStates(slug)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "CLE Requirements", url: "/cle-requirements" },
    { name: state.name, url: `/cle-requirements/${state.slug}` },
  ])

  const faqSchema = generateFAQSchema(faqs)

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

      {/* Header */}
      <section className="bg-navy py-10 lg:py-14">
        <div className="mx-auto max-w-[1200px] px-4">
          <nav className="mb-4 text-sm text-white/60">
            <Link href="/" className="hover:text-white/80">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/cle-requirements" className="hover:text-white/80">CLE Requirements</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{state.name}</span>
          </nav>
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            {state.name} Continuing Legal Education (CLE) Requirements
          </h1>
          <p className="mt-3 text-lg text-white/80">
            Everything you need to know about CLE compliance in {state.name} ({state.abbreviation})
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Quick Reference Card */}
            <Card className="border-gold/30 bg-gradient-to-br from-white to-alt-bg">
              <CardHeader>
                <CardTitle className="text-navy">Quick Reference</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Hours Required</p>
                    <p className="text-2xl font-bold text-navy">{state.totalHours}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ethics Hours</p>
                    <p className="text-2xl font-bold text-navy">{state.ethicsHours}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Compliance Period</p>
                    <p className="text-lg font-semibold">{state.compliancePeriod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Reporting Deadline</p>
                    <p className="text-sm font-medium">{state.reportingDeadline}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Online CLE</p>
                    <Badge className={state.onlineAllowed ? "bg-success text-white" : "bg-muted"}>
                      {state.onlineAllowed ? "Allowed" : "Restricted"}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Carryover</p>
                    <Badge className={state.carryoverAllowed ? "bg-success text-white" : "bg-muted"}>
                      {state.carryoverAllowed ? "Allowed" : "Not Allowed"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Special Requirements */}
            {state.specialRequirements.length > 0 && (
              <div className="mt-8">
                <h2 className="font-heading text-xl font-bold text-navy">
                  Special Requirements
                </h2>
                <ul className="mt-4 space-y-2">
                  {state.specialRequirements.map((req) => (
                    <li key={req} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-success" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* New Admittee */}
            {state.newAdmitteeHours && (
              <div className="mt-8">
                <h2 className="font-heading text-xl font-bold text-navy">
                  New Admittee Requirements
                </h2>
                <Card className="mt-4">
                  <CardContent className="pt-6">
                    <p className="text-sm">
                      Newly admitted attorneys in {state.name} must complete{" "}
                      <strong>{state.newAdmitteeHours} hours</strong> of CLE
                      {state.newAdmitteeDeadline && (
                        <> within <strong>{state.newAdmitteeDeadline}</strong></>
                      )}
                      .
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Carryover & Self-Study */}
            <div className="mt-8">
              <h2 className="font-heading text-xl font-bold text-navy">
                Carryover & Self-Study Rules
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-navy">Carryover</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {state.carryoverAllowed
                        ? state.carryoverLimit || "Carryover of excess hours is allowed."
                        : "Carryover of excess hours is not permitted."}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-navy">Self-Study</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {state.selfStudyLimit || "No specific self-study limitations noted."}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Editorial Content */}
            <div className="mt-8">
              <h2 className="font-heading text-xl font-bold text-navy">
                CLE in {state.name}: What You Need to Know
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-foreground/80">
                <p>
                  Attorneys licensed in {state.name} are required to complete {state.totalHours} hours
                  of continuing legal education every {state.compliancePeriod}. Of these,{" "}
                  {state.ethicsHours} hours must be devoted to ethics or professional responsibility
                  topics. This ensures that all practicing attorneys stay current with evolving legal
                  standards and ethical obligations.
                </p>
                <p>
                  {state.onlineAllowed
                    ? `${state.name} permits attorneys to fulfill their CLE requirements through online courses, making it convenient for busy practitioners to earn credits from anywhere. However, attorneys should verify that their chosen provider is approved by the ${state.name} bar.`
                    : `${state.name} has specific policies regarding online CLE completion. Attorneys should check with the state bar for the most current guidelines on distance learning and online course acceptance.`}
                </p>
                <p>
                  To maintain compliance, attorneys must report their completed CLE hours by the
                  designated deadline: {state.reportingDeadline}. Failure to comply can result in
                  penalties, including fines or suspension of your license. We recommend tracking your
                  credits throughout the compliance period rather than waiting until the deadline approaches.
                </p>
                {state.notes && (
                  <p className="rounded-lg bg-alt-bg p-4 text-sm italic">
                    <strong>Note:</strong> {state.notes}
                  </p>
                )}
              </div>
            </div>

            {/* Official Bar Link */}
            <div className="mt-8">
              <a
                href={state.officialBarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-navy/20 px-4 py-3 text-sm font-medium text-navy transition-colors hover:bg-navy hover:text-white"
              >
                <ExternalLink className="size-4" />
                Visit the Official {state.name} Bar CLE Page
              </a>
            </div>

            <Separator className="my-10" />

            {/* FAQ Section */}
            <div>
              <h2 className="font-heading text-xl font-bold text-navy">
                Frequently Asked Questions
              </h2>
              <div className="mt-6 space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.question} className="rounded-lg border border-border p-5">
                    <h3 className="font-heading text-base font-semibold text-navy">
                      {faq.question}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Approved Providers */}
            <div>
              <h2 className="font-heading text-lg font-bold text-navy">
                Approved CLE Providers
              </h2>
              <div className="mt-4 space-y-3">
                {state.accreditedProviders.slice(0, 3).map((provider) => {
                  const url = PROVIDER_URLS[provider]
                  return (
                    <AffiliateCard
                      key={provider}
                      name={provider}
                      description={`Accredited CLE provider for ${state.name} attorneys.`}
                      rating={4}
                      features={[
                        `${state.name}-accredited courses`,
                        "Online and on-demand options",
                      ]}
                      ctaText={`Visit ${provider}`}
                      ctaUrl={url || "#"}
                      priceRange="Varies"
                    />
                  )
                })}
              </div>
            </div>

            {/* Related States */}
            <div>
              <h2 className="font-heading text-lg font-bold text-navy">
                Related State CLE Requirements
              </h2>
              <div className="mt-4 space-y-2">
                {neighborStates.map((ns) => (
                  <Link
                    key={ns.slug}
                    href={`/cle-requirements/${ns.slug}`}
                    className="flex items-center justify-between rounded-lg border border-border p-3 text-sm transition-colors hover:bg-alt-bg"
                  >
                    <span className="font-medium text-navy">{ns.name}</span>
                    <span className="text-muted-foreground">
                      {ns.totalHours} hrs / {ns.compliancePeriod}
                    </span>
                  </Link>
                ))}
                <Link
                  href="/cle-requirements"
                  className="flex items-center gap-1 pt-2 text-sm font-semibold text-gold"
                >
                  View All States
                  <ArrowRight className="size-3" />
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h2 className="font-heading text-lg font-bold text-navy">
                Quick Links
              </h2>
              <div className="mt-4 space-y-2">
                <Link
                  href="/bar-prep"
                  className="flex items-center gap-2 rounded-lg border border-border p-3 text-sm font-medium text-navy transition-colors hover:bg-alt-bg"
                >
                  <BookOpen className="size-4 text-gold" />
                  Bar Prep Courses
                </Link>
                <Link
                  href="/compare"
                  className="flex items-center gap-2 rounded-lg border border-border p-3 text-sm font-medium text-navy transition-colors hover:bg-alt-bg"
                >
                  <BookOpen className="size-4 text-gold" />
                  Compare Providers
                </Link>
              </div>
            </div>

            {/* CTA */}
            <Card className="bg-navy text-white">
              <CardContent className="pt-6 text-center">
                <h3 className="font-heading text-lg font-bold">Need Legal Help?</h3>
                <p className="mt-2 text-sm text-white/70">
                  Connect with a qualified attorney in {state.name}
                </p>
                <CTAButton href="/find-attorney" variant="primary" size="md" className="mt-4 w-full">
                  Find an Attorney
                </CTAButton>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </>
  )
}

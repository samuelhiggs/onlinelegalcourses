"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, Filter, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { stateRequirements } from "@/data/cle-requirements"

export default function CLERequirementsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [onlineFilter, setOnlineFilter] = useState<"all" | "yes" | "no">("all")

  const filteredStates = useMemo(() => {
    return stateRequirements.filter((state) => {
      const matchesSearch = state.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      const matchesOnline =
        onlineFilter === "all" ||
        (onlineFilter === "yes" && state.onlineAllowed) ||
        (onlineFilter === "no" && !state.onlineAllowed)
      return matchesSearch && matchesOnline
    })
  }, [searchTerm, onlineFilter])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is CLE?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Continuing Legal Education (CLE) refers to the mandatory professional development courses attorneys must complete to maintain their license to practice law. Requirements vary by state.",
                },
              },
              {
                "@type": "Question",
                name: "How many CLE hours do I need?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "CLE hour requirements vary by state, typically ranging from 12 to 45 hours per compliance period. Most states require between 12-24 hours annually or equivalent over a multi-year cycle.",
                },
              },
              {
                "@type": "Question",
                name: "Can I complete CLE courses online?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Most states allow attorneys to complete some or all of their CLE requirements online. However, some states have limits on the number of online credits that can be counted.",
                },
              },
              {
                "@type": "Question",
                name: "What happens if I don't complete my CLE requirements?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Failure to complete CLE requirements can result in penalties including fines, suspension of your license to practice, or being placed on inactive status by your state bar.",
                },
              },
              {
                "@type": "Question",
                name: "Are ethics hours required for CLE?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Most states require a certain number of CLE hours to be in legal ethics or professional responsibility. The specific requirement varies from 1 to 6 hours per compliance period.",
                },
              },
            ],
          }),
        }}
      />

      <section className="bg-navy py-12 lg:py-16">
        <div className="mx-auto max-w-[1200px] px-4 text-center">
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            CLE Requirements by State 2026
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Complete guide to Continuing Legal Education requirements for all 50
            states, DC, and US territories
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-[1200px] px-4">
          {/* Filters */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by state name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="size-4 text-muted-foreground" />
              <span className="text-sm font-medium">Online CLE:</span>
              {(["all", "yes", "no"] as const).map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setOnlineFilter(val)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    onlineFilter === val
                      ? "bg-navy text-white"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  {val === "all" ? "All" : val === "yes" ? "Allowed" : "Not Allowed"}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStates.map((state) => (
              <Link key={state.slug} href={`/cle-requirements/${state.slug}`}>
                <Card className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base text-navy">
                        {state.name}
                      </CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {state.abbreviation}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Total Hours</span>
                      <span className="font-semibold text-navy">
                        {state.totalHours}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Period</span>
                      <span>{state.compliancePeriod}</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Online</span>
                      <Badge
                        variant={state.onlineAllowed ? "default" : "secondary"}
                        className={`text-xs ${state.onlineAllowed ? "bg-success text-white" : ""}`}
                      >
                        {state.onlineAllowed ? "Yes" : "No"}
                      </Badge>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-sm font-semibold text-gold">
                      View Details
                      <ArrowRight className="size-3" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {filteredStates.length === 0 && (
            <p className="py-12 text-center text-muted-foreground">
              No states match your search criteria.
            </p>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-alt-bg py-16">
        <div className="mx-auto max-w-[1200px] px-4">
          <h2 className="font-heading text-2xl font-bold text-navy">
            Frequently Asked Questions About CLE
          </h2>
          <div className="mt-8 space-y-6">
            {[
              {
                q: "What is CLE?",
                a: "Continuing Legal Education (CLE) refers to the mandatory professional development courses attorneys must complete to maintain their license to practice law. Requirements vary by state.",
              },
              {
                q: "How many CLE hours do I need?",
                a: "CLE hour requirements vary by state, typically ranging from 12 to 45 hours per compliance period. Most states require between 12-24 hours annually or equivalent over a multi-year cycle.",
              },
              {
                q: "Can I complete CLE courses online?",
                a: "Most states allow attorneys to complete some or all of their CLE requirements online. However, some states have limits on the number of online credits that can be counted.",
              },
              {
                q: "What happens if I don't complete my CLE requirements?",
                a: "Failure to complete CLE requirements can result in penalties including fines, suspension of your license to practice, or being placed on inactive status by your state bar.",
              },
              {
                q: "Are ethics hours required for CLE?",
                a: "Most states require a certain number of CLE hours to be in legal ethics or professional responsibility. The specific requirement varies from 1 to 6 hours per compliance period.",
              },
            ].map((faq) => (
              <div key={faq.q} className="rounded-lg border border-border bg-white p-6">
                <h3 className="font-heading text-lg font-semibold text-navy">
                  {faq.q}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

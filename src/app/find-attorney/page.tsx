import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/seo"
import { TrustBar } from "@/components/ui/TrustBar"
import { LeadForm } from "./LeadForm"
import { Shield, Clock, Phone, Lock } from "lucide-react"

export const metadata: Metadata = generatePageMetadata(
  "Find an Attorney | Free Consultation Request",
  "Connect with a qualified attorney in your area. Submit a free consultation request and get matched with lawyers who specialize in your legal matter.",
  "/find-attorney",
  {
    keywords: [
      "find attorney",
      "free legal consultation",
      "lawyer near me",
      "attorney matching",
    ],
  }
)

const TRUST_POINTS = [
  { icon: Lock, title: "Your Information is Secure", desc: "256-bit encryption protects your data" },
  { icon: Clock, title: "No Obligation", desc: "Free to submit, no commitment required" },
  { icon: Phone, title: "Free Consultation", desc: "Attorneys may offer a free initial consultation" },
  { icon: Shield, title: "Privacy Protected", desc: "We never sell your personal information" },
]

export default function FindAttorneyPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Find an Attorney", url: "/find-attorney" },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="bg-navy py-10 lg:py-14">
        <div className="mx-auto max-w-[1200px] px-4 text-center">
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Find a Qualified Attorney
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
            Tell us about your legal needs and we will connect you with attorneys
            who can help.
          </p>
        </div>
      </section>

      <TrustBar />

      <section className="py-12">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <LeadForm />
            </div>
            <aside className="space-y-6">
              {TRUST_POINTS.map((point) => (
                <div key={point.title} className="flex items-start gap-3 rounded-lg border border-border p-4">
                  <point.icon className="mt-0.5 size-5 shrink-0 text-gold" />
                  <div>
                    <h3 className="font-semibold text-navy text-sm">{point.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{point.desc}</p>
                  </div>
                </div>
              ))}
              <div className="rounded-lg bg-alt-bg p-4">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  <strong>Disclaimer:</strong> OnlineLegalCourses.com is an
                  advertising-supported educational resource. We are NOT a lawyer
                  referral service. Submitting this form does not create an
                  attorney-client relationship.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}

import { BookOpen, Users, Shield, Award } from "lucide-react"
import { CTAButton } from "@/components/ui/CTAButton"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/seo"

export const metadata = generatePageMetadata(
  "About OnlineLegalCourses.com | Our Mission & Editorial Standards",
  "Learn about OnlineLegalCourses.com — our mission to help legal professionals find the right education, our editorial standards, and how we operate.",
  "/about"
)

export default function AboutPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="bg-navy py-12 lg:py-16">
        <div className="mx-auto max-w-[800px] px-4 text-center">
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            About OnlineLegalCourses.com
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
            Helping legal professionals navigate education, compliance, and career development
          </p>
        </div>
      </section>

      <article className="py-12">
        <div className="mx-auto max-w-[800px] space-y-12 px-4">
          <section>
            <h2 className="font-heading text-2xl font-bold text-navy">Our Mission</h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/80">
              OnlineLegalCourses.com was founded with a simple mission: to make it easier for attorneys,
              law students, and legal professionals to find the right educational resources. With CLE
              requirements varying across 50+ jurisdictions and dozens of providers competing for
              attention, the landscape can be overwhelming. We cut through the noise with honest
              comparisons, accurate state-by-state CLE data, and actionable guidance.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-navy">What We Do</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {[
                {
                  icon: BookOpen,
                  title: "CLE Guidance",
                  desc: "Comprehensive, state-by-state CLE requirement guides covering all 53 US jurisdictions with accurate hours, deadlines, and approved providers.",
                },
                {
                  icon: Award,
                  title: "Provider Reviews",
                  desc: "Honest, editorial reviews of legal education providers including bar prep courses and CLE platforms, with side-by-side comparisons.",
                },
                {
                  icon: Users,
                  title: "Attorney Matching",
                  desc: "A contact form that helps potential clients express their legal needs and connect with attorneys in their area.",
                },
                {
                  icon: Shield,
                  title: "Educational Content",
                  desc: "In-depth blog articles covering legal education topics, career development, and industry trends.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-lg border border-border p-5">
                  <item.icon className="size-8 text-gold" />
                  <h3 className="mt-3 font-heading text-base font-bold text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm text-foreground/70">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-navy">Editorial Standards</h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/80">
              We take editorial integrity seriously. Our reviews and comparisons are based on thorough
              research using publicly available information, including official provider websites,
              published pricing, and verified features. We do not accept payment in exchange for
              favorable reviews.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-foreground/80">
              While we participate in affiliate marketing programs and may earn commissions from
              qualifying purchases, these relationships never influence our editorial assessments.
              We clearly disclose all affiliate relationships as required by the FTC.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-navy">How We Make Money</h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/80">
              OnlineLegalCourses.com is an advertising-supported platform. We earn revenue through:
            </p>
            <ul className="mt-3 ml-6 list-disc space-y-1 text-sm text-foreground/80">
              <li>Affiliate commissions when you purchase through our links (at no extra cost to you)</li>
              <li>Lead generation partnerships with legal service providers</li>
            </ul>
            <p className="mt-3 text-sm leading-relaxed text-foreground/80">
              This revenue model allows us to provide free, comprehensive educational content to all
              visitors without paywalls or subscriptions.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-navy">Important Disclaimer</h2>
            <div className="mt-4 rounded-lg bg-alt-bg p-5 text-sm leading-relaxed text-foreground/80">
              <p className="font-medium text-navy">
                OnlineLegalCourses.com is an advertising-supported educational resource. We are NOT
                a lawyer referral service. We do not endorse, recommend, or vouch for any attorney
                or legal service provider. Nothing on this site constitutes legal advice.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-navy">Contact Us</h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/80">
              We welcome your feedback, corrections, and suggestions. Reach us at:
            </p>
            <ul className="mt-3 ml-6 list-disc space-y-1 text-sm text-foreground/80">
              <li>General inquiries: info@onlinelegalcourses.com</li>
              <li>Editorial corrections: editorial@onlinelegalcourses.com</li>
              <li>Privacy concerns: privacy@onlinelegalcourses.com</li>
            </ul>
          </section>

          <div className="rounded-xl bg-navy p-8 text-center">
            <h2 className="font-heading text-xl font-bold text-white">
              Ready to Get Started?
            </h2>
            <p className="mt-2 text-sm text-white/70">
              Explore CLE requirements, compare providers, or find an attorney.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <CTAButton href="/cle-requirements" variant="primary" size="md">
                CLE Requirements
              </CTAButton>
              <CTAButton href="/compare" variant="outline" size="md" className="border-white text-white hover:bg-white hover:text-navy">
                Compare Providers
              </CTAButton>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

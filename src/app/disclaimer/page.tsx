import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/seo"

export const metadata = generatePageMetadata(
  "Legal Disclaimer",
  "Important legal disclaimer for OnlineLegalCourses.com. We are an advertising platform, not a lawyer referral service.",
  "/disclaimer"
)

export default function DisclaimerPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Disclaimer", url: "/disclaimer" },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="bg-navy py-10">
        <div className="mx-auto max-w-[800px] px-4">
          <h1 className="font-heading text-3xl font-bold text-white">Legal Disclaimer</h1>
        </div>
      </section>

      <article className="py-10">
        <div className="mx-auto max-w-[800px] space-y-8 px-4 text-sm leading-relaxed text-foreground/80">
          <div className="rounded-lg border-2 border-error/30 bg-error/5 p-6">
            <h2 className="font-heading text-xl font-bold text-navy">Important Notice</h2>
            <p className="mt-3 font-medium">
              OnlineLegalCourses.com is an advertising-supported educational resource. We are NOT
              a lawyer referral service. We do not endorse, recommend, or vouch for any attorney
              or legal service provider.
            </p>
          </div>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy">Not Legal Advice</h2>
            <p className="mt-3">
              The information provided on OnlineLegalCourses.com is for general informational and
              educational purposes only. It is not intended to be, and should not be construed as,
              legal advice. You should consult with a qualified attorney for advice regarding your
              specific legal situation.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy">Not a Lawyer Referral Service</h2>
            <p className="mt-3">
              OnlineLegalCourses.com is an advertising platform. When you submit a form on our website,
              you are expressing interest in learning more about legal services. This does not constitute
              a lawyer referral, and we do not guarantee that an attorney will contact you or agree to
              represent you.
            </p>
            <p className="mt-2">
              We do not verify the credentials, qualifications, or competence of any attorney or legal
              service provider that may be featured on or connected through our platform. Any attorney
              relationship you establish is between you and that attorney directly.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy">No Attorney-Client Relationship</h2>
            <p className="mt-3">
              Using this website or submitting a form does not create an attorney-client relationship
              between you and OnlineLegalCourses.com, its owners, or any attorney or firm that may
              contact you as a result of your submission. An attorney-client relationship is only
              formed through a direct agreement between you and a licensed attorney.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy">Advertising Disclosure</h2>
            <p className="mt-3">
              OnlineLegalCourses.com generates revenue through affiliate marketing partnerships with
              legal education providers and legal technology companies. When you click on certain links
              on our site and make a purchase, we may earn a commission at no additional cost to you.
            </p>
            <p className="mt-2">
              Our editorial content is independently produced. Affiliate relationships may influence
              which products and services are featured, but they do not affect our honest evaluations
              and recommendations.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy">Accuracy of CLE Information</h2>
            <p className="mt-3">
              While we strive to provide accurate and up-to-date information about CLE requirements
              across all jurisdictions, this information can change at any time. State bar associations
              may update their requirements, deadlines, and policies without notice to us.
            </p>
            <p className="mt-2">
              <strong>Always verify CLE requirements directly with your state bar association before
              relying on information from this or any other website.</strong>
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy">No Endorsement</h2>
            <p className="mt-3">
              The inclusion of any legal education provider, bar prep course, or attorney on our website
              does not constitute an endorsement, recommendation, or guarantee of quality. Reviews and
              ratings represent our editorial team&apos;s assessment based on publicly available information
              and should not be the sole basis for your purchasing decisions.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy">Contact</h2>
            <p className="mt-3">
              If you have questions about this disclaimer, please contact us at:
              legal@onlinelegalcourses.com
            </p>
          </section>
        </div>
      </article>
    </>
  )
}

import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/seo"

export const metadata = generatePageMetadata(
  "Terms of Service",
  "OnlineLegalCourses.com terms of service. Read our usage terms, disclaimers, and affiliate disclosure.",
  "/terms"
)

export default function TermsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Terms of Service", url: "/terms" },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="bg-navy py-10">
        <div className="mx-auto max-w-[800px] px-4">
          <h1 className="font-heading text-3xl font-bold text-white">Terms of Service</h1>
          <p className="mt-2 text-white/60">Last updated: January 1, 2026</p>
        </div>
      </section>

      <article className="py-10">
        <div className="mx-auto max-w-[800px] space-y-8 px-4 text-sm leading-relaxed text-foreground/80">
          <section>
            <h2 className="font-heading text-xl font-bold text-navy">Acceptance of Terms</h2>
            <p className="mt-3">
              By accessing and using OnlineLegalCourses.com, you agree to be bound by these Terms of
              Service. If you do not agree to these terms, please do not use our website.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy">Description of Service</h2>
            <p className="mt-3">
              OnlineLegalCourses.com is an advertising-supported educational resource that provides
              information about continuing legal education courses, bar exam preparation programs, and
              legal resources. We provide comparison content, reviews, and a contact form for users
              seeking legal assistance.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy">Disclaimer of Legal Advice</h2>
            <p className="mt-3">
              <strong>OnlineLegalCourses.com does NOT provide legal advice.</strong> The content on this
              website is for informational and educational purposes only. Nothing on this site should be
              construed as legal advice or as creating an attorney-client relationship.
            </p>
            <p className="mt-2">
              We are NOT a lawyer referral service. We do not endorse, recommend, or vouch for any
              attorney or legal service provider. Any information you submit through our contact form
              does not create an attorney-client relationship.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy">Affiliate Disclosure</h2>
            <p className="mt-3">
              OnlineLegalCourses.com participates in affiliate marketing programs. This means we may
              earn commissions when you click on links to third-party products and services and
              subsequently make a purchase. These affiliate relationships do not affect our editorial
              independence or the price you pay.
            </p>
            <p className="mt-2">
              We clearly disclose affiliate relationships on pages containing affiliate links with the
              following notice: &quot;This page contains affiliate links. We may earn a commission if you
              purchase through our links, at no extra cost to you.&quot;
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy">Accuracy of Information</h2>
            <p className="mt-3">
              We make reasonable efforts to ensure the accuracy of information on our website, including
              CLE requirements, provider details, and pricing. However, this information can change
              without notice. Always verify CLE requirements with your state bar and pricing with
              individual providers before making decisions.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy">Limitation of Liability</h2>
            <p className="mt-3">
              To the fullest extent permitted by law, OnlineLegalCourses.com and its owners, operators,
              and contributors shall not be liable for any direct, indirect, incidental, special, or
              consequential damages arising from your use of or inability to use this website, including
              but not limited to damages for loss of profits, data, or other intangible losses.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy">User Submissions</h2>
            <p className="mt-3">
              When you submit information through our contact form, you represent that the information
              you provide is accurate and complete. You consent to the collection and use of this
              information as described in our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy">Intellectual Property</h2>
            <p className="mt-3">
              All content on OnlineLegalCourses.com, including text, graphics, logos, and software, is
              the property of OnlineLegalCourses.com or its content providers and is protected by
              copyright and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy">Third-Party Links</h2>
            <p className="mt-3">
              Our website contains links to third-party websites. We are not responsible for the content,
              privacy practices, or availability of these external sites. Clicking on a third-party link
              will take you away from OnlineLegalCourses.com.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy">Changes to Terms</h2>
            <p className="mt-3">
              We reserve the right to modify these Terms of Service at any time. Changes will be effective
              immediately upon posting to this page. Your continued use of the website after changes
              constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy">Governing Law</h2>
            <p className="mt-3">
              These Terms of Service are governed by and construed in accordance with the laws of the
              State of Delaware, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy">Contact</h2>
            <p className="mt-3">
              For questions about these Terms of Service, contact us at: legal@onlinelegalcourses.com
            </p>
          </section>
        </div>
      </article>
    </>
  )
}

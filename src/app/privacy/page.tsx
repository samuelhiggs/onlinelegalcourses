import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/seo"

export const metadata = generatePageMetadata(
  "Privacy Policy",
  "OnlineLegalCourses.com privacy policy. Learn how we collect, use, and protect your personal information.",
  "/privacy"
)

export default function PrivacyPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Privacy Policy", url: "/privacy" },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="bg-navy py-10">
        <div className="mx-auto max-w-[800px] px-4">
          <h1 className="font-heading text-3xl font-bold text-white">Privacy Policy</h1>
          <p className="mt-2 text-white/60">Last updated: January 1, 2026</p>
        </div>
      </section>

      <article className="py-10">
        <div className="mx-auto max-w-[800px] space-y-8 px-4 text-sm leading-relaxed text-foreground/80">
          <section>
            <h2 className="font-heading text-xl font-bold text-navy">Introduction</h2>
            <p className="mt-3">
              OnlineLegalCourses.com (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to
              protecting your personal information. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you visit our website onlinelegalcourses.com.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy">Information We Collect</h2>
            <h3 className="mt-4 font-semibold text-navy">Personal Information</h3>
            <p className="mt-2">
              We may collect personal information that you voluntarily provide when using our services, including:
            </p>
            <ul className="mt-2 ml-6 list-disc space-y-1">
              <li>Name, email address, and phone number (when you submit our contact form)</li>
              <li>State and practice area of interest</li>
              <li>Description of your legal needs</li>
              <li>IP address and browser information</li>
            </ul>

            <h3 className="mt-4 font-semibold text-navy">Automatically Collected Information</h3>
            <p className="mt-2">
              When you visit our site, we automatically collect certain information, including:
            </p>
            <ul className="mt-2 ml-6 list-disc space-y-1">
              <li>Device type, browser type, and operating system</li>
              <li>Pages visited and time spent on each page</li>
              <li>Referring website or search terms</li>
              <li>IP address and general location data</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy">How We Use Your Information</h2>
            <ul className="mt-3 ml-6 list-disc space-y-1">
              <li>To respond to your inquiries and provide requested services</li>
              <li>To connect you with relevant legal education providers or attorneys</li>
              <li>To send transactional emails related to your inquiry</li>
              <li>To improve our website and user experience</li>
              <li>To analyze website traffic and usage patterns</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy">Cookies and Tracking Technologies</h2>
            <p className="mt-3">
              We use cookies and similar tracking technologies to enhance your experience on our site:
            </p>
            <ul className="mt-2 ml-6 list-disc space-y-1">
              <li><strong>Google Analytics (GA4):</strong> Tracks page views, user behavior, and site performance</li>
              <li><strong>Microsoft Clarity:</strong> Records user sessions for UX improvement</li>
              <li><strong>Essential cookies:</strong> Remember your preferences (e.g., disclaimer dismissal)</li>
              <li><strong>Affiliate tracking:</strong> Track referrals to our partner sites</li>
            </ul>
            <p className="mt-2">
              You can control cookies through your browser settings. Disabling cookies may affect site functionality.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy">Third-Party Services</h2>
            <p className="mt-3">We share information with the following categories of third parties:</p>
            <ul className="mt-2 ml-6 list-disc space-y-1">
              <li><strong>Analytics providers:</strong> Google Analytics, Microsoft Clarity</li>
              <li><strong>Email services:</strong> Resend (for transactional emails)</li>
              <li><strong>Database hosting:</strong> Supabase (for storing form submissions)</li>
              <li><strong>Affiliate partners:</strong> When you click affiliate links, the destination site may track the referral</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy">Your California Privacy Rights (CCPA)</h2>
            <p className="mt-3">
              If you are a California resident, you have the right to:
            </p>
            <ul className="mt-2 ml-6 list-disc space-y-1">
              <li>Know what personal information we collect about you</li>
              <li>Request deletion of your personal information</li>
              <li>Opt out of the sale of your personal information (we do not sell personal information)</li>
              <li>Non-discrimination for exercising your privacy rights</li>
            </ul>
            <p className="mt-2">
              To exercise these rights, contact us at privacy@onlinelegalcourses.com.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy">Data Security</h2>
            <p className="mt-3">
              We implement appropriate technical and organizational measures to protect your personal
              information, including encryption in transit (TLS/SSL), secure database hosting, and
              access controls. However, no method of electronic transmission or storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy">Data Retention</h2>
            <p className="mt-3">
              We retain personal information for as long as necessary to fulfill the purposes for which
              it was collected, or as required by law. Form submissions are retained for up to 24 months
              unless you request earlier deletion.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy">Children&apos;s Privacy</h2>
            <p className="mt-3">
              Our website is not intended for children under 18. We do not knowingly collect personal
              information from minors. If you believe we have collected information from a child,
              please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy">Changes to This Policy</h2>
            <p className="mt-3">
              We may update this Privacy Policy from time to time. We will notify you of any changes by
              posting the new policy on this page and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy">Contact Us</h2>
            <p className="mt-3">
              If you have questions about this Privacy Policy or wish to exercise your privacy rights,
              contact us at: privacy@onlinelegalcourses.com
            </p>
          </section>
        </div>
      </article>
    </>
  )
}

import Link from "next/link"
import { Scale } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "#" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
] as const

const RESOURCE_LINKS = [
  { label: "CLE Guide", href: "/cle-requirements" },
  { label: "Bar Prep", href: "/bar-prep" },
  { label: "Blog", href: "/blog" },
] as const

const LEGAL_LINKS = [
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
] as const

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "Facebook", href: "#" },
] as const

function FooterLinkColumn({
  title,
  links,
}: {
  title: string
  links: ReadonlyArray<{ label: string; href: string }>
}) {
  return (
    <div>
      <h3 className="font-heading text-sm font-semibold text-white">
        {title}
      </h3>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-white/60 transition-colors hover:text-white/90"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="mt-auto bg-navy" role="contentinfo">
      <div className="mx-auto max-w-[1200px] px-4 py-12">
        {/* Top: Logo + Columns */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-white">
              <Scale className="size-5 text-gold" aria-hidden="true" />
              <span className="font-heading text-base font-bold tracking-tight">
                OnlineLegalCourses
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Your trusted resource for legal education, CLE courses, bar prep,
              and attorney matching.
            </p>
          </div>

          {/* Link Columns */}
          <FooterLinkColumn title="Company" links={COMPANY_LINKS} />
          <FooterLinkColumn title="Resources" links={RESOURCE_LINKS} />
          <FooterLinkColumn title="Legal" links={LEGAL_LINKS} />
          <FooterLinkColumn title="Connect" links={SOCIAL_LINKS} />
        </div>

        <Separator className="my-8 bg-white/10" />

        {/* Disclaimer */}
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <p className="text-xs leading-relaxed text-white/50">
            <strong className="text-white/70">Legal Disclaimer:</strong>{" "}
            OnlineLegalCourses.com is an advertising-supported educational
            resource. We are NOT a lawyer referral service. We do not endorse,
            recommend, or vouch for any attorney or legal service provider.
          </p>
        </div>

        <Separator className="my-8 bg-white/10" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-white/40">
            &copy; 2026 OnlineLegalCourses.com. All rights reserved.
          </p>
          <Link
            href="/sitemap.xml"
            className="text-xs text-white/40 transition-colors hover:text-white/60"
          >
            Sitemap
          </Link>
        </div>
      </div>
    </footer>
  )
}

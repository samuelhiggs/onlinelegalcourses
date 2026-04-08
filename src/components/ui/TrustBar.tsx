import { Shield, Award, Users } from "lucide-react"

export function TrustBar() {
  return (
    <section className="bg-alt-bg border-y border-border py-4">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-8 px-4">
        <div className="flex items-center gap-2 text-navy">
          <Shield className="size-5" aria-hidden="true" />
          <span className="text-sm font-medium">Verified Providers</span>
        </div>
        <div className="flex items-center gap-2 text-navy">
          <Users className="size-5" aria-hidden="true" />
          <span className="text-sm font-medium">
            Trusted by 50,000+ Legal Professionals
          </span>
        </div>
        <div className="flex items-center gap-2 text-navy">
          <Award className="size-5" aria-hidden="true" />
          <span className="text-sm font-medium">Expert-Reviewed Content</span>
        </div>
      </div>
    </section>
  )
}

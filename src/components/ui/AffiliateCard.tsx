import { Star, Check } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CTAButton } from "@/components/ui/CTAButton"
import { cn } from "@/lib/utils"

interface AffiliateCardProps {
  name: string
  description: string
  rating: 1 | 2 | 3 | 4 | 5
  features: string[]
  ctaText: string
  ctaUrl: string
  badge?: string
  priceRange: string
}

function appendUtmParams(url: string): string {
  const separator = url.includes("?") ? "&" : "?"
  return `${url}${separator}ref=olc&utm_source=onlinelegalcourses&utm_medium=affiliate`
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "size-4",
            i < rating ? "fill-gold text-gold" : "fill-muted text-muted"
          )}
          aria-hidden="true"
        />
      ))}
      <span className="ml-1.5 text-sm font-medium text-text-muted">
        {rating}.0
      </span>
    </div>
  )
}

export function AffiliateCard({
  name,
  description,
  rating,
  features,
  ctaText,
  ctaUrl,
  badge,
  priceRange,
}: AffiliateCardProps) {
  const affiliateUrl = appendUtmParams(ctaUrl)

  return (
    <Card className="relative flex flex-col">
      {badge && (
        <Badge className="absolute top-3 right-3 bg-gold text-white hover:bg-gold/90">
          {badge}
        </Badge>
      )}
      <CardHeader>
        <CardTitle className="text-lg text-navy">{name}</CardTitle>
        <StarRating rating={rating} />
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <p className="text-sm text-foreground/80">{description}</p>
        <p className="text-sm font-semibold text-navy">{priceRange}</p>
        <ul className="space-y-2">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm">
              <Check
                className="mt-0.5 size-4 shrink-0 text-success"
                aria-hidden="true"
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <CTAButton href={affiliateUrl} variant="primary" size="md" className="w-full">
          {ctaText}
        </CTAButton>
        <p className="text-xs text-text-muted text-center leading-relaxed">
          This page contains affiliate links. We may earn a commission if you
          purchase through our links, at no extra cost to you.
        </p>
      </CardFooter>
    </Card>
  )
}

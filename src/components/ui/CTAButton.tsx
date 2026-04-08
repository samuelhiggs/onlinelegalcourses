import Link from "next/link"
import { cn } from "@/lib/utils"

type CTAVariant = "primary" | "secondary" | "outline"

interface CTAButtonBaseProps {
  variant?: CTAVariant
  size?: "sm" | "md" | "lg"
  className?: string
  children: React.ReactNode
}

interface CTAButtonLinkProps extends CTAButtonBaseProps {
  href: string
  onClick?: never
}

interface CTAButtonActionProps extends CTAButtonBaseProps {
  onClick: () => void
  href?: never
}

type CTAButtonProps = CTAButtonLinkProps | CTAButtonActionProps

const variantStyles: Record<CTAVariant, string> = {
  primary:
    "bg-gold text-white hover:bg-gold/90 hover:shadow-lg hover:scale-[1.02]",
  secondary:
    "bg-navy text-white hover:bg-navy/90 hover:shadow-lg hover:scale-[1.02]",
  outline:
    "border-2 border-navy text-navy bg-transparent hover:bg-navy hover:text-white hover:shadow-lg hover:scale-[1.02]",
}

const sizeStyles: Record<"sm" | "md" | "lg", string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
}

export function CTAButton({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CTAButtonProps) {
  const baseClasses = cn(
    "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2",
    variantStyles[variant],
    sizeStyles[size],
    className
  )

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={baseClasses}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type="button"
      onClick={(props as CTAButtonActionProps).onClick}
      className={baseClasses}
    >
      {children}
    </button>
  )
}

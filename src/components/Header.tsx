"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Scale, Menu } from "lucide-react"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { label: "CLE Requirements", href: "/cle-requirements" },
  { label: "Bar Prep", href: "/bar-prep" },
  { label: "Compare Providers", href: "/compare" },
  { label: "Blog", href: "/blog" },
] as const

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-white/10 bg-navy transition-all duration-200",
        isScrolled && "bg-navy/95 shadow-lg backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-white transition-opacity hover:opacity-90"
        >
          <Scale className="size-6 text-gold" aria-hidden="true" />
          <span className="font-heading text-lg font-bold tracking-tight">
            OnlineLegalCourses
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/find-attorney"
            className="ml-2 inline-flex items-center rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-gold/90 hover:shadow-lg hover:scale-[1.02]"
          >
            Find an Attorney
          </Link>
        </nav>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className="inline-flex items-center justify-center rounded-md p-2 text-white transition-colors hover:bg-white/10"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-white">
              <SheetHeader>
                <SheetTitle>
                  <Link
                    href="/"
                    className="flex items-center gap-2 text-navy"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Scale className="size-5 text-gold" aria-hidden="true" />
                    <span className="font-heading text-base font-bold">
                      OnlineLegalCourses
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <nav
                className="flex flex-col gap-1 px-4"
                aria-label="Mobile navigation"
              >
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/find-attorney"
                  onClick={() => setMobileOpen(false)}
                  className="mt-3 inline-flex items-center justify-center rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-gold/90"
                >
                  Find an Attorney
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

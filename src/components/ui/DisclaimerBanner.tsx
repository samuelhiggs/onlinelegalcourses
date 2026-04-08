"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

const STORAGE_KEY = "olc-disclaimer-dismissed"

export function DisclaimerBanner() {
  const [isDismissed, setIsDismissed] = useState(true)

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY)
    if (!dismissed) {
      setIsDismissed(false)
    }
  }, [])

  function handleDismiss() {
    localStorage.setItem(STORAGE_KEY, "true")
    setIsDismissed(true)
  }

  if (isDismissed) return null

  return (
    <div
      role="status"
      className="relative bg-navy px-4 py-2 text-center text-xs text-white/90 sm:text-sm"
    >
      <p className="mx-auto max-w-[1200px] pr-8">
        <strong>Notice:</strong> OnlineLegalCourses.com is an
        advertising-supported educational resource. We are{" "}
        <strong>NOT</strong> a lawyer referral service.
      </p>
      <button
        type="button"
        onClick={handleDismiss}
        className="absolute top-1/2 right-3 -translate-y-1/2 rounded-sm p-1 text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label="Dismiss disclaimer banner"
      >
        <X className="size-4" aria-hidden="true" />
      </button>
    </div>
  )
}

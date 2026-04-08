"use client"

import { useState, useSyncExternalStore } from "react"
import { X } from "lucide-react"

const STORAGE_KEY = "olc-disclaimer-dismissed"

function getSnapshot(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "true"
  } catch {
    return false
  }
}

function getServerSnapshot(): boolean {
  return true // hide on server to avoid hydration mismatch
}

function subscribe(callback: () => void): () => void {
  window.addEventListener("storage", callback)
  return () => window.removeEventListener("storage", callback)
}

export function DisclaimerBanner() {
  const wasDismissed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const [dismissed, setDismissed] = useState(false)

  function handleDismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, "true")
    } catch {
      // localStorage may be unavailable
    }
    setDismissed(true)
  }

  if (wasDismissed || dismissed) return null

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

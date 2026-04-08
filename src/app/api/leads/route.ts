import { NextRequest, NextResponse } from "next/server"

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 3600000 })
    return false
  }

  if (entry.count >= 5) return true

  entry.count++
  return false
}

function sanitize(input: string): string {
  return input.replace(/[<>]/g, "").trim().slice(0, 1000)
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validatePhone(phone: string): boolean {
  return /^[\d\s\-().+]{7,20}$/.test(phone)
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown"

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      )
    }

    const body = await request.json()

    const name = sanitize(body.name || "")
    const email = sanitize(body.email || "")
    const phone = sanitize(body.phone || "")
    const practiceArea = sanitize(body.practiceArea || "")
    const state = sanitize(body.state || "")
    const description = sanitize(body.description || "")
    const consent = body.consent === true

    if (!name || !email || !phone || !practiceArea || !state || !description) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      )
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      )
    }

    if (!validatePhone(phone)) {
      return NextResponse.json(
        { error: "Please provide a valid phone number." },
        { status: 400 }
      )
    }

    if (!consent) {
      return NextResponse.json(
        { error: "You must consent to be contacted." },
        { status: 400 }
      )
    }

    // Insert into Supabase if configured
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      const { getServerSupabase } = await import("@/lib/supabase")
      const supabase = getServerSupabase()

      const { error: dbError } = await supabase.from("leads").insert({
        name,
        email,
        phone,
        practice_area: practiceArea,
        state,
        description,
        consent,
        ip_address: ip,
        created_at: new Date().toISOString(),
      })

      if (dbError) {
        console.error("Supabase insert error:", dbError)
      }
    }

    // Send emails if Resend is configured
    if (process.env.RESEND_API_KEY) {
      const { sendLeadConfirmation, sendAdminNotification } = await import(
        "@/lib/resend"
      )

      await Promise.allSettled([
        sendLeadConfirmation(email, name),
        sendAdminNotification({
          name,
          email,
          phone,
          practiceArea,
          state,
          description,
        }),
      ])
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Lead submission error:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    )
  }
}

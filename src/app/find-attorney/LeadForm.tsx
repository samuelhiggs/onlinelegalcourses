"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CTAButton } from "@/components/ui/CTAButton"
import { CheckCircle } from "lucide-react"

const PRACTICE_AREAS = [
  "Family Law",
  "Criminal Defense",
  "Personal Injury",
  "Immigration",
  "Business Law",
  "Real Estate",
  "Estate Planning",
  "Employment Law",
  "Bankruptcy",
  "Tax Law",
  "Other",
]

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","District of Columbia","Florida","Georgia","Hawaii","Idaho","Illinois",
  "Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts",
  "Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada",
  "New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota",
  "Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina",
  "South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington",
  "West Virginia","Wisconsin","Wyoming",
]

interface FormData {
  name: string
  email: string
  practiceArea: string
  state: string
  phone: string
  description: string
  consent: boolean
}

interface FormErrors {
  name?: string
  email?: string
  practiceArea?: string
  state?: string
  phone?: string
  description?: string
  consent?: string
}

function validateStep(step: number, data: FormData): FormErrors {
  const errors: FormErrors = {}

  if (step === 1) {
    if (!data.name.trim()) errors.name = "Name is required"
    if (!data.email.trim()) {
      errors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "Please enter a valid email address"
    }
  }

  if (step === 2) {
    if (!data.practiceArea) errors.practiceArea = "Please select a practice area"
    if (!data.state) errors.state = "Please select your state"
  }

  if (step === 3) {
    if (!data.phone.trim()) {
      errors.phone = "Phone number is required"
    } else if (!/^[\d\s\-().+]{7,20}$/.test(data.phone)) {
      errors.phone = "Please enter a valid phone number"
    }
    if (!data.description.trim()) errors.description = "Please briefly describe your legal need"
    if (!data.consent) errors.consent = "You must agree to be contacted"
  }

  return errors
}

export function LeadForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    practiceArea: "",
    state: "",
    phone: "",
    description: "",
    consent: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  function handleChange(field: keyof FormData, value: string | boolean) {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  function handleNext() {
    const stepErrors = validateStep(step, formData)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      return
    }
    setErrors({})
    setStep((prev) => prev + 1)
  }

  function handleBack() {
    setErrors({})
    setStep((prev) => prev - 1)
  }

  async function handleSubmit() {
    const stepErrors = validateStep(3, formData)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      return
    }

    setIsSubmitting(true)
    setSubmitError("")

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to submit form")
      }

      setIsSuccess(true)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="rounded-xl border border-success/30 bg-success/5 p-8 text-center">
        <CheckCircle className="mx-auto size-12 text-success" />
        <h2 className="mt-4 font-heading text-2xl font-bold text-navy">
          Thank You!
        </h2>
        <p className="mt-2 text-foreground/80">
          A qualified attorney will contact you within 24 hours.
        </p>
        <div className="mt-6 space-y-2">
          <p className="text-sm text-muted-foreground">
            While you wait, check out these resources:
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            <CTAButton href="/cle-requirements" variant="outline" size="sm">
              CLE Requirements
            </CTAButton>
            <CTAButton href="/bar-prep" variant="outline" size="sm">
              Bar Prep Courses
            </CTAButton>
          </div>
        </div>
      </div>
    )
  }

  const progressPercent = Math.round((step / 3) * 100)

  return (
    <div className="rounded-xl border border-border bg-white p-6 shadow-sm sm:p-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-navy">Step {step} of 3</span>
          <span className="text-muted-foreground">{progressPercent}% complete</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gold transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div className="space-y-6">
          <h2 className="font-heading text-xl font-bold text-navy">
            Your Contact Information
          </h2>
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="John Doe"
              className="mt-1"
            />
            {errors.name && <p className="mt-1 text-sm text-error">{errors.name}</p>}
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="john@example.com"
              className="mt-1"
            />
            {errors.email && <p className="mt-1 text-sm text-error">{errors.email}</p>}
          </div>
          <CTAButton onClick={handleNext} variant="primary" size="lg" className="w-full">
            Continue
          </CTAButton>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="space-y-6">
          <h2 className="font-heading text-xl font-bold text-navy">
            Your Legal Needs
          </h2>
          <div>
            <Label htmlFor="practiceArea">Practice Area</Label>
            <select
              id="practiceArea"
              value={formData.practiceArea}
              onChange={(e) => handleChange("practiceArea", e.target.value)}
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Select a practice area...</option>
              {PRACTICE_AREAS.map((area) => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
            {errors.practiceArea && <p className="mt-1 text-sm text-error">{errors.practiceArea}</p>}
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <select
              id="state"
              value={formData.state}
              onChange={(e) => handleChange("state", e.target.value)}
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Select your state...</option>
              {US_STATES.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            {errors.state && <p className="mt-1 text-sm text-error">{errors.state}</p>}
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 rounded-lg border border-border px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
            >
              Back
            </button>
            <CTAButton onClick={handleNext} variant="primary" size="lg" className="flex-1">
              Continue
            </CTAButton>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="space-y-6">
          <h2 className="font-heading text-xl font-bold text-navy">
            Final Details
          </h2>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="(555) 123-4567"
              className="mt-1"
            />
            {errors.phone && <p className="mt-1 text-sm text-error">{errors.phone}</p>}
          </div>
          <div>
            <Label htmlFor="description">Briefly Describe Your Legal Need</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Tell us about your situation..."
              rows={4}
              className="mt-1"
            />
            {errors.description && <p className="mt-1 text-sm text-error">{errors.description}</p>}
          </div>
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="consent"
              checked={formData.consent}
              onChange={(e) => handleChange("consent", e.target.checked)}
              className="mt-1 size-4 rounded border-border"
            />
            <Label htmlFor="consent" className="text-xs leading-relaxed text-muted-foreground">
              By submitting this form, I consent to be contacted by phone, text,
              or email regarding my inquiry. I understand this is not a lawyer
              referral service and this consent is not a condition of service.
            </Label>
          </div>
          {errors.consent && <p className="text-sm text-error">{errors.consent}</p>}

          {submitError && (
            <div className="rounded-lg border border-error/30 bg-error/5 p-3 text-sm text-error">
              {submitError}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 rounded-lg border border-border px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
            >
              Back
            </button>
            <CTAButton
              onClick={handleSubmit}
              variant="primary"
              size="lg"
              className="flex-1"
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </CTAButton>
          </div>
        </div>
      )}
    </div>
  )
}

import { Resend } from "resend"

let resendClient: Resend | null = null

function getResend(): Resend {
  if (resendClient) return resendClient

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY environment variable.")
  }

  resendClient = new Resend(apiKey)
  return resendClient
}

const FROM_EMAIL = "OnlineLegalCourses <noreply@onlinelegalcourses.com>"
const ADMIN_EMAIL = "admin@onlinelegalcourses.com"

export async function sendLeadConfirmation(
  to: string,
  name: string
): Promise<void> {
  const resend = getResend()

  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: "We Received Your Inquiry — OnlineLegalCourses.com",
    html: `
      <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <h1 style="color: #1B3A5C; font-family: Merriweather, Georgia, serif; font-size: 24px; margin-bottom: 16px;">
          Thank You, ${name}
        </h1>
        <p style="color: #1a1a1a; font-size: 16px; line-height: 1.6;">
          We have received your inquiry and will be in touch shortly. A member of our team
          will review your request and connect you with relevant resources.
        </p>
        <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin-top: 24px;">
          <strong>Please note:</strong> OnlineLegalCourses.com is an advertising-supported
          educational resource. We are NOT a lawyer referral service. We do not endorse,
          recommend, or vouch for any attorney or legal service provider.
        </p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
        <p style="color: #6b7280; font-size: 12px;">
          &copy; 2026 OnlineLegalCourses.com. All rights reserved.
        </p>
      </div>
    `,
  })
}

interface LeadInfo {
  name: string
  email: string
  phone: string
  practiceArea: string
  state: string
  description: string
}

export async function sendAdminNotification(lead: LeadInfo): Promise<void> {
  const resend = getResend()

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New Lead: ${lead.practiceArea} — ${lead.state}`,
    html: `
      <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <h1 style="color: #1B3A5C; font-family: Merriweather, Georgia, serif; font-size: 24px; margin-bottom: 16px;">
          New Lead Submission
        </h1>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 8px 12px; font-weight: 600; color: #1B3A5C; border-bottom: 1px solid #e5e7eb;">Name</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;">${lead.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: 600; color: #1B3A5C; border-bottom: 1px solid #e5e7eb;">Email</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;">${lead.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: 600; color: #1B3A5C; border-bottom: 1px solid #e5e7eb;">Phone</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;">${lead.phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: 600; color: #1B3A5C; border-bottom: 1px solid #e5e7eb;">Practice Area</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;">${lead.practiceArea}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: 600; color: #1B3A5C; border-bottom: 1px solid #e5e7eb;">State</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;">${lead.state}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: 600; color: #1B3A5C; border-bottom: 1px solid #e5e7eb;">Description</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;">${lead.description}</td>
          </tr>
        </table>
      </div>
    `,
  })
}

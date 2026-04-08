import type { Metadata, Viewport } from "next"
import { Inter, Merriweather } from "next/font/google"
import { GoogleAnalytics } from "@next/third-parties/google"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { DisclaimerBanner } from "@/components/ui/DisclaimerBanner"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const merriweather = Merriweather({
  variable: "--font-merriweather",
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    template: "%s | OnlineLegalCourses.com",
    default:
      "OnlineLegalCourses.com | Legal Education & Attorney Resources",
  },
  description:
    "Discover accredited CLE courses, bar prep programs, and attorney resources. Compare top legal education providers and find the right path for your legal career.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://onlinelegalcourses.com"
  ),
  openGraph: {
    siteName: "OnlineLegalCourses.com",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1B3A5C",
}

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${merriweather.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <DisclaimerBanner />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  )
}

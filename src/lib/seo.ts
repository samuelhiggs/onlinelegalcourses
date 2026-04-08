import type { Metadata } from "next"

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://onlinelegalcourses.com"
const SITE_NAME = "OnlineLegalCourses.com"

interface AdditionalMeta {
  openGraph?: Partial<NonNullable<Metadata["openGraph"]>>
  twitter?: Partial<NonNullable<Metadata["twitter"]>>
  keywords?: string[]
  robots?: Metadata["robots"]
}

export function generatePageMetadata(
  title: string,
  description: string,
  path: string,
  additionalMeta?: AdditionalMeta
): Metadata {
  const url = `${SITE_URL}${path}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      ...additionalMeta?.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...additionalMeta?.twitter,
    },
    ...(additionalMeta?.keywords && { keywords: additionalMeta.keywords }),
    ...(additionalMeta?.robots && { robots: additionalMeta.robots }),
  }
}

interface BreadcrumbItem {
  name: string
  url: string
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  }
}

interface FAQItem {
  question: string
  answer: string
}

export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

interface CourseInput {
  name: string
  description: string
  provider: string
  url: string
  price?: string
  currency?: string
}

export function generateCourseSchema(course: CourseInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: course.description,
    provider: {
      "@type": "Organization",
      name: course.provider,
    },
    url: course.url,
    ...(course.price && {
      offers: {
        "@type": "Offer",
        price: course.price,
        priceCurrency: course.currency || "USD",
        availability: "https://schema.org/InStock",
      },
    }),
  }
}

interface ArticleInput {
  title: string
  description: string
  url: string
  datePublished: string
  dateModified?: string
  author?: string
}

export function generateArticleSchema(article: ArticleInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: article.url.startsWith("http")
      ? article.url
      : `${SITE_URL}${article.url}`,
    datePublished: article.datePublished,
    ...(article.dateModified && { dateModified: article.dateModified }),
    author: {
      "@type": "Organization",
      name: article.author || SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  }
}

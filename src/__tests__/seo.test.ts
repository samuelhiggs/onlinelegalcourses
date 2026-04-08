import { describe, it, expect } from "vitest"
import {
  generatePageMetadata,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateCourseSchema,
  generateArticleSchema,
} from "@/lib/seo"

describe("generatePageMetadata", () => {
  it("returns correct metadata structure", () => {
    const meta = generatePageMetadata("Test Title", "Test description", "/test")
    expect(meta.title).toBe("Test Title")
    expect(meta.description).toBe("Test description")
    expect(meta.alternates?.canonical).toContain("/test")
  })

  it("includes Open Graph data", () => {
    const meta = generatePageMetadata("OG Test", "OG description", "/og-test")
    const og = meta.openGraph as Record<string, unknown>
    expect(og.title).toBe("OG Test")
    expect(og.description).toBe("OG description")
    expect(og.siteName).toBe("OnlineLegalCourses.com")
  })

  it("includes Twitter card data", () => {
    const meta = generatePageMetadata("Twitter Test", "Description", "/twitter")
    const twitter = meta.twitter as Record<string, unknown>
    expect(twitter.card).toBe("summary_large_image")
    expect(twitter.title).toBe("Twitter Test")
  })
})

describe("generateBreadcrumbSchema", () => {
  it("returns valid BreadcrumbList schema", () => {
    const schema = generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "CLE", url: "/cle-requirements" },
    ])
    expect(schema["@context"]).toBe("https://schema.org")
    expect(schema["@type"]).toBe("BreadcrumbList")
    expect(schema.itemListElement).toHaveLength(2)
    expect(schema.itemListElement[0].position).toBe(1)
    expect(schema.itemListElement[1].position).toBe(2)
  })
})

describe("generateFAQSchema", () => {
  it("returns valid FAQPage schema", () => {
    const schema = generateFAQSchema([
      { question: "What is CLE?", answer: "Continuing Legal Education." },
    ])
    expect(schema["@context"]).toBe("https://schema.org")
    expect(schema["@type"]).toBe("FAQPage")
    expect(schema.mainEntity).toHaveLength(1)
    expect(schema.mainEntity[0]["@type"]).toBe("Question")
    expect(schema.mainEntity[0].acceptedAnswer["@type"]).toBe("Answer")
  })
})

describe("generateCourseSchema", () => {
  it("returns valid Course schema", () => {
    const schema = generateCourseSchema({
      name: "Bar Prep",
      description: "A course",
      provider: "BARBRI",
      url: "https://barbri.com",
    })
    expect(schema["@type"]).toBe("Course")
    expect(schema.name).toBe("Bar Prep")
    expect(schema.provider["@type"]).toBe("Organization")
  })

  it("includes price when provided", () => {
    const schema = generateCourseSchema({
      name: "Test",
      description: "Test",
      provider: "Provider",
      url: "https://example.com",
      price: "299",
      currency: "USD",
    })
    expect(schema.offers).toBeDefined()
    expect(schema.offers?.price).toBe("299")
  })
})

describe("generateArticleSchema", () => {
  it("returns valid Article schema", () => {
    const schema = generateArticleSchema({
      title: "Test Article",
      description: "A test",
      url: "/blog/test",
      datePublished: "2026-01-01",
    })
    expect(schema["@type"]).toBe("Article")
    expect(schema.headline).toBe("Test Article")
    expect(schema.datePublished).toBe("2026-01-01")
    expect(schema.publisher["@type"]).toBe("Organization")
  })
})

import { describe, it, expect } from "vitest"
import { slugify, formatDate, cn, generateId } from "@/lib/utils"

describe("slugify", () => {
  it("converts text to lowercase slug", () => {
    expect(slugify("Hello World")).toBe("hello-world")
  })

  it("removes special characters", () => {
    expect(slugify("What's New?")).toBe("whats-new")
  })

  it("handles multiple spaces", () => {
    expect(slugify("Too  Many   Spaces")).toBe("too-many-spaces")
  })

  it("trims whitespace", () => {
    expect(slugify("  trimmed  ")).toBe("trimmed")
  })

  it("handles empty string", () => {
    expect(slugify("")).toBe("")
  })
})

describe("formatDate", () => {
  it("formats Date object", () => {
    const result = formatDate(new Date("2026-03-15"))
    expect(result).toContain("March")
    expect(result).toContain("2026")
  })

  it("formats date string", () => {
    const result = formatDate("2026-01-01")
    expect(result).toContain("January")
    expect(result).toContain("2026")
  })
})

describe("cn", () => {
  it("merges class names", () => {
    const result = cn("text-red-500", "text-blue-500")
    expect(result).toBe("text-blue-500")
  })

  it("handles conditional classes", () => {
    const result = cn("base", false && "hidden", "visible")
    expect(result).toContain("base")
    expect(result).toContain("visible")
    expect(result).not.toContain("hidden")
  })
})

describe("generateId", () => {
  it("returns a non-empty string", () => {
    const id = generateId()
    expect(id).toBeTruthy()
    expect(typeof id).toBe("string")
  })

  it("generates unique IDs", () => {
    const ids = new Set(Array.from({ length: 100 }, () => generateId()))
    expect(ids.size).toBe(100)
  })
})

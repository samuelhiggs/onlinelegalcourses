import { describe, it, expect } from "vitest"
import {
  stateRequirements,
  getStateBySlug,
  getAllStateSlugs,
} from "@/data/cle-requirements"

describe("CLE Requirements Data", () => {
  it("has all 53 jurisdictions", () => {
    expect(stateRequirements).toHaveLength(53)
  })

  it("has unique slugs for all states", () => {
    const slugs = stateRequirements.map((s) => s.slug)
    const uniqueSlugs = new Set(slugs)
    expect(uniqueSlugs.size).toBe(53)
  })

  it("has unique abbreviations for all states", () => {
    const abbreviations = stateRequirements.map((s) => s.abbreviation)
    const unique = new Set(abbreviations)
    expect(unique.size).toBe(53)
  })

  it("has required fields for each state", () => {
    for (const state of stateRequirements) {
      expect(state.name).toBeTruthy()
      expect(state.abbreviation).toBeTruthy()
      expect(state.slug).toBeTruthy()
      expect(typeof state.totalHours).toBe("number")
      expect(state.totalHours).toBeGreaterThanOrEqual(0)
      expect(state.compliancePeriod).toBeTruthy()
      expect(typeof state.ethicsHours).toBe("number")
      expect(typeof state.onlineAllowed).toBe("boolean")
      expect(typeof state.carryoverAllowed).toBe("boolean")
      expect(state.officialBarUrl).toBeTruthy()
      expect(Array.isArray(state.specialRequirements)).toBe(true)
      expect(Array.isArray(state.accreditedProviders)).toBe(true)
    }
  })

  it("has valid URLs for official bar sites", () => {
    for (const state of stateRequirements) {
      expect(state.officialBarUrl).toMatch(/^https?:\/\//)
    }
  })

  it("includes major states", () => {
    const majorStates = ["california", "new-york", "texas", "florida", "illinois"]
    for (const slug of majorStates) {
      const state = getStateBySlug(slug)
      expect(state).toBeDefined()
      expect(state?.totalHours).toBeGreaterThan(0)
    }
  })

  it("getAllStateSlugs returns correct count", () => {
    const slugs = getAllStateSlugs()
    expect(slugs).toHaveLength(53)
    expect(slugs[0]).toBeTruthy()
  })

  it("getStateBySlug returns undefined for invalid slug", () => {
    expect(getStateBySlug("nonexistent")).toBeUndefined()
  })
})

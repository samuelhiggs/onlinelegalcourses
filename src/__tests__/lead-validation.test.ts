import { describe, it, expect } from "vitest"

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validatePhone(phone: string): boolean {
  return /^[\d\s\-().+]{7,20}$/.test(phone)
}

describe("Email Validation", () => {
  it("accepts valid emails", () => {
    expect(validateEmail("test@example.com")).toBe(true)
    expect(validateEmail("user.name@domain.co")).toBe(true)
    expect(validateEmail("user+tag@domain.org")).toBe(true)
  })

  it("rejects invalid emails", () => {
    expect(validateEmail("")).toBe(false)
    expect(validateEmail("notanemail")).toBe(false)
    expect(validateEmail("@domain.com")).toBe(false)
    expect(validateEmail("user@")).toBe(false)
    expect(validateEmail("user@.com")).toBe(false)
    expect(validateEmail("user @domain.com")).toBe(false)
  })
})

describe("Phone Validation", () => {
  it("accepts valid phone numbers", () => {
    expect(validatePhone("5551234567")).toBe(true)
    expect(validatePhone("(555) 123-4567")).toBe(true)
    expect(validatePhone("555-123-4567")).toBe(true)
    expect(validatePhone("+1 555 123 4567")).toBe(true)
  })

  it("rejects invalid phone numbers", () => {
    expect(validatePhone("")).toBe(false)
    expect(validatePhone("123")).toBe(false)
    expect(validatePhone("abc-def-ghij")).toBe(false)
  })
})

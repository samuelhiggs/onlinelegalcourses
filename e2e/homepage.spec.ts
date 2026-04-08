import { test, expect } from "@playwright/test"

test.describe("Homepage", () => {
  test("loads successfully", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveTitle(/OnlineLegalCourses/i)
  })

  test("displays hero section", async ({ page }) => {
    await page.goto("/")
    await expect(page.locator("h1")).toContainText("Legal Education")
  })

  test("has Find an Attorney CTA", async ({ page }) => {
    await page.goto("/")
    const cta = page.locator('a[href="/find-attorney"]').first()
    await expect(cta).toBeVisible()
  })

  test("has navigation links", async ({ page }) => {
    await page.goto("/")
    await expect(page.locator('a[href="/cle-requirements"]').first()).toBeVisible()
    await expect(page.locator('a[href="/bar-prep"]').first()).toBeVisible()
  })

  test("displays state CLE grid", async ({ page }) => {
    await page.goto("/")
    await expect(page.locator("text=CLE Requirements by State")).toBeVisible()
    await expect(page.locator('a[href="/cle-requirements/california"]')).toBeVisible()
  })
})

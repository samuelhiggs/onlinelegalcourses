import { test, expect } from "@playwright/test"

test.describe("CLE Pages", () => {
  test("hub page loads", async ({ page }) => {
    await page.goto("/cle-requirements")
    await expect(page.locator("h1")).toContainText("CLE Requirements")
  })

  test("California detail page renders", async ({ page }) => {
    await page.goto("/cle-requirements/california")
    await expect(page.locator("h1")).toContainText("California")
    await expect(page.locator("text=Quick Reference")).toBeVisible()
    await expect(page.locator("text=Frequently Asked Questions")).toBeVisible()
  })

  test("state page has breadcrumbs", async ({ page }) => {
    await page.goto("/cle-requirements/new-york")
    await expect(page.locator('a[href="/cle-requirements"]')).toBeVisible()
  })
})

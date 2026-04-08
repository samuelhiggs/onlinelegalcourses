import { test, expect } from "@playwright/test"

test.describe("Navigation", () => {
  test("header links resolve correctly", async ({ page }) => {
    await page.goto("/")

    await page.click('header a[href="/cle-requirements"]')
    await expect(page).toHaveURL(/cle-requirements/)

    await page.goto("/")
    await page.click('header a[href="/bar-prep"]')
    await expect(page).toHaveURL(/bar-prep/)
  })

  test("footer links work", async ({ page }) => {
    await page.goto("/")

    const privacyLink = page.locator('footer a[href="/privacy"]')
    await expect(privacyLink).toBeVisible()

    const termsLink = page.locator('footer a[href="/terms"]')
    await expect(termsLink).toBeVisible()
  })

  test("mobile menu opens on small viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto("/")

    const menuButton = page.locator('button[aria-label="Open menu"]')
    await expect(menuButton).toBeVisible()

    await menuButton.click()
    await expect(page.locator("text=CLE Requirements")).toBeVisible()
  })
})

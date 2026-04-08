import { test, expect } from "@playwright/test"

test.describe("Lead Form", () => {
  test("page loads with form", async ({ page }) => {
    await page.goto("/find-attorney")
    await expect(page.locator("h1")).toContainText("Find a Qualified Attorney")
    await expect(page.locator("text=Step 1 of 3")).toBeVisible()
  })

  test("shows validation errors on empty submit", async ({ page }) => {
    await page.goto("/find-attorney")
    await page.click("text=Continue")
    await expect(page.locator("text=Name is required")).toBeVisible()
  })

  test("progresses through steps", async ({ page }) => {
    await page.goto("/find-attorney")

    // Step 1
    await page.fill("#name", "John Doe")
    await page.fill("#email", "john@example.com")
    await page.click("text=Continue")

    // Step 2
    await expect(page.locator("text=Step 2 of 3")).toBeVisible()
    await page.selectOption("#practiceArea", "Family Law")
    await page.selectOption("#state", "California")
    await page.click("text=Continue")

    // Step 3
    await expect(page.locator("text=Step 3 of 3")).toBeVisible()
  })
})

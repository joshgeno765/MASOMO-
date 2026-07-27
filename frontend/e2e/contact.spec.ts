import { test, expect } from '@playwright/test'

test('contact page lists office emails and links to consultation booking', async ({ page }) => {
  await page.goto('/contact')

  await expect(page.locator('a[href^="mailto:"]').first()).toBeVisible()

  await page.getByRole('link', { name: /consultation/i }).last().click()
  await expect(page).toHaveURL(/\/consultation$/)
})

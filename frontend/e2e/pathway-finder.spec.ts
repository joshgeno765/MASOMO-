import { test, expect } from '@playwright/test'

// The pathway finder is the site's main lead-qualification funnel — this
// checks a user can actually get through the quiz, not just view page 1.

test('progresses through the quiz question by question', async ({ page }) => {
  await page.goto('/pathway-finder')

  await page.getByRole('button', { name: /start/i }).click()
  await expect(page.getByText('Question 1 of 6')).toBeVisible()

  // Answer the first question by picking its first option
  await page.locator('.grid.gap-3 button').first().click()
  await expect(page.getByText('Question 2 of 6')).toBeVisible()

  await page.locator('.grid.gap-3 button').first().click()
  await expect(page.getByText('Question 3 of 6')).toBeVisible()
})

test('?ref=fmc-pilot deep link skips the intro screen', async ({ page }) => {
  await page.goto('/pathway-finder?ref=fmc-pilot')
  await expect(page.getByText('Question 1 of 6')).toBeVisible()
})

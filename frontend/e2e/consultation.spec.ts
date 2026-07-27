import { test, expect } from '@playwright/test'

// Booking a consultation is the site's primary conversion goal — a lead who
// can't submit this form is a lead lost.

test('rejects submission without a selected destination', async ({ page }) => {
  await page.goto('/consultation')

  // name/email/phone are enforced by native HTML5 `required`, so the browser's
  // own validation UI blocks those before our JS ever runs. Fill them in here
  // to reach the custom toast validation for destination, which has no
  // `required` attribute and only rejects on submit.
  await page.locator('input[name="name"]').fill('Amina Test')
  await page.locator('input[name="email"]').fill('amina@example.com')
  await page.locator('input[name="phone"]').fill('+250793412612')

  await page.getByRole('button', { name: /book consultation/i }).click()
  await expect(page.getByText(/select a study destination/i)).toBeVisible()
})

test('books a consultation end to end with a mocked API', async ({ page }) => {
  await page.route('**/api/appointments', async (route) => {
    expect(route.request().method()).toBe('POST')
    const body = route.request().postDataJSON()
    expect(body.name).toBe('Amina Test')
    expect(body.email).toBe('amina@example.com')
    await route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({
        data: { id: 1, scheduledAt: body.scheduledAt, duration: 30 },
      }),
    })
  })

  await page.goto('/consultation')

  await page.locator('input[name="name"]').fill('Amina Test')
  await page.locator('input[name="email"]').fill('amina@example.com')
  await page.locator('input[name="phone"]').fill('+250793412612')
  await page.locator('select[name="country"]').selectOption('Rwanda')
  await page.locator('select[name="destinationInterest"]').selectOption({ index: 1 })

  // "This week" can be entirely disabled (e.g. when today is Sunday, every
  // remaining day in that Mon-Sun window is today-or-past), so switch to
  // "Next week" first — it's always fully future-dated and guarantees at
  // least six bookable day chips regardless of what day the test runs on.
  await page.getByRole('button', { name: /next week/i }).click()

  // Day chips render weekday + date as separate child divs with no
  // distinguishing attributes, so scope by the chip row's own layout classes
  // rather than matching text.
  await page.locator('.overflow-x-auto button:not([disabled])').first().click()
  await page.locator('button', { hasText: /AM|PM/ }).first().click()

  await page.getByRole('button', { name: /book consultation/i }).click()

  await expect(page.getByText('amina@example.com')).toBeVisible()
})

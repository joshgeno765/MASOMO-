import { test, expect } from '@playwright/test'

// Every public route in App.tsx — catches broken chunks, i18n crashes, and
// dead links before a client ever finds them.
const PUBLIC_ROUTES = [
  '/',
  '/about',
  '/destinations',
  '/fmc-pilot',
  '/pathway-finder',
  '/universities',
  '/services',
  '/consultation',
  '/contact',
  '/privacy',
  '/terms',
]

for (const route of PUBLIC_ROUTES) {
  test(`${route || 'home'} loads with no console errors`, async ({ page }) => {
    const errors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    page.on('pageerror', (err) => errors.push(err.message))

    const response = await page.goto(route)
    expect(response?.ok(), `${route} returned ${response?.status()}`).toBeTruthy()

    // Layout chrome should be present on every public page
    await expect(page.locator('nav')).toBeVisible()

    expect(errors, `console errors on ${route}:\n${errors.join('\n')}`).toEqual([])
  })
}

test('navbar links route to the correct pages', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('link', { name: /about/i }).first().click()
  await expect(page).toHaveURL(/\/about$/)

  await page.getByRole('link', { name: /contact/i }).first().click()
  await expect(page).toHaveURL(/\/contact$/)
})

test('unknown route redirects home instead of showing a blank screen', async ({ page }) => {
  await page.goto('/this-page-does-not-exist')
  await expect(page).toHaveURL(/\/$/)
  await expect(page.locator('nav')).toBeVisible()
})

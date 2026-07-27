import { test, expect } from '@playwright/test'

// Staff login gates the entire admin/CRM surface — a regression here locks
// counselors out of leads and consultations, not just a cosmetic bug.

test('rejects empty submission without calling the API', async ({ page }) => {
  let called = false
  await page.route('**/api/auth/login', (route) => { called = true; route.continue() })

  await page.goto('/login')
  await page.getByRole('button', { name: /sign in/i }).click()

  await expect(page.getByText(/enter your email and password/i)).toBeVisible()
  expect(called).toBe(false)
})

test('shows a server error on bad credentials', async ({ page }) => {
  await page.route('**/api/auth/login', (route) =>
    route.fulfill({ status: 401, contentType: 'application/json', body: JSON.stringify({ error: 'Invalid credentials' }) })
  )

  await page.goto('/login')
  await page.getByPlaceholder('you@masomonow.com').fill('admin@masomonow.com')
  await page.locator('input[type="password"]').fill('wrong-password')
  await page.getByRole('button', { name: /sign in/i }).click()

  await expect(page.getByText(/invalid credentials/i)).toBeVisible()
  await expect(page).toHaveURL(/\/login$/)
})

test('logs in and reaches the admin dashboard with a mocked API', async ({ page }) => {
  await page.route('**/api/auth/login', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        data: { token: 'test-token', user: { id: 1, email: 'admin@masomonow.com', role: 'ADMIN', mustChangePassword: false } },
      }),
    })
  )
  await page.route('**/api/auth/me', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: { id: 1, email: 'admin@masomonow.com', role: 'ADMIN', mustChangePassword: false } }),
    })
  )

  await page.goto('/login')
  await page.getByPlaceholder('you@masomonow.com').fill('admin@masomonow.com')
  await page.locator('input[type="password"]').fill('correct-password')
  await page.getByRole('button', { name: /sign in/i }).click()

  await expect(page).toHaveURL(/\/admin$/)
})

import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  // Running 3 browser engines at full worker count overwhelms a single local
  // preview server (page.goto timeouts, not real bugs). CI runners typically
  // have more headroom, so only cap it for local runs.
  workers: process.env.CI ? undefined : 2,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
  webServer: {
    // Netlify serves the static production build, not Vite's dev server — testing
    // against `build && preview` is both more representative and far more stable
    // under parallel multi-browser load (the dev server's per-request transpilation
    // can't keep up with Chromium+Firefox+WebKit hitting it concurrently).
    command: 'npm run build && npm run preview -- --port 5173 --strictPort',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})

import * as Sentry from '@sentry/react'

// No DSN set = Sentry is entirely inert (no init, no network calls). This lets
// the SDK sit in the bundle unconfigured in every environment until
// VITE_SENTRY_DSN is added in Netlify, with no behavior change until then.
const dsn = import.meta.env.VITE_SENTRY_DSN as string | undefined

export function initSentry() {
  if (!dsn) return
  Sentry.init({
    dsn,
    environment: import.meta.env.MODE,
    tracesSampleRate: 0.1,
  })
}

export function captureException(error: unknown) {
  if (dsn) Sentry.captureException(error)
}

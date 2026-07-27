import * as Sentry from '@sentry/node'

// Must be imported before any other module (see index.ts) so auto-instrumentation
// attaches correctly. No DSN = Sentry is entirely inert until SENTRY_DSN is set
// in Railway's environment variables.
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || 'development',
    tracesSampleRate: 0.1,
  })
}

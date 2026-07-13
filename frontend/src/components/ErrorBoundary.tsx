import { Component, ReactNode } from 'react'

const CHUNK_ERROR = /failed to fetch dynamically imported module|error loading dynamically imported module|importing a module script failed/i
const RELOAD_FLAG = 'masomo_chunk_reload_attempted'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
  showDetails: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null, showDetails: false }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { error }
  }

  componentDidCatch(error: Error) {
    // A stale or blocked JS chunk (common right after a new deploy, or with an
    // ad-blocker eating a request) throws here instead of rendering — one silent
    // reload recovers it without looping forever.
    if (CHUNK_ERROR.test(error.message) && !sessionStorage.getItem(RELOAD_FLAG)) {
      sessionStorage.setItem(RELOAD_FLAG, '1')
      window.location.reload()
    }
  }

  render() {
    const { error, showDetails } = this.state
    if (!error) return this.props.children

    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-5 text-xl">!</div>
          <h1 className="font-serif text-2xl text-navy mb-2">Something went wrong</h1>
          <p className="text-gray-500 text-sm mb-6">
            This page hit an error and couldn't load. Reloading usually fixes it.
          </p>
          <div className="flex items-center justify-center gap-3 mb-6">
            <button
              onClick={() => window.location.reload()}
              className="bg-brand-gold text-navy font-bold px-6 py-2.5 rounded-lg text-sm hover:bg-brand-gold-light transition-colors"
            >
              Reload page
            </button>
            <button
              onClick={() => this.setState({ showDetails: !showDetails })}
              className="text-gray-400 text-sm hover:text-navy transition-colors"
            >
              {showDetails ? 'Hide details' : 'Show details'}
            </button>
          </div>
          {showDetails && (
            <pre className="text-left text-xs text-gray-500 bg-gray-50 border border-gray-100 rounded-lg p-4 overflow-auto max-h-64">
              {error.name}: {error.message}
              {error.stack ? `\n\n${error.stack}` : ''}
            </pre>
          )}
        </div>
      </div>
    )
  }
}

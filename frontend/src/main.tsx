import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Swap the preloaded Google Fonts stylesheet from print to all once it has loaded,
// so it doesn't block initial render (kept in JS rather than an inline onload attribute
// so it works under a strict script-src CSP with no 'unsafe-inline').
const fontLink = document.getElementById('google-fonts') as HTMLLinkElement | null
if (fontLink) fontLink.media = 'all'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

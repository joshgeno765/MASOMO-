import { useEffect } from 'react'

export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title

    const descTag = description ? document.querySelector('meta[name="description"]') : null
    const prevDescription = descTag?.getAttribute('content') ?? null
    if (descTag && description) {
      descTag.setAttribute('content', description)
    }

    return () => {
      document.title = prevTitle
      if (descTag && prevDescription !== null) {
        descTag.setAttribute('content', prevDescription)
      }
    }
  }, [title, description])
}

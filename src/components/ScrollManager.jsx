import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Scrolls to the #hash target, or to the top on a new page.
export default function ScrollManager() {
  const { hash, key } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) { el.scrollIntoView(); return }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [key, hash])
  return null
}

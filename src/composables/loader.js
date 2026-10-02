// Loader gate. index.html sets `data-loading` on <html> before the app boots; SiteLoader removes it
// when the curtain is half open. Anything that should wait for the intro (hero text) calls loaderDone().
export const LOADER_EVENT = 'portfolio:loader-done'

export function loaderDone(cb) {
  if (!document.documentElement.hasAttribute('data-loading')) return cb()
  document.addEventListener(LOADER_EVENT, cb, { once: true })
}

// Which intro to play.
//   'open'    first visit in this tab: the full brand intro (wordmark, split curtain)
//   'refresh' reload, back/forward, or coming back to the site again in the same tab: shorter counter + blinds wipe
const VISITED_KEY = 'portfolio:visited'
export function introVariant() {
  const type = performance.getEntriesByType?.('navigation')?.[0]?.type || 'navigate'
  let seen = false
  try { seen = sessionStorage.getItem(VISITED_KEY) === '1' } catch { /* storage blocked: treat as first visit */ }
  try { sessionStorage.setItem(VISITED_KEY, '1') } catch { /* ignore */ }
  return type === 'navigate' && !seen ? 'open' : 'refresh'
}

export function releaseLoader() {
  document.documentElement.removeAttribute('data-loading')
  document.dispatchEvent(new CustomEvent(LOADER_EVENT))
}

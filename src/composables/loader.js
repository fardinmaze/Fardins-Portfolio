// Loader gate. index.html sets `data-loading` on <html> before the app boots; SiteLoader removes it
// when the curtain is half open. Anything that should wait for the intro (hero text) calls loaderDone().
export const LOADER_EVENT = 'portfolio:loader-done'

export function loaderDone(cb) {
  if (!document.documentElement.hasAttribute('data-loading')) return cb()
  document.addEventListener(LOADER_EVENT, cb, { once: true })
}

export function releaseLoader() {
  document.documentElement.removeAttribute('data-loading')
  document.dispatchEvent(new CustomEvent(LOADER_EVENT))
}

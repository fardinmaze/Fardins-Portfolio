// v-reveal="n": fade + 24px rise when the element enters the viewport.
// n is the stagger step (n * 80ms). CSS lives in base.css (.reveal / .is-in).
let observer

function getObserver() {
  if (observer) return observer
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        e.target.classList.add('is-in')
        observer.unobserve(e.target)
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  )
  return observer
}

export const vReveal = {
  mounted(el, { value }) {
    el.classList.add('reveal')
    el.style.setProperty('--d', value || 0)
    if (!('IntersectionObserver' in window)) return el.classList.add('is-in')
    getObserver().observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}

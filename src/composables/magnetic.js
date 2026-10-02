import { gsap } from 'gsap'

// v-magnetic: element drifts toward the pointer, springs back on leave.
export const vMagnetic = {
  mounted(el, { value = 0.35 }) {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.5)' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.5)' })
    el._mag = {
      move(e) {
        const r = el.getBoundingClientRect()
        xTo((e.clientX - (r.left + r.width / 2)) * value)
        yTo((e.clientY - (r.top + r.height / 2)) * value)
      },
      leave() { xTo(0); yTo(0) },
    }
    el.addEventListener('mousemove', el._mag.move)
    el.addEventListener('mouseleave', el._mag.leave)
  },
  unmounted(el) {
    if (!el._mag) return
    el.removeEventListener('mousemove', el._mag.move)
    el.removeEventListener('mouseleave', el._mag.leave)
  },
}

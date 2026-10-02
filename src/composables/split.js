// v-split: text reveal on scroll (or on load) using GSAP SplitText.
//   v-split="'lines'"                                  masked lines rise from below
//   v-split="{ effect: 'tilt-lines', trigger: 'load' }" waits for the loader instead of scrolling
//
// Effects: lines · words · chars · tilt-lines (masked) | fade-lines · fade-words · blur-words · blur-chars (unmasked)
import { gsap, SplitText, prefersReducedMotion } from './gsap'
import { loaderDone } from './loader'

const EASE = 'expo.out'
const EFFECTS = {
  lines: { target: 'lines', mask: true, from: { yPercent: 110 }, duration: 1.2, stagger: 0.1 },
  words: { target: 'words', mask: true, from: { yPercent: 110 }, duration: 0.6, stagger: 0.06 },
  chars: { target: 'chars', mask: true, from: { yPercent: 110 }, duration: 0.4, stagger: 0.01 },
  'tilt-lines': { target: 'lines', mask: true, from: { yPercent: 120, rotate: 6, transformOrigin: '0% 100%' }, duration: 1, stagger: 0.1 },
  'fade-lines': { target: 'lines', mask: false, from: { opacity: 0, y: 24 }, duration: 0.9, stagger: 0.1 },
  'fade-words': { target: 'words', mask: false, from: { opacity: 0, y: 16 }, duration: 0.7, stagger: 0.035 },
  'blur-words': { target: 'words', mask: false, from: { opacity: 0, filter: 'blur(10px)', y: 8 }, duration: 1, stagger: 0.05 },
  'blur-chars': { target: 'chars', mask: false, from: { opacity: 0, filter: 'blur(8px)' }, duration: 0.6, stagger: 0.015 },
}
const TYPES = { lines: 'lines', words: 'lines,words', chars: 'lines,words,chars' }

export const vSplit = {
  mounted(el, { value }) {
    const opts = typeof value === 'string' ? { effect: value } : value || {}
    const fx = EFFECTS[opts.effect || 'lines'] || EFFECTS.lines
    el.setAttribute('data-split', '')
    const ready = () => el.setAttribute('data-split-ready', '')
    if (prefersReducedMotion()) return ready()

    let played = false
    const setup = () => {
      if (!el.isConnected) return
      el._split = SplitText.create(el, {
        type: TYPES[fx.target],
        mask: fx.mask ? 'lines' : undefined,
        aria: 'auto',
        autoSplit: true, // re-splits on resize / late font load
        linesClass: 'sl',
        wordsClass: 'sw',
        charsClass: 'sc',
        onSplit(self) {
          ready()
          if (played) return // already revealed: just re-split, do not replay
          return gsap.from(self[fx.target], {
            ...fx.from,
            duration: opts.duration ?? fx.duration,
            stagger: opts.stagger ?? fx.stagger,
            ease: EASE,
            delay: opts.delay || 0,
            onStart: () => { played = true },
            ...(opts.trigger === 'load' ? {} : { scrollTrigger: { trigger: el, start: 'top 85%', once: true } }),
          })
        },
      })
    }
    const start = () => loaderDone(setup) // never reveal behind the loader curtain
    document.fonts?.ready ? document.fonts.ready.then(start, start) : start()
  },
  unmounted(el) {
    el._split?.revert()
  },
}

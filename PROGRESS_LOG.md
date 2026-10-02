# Portfolio Rebuild: Progress Log

Project: MD Fardin Mazumder portfolio (Vue 3 + JavaScript, Vite, GSAP + Lenis)
Location: `C:\Users\Test\Documents\fardin-portfolio-vue`
Hosting target: Vercel (Vite preset, `vercel.json` included)
Source of content: https://fardinpronoy.framer.website/

---

## Iteration 1: First draft (2026-10-02)

### Status: Done. Dev run and production build both succeed.

### Stack
- Vue 3 (Composition API, `<script setup>`), plain JavaScript, no TypeScript
- Vite 5 (pinned because local Node is v18.17)
- GSAP + ScrollTrigger for all animation; Lenis for smooth scroll (synced to ScrollTrigger)
- Hand-written CSS with design tokens in `src/styles/base.css` and scoped styles per component

### Design direction
- Palette: grayish white `#ecebe7` base, accent black `#111` for contrast sections (Work, Contact, marquee)
- CTA accents: purple `#8b3dff` → pink `#ff3d9a` → red `#ff3b30` gradient
- Animated blurred-orb gradient field in the hero (kept from the Framer look) plus grain overlay
- Fonts: Bricolage Grotesque (display), Inter (body)
- Inspiration applied: autumn.ai (soft gradients), designmonks (bold type, dark and light contrast), spice-dine (stacked card scroll)

### Sections and scroll animation (each one is different)
| Section | Scroll behaviour |
|---|---|
| Hero | Masked line-by-line headline reveal, orbs parallax with scroll and follow the pointer, content fades as you leave |
| Marquee strip | Infinite loop whose speed and direction follow scroll velocity |
| About | Scrubbed word-by-word text highlight, count-up stats |
| Work | Sticky stacking card deck; earlier cards scale down and dim; 3D tilt on covers; drifting shapes |
| Services | Batched clip-path unmask of tiles; gradient floods up on hover |
| Experience | Timeline spine draws with scroll; rows slide in from alternating sides |
| Contact | Curtain: panel opens from rounded inset to full bleed; giant words slide in from opposite sides |

### Micro-interactions
Magnetic buttons (`v-magnetic`), custom cursor (dot and ring that grows over links), nav pill that hides on scroll down, scroll progress bar, underline-wipe links, arrow nudge on CTAs, click-to-copy email, spinning logo mark.
Respects `prefers-reduced-motion` (Lenis off, CSS animations shortened). Custom cursor is hidden on touch devices.

### Content carried over from Framer
Name, role, tagline, intro, 8 services, 4 projects with metrics, 4 experience entries, email, Calendly link.

### Structure
```
src/
  App.vue                  page assembly + Lenis boot
  main.js                  entry, registers ScrollTrigger
  data/content.js          ALL copy lives here
  composables/             useSmoothScroll.js, magnetic.js (directive)
  components/              TheNav, HeroSection, MarqueeStrip, AboutSection,
                           WorkSection, ServicesSection, ExperienceSection,
                           ContactSection, CustomCursor, ScrollProgress
  styles/base.css          tokens, buttons, helpers
```

### Bugs hit and fixed during this iteration
- Hero crashed on mount: used `ctx` inside its own `gsap.context` callback before it was assigned. Fixed with a separate cleanup variable.
- About text lost word spacing because of inline whitespace collapsing. Fixed with `inline-block` words and margin.

### Known gaps / open items for next iteration
1. **Social links are placeholders** (LinkedIn, Dribbble, Instagram point to site homepages). Need real URLs.
2. **Project covers are generative gradient shapes**, not real screenshots. Need real images or Figma exports; case-study links not wired.
3. **About copy is a draft** written from the Framer summary. The Framer page text could not be fully extracted (it is JS-rendered). Please review the wording, and add photo/portrait if wanted.
4. Page title/meta/OG image are basic; no OG image or favicon artwork yet.
5. Mobile layout is coded (breakpoints at 1000/860/720/560px) but was **not visually tested** in a phone-width viewport.
6. Wheel scrolling could not be exercised through the test browser, so Lenis feel (and the marquee velocity effect) is untested by hand. Please try it locally.
7. Not yet done: git repo/commit for this folder, Vercel deploy, analytics, testimonials, project detail pages, light/dark tuning.

### How to run
```
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs dist/
```

### Deploy to Vercel
Push to GitHub, import the repo in Vercel; it auto-detects Vite (build `npm run build`, output `dist`). Or run `npx vercel` from this folder.

---

## Next iteration: ideas to discuss
- Real project imagery and case-study pages (vue-router)
- Preloader / intro sequence
- Cursor-reactive gradient in the hero (WebGL/canvas mesh) for a richer feel
- Testimonials and a contact form
- Tuning animation pacing and colour balance after your feedback

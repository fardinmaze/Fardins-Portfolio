# Portfolio Rebuild: Progress Log

Project: MD Fardin Mazumder portfolio (Vue 3 + JavaScript, Vite, GSAP + Lenis)
Location: `C:\Users\Test\Documents\fardin-portfolio-vue`
Hosting target: Vercel (Vite preset, `vercel.json` included)
Source of content: https://fardinpronoy.framer.website/

---

## Iteration 3: Project pages + Design / Build / Design & Build system (2026-10-02)

### Status: Done. Production build passes and was verified in a real browser (Edge driven by puppeteer-core): all routes, filtering, 404, mobile overflow, console errors (none).

### What changed
- **Routing added** (`vue-router`, history mode). `vercel.json` now rewrites all paths to `index.html` so deep links work on Vercel.
- Routes: `/`, `/work` (index + instant filter), `/work/:slug` (7 projects), catch-all 404. Slugs: `quickcv`, `go-for-change`, `reportmate`, `design-system-bootstrapper`, `nedu-ai`, `portulika`, `hikmah`.
- **Homepage is now an overview**, in the requested order: Hero, Capability strip, Design / Build / Design & Build positioning, Selected work (3 featured), AI-assisted development, Experiments, Additional work, About, Contact, Footer. Removed: Process, Capabilities, on-page case study (that story now lives on project pages).
- **Nav:** Work (to /work), About, Experiments, Contact. Active state works on home sections and on /work/*.
- **/work:** filter chips All / Design / Build / Design & Build with counts. Instant (no reload), URL-synced (`/work?category=build`), deep-linkable, footer links use it.
- **Project page template** (`pages/ProjectPage.vue` + `components/project/*`): hero (back link, `CATEGORY / PROJECT`, headline, description, role/year/platform, large visual), overview (overview, my role, platform, scope; timeline only if known), category-specific sections, next-project block with `← All work`.
- **Category drives structure** (`TEMPLATES` in `src/data/projects.js`): DESIGN (12 sections, visual-led), BUILD (7: idea, why, definition, build approach flow, MVP, what changed before/after, learned), DESIGN & BUILD (11, plus a Understand→Design→Build→Test→Improve spine). Sections render as full-bleed, two-up, flow, compare or outcome layouts. A project can hide sections via `hide: []`.
- **Category signal:** DESIGN = teal square, BUILD = cyan square, DESIGN & BUILD = both. Used only on tags, the hero crumb, the positioning cards and the spine; everything else is one neutral system.
- Per-route title, description, og tags and canonical set in `src/router/index.js`.

### Design system
Palette and font switched to the system specified in the brief: bg `#080C0E`, surface `#10171A` / `#172125`, primary `#4F7A8A`, hover `#638F9F`, accent `#22D3EE`, text `#F4F7F8`, body `#D3DCE0`, muted `#8A989E`, border `#263237`, font Geist (Inter fallback).
- **Note:** the previous iteration used lime on near-black. The brief said "keep the existing system" but listed these teal/cyan values, so the listed values were applied. Say if you actually wanted lime kept.
- Contrast: `#4F7A8A` on bg is ~4.2:1, which fails AA for small text. So `#4F7A8A` is used only for lines/markers; teal text and the filled button use `#638F9F` (~5.6:1).

### Content integrity
- No metrics, dates, outcomes or responsibilities were invented. Missing info shows as a dashed `[Add ...]` placeholder.
- Given in the brief and used as written: all 7 headlines (except Nedu AI, Portulika, Hikmah, which had none), roles, categories, QuickCV description / year (2025–2026) / platform, DSB year (2026).
- From the earlier Framer portfolio: QuickCV 900+ users / 90% satisfaction; ReportMate description + 70% accessibility / 4.5★ (still unverified wording, please confirm). Factory Next and E-Commerce Storefront appear in Additional work as plain rows (no page).
- From your Design System Bootstrapper project notes: what it generates, 7 templates, 13 components, idempotent re-runs, TypeScript/React/Vite. No performance or validation claims were added.
- **Nedu AI:** role is exactly `Product · UX/UI Contribution`. The page prompts you to state the exact scope.
- **Hikmah:** I found a "Hikma Admin Dashboard" Flutter project in the home-folder git history but could not confirm it is this project, so I did not use it. Hikmah has no description yet.
- **Experiments section** shows the two BUILD projects (DSB, Hikmah). No other experiments were invented.

### Still needed from you
1. Real screenshots/visuals for every project (drop files in `public/work/<slug>/`, then add `{ src, alt }` under `visuals[<sectionKey>]` or `hero` in `src/data/projects.js`; placeholders swap automatically).
2. Headlines + descriptions for Nedu AI, Portulika, Hikmah; description for Go for Change.
3. Year / platform / role detail, and the narrative sections (problem, thinking, flows, outcome, reflection) per project.
4. Confirm Report Mate "70% accessibility", and the LinkedIn URL.

### Known limits
- SPA: crawlers that do not run JavaScript will only see the default title/description. Prerendering (e.g. vite-ssg) is the fix if SEO for project pages matters.
- `og:image` and a real canonical domain are still missing.
- Hover states, the custom cursor and keyboard focus were not exercised in the headless test; the count-up and reveal animations were observed working.

---

## Iteration 2: Full redesign to the "Product Analyst & Designer" brief (2026-10-02) — palette, homepage order and sections partly superseded by Iteration 3

### Status: Code complete, production build passes. NOT yet visually verified (see "Verification").

### What changed
- Complete visual and content reset. Old pink/purple/white identity, gradient orbs and Framer copy are gone.
- Dark monochrome system: bg `#0A0A0A`, text `#F5F5F0`, muted `#9A9A93`, borders `#242424`, single accent lime `#C8FF3D`. No other accent colours.
- Type: Inter Tight (hero 800, uppercase, `clamp()` sizes), 4 to 8px radii, borders as the main layout tool, 12-column grid, 1440px max width.
- **Removed GSAP and Lenis** (brief: no heavy libraries for simple effects). All motion is now CSS + IntersectionObserver + a few lines of JS. JS bundle 218 kB → 89 kB (34 kB gzip).
- Structure follows the brief's order: Nav, Hero, What I Do, Selected Work, Case study, About, How I Work, AI workflow, Capabilities, Final CTA, Footer. Testimonials omitted on purpose (none exist).

### Components
`SiteNav` (transparent → solid after scroll, active-section highlight, mobile menu) · `HeroSection` (staggered load-in, CSS-only product pipeline Idea→Launch with a stepping lime marker) · `WhatIDoSection` · `WorkSection` + `ProjectBlock` (3 asymmetric layouts a/b/c) · `ShotFrame` (screenshot or placeholder) · `CaseStudySection` (Problem/Thinking/Product/Design/Result) · `AboutSection` · `ProcessSection` (horizontal desktop, vertical mobile) · `AiWorkflowSection` (sequence + CSS ticker) · `CapabilitiesSection` · `FinalCta` · `SiteFooter` · `CursorDot` · `CountUp` · `v-reveal` directive.

### Motion
Hero load-in 20px/620ms, stagger 110ms. Scroll reveals 24px/600ms, stagger 80ms. Counters 1.3s ease-out with reserved width (no layout shift). Project hover: image scale 1.03, arrow +5px. Cursor: small lime dot, grows with VIEW/OPEN labels, desktop fine-pointer only. All motion respects `prefers-reduced-motion`.

### Content integrity (nothing invented)
Anything I do not have is a visible dashed `[tbc]` placeholder, never made-up copy.
- **Needs your input:** project year (all 4), role (projects 02 to 04), product screenshots (all 4), case-study text for Problem / Thinking / Design (QuickCV) and the product-explanation sentence.
- Metrics shown are only the ones from your Framer site: QuickCV 900+ users / 90% satisfaction, Report Mate 70% accessibility / 4.5★, Factory Next +15% conversion / 95% satisfaction, E-Commerce 100+ designers. The example metrics in the brief (+42% etc.) were NOT used.
- **Please verify:** "70% accessibility" for Report Mate is carried over verbatim from Framer and reads oddly. Also the brief says "4+ years" while the old Framer site said "3+"; I used the brief's 4+.
- Only QuickCV has a case-study link (it jumps to the on-page case study). The other three show "Case study, coming soon".
- LinkedIn link is a placeholder (`linkedin.com`); fix in `src/data/content.js`.

### SEO
Title and description as specified, Open Graph and Twitter tags, JSON-LD Person, SVG favicon. Missing until the domain exists: canonical URL, `og:url`, `og:image`.

### Verification
- Production build: passes.
- Browser check: **not done for this iteration.** The Chrome extension disconnected after the build. Needs a manual pass at desktop, tablet and phone widths, especially: hero headline fit at 1100 to 1440px, project layouts a/b/c, the process section's desktop/mobile switch, the mobile menu, and keyboard focus order.

### Next
Supply screenshots and the tbc items, then build real case-study pages (vue-router) for the other projects.

---

## Iteration 1: First draft (2026-10-02) — SUPERSEDED by Iteration 2

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

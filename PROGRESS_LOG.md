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

### Update (same day): palette reverted, dev-server fix
- **Palette reverted to the Iteration 2 lime system** at the owner's request: bg `#0A0A0A`, text `#F5F5F0`, muted `#9A9A93`, line `#242424`, single accent lime `#C8FF3D`, font Inter Tight. Teal/cyan are gone; the tokens in `src/styles/base.css` are the only place colour lives.
- With one accent colour, categories are told apart by marker shape instead: outline square = DESIGN, solid square = BUILD, both = DESIGN & BUILD.
- **Blank page on localhost:** the dev server had been running since before `vue-router` was installed, so Vite's dependency cache was stale and `<RouterView>` rendered nothing (no console error; production build was fine). Fix: stop the server, `rm -rf node_modules/.vite`, `npm run dev -- --force`. If it ever happens again after adding a dependency, restart the dev server.

### Update (same day): Klyne-style loader, stacked work cards, split-text reveals
Reference studied: klyne.design (their public client scripts were read to understand the behaviour; the implementation here is original).
- **GSAP is back** (`gsap` 3.15 incl. ScrollTrigger + SplitText, no Lenis). Reason: a timeline loader, a scrubbed pinned stack and SplitText are what it is for. Cost: JS ~42 kB to ~92 kB gzip.
- **Loader** (`SiteLoader.vue`, `composables/loader.js`): wordmark `FARDIN.` letters rise with a stagger, holds until fonts are ready, letters exit, then the screen splits into two halves that slide apart (one up, one down, `expo.inOut`, 0.9s). The hero is released halfway through the curtain (`html[data-loading]` pauses hero animation and scroll until then). Skipped entirely with `prefers-reduced-motion`; hard fallbacks at 2.5s (fonts), 9s (loader) and 10s (inline script in `index.html`) so the page can never stay locked.
- **Selected work = pinned card stack** (`WorkSection.vue`): the 3 featured projects sit in a sticky stage. Scrolling flies the top card up while it tilts (a different angle per card), the rest step forward in depth (y/z offsets). The stack also swings in on entry with images scaling 1.35 to 1, and a `01 / 03` counter tracks progress. Smaller depth offsets under 768px. Reduced motion shows a plain readable list. `ProjectFeature.vue` was removed.
- **Text scroll animation** (`composables/split.js`, directive `v-split`): SplitText effects `lines`, `words`, `chars`, `tilt-lines` (masked) and `fade-lines`, `fade-words`, `blur-words`, `blur-chars`; plays once when the text reaches 85% of the viewport, or on load for the hero (after the loader). Currently: hero `tilt-lines`, section titles `lines`, About paragraphs `blur-words`, lead paragraphs `fade-lines`, contact title `tilt-lines`. Re-splits on resize and font load without replaying.
- Verified in Edge: loader sequence frames, hero release, stack scroll states 01/02/03, split text ready, mobile (390px) with no horizontal overflow, reduced-motion path, dev server, zero console errors.
- Not exercised: real touch scrolling and low-end device performance.

### Update (same day): separate Contact page with an email form
- **New route `/contact`** (`pages/ContactPage.vue`, `components/ContactForm.vue`): same look as the closing CTA (big tilt-line heading, info column with email + "Book 15 minutes") with a form on the right: Name, Email, Message. Underline-only inputs, lime focus line, inline errors, focus moves to the first invalid field, success state ("Thanks, <first name>."), clear failure messages with a mailto fallback, honeypot field against bots. Nav "Contact", the nav CTA, the hero "Let's talk" and the home "Start a conversation" button all go to `/contact`. The home page keeps its closing CTA section.
- **How the email is sent:** `api/contact.js`, a Vercel serverless function that calls the Resend API. The same file is served locally by a small middleware in `vite.config.js`, so `npm run dev` behaves like production. Validates server-side (name, email, 10 to 4000 char message), HTML-escapes the body, strips newlines from name/email, sets `reply_to` to the visitor so you can reply directly.
- **Footer:** the "Portfolio / Framer" link and the `framer` field were removed. (The word "Framer" still appears once in the AI tools ticker because it is one of your listed tools.)
- **Bug fixed along the way:** `v-split` used `clamp(top 85%)`, which kept any heading already on screen invisible until the first scroll. Now plain `top 85%`; all split text also waits for the loader so reveals are never wasted behind the curtain.
- **Vercel rewrite** now excludes `/api/*`.

**To make the form actually deliver mail (not done yet, needs your account):**
1. Create a free Resend account with the inbox you want to receive at (the shared sender `onboarding@resend.dev` can only deliver to the email the Resend account was created with), then create an API key.
2. Local: copy `.env.example` to `.env.local` and set `RESEND_API_KEY`. Restart `npm run dev`.
3. Vercel: Project Settings > Environment Variables > add `RESEND_API_KEY` (and optionally `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`), then redeploy.
Until the key exists, the form answers "not connected yet, please email directly" instead of pretending to send.

Verified: handler (405, bad body, validation, honeypot, 503 without key, success payload to Resend, provider and network failures), live dev route, page in Edge (validation, focus, unavailable message, mocked success, nav state, mobile, no overflow). **Not verified: a real email arriving**, because no API key was available.

### Update (same day): minimal project pages + real content from the Framer portfolio
- **Project detail pages simplified** to a minimal layout modelled on klyne.design's project page: left column (sticky) with back link, category, name, outcome headline, one-sentence description, tags, role/year/platform, small tabs (Challenge / Result / Process, only the ones that have content) and a "Visit site" link; right column is a stream of large screenshots (full-width and two-up). Phone: stacks. The category-specific templates, section index and per-section placeholders were removed (`ProjectHero`, `ProjectOverview`, `ProjectSection`, `TEMPLATES`, `SPINE`). "Next project" block kept at the bottom. Category tag kept.
- **Content pulled from fardinpronoy.framer.website** (home + 4 case-study pages, read with a headless browser): QuickCV and ReportMate now have their real challenge/result text, process lists, metrics and images. 7 images converted to WebP in `public/work/quickcv` and `public/work/reportmate` (about 1.5 MB total; ReportMate cover is ~520 KB because of its grain texture). Real covers now show on the home stack, `/work` cards and the next-project block. QuickCV links to https://createquickcv.com/ (Framer).
- **Real LinkedIn URL applied** (`/in/mazumderfardin`); the placeholder is gone.
- **Mapping used for Framer's case-study URLs** (their slugs are leftover template names): `modernization-of-a-subscription-management-platform` = Report Mate, `optimizing-a-corporate-intranet` = QuickCV, `revamping-an-e-commerce-website` = E-Commerce Storefront, `developing-a-mobile-health-tracking-app` = Factory Next.
- **Deliberately NOT used from Framer** because it looks like leftover template text rather than facts: client HQ/revenue/company-size fields (for example "Revenue $1.578 billion (2019)", "Ottawa, Ontario"), the Report Mate conclusion that talks about a "subscription management platform", and the portrait's alt text ("Goran Babarogic", the template author).
- **Metric conflicts, resolved conservatively:** QuickCV home card said 900+ users and an unlabeled 90%; the case page says 925 users (Jan 2026) and 42% onboarding / 25% retention / 84% time on site. The 42/25/84 are shown; the earlier "90% satisfaction" label was my assumption and is removed. Report Mate: home card says 4.5 stars satisfaction, case page says 45% satisfaction and 35% onboarding. Only 70% accessibility (consistent on both) is shown until confirmed.
- BUILD projects (Design System Bootstrapper, Hikmah) stay in the site with minimal pages; nothing was removed. To hide one, delete its slug from `featuredSlugs` / `experimentSlugs` / `additionalSlugs` and the projects list in `src/data/projects.js`.
- Verified in Edge: tabs, metrics counters, 4/4 images loading, sticky column, placeholder-only pages (Hikmah, Go for Change, DSB), cards showing real covers on `/work`, mobile no overflow, zero console errors.

### Update (same day): two different intros, first open vs refresh
- `SiteLoader.vue` now picks between two animations (`introVariant()` in `composables/loader.js`, based on the browser's navigation type plus a per-tab `sessionStorage` flag):
  - **open** (first visit in a tab, new tab, typed URL for the first time): the full brand intro. Wordmark `FARDIN.` rises letter by letter, then the screen splits into two halves (one up, one down).
  - **refresh** (reload, back/forward, or returning to the site again in the same tab): a shorter intro. A big 000 to 100% counter with a lime progress line, then five blinds lift away from the centre outward while the hero starts.
- Both wait for fonts, release the hero partway through the wipe, are skipped with `prefers-reduced-motion`, and have hard timeouts so the page can never stay locked.
- Not changed: moving between pages inside the site (route changes) still has no transition. Easy to add the blinds there if wanted.
- Verified in Edge against the production build (tiny static server, no Vite): first open = `open`, `page.reload()` = `refresh`, second visit in the same tab = `refresh`, a new tab = `open`, reduced motion = none; hero, scroll lock and loader removal all fine; zero console errors. Found and fixed a stray "%" that stayed on screen during the wipe.
- Note: the Vite dev server was stopped by the system for low memory and has not been restarted.

### Update (same day): full QuickCV case study
- The QuickCV detail page now carries the full case study supplied by the owner (17 sections: Problem, Opportunity, Product, Product Idea, Profile to Application, Relevance, Tracking, UX Challenge, My Role, Designing the Experience, AI as an Assistant, Architecture, One Flow, Iteration, Results, What This Project Changed for Me, Design/Build, Reflection). Copy lives in `src/data/stories/quickcv.js`, rendered by `components/project/StoryBlocks.vue` (paragraphs, statements, feature grid, flows, connector list, numbered steps, architecture diagram, metrics, Design/Build pair, screenshots). The sticky left column and "Visit site" stay. Other projects keep the minimal layout; a project opts in by adding a `story` array.
- Text is as supplied. Two small structure choices: the "Create a CV should naturally connect to..." sequence is a connector list that keeps the original sentences, and the final Design/Build blocks have no extra section heading.
- QuickCV now has a page headline ("One professional profile. Every application.", `pageHeadline`), two intro paragraphs, `pageTags` and platform "Web Platform". Cards still use the earlier headline/description/tags. Its next project is ReportMate (`next`), and the next-project block now shows a one-line description.
- ReportMate description is now the supplied line ("A product concept exploring how OCR and AI-assisted workflows can reduce repetitive manual data processing.").
- Results: +42% onboarding, +25% retention, +84% time spent, and 5,000+ users, as supplied. The earlier Framer figures (925 users in Jan 2026, 900+) disagree with 5,000+; the supplied figure is used. The note about publishing the measurement period and method is shown as a visible to-do placeholder, not as site copy.
- Two screenshot placeholders remain (JD-based CV screen, Application tracker screen). Three existing screens are used under "The Product".
- Verified in Edge: all 18 sections render, bold parsing, architecture diagram, counters, 3/3 images load, next project, other projects unchanged, mobile no overflow, zero console errors.

### Update (same day): Go for Change and NeduAI from the owner's Google Doc
- Read the Google Doc "Designs" (Drive connector). It holds three case studies: QuickCV (identical to the copy already on the site), Go for Change, NeduAI.
- **Go for Change** and **NeduAI** now have short story pages (7 and 6 sections) in the same layout as QuickCV, from `src/data/stories/goforchange.js` and `neduai.js`. Wording is the owner's; sections and lines were **selected, not rewritten**. What was left out is listed at the top of each file so it can be added back.
  - Go for Change: Context, Challenge (four audiences), UX Direction (Discover / Understand / Engage), Organizing a Complex Ecosystem, My Role, Outcome, Reflection. Page headline "Making social impact easier to discover, understand, and support."; meta: platform "Social impact platform · Web", company "UK-based company".
  - NeduAI: Context, Product Challenge (individuals vs organizations), SmartProfile, Making Recommendations Understandable, My Role, Reflection. Name now **NeduAI** (as written in the doc). Headline "Designing a smarter path between people, skills, education, and work." The role stays a **contribution within a broader product team**.
- Cards keep their earlier headlines where the owner had set one (Go for Change: "Turning community initiatives into a digital platform."); detail pages use the doc's headlines. Card descriptions now use the doc's first sentence.
- No screenshots exist for either yet: each page has a hero placeholder, plus one inline placeholder (key screens / SmartProfile screen).
- QuickCV was left as the full 18-section page. It can be trimmed to a compact set on request (suggested: Problem, Product, Product Idea, My Role, AI as an Assistant, Results, Reflection).
- Verified in Edge (static build): sections, tags, meta, titles, mobile no overflow, cards, zero console errors.

### Design system (superseded by the revert above)
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

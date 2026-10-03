// Projects. Minimal detail pages for now (modelled on a simple "title, short story, screenshots" layout).
//
// RULES
// - Only facts the owner supplied (brief, the previous Framer portfolio, own project notes) live here.
// - A missing value is `null`/absent. The UI renders a visible dashed placeholder, never invented copy.
// - Text marked "Framer" is copied from fardinpronoy.framer.website; images were downloaded from the same
//   site and live in /public/work/<slug>/ (WebP).
//
// Per-project fields used by the detail page
//   cover            { src, alt, w, h }      image used on cards and the stack
//   images           [{ src, alt, w, h, span: 'full' | 'half' }]   the screenshot stream on the right
//   url              live site / prototype (shows a "Visit site" link)
//   challenge/result short paragraphs (tabs on the left)
//   process          short list (a tab on the left)
//   metrics          [{ to, suffix, label }] shown inside the Result tab
// Any of these can be omitted; the page only shows what exists.

import { quickcvIntro, quickcvStory } from './stories/quickcv'
import { goforchangeIntro, goforchangeStory } from './stories/goforchange'
import { neduaiIntro, neduaiStory } from './stories/neduai'
import { balantiIntro, balantiStory } from './stories/balanti'
import { afshaIntro, afshaStory } from './stories/afshahossain'

export const CATEGORIES = {
  design: { key: 'design', label: 'Design' },
  build: { key: 'build', label: 'Build' },
  'design-build': { key: 'design-build', label: 'Design & Build' },
}
export const FILTERS = [{ key: 'all', label: 'All' }, ...Object.values(CATEGORIES)]

const img = (slug, file, alt, w, h, span = 'full') => ({ src: `/work/${slug}/${file}`, alt, w, h, span })

export const projects = [
  {
    slug: 'quickcv',
    cat: 'design',
    name: 'QuickCV',
    headline: 'Making job applications faster with AI.',
    description:
      'An AI-powered CV and cover-letter platform designed to help job seekers create, tailor, and improve application materials with less manual effort.',
    role: 'Product Analysis · UX/UI · Product Improvement',
    tags: ['Product Analysis', 'UX/UI', 'AI', 'MVP'],
    pageTags: ['Product Analysis', 'UX/UI Design', 'Product Improvement', 'AI'], // wording used on the detail page
    year: '2025–2026',
    platform: 'Web Platform',
    url: 'https://createquickcv.com/', // Framer
    pageHeadline: 'One professional profile. Every application.', // headline on the detail page (cards keep `headline`)
    intro: quickcvIntro,
    story: quickcvStory,
    next: 'reportmate',
    cover: img('quickcv', '01-cover.webp', 'QuickCV logo on an orange and purple gradient', 1800, 1350),
    images: [
      img('quickcv', '01-cover.webp', 'QuickCV logo on an orange and purple gradient', 1800, 1350),
      img('quickcv', '02-sign-in-up.webp', 'QuickCV sign-in and sign-up screens', 1800, 1350),
      img('quickcv', '03-onboarding.webp', 'QuickCV onboarding screen: sign up and set up your profile', 1200, 1500, 'half'),
      img('quickcv', '04-work-experience.webp', 'QuickCV work experience screen', 1200, 1500, 'half'),
    ],
    // Framer, Challenge / Results
    challenge:
      'The existing product lacked a clear onboarding flow, intuitive structure, and modern feature set, making it difficult for users to quickly create effective CVs. Users struggled with what information to include, how to tailor their resumes for specific roles, and how to present themselves competitively. The absence of intelligent guidance and personalization led to friction, lower engagement, and reduced completion rates.',
    result:
      'The redesigned QuickCV introduced a streamlined, guided experience powered by AI assistance and job-specific optimization. Users could now generate tailored CVs and cover letters aligned with real job descriptions, significantly reducing effort while improving output quality. The new interface encouraged completion and repeat usage through clarity, speed, and confidence-building feedback.',
    metrics: [
      { to: 42, suffix: '%', label: 'Improved onboarding' },
      { to: 25, suffix: '%', label: 'Increase in retention' },
      { to: 84, suffix: '%', label: 'More time on site' },
    ],
    // Framer, Process headings
    process: ['Research & problem discovery', 'User flow redesign', 'AI feature integration', 'Wireframing & prototyping', 'UI & interaction design', 'Testing & iteration'],
  },
  {
    slug: 'go-for-change',
    cat: 'design',
    name: 'Go for Change',
    headline: 'Turning community initiatives into a digital platform.',
    pageHeadline: 'Making social impact easier to discover, understand, and support.',
    cover: img('go-for-change', '01-landing.webp', 'Go for Change landing page: Discover Stories of Change. Connect with Social Good.', 1024, 540),
    description:
      'Go for Change is a social-tech platform designed to bring NGOs, changemakers, social initiatives, donors, institutions, and communities into a more connected digital ecosystem.',
    intro: goforchangeIntro,
    story: goforchangeStory,
    role: 'UX/UI Design · Product Design',
    tags: ['UX/UI', 'Product Design'],
    pageTags: ['UX/UI Design', 'Product Design', 'Information Architecture'],
    year: null,
    platform: 'Social impact platform · Web',
    company: 'UK-based company',
  },
  {
    slug: 'reportmate',
    cat: 'design',
    name: 'ReportMate',
    headline: 'Turning field reports into structured data.',
    description: 'A product concept exploring how OCR and AI-assisted workflows can reduce repetitive manual data processing.',
    role: 'Product Concept · UX/UI · MVP',
    tags: ['Product Concept', 'UX/UI', 'MVP'],
    year: null,
    platform: 'Mobile',
    cover: img('reportmate', '01-cover.webp', 'Report Mate cover: MCCB testing report generation using OCR, Android app', 1200, 900),
    images: [
      img('reportmate', '01-cover.webp', 'Report Mate cover: MCCB testing report generation using OCR, Android app', 1200, 900),
      img('reportmate', '02-mobile-screens.webp', 'Report Mate mobile screens for inspection and report generation', 1800, 1280),
      img('reportmate', '03-components.webp', 'Report Mate UI component library', 1800, 992),
    ],
    // Framer, Challenge / Results
    challenge:
      'Inspectors previously relied on manual note-taking and later transcribing data into digital documents, leading to duplicated efforts, errors, and time loss. This traditional workflow caused productivity bottlenecks and extended work hours for audit teams. The absence of real-time reporting tools and automation significantly hindered operational efficiency.',
    result:
      'With the new OCR-powered mobile app, Report Mate automated the inspection-to-reporting workflow. Task completion time was reduced by over 45%, while data entry errors dropped significantly. Field inspectors could now generate reports instantly, improving accuracy and accelerating decision-making for smarter energy usage.',
    // Only the figure that agrees across the previous portfolio's home card and case page.
    // (Its satisfaction figure differs between the two: 45% vs 4.5 stars. Left out until confirmed.)
    metrics: [{ to: 70, suffix: '%', label: 'Accessibility' }],
    process: ['Problem identification & research', 'User flow mapping', 'Wireframing & prototyping', 'UI design', 'OCR integration planning', 'Usability testing', 'Final design & developer handoff'],
  },
  {
    slug: 'balanti',
    cat: 'design-build',
    name: 'Balanti',
    headline: 'Turning a retail brand into a digital shopping experience.',
    description: "The project involved designing and building an e-commerce MVP that translates the brand's physical retail experience into a focused digital storefront.",
    intro: balantiIntro,
    story: balantiStory,
    role: 'Product Design · UX/UI · Frontend Development · Backend Development · AI-Assisted Development',
    tags: ['Product Design', 'UX/UI', 'Vue.js', 'Django'],
    pageTags: ['Product Design', 'UX/UI', 'Frontend Development', 'Backend Development', 'AI-Assisted Development'],
    year: null,
    platform: 'E-commerce MVP',
    stack: 'Vue.js · Python/Django · Claude Code',
    location: 'Australia',
    url: 'https://balanti.com.au/',
    // Thumbnail = a frame from the hero video (the closing brand shot). The video itself plays at the top of the detail page.
    cover: img('balanti', '00-thumbnail.webp', 'Balanti: a man walks in black suede boots with the Balanti logo, Shoemakers since 2000', 1600, 900),
    heroVideo: { src: '/work/balanti/web-hero.mp4', poster: '/work/balanti/00-thumbnail.webp', w: 1920, h: 1080, label: 'Balanti hero video: walking in leather boots, ending on the Balanti logo' },
  },
  {
    slug: 'design-system-bootstrapper',
    cat: 'build',
    name: 'Design System Bootstrapper',
    headline: 'Turning repetitive Figma setup into a repeatable workflow.',
    description:
      'A Figma plugin that bootstraps a design-system foundation (variables, components, pages and documentation) into a Figma file.',
    role: 'Product Concept · Figma Plugin · AI-Assisted Development',
    tags: ['Figma Plugin', 'AI-Assisted Development', 'Automation'],
    year: '2026',
    platform: 'Figma plugin',
    // From the project's own notes. Kept short on purpose.
    process: [
      'Generates colour, typography and token variables, components, pages and documentation',
      'Seven project templates and thirteen components',
      'Safe to re-run without duplicating work',
    ],
    processLabel: 'What it does',
  },
  {
    slug: 'nedu-ai',
    cat: 'design',
    name: 'NeduAI',
    headline: 'Designing a smarter path between people, skills, education, and work.',
    description:
      'NeduAI is a European SaaS platform focused on connecting people with relevant opportunities across employment, education, learning, and career development.',
    intro: neduaiIntro,
    story: neduaiStory,
    role: 'Product · UX/UI Contribution', // a contribution within a broader product team, never sole ownership
    tags: ['Product', 'UX/UI', 'SaaS Design'],
    pageTags: ['Product', 'UX/UI Contribution', 'SaaS Design'],
    year: null,
    platform: 'Career & education technology · Europe',
  },
  {
    slug: 'afsha-hossain',
    cat: 'design-build',
    name: 'Afsha Hossain',
    headline: "Turning an author's identity into a digital experience.",
    description: "A personal website that brings an author's writing, books, stories, and creative identity together in one focused digital experience.",
    intro: afshaIntro,
    story: afshaStory,
    role: 'Product Concept · Web Design · AI-Assisted Development',
    tags: ['Product Concept', 'Web Design', 'AI-Assisted Development'],
    year: null,
    platform: 'Author website · MVP',
    location: 'Australia',
  },
  {
    slug: 'portulika',
    cat: 'design',
    name: 'Portulika',
    headline: null,
    description: null,
    role: 'UX/UI Design · Product Design',
    tags: ['UX/UI', 'Product Design'],
    year: null,
    platform: null,
  },
  {
    slug: 'hikmah',
    cat: 'design-build',
    name: 'Hikmah',
    headline: null,
    description: null,
    role: 'Product Concept · AI-Assisted Development · MVP',
    tags: ['Product Concept', 'AI-Assisted Development', 'MVP'],
    year: null,
    platform: null,
  },
]

export const featuredSlugs = ['quickcv', 'balanti', 'go-for-change', 'reportmate']
export const experimentSlugs = ['afsha-hossain', 'design-system-bootstrapper', 'hikmah']
export const additionalSlugs = ['nedu-ai', 'portulika']

// Earlier work from the previous Framer portfolio. Listed, no dedicated page.
export const otherWork = [
  { name: 'Factory Next', line: 'Redesign of a SaaS marketing website, built to be accessible and to convert.', facts: '15% conversion rate · 95% user satisfaction' },
  { name: 'E-Commerce Storefront', line: 'A storefront UI kit shared on Figma Community (Nov 2024).', facts: '100+ Figma Community users' },
]

export const bySlug = (slug) => projects.find((p) => p.slug === slug)
export const pick = (slugs) => slugs.map(bySlug).filter(Boolean)
export function nextOf(slug) {
  const i = projects.findIndex((p) => p.slug === slug)
  return projects[(i + 1) % projects.length]
}

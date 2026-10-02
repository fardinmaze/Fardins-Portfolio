// Single source of truth for all copy. Pulled from fardinpronoy.framer.website.
export const profile = {
  name: 'MD Fardin Mazumder',
  firstName: 'Fardin',
  role: 'Jr. Product Analyst & Designer',
  company: 'Catch Bangladesh Ltd.',
  headline: ['Crafting user-centric &', 'business-oriented', 'digital experiences'],
  intro:
    'Designing expressive and business-oriented digital solutions that help startups and brands stand out.',
  about:
    'I am a designer with over three years of UX/UI experience and the development chops to ship what I design. I turn messy problems into clear, expressive products that move business metrics, and I love mentoring teams along the way.',
  email: 'mazumder.mdfardin@gmail.com',
  calendly: 'https://calendly.com/mazumderfardin/15min',
  // TODO: replace with exact profile URLs
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'Dribbble', href: 'https://dribbble.com/' },
    { label: 'Instagram', href: 'https://www.instagram.com/' },
  ],
}

export const nav = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Experience', href: '#experience' },
]

export const stats = [
  { value: 3, suffix: '+', label: 'Years in UX/UI' },
  { value: 4, suffix: '', label: 'Companies' },
  { value: 900, suffix: '+', label: 'Users on QuickCV' },
  { value: 100, suffix: '+', label: 'Designers using my kit' },
]

export const services = [
  { title: 'UX/UI Design', text: 'Interfaces that are clear, expressive and tuned to how people actually behave.' },
  { title: 'Product Design', text: 'From discovery to launch — shaping features that carry real business value.' },
  { title: 'Design Systems', text: 'Scalable tokens and components so teams ship faster and stay consistent.' },
  { title: 'Front-End Development', text: 'Design that survives contact with code, built with modern web tooling.' },
  { title: 'Interaction Design', text: 'Motion and micro-interactions that add delight without adding noise.' },
  { title: 'UX Research', text: 'Interviews, testing and analysis that replace opinions with evidence.' },
  { title: 'Leadership & Mentoring', text: 'Growing designers and aligning cross-functional teams around the craft.' },
  { title: 'Design Sprints', text: 'Five-day sprints that take a risky idea to a tested prototype.' },
]

export const projects = [
  {
    title: 'Report Mate',
    kind: 'Mobile App · OCR',
    text: 'A mobile interface for equipment inspections that uses OCR to capture and file reports in seconds.',
    metrics: [{ v: '70%', l: 'Accessibility' }, { v: '4.5★', l: 'Satisfaction' }],
    colors: ['#7c3aed', '#ec4899'],
  },
  {
    title: 'QuickCV',
    kind: 'AI · Web App',
    text: 'An AI-assisted resume builder that helps people go from blank page to polished CV.',
    metrics: [{ v: '900+', l: 'Users' }, { v: '90%', l: 'Satisfaction' }],
    colors: ['#ef4444', '#a855f7'],
  },
  {
    title: 'E-Commerce Storefront',
    kind: 'Community · Figma',
    text: 'A storefront design shared with the Figma community and embraced by designers worldwide.',
    metrics: [{ v: '100+', l: 'Designers adopted' }],
    colors: ['#ec4899', '#ef4444'],
  },
  {
    title: 'Factory Next',
    kind: 'SaaS · Redesign',
    text: 'A smart, accessible redesign of a SaaS marketing website, built to convert.',
    metrics: [{ v: '+15%', l: 'Conversion' }, { v: '95%', l: 'Satisfaction' }],
    colors: ['#8b5cf6', '#ef4444'],
  },
]

export const experience = [
  { role: 'Jr. Product Analyst', company: 'Catch Bangladesh Ltd', period: 'Sep 2025 — Present' },
  { role: 'Product Designer', company: 'Zenithh Business Development', period: 'Feb 2025 — Present' },
  { role: 'UX/UI Designer', company: 'Tutors Finland Oy', period: 'Feb 2024 — Oct 2024' },
  { role: 'Jr. UI UX Designer', company: 'REPLIQ Ltd.', period: 'May 2023 — Nov 2023' },
]

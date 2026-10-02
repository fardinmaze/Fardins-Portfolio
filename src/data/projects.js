// Projects + page templates.
//
// RULES
// - Only facts the owner supplied (brief, previous Framer portfolio, own project notes) live here.
// - A missing value is `null`/absent. The UI renders a visible dashed placeholder, never invented copy.
// - To add a real asset: put the file in /public/work/<slug>/ and add { src, alt } under `visuals[sectionKey]`
//   (or `hero`). ShotFrame renders it automatically, replacing the placeholder.

export const CATEGORIES = {
  design: { key: 'design', label: 'Design' },
  build: { key: 'build', label: 'Build' },
  'design-build': { key: 'design-build', label: 'Design & Build' },
}
export const FILTERS = [{ key: 'all', label: 'All' }, ...Object.values(CATEGORIES)]

export const projects = [
  {
    slug: 'quickcv',
    cat: 'design-build',
    name: 'QuickCV',
    headline: 'Making job applications faster with AI.',
    description:
      'An AI-powered CV and cover-letter platform designed to help job seekers create, tailor, and improve application materials with less manual effort.',
    role: 'Product Analysis · UX/UI · Product Improvement',
    tags: ['Product Analysis', 'UX/UI', 'AI', 'MVP'],
    year: '2025–2026',
    platform: 'Web Application',
    metrics: [
      { to: 900, suffix: '+', label: 'Users' },
      { to: 90, suffix: '%', label: 'Satisfaction' },
    ],
    content: {
      overview: 'QuickCV helps job seekers create, tailor and improve CVs and cover letters with AI assistance, so application materials take less manual effort.',
    },
  },
  {
    slug: 'go-for-change',
    cat: 'design',
    name: 'Go for Change',
    headline: 'Turning community initiatives into a digital platform.',
    description: null,
    role: 'UX/UI Design · Product Design',
    tags: ['UX/UI', 'Product Design'],
    year: null,
    platform: null,
    content: {},
  },
  {
    slug: 'reportmate',
    cat: 'design-build',
    name: 'ReportMate',
    headline: 'Turning field reports into structured data.',
    description: 'A mobile interface for equipment inspections that uses OCR to capture and file reports.',
    role: 'Product Concept · UX/UI · MVP',
    tags: ['Product Concept', 'UX/UI', 'MVP'],
    year: null,
    platform: 'Mobile',
    metrics: [
      { to: 70, suffix: '%', label: 'Accessibility' },
      { to: 4.5, decimals: 1, suffix: '★', label: 'Satisfaction' },
    ],
    content: {
      overview: 'ReportMate is a mobile interface for equipment inspections. It uses OCR to capture and file reports.',
    },
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
    content: {
      overview:
        'Design System Bootstrapper is a Figma plugin that sets up a design-system foundation inside a Figma file: colour, typography and token variables, components, pages and documentation.',
      definition:
        'The plugin generates a design-system foundation from a short project configuration. It is deliberately scoped: it is not a website, screen or UI generator.',
    },
    // Technical facts taken from the project's own notes. Shown as a plain list under "Product Definition".
    facts: {
      definition: [
        'Generates colour, typography and token variables, components, pages and documentation.',
        'Seven project templates: default, dashboard, NGO website, government MIS, SaaS, landing page and e-commerce.',
        'Thirteen generated components.',
        'Safe to re-run: generation is idempotent and tags what it creates, so existing work is not duplicated.',
        'Built with TypeScript, React and Vite, with an automated test suite.',
      ],
    },
  },
  {
    slug: 'nedu-ai',
    cat: 'design',
    name: 'Nedu AI',
    headline: null,
    description: null,
    role: 'Product · UX/UI Contribution',
    tags: ['Product', 'UX/UI'],
    year: null,
    platform: null,
    // Attribution is intentional: this was a contribution, not sole ownership of the design.
    roleNote: 'Contribution only. Add the exact scope of your work here.',
    content: {},
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
    content: {},
  },
  {
    slug: 'hikmah',
    cat: 'build',
    name: 'Hikmah',
    headline: null,
    description: null,
    role: 'Product Concept · AI-Assisted Development · MVP',
    tags: ['Product Concept', 'AI-Assisted Development', 'MVP'],
    year: null,
    platform: null,
    content: {},
  },
]

export const featuredSlugs = ['quickcv', 'go-for-change', 'reportmate']
export const experimentSlugs = ['design-system-bootstrapper', 'hikmah']
export const additionalSlugs = ['nedu-ai', 'portulika']

// Earlier work from the previous Framer portfolio. Listed, not given pages.
export const otherWork = [
  { name: 'Factory Next', line: 'Redesign of a SaaS marketing website, built to be accessible and to convert.', facts: '+15% conversion · 95% satisfaction' },
  { name: 'E-Commerce Storefront', line: 'A storefront design shared on Figma and adopted by designers.', facts: '100+ designers adopted it' },
]

export const bySlug = (slug) => projects.find((p) => p.slug === slug)
export const pick = (slugs) => slugs.map(bySlug).filter(Boolean)
export function nextOf(slug) {
  const i = projects.findIndex((p) => p.slug === slug)
  return projects[(i + 1) % projects.length]
}

/* ---------------------------------------------------------------------------
   Page templates. The category decides which sections exist and in what order,
   so a BUILD page reads like a build log and a DESIGN page like a design story.

   kind: text | problem | visual | flow | compare | outcome
   --------------------------------------------------------------------------- */
const t = (key, title, prompt) => ({ key, title, kind: 'text', prompt })
const full = (key, title, visual) => ({ key, title, kind: 'visual', layout: 'full', visuals: [visual] })
const two = (key, title, a, b) => ({ key, title, kind: 'visual', layout: 'two', visuals: [a, b] })

export const TEMPLATES = {
  design: [
    t('context', 'Context', 'Add: the business or community context behind this project.'),
    { key: 'problem', title: 'Problem', kind: 'problem' },
    t('users', 'Users / Audience', 'Add: who this is for, based on real research.'),
    t('thinking', 'Product Thinking', 'Add: the product decisions you made and why.'),
    full('ia', 'Information Architecture', 'Information architecture'),
    full('flows', 'User Flows', 'User-flow diagram'),
    two('wireframes', 'Wireframes', 'Wireframe', 'Wireframe'),
    two('exploration', 'Visual Exploration', 'Visual direction', 'Visual direction'),
    two('system', 'Design System', 'Components', 'Tokens'),
    full('final', 'Final Experience', 'Final interface'),
    { key: 'outcome', title: 'Outcome', kind: 'outcome' },
    t('reflection', 'Reflection', 'Add: what you would do differently, and what you learned.'),
  ],
  build: [
    t('idea', 'The idea', 'Add: the problem that triggered this experiment.'),
    t('why', 'Why build it?', 'Add: the hypothesis behind building it.'),
    { key: 'definition', title: 'Product Definition', kind: 'text', prompt: 'Add: what the product actually does.' },
    {
      key: 'approach', title: 'Build Approach', kind: 'flow',
      steps: ['Idea', 'Product Definition', 'Prototype', 'AI-Assisted Development', 'Testing', 'Iteration'],
      prompt: 'Add: how the AI-assisted workflow worked on this project, step by step.',
    },
    full('mvp', 'MVP', 'Working product'),
    { key: 'changed', title: 'What changed', kind: 'compare', visuals: ['Before', 'After'], prompt: 'Add: what became faster, simpler or possible.' },
    t('learned', 'What I learned', 'Add: practical lessons from building it.'),
  ],
  'design-build': [
    t('context', 'Context', 'Add: the context behind this project.'),
    { key: 'problem', title: 'Problem', kind: 'problem' },
    t('thinking', 'Product Thinking', 'Add: the product decisions you made and why.'),
    full('flow', 'UX / User Flow', 'User flow'),
    two('exploration', 'Design Exploration', 'Exploration', 'Exploration'),
    full('interface', 'Interface Design', 'Final interface'),
    full('mvp', 'Build / MVP', 'Working MVP'),
    {
      key: 'workflow', title: 'AI-Assisted Workflow', kind: 'flow',
      steps: ['Research', 'Think', 'Design', 'Prompt', 'Prototype', 'Build', 'Iterate'],
      prompt: 'Add: where and how AI was used on this project.',
    },
    t('testing', 'Testing & Iteration', 'Add: what was tested and what changed as a result.'),
    { key: 'outcome', title: 'Outcome', kind: 'outcome' },
    t('reflection', 'Reflection', 'Add: what you would do differently, and what you learned.'),
  ],
}

// The spine shown under the hero of a DESIGN & BUILD page.
export const SPINE = ['Understand', 'Design', 'Build', 'Test', 'Improve']

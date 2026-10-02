// Site-wide copy. Project data lives in projects.js.
// Anything wrapped as { tbc: '...' } is a visible placeholder: information I do not have yet.

export const profile = {
  name: 'MD Fardin Mazumder',
  short: 'FARDIN',
  role: 'Product Analyst & Designer',
  email: 'mazumder.mdfardin@gmail.com',
  calendly: 'https://calendly.com/mazumderfardin/15min',
  framer: 'https://fardinpronoy.framer.website/',
  linkedin: 'https://www.linkedin.com/', // TODO: replace with the exact profile URL
}

export const nav = [
  { label: 'Work', to: '/work', id: 'work' },
  { label: 'About', to: { path: '/', hash: '#about' }, id: 'about' },
  { label: 'Experiments', to: { path: '/', hash: '#experiments' }, id: 'experiments' },
  { label: 'Contact', to: { path: '/', hash: '#contact' }, id: 'contact' },
]

export const hero = {
  metaLeft: 'Bangladesh → Global',
  metaRight: 'Product • UX • AI • Build',
  lead: 'I turn ideas, problems, and opportunities into digital products.',
  sub: 'From product thinking and UX to AI-assisted prototypes and functional MVPs.',
  pipeline: [
    { name: 'Idea', note: 'Problem or opportunity' },
    { name: 'Research', note: 'Users and market' },
    { name: 'Product', note: 'Scope and MVP' },
    { name: 'Design', note: 'UX and UI' },
    { name: 'Build', note: 'AI-assisted' },
    { name: 'Launch', note: 'Ship and learn' },
  ],
}

// Four things the work is made of: product thinking + design + technology + AI.
export const strip = [
  { title: 'Product thinking', items: ['Product analysis', 'User research', 'MVP definition'] },
  { title: 'Design', items: ['UX/UI', 'Interaction design', 'Design systems'] },
  { title: 'Technology', items: ['Frontend collaboration', 'Rapid prototyping', 'Figma plugins'] },
  { title: 'AI', items: ['AI-assisted development', 'Automation', 'Experiments'] },
]

export const positioning = {
  title: ['Design,', 'build, or both.'],
  design: {
    cat: 'design',
    label: 'Design',
    headline: 'Design beyond the interface.',
    text: 'I turn user needs, business goals, and complex problems into clear, useful digital experiences.',
    tags: ['UX Research', 'Product Thinking', 'UX/UI', 'Interaction Design', 'Design Systems'],
    thinkAbout: ['Users', 'Problems', 'Information architecture', 'Workflows', 'Interactions', 'Business context', 'Scalability'],
  },
  build: {
    cat: 'build',
    label: 'Build',
    headline: 'Don’t stop at the design file.',
    text: 'I experiment with AI-assisted development to turn ideas and designs into functional MVPs, micro-tools, and experiments faster.',
    tags: ['AI-Assisted Development', 'MVPs', 'Rapid Prototyping', 'Automation', 'Experiments'],
    sequence: ['Idea', 'Design', 'Working product'],
  },
  both: {
    cat: 'design-build',
    label: 'Design & Build',
    headline: 'From product idea to working experience.',
    text: 'I connect product thinking, UX/UI design, and AI-assisted development to take ideas from concept to functional product.',
    tags: ['Product Thinking', 'UX/UI', 'AI', 'MVP', 'Iteration'],
  },
  statement: 'AI accelerates implementation. I define the problem, product, workflow, and experience.',
}

export const ai = {
  title: ['AI accelerates', 'implementation.'],
  text: 'I define the problem, product, workflow, and experience. AI helps me get from idea to a working product faster.',
  steps: ['Research', 'Think', 'Design', 'Prompt', 'Prototype', 'Build', 'Iterate'],
  tools: ['Figma', 'Claude', 'Codex', 'Cursor', 'Figma Make', 'Framer'],
}

export const about = {
  title: ['More than', 'a designer.'],
  paragraphs: [
    'I started in UX/UI, moved deeper into product thinking, and now work across the space between design, technology, and business.',
    'I use research, systems thinking, design, and AI-assisted tools to move from an idea to something tangible—fast.',
  ],
  facts: [
    { big: 'BAIUST', small: 'B.Sc. Computer Science & Engineering' },
    { big: '4+ years', small: 'Digital product experience' },
  ],
  tags: ['Product', 'UX/UI', 'AI-assisted building'],
  experience: [
    { role: 'Jr. Product Analyst', org: 'Catch Bangladesh Ltd', period: 'Sep 2025 — Present' },
    { role: 'Product Designer', org: 'Zenithh Business Development', period: 'Feb 2025 — Present' },
    { role: 'UX/UI Designer', org: 'Tutors Finland Oy', period: 'Feb 2024 — Oct 2024' },
    { role: 'Jr. UI UX Designer', org: 'REPLIQ Ltd.', period: 'May 2023 — Nov 2023' },
  ],
}

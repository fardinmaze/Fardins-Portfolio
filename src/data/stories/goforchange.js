// Go for Change: condensed from the owner's Google Doc ("Designs"). Wording is the owner's; sections and
// lines were selected, not rewritten. Omitted on purpose to stay minimal: Designing for Discovery, The Initiative
// Experience, From Organization to Story, Designing Trust, Visual Design, Product Experience journey, Design System,
// What I Focused On. They can be added back as new sections.

export const goforchangeIntro = [
  'Go for Change is a social-tech platform designed to bring NGOs, changemakers, social initiatives, donors, institutions, and communities into a more connected digital ecosystem.',
  'The platform gives organizations a space to present their initiatives, share stories and impact, build visibility, and connect with people who want to engage with social change.',
]

export const goforchangeStory = [
  {
    id: 'context',
    title: 'The Context',
    blocks: [
      { t: 'p', x: 'Social-impact work is happening everywhere.' },
      { t: 'p', x: 'But much of that work remains fragmented.' },
      { t: 'p', x: 'For people outside those networks, discovering:' },
      { t: 'questions', x: ['Who is doing what?', 'Where is the work happening?', 'What impact has been created?', 'How can I get involved?'] },
      { t: 'p', x: "isn't always straightforward." },
      { t: 'p', x: 'Go for Change was envisioned as a digital space to bring these stories and initiatives closer to the people who want to discover and support them.' },
    ],
  },
  {
    id: 'challenge',
    title: 'The Challenge',
    blocks: [
      { t: 'p', x: 'The platform needed to serve very different people.' },
      {
        t: 'features',
        x: [
          { h: 'Changemakers', p: 'A place to present initiatives, stories, achievements, and organizational identity.' },
          { h: 'Citizens', p: 'A way to discover causes, initiatives, stories, and opportunities to participate.' },
          { h: 'Donors & Supporters', p: 'A way to understand initiatives and discover organizations working on issues they care about.' },
          { h: 'Institutions', p: 'A space to discover organizations, initiatives, expertise, and potential collaboration.' },
        ],
      },
      { t: 'p', x: 'The challenge was therefore not simply: **How do we make an NGO website?**' },
      { t: 'p', x: 'It was:' },
      { t: 'statement', x: 'How do we design a platform where different people can discover, understand, and engage with social-impact work?' },
    ],
  },
  {
    id: 'ux-direction',
    title: 'UX Direction',
    blocks: [
      { t: 'p', x: 'The experience was designed around three core principles:' },
      {
        t: 'features',
        x: [
          { h: 'Discover', p: 'Help people find organizations, initiatives, stories, and opportunities relevant to their interests.' },
          { h: 'Understand', p: 'Present social-impact work with enough context to make it meaningful.' },
          { h: 'Engage', p: 'Make it easier for people to participate, support, connect, or learn more.' },
        ],
      },
      { t: 'p', x: 'This creates a simple product loop:' },
      { t: 'chain', x: ['Discover', 'Understand', 'Engage'] },
    ],
  },
  {
    id: 'ecosystem',
    title: 'Organizing a Complex Ecosystem',
    blocks: [
      { t: 'p', x: "Go for Change isn't built around a single content type." },
      { t: 'p', x: 'The platform can bring together:' },
      { t: 'list', x: ['Organizations', 'Initiatives', 'Stories', 'Events', 'Opportunities', 'Research', 'Publications', 'Social-impact content'] },
      { t: 'p', x: 'The challenge was to provide enough structure without making the platform feel like an administrative database.' },
      { t: 'figure', placeholder: 'key screens' },
    ],
  },
  {
    id: 'role',
    title: 'My Role',
    blocks: [
      { t: 'p', x: 'I worked as the **UX/UI Designer and Product Designer**, focusing on how the platform could organize a large amount of social-impact information into an accessible digital experience.' },
      { t: 'p', x: 'My work included:' },
      {
        t: 'list',
        x: [
          'UX/UI design',
          'Information architecture',
          'User flows',
          'Interface design',
          'Content hierarchy',
          'Responsive experience',
          'Design system',
          'Platform navigation',
          'Initiative and organization presentation',
        ],
      },
    ],
  },
  {
    id: 'outcome',
    title: 'Outcome',
    blocks: [
      { t: 'p', x: 'Go for Change became a digital platform for presenting and discovering social-impact work rather than a conventional organization website.' },
      { t: 'p', x: 'The experience provides a structured environment where organizations and changemakers can showcase initiatives, stories, and other content while creating pathways for broader engagement.' },
    ],
  },
  {
    id: 'reflection',
    title: 'Reflection',
    blocks: [
      { t: 'p', x: "The difficult part wasn't designing a single beautiful interface." },
      { t: 'p', x: 'It was designing **a system for many stories, many organizations, and many types of people**.' },
      { t: 'statement', x: 'Good platform design makes complexity feel navigable.' },
    ],
  },
]

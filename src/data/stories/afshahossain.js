// Afsha Hossain: condensed from the owner's Google Doc ("Designs"). Wording is the owner's; sections and lines were
// selected, not rewritten. Left out to stay short: From Identity to Interface, Designing for Reading,
// The Product Thinking, What I Learned, the closing BUILD block.

export const afshaIntro = [
  'Afsha Hossain is an author, writer, and storyteller. This project was about creating a personal website that brings her writing, books, stories, and creative identity together in one focused digital experience.',
  "The goal was not simply to build an author website. It was to create a digital home for a writer's work.",
]

export const afshaStory = [
  {
    id: 'idea',
    title: 'The Idea',
    blocks: [
      { t: 'p', x: 'An author website has a different purpose from a conventional business website.' },
      { t: 'p', x: "It needs to communicate a person's identity while giving their work enough space to speak for itself." },
      { t: 'p', x: 'The experience needed to connect:' },
      { t: 'chain', x: ['Person', 'Stories', 'Books', 'Writing', 'Audience'] },
      { t: 'p', x: 'without making the website feel like a generic portfolio.' },
    ],
  },
  {
    id: 'challenge',
    title: 'The Challenge',
    blocks: [
      { t: 'p', x: "An author's work is deeply personal." },
      { t: 'p', x: 'The website therefore needed to feel:' },
      { t: 'list', x: ['Personal', 'Editorial', 'Immersive', 'Readable'] },
      { t: 'p', x: 'while still being easy to navigate.' },
      { t: 'statement', x: "How do you turn a writer's body of work into a digital experience without letting the website overshadow the writing?" },
    ],
  },
  {
    id: 'built',
    title: 'What I Built',
    blocks: [
      { t: 'p', x: "The website was structured around the author's identity and creative work." },
      { t: 'p', x: 'Key areas included:' },
      {
        t: 'list',
        x: ['Author introduction', 'Writing and storytelling', 'Book presentation', 'Creative work', 'About / author profile', 'Content discovery', 'Contact / audience connection'],
      },
      { t: 'p', x: "The experience gives the author's work the visual priority while keeping navigation simple." },
      { t: 'figure', placeholder: 'website screenshot' },
    ],
  },
  {
    id: 'ai',
    title: 'From Concept to a Working Website',
    blocks: [
      { t: 'p', x: 'This project was built as a practical example of my AI-assisted development workflow.' },
      { t: 'p', x: 'Rather than stopping at a Figma design, I took the concept into implementation and developed the working website with AI-assisted coding.' },
      { t: 'p', x: 'The workflow was:' },
      { t: 'chain', x: ['Understand', 'Structure', 'Design', 'Build', 'Refine'] },
      { t: 'p', x: 'The process involved defining:' },
      { t: 'list', x: ['The content structure', 'Page hierarchy', 'Visual direction', 'Interaction requirements', 'Responsive behavior', 'Component requirements'] },
      { t: 'p', x: 'Then using AI to accelerate implementation and iteration.' },
    ],
  },
  {
    id: 'outcome',
    title: 'Outcome',
    blocks: [
      { t: 'p', x: "The result is a dedicated digital home for Afsha Hossain's identity and creative work, bringing her author profile and storytelling into a single web experience." },
      { t: 'p', x: 'More importantly, it demonstrates how AI-assisted development can be used to move quickly from a creative direction to a finished digital experience.' },
      { t: 'statement', x: 'Build less. Communicate more.' },
    ],
  },
]

// NeduAI: condensed from the owner's Google Doc ("Designs"). Wording is the owner's; sections and lines were
// selected, not rewritten. The role stays framed as a CONTRIBUTION within a broader product team, never sole ownership.
// Omitted on purpose to stay minimal: Designing for Two Sides, From Profile to Opportunity, Designing the Career
// Assistant, Organization Experience, Designing Complexity Into Clarity, Design System, The Core UX Model,
// The Design Challenge in One Sentence, the closing DESIGN block.

export const neduaiIntro = [
  'NeduAI is a European SaaS platform focused on connecting people with relevant opportunities across employment, education, learning, and career development.',
  "At the center of the platform is SmartProfile — a profile that brings together a person's experience, skills, interests, and learning needs to support more personalized career and education guidance.",
]

export const neduaiStory = [
  {
    id: 'context',
    title: 'The Context',
    blocks: [
      { t: 'p', x: 'Career development is rarely a straight line.' },
      { t: 'p', x: 'A person may need to:' },
      { t: 'chain', x: ['Understand their skills', 'Find suitable jobs', 'Identify skill gaps', 'Explore education', 'Learn new skills', 'Move toward a new career opportunity'] },
      { t: 'p', x: 'Traditional platforms often separate these activities.' },
      { t: 'p', x: "NeduAI's vision is to connect these parts through a more intelligent, personalized platform." },
    ],
  },
  {
    id: 'challenge',
    title: 'The Product Challenge',
    blocks: [
      { t: 'p', x: 'NeduAI is not a single-purpose application. It serves multiple sides of the career ecosystem.' },
      {
        t: 'features',
        x: [
          { h: 'For individuals', p: 'People can create a SmartProfile, discover relevant jobs and education opportunities, and receive career guidance.' },
          { h: 'For organizations', p: 'Employment regions, universities, and other organizations can use the platform for candidate matching, workforce insights, skill-gap analysis, and workflow automation.' },
        ],
      },
      { t: 'p', x: 'This creates a significant UX challenge:' },
      { t: 'statement', x: 'How do you make a complex career ecosystem feel simple for every type of user?' },
    ],
  },
  {
    id: 'smartprofile',
    title: 'SmartProfile',
    blocks: [
      { t: 'p', x: 'SmartProfile is the conceptual center of the platform.' },
      { t: 'p', x: "Rather than treating a profile as a static CV, NeduAI uses it as a structured representation of a person's professional and learning context." },
      { t: 'statement', x: "Your profile isn't just who you are. It helps determine where you can go next." },
      { t: 'figure', placeholder: 'SmartProfile screen' },
    ],
  },
  {
    id: 'recommendations',
    title: 'Making Recommendations Understandable',
    blocks: [
      { t: 'p', x: 'Personalized matching is only useful if users understand why something is relevant.' },
      { t: 'chain', x: ['Your skills', 'Job requirements', 'Relevant match', 'Possible skill gap', 'Suggested next step'] },
      { t: 'p', x: 'The interface becomes a tool for understanding opportunities—not simply displaying them.' },
    ],
  },
  {
    id: 'role',
    title: 'My Role',
    blocks: [
      { t: 'p', x: 'I contributed to the **product and UX/UI design** of NeduAI, working within a broader product team.' },
      { t: 'p', x: 'My contribution involved translating complex product capabilities into clear user experiences and interfaces.' },
      { t: 'p', x: 'Areas of work included:' },
      {
        t: 'list',
        x: [
          'UX/UI design',
          'Product interface design',
          'User flows',
          'Information architecture',
          'Dashboard experiences',
          'Interaction patterns',
          'Responsive interfaces',
          'Design system and reusable components',
          'Product feature visualization',
        ],
      },
    ],
  },
  {
    id: 'reflection',
    title: 'Reflection',
    blocks: [
      { t: 'statement', x: 'The more powerful the system becomes, the more important simplicity becomes.' },
      { t: 'p', x: "Good UX doesn't hide complexity by removing capability." },
      { t: 'p', x: 'It makes complexity **understandable and actionable**.' },
    ],
  },
]

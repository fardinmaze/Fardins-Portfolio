// Balanti: condensed from the owner's Google Doc ("Designs"). Wording is the owner's; sections and lines were
// selected, not rewritten. Left out to stay short: The Context, From Brand to Product, Product Discovery,
// Product Detail Experience, Responsive E-commerce, Designing the Foundation, Why This Workflow Matters,
// the Design & Build summary, MVP Approach, Reflection, and the closing DESIGN / BUILD blocks.

export const balantiIntro = [
  'Balanti is an Australia-based footwear retailer focused on premium leather shoes, including Oxfords and loafers.',
  "The project involved designing and building an e-commerce MVP that translates the brand's physical retail experience into a focused digital storefront.",
]

export const balantiStory = [
  {
    id: 'challenge',
    title: 'The Challenge',
    blocks: [
      { t: 'p', x: 'Shoes are highly visual products.' },
      { t: 'p', x: 'Customers need to understand:' },
      {
        t: 'questions',
        x: ['What does it look like?', 'How does it fit my style?', 'What material is it?', 'Which colour should I choose?', 'What size do I need?', 'Is this product worth buying?'],
      },
      { t: 'p', x: 'The interface therefore needed to provide enough product information without creating unnecessary friction.' },
      { t: 'p', x: 'The challenge became:' },
      { t: 'statement', x: 'How do we make a relatively simple product catalogue feel like a trustworthy shopping experience?' },
    ],
  },
  {
    id: 'journey',
    title: 'The Shopping Journey',
    blocks: [
      { t: 'p', x: 'The core experience was structured around a straightforward customer journey:' },
      {
        t: 'steps',
        x: [
          { n: '01', h: 'Discover', p: 'Browse the footwear collection.' },
          { n: '02', h: 'Explore', p: 'Open a product and understand its details.' },
          { n: '03', h: 'Evaluate', p: 'Review imagery, product information, variations, and other relevant details.' },
          { n: '04', h: 'Decide', p: 'Select the appropriate product options.' },
          { n: '05', h: 'Purchase', p: 'Move through the purchase flow with minimal friction.' },
        ],
      },
      { t: 'p', x: 'The design goal was to keep the customer focused on the product rather than the interface itself.' },
      { t: 'figure', placeholder: 'storefront screens' },
    ],
  },
  {
    id: 'role',
    title: 'My Role',
    blocks: [
      { t: 'p', x: 'I worked across both **design and development**, taking the product from interface concepts into a functional MVP.' },
      { t: 'p', x: 'My work included:' },
      {
        t: 'list',
        x: [
          'Product structure',
          'UX/UI design',
          'E-commerce user flows',
          'Responsive interface design',
          'Frontend development',
          'Backend development',
          'Product and catalogue structure',
          'Interaction design',
          'MVP implementation',
          'Testing and iteration',
        ],
      },
      { t: 'p', x: 'Technology:' },
      { t: 'list', x: ['Frontend: Vue.js', 'Backend: Python · Django', 'Development workflow: Claude Code'] },
    ],
  },
  {
    id: 'build',
    title: 'From Interface to Working MVP',
    blocks: [
      { t: 'p', x: 'Balanti became an opportunity to move beyond design files and implement the actual product.' },
      { t: 'p', x: 'The frontend was developed using **Vue.js**, while the backend was built with **Python and Django**.' },
      { t: 'p', x: 'This allowed the product experience and underlying data structure to be developed together.' },
      { t: 'p', x: 'The basic architecture can be understood as:' },
      { t: 'chain', x: ['Customer Interface', 'Vue.js Frontend', 'Django Backend', 'Product & Commerce Data'] },
      { t: 'figure', placeholder: 'working storefront' },
    ],
  },
  {
    id: 'ai',
    title: 'AI-Assisted Development',
    blocks: [
      { t: 'p', x: 'A significant part of the implementation was accelerated through **Claude Code**.' },
      { t: 'p', x: 'Instead of treating AI as a replacement for development, I used it as an implementation partner.' },
      { t: 'p', x: 'The workflow was:' },
      { t: 'chain', x: ['Define', 'Design', 'Prompt', 'Implement', 'Test', 'Refine'] },
      { t: 'p', x: 'I still made the product and UX decisions.' },
      { t: 'p', x: 'Claude Code helped accelerate the translation of those decisions into working frontend and backend functionality.' },
    ],
  },
  {
    id: 'outcome',
    title: 'Outcome',
    blocks: [
      { t: 'p', x: 'Balanti launched as a functional e-commerce MVP for the Australian footwear brand.' },
      { t: 'p', x: 'More importantly, it demonstrated a workflow I am increasingly interested in:' },
      { t: 'statement', x: 'Taking a product from idea → design → working MVP.' },
    ],
  },
  {
    id: 'learned',
    title: 'What I Learned',
    blocks: [
      { t: 'statement', x: 'A good e-commerce experience is not about adding more features.' },
      { t: 'p', x: 'It is about reducing uncertainty between:' },
      { t: 'chain', x: ['"I like this product."', '"I\'m confident enough to buy it."'] },
      { t: 'p', x: 'Design and development therefore cannot be treated as completely separate activities.' },
    ],
  },
]

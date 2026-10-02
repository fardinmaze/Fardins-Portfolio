// QuickCV case study. Copy supplied by the owner; do not reword without asking.
//
// Block types (rendered by components/project/StoryBlocks.vue)
//   p          paragraph. **double asterisks** = bold
//   lines      short stacked lines
//   questions  stacked bold questions
//   list       bullet list
//   statement  large pull statement
//   features   [{ h, p }] definition grid
//   chain      inline flow: a → b → c
//   connect    stacked items joined by short connector lines of text
//   steps      [{ n, h, p }] numbered rows
//   tree       product architecture diagram
//   metrics    big numbers, with optional `note` placeholder
//   pair       DESIGN / BUILD side by side
//   figure     real images, or { placeholder } when the screenshot does not exist yet

const img = (file, alt, w, h, span = 'full') => ({ src: `/work/quickcv/${file}`, alt, w, h, span })

export const quickcvIntro = [
  'QuickCV is a professional profile platform built to help young professionals create, manage, customize, and track everything they need throughout their job-search journey.',
  'Instead of maintaining separate tools for a CV, cover letter, portfolio, job-specific applications, and application tracking, QuickCV brings them together in one place.',
]

export const quickcvStory = [
  {
    id: 'problem',
    title: 'The Problem',
    blocks: [
      { t: 'p', x: 'For many young professionals, applying for jobs becomes a repetitive and disconnected process.' },
      { t: 'lines', x: ['They create one CV.', 'Write a basic cover letter.', 'Apply to another job.', 'Then repeat the same process again.'] },
      { t: 'p', x: 'The problem is that **every job is different**.' },
      { t: 'p', x: 'A company may be looking for a specific set of skills, experience, or qualities — but applicants often send the same CV and a generic cover letter without adapting their application to the job.' },
      { t: 'p', x: 'And once applications start piling up, another problem appears:' },
      { t: 'questions', x: ['Where did I apply?', 'When did I apply?', 'Which CV did I use?', 'Did they respond?', 'What should I follow up on?'] },
      { t: 'p', x: 'The job search becomes difficult to manage.' },
    ],
  },
  {
    id: 'opportunity',
    title: 'The Opportunity',
    blocks: [
      { t: 'p', x: 'The opportunity was bigger than building another CV generator.' },
      { t: 'statement', x: "What if a person's professional profile could become the foundation for their entire job search?" },
      { t: 'p', x: 'Instead of creating application materials from scratch every time, users could build their professional identity once and reuse it intelligently across different opportunities.' },
      { t: 'p', x: 'That became the foundation of QuickCV.' },
    ],
  },
  {
    id: 'product',
    title: 'The Product',
    blocks: [
      { t: 'p', x: 'QuickCV brings the core elements of a professional job search into one platform.' },
      {
        t: 'features',
        x: [
          { h: 'Professional Profile', p: "A centralized profile containing the user's professional information, experience, education, skills, and other relevant details." },
          { h: 'CV', p: 'Create and maintain professional CVs from the information stored in the profile.' },
          { h: 'Cover Letter', p: 'Create application-specific cover letters instead of relying on the same generic letter for every opportunity.' },
          { h: 'Portfolio', p: "Present professional work and achievements as part of the user's overall professional identity." },
          { h: 'JD-Based CV', p: 'Customize a CV around a specific job description, helping users create a more relevant application for the role.' },
          { h: 'Application Tracker', p: 'Keep track of applications, companies, positions, dates, statuses, and follow-ups.' },
        ],
      },
      { t: 'p', x: 'Together, these features create a single workflow:' },
      { t: 'chain', x: ['Build your profile', 'Create your materials', 'Customize for the job', 'Apply', 'Track the application'] },
      {
        t: 'figure',
        images: [
          img('02-sign-in-up.webp', 'QuickCV sign-in and sign-up screens', 1800, 1350),
          img('03-onboarding.webp', 'QuickCV onboarding screen: sign up and set up your profile', 1200, 1500, 'half'),
          img('04-work-experience.webp', 'QuickCV work experience screen in the professional profile', 1200, 1500, 'half'),
        ],
      },
    ],
  },
  {
    id: 'idea',
    title: 'The Product Idea',
    blocks: [
      { t: 'p', x: 'The central idea behind QuickCV is simple:' },
      { t: 'statement', x: 'Build once. Customize when it matters. Track everything.' },
      { t: 'p', x: "The user's professional information should not need to be recreated every time they apply for a job." },
      { t: 'p', x: 'Instead, the platform maintains a structured professional profile that can power different application materials.' },
      { t: 'p', x: 'This turns the CV from a static document into part of a larger professional system.' },
    ],
  },
  {
    id: 'profile-to-application',
    title: 'From Professional Profile to Application',
    blocks: [
      { t: 'p', x: "The experience starts with the user's professional profile." },
      { t: 'p', x: 'That profile becomes the source for:' },
      { t: 'list', x: ['CV', 'Cover Letter', 'Portfolio', 'Job-Specific CV', 'Application History'] },
      { t: 'p', x: 'This creates a connected product ecosystem rather than a collection of independent tools.' },
    ],
  },
  {
    id: 'relevance',
    title: 'Making Every Application More Relevant',
    blocks: [
      { t: 'p', x: 'One of the key problems QuickCV addresses is the tendency to use the same application for every opportunity.' },
      { t: 'p', x: 'A job description provides context.' },
      { t: 'p', x: 'QuickCV uses that context to help users adapt their application.' },
      { t: 'p', x: 'The workflow becomes:' },
      { t: 'chain', x: ['Job Description', 'Analyze Requirements', 'Identify Relevant Experience', 'Customize CV', 'Create Relevant Cover Letter', 'Apply'] },
      { t: 'p', x: "The goal isn't simply to generate more content." },
      { t: 'p', x: 'The goal is to help users create an application that is **more relevant to the opportunity they are pursuing**.' },
      { t: 'figure', placeholder: 'JD-based CV screen' },
    ],
  },
  {
    id: 'tracking',
    title: 'Application Tracking',
    blocks: [
      { t: 'p', x: 'Creating an application is only half the journey.' },
      { t: 'p', x: 'Once someone starts applying to multiple positions, keeping track of them becomes difficult.' },
      { t: 'p', x: 'QuickCV introduces an application-tracking layer so users can maintain visibility over their job search.' },
      { t: 'p', x: 'Users can keep track of:' },
      { t: 'list', x: ['Company', 'Position', 'Application date', 'Application status', 'Relevant application materials', 'Follow-up information'] },
      { t: 'p', x: 'Instead of remembering everything manually, the platform becomes a central record of the job search.' },
      { t: 'figure', placeholder: 'Application tracker screen' },
    ],
  },
  {
    id: 'ux-challenge',
    title: 'UX Challenge',
    blocks: [
      { t: 'p', x: 'The platform brings several different workflows together.' },
      { t: 'p', x: 'That creates a fundamental UX challenge:' },
      { t: 'statement', x: 'How do you make a multi-purpose platform feel simple?' },
      { t: 'p', x: "A user shouldn't have to understand the entire system before they can accomplish one task." },
      { t: 'p', x: 'The experience therefore needs to make individual actions clear while maintaining a connection between them.' },
      { t: 'p', x: 'For example:' },
      {
        t: 'connect',
        x: [
          { b: 'Create a CV', c: 'should naturally connect to:' },
          { b: 'Customize it for a job', c: 'which can connect to:' },
          { b: 'Create a cover letter', c: 'which can connect to:' },
          { b: 'Track the application' },
        ],
      },
      { t: 'p', x: 'The product experience should guide users through these relationships without making the interface feel overwhelming.' },
    ],
  },
  {
    id: 'role',
    title: 'My Role',
    blocks: [
      { t: 'p', x: 'I worked across **product analysis, UX/UI design, and product improvement**, helping shape how the different parts of the platform connect.' },
      { t: 'p', x: 'My work included:' },
      {
        t: 'list',
        x: [
          'Product analysis',
          'User-flow analysis',
          'UX/UI design',
          'Feature and workflow improvement',
          'Information architecture',
          'Interface design',
          'Product usability evaluation',
          'AI-powered feature exploration',
          'Iteration based on product behavior',
        ],
      },
      { t: 'p', x: 'The role was not limited to designing individual screens.' },
      { t: 'p', x: 'A major part of the work was understanding how the different product capabilities could work together as one experience.' },
    ],
  },
  {
    id: 'experience-design',
    title: 'Designing the Experience',
    blocks: [
      { t: 'p', x: "The interface was structured around the user's journey rather than treating each feature as an isolated tool." },
      { t: 'p', x: 'The product needed to answer a simple question at every stage:' },
      { t: 'statement', x: 'What does the user need to do next?' },
      { t: 'p', x: 'The experience therefore focuses on:' },
      { t: 'list', x: ['Clear navigation', 'Progressive actions', 'Reusable professional information', 'Context-aware customization', 'Visible application status'] },
      { t: 'p', x: 'The objective was to reduce the cognitive load of managing a job search.' },
    ],
  },
  {
    id: 'ai',
    title: 'AI as an Assistant',
    blocks: [
      { t: 'p', x: 'AI becomes useful when it has context.' },
      { t: 'p', x: "Instead of treating AI as a generic writing tool, QuickCV connects it with the user's professional profile and the job they are applying for." },
      { t: 'p', x: 'That creates more useful interactions around:' },
      { t: 'list', x: ['CV rewriting', 'Job-description analysis', 'CV customization', 'Cover-letter generation', 'Tone adjustment', 'Content improvement', 'ATS-oriented suggestions'] },
      { t: 'p', x: 'The principle is:' },
      { t: 'statement', x: 'Give AI the context. Let the user stay in control.' },
      { t: 'p', x: 'AI assists the user in preparing an application, while the user remains responsible for the final content and decision.' },
    ],
  },
  {
    id: 'architecture',
    title: 'Product Architecture',
    blocks: [
      { t: 'p', x: 'At the center of QuickCV is the **Professional Profile**.' },
      { t: 'p', x: 'From that foundation, different product experiences branch out:' },
      { t: 'tree', root: 'Professional Profile', branches: ['CV', 'Cover Letter', 'Portfolio', 'JD-Based CV'], then: ['Job Application', 'Application Tracker'] },
      { t: 'p', x: "This structure creates a connected ecosystem around the user's professional identity." },
    ],
  },
  {
    id: 'flow',
    title: 'The Experience in One Flow',
    blocks: [
      {
        t: 'steps',
        x: [
          { n: '01', h: 'Build', p: 'Create your professional profile once.' },
          { n: '02', h: 'Prepare', p: 'Generate and maintain your CV, cover letter, and portfolio.' },
          { n: '03', h: 'Customize', p: 'Adapt your application to the specific job description.' },
          { n: '04', h: 'Apply', p: 'Use the relevant materials for the opportunity.' },
          { n: '05', h: 'Track', p: 'Record the application and monitor its progress.' },
          { n: '06', h: 'Repeat', p: 'Return to the same professional profile for the next opportunity.' },
        ],
      },
      { t: 'p', x: "The user shouldn't have to start over every time." },
    ],
  },
  {
    id: 'iteration',
    title: 'Product Iteration',
    blocks: [
      { t: 'p', x: 'The product evolved through observation of how users interacted with its different capabilities.' },
      { t: 'p', x: 'This created opportunities to improve:' },
      { t: 'list', x: ['onboarding', 'product discoverability', 'professional profile setup', 'application workflows', 'AI-assisted interactions', 'content creation', 'application management', 'engagement'] },
      { t: 'p', x: 'The focus was not simply on adding features.' },
      { t: 'p', x: 'It was on making the growing number of capabilities feel like **one coherent product**.' },
    ],
  },
  {
    id: 'results',
    title: 'Results',
    blocks: [
      { t: 'p', x: 'During the period of my involvement, QuickCV showed measurable improvements across key product metrics.' },
      {
        t: 'metrics',
        x: [
          { to: 42, prefix: '+', suffix: '%', label: 'Onboarding improvement' },
          { to: 25, prefix: '+', suffix: '%', label: 'Retention improvement' },
          { to: 84, prefix: '+', suffix: '%', label: 'Increase in time spent' },
        ],
      },
      { t: 'p', x: 'The platform also reached **5,000+ users** during the later stage of my involvement.' },
      // Owner's drafting note, kept visible as a to-do rather than published as copy.
      { t: 'tbc', x: 'Add the measurement period and method for these metrics.' },
    ],
  },
  {
    id: 'learned',
    title: 'What This Project Changed for Me',
    blocks: [
      { t: 'p', x: 'QuickCV reinforced a product principle I continue to use:' },
      { t: 'statement', x: "Don't design the feature. Design the relationship between the features." },
      { t: 'p', x: 'A CV builder can solve CV creation.' },
      { t: 'p', x: 'A cover-letter generator can solve cover letters.' },
      { t: 'p', x: 'An application tracker can solve tracking.' },
      { t: 'p', x: 'But the larger product opportunity exists in connecting them.' },
      { t: 'p', x: 'The real experience is:' },
      { t: 'chain', x: ['Professional Identity', 'Application', 'Opportunity', 'Follow-up'] },
      { t: 'p', x: 'That is where product thinking becomes more important than individual screens.' },
    ],
  },
  {
    id: 'design-build',
    title: null, // the two blocks carry their own DESIGN / BUILD labels
    aria: 'Design and Build',
    blocks: [
      {
        t: 'pair',
        x: [
          {
            cat: 'design',
            label: 'Design',
            h: 'Designing beyond the interface.',
            p: 'My role in QuickCV went beyond creating individual screens.\n\nI worked with the product structure, user flows, information architecture, and interaction patterns needed to connect multiple job-search workflows into one coherent experience.\n\nThe goal was to make a complex product feel simple while keeping enough flexibility for different types of job seekers.',
          },
          {
            cat: 'build',
            label: 'Build',
            h: 'Turning product ideas into useful experiences.',
            p: 'QuickCV also represents my growing interest in AI-assisted product development.\n\nAI can accelerate repetitive implementation and content workflows, but the product still needs a clear problem, useful structure, and intentional experience.\n\nMy approach is:',
            chain: ['Understand', 'Define', 'Design', 'Build', 'Test', 'Improve'],
          },
        ],
      },
    ],
  },
  {
    id: 'reflection',
    title: 'Reflection',
    blocks: [
      { t: 'p', x: 'QuickCV started with a simple observation:' },
      { t: 'statement', x: "Young professionals don't just need a CV. They need a better way to manage their professional identity and job search." },
      { t: 'p', x: 'A professional profile can become the foundation.' },
      { t: 'p', x: 'The CV becomes an output.' },
      { t: 'p', x: 'The cover letter becomes contextual.' },
      { t: 'p', x: 'The portfolio becomes part of the identity.' },
      { t: 'p', x: 'The application tracker keeps the journey organized.' },
      { t: 'p', x: 'And AI can help connect the pieces.' },
      { t: 'statement', x: 'One profile. Every opportunity.', big: true },
    ],
  },
]

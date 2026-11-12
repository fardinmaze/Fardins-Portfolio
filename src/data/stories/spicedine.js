// Spice Dine: written from the project's own notes (spice-dine/PROJECT_BRIEF.md, PROGRESS.md) and the live site
// https://spice-dine.vercel.app. No metrics or outcomes were invented. Owner to review wording, role and year.

// Screenshots of the live site, captured for this portfolio (headless Chrome, 1440 px wide).
const shot = (file, alt, w, h, span = 'full') => ({ src: `/work/spice-dine/${file}`, alt, w, h, span })

export const spicedineIntro = [
  'Spice Dine is a halal Bangladeshi restaurant in Woolloongabba, Brisbane. This project was a website that gives the kitchen a clear, brand-led home online and sends hungry visitors straight to ordering.',
  'The goal was not to rebuild an ordering system. It was to make the food, the story and the next step obvious.',
]

export const spicedineStory = [
  {
    id: 'brief',
    title: 'The Brief',
    blocks: [
      { t: 'p', x: 'The restaurant already took orders through an existing platform, Yumbo Jumbo. What it lacked was a website with its own identity.' },
      { t: 'p', x: 'The site needed to:' },
      { t: 'list', x: ['Show Bangladeshi cuisine through strong food photography', 'Build trust with locals and new customers', 'Be easy to find and use on a phone', 'Send people to order online at every opportunity'] },
      { t: 'statement', x: 'How do you make a restaurant website that sells, without rebuilding the ordering system behind it?' },
    ],
  },
  {
    id: 'journey',
    title: 'The Customer Journey',
    blocks: [
      { t: 'p', x: 'Everything on the site was shaped around one path:' },
      { t: 'chain', x: ['Visit', 'Explore the menu', 'Choose a dish', 'Order online'] },
      { t: 'p', x: 'The "Order online" action sits in the header, the hero and the menu, and always goes to the existing ordering platform. The hero leads with a clear promise and a promo video, and the top bar states the practical facts: halal kitchen, catering available, open seven days.' },
      {
        t: 'figure',
        images: [
          shot('01-home.webp', 'Spice Dine home page: Big flavour, cooked fresh in Brisbane, with Order online and See the menu buttons', 1440, 1100),
          shot('04-mobile-home.webp', 'Spice Dine home page on mobile with the same headline, stacked buttons and hero video', 500, 1000, 'half'),
        ],
      },
    ],
  },
  {
    id: 'menu',
    title: 'Making a Big Menu Easy to Browse',
    blocks: [
      { t: 'p', x: 'The menu is large, with dozens of dishes across eleven categories, from Biryani & Tehari to Street Food & Snacks and Drinks & Desserts.' },
      { t: 'p', x: 'The design keeps it scannable:' },
      { t: 'list', x: ['Category navigation that stays in view', 'Dotted price lines for quick reading', 'Short tags such as Spicy and Popular', 'Real photography beside the dishes it belongs to'] },
      { t: 'p', x: 'Prices and dishes match the restaurant\'s live ordering menu.' },
      {
        t: 'figure',
        images: [
          shot('02-menu.webp', 'Spice Dine menu with category sidebar, Biryani & Tehari and Curries & Bhuna lists with prices and dish photos', 1440, 1200),
          shot('03-combo-street.webp', 'Spice Dine Combo Deals and Street Food & Snacks menu sections with Popular tags and photos', 1440, 1700),
        ],
      },
    ],
  },
  {
    id: 'ondemand',
    title: 'Designing for How the Kitchen Works',
    blocks: [
      { t: 'p', x: 'Some dishes are slow-cooked to order. Rather than hiding that, the menu gives them their own "On Demand" tab and a clear note: order today, pick up or dine in tomorrow.' },
      { t: 'p', x: 'Catering is handled the same way: a dedicated section and an enquiry form, because large and pre-orders go through catering rather than the online checkout. Submitted forms open a ready-written WhatsApp message to the restaurant, a channel the owners already use.' },
    ],
  },
  {
    id: 'client',
    title: 'Working With Client Feedback',
    blocks: [
      { t: 'p', x: 'The first direction was refined through client feedback:' },
      {
        t: 'list',
        x: ['English only, in Australian English, for a broad audience', 'A cart was tried, then removed so that all ordering goes through one platform', 'The real menu replaced placeholder dishes', 'Client photos and the promo video replaced stock imagery', 'Forms were redirected to WhatsApp'],
      },
      { t: 'p', x: 'Every change made the site simpler and closer to how the business actually runs.' },
    ],
  },
  {
    id: 'reel',
    title: 'The Launch Reel',
    blocks: [
      { t: 'p', x: 'To announce the new website, a short vertical reel was made for social channels.' },
      {
        t: 'video',
        src: '/work/spice-dine/launch-reel.mp4',
        poster: '/work/spice-dine/05-video-poster.webp',
        w: 1080,
        h: 1920,
        label: 'Spice Dine website launch reel: A new digital experience',
      },
    ],
  },
  {
    id: 'ai',
    title: 'From Design to a Live Website',
    blocks: [
      { t: 'p', x: 'The site was designed and built end to end as a working product, not stopped at a mock-up.' },
      { t: 'p', x: 'It is built with Vue 3 and Vite, with all content in data files rather than in components, so menu and hours can be updated without touching layout code. Pushes to the main branch deploy automatically to Vercel.' },
      { t: 'statement', x: 'A restaurant website should make the next meal one tap away.' },
    ],
  },
]

// Single source of truth for Samar Nagpal's portfolio.
// Written as an editorial record — no invented metrics, no fake clients.
// Every figure and name here comes from Samar's actual experience.

export const ACCENTS = {
  coral: "#ff5a36",
  pink: "#e2879f",
  lavender: "#b3a6ef",
  lime: "#c9d661",
  paper: "#f3efe6",
} as const;

export const profile = {
  name: "Samar Nagpal",
  role: "Digital Marketing & Social Media",
  location: "Jaipur, India",
  email: "samarnagpal09@gmail.com",
  phone: "+91 80034 98675",
  phoneHref: "+918003498675",
  linkedin: "https://www.linkedin.com/in/samar-nagpal-222577262/",
  linkedinHandle: "samar-nagpal",
};

// Small annotations printed around the edges, like notes on a contact sheet.
export const edgeMeta = {
  topLeft: "01 — PERSONAL INDEX",
  role: "DIGITAL MARKETING",
  focus: "SOCIAL MEDIA · CONTENT",
  location: "JAIPUR · IN",
  rev: "REV 2026.1",
};

// Nav + page index. `accent` tints the running index numeral per section.
export const toc = [
  { id: "top", n: "01", label: "Intro", nav: null, accent: ACCENTS.coral },
  { id: "about", n: "02", label: "Profile", nav: null, accent: ACCENTS.paper },
  { id: "experience", n: "03", label: "Experience", nav: "Experience", accent: ACCENTS.coral },
  { id: "work", n: "04", label: "Work", nav: "Work", accent: ACCENTS.pink },
  { id: "expertise", n: "05", label: "Expertise", nav: "Expertise", accent: ACCENTS.lavender },
  { id: "toolkit", n: "06", label: "Toolkit", nav: null, accent: ACCENTS.lavender },
  { id: "education", n: "07", label: "Education", nav: null, accent: ACCENTS.paper },
  { id: "contact", n: "08", label: "Contact", nav: "Contact", accent: ACCENTS.lime },
];

export const hero = {
  eyebrow: "Social media · Content · Digital storytelling",
  // Rendered line by line, masked reveal.
  lines: ["I make brands", "worth", "stopping for."],
  emphasisWord: "worth", // rendered in serif italic accent
  descriptor:
    "Digital marketing and social media — from the first idea to the post that stops the scroll.",
  disciplines: ["Digital Marketing", "Social Media", "Content Strategy"],
  place: "Jaipur / India",
};

export const about = {
  kicker: "02 — Profile",
  title: "Beyond the feed.",
  lead: "The person behind the posts.",
  body: "Samar Nagpal is a digital marketing and social media professional based in Jaipur. He works across brand management, content strategy, creative direction and campaign execution — the full arc from a first idea to a published post to the numbers that follow. His experience runs from managing Instagram for fashion, jewellery and wellness brands, to influencer outreach for luxury audiences, to awareness campaigns for causes. The through-line is simple: he understands how brands actually communicate online — and he can execute it.",
  annotations: [
    "Content\nStrategy",
    "Social\nMedia",
    "Influencer\nOutreach",
    "Creative\nDirection",
    "UGC\nCampaigns",
    "Campaign\nPlanning",
  ],
};

// Experience as a campaign archive — each entry an editorial case-study record.
export const experience = [
  {
    n: "01",
    period: "2025 — Present",
    status: "CURRENT",
    company: "Monsoon Creative",
    role: "Social Media Manager",
    place: "Jaipur / On-site",
    accent: ACCENTS.coral,
    preview: "APPAREL · JEWELLERY · WELLNESS",
    lead: "Running the day-to-day social presence for a roster of brands — clothing, jewellery and naturopathy — from first idea to published post.",
    log: [
      "Manage Instagram for multiple clients across fashion, jewellery and wellness, each with its own voice and audience.",
      "Design static creatives and carousels, and cut Reels that carry the brand's tone.",
      "Plan and publish daily Stories to keep each brand present in the feed.",
      "Run mobile photoshoots — styling, shooting and selecting frames on location.",
      "Build moodboards, content plans and the visual strategy behind each account.",
      "Ideate campaigns and translate them into a coherent content calendar.",
    ],
    disciplines: [
      "Brand Management",
      "Content Strategy",
      "Creative Direction",
      "Instagram",
      "Reels",
      "Stories",
      "Photoshoots",
    ],
  },
  {
    n: "02",
    period: "Jun 2026 — Present",
    status: "FREELANCE",
    company: "Wrap & Gift",
    role: "Social Media Manager",
    place: "Independent / Remote",
    accent: ACCENTS.pink,
    preview: "GIFT · LIFESTYLE",
    lead: "Independent client work — owning the content engine end to end, from strategy through to the numbers.",
    log: [
      "Set content strategy and build monthly content calendars.",
      "Produce Reels, static posts and Stories around the brand's gifting and lifestyle world.",
      "Direct product and brand shoots.",
      "Monitor performance and compile analytics reports.",
      "Optimise for engagement and refine the plan against what the audience responds to.",
    ],
    disciplines: [
      "Content Strategy",
      "Content Calendars",
      "Reels",
      "Product Shoots",
      "Analytics",
      "Engagement",
    ],
  },
  {
    n: "03",
    period: "Jul 2025 — Sep 2025",
    status: "INTERNSHIP",
    company: "OHI",
    role: "Social Media Marketing Intern",
    place: "Jaipur / On-site",
    accent: ACCENTS.lavender,
    preview: "LUXURY · INFLUENCER",
    lead: "Influencer-led marketing for a luxury audience — research, outreach and content, with a focus on Dubai-based creators.",
    log: [
      "Researched micro-influencers and built shortlists for UGC campaigns.",
      "Ran cold outreach to Dubai-based luxury influencers.",
      "Coordinated Instagram Reels and creator collaborations.",
      "Wrote blog content and handled day-to-day CMS operations.",
      "Supported campaign planning from brief to publish.",
    ],
    disciplines: [
      "Micro-Influencer Research",
      "UGC",
      "Cold Outreach",
      "Reels",
      "Blog / CMS",
      "Campaign Planning",
    ],
  },
  {
    n: "04",
    period: "Mar 2024 — Apr 2024",
    status: "INTERNSHIP",
    company: "Pawzz Foundation",
    role: "Social Media & Outreach Intern",
    place: "Remote",
    accent: ACCENTS.lime,
    preview: "NON-PROFIT · AWARENESS",
    lead: "Awareness and community work for a cause — turning responsible pet care into content people engaged with.",
    log: [
      "Ran awareness campaigns across Instagram and X.",
      "Grew community engagement around responsible pet care.",
      "Handled cold outreach and helped develop partnerships.",
      "Supported fundraising and digital awareness drives.",
    ],
    disciplines: [
      "Awareness Campaigns",
      "Instagram",
      "X",
      "Community",
      "Outreach",
      "Partnerships",
      "Fundraising",
    ],
  },
];

// Selected work — real engagements only. Client names beyond those provided
// are described by category, never invented. `size` drives the editorial grid.
export const work = [
  {
    n: "01",
    client: "Wrap & Gift",
    industry: "Gift & Lifestyle",
    types: "Social Strategy · Content · Shoots",
    platform: "Instagram",
    role: "Social Media Manager",
    accent: ACCENTS.pink,
    size: "large",
    tag: "01 / STRATEGY",
  },
  {
    n: "02",
    client: "Monsoon Client — Jewellery",
    industry: "Jewellery",
    types: "Content · Creative Direction · Reels",
    platform: "Instagram",
    role: "Social Media Manager",
    accent: ACCENTS.coral,
    size: "tall",
    tag: "02 / REEL",
  },
  {
    n: "03",
    client: "Monsoon Client — Apparel",
    industry: "Fashion",
    types: "Content Strategy · Visual Planning",
    platform: "Instagram",
    role: "Social Media Manager",
    accent: ACCENTS.paper,
    size: "wide",
    tag: "03 / GRID",
  },
  {
    n: "04",
    client: "Monsoon Client — Naturopathy",
    industry: "Wellness",
    types: "Content · Stories · Static Creatives",
    platform: "Instagram",
    role: "Social Media Manager",
    accent: ACCENTS.lime,
    size: "small",
    tag: "04 / STORY",
  },
  {
    n: "05",
    client: "OHI",
    industry: "Luxury / Influencer",
    types: "Micro-influencer Outreach · UGC · Reels",
    platform: "Instagram",
    role: "Social Media Marketing Intern",
    accent: ACCENTS.lavender,
    size: "tall",
    tag: "05 / UGC",
  },
  {
    n: "06",
    client: "Pawzz Foundation",
    industry: "Non-profit / Awareness",
    types: "Awareness Campaign · Community",
    platform: "Instagram · X",
    role: "Social Media & Outreach Intern",
    accent: ACCENTS.coral,
    size: "wide",
    tag: "06 / REACH",
  },
];

// The campaign lifecycle — a flowing path, not six boxes.
export const process = [
  { n: "01", stage: "Idea", note: "The concept a brand can own." },
  { n: "02", stage: "Research", note: "Audience, references, what's already working." },
  { n: "03", stage: "Strategy", note: "Pillars, cadence and the plan for the month." },
  { n: "04", stage: "Content", note: "Shoots, creatives and Reels — the assets themselves." },
  { n: "05", stage: "Publish", note: "Calendar, captions and Stories, live." },
  { n: "06", stage: "Analyze", note: "What landed — and what next month answers to." },
];

// Expertise — an editorial list; the description reveals on hover.
export const expertise = [
  { name: "Social Media Strategy", note: "The plan behind the posts — who we're talking to, why, and what we want them to feel." },
  { name: "Content Planning", note: "Calendars, pillars and cadence that keep a brand present without repeating itself." },
  { name: "Creative Direction", note: "The look, tone and rhythm of a feed, held consistent across every asset." },
  { name: "Influencer Outreach", note: "Finding the right creators, making contact, and building collaborations that fit the brand." },
  { name: "UGC Campaigns", note: "Turning real people and real content into something a brand can stand behind." },
  { name: "Brand Content", note: "Static creatives, carousels and copy that carry a brand's voice." },
  { name: "Reels & Short-Form Video", note: "Short video built to stop the scroll and stay watchable to the end." },
  { name: "Community Engagement", note: "Showing up in the comments and DMs — the part that turns a following into an audience." },
  { name: "Campaign Ideation", note: "The idea a campaign hangs on, before a single asset is made." },
  { name: "Social Media Analytics", note: "Reading what worked, and letting the next month's plan answer to it." },
];

// The toolkit — grouped, no invented additions.
export const toolkit = [
  {
    group: "Social Media",
    accent: ACCENTS.coral,
    items: ["Instagram", "X", "Content Management"],
  },
  {
    group: "Content",
    accent: ACCENTS.pink,
    items: ["Reels", "Stories", "Carousels", "Static Creatives", "Blogs"],
  },
  {
    group: "Marketing",
    accent: ACCENTS.lavender,
    items: [
      "Influencer Research",
      "UGC",
      "Outreach",
      "Campaign Planning",
      "Community Engagement",
    ],
  },
  {
    group: "Analytics",
    accent: ACCENTS.lime,
    items: ["Performance Monitoring", "Engagement Analysis", "Reporting"],
  },
  {
    group: "Creative",
    accent: ACCENTS.paper,
    items: ["Moodboards", "Visual Strategy", "Photoshoots", "Content Ideation"],
  },
];

export const education = {
  label: "07 — Education",
  note: "From commerce into modern media and digital communication.",
  entries: [
    {
      degree: "Bachelor of Commerce",
      school: "Delhi University — School of Open Learning",
      period: "2022 — 2025",
    },
    {
      degree: "Master's in New Media",
      school: "Haridev Joshi University of Journalism & Mass Communication",
      period: "2025 — Present",
    },
  ],
};

// Full-viewport statements — the marketing thinking, held in space.
export const statements = {
  interlude: "Good content gets seen.\nGood strategy gets remembered.",
  preContact: "The feed is not the product.\nAttention is.",
};

export const contact = {
  kicker: "08 — Contact",
  lines: ["Let's make", "something people", "want to stop for."],
  emphasisWord: "stop",
};

export const footer = {
  name: "Samar Nagpal",
  disciplines: ["Digital Marketing", "Social Media", "Content"],
  location: "Jaipur, India",
  year: "© 2026",
  signoff: "END OF FEED",
};

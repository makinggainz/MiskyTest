// Verbatim content lifted from ColumbusPage /technology page.
// Source files:
//   - components/technology/TechHeroSection.tsx
//   - components/technology/redesign/TechnologySections.tsx
//   - components/technology/redesign/CareersContactForm.tsx
//   - components/technology/redesign/content.ts
//
// No new copy. If a string isn't here, it isn't on /research.

export const HERO = {
  title: "Building a brain for earth",
  subtitleLines: [
    "At Columbus, we collect the world’s data, and build a brain that comprehends it all.",
    "We’re building frontier geospatial intelligence.",
  ],
};

export const NAV_ITEMS: { id: string; label: string }[] = [
  { id: "index", label: "Foundation Model" },
  { id: "lgm-vs-llm", label: "Timeline" },
  { id: "core-reasoning", label: "Research" },
  { id: "data-collection", label: "Results" },
  { id: "research-blog", label: "Blog" },
  { id: "careers", label: "Inquiries" },
];

// ── Section 1: Foundation Model — LGM vs LLM ──
export const FOUNDATION = {
  eyebrow: "A new foundation model",
  title: "Large Geospatial Model vs Large Language Model.",
  bodyParagraphs: [
    "If an LLM is for the digital world, our LGM is for the physical world.\nWe’re personifying earth with physical AI. Instead of words, we process data about our surroundings and the anthropology in them.",
    "A new foundational model is needed.\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  ],
  ctaText: "Read our in-depth article",
  ctaHref: "#",
  diagramImg: "/TechnologyPageImages/techDiagram.png",
  tableTitle: "An LGM vs other foundation models",
  brand: { name: "Columbus Earth", logo: "/logobueno.png" },
  models: [
    {
      key: "llm",
      name: "LLM",
      subtitle: "Large-Language-model",
      icon: "/TechnologyPageImages/llm-text-icon.png",
      logos: [
        { src: "/TechnologyPageImages/LogosTable/ChatGPT-Vertical-Logo-Vector.svg-.png", alt: "ChatGPT" },
        { src: "/TechnologyPageImages/LogosTable/Claude_AI_logo.svg.png", alt: "Claude" },
        { src: "/TechnologyPageImages/LogosTable/Grok-feb-2025-logo.svg.png", alt: "Grok" },
        { src: "/TechnologyPageImages/LogosTable/Perplexity_AI_logo.svg.png", alt: "Perplexity" },
      ],
    },
    {
      key: "vlm",
      name: "VLM",
      subtitle: "Vision-Language-model",
      icon: "/TechnologyPageImages/vlm-image-icon.png",
      logos: [
        { src: "/TechnologyPageImages/physical-intelligence-logo.jpeg", alt: "Physical Intelligence" },
        { src: "/TechnologyPageImages/runway-logo.jpeg", alt: "Runway" },
        { src: "/TechnologyPageImages/meta-logo.jpeg", alt: "Meta" },
      ],
    },
    {
      key: "lgm",
      name: "LGM",
      subtitle: "Large-Geosaptial-model",
      icon: "/TechnologyPageImages/lgm-globe-icon.png",
      logos: [],
      isLgm: true,
    },
  ],
  rows: [
    {
      label: "Trained on",
      cells: [
        { heading: "Text", note: "e.g. “The grass is” → “green”" },
        { heading: "Text & Image", note: "e.g. dog photo → “a border collie”" },
        { heading: "Physical reality", note: "e.g. public data + urban imagery + GIS → crime risk map" },
      ],
    },
    {
      label: "What it\noutputs",
      cells: [
        { heading: "Predictive words", note: "“What word comes next?”" },
        { heading: "Visual reasoning", note: "“What’s in this image?”" },
        { heading: "Ground truths", note: "“What’s in this physical space?”" },
      ],
    },
    {
      label: "Who’s\nbuilding it",
      // logos rendered via models[*].logos for the bottom row
      cells: null,
    },
  ],
};

// ── Section 2: Timeline ──
export const TIMELINE = {
  title: "A Large Geospatial Model is the next frontier in AI",
  lead: "The path forward",
  // milestones in chronological order
  milestones: [
    { year: "2022", label: "LLM" },
    { year: "2025", label: "Geo-tuned LLM\n& Vision Models" },
    {
      year: "2026",
      label: "Generalist\nLGM",
      cta: { text: "Read our Paper", href: "#" },
    },
    {
      year: "2028",
      label: "UGM",
      cta: { text: "Our Game Plan", href: "#" },
    },
  ],
  // Columbus marker between 2025 and 2026
  columbusMarker: {
    label: "now",
    logo: "/logobueno.png",
  },
  articleCard: {
    kicker: "Read our article on",
    headline: "the drawbacks of LLMs & vision models.",
    headlineStrong: "How the LGM innovates.",
    href: "#",
  },
  // For SEO / a11y srOnly outline
  srOutline: [
    "2022 — LLM (Large Language Model)",
    "2025 — Geo-tuned LLM & Vision Models",
    "2026 — Generalist LGM (Large Geospatial Model)",
    "2028 — UGM (Universal Geospatial Model)",
  ],
};

// ── Section 3: Our Research (accordion) ──
export const RESEARCH = {
  eyebrow: "Core Reasoning",
  title: "Our research",
  intro: "We’ve come up with several innovations within data collection, fusion, and core reasoning. We combine several innovations in unique ways in our research.",
  aside: "We learned first-hand how LLMs are not built for geospatial needs. We set out to fix every technical issue that came with GPT architecture and it converged into a new foundational model, the LGM.",
  asideCta: { text: "Why LLMs didn’t work", href: "#" },
  introLine: "Our proprietary architecture is comprised of 3 parts. Within each are several innovations built during our practical research.",
  starburstImg: "/TechnologyPageImages/VoyagerGraphic.png",
  // Each "group" is an accordion row.
  groups: [
    {
      title: "1. Data Collection",
      paragraphs: [
        "The most extensive data collection in the industry. Versatile methods ranging from drones, car data, human data, public data and more.",
        // Inline definition — rendered via <Definition> children
      ],
      // Trailing paragraph that contains an inline Definition.
      paragraphsWithDefinitions: [
        {
          before: "We’ve achieved the cheapest ",
          definition: {
            term: "P/POI.",
            title: "P/POI — Price per Point of Interest",
            body: "The cost to capture a single geospatial data point. Lower P/POI means richer, more affordable training data — a key economic metric for any geospatial foundation model.",
          },
          after: "",
        },
      ],
      link: { text: "Read our blog", href: "/blog" },
    },
    {
      title: "2. Fusion",
      paragraphs: [],
      paragraphsWithDefinitions: [
        {
          before: "Accurate, automatic data filtering ",
          definition: {
            term: "& labeling.",
            title: "Automatic labeling",
            body: "The process of tagging raw, unstructured geospatial data with structured metadata so a model can reason about it. Our pipeline does this without human annotation.",
          },
          after: "",
        },
        {
          before: "We care about ",
          definition: {
            term: "Ground Truths.",
            title: "Ground truth",
            body: "A verified, real-world observation confirmed at a specific X, Y, Z coordinate and time. Ground truths are the reference signal we use to validate every layer of the model.",
          },
          after: " We make sure each data point is the truth at that specific X,Y,Z point at that given time.",
        },
      ],
      // Plain trailing paragraph
      paragraphsTrailing: [
        "Data scarcity is one of the hardest parts about the LGM endeavor. To solve this, we have built innovative methods to universally digest data. Meaning we are able to fuse data together that our model then trains on. Cheaper and more data → smarter model.",
      ],
    },
    {
      title: "3. Core Reasoning",
      paragraphs: [
        "Our reasoning model considers temporal data, and sifts through vast amounts of aggregated geospatial data — including anthropologic data.",
        "It continuously learns and creates new patterns through our relational architecture.",
        "Our core reasoning is comprised of a new permutation of Reverse Diffusion and RAG architecture.",
      ],
      link: { text: "Read our Paper", href: "#" },
    },
    {
      title: "4. Answers, insights, patterns",
      paragraphs: ["One model, innumerable granular ground truths."],
      products: [
        { name: "Columbus", glyph: "/logobueno.png", href: "/enterprise" },
        { name: "Elio", glyph: "/MapsGPT-logo.png", href: "https://mapsgpt.es", external: true },
        { name: "More Soon", glyph: null, href: null, soon: true },
      ],
      link: { text: "Other use cases", href: "#" },
    },
  ],
  closingArticle: {
    kicker: "Read our articles on",
    headlineStrong: "our foundational model research",
    href: "#",
  },
};

// ── Section 4: Results — Model Columbus-01 ──
export const RESULTS = {
  kicker: "RESULTS",
  title: "MODEL COLUMBUS-01",
  lead: "The latest results from our development of the LGM.",
  cards: [
    { num: "1", text: "Fast semantic reasoning in cities. Contextual enrichment." },
    { num: "2", text: "Generative geospatial data" },
    { num: "3", text: "Generalist model, with access to wide catalogue" },
    { num: "4", text: "Deep spatial reasoning at scale" },
  ],
  articles: [
    {
      // "Read our article on Mapping the\nunknown with Gen Layers"
      lead: "Read our article on Mapping the",
      strong: "unknown with Gen Layers",
      href: "#",
    },
    {
      lead: "Read our article on",
      strong: "deep spatial reasoning",
      href: "#",
    },
  ],
};

// ── Section 5: Research Blog ──
export const BLOG = {
  title: "Read our latest releases",
  lead: "Explore the innovative research and recent papers from our team.",
  cards: [
    {
      featured: true,
      title: "Philosophy behind a Universal Geospatial Model",
      href: "#",
      image: "/TechnologyPageImages/multieWaveEminations.jpeg",
    },
    {
      title: "Mimicking the adult brain.",
      href: "#",
      image: "/TechnologyPageImages/deep-layers.jpeg",
    },
    {
      title: "Earth recipes.",
      href: "#",
      image: "/TechnologyPageImages/unkown-layers.jpeg",
    },
    {
      title: "Research: creating a fire prediction model.",
      href: "#",
      image: "/TechnologyPageImages/techpg-radiance.png",
    },
  ],
  articles: [
    { title: "MapsGPT Version 2.5. Architecture improvements.", href: "#", date: "Apr 2026" },
    { title: "Research Paper -- Erick fire prediction", href: "#", date: "Mar 2026" },
    { title: "MapsGPT. Building a consumer product", href: "#", date: "Feb 2026" },
    { title: "Why LLMs dont cut it. Issues in LLM architecture for Geosaptial queries.", href: "#", date: "Jan 2026" },
    { title: "A paper on Generative geospatial layers.", href: "#", date: "Dec 2025" },
  ],
};

// ── Section 6: Careers / Inquiries Form ──
export const CAREERS = {
  title: "Careers",
  lead: "If you’re excited about creating paradigm shifts in physical world understanding.",
  tabs: [
    { value: "columbus-pro", label: "Columbus Pro" },
    { value: "elio", label: "Elio" },
    { value: "investment", label: "Investment" },
    { value: "careers", label: "Careers" },
  ] as const,
  columbusPro: {
    heading: "Book a Demo",
    fields: {
      email: { label: "Company email", placeholder: "name@company.com" },
      companySize: { label: "Company size", placeholder: "Enter the number of employees" },
      industry: {
        label: "Industry",
        placeholder: "Please Select",
        options: [
          { value: "real-estate", label: "Real Estate" },
          { value: "government", label: "Government" },
          { value: "logistics", label: "Logistics & Supply Chain" },
          { value: "urban-infrastructure", label: "Urban Infrastructure" },
          { value: "environmental-research", label: "Environmental Research" },
          { value: "security", label: "Security & Defense" },
          { value: "insurance", label: "Insurance" },
          { value: "consulting", label: "Consulting" },
          { value: "other", label: "Other" },
        ],
      },
      message: { label: "What are you hoping to get out of Columbus?" },
      heardFrom: {
        label: "How did you hear about us?",
        placeholder: "Please Select",
        options: [
          { value: "linkedin", label: "LinkedIn" },
          { value: "twitter", label: "Twitter / X" },
          { value: "facebook-instagram", label: "Facebook / Instagram" },
          { value: "reddit", label: "Reddit" },
          { value: "other-social", label: "Other Social Media" },
          { value: "google", label: "Google" },
          { value: "chatgpt-llm", label: "ChatGPT / Claude / Grok / Other LLM" },
          { value: "other-search", label: "Other Search / Research" },
          { value: "word-of-mouth", label: "Word of Mouth / Referral" },
          { value: "events", label: "Events / Conferences / Webinars" },
          { value: "news-press", label: "News / Press / Articles / Newsletters / Podcast" },
          { value: "short-squeeze", label: "Short Squeeze Newsletter" },
          { value: "ooh-billboards", label: "Out of Home / Billboards" },
          { value: "product-hunt", label: "Product Hunt / Forums" },
          { value: "direct-outreach", label: "Direct Outreach" },
          { value: "partnership", label: "Partnership / Integration" },
          { value: "existing-customer", label: "Existing Customer / Prior Experience" },
          { value: "other-ad", label: "Other Advertisement" },
          { value: "other", label: "Other" },
        ],
      },
    },
  },
  elio: {
    heading: "Elio / MapsGPT",
    nameLabel: "Name",
    emailLabel: "Email",
    roleLabel: "Role",
    messageLabel: "Tell us about your project",
    messagePlaceholder: "Please share your objectives and any specific requirements.",
    updatesLabel: "I want to receive product updates from Columbus Earth.",
  },
  investment: {
    heading: "Investment Inquiry",
    nameLabel: "Name",
    emailLabel: "Email",
    orgLabel: "Organization",
    messageLabel: "Tell us about your interest",
    messagePlaceholder: "Share your investment thesis or partnership proposal.",
    updatesLabel: "I want to receive product updates from Columbus Earth.",
  },
  careersTab: {
    heading: "Join Our Team",
    nameLabel: "Name",
    emailLabel: "Email",
    roleLabel: "Role you’re interested in",
    rolePlaceholder: "e.g. Software Engineer, Data Scientist...",
    messageLabel: "Tell us about yourself",
    messagePlaceholder: "What excites you about geospatial intelligence? What would you bring to the team?",
    resumeLabel: "Resume",
    resumeNote: "(optional — PDF or DOC)",
  },
  legal: {
    prefix: "By submitting, you agree with our ",
    termsText: "Terms",
    termsHref: "/terms",
    middle: " and ",
    privacyText: "Privacy Policy",
    privacyHref: "/privacy",
    suffix: ".",
  },
  submitText: "Submit",
  charLimit: 500,
  success: {
    title: "Message sent.",
    body: "Thanks — we’ll be in touch shortly.",
    reset: "Send another message",
  },
};

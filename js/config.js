/* ============================================================
   SITE CONFIG — the template's heart.
   Edit the values below and you have your own portfolio.
   See README.md "Customize in 5 minutes" for a checklist.
   Keep sample content honestly framed (placeholders stay
   obvious: hello@example.com, +000 0000 0000).
   ============================================================ */
window.SITE = {
  meta: {
    title: "Sam Carter — Web Developer for Small Businesses",
    description:
      "Sam Carter builds fast, accessible websites for small businesses. Plain HTML, CSS and JS. No bloat, no waiting.",
    url: "https://samcarter.example.com/",
    ogImage: "https://samcarter.example.com/og-image.png",
    lang: "en"
  },

  person: {
    name: "Sam Carter",
    role: "Web Developer & Designer",
    location: "Working remotely, worldwide",
    email: "hello@example.com",
    whatsapp: "0000000000",
    resumeUrl: "#",
    availability: {
      open: true,
      text: "Taking new projects from November"
    }
  },

  hero: {
    headline: "I build fast, accessible websites for small businesses.",
    subline:
      "One file holds all the content on this page. I ship clean, mobile-first sites that load in under a second and bring in enquiries.",
    primaryCta: { label: "Start a project", href: "#contact" },
    secondaryCta: { label: "See my work", href: "#work" }
  },

  proof: [
    { value: "12", label: "sites shipped" },
    { value: "95+", label: "Lighthouse on every build" },
    { value: "24h", label: "reply time, always" }
  ],

  services: [
    {
      title: "Business websites",
      outcome: "A clear, fast site that tells visitors what you do and how to reach you — live in weeks, not months.",
      tools: ["HTML", "CSS", "Netlify"]
    },
    {
      title: "Landing pages",
      outcome: "One focused page for one offer, written and laid out to turn visits into messages.",
      tools: ["Copy", "SEO basics", "Forms"]
    },
    {
      title: "Care and fixes",
      outcome: "Your existing site loads faster, reads better on phones, and stops breaking — with plain-language updates.",
      tools: ["Audits", "Accessibility", "Speed"]
    }
  ],

  projects: [
    {
      title: "Maple & Crumb bakery site",
      summary: "A one-page site that doubled weekend pre-orders for a neighbourhood bakery.",
      role: "Design and build, solo",
      problem: "The bakery took orders by phone and Instagram DMs, and lost track every Saturday morning.",
      result: "A single page with menu, hours and a pre-order form. Sample outcome: fewer missed orders in the first month.",
      stack: ["HTML", "CSS", "Netlify Forms"],
      liveUrl: "#",
      codeUrl: "#",
      thumb: "store"
    },
    {
      title: "Northwind bookings",
      summary: "Simple appointment booking for a two-person repair shop.",
      role: "Design and build, solo",
      problem: "Customers called to ask for slots, and the owners answered the same questions all day.",
      result: "A booking page with services, prices and a request form. Sample outcome: fewer back-and-forth calls.",
      stack: ["HTML", "CSS", "JavaScript"],
      liveUrl: "#",
      codeUrl: "#",
      thumb: "booking"
    },
    {
      title: "Freelance dashboard",
      summary: "A clean client dashboard for tracking invoices and tasks.",
      role: "Frontend build",
      problem: "Invoices lived in spreadsheets and task updates lived in chat threads.",
      result: "One calm dashboard: invoices, tasks and status at a glance. Sample concept, not a real client.",
      stack: ["HTML", "CSS", "JavaScript"],
      liveUrl: "#",
      codeUrl: "#",
      thumb: "dashboard"
    },
    {
      title: "Field notes blog",
      summary: "A fast reading-first blog template with RSS and search.",
      role: "Design and build, solo",
      problem: "Free blog themes were slow and full of pop-ups nobody asked for.",
      result: "A quiet template that scores 95+ on Lighthouse and reads well on any phone. Sample theme.",
      stack: ["HTML", "CSS", "RSS"],
      liveUrl: "#",
      codeUrl: "#",
      thumb: "blog"
    }
  ],

  skills: [
    {
      group: "Frontend",
      items: [
        { name: "HTML", level: "Daily" },
        { name: "CSS", level: "Daily" },
        { name: "JavaScript", level: "Daily" },
        { name: "Responsive design", level: "Daily" },
        { name: "Accessibility", level: "Comfortable" }
      ]
    },
    {
      group: "Backend and tools",
      items: [
        { name: "Netlify", level: "Comfortable" },
        { name: "Forms & deploys", level: "Comfortable" },
        { name: "Git", level: "Comfortable" },
        { name: "SEO basics", level: "Comfortable" }
      ]
    },
    {
      group: "Design",
      items: [
        { name: "Figma", level: "Comfortable" },
        { name: "Typography", level: "Comfortable" },
        { name: "SVG icons", level: "Learning" },
        { name: "Copy editing", level: "Learning" }
      ]
    }
  ],

  process: [
    {
      step: "Discover",
      text: "A 30-minute call about your goals and customers. You receive a one-page plan with price and timeline."
    },
    {
      step: "Design",
      text: "I draft the page structure and wording first. You review one prototype and request changes once."
    },
    {
      step: "Build",
      text: "I build the site with plain HTML, CSS and JS, tested on phones as I go. You get a preview link."
    },
    {
      step: "Launch and support",
      text: "I deploy, connect your domain and forms, and hand over a short guide. You receive 30 days of fixes."
    }
  ],

  testimonials: [
    {
      quote: "Sam turned our scattered menu and hours into one clear page. Customers finally stop calling to ask where we are.",
      name: "Sample client",
      role: "Bakery owner (sample quote)",
      sample: true
    },
    {
      quote: "Fast, direct, no jargon. The booking page paid for itself within weeks.",
      name: "Sample client",
      role: "Repair shop owner (sample quote)",
      sample: true
    }
  ],

  about: {
    paragraphs: [
      "I am Sam, a web developer who likes small, fast sites. I started by rebuilding my family's shop page, and kept going from there.",
      "I work with plain HTML, CSS and JavaScript, so your site stays quick and easy to change. When I am not building, I am sketching layouts and testing them on old phones."
    ],
    photo: null
  },

  social: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
    { label: "Instagram", href: "https://instagram.com/" }
  ],

  theme: { default: "dark", accent: null },

  form: {
    // Formspree endpoint that receives contact messages.
    // (see README "Contact form"). Leave "" and the form shows an
    // honest "not connected yet" note instead of fake success.
    endpoint: "https://formspree.io/f/mnpjddvq"
  }
};

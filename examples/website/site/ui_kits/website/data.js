// Dummy content for the arayhan website UI kit. Replace with real data.
window.SITE_DATA = {
  hero: {
    badge: 'Open to opportunities',
    title: 'Frontend Lead who ships, teaches, and scales.',
    sub: "I'm Rayhan — 7 years in React and Next.js. I led frontend at a US edtech startup, help build Indonesia's national health-logistics platform for the Ministry of Health and UNDP, and organize a 1,800-member developer community.",
  },
  about: [
    'I build frontend systems from the ground up — clean architecture, design systems, and CI/CD pipelines that once cut hosting costs by 71%. Most recently I led frontend at Anify, a US-based SaaS startup, managing a team across US–Indonesia timezones.',
    'The other half of my week goes to Badr Interactive, where I help build SMILE — the national healthcare logistics platform serving Indonesia\u2019s Ministry of Health, UNDP, and UNICC — and to GDG Depok, the 1,800-member community I organize.',
  ],
  experience: {
    Professional: [
      { period: 'Jun 2025 — Apr 2026', title: 'Frontend Engineer Lead', org: 'Anify LLC · Honolulu, USA', description: 'Led frontend architecture for a SaaS platform (React, Next.js, TypeScript) with a team of 2 across US–Indonesia timezones. Cut monthly hosting costs 71% ($84 → $24) via Docker + CI/CD + multi-cloud; introduced Clean Architecture, DDD, and a Radix-based design system.', tags: ['Next.js', 'TypeScript', 'Radix UI', 'Docker'] },
      { period: 'Aug 2022 — now', title: 'Frontend Developer (part-time)', org: 'Badr Interactive', description: 'SMILE — national healthcare logistics platform for Indonesia\u2019s Ministry of Health, UNDP, and UNICC. Co-initiated the rewrite from legacy SMILE 3.0 to SMILE 5.0 (React + TypeScript) for a 40-person engineering team; also shipped Astra SAM (React Native) and Unit Cost RS (Remix, Prisma).', tags: ['React', 'TypeScript', 'React Native', 'Remix'] },
      { period: 'Dec 2020 — Aug 2022', title: 'Frontend Developer', org: 'Founderplus', description: 'Solo developer for a pre-seed accelerator platform serving 50+ startup applications — landing, admin dashboard, and registration with pitch-deck management. Stood up Docker/Nginx DevOps from scratch.', tags: ['Next.js', 'Node.js', 'Docker', 'PostgreSQL'] },
      { period: 'Aug 2019 — Dec 2020', title: 'Frontend Developer & Course Instructor', org: 'Skydu', description: 'B2B e-learning SaaS serving 10+ institutional clients. Built its first mobile app (React Native), then wrote and taught the React curriculum on the platform itself.', tags: ['React', 'React Native', 'Vue.js'] },
      { period: 'Jul 2017 — Aug 2018', title: 'Web Designer & Frontend Developer', org: 'Integrasi Media Kreasi', description: 'Dashboards, mobile apps, and UI/UX for major insurers — CHUBB, Prudential, BCA Life, Cigna, Sunlife — with Angular 5 + Ionic.', tags: ['Angular', 'Ionic', 'SASS'] },
    ],
    Freelance: [
      { period: 'Sep 2022 — Jan 2024', title: 'Fullstack Developer', org: 'Founderplus', description: 'End-to-end ownership of the accelerator platform after going freelance: features, infrastructure, and production operations.', tags: ['Next.js', 'Docker'] },
      { period: '2019 — 2020', title: 'Client projects', org: 'via Skydu', description: 'NFJuara (Vue.js, payment-gateway integration) and SOHO EDetailing (Next.js, data visualization).', tags: ['Vue.js', 'Next.js'] },
    ],
    Academic: [
      { period: '2019 — 2024', title: 'BSc Computer Science', org: 'STT Terpadu Nurul Fikri', description: 'Informatics Engineering, GPA 3.67/4.00.', tags: [] },
      { period: '2022', title: 'Kampus Merdeka bootcamps', org: 'Ruangguru · Binar Academy', description: 'Ruangguru engineering bootcamp (20 SKS, GPA 3.85) — Jest, Cypress, TypeScript, Next.js; Binar Academy track (4.5/5 hard skills).', tags: [] },
    ],
    Projects: [
      { period: '2022 — now', title: 'SMILE 5.0 Platform', org: 'MoH · UNDP', description: 'National medicine-distribution tracking across Indonesian health facilities.', tags: ['React', 'TypeScript'] },
      { period: '2023', title: 'Astra SAM Advance', org: 'PT Astra International', description: 'Nationwide sales-team app for customer database, tasks, and incentives on Android + iOS.', tags: ['React Native'] },
      { period: '2023', title: 'Unit Cost RS', org: 'Universitas Indonesia', description: 'Hospital costing system, built fullstack with Remix, Prisma, and MySQL.', tags: ['Remix', 'Prisma'] },
    ],
    Speaking: [
      { period: '2019 — now', title: 'Organizer', org: 'GDG Depok', description: '1,800-member community with 350–600 participants per event; 10+ technical talks on Firebase, React, and frontend. Organizer since Aug 2025, co-organizer 2019–2025.', tags: [] },
      { period: '2022 — 2023', title: 'Fullstack & Frontend Mentor', org: 'GoTo Impact Foundation', description: 'Generasi Gigih 2.0 & 3.0 — mentored 4 student teams through the full product lifecycle, from ideation to deployment.', tags: [] },
      { period: '2020 — 2021', title: 'Lead', org: 'Google Developer Student Clubs', description: 'One of 45 DSC Leads in Indonesia — 300-member campus community, 8 workshops, +50% membership growth.', tags: [] },
    ],
  },
  projects: [
    {
      id: 'smile', name: 'SMILE 5.0 — national health logistics', role: 'Frontend Developer · Badr Interactive',
      problem: "Indonesia's medicine-distribution tracking ran on SMILE 3.0 — an unmaintainable legacy JavaScript codebase with 1,000-line components.",
      constraint: 'Serving the Ministry of Health, UNDP Indonesia, UNICC, and UNDP Global — a 40-person engineering team that could not pause delivery.',
      solution: 'Co-initiated the complete rewrite to SMILE 5.0: React, TypeScript, and a scalable architecture.',
      impact: 'Covers Indonesian health facilities nationwide; significantly improved maintainability and delivery velocity for 40 engineers.',
      tags: ['React', 'TypeScript'],
    },
    {
      id: 'anify', name: 'Anify — SaaS frontend & infrastructure', role: 'Frontend Engineer Lead',
      problem: 'A US edtech startup burning runway on hosting and slowed by an inconsistent, pattern-less frontend.',
      constraint: 'A team of 2 frontend engineers split across US–Indonesia timezones, mid product push.',
      solution: 'Company-wide Clean Architecture + DDD, a Radix-based design system, and Docker/CI-CD multi-cloud infrastructure.',
      impact: '71% lower monthly hosting costs ($84 → $24); faster sprint velocity and onboarding.',
      tags: ['Next.js', 'Radix UI', 'Docker'],
    },
    {
      id: 'gdg', name: 'Developer education at scale', role: 'Organizer · GDG Depok',
      problem: 'Indonesian developers lacked accessible, senior-level frontend and Firebase material in their own ecosystem.',
      constraint: 'Volunteer time; audiences ranging from students to working seniors.',
      solution: '10+ conference talks, workshops, and mentoring — GDG Depok, DSC (300-member campus chapter), and GoTo bootcamps.',
      impact: '1,800 community members; 350–600 participants per event.',
      tags: ['Community', 'Firebase'],
    },
  ],
  now: [
    'Organizing GDG Depok as lead organizer — the next 350+ participant event is in the works.',
    'Exploring AI tooling — Claude Code, Ollama, and agentic workflows in real projects.',
    'Open to frontend-lead and senior IC opportunities (remote-friendly, US–ID timezones proven).',
  ],
  blog: [
    {
      id: 'realtime-pivot', title: 'Keeping a realtime engine alive through a startup pivot', date: 'Jun 24, 2026', read: '8 min', views: '2,431', cover: '../../assets/blog-cover-1.png',
      excerpt: 'What survives a pivot is architecture, not features. How we kept sub-second sync while the product changed under us.',
      tags: ['Architecture', 'WebSocket'],
      toc: ['The pivot', 'What we kept', 'Optimistic UI that survives reconnects', 'Lessons'],
      body: [
        { t: 'h2', text: 'The pivot' },
        { t: 'p', parts: [
          { text: 'When the product direction changed, every feature was negotiable — but ' },
          { text: 'the realtime layer was not', mark: true },
          { text: ". Players expect state to move faster than they can doubt it." },
        ]},
        { t: 'img', slot: 'post-realtime-arch', caption: 'The authoritative-server architecture that survived the pivot.' },
        { t: 'h2', text: 'What we kept' },
        { t: 'p', parts: [
          { text: 'We drew a hard line around the core: one source of truth, clients render projections. The approach borrows from ' },
          { text: 'the CQRS pattern', href: 'https://martinfowler.com/bliki/CQRS.html' },
          { text: ' — everything above that line was allowed to burn.' },
        ]},
        { t: 'code', lang: 'javascript', code: "// every optimistic action carries an idempotency key\nconst action = {\n  id: crypto.randomUUID(),\n  type: 'ANSWER_SUBMIT',\n  payload: { questionId, choice },\n  clientTime: Date.now(),\n};\n\nsocket.emit('action', action);\napplyOptimistic(action); // render immediately\n// replays after reconnect collapse into no-ops" },
        { t: 'h2', text: 'Optimistic UI that survives reconnects' },
        { t: 'p', parts: [{ text: 'Optimism is easy; reconciliation is the job. Reconnect timing follows an exponential backoff with jitter:' }] },
        { t: 'math', tex: 't_{retry} = \\min\\left(t_{max},\\; t_0 \\cdot 2^{\\,n}\\right) + \\mathcal{U}(0, j)' },
        { t: 'p', parts: [
          { text: 'so a thousand disconnected clients never stampede the server on the same tick. Each replayed action is ' },
          { text: 'idempotent by construction', mark: true },
          { text: ' — duplicates collapse into no-ops.' },
        ]},
        { t: 'h2', text: 'Lessons' },
        { t: 'p', parts: [
          { text: 'Design the seam before you need it. The pivot cost us screens, not infrastructure — and that is the difference between a rewrite and a redesign. More on the dashboard side of this story in ' },
          { text: 'the cold-chain case study', href: '#', post: 'iot-71' },
          { text: '.' },
        ]},
      ],
      comments: [
        {
          author: 'Dimas Prasetyo', date: 'Jun 25, 2026', text: 'Great writeup. How do you handle optimistic actions that depend on server-generated state, like a score that only the server can compute?',
          replies: [
            { author: 'Rayhan', isAuthor: true, date: 'Jun 25, 2026', text: "We split those into two phases: the client renders a pending placeholder (never a guessed value), and the authoritative result replaces it on ack. Guessing server-owned numbers is where optimistic UI goes to die." },
          ],
        },
        {
          author: 'Sarah Kim', date: 'Jun 27, 2026', text: 'Did you consider CRDTs instead of the authoritative server?',
          replies: [
            { author: 'Rayhan', isAuthor: true, date: 'Jun 28, 2026', text: 'Briefly — but trivia has a single arbiter of truth (the question clock), so CRDT merge semantics buy complexity without solving our actual problem.' },
          ],
        },
        { author: 'Andra W.', date: 'Jul 02, 2026', text: 'The idempotency-key trick saved us on a payments flow too. Underrated pattern.', replies: [] },
      ],
    },
    {
      id: 'iot-71', title: 'How we cut cold-chain monitoring costs by 71%', date: 'May 11, 2026', read: '6 min', views: '1,204', cover: '../../assets/blog-cover-2.png',
      excerpt: 'Vaccine logistics, intermittent devices, and the dashboard patterns that made silence impossible to miss.',
      tags: ['IoT', 'Case study'],
      toc: ['The problem', 'Designing for silence', 'The result'],
      body: [
        ['The problem', 'Thousands of cold-storage units, manual temperature checks, and a failure mode where nothing looks wrong until vaccines are lost.'],
        ['Designing for silence', 'The dashboard treats a missing report as loudly as a bad one. Escalation timers start the moment a device goes quiet.'],
        ['The result', 'Monitoring operations cost 71% less, and silent failures stopped being silent.'],
      ],
    },
    {
      id: 'teaching-1800', title: 'What teaching 1,800 developers taught me about senior engineering', date: 'Mar 02, 2026', read: '5 min', views: '3,872', cover: '../../assets/blog-cover-3.png',
      excerpt: 'Every question from a bootcamp student is a code review of your own understanding.',
      tags: ['Community', 'Career'],
      toc: ['Teaching as debugging', 'The 350-person code review', 'Why seniors should speak'],
      body: [
        ['Teaching as debugging', "You don't understand an abstraction until you've watched 40 people misunderstand it the same way."],
        ['The 350-person code review', 'On stage, every simplification you make is public. That pressure produces better mental models than any solo study.'],
        ['Why seniors should speak', 'Seniority is leverage. A talk that saves 600 people one bad architectural decision outproduces a quarter of solo output.'],
      ],
    },
    {
      id: 'cmdk-portfolio', title: 'Why your portfolio needs a command palette', date: 'Feb 10, 2026', read: '4 min', views: '981',
      excerpt: 'Recruiters skim. Developers explore. ⌘K serves both in under a second.',
      tags: ['UX', 'Portfolio'],
      toc: ['Skimmers vs explorers', 'Building it in an afternoon', 'What gets used'],
      body: [
        ['Skimmers vs explorers', 'A recruiter wants your CV in one keystroke; a developer wants to poke around. A palette collapses both journeys.'],
        ['Building it in an afternoon', 'A filtered list, arrow-key selection, and a scrim. The hard part is deciding what NOT to put in it.'],
        ['What gets used', 'Analytics after a month: Download CV first, GitHub second. Nobody scrolls to the footer anymore.'],
      ],
    },
    {
      id: 'lighthouse-100', title: 'Chasing Lighthouse 100 on a personal site', date: 'Jan 18, 2026', read: '7 min', views: '1,650',
      excerpt: "A frontend engineer's site with a bad score is an ironic business card.",
      tags: ['Performance'],
      toc: ['The audit', 'Fonts are the boss fight', 'Diminishing returns'],
      body: [
        ['The audit', 'First run: 84. The culprits were exactly what I tell clients to fix: render-blocking fonts and unsized media.'],
        ['Fonts are the boss fight', 'Self-hosted subsets with font-display swap and preload got LCP under 1.2s on a throttled connection.'],
        ['Diminishing returns', 'The last three points cost more than the first thirteen. Worth it once — as a badge, not a habit.'],
      ],
    },
    {
      id: 'id-dev-community', title: 'The quiet superpower of Indonesian dev communities', date: 'Dec 05, 2025', read: '6 min', views: '2,102',
      excerpt: 'GDG, Firebase ID, and why volunteering at meetups compounds faster than side projects.',
      tags: ['Community'],
      toc: ['The flywheel', 'Speaking is networking', 'Start smaller than you think'],
      body: [
        ['The flywheel', 'Every talk produces questions; every question produces material; every answer produces trust. The flywheel spins slowly, then all at once.'],
        ['Speaking is networking', "I've never gotten a freelance lead from a cold DM. I've gotten several from someone who watched a talk two years earlier."],
        ['Start smaller than you think', 'My first session had nine people and a broken projector. The 600-person rooms came later — and felt easier.'],
      ],
    },
  ],
  uses: {
    'Editor & terminal': [
      { label: 'VS Code + custom keymap', icon: null, ph: 'ph-code' },
      { label: 'JetBrains Mono with ligatures', icon: 'https://cdn.simpleicons.org/jetbrains', ph: 'ph-text-aa' },
      { label: 'Warp terminal', icon: 'https://cdn.simpleicons.org/warp', ph: 'ph-terminal-window' },
      { label: 'Fira Code fallback', icon: null, ph: 'ph-code-block' },
    ],
    'AI workflow': [
      { label: 'Claude Code for agentic refactors', icon: 'https://cdn.simpleicons.org/claude', ph: 'ph-sparkle' },
      { label: 'Ollama for local models', icon: 'https://cdn.simpleicons.org/ollama', ph: 'ph-cpu' },
      { label: 'Genkit for AI flows in Firebase', icon: 'https://cdn.simpleicons.org/firebase', ph: 'ph-fire' },
    ],
    'Stack defaults': [
      { label: 'Next.js (App Router)', icon: 'https://cdn.simpleicons.org/nextdotjs', ph: 'ph-triangle' },
      { label: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss', ph: 'ph-wind' },
      { label: 'Framer Motion', icon: 'https://cdn.simpleicons.org/framer', ph: 'ph-play' },
      { label: 'Firebase / Firestore', icon: 'https://cdn.simpleicons.org/firebase', ph: 'ph-fire' },
      { label: 'Vercel', icon: 'https://cdn.simpleicons.org/vercel', ph: 'ph-triangle' },
    ],
    'Gear': [
      { label: 'MacBook Pro 14" M3', icon: 'https://cdn.simpleicons.org/apple', ph: 'ph-laptop' },
      { label: 'Keychron K2', icon: null, ph: 'ph-keyboard' },
      { label: 'Logitech MX Master 3', icon: null, ph: 'ph-mouse' },
    ],
  },
};

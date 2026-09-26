export interface CvTemplate {
  id: string;
  name: string;
  targetRole: string;
  description: string;
  features: string[];
  markdownContent: string;
}

export const CV_TEMPLATES: CvTemplate[] = [
  {
    id: 'tech-specialist',
    name: 'The Global Remote Tech Specialist',
    targetRole: 'Software Engineers, Full-Stack, Cloud & Mobile Developers',
    description: 'A laser-focused, single-column ATS template engineered to pass Greenhouse, Ashby, and Lever scanners while showcasing engineering metrics and GitHub repositories.',
    features: [
      '100% ATS parser compliant (zero column parsing errors)',
      'Engineered around Google XYZ impact formula',
      'Dedicated Technical Proficiencies & Architecture matrix',
      'No photos, marital status, or non-essential demographic bloat',
    ],
    markdownContent: `# AHMAD RAZA
Lahore, Pakistan | +92 300 1234567 | ahmad.raza.dev@gmail.com
LinkedIn: linkedin.com/in/ahmad-raza-dev | GitHub: github.com/ahmad-raza-dev | Portfolio: ahmadraza.dev

---

## PROFESSIONAL SUMMARY
Senior Full-Stack Engineer with 4+ years of remote experience designing distributed microservices and reactive frontend architectures. Proven track record scaling Next.js 14, Node.js, and PostgreSQL web platforms serving 300,000+ monthly active users. Specialized in asynchronous cross-timezone collaboration, zero-downtime database migrations, and CI/CD automation.

---

## TECHNICAL SKILLS
- **Languages:** TypeScript, JavaScript (ES6+), Python, SQL (PostgreSQL), HTML5, CSS3/Tailwind
- **Frameworks & Libraries:** React 18/19, Next.js (App Router, Server Actions), Node.js, Express, NestJS
- **Database & Caching:** PostgreSQL, Redis, Prisma ORM, Supabase
- **Cloud & DevOps:** Docker, AWS (S3, ECS, Lambda), GitHub Actions CI/CD, Vercel
- **Testing & Tools:** Playwright, Jest, Git, Linear, Postman, Sentry

---

## PROFESSIONAL EXPERIENCE

### Senior Full-Stack Engineer (Remote)
**Apex Cloud Technologies Inc.** | San Francisco, CA (Remote from Pakistan)
*Nov 2024 – Present*
- Architected and shipped event-driven billing reconciliation microservices using Node.js and Redis, reducing monthly closing cycle time by 65%.
- Migrated legacy frontend client to Next.js 14 App Router with streaming SSR, improving Google Lighthouse Performance score from 58 to 96 and slashing LCP to 1.1s.
- Authored 120+ unit and integration tests using Playwright and Jest, increasing repository test coverage to 91% and eliminating production hotfixes for two consecutive quarters.
- Collaborated asynchronously with distributed team members across US EST and CET time zones using Linear and Loom.

### Full-Stack Developer
**Starlight Digital Solutions** | Lahore, Pakistan
*Jul 2022 – Oct 2024*
- Developed RESTful and GraphQL APIs in Express and PostgreSQL handling 2,500 requests per minute with an average response latency under 65ms.
- Implemented real-time order tracking portal using WebSockets and Tailwind CSS, increasing customer dashboard retention by 28%.
- Optimized complex SQL queries and created database composite indexes, cutting 95th percentile database query times by 40%.

---

## FEATURED OPEN SOURCE & PROJECTS

### DevSync — Open Source Remote Sprint Dashboard
- Built an open-source sprint analytics board using Next.js 14, Tailwind, and PostgreSQL.
- Implemented GitHub OAuth and webhook listeners to automatically sync pull request metrics.
- Gained 400+ GitHub stars and 1,200 active monthly deployments. [Live Demo: devsync.io]

---

## EDUCATION
**Bachelor of Science in Computer Science (BSCS)**
National University of Computer and Emerging Sciences (FAST-NUCES), Lahore, Pakistan (2018 – 2022)
`,
  },
  {
    id: 'creative-ops',
    name: 'The Creative & Async Operations Professional',
    targetRole: 'Product Designers, Technical Writers, Customer Success & Ops',
    description: 'Designed specifically for non-coding remote professionals: highlights business metrics, cross-functional project delivery, stakeholder communication, and tool mastery.',
    features: [
      'Single-column structure optimized for human recruiters and ATS alike',
      'Emphasis on cross-functional alignment and async team ownership',
      'Dedicated Core Competencies & Software Ecosystem sections',
      'Clean typography and scannable visual hierarchy',
    ],
    markdownContent: `# FATIMA NOOR
Karachi, Pakistan | +92 321 9876543 | fatima.noor.work@gmail.com
LinkedIn: linkedin.com/in/fatima-noor-design | Portfolio: fatimanoor.design

---

## PROFESSIONAL SUMMARY
Results-driven Product Designer and Operations Specialist with 4 years of experience working with international startups and e-commerce companies. Expert in translating user friction into scalable Figma design systems, managing customer onboarding flows, and driving 25%+ improvements in checkout conversion rates. Highly skilled in asynchronous documentation and remote team alignment.

---

## CORE COMPETENCIES
- **Product & UX Design:** Figma (Design Systems, Auto-Layout, Tokens), Interactive Prototyping, User Research
- **Operations & Systems:** Notion Workspace Architecture, Linear, Jira, Zapier Automation, HubSpot CRM
- **Customer Experience:** Zendesk, Intercom, Onboarding Funnel Optimization, Churn Analysis
- **Technical Literacy:** Basic HTML/CSS, Tailwind comprehension, Webflow, Google Analytics 4

---

## WORK EXPERIENCE

### Product Designer & UX Specialist (Remote)
**OmniCommerce Global** | London, UK (Remote from Pakistan)
*Jan 2024 – Present*
- Spearheaded the redesign of the multi-currency mobile checkout experience in Figma, resulting in a 22% decrease in cart abandonment across EU and Middle East markets.
- Created and maintained the company-wide Figma design system containing 200+ accessible components, decreasing engineering handoff revisions by 35%.
- Facilitated 20+ remote qualitative customer interview sessions and synthesized insights into actionable product discovery briefs.

### Remote Operations & Customer Success Lead
**SaaSFlow Inc.** | Austin, TX (Remote from Pakistan)
*Sep 2022 – Dec 2023*
- Managed customer onboarding workflows for 180+ B2B software accounts, maintaining a 98.4% Customer Satisfaction (CSAT) rating over 15 months.
- Built automated Zapier and Slack notification pipelines connecting HubSpot CRM to Stripe, saving 12 hours of manual administrative reconciliation weekly.
- Authored 45 comprehensive end-user documentation articles, reducing repetitive tier-1 support tickets by 40%.

---

## KEY PROJECTS & CASE STUDIES

### FinTrack Mobile Fintech App Redesign
- Conducted heuristic evaluation of an existing personal finance application and reconstructed navigation architecture.
- Designed 32 high-fidelity screens in Figma with interactive micro-interactions and dark mode tokens. [View Case Study: fatimanoor.design/fintrack]

---

## EDUCATION & CERTIFICATIONS
- **Google Professional UX Design Certificate** — Coursera (2023)
- **Bachelor of Business Administration (BBA in Marketing)**
  Institute of Business Administration (IBA), Karachi, Pakistan (2018 – 2022)
`,
  },
];

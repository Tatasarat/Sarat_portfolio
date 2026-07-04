const LINKS = {
  github: 'https://github.com/Tatasarat',
  linkedin: 'https://www.linkedin.com/in/sarat-tata-891514287',
  resume: '/resume_new(1).pdf', // drop resume.pdf into the /public folder
  email: 'mailto:tatasarat725@gmail.com',
  insightailive:'https://github.com/Tatasarat/aidatacopilot',
  dataCopilotLive: 'https://aidatacopilot-qqy5.vercel.app/',
}
 
const STATS = [
  { num: '170', label: 'LeetCode solved' },
  { num: '7.14', label: 'CGPA / 10' },
  { num: '4+', label: 'Products shipped' },
  { num: '15+', label: 'Tools & frameworks' },
]
 
const PROJECTS = [
  {
    title: 'InsightAI',
    status: 'live',
    statusLabel: 'Deployed',
    tagline: 'Full-stack AI analytics platform',
    bullets: [
      'Upload a CSV and query it in plain English — natural-language-to-SQL powered by LangChain + Mistral AI',
      'OTP-based authentication and a credits/subscription system with Razorpay billing',
      'Voice input, advanced chart visualizations, one-click PDF export, and a data marketplace for sharing datasets',
    ],
    tags: ['Node.js', 'Express', 'React', 'LangChain', 'Mistral AI', 'PostgreSQL (Neon)', 'Render', 'Vercel'],
    links: [
      { label: 'Live demo', href: LINKS.insightaiLive, primary: true },
      { label: 'View code', href: LINKS.github },
    ],
  },
  {
    title: 'AlgoMentor',
    status: 'wip',
    statusLabel: 'In development',
    tagline: 'DSA interview-prep platform',
    bullets: [
      'In-browser code execution across 8 languages using Monaco Editor + Judge0',
      '50 curated DSA problems with gamification, badges, contests, and company-specific prep tracks',
      'Claude API integration for AI-assisted hints and review',
    ],
    tags: ['React 19', 'TypeScript', 'Tailwind v4', 'Express 5', 'PostgreSQL', 'Prisma', 'Claude API'],
    links: [{ label: 'View code', href: LINKS.github }],
  },
  {
    title: 'News Reader',
    status: 'wip',
    statusLabel: 'Play Store track',
    tagline: 'Native Android news app',
    bullets: [
      'MVVM architecture with Retrofit networking and Room for offline caching',
      'Firebase Authentication, dark mode, category tabs, infinite scroll, swipe-to-delete saved articles',
      'Push notifications via WorkManager; tested on-device, built toward Play Store release',
    ],
    tags: ['Kotlin', 'Retrofit', 'Room', 'Navigation Component', 'Firebase', 'GNews API'],
    links: [{ label: 'View code', href: LINKS.github }],
  },
  {
    title: 'AI Data Copilot',
    status: 'live',
    statusLabel: 'Deployed',
    tagline: 'Dataset cleaning & NL analysis',
    bullets: [
      'Upload any dataset for automated cleaning, visualization, and natural-language analysis',
      'Scalable Flask APIs handling analytics and file processing',
    ],
    tags: ['Flask', 'Python', 'REST APIs'],
    links: [
      { label: 'Live demo', href: LINKS.dataCopilotLive, primary: true },
      { label: 'View code', href: LINKS.github },
    ],
  },
]
 
const SKILLS = {
  languages: ['Java', 'Python', 'JavaScript', 'TypeScript', 'SQL', 'Kotlin'],
  backend: ['Spring Boot', 'Node.js / Express', 'Flask', 'REST APIs', 'Microservices'],
  frontend: ['React.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap'],
  data: ['PostgreSQL', 'MySQL', 'Firebase Firestore', 'Prisma ORM'],
  ai_ml: ['LangChain', 'Mistral AI', 'Claude API'],
  devops: ['Git', 'GitHub', 'CI/CD', 'Postman', 'Maven', 'Render', 'Vercel', 'Railway'],
}
 
const ACHIEVEMENTS = [
  {
    title: 'Selected presenter — Navabharat, IIT Tirupati',
    desc: 'Presented "AI-Based Vegetation Value Detection System," a proposal for estimating vegetation health using AI and satellite imagery. Received an official participation/selection certificate.',
  },
  {
    title: 'Technical Member — DSV Club, BVRIT',
    desc: 'Built an IoT-based smart agriculture system integrating temperature, soil-moisture, and environmental sensor data, with a web dashboard for real-time field monitoring.',
  },
]
 
const NAV_LINKS = ['about', 'projects', 'skills', 'achievements', 'contact']
 
function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-edge bg-bg/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-3.5">
        <div className="font-mono text-sm font-bold text-accent">
          tata@career<span className="text-muted2">:~$</span>
        </div>
        <div className="flex gap-4 sm:gap-5 font-mono text-xs sm:text-[13px] text-muted">
          {NAV_LINKS.map((l) => (
            <a key={l} href={`#${l}`} className="hover:text-white transition-colors">{l}</a>
          ))}
        </div>
      </div>
    </nav>
  )
}
 
function Hero() {
  return (
    <section className="pt-14 pb-10">
      <div className="rounded-[10px] border border-edge bg-surface overflow-hidden">
        <div className="flex items-center gap-2 border-b border-edge bg-surface2 px-3.5 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          <span className="ml-2 font-mono text-xs text-muted">tata@career: ~/portfolio</span>
        </div>
        <div className="px-6 py-6 font-mono text-sm">
          <p className="mb-2.5 text-muted"><span className="text-accent">$</span> whoami</p>
          <p className="mb-4 text-[15px] text-white">Tata Sarat Kumar — Full-Stack &amp; AI Engineer, CS Undergrad @ BVRIT</p>
          <p className="mb-2.5 text-muted"><span className="text-accent">$</span> cat mission.txt</p>
          <p className="text-[15px] text-white">
            Shipping production-grade apps end to end. Open to SDE internship / new-grad roles.
            <span className="cursor-blink ml-1 inline-block h-4 w-2 -mb-0.5 bg-accent" />
          </p>
        </div>
      </div>
 
      <h1 className="mt-7 mb-1.5 font-mono text-[32px] sm:text-[44px] md:text-[52px] font-extrabold leading-[1.05] tracking-tight text-white">
        TATA SARAT<br />KUMAR
      </h1>
      <p className="mb-4.5 font-mono text-[15px] text-accent">
        // full-stack developer · ai integrations · backend systems
      </p>
      <p className="mb-6.5 max-w-[560px] text-[15px] text-muted">
        Computer Science undergraduate who builds and deploys complete products — from Postgres
        schema to production deploy — with a focus on AI-integrated web and mobile applications.
      </p>
 
      <div className="flex flex-wrap gap-3">
        <a href="#projects" className="rounded-md border border-accent bg-accent px-4.5 py-2.5 font-mono text-[13px] font-bold text-[#0B1710] hover:bg-[#8FEA9C] transition-colors">
          View projects
        </a>
        <a href={LINKS.email} className="rounded-md border border-edge px-4.5 py-2.5 font-mono text-[13px] text-white hover:border-muted2 hover:bg-surface transition-colors">
          Email me
        </a>
        <a href={LINKS.github} target="_blank" rel="noreferrer" className="rounded-md border border-edge px-4.5 py-2.5 font-mono text-[13px] text-white hover:border-muted2 hover:bg-surface transition-colors">
          GitHub
        </a>
        <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="rounded-md border border-edge px-4.5 py-2.5 font-mono text-[13px] text-white hover:border-muted2 hover:bg-surface transition-colors">
          LinkedIn
        </a>
        <a href={LINKS.resume} target="_blank" rel="noreferrer" className="rounded-md border border-edge px-4.5 py-2.5 font-mono text-[13px] text-white hover:border-muted2 hover:bg-surface transition-colors">
          Download resume
        </a>
      </div>
 
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 overflow-hidden rounded-[10px] border border-edge">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`bg-surface px-4.5 py-5 ${i < STATS.length - 1 ? 'border-r border-edge' : ''} ${i % 2 === 0 ? 'sm:border-r' : ''}`}
          >
            <div className="font-mono text-2xl font-extrabold text-accent">{s.num}</div>
            <div className="mt-1 font-mono text-[11.5px] uppercase tracking-wide text-muted">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
 
function SectionHead({ tag, title }) {
  return (
    <div className="mb-7 flex items-baseline gap-3">
      <span className="font-mono text-xs text-accent">{tag}</span>
      <h2 className="text-[22px] font-semibold text-white">{title}</h2>
    </div>
  )
}
 
function About() {
  return (
    <section id="about" className="border-t border-edge py-16">
      <SectionHead tag="01" title="about" />
      <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-9 items-start">
        <div>
          <p className="mb-3.5 text-[15px] text-muted">
            I'm a B.Tech Computer Science student at BVRIT Narsapur (expected 2027), based in
            Hyderabad, India. I like taking a product all the way from idea to a real deployed URL
            — writing the backend, wiring up the database, integrating an LLM where it earns its
            place, and getting it in front of users.
          </p>
          <p className="text-[15px] text-muted">
            Most recently I built an AI analytics platform end to end: natural-language SQL
            querying, OTP auth, a credits-based subscription system with Razorpay, and a data
            marketplace, deployed on Render and Vercel. Alongside that, I've shipped a DSA
            interview-prep platform with in-browser code execution and a native Android news app
            on a Google Play track.
          </p>
        </div>
        <div className="rounded-[10px] border border-edge bg-surface px-5 py-4.5 font-mono text-[13px]">
          {[
            ['education', 'B.Tech CSE, BVRIT'],
            ['grad_year', '2027 (expected)'],
            ['location', 'Hyderabad, IN'],
            ['focus', 'full-stack + AI'],
          ].map(([k, v], i) => (
            <div key={k} className={`flex justify-between py-1.5 ${i < 3 ? 'border-b border-edge' : ''}`}>
              <span className="text-muted">{k}</span>
              <span className="text-white">{v}</span>
            </div>
          ))}
          <div className="flex justify-between py-1.5">
            <span className="text-muted">status</span>
            <span className="text-accent">open to work</span>
          </div>
        </div>
      </div>
    </section>
  )
}
 
function ProjectCard({ p }) {
  return (
    <div className="flex flex-col rounded-xl border border-edge bg-surface px-6.5 py-6 transition-all hover:-translate-y-0.5 hover:border-muted2">
      <div className="mb-2.5 flex items-start justify-between gap-2.5">
        <h3 className="text-[17px] font-semibold text-white">{p.title}</h3>
        <span
          className={`mt-0.5 whitespace-nowrap rounded-full px-2.5 py-0.5 font-mono text-[11px] ${
            p.status === 'live' ? 'bg-accent/10 text-accent' : 'bg-amber/10 text-amber'
          }`}
        >
          {p.statusLabel}
        </span>
      </div>
      <p className="mb-3.5 font-mono text-[12.5px] text-accent">{p.tagline}</p>
      <ul className="mb-4 list-disc pl-4.5 text-sm text-muted">
        {p.bullets.map((b, i) => (
          <li key={i} className="mb-1.5">{b}</li>
        ))}
      </ul>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {p.tags.map((t) => (
          <span key={t} className="rounded border border-edge px-2 py-0.5 font-mono text-[11px] text-muted">
            {t}
          </span>
        ))}
      </div>
      <div className="mt-auto flex gap-2.5">
        {p.links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            className={
              l.primary
                ? 'rounded-md border border-accent bg-accent px-3.5 py-1.5 font-mono text-[12.5px] font-bold text-[#0B1710] hover:bg-[#8FEA9C] transition-colors'
                : 'rounded-md border border-edge px-3.5 py-1.5 font-mono text-[12.5px] text-white hover:border-accent hover:text-accent transition-colors'
            }
          >
            {l.label}
          </a>
        ))}
      </div>
    </div>
  )
}
 
function Projects() {
  return (
    <section id="projects" className="border-t border-edge py-16">
      <SectionHead tag="02" title="projects" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {PROJECTS.map((p) => <ProjectCard key={p.title} p={p} />)}
      </div>
    </section>
  )
}
 
function Skills() {
  const order = ['languages', 'backend', 'frontend', 'data', 'ai_ml', 'devops']
  return (
    <section id="skills" className="border-t border-edge py-16">
      <SectionHead tag="03" title="skills — package.json" />
      <div className="overflow-x-auto rounded-[10px] border border-edge bg-surface px-6 py-5.5 font-mono text-[13.5px]">
        <div className="text-muted2">{'{'}</div>
        {order.map((key, idx) => (
          <div key={key}>
            <div className="pl-5">
              <span className="text-rose">"{key}"</span>
              <span className="text-muted2">: [</span>
            </div>
            <div className="pl-10 text-muted">
              {SKILLS[key].map((s, i) => (
                <span key={s}>
                  <span className="text-amber">"{s}"</span>
                  {i < SKILLS[key].length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
            <div className="pl-5 text-muted2">]{idx < order.length - 1 ? ',' : ''}</div>
          </div>
        ))}
        <div className="text-muted2">{'}'}</div>
      </div>
    </section>
  )
}
 
function Achievements() {
  return (
    <section id="achievements" className="border-t border-edge py-16">
      <SectionHead tag="04" title="achievements" />
      <div className="space-y-4">
        {ACHIEVEMENTS.map((a) => (
          <div key={a.title} className="flex gap-4 rounded-[10px] border border-edge bg-surface px-5.5 py-5">
            <div className="shrink-0 font-mono text-lg text-amber">★</div>
            <div>
              <p className="mb-1.5 text-[15px] font-semibold text-white">{a.title}</p>
              <p className="text-sm text-muted">{a.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
 
function Contact() {
  const rows = [
    ['email', LINKS.email.replace('mailto:', ''), LINKS.email],
    ['phone', '+91 81439 56724', 'tel:+918143956724'],
    ['location', 'Hyderabad, Telangana, India', null],
    ['github', LINKS.github.replace('https://', ''), LINKS.github],
    ['linkedin', LINKS.linkedin.replace('https://', ''), LINKS.linkedin],
  ]
  return (
    <section id="contact" className="border-t border-edge py-16">
      <SectionHead tag="05" title="contact" />
      <div className="rounded-[10px] border border-edge bg-surface px-6 py-6 font-mono text-sm">
        <p className="mb-4 text-accent">$ curl -X GET tata.dev/contact</p>
        {rows.map(([k, v, href], i) => (
          <div key={k} className={`flex items-center gap-2.5 py-2.5 text-[13.5px] ${i < rows.length - 1 ? 'border-b border-edge' : ''}`}>
            <span className="min-w-[90px] text-muted">{k}</span>
            {href ? (
              <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="text-white hover:text-accent transition-colors">
                {v}
              </a>
            ) : (
              <span className="text-white">{v}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
 
export default function App() {
  return (
    <div className="font-sans text-white">
      <Nav />
      <div className="mx-auto max-w-content px-6">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
      </div>
      <footer className="py-8 pb-12 text-center font-mono text-xs text-muted2">
        built by tata sarat kumar · last deploy: 2026
      </footer>
    </div>
  )
}
 
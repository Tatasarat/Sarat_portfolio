import React, { useState, useEffect, useRef, useMemo } from 'react';

const CERT_SRC = (typeof window !== 'undefined' && window.__CERT__) || '/certificate.jpg';

/* ------------------------------------------------------------------ */
/* Content. The same shape is served by the backend at /api/profile.   */
/* ------------------------------------------------------------------ */
const PROFILE = {
  name: 'Tata Sarat Kumar',
  short: 'Sarat',
  email: 'tatasarat725@gmail.com',
  location: 'Hyderabad, India',
  github: 'https://github.com/Tatasarat',
  linkedin: 'https://www.linkedin.com/in/',
  roles: ['software engineer', 'AI agent builder', 'full-stack developer', 'hackathon builder'],
  summary:
    'Computer Science undergraduate (BVRIT Narsapur, 2027) who ships. I build AI-powered products end to end: the model calls, the APIs, the database, the interface, and the deployment.',
};

const PROJECTS = [
  {
    id: 'copilot',
    name: 'AI Data Copilot',
    tag: 'Full-stack AI platform',
    blurb:
      'Upload a dataset, get it cleaned automatically, then ask questions in plain English and receive charts and answers.',
    points: [
      'Dataset upload, automated cleaning and visualization in one workflow',
      'Natural-language analysis powered by an LLM through LangChain',
      'Email OTP login, credits system and Razorpay payments',
      'Voice-to-text questions, PDF export and a data marketplace',
      'Growing into an analytics product for businesses and students',
    ],
    stack: ['React', 'Node.js', 'Express', 'LangChain', 'Mistral AI', 'PostgreSQL', 'Render', 'Vercel'],
    repo: 'https://github.com/Tatasarat/aidatacopilot',
    live: '',
  },
  {
    id: 'paypal',
    name: 'PayPal AI Payments Agent',
    tag: 'PayPal AI hackathon, my idea and my build',
    blurb:
      'A smart payment app where you tell an AI agent what to pay, it prepares the payment, and you approve it with your fingerprint.',
    points: [
      'Chat and voice agent that creates invoices, pay links and payouts',
      'Guardrails: spending caps, an approval step and an audit log',
      'Passkey (Touch ID) login plus a try-the-demo mode',
      'AG Grid ledger of every payment, stored in Postgres',
      'PayPal sandbox through the Agent Toolkit and the Server SDK',
    ],
    stack: ['Next.js', 'Vercel AI SDK', 'Groq', 'PayPal Agent Toolkit', 'PayPal Server SDK', 'Prisma', 'Neon Postgres', 'AG Grid', 'WebAuthn'],
    repo: 'https://github.com/Tatasarat',
    live: '',
  },
  {
    id: 'portfolio',
    name: 'This Portfolio',
    tag: 'React + Node.js',
    blurb: 'The site you are on. A React interface with a small Express backend that serves the content and stores contact messages.',
    points: [
      'Light and dark themes, scroll-aware navigation, interactive demos',
      'Express API: profile, projects, certifications and a validated contact endpoint',
    ],
    stack: ['React', 'Vite', 'Node.js', 'Express'],
    repo: 'https://github.com/Tatasarat',
    live: '',
  },
];

const CERTS = [
  {
    id: 'ms-ai',
    title: 'Foundations of AI',
    issuer: 'Microsoft, with Edunet Foundation and AICTE',
    detail: '4-week virtual internship',
    dates: '10 Apr 2025 to 10 May 2025',
    image: true,
  },
  {
    id: 'navabharat',
    title: 'Navabharat, hosted by IIT Tirupati',
    issuer: 'IIT Tirupati',
    detail: 'Selected to present "AI-Based Vegetation Value Detection System", which estimates vegetation health from satellite imagery with AI. Participation certificate received.',
    dates: 'Selection certificate',
    image: false,
  },
];

const SKILLS = {
  Languages: ['Java', 'Python', 'JavaScript', 'TypeScript', 'SQL'],
  Backend: ['Node.js', 'Express', 'Spring Boot', 'Flask', 'REST APIs', 'Microservices'],
  Frontend: ['React', 'Next.js', 'HTML5', 'CSS3', 'Bootstrap'],
  'AI and data': ['LangChain', 'Vercel AI SDK', 'Prompting and agents', 'Mistral', 'Groq'],
  Data: ['PostgreSQL', 'MySQL', 'Prisma', 'Firebase Firestore'],
  Tools: ['Git', 'GitHub', 'Docker', 'Maven', 'CI/CD', 'Postman', 'IntelliJ IDEA', 'VS Code'],
  'Core CS': ['Data Structures and Algorithms', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks'],
};

/* ------------------------------------------------------------------ */
/* Hooks                                                               */
/* ------------------------------------------------------------------ */
function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('theme') || ''; } catch (e) { return ''; }
  });
  useEffect(() => {
    const root = document.documentElement;
    if (theme) root.setAttribute('data-theme', theme); else root.removeAttribute('data-theme');
    try { if (theme) localStorage.setItem('theme', theme); } catch (e) {}
  }, [theme]);
  const toggle = () => {
    const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const current = theme || (sysDark ? 'dark' : 'light');
    setTheme(current === 'dark' ? 'light' : 'dark');
  };
  return [theme, toggle];
}

function useRotating(items, ms) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined;
    const t = setInterval(() => setI((n) => (n + 1) % items.length), ms);
    return () => clearInterval(t);
  }, [items.length, ms]);
  return items[i];
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.35) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ids.join('|')]);
  return active;
}

function useProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? Math.min(1, window.scrollY / h) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return p;
}

function CopyButton({ text, label }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    } catch (e) {
      setDone(false);
    }
  };
  return (
    <button type="button" className="btn ghost" onClick={copy}>
      {done ? 'Copied' : label}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Nav                                                                 */
/* ------------------------------------------------------------------ */
const SECTIONS = [
  ['top', 'Home'],
  ['projects', 'Projects'],
  ['certifications', 'Certificates'],
  ['skills', 'Skills'],
  ['journey', 'Journey'],
  ['contact', 'Contact'],
];

function Nav({ onToggleTheme }) {
  const active = useActiveSection(SECTIONS.map((s) => s[0]));
  const progress = useProgress();
  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="#top" className="brand" aria-label="Back to top">
          <span className="brand-mark">TS</span>
          <span className="brand-name">Sarat</span>
        </a>
        <nav className="links" aria-label="Sections">
          {SECTIONS.map(([id, label]) => (
            <a key={id} href={'#' + id} className={active === id ? 'on' : ''}>
              {label}
            </a>
          ))}
        </nav>
        <button type="button" className="theme" onClick={onToggleTheme} aria-label="Switch light and dark theme">
          <span className="theme-dot" />
        </button>
      </div>
      <div className="progress" style={{ transform: `scaleX(${progress})` }} />
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Hero with a small "ask your data" demo                              */
/* ------------------------------------------------------------------ */
const DEMO = [
  {
    q: 'Which category earns the most?',
    a: 'Electronics leads with about 38% of revenue. Home and Beauty follow.',
    unit: '₹ lakh',
    rows: [['Electronics', 46], ['Home', 29], ['Beauty', 21], ['Books', 12], ['Toys', 8]],
  },
  {
    q: 'How are orders trending?',
    a: 'Orders grew every month since June, with the sharpest jump in October.',
    unit: 'orders',
    rows: [['Jun', 310], ['Jul', 340], ['Aug', 380], ['Sep', 410], ['Oct', 520]],
  },
  {
    q: 'Where do returns come from?',
    a: 'South has the highest return rate at 9.2%. West is the lowest.',
    unit: '% returns',
    rows: [['South', 9.2], ['North', 6.8], ['East', 5.1], ['West', 3.9]],
  },
];

function CopilotDemo() {
  const [idx, setIdx] = useState(0);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    setShown(false);
    const t = setTimeout(() => setShown(true), 60);
    return () => clearTimeout(t);
  }, [idx]);
  const d = DEMO[idx];
  const max = Math.max(...d.rows.map((r) => r[1]));
  return (
    <div className="demo" role="group" aria-label="AI Data Copilot sample conversation">
      <div className="demo-bar">
        <span className="demo-dots"><i /><i /><i /></span>
        <span className="mono">ai-data-copilot · sample data</span>
      </div>
      <div className="demo-body">
        <div className="chips">
          {DEMO.map((x, i) => (
            <button key={x.q} type="button" className={'chip' + (i === idx ? ' on' : '')} onClick={() => setIdx(i)}>
              {x.q}
            </button>
          ))}
        </div>
        <p className="demo-answer">{d.a}</p>
        <div className="bars" aria-label={d.unit}>
          {d.rows.map(([label, v]) => (
            <div className="bar-row" key={label}>
              <span className="bar-label">{label}</span>
              <span className="bar-track">
                <span className="bar-fill" style={{ width: shown ? (v / max) * 100 + '%' : '0%' }} />
              </span>
              <span className="bar-val mono">{v}</span>
            </div>
          ))}
        </div>
        <p className="mono demo-unit">unit: {d.unit}. Illustrative numbers, not real customer data.</p>
      </div>
    </div>
  );
}

function Hero() {
  const role = useRotating(PROFILE.roles, 2200);
  return (
    <section id="top" className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow mono">Hyderabad · B.Tech CSE · Class of 2027</p>
          <h1>
            {PROFILE.name}
            <span className="h1-sub">
              builds <em key={role} className="swap">{role}</em>
            </span>
          </h1>
          <p className="lead">{PROFILE.summary}</p>
          <div className="cta-row">
            <a className="btn primary" href="#projects">See my projects</a>
            <a className="btn ghost" href="#contact">Get in touch</a>
            <a className="btn ghost" href={PROFILE.github} target="_blank" rel="noreferrer">GitHub</a>
          </div>
          <dl className="facts">
            <div><dt>Looking for</dt><dd>SDE internships and new-grad roles</dd></div>
            <div><dt>Recent</dt><dd>PayPal AI hackathon, Nov 2026</dd></div>
          </dl>
        </div>
        <CopilotDemo />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */
function PayPalFlow() {
  const [amount, setAmount] = useState(25);
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const timers = useRef([]);
  const CAP = 100;
  const blocked = amount > CAP;
  const steps = [
    ['You say it', `"Send ₹${amount} to Ravi for lunch"`],
    ['Agent prepares', `payout · recipient: Ravi · amount: ₹${amount}`],
    ['Guardrails check', blocked ? `Blocked: ₹${amount} is over the ₹${CAP} per-payment cap` : `Within the ₹${CAP} per-payment cap`],
    ['You approve', blocked ? 'Nothing to approve' : 'Fingerprint confirmed'],
    ['PayPal sandbox', blocked ? 'No payout created' : 'Payout sent and written to the ledger'],
  ];
  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => clear, []);
  const run = () => {
    clear();
    setRunning(true);
    setStep(0);
    const last = blocked ? 2 : 4;
    for (let i = 1; i <= last; i++) {
      timers.current.push(setTimeout(() => { setStep(i); if (i === last) setRunning(false); }, i * 650));
    }
  };
  const reset = () => { clear(); setRunning(false); setStep(0); };
  return (
    <div className="flow">
      <div className="flow-head">
        <label htmlFor="amt" className="mono">Try an amount</label>
        <input
          id="amt"
          type="range"
          min="5"
          max="150"
          step="5"
          value={amount}
          onChange={(e) => { setAmount(Number(e.target.value)); reset(); }}
        />
        <output className="mono" htmlFor="amt">₹{amount}</output>
        <button type="button" className="btn primary sm" onClick={run} disabled={running}>
          {running ? 'Running' : 'Run payment'}
        </button>
      </div>
      <ol className="flow-steps">
        {steps.map(([t, d], i) => {
          const state = i < step ? 'done' : i === step && (running || step > 0) ? 'now' : 'idle';
          const stop = blocked && i === 2 && step >= 2;
          return (
            <li key={t} className={state + (stop ? ' stop' : '')}>
              <span className="flow-n mono">{i + 1}</span>
              <span className="flow-t">{t}</span>
              <span className="flow-d mono">{state === 'idle' ? '...' : d}</span>
            </li>
          );
        })}
      </ol>
      <p className="mono demo-unit">Walkthrough of the agent flow. The ₹{CAP} cap is an example setting. Runs against the PayPal sandbox only.</p>
    </div>
  );
}

function Projects() {
  const [id, setId] = useState('copilot');
  const p = PROJECTS.find((x) => x.id === id);
  return (
    <section id="projects" className="section">
      <div className="wrap">
        <h2>Projects</h2>
        <p className="section-lead">Two products I designed and built myself, plus the site you are reading.</p>
        <div className="tabs" role="tablist" aria-label="Projects">
          {PROJECTS.map((x) => (
            <button
              key={x.id}
              role="tab"
              type="button"
              aria-selected={x.id === id}
              className={'tab' + (x.id === id ? ' on' : '')}
              onClick={() => setId(x.id)}
            >
              {x.name}
            </button>
          ))}
        </div>
        <article className="project" key={p.id}>
          <div className="project-main">
            <p className="eyebrow mono">{p.tag}</p>
            <h3>{p.name}</h3>
            <p className="lead">{p.blurb}</p>
            <ul className="points">
              {p.points.map((x) => <li key={x}>{x}</li>)}
            </ul>
            <div className="stack">
              {p.stack.map((s) => <span className="pill mono" key={s}>{s}</span>)}
            </div>
            <div className="cta-row">
              <a className="btn primary" href={p.repo} target="_blank" rel="noreferrer">View code</a>
              {p.live ? <a className="btn ghost" href={p.live} target="_blank" rel="noreferrer">Live site</a> : null}
            </div>
          </div>
          <div className="project-side">
            {p.id === 'paypal' ? <PayPalFlow /> : null}
            {p.id === 'copilot' ? (
              <div className="flow">
                <p className="mono side-title">From file to answer</p>
                <ol className="flow-steps static">
                  {[['Upload', 'CSV or Excel dataset'], ['Clean', 'Missing values and duplicates handled'], ['Ask', 'Plain-English question, typed or spoken'], ['See', 'Chart, answer and a PDF export']].map(([t, d], i) => (
                    <li key={t} className="done">
                      <span className="flow-n mono">{i + 1}</span>
                      <span className="flow-t">{t}</span>
                      <span className="flow-d mono">{d}</span>
                    </li>
                  ))}
                </ol>
                <p className="mono demo-unit">Try the live sample at the top of this page.</p>
              </div>
            ) : null}
            {p.id === 'portfolio' ? (
              <div className="flow">
                <p className="mono side-title">API</p>
                <ul className="api mono">
                  <li><b>GET</b> /api/profile</li>
                  <li><b>GET</b> /api/projects</li>
                  <li><b>GET</b> /api/certifications</li>
                  <li><b>POST</b> /api/contact</li>
                </ul>
              </div>
            ) : null}
          </div>
        </article>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Certificates                                                        */
/* ------------------------------------------------------------------ */
function Certifications() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);
  return (
    <section id="certifications" className="section alt">
      <div className="wrap">
        <h2>Certificates and recognition</h2>
        <div className="cert-grid">
          {CERTS.map((c) => (
            <article className="cert" key={c.id}>
              <p className="eyebrow mono">{c.dates}</p>
              <h3>{c.title}</h3>
              <p className="cert-issuer">{c.issuer}</p>
              <p className="cert-detail">{c.detail}</p>
              {c.image ? (
                <button type="button" className="btn ghost" onClick={() => setOpen(true)}>View certificate</button>
              ) : null}
            </article>
          ))}
        </div>
      </div>
      {open ? (
        <div className="modal" role="dialog" aria-modal="true" aria-label="Certificate" onClick={() => setOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <img src={CERT_SRC} alt="Microsoft Foundations of AI certificate of completion for Sarat Kumar Tata" />
            <button type="button" className="btn primary" onClick={() => setOpen(false)}>Close</button>
          </div>
        </div>
      ) : null}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */
function Skills() {
  const groups = Object.keys(SKILLS);
  const [group, setGroup] = useState('All');
  const list = useMemo(
    () => (group === 'All' ? groups : [group]),
    [group]
  );
  return (
    <section id="skills" className="section">
      <div className="wrap">
        <h2>Skills</h2>
        <div className="tabs" role="tablist" aria-label="Skill groups">
          {['All', ...groups].map((g) => (
            <button key={g} type="button" role="tab" aria-selected={g === group} className={'tab' + (g === group ? ' on' : '')} onClick={() => setGroup(g)}>
              {g}
            </button>
          ))}
        </div>
        <div className="skill-grid">
          {list.map((g) => (
            <div className="skill-group" key={g}>
              <h3 className="mono">{g}</h3>
              <div className="stack">
                {SKILLS[g].map((s) => <span className="pill mono" key={s}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Journey                                                             */
/* ------------------------------------------------------------------ */
const JOURNEY = [
  ['2027', 'B.Tech, Computer Science and Engineering', 'BVRIT Narsapur, Telangana. CGPA 7.14 / 10.'],
  ['2026', 'PayPal AI hackathon', 'Designed and built an AI payments agent with passkey approval, guardrails and a ledger.'],
  ['2025', 'Microsoft Foundations of AI internship', 'Four weeks with Edunet Foundation and AICTE.'],
  ['Club', 'Technical Member, DSV Club, BVRIT', 'Built an IoT smart-agriculture system: sensors for temperature, soil moisture and environment, with a real-time web dashboard, backend integration and deployment.'],
  ['IIT', 'Navabharat at IIT Tirupati', 'Selected to present an AI and satellite-imagery idea for estimating vegetation health.'],
];

function Journey() {
  return (
    <section id="journey" className="section alt">
      <div className="wrap">
        <h2>Journey</h2>
        <ul className="journey">
          {JOURNEY.map(([k, t, d]) => (
            <li key={t}>
              <span className="j-k mono">{k}</span>
              <div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */
function Contact({ api }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ kind: '', text: '' });
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const composed = `From: ${form.name} <${form.email}>\n\n${form.message}`;

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email) || form.message.trim().length < 10) {
      setStatus({ kind: 'err', text: 'Add your name, a valid email and a message of at least 10 characters.' });
      return;
    }
    if (!api) {
      try {
        await navigator.clipboard.writeText(composed);
        setStatus({ kind: 'ok', text: 'Message copied. Paste it into an email to ' + PROFILE.email + '.' });
      } catch (err) {
        setStatus({ kind: 'err', text: 'Copy failed. Email ' + PROFILE.email + ' directly.' });
      }
      return;
    }
    setBusy(true);
    try {
      const r = await fetch(api + '/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || 'Request failed');
      setStatus({ kind: 'ok', text: 'Thanks, your message is in. I will reply by email.' });
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({ kind: 'err', text: err.message });
    } finally {
      setBusy(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="wrap contact-grid">
        <div>
          <h2>Let's build something</h2>
          <p className="lead">I am open to SDE internships and new-grad roles. The fastest way to reach me is email.</p>
          <p className="mail mono">{PROFILE.email}</p>
          <div className="cta-row">
            <CopyButton text={PROFILE.email} label="Copy email" />
            <a className="btn ghost" href={PROFILE.github} target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
        <form className="form" onSubmit={submit} noValidate>
          <label htmlFor="c-name">Name</label>
          <input id="c-name" value={form.name} onChange={set('name')} autoComplete="name" />
          <label htmlFor="c-email">Email</label>
          <input id="c-email" type="email" value={form.email} onChange={set('email')} autoComplete="email" />
          <label htmlFor="c-msg">Message</label>
          <textarea id="c-msg" rows="5" value={form.message} onChange={set('message')} />
          <button type="submit" className="btn primary" disabled={busy}>
            {api ? (busy ? 'Sending' : 'Send message') : 'Copy message'}
          </button>
          <p className={'status ' + status.kind} role="status">{status.text}</p>
          {!api ? <p className="mono demo-unit">This hosted preview has no server, so the message is copied for you to paste into an email.</p> : null}
        </form>
      </div>
    </section>
  );
}

export default function App({ api = '' }) {
  const [, toggle] = useTheme();
  return (
    <>
      <Nav onToggleTheme={toggle} />
      <main>
        <Hero />
        <Projects />
        <Certifications />
        <Skills />
        <Journey />
        <Contact api={api} />
      </main>
      <footer className="footer">
        <div className="wrap foot">
          <span>{PROFILE.name} · {PROFILE.location}</span>
          <span className="mono">Built with React and Node.js</span>
        </div>
      </footer>
    </>
  );
}

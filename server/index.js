import express from 'express';
import cors from 'cors';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MESSAGES_FILE = path.join(__dirname, 'messages.json');
const PORT = process.env.PORT || 5000;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';

const profile = {
  name: 'Tata Sarat Kumar',
  email: 'tatasarat725@gmail.com',
  location: 'Hyderabad, India',
  education: 'B.Tech CSE, BVRIT Narsapur, 2027',
  github: 'https://github.com/Tatasarat',
};

const projects = [
  {
    id: 'copilot',
    name: 'AI Data Copilot',
    summary: 'Upload a dataset, clean it automatically, and analyse it in plain English.',
    stack: ['React', 'Node.js', 'Express', 'LangChain', 'Mistral AI', 'PostgreSQL'],
    repo: 'https://github.com/Tatasarat/aidatacopilot',
  },
  {
    id: 'paypal',
    name: 'PayPal AI Payments Agent',
    summary: 'AI agent that prepares PayPal payments, guarded by caps and fingerprint approval.',
    stack: ['Next.js', 'Vercel AI SDK', 'Groq', 'PayPal Agent Toolkit', 'Prisma', 'Neon Postgres'],
  },
];

const certifications = [
  {
    title: 'Foundations of AI',
    issuer: 'Microsoft, Edunet Foundation, AICTE',
    dates: '2025-04-10 to 2025-05-10',
  },
  { title: 'Navabharat, IIT Tirupati', issuer: 'IIT Tirupati', dates: 'Selection certificate' },
];

const app = express();
app.use(cors({ origin: ALLOWED_ORIGIN }));
app.use(express.json({ limit: '10kb' }));

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.get('/api/profile', (_req, res) => res.json(profile));
app.get('/api/projects', (_req, res) => res.json(projects));
app.get('/api/certifications', (_req, res) => res.json(certifications));

// Very small in-memory rate limit: 5 messages per IP per 10 minutes.
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

app.post('/api/contact', async (req, res) => {
  if (limited(req.ip)) return res.status(429).json({ error: 'Too many messages. Try again later.' });
  const { name = '', email = '', message = '' } = req.body || {};
  if (!name.trim() || name.length > 100) return res.status(400).json({ error: 'Name is required.' });
  if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 200) return res.status(400).json({ error: 'A valid email is required.' });
  if (message.trim().length < 10 || message.length > 3000) return res.status(400).json({ error: 'Message must be 10 to 3000 characters.' });

  let all = [];
  try {
    all = JSON.parse(await fs.readFile(MESSAGES_FILE, 'utf8'));
  } catch {
    all = [];
  }
  all.push({ name: name.trim(), email: email.trim(), message: message.trim(), at: new Date().toISOString() });
  await fs.writeFile(MESSAGES_FILE, JSON.stringify(all, null, 2));
  res.status(201).json({ ok: true });
});

app.listen(PORT, () => console.log(`Portfolio API on http://localhost:${PORT}`));

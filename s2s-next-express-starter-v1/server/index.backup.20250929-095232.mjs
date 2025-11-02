import express from 'express';

const app = express();
app.use(express.json());

// CORS local (front 3000 -> API 4001)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // OK en local
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// Santé
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, ts: Date.now() });
});

// Generate neutre & légal
app.post('/api/generate', (req, res) => {
  const body  = req.body || {};
  const kind  = (body.kind || 'generic') + '';
  const input = body.input || {};

  const stamp = new Date().toISOString().slice(0,19).replace('T',' ');
  const title = input.title || input.name || (kind.charAt(0).toUpperCase()+kind.slice(1)) + ' Draft';
  const party = input.party || '?';
  const lvl   = input.level || input.tier || '?';
  const theme = input.theme || input.type || input.cat || 'adventure';

  const synopsis =
`[[${kind.toUpperCase()}]] ${stamp}
Party: ${party} • Level/Tier: ${lvl}
Theme: ${theme}

Synopsis:
A system-agnostic, legally neutral ${kind} outline based on the provided fields.
Focus on original names, generic mechanics, and reusable structure (no copyrighted stat blocks or lore).`;

  res.json({ ok: true, result: { kind, title, synopsis, text: synopsis } });
});

// Démarrage
const HOST = '127.0.0.1';
const PORT = 4001;
app.listen(PORT, HOST, () => {
  console.log(`[server] listening on http://${HOST}:${PORT}`);
});

import express from 'express';

const app  = express();
const HOST = '127.0.0.1';
const PORT = 4001;

// Middlewares
app.use(express.json());

// CORS local (3000 -> 4001)
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

// Generate neutre & légal (pour le bouton "Generate")
app.post('/api/generate', (req, res) => {
  const { kind = 'generic', input = {} } = req.body || {};
  const stamp = new Date().toISOString().slice(0,19).replace('T',' ');
  const title = input.title || input.name || (kind.charAt(0).toUpperCase()+kind.slice(1)) + ' Draft';
  const party = input.party || '?';
  const lvl   = input.level || input.tier || '?';
  const theme = input.theme || input.type || input.cat || 'adventure';

  const synopsis =
    '[[ ' + kind.toUpperCase() + ' ]] ' + stamp + '\n' +
    'Party: ' + party + ' • Level/Tier: ' + lvl + '\n' +
    'Theme: ' + theme + '\n\n' +
    'Synopsis:\n' +
    'A system-agnostic, legally neutral ' + kind + ' outline based on the provided fields.\n' +
    'Focus on original names, generic mechanics, and reusable structure (no copyrighted stat blocks or lore).';

  res.json({
    ok: true,
    result: { kind, title, synopsis, text: synopsis }
  });
});

// Start
app.listen(PORT, HOST, () => {
  console.log('[server] listening on http://' + HOST + ':' + PORT);
});

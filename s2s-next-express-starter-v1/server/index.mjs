import express from 'express';

const app = express();
app.use(express.json());

// CORS (local only)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// health
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, ts: Date.now() });
});

// generate (neutral, original content)
app.post('/api/generate', (req, res) => {
  const { kind = 'generic', input = {} } = req.body || {};
  const ts = new Date().toISOString().slice(0,19).replace('T',' ');
  const title = input.title || input.name || (kind[0].toUpperCase()+kind.slice(1))+' Draft';
  const party = input.party || '?';
  const lvl   = input.level || input.tier || '?';
  const theme = input.theme || input.type || input.cat || 'adventure';

  const synopsis =
`[[${kind.toUpperCase()}]] ${ts}
Party: ${party} • Level/Tier: ${lvl}
Theme: ${theme}

Synopsis:
A system-agnostic, legally neutral ${kind} outline based on provided fields.`;

  res.json({ ok: true, result: { kind, title, synopsis, text: synopsis } });
});

const PORT = process.env.PORT || 4001;
const HOST = '127.0.0.1';
const server = app.listen(PORT, HOST, () => {
  console.log(`[server] listening on http://${HOST}:${PORT}`);
});
server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.error('Port 4001 déjà utilisé. Tuez l’ancien processus:');
    console.error("  ps -A | grep 'node .*server'");
    console.error("  pkill -f 'node .*server'");
  } else {
    console.error(e);
  }
  process.exit(1);
});

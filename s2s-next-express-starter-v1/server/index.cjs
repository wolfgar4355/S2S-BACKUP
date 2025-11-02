const express = require('express');
const app = express();

app.use(express.json()); // body JSON

// Monte les routes d'image sous /api
const imageRoutes = require('./routes/generate-image.cjs');
app.use('/api', imageRoutes);

// Santé
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, ts: Date.now() });
});

// Démarrage
const PORT = process.env.PORT || 4001;
const HOST = process.env.HOST || '127.0.0.1';
app.listen(PORT, HOST, () => {
  console.log(`[server] listening on http://${HOST}:${PORT}`);
});





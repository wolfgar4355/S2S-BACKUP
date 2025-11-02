const express = require('express');
const router = express.Router();
const monsterSvg = require('../lib/monsterSvg.cjs');

// ping de debug
router.get('/_ping_image', (_req, res) => {
  res.type('text/plain').send('pong');
});

// génération d'image (SVG renvoyé)
router.post('/generate/image', (req, res) => {
  const { name, rarity, biome } = req.body || {};
  const svg = monsterSvg({ name, rarity, biome });
  res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=300');
  res.status(200).send(svg);
});

module.exports = router;

import express from "express";
const router = express.Router();

function monsterSvg({ name = "Unknown", rarity = "Common", biome = "Forest" }) {
  const badge = rarity.toUpperCase();
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
  <rect width="100%" height="100%" fill="#EFE3C8"/>
  <rect x="24" y="24" width="752" height="552" fill="none" stroke="#1B1A17" stroke-width="4"/>
  <text x="50%" y="18%" font-size="42" text-anchor="middle" fill="#1B1A17" font-family="serif">${name}</text>
  <text x="50%" y="28%" font-size="18" text-anchor="middle" fill="#1B1A17" font-family="sans-serif">Biome: ${biome}</text>
  <g transform="translate(150,180)">
    <circle cx="250" cy="180" r="120" fill="none" stroke="#1B1A17" stroke-width="3"/>
    <path d="M200 220 L250 120 L300 220 Z" fill="none" stroke="#1B1A17" stroke-width="3"/>
    <circle cx="220" cy="170" r="8" fill="#1B1A17"/><circle cx="280" cy="170" r="8" fill="#1B1A17"/>
  </g>
  <rect x="28" y="520" rx="8" ry="8" width="180" height="48" fill="none" stroke="#1B1A17" stroke-width="2"/>
  <text x="118" y="551" font-size="16" text-anchor="middle" fill="#1B1A17" font-family="sans-serif">${badge}</text>
</svg>`;
}

router.post("/generate/image", async (req, res) => {
  try {
    const { name, rarity, biome } = req.body || {};
    const svg = monsterSvg({ name, rarity, biome });
    res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=300");
    return res.status(200).send(svg);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok:false, error:"IMAGE_GENERATE_FAILED" });
  }
});

export default router;

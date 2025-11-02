import { Router } from 'express';
const router = Router();
const FAQ = [
  {q:'pnj', a:'Click PNJ in Generators. Roles/traits vary by world.'},
  {q:'quest', a:'Pick duration (one-shot/short/long/epic) & world; a BBEG is generated.'},
  {q:'maps', a:'Generic maps, Foundry/UVTT exports; no trademarks.'},
  {q:'galactic', a:'Galactic Saga = legal space-opera (original vocabulary).'},
  {q:'export foundry', a:'Use Exporter → Foundry button after generating a map.'}
];
router.post('/help/ask', (req,res)=>{
  const text = (req.body?.q||'').toLowerCase();
  const hit = FAQ.find(f => text.includes(f.q)) || { a: 'Try keywords: "pnj", "quest", "maps", "galactic", "export foundry".' };
  res.json({ ok:true, reply: hit.a });
});
export default router;
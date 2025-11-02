import { Router } from 'express';
const router = Router();
const FAQ = [
  {q:'pnj', a:'Clique PNJ dans Generateurs. Pour le monde Galactic, roles et hooks 100% originaux et legaux.'},
  {q:'quete', a:'Choisis la duree (one-shot, courte, longue, epique) et le monde; un BBEG est genere automatiquement.'},
  {q:'espace', a:'Le monde Galactic Saga (Space-Opera) est neutre juridiquement: pas de noms proteges ni d\'elements marques.'}
];
router.post('/help/ask', (req,res)=>{
  const text = (req.body?.q||'').toLowerCase();
  const hit = FAQ.find(f => text.includes(f.q)) || { a: 'Bonjour! Tape un mot-cle (ex: "pnj", "quete", "espace").' };
  res.json({ ok:true, reply: hit.a });
});
export default router;
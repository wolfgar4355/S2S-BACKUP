import { Router } from 'express';
const router = Router();
const FAQ = [
  {q:'pnj', a:'Clique PNJ dans Generateurs. Le quota depend de ton plan (Guest/NPC).'},
  {q:'quete', a:'Choisis la duree (one-shot, courte, longue, epique) et le monde. Un BBEG est propose.'},
  {q:'export', a:'Exports Foundry/UVTT/Roll20 generiques (non marques), compatibles VTT.'},
  {q:'party', a:'Le plan Party partage le prix; invitation par lien ou email.'},
  {q:'cartes', a:'Editeur: portes, lumieres, labels/POI, grille pour Roll20.'}
];
router.post('/help/ask', (req,res)=>{
  const text = (req.body?.q||'').toLowerCase();
  const hit = FAQ.find(f => text.includes(f.q)) || { a: 'Bonjour! Tape un mot-cle (ex: "pnj", "quete", "export")' };
  res.json({ ok:true, reply: hit.a });
});
export default router;
import { Router } from 'express';
const router = Router();
router.post('/quest/generate', (req,res)=>{
  const { size='one-shot', world='Classic' } = req.body||{};
  const acts = size==='one-shot' ? 1 : (size==='short' ? 3 : (size==='long' ? 6 : 8));
  const titles = world==='Galactic' ? ['Chant de l\'hyperespace','La Balise oubliee','Nebuleuse des cendres','Fragments d\'aurore'] : ['L\'echo des ruines','La cite sous les marais','Les anneaux de braise','Les etoiles muettes'];
  const bbeg = world==='Galactic' ? { name:'Le Regent du Vide', motive:'activer un relais antique', flaw:'hybris technologique' } : { name:'L\'Onde-Noire', motive:'briser le sceau ancien', flaw:'arrogance rituelle' };
  const quest = { title: titles[Math.floor(Math.random()*titles.length)], bbeg, acts: Array.from({length:acts}).map((_,i)=>({act:i+1, goal:(world==='Galactic'?'Sequence':'Objectif')+' '+(i+1), twist: (i%2?(world==='Galactic'?'contact ambigu':'allie douteux'):(world==='Galactic'?'balise piegee':'piege ancien'))})), world };
  res.json({ ok:true, quest });
});
export default router;
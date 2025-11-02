import { Router } from 'express';
const router = Router();
router.post('/quest/generate', (req,res)=>{
  const { size='one-shot', world='Classic', partySize=4, partyLevel=1 } = req.body||{};
  const acts = size==='one-shot' ? 1 : (size==='short' ? 3 : (size==='long' ? 6 : 8));
  const titles = world==='Galactic' ? ['Chant de l\'hyperespace','La Balise oubliee','Nebuleuse des cendres','Fragments d\'aurore'] : ['L\'echo des ruines','La cite sous les marais','Les anneaux de braise','Les etoiles muettes'];
  const bbeg = world==='Galactic' ? { name:'Le Regent du Vide', motive:'activer un relais antique', flaw:'hybris technologique' } : { name:'L\'Onde-Noire', motive:'briser un sceau ancien', flaw:'arrogance rituelle' };
  const scenesPool = ['Ambush','Social leverage','Hazard','Puzzle','Stealth','Chase','Siege','Negotiation'];
  const actsArr = Array.from({length:acts}).map((_,i)=>{
    const s1 = scenesPool[(i*2)%scenesPool.length]; const s2 = scenesPool[(i*2+1)%scenesPool.length];
    return { act:i+1, goal:(world==='Galactic'?'Sequence':'Objectif')+' '+(i+1), scenes:[
      { id:'A'+(i+1)+'S1', setup:'Setup '+s1, obstacle:'Obstacle '+s1 },
      { id:'A'+(i+1)+'S2', setup:'Setup '+s2, obstacle:'Obstacle '+s2 }
    ], twist: (i%2?(world==='Galactic'?'contact ambigu':'allie douteux'):(world==='Galactic'?'balise piegee':'piege ancien')) };
  });
  const dmOnly = { secrets: ['La cle se trouve derriere le vitrail','Un allie trahit a l\'acte 3'], timers: [{ rounds:6, effect:'Renforts arrives' }] };
  const quest = { title: titles[Math.floor(Math.random()*titles.length)], bbeg, acts: actsArr, world, party:{size:partySize, level:partyLevel}, dmOnly };
  res.json({ ok:true, quest });
});
export default router;
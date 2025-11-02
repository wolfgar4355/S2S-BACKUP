import { Router } from 'express';
const router = Router();
function r(a){ return a[Math.floor(Math.random()*a.length)]; }
const tables = {
  Classic: [ { item:'bague gravee', rarity:'commun' }, { item:'lame d\'obsidienne', rarity:'peu commun' }, { item:'vial de lumiere', rarity:'rare' }, { item:'plaque d\'onyx chuchotant', rarity:'epique' } ],
  Urban: [ { item:'breloc de cuivre', rarity:'commun' }, { item:'miroir terni', rarity:'peu commun' }, { item:'bouteille d\'ambre', rarity:'rare' } ],
  Grimdark: [ { item:'fiole de suie', rarity:'commun' }, { item:'lame rouillee', rarity:'peu commun' }, { item:'sceau de cendres', rarity:'rare' } ],
  SciFantasy: [ { item:'lentille aetherique', rarity:'peu commun' }, { item:'diode runique', rarity:'rare' } ],
  Desert: [ { item:'perle de dune', rarity:'peu commun' }, { item:'carte effacee', rarity:'commun' } ],
  Arctique: [ { item:'harpon en os', rarity:'commun' }, { item:'lampe polaire', rarity:'peu commun' } ],
  Galactic: [ { item:'cristal de flux', rarity:'peu commun' }, { item:'noyau de translation', rarity:'rare' }, { item:'matrice de blindage', rarity:'rare' }, { item:'balise d\'aurore', rarity:'epique' } ]
};
router.post('/loot/generate', (req,res)=>{
  const { world='Classic', difficulty='standard', act=1 } = req.body||{};
  const table = tables[world] || tables.Classic;
  const loot = Array.from({length:3}).map(()=>r(table));
  res.json({ ok:true, act, world, difficulty, loot });
});
export default router;
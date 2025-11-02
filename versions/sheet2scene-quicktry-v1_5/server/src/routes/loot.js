import { Router } from 'express';
const router = Router();
router.post('/loot/generate', (req,res)=>{
  const { difficulty='standard', act=1, world='Classic' } = req.body||{};
  const table = [ { item:'bague gravee', rarity:'commun' }, { item:'lame d\'obsidienne', rarity:'peu commun' }, { item:'vial de lumiere', rarity:'rare' }, { item:'plaque d\'onyx chuchotant', rarity:'epique' } ];
  const loot = Array.from({length:3}).map(()=>table[Math.floor(Math.random()*table.length)]);
  res.json({ ok:true, act, world, difficulty, loot });
});
export default router;
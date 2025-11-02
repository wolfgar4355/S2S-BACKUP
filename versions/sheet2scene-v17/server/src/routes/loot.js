
import { Router } from 'express'; const router = Router();
router.post('/loot/generate', (req,res)=>{
  const { difficulty='standard', act=1, world='Classic' } = req.body||{};
  const table = [ { item:'bague gravée', rarity:'commun' }, { item:'lame d’obsidienne', rarity:'peu commun' }, { item:'vial de lumière', rarity:'rare' }, { item:'plaque d’onyx chuchotant', rarity:'épique' } ];
  const loot = Array.from({length:3}).map(()=>table[Math.floor(Math.random()*table.length)]);
  res.json({ ok:true, act, world, difficulty, loot });
});
export default router;

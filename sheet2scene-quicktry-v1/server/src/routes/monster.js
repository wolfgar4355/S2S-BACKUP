import { Router } from 'express';
const router = Router();
router.post('/monster/generate', (req,res)=>{
  const { tier='standard', world='Classic', biome='ruines' } = req.body||{};
  const names = ['Rôdeur de pierre','Vermine luminescente','Éco-spectre','Gardien d’ardoise','Tisseur d’ombre'];
  const m = { name: names[Math.floor(Math.random()*names.length)], world, biome, tier, stats: { hp: 20+Math.floor(Math.random()*20), atk: 4+Math.floor(Math.random()*4), def: 2+Math.floor(Math.random()*3) }, image: 'https://picsum.photos/seed/monster'+Math.floor(Math.random()*999)+'/640/640' };
  res.json({ ok:true, monster: m });
});
export default router;
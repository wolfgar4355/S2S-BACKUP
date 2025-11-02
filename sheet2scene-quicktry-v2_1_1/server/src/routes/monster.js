import { Router } from 'express';
const router = Router();
function r(a){ return a[Math.floor(Math.random()*a.length)]; }
const beasts = { 
  Classic: ['Rodeur de pierre','Vermine luminescente','Echo-spectre','Gardien d\'ardoise','Tisseur d\'ombre'],
  Urban: ['Chasseur crepusculaire','Errant des egouts','Ame liee','Hurleur de nuit'],
  Grimdark: ['Berserker rouille','Goule cendre','Loup de scories','Haruspice'],
  SciFantasy: ['Gargouille aetherique','Cyclope d\'obsidiane','Serpent des vents'],
  Desert: ['Ver des dunes','Chacal blanc','Roc fauve','Sculpteur de mirages'],
  Arctique: ['Yeti des banquises','Harponneur spectral','Loup boreal'],
  Galactic: ['Drone sentinelle','Charognard stellaire','Parasite de coque','Leviathan des anneaux','Fange magnetique']
};
router.post('/monster/generate', (req,res)=>{
  const { world='Classic', tier='standard', biome='ruines' } = req.body||{};
  const name = r(beasts[world] || beasts.Classic);
  const m = { name, world, biome, tier, stats: { hp: 20+Math.floor(Math.random()*20), atk: 4+Math.floor(Math.random()*4), def: 2+Math.floor(Math.random()*3) }, image: 'https://picsum.photos/seed/monster'+Math.floor(Math.random()*999)+'/640/640' };
  res.json({ ok:true, monster: m });
});
export default router;
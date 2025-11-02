
import { Router } from 'express'; const router = Router();
router.post('/quest/generate', (req,res)=>{
  const { size='one-shot', partySize=4, partyLevel=1, world='Classic' } = req.body||{};
  const acts = size==='one-shot' ? 1 : (size==='short'? 3 : (size==='long'? 6 : 8));
  const titles = { 'one-shot': \"L'écho des ruines\", short:'La cité sous les marais', long:'Les anneaux de braise', epic:'Les étoiles muettes' };
  const quest = { title: titles[size]||titles['one-shot'], bbeg:{ name:'L’Onde‑Noire', motive:'briser le sceau ancien', flaw:'arrogance rituelle' }, hooks:['disparitions au marché','artefacts contrefaits','comète de mauvais augure'], acts: Array.from({length:acts}).map((_,i)=>({ act:i+1, goal:'Progresser vers le sanctuaire '+(i+1), twist: (i%2? 'allié douteux' : 'piège ancien') })), world, party:{ size:partySize, level:partyLevel } };
  res.json({ ok:true, quest });
});
export default router;

import { Router } from 'express';
const router = Router();
router.post('/quest/generate', (req,res)=>{
  const { size='one-shot', partySize=4, partyLevel=1, world='Classic' } = req.body||{};
  const acts = size==='one-shot' ? 1 : (size==='short' ? 3 : (size==='long' ? 6 : 8));
  const quest = { title: (size==='one-shot'?'L\'écho des ruines':(size==='short'?'La cité sous les marais':(size==='long'?'Les anneaux de braise':'Les étoiles muettes'))), bbeg:{ name:'L\'Onde‑Noire', motive:'briser le sceau ancien', flaw:'arrogance rituelle' }, acts: Array.from({length:acts}).map((_,i)=>({act:i+1, goal:'Objectif '+(i+1), twist: (i%2?'allié douteux':'piège ancien')})), world, party:{size:partySize, level:partyLevel} };
  res.json({ ok:true, quest });
});
export default router;
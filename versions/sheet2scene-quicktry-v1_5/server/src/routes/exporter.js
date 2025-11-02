import { Router } from 'express';
const router = Router();
router.post('/export/scene', (req,res)=>{
  const { name='Edited Scene', width=1024, height=768, gridSize=70, doors=[], lights=[], labels=[] } = req.body||{};
  const foundry = { name, width, height, grid: gridSize, notes: labels.map((l,i)=>({ _id:'n'+i, text:l.name||'Label', x:l.x, y:l.y, icon: l.cat||'note', fontSize: l.size||12, color:l.color||'#000' })) };
  const uvtt = { name, width, height, grid: gridSize, labels, doors, lights };
  res.json({ ok:true, foundry, uvtt });
});
export default router;
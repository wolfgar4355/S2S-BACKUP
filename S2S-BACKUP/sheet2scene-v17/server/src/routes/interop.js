
import { Router } from 'express';
const router = Router();

router.post('/export/uvtt', (req,res)=>{
  const { gridSize=64, lights=[], doors=[] } = req.body||{};
  res.json({ ok:true, uvtt: { grid_size: gridSize, lights, doors } });
});

router.post('/import/uvtt', (req,res)=>{
  const uvtt = req.body||{};
  const doors = (uvtt.doors||[]).map(d=>({ x1:d.a?.[0], y1:d.a?.[1], x2:d.b?.[0], y2:d.b?.[1] }));
  const lights = (uvtt.lights||[]).map(l=>({ x:l.position?.[0], y:l.position?.[1], bright:l.range||10 }));
  res.json({ ok:true, doors, lights, labels: uvtt.labels||[] });
});

export default router;

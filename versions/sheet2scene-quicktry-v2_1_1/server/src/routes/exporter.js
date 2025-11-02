import { Router } from 'express';
const router = Router();
router.post('/maps/generate', (req,res)=>{
  const { world='Classic', theme='donjon', type='dungeon' } = req.body||{};
  const width=1024, height=768, gridSize=70;
  const base = { doors:[{x:140,y:220},{x:680,y:500}], lights:[{x:220,y:160,intensity:.8},{x:780,y:420,intensity:.6}], labels:[] };
  if(type==='overworld'){
    base.labels = [{name:'Capitale',x:200,y:180},{name:'Route du Nord',x:420,y:260},{name:'Ruines',x:700,y:520}];
  } else if(type==='city'){
    base.labels = [{name:'Marché',x:220,y:200},{name:'Guilde',x:520,y:360},{name:'Docks',x:760,y:420}];
  } else if(type==='ship'){
    base.labels = [{name:'Dock',x:140,y:220},{name:'Noeud energie',x:540,y:360},{name:'Passerelle',x:720,y:180}];
  } else {
    base.labels = [{name:'Entrée',x:120,y:210},{name:'Salle rituelle',x:520,y:360}];
  }
  res.json({ ok:true, map:{ world, theme, type, width, height, grid: gridSize, doors: base.doors, lights: base.lights, labels: base.labels } });
});
router.post('/export/scene', (req,res)=>{
  const { name='Scene', width=1024, height=768, gridSize=70, doors=[], lights=[], labels=[] } = req.body||{};
  const foundry = { name, width, height, grid: gridSize, notes: labels.map((l,i)=>({ _id:'n'+i, text:l.name||'Label', x:l.x, y:l.y, icon: l.cat||'note', fontSize: l.size||12, color:l.color||'#000' })) };
  const uvtt = { name, width, height, grid: gridSize, labels, doors, lights };
  res.json({ ok:true, foundry, uvtt });
});
export default router;
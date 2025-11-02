import { Router } from 'express';
import fs from 'fs';
import path from 'path';
const router = Router();

function resolveDB(){
  const dir = path.resolve(process.cwd(), 'data');
  if(!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, 'world.json');
  if(!fs.existsSync(file)) fs.writeFileSync(file, JSON.stringify({ entries: [] }, null, 2));
  return file;
}

// Stronger PI guard (regex + accent-insensitive)
const bannedRegex = [
  /(dungeons?\s*&\s*dragons|d&d|dnd)/i,
  /(faer[uû]n|forgotten\s+realms)/i,
  /(pathfinder|golarion)/i,
  /(warhammer|age\s+of\s+sigmar|40k|space\s+marine|imperium|eldar|tyranid|orks?)/i,
  /(vampire:\s*the\s*masquerade|camarilla|sabbat)/i,
  /(werewolf:\s*the\s*apocalypse|garou)/i,
  /(jedi|sith|lights? ?saber|stormtrooper|star\s+destroyer|skywalker)/i
];
function normalizeText(s){ return (s||'').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); }

router.get('/world/list', (req,res)=>{
  try{
    const db = JSON.parse(fs.readFileSync(resolveDB(), 'utf-8'));
    const world = req.query.world;
    const entries = world ? db.entries.filter(e => e.world === world) : db.entries;
    res.json({ ok:true, entries });
  }catch(e){ res.status(500).json({ ok:false, error:e.message }); }
});

router.post('/world/add', (req,res)=>{
  try{
    const body = req.body||{};
    const desc = normalizeText(body.description||'');
    if(bannedRegex.some(rx => rx.test(desc))){ return res.status(400).json({ ok:false, error:'Contains restricted terms or trademarks. Please rephrase with original names.' }); }
    const entry = {
      id: 'w'+Date.now()+Math.floor(Math.random()*999),
      world: body.world || 'Classic',
      type: body.type || 'misc',
      description: (body.description || '').slice(0, 4000),
      images: Array.isArray(body.images) ? body.images.slice(0, 3) : [],
      payload: body.payload || null,
      by: body.by || 'user',
      ts: new Date().toISOString()
    };
    const file = resolveDB();
    const db = JSON.parse(fs.readFileSync(file, 'utf-8'));
    db.entries.unshift(entry);
    fs.writeFileSync(file, JSON.stringify(db, null, 2));
    res.json({ ok:true, saved: { id: entry.id } });
  }catch(e){ res.status(500).json({ ok:false, error:e.message }); }
});

export default router;
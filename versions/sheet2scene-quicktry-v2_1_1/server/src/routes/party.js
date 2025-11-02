import { Router } from 'express';
import fs from 'fs';
import path from 'path';
const router = Router();

function dbPath(){
  const dir = path.resolve(process.cwd(), 'data');
  if(!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, 'party.json');
  if(!fs.existsSync(file)) fs.writeFileSync(file, JSON.stringify({ parties: [] }, null, 2));
  return file;
}
function readDB(){ return JSON.parse(fs.readFileSync(dbPath(), 'utf-8')); }
function writeDB(data){ fs.writeFileSync(dbPath(), JSON.stringify(data, null, 2)); }

router.post('/party/create', (req,res)=>{
  try{
    const { name='My Party', plan='Party', price=20.0, currency='CAD', dm='DM', capacity=5 } = req.body||{};
    const id = 'p'+Date.now()+Math.floor(Math.random()*999);
    const party = { id, name, plan, currency, price, members:[{ user: dm, role:'DM' }], capacity };
    const db = readDB(); db.parties.push(party); writeDB(db);
    res.json({ ok:true, party });
  }catch(e){ res.status(500).json({ ok:false, error:e.message }); }
});

router.post('/party/join', (req,res)=>{
  try{
    const { id, user='Player' } = req.body||{};
    const db = readDB();
    const p = db.parties.find(x=>x.id===id);
    if(!p) return res.status(404).json({ ok:false, error:'Party not found' });
    if(p.members.length >= p.capacity) return res.status(400).json({ ok:false, error:'Party full' });
    if(p.members.find(m=>m.user===user)) return res.json({ ok:true, party:p });
    p.members.push({ user, role:'Player' }); writeDB(db);
    res.json({ ok:true, party:p });
  }catch(e){ res.status(500).json({ ok:false, error:e.message }); }
});

router.get('/party/me', (req,res)=>{
  try{
    const db = readDB();
    const list = db.parties.map(p=>{
      const perUser = Math.ceil((p.price*100)/Math.max(1,p.members.length))/100;
      return { id:p.id, name:p.name, members:p.members, share:{ currency:p.currency, total:p.price, perUser } };
    });
    res.json({ ok:true, parties:list });
  }catch(e){ res.status(500).json({ ok:false, error:e.message }); }
});

export default router;
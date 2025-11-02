import { Router } from 'express';
import fs from 'fs';
import path from 'path';
const router = Router();

function dbPath(){
  const dir = path.resolve(process.cwd(), 'data');
  if(!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, 'refs.json');
  if(!fs.existsSync(file)) fs.writeFileSync(file, JSON.stringify({ activeName: null, by: null, data: null, images: [] }, null, 2));
  return file;
}

router.get('/refs/get', (req,res)=>{
  try{ const d = JSON.parse(fs.readFileSync(dbPath(), 'utf-8')); res.json({ ok:true, refs: d }); }
  catch(e){ res.status(500).json({ ok:false, error:e.message }); }
});

router.post('/refs/upload', (req,res)=>{
  try{
    const body = req.body||{};
    const name = (body.name||'Team').slice(0,80);
    const data = body.data || {};
    const images = Array.isArray(body.images) ? body.images.slice(0,6) : [];
    const rec = { activeName: name, by: body.by || 'user', data, images, ts: new Date().toISOString() };
    fs.writeFileSync(dbPath(), JSON.stringify(rec, null, 2));
    res.json({ ok:true, saved: { activeName: name } });
  }catch(e){ res.status(500).json({ ok:false, error:e.message }); }
});

export default router;
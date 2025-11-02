
import { Router } from 'express';
import fs from 'fs';
import path from 'path';
const router = Router();

const ASSET_DIR = path.join(process.cwd(), 'server', 'assets', 'cc0');
const MANIFEST = path.join(ASSET_DIR, 'manifest.json');

router.get('/market/list', (req,res)=>{
  try {
    const raw = fs.readFileSync(MANIFEST,'utf-8');
    const data = JSON.parse(raw);
    res.json({ ok:true, packs: data.packs||[] });
  } catch (e) {
    res.status(500).json({ ok:false, error: e.message });
  }
});

router.get('/market/download/:id', (req,res)=>{
  const id = String(req.params.id);
  try {
    const raw = fs.readFileSync(MANIFEST,'utf-8');
    const data = JSON.parse(raw);
    const item = (data.packs||[]).find(p=>p.id===id);
    if (!item) return res.status(404).json({ ok:false, error: 'Not found' });
    const pth = path.join(ASSET_DIR, item.file);
    res.download(pth, item.file);
  } catch (e) {
    res.status(500).json({ ok:false, error: e.message });
  }
});

export default router;

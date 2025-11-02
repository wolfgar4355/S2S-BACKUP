import express from 'express';
import fs from 'fs';
import path from 'path';
const router = express.Router();

const DSR = path.join(process.cwd(), 'data', 'DSR_REGISTER.csv');

function ensureRegister(){
  fs.mkdirSync(path.dirname(DSR), {recursive:true});
  if(!fs.existsSync(DSR)){
    fs.writeFileSync(DSR, 'id,submitted_at,type,status,due_at,verification,owner,notes\n');
  }
}

router.post('/request', async (req, res)=>{
  ensureRegister();
  const { type } = req.body || {};
  if(!['export','erase'].includes(type)) return res.status(400).json({ok:false, error:'invalid_type'});
  const id = 'dsr_' + Math.random().toString(36).slice(2,10);
  const now = new Date().toISOString();
  const due = new Date(Date.now() + 30*24*3600*1000).toISOString();
  fs.appendFileSync(DSR, `${id},${now},${type},received,${due},pending,Privacy Ops,\n`);
  res.json({ok:true, id});
});

router.post('/consent', async (req, res)=>{
  // Here you'd persist the consents in your DB; we just echo.
  res.json({ok:true});
});

export default router;

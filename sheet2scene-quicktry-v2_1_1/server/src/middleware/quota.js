import fs from 'fs';
import path from 'path';

const LIMITS = { NPC: 5 };
const GEN_PATHS = ['/pnj/generate','/quest/generate','/monster/generate','/loot/generate','/maps/generate'];

function dbPath(){
  const dir = path.resolve(process.cwd(), 'data');
  if(!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, 'quota.json');
  if(!fs.existsSync(file)) fs.writeFileSync(file, JSON.stringify({}), 'utf-8');
  return file;
}
function todayKey(){
  const d = new Date();
  return d.toISOString().slice(0,10);
}
function readDB(){ return JSON.parse(fs.readFileSync(dbPath(), 'utf-8')); }
function writeDB(d){ fs.writeFileSync(dbPath(), JSON.stringify(d, null, 2)); }

export function quotaGuard(req, res, next){
  if(!GEN_PATHS.some(p => req.path.endsWith(p))) return next();
  const plan = (req.headers['x-plan'] || 'NPC').toUpperCase();
  if(plan !== 'NPC') return next();
  const key = todayKey();
  const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'anon').toString();
  const id = `${key}:${ip}`;
  const db = readDB();
  const used = db[id] || 0;
  const limit = LIMITS.NPC;
  if(used >= limit){
    return res.status(429).json({ ok:false, error:`Daily limit reached for NPC plan (${limit}/day).` });
  }
  db[id] = used + 1;
  writeDB(db);
  next();
}

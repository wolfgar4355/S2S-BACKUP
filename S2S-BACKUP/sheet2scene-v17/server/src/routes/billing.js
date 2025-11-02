
import { Router } from 'express';
const router = Router();

const PRICING = {
  USD: { NPC:{monthly:0,annual:0}, JOUEUR:{monthly:12,annual:96}, DM:{monthly:29,annual:249}, PARTY:{monthly:59,annual:499} },
  CAD: { NPC:{monthly:0,annual:0}, JOUEUR:{monthly:17,annual:129}, DM:{monthly:40,annual:339}, PARTY:{monthly:81,annual:689} },
};
const ENTITLEMENTS = {
  NPC:{ ads:true, quality:['standard'], capPerDay:5, priority:0, fup:true },
  JOUEUR:{ ads:false, quality:['standard','hd'], capPerDay:500, priority:1, fup:true },
  DM:{ ads:false, quality:['standard','hd','4k'], capPerDay:Infinity, priority:2, fup:true },
  PARTY:{ ads:false, quality:['standard','hd','4k'], capPerDay:Infinity, priority:2, fup:true },
};

const USAGE = new Map();
const today = ()=> new Date().toISOString().slice(0,10);

function pennySplit(total, seats){
  const cents = Math.round(total*100);
  const base = Math.floor(cents / seats), rem = cents % seats;
  const shares = Array(seats).fill(base); for(let i=0;i<rem;i++) shares[i]+=1;
  return shares.map(c=>Number((c/100).toFixed(2)));
}

router.get('/billing/plans', (req,res)=>{
  const currency = (String(req.query.currency||'USD').toUpperCase()==='CAD') ? 'CAD' : 'USD';
  res.json({ ok:true, currency, pricing: PRICING[currency], entitlements: ENTITLEMENTS });
});
router.post('/billing/party/quote', (req,res)=>{
  const currency = (String(req.body.currency||'USD').toUpperCase()==='CAD') ? 'CAD' : 'USD';
  const cycle = (String(req.body.cycle||'monthly').toLowerCase()==='annual')?'annual':'monthly';
  const seats = Math.max(1, Math.min(5, Number(req.body.seats||5)));
  const total = PRICING[currency].PARTY[cycle];
  const shares = pennySplit(total, seats);
  res.json({ ok:true, currency, cycle, seats, total, shares });
});
router.post('/billing/entitlement', (req,res)=>{
  const plan = String(req.body.plan||'NPC').toUpperCase();
  const ent = ENTITLEMENTS[plan] || ENTITLEMENTS.NPC;
  res.json({ ok:true, plan, entitlements: ent });
});
router.post('/billing/usage', (req,res)=>{
  const userId = String(req.body.userId||'guest');
  const plan = String(req.body.plan||'NPC').toUpperCase();
  const ent = ENTITLEMENTS[plan] || ENTITLEMENTS.NPC;
  const key = `${userId}:${today()}`;
  const cur = USAGE.get(key)||0;
  const next = cur+1;
  if (ent.capPerDay !== Infinity && next>ent.capPerDay){
    return res.status(429).json({ ok:false, error:'Cap reached for today', cap: ent.capPerDay });
  }
  USAGE.set(key, next);
  res.json({ ok:true, usedToday: next, cap: ent.capPerDay });
});

export default router;

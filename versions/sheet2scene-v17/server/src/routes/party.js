
import { Router } from 'express';
const router = Router();

/**
 * Policy (V1.7)
 * - Create Party: requires owner with plan 'PARTY' (subscription active). DM role defaults to owner.
 * - Join Party: requires user plan != 'GUEST'. 'NPC' may join if agreeShare=true (billing share).
 * - Inside Party: members are ad-free; quotas are party-level (unlimited* FUP).
 * - Guest Pass (trial): optional 1-session flag (not persisted here) — not enabled in API by default.
 */

const PARTIES = new Map(); // partyId -> { id, name, seats, currency, cycle, total, shares:[...], ownerId, mdId, members: [{userId, role, share}] }
let seed = 1;

function newId(){ return 'pty_'+(seed++).toString(36); }

router.post('/party/create', (req,res)=>{
  const { ownerId='u-unknown', ownerPlan='NPC', name='Ma Partie', seats=5, currency='USD', cycle='monthly', total=59, shares=[59] } = req.body||{};
  if (String(ownerPlan).toUpperCase() !== 'PARTY'){
    return res.status(403).json({ ok:false, error:'Party creation requires PARTY plan owner' });
  }
  const id = newId();
  const s = (shares && Array.isArray(shares) && shares.length===seats) ? shares : Array(seats).fill(Number((total/seats).toFixed(2)));
  const p = { id, name, seats, currency, cycle, total, shares: s, ownerId, mdId: ownerId, members: [{ userId: ownerId, role: 'dm', share: s[0] }] };
  PARTIES.set(id, p);
  res.json({ ok:true, party: p });
});

router.post('/party/join', (req,res)=>{
  const { partyId, userId, plan='NPC', agreeShare=false } = req.body||{};
  const p = PARTIES.get(String(partyId));
  if (!p) return res.status(404).json({ ok:false, error:'Party not found' });
  const P = String(plan).toUpperCase();
  if (P === 'GUEST'){
    return res.status(403).json({ ok:false, error:'Guests cannot join a Party — create a free account (NPC).' });
  }
  if (P === 'NPC' && !agreeShare){
    return res.status(402).json({ ok:false, error:'NPC must accept equal share billing to join Party.' });
  }
  if (p.members.length >= p.seats){
    return res.status(409).json({ ok:false, error:'Party is full' });
  }
  const idx = p.members.findIndex(m=>m.userId===userId);
  if (idx>=0) return res.json({ ok:true, party: p, joined:true });
  const slot = p.members.length;
  const share = p.shares[slot] || Number((p.total/p.seats).toFixed(2));
  p.members.push({ userId, role:'player', share });
  res.json({ ok:true, party: p, joined:true });
});

router.get('/party/get', (req,res)=>{
  const id = String(req.query.id||'');
  const p = PARTIES.get(id);
  if (!p) return res.status(404).json({ ok:false, error:'Party not found' });
  res.json({ ok:true, party: p });
});

export default router;

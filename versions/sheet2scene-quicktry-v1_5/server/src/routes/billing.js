import { Router } from 'express';
const router = Router();
const ENT = { GUEST:{ads:true,quality:['standard'],capPerDay:2,export:false}, NPC:{ads:true,quality:['standard'],capPerDay:5,export:true}, JOUEUR:{ads:false,quality:['standard','hd'],capPerDay:500,export:true}, DM:{ads:false,quality:['standard','hd','4k'],capPerDay:Infinity,export:true}, PARTY:{ads:false,quality:['standard','hd','4k'],capPerDay:Infinity,export:true} };
const USAGE = new Map(); const today=()=>new Date().toISOString().slice(0,10);
router.post('/billing/usage', (req,res)=>{ const {userId='guest', plan='GUEST'} = req.body||{}; const ent = ENT[plan]||ENT.GUEST; const key=`${userId}:${today()}`; const cur=USAGE.get(key)||0; const nxt=cur+1; if(ent.capPerDay!==Infinity && nxt>ent.capPerDay){ return res.status(429).json({ok:false,error:'Cap reached',cap:ent.capPerDay,plan}); } USAGE.set(key,nxt); res.json({ok:true,usedToday:nxt,cap:ent.capPerDay,plan}); });
export default router;
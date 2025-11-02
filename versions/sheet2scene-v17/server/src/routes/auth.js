
import { Router } from 'express';
const router = Router();
function randToken(len=24){ const letters='abcdefghijklmnopqrstuvwxyz0123456789'; let out='g_'; for(let i=0;i<len;i++){ out += letters[Math.floor(Math.random()*letters.length)]; } return out; }
router.post('/auth/anon', (req,res)=>{ res.json({ ok:true, token: randToken(28) }); });
export default router;

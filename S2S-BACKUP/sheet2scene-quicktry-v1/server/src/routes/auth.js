import { Router } from 'express';
import crypto from 'crypto';
const router = Router();
router.post('/auth/guest', (req,res)=>{ res.json({ ok:true, userId:'guest-'+crypto.randomBytes(6).toString('hex'), plan:'GUEST' }); });
router.post('/auth/login', (req,res)=>{ const { email='demo@sheet2scene.app' } = req.body||{}; res.json({ ok:true, userId:'u-'+Buffer.from(email).toString('hex').slice(0,12), plan:'NPC' }); });
export default router;
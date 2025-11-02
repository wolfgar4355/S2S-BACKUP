
import { Router } from 'express';
const router = Router();

router.post('/pay/checkout', async (req, res) => {
  const { plan='NPC', currency='USD', cycle='monthly', seats=1 } = req.body||{};
  // Stub response — integrate Stripe later
  res.json({ ok:true, mode:'stub', url: null, sessionId: 'sess_stub_'+Date.now(), plan, currency, cycle, seats });
});
router.post('/webhooks/stripe', async (req, res) => {
  res.json({ ok:true, mode:'stub' });
});

export default router;

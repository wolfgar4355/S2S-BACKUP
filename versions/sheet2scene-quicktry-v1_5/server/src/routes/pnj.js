import { Router } from 'express';
const router = Router();
function r(a){ return a[Math.floor(Math.random()*a.length)]; }
function name(){ const A=['Arin','Bela','Corin','Dara','Elda','Faro','Galen','Hira','Isen','Jora']; const B=['Bris','Calder','Dun','Elan','Fenn','Grove','Hawke','Ire','Jax','Krell']; return r(A)+' '+r(B); }
router.post('/pnj/generate', (req,res)=>{
  const { world='Classic', role='Citoyen', level=1 } = req.body||{};
  res.json({ ok:true, pnj:{ name: name(), role, level, world, traits: r(['prudent','observateur','loyal']), hooks: r(['doit une faveur','cherche un artefact','craint une rumeur']), image: 'https://picsum.photos/seed/pnj'+Math.floor(Math.random()*999)+'/512/768' } });
});
export default router;
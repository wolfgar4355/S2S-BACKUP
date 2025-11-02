
import { Router } from 'express';
const router = Router();
function rand(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function randName(){ const first=['Arin','Bela','Corin','Dara','Elda','Faro','Galen','Hira','Isen','Jora']; const last=['Bris','Calder','Dun','Elan','Fenn','Grove','Hawke','Ire','Jax','Krell']; return rand(first)+' '+rand(last); }
router.post('/pnj/generate', (req,res)=>{
  const { world='Classic', role='Citoyen', level=1, style='standard' } = req.body||{};
  res.json({ ok:true, pnj: { name: randName(), role, level, world, traits: rand(['prudent','observateur','loyal']), hooks: rand(['doit une faveur','cherche un artefact','craint une rumeur']), image: 'https://picsum.photos/seed/pnj'+Math.floor(Math.random()*999)+'/512/768', quality: style } });
});
export default router;

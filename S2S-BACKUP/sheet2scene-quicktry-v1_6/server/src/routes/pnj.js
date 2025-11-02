import { Router } from 'express';
const router = Router();
function r(a){ return a[Math.floor(Math.random()*a.length)]; }
function name(){ const A=['Arin','Bela','Corin','Dara','Elda','Faro','Galen','Hira','Isen','Jora']; const B=['Bris','Calder','Dun','Elan','Fenn','Grove','Hawke','Ire','Jax','Krell']; return r(A)+' '+r(B); }
const LEGAL_SPACE = { roles:['pilote de cargo','chevalier de lumiere','technomage','contrebandier','agent du senat','mercenaire stellaire'], hooks:['cherche un cristal rare','doit regler une dette','traque un artefact ancien','evite l\'ordre imperial','protege une caravane','cartographie une nebulose'] };
router.post('/pnj/generate', (req,res)=>{
  const { world='Classic', level=1 } = req.body||{};
  const role = world==='Galactic' ? r(LEGAL_SPACE.roles) : r(['Citoyen','Soldat','Mage','Rodeur','Pretre']);
  const hook = world==='Galactic' ? r(LEGAL_SPACE.hooks) : r(['doit une faveur','cherche un artefact','craint une rumeur']);
  res.json({ ok:true, pnj:{ name: name(), role, level, world, traits: r(['prudent','observateur','loyal']), hooks: hook, image: 'https://picsum.photos/seed/pnj'+Math.floor(Math.random()*999)+'/512/768' } });
});
export default router;
# 💼 Sheet2Scene — AGENTS-TODO.md  
🧠 Objectif : Mise en ligne du MVP Sheet2Scene (Web Alpha)  
🎨 Style : Grimoire Fantasy • Next.js + Supabase + RunPod • GodinVerse  
🦸‍♂️ Superhero Mode: ACTIVATED

---

## 🧙‍♂️ Victor – Front-End Developer

**Rôle** : Construction de l’interface web grimoire (Next.js + Tailwind + shadcn/ui)  
**Pouvoir spécial** : ✨ Framer Motion + Responsive magique

- [ ] Page `/` avec CTA + dernières scènes générées
- [ ] Page `/create` → étapes Monde → Ère → Classe → Pose
- [ ] Intégration animations page-turn 📖
- [ ] Design responsive (mobile/tablette/desktop)
- [ ] Connexion Supabase pour récupérer les prompts/agents
- [ ] Intégration RunPod endpoint pour génération visuelle

---

## 🖋️ Andrei Varga – Technical Writer

**Rôle** : Rédaction technique & support utilisateur  
**Pouvoir spécial** : 📚 Clarté absolue + Structure MDX

- [ ] Créer `/docs` et `/help` en Markdown + MDX
- [ ] Rédiger les README des modules (`agents`, `generate`, etc.)
- [ ] Documenter l'API interne (`/api/generate`, `/api/store`)
- [ ] Créer le guide utilisateur v1 pour MVP

---

## 🎨 Joeffry – Directeur Artistique (DA)

**Rôle** : Direction artistique & assets visuels fantasy  
**Pouvoir spécial** : 🪄 Parchemins enchantés & dorures brillantes

- [ ] Nettoyer le fond du lutrin si non transparent
- [ ] Créer PNGs/PNGs/props pour pages du grimoire
- [ ] Habillage UI fantasy : parchemin, cuir, dorures
- [ ] Fournir les fichiers sans fond pour intégration web

---

## 🚀 Ava Johnson – Program & Release Manager

**Rôle** : Orchestration des déploiements  
**Pouvoir spécial** : 📆 Vision temporelle + déploiements stables

- [ ] Planifier release “MVP Web Alpha” (GitHub → Vercel)
- [ ] Créer calendrier de milestones
- [ ] Vérifier les branches : `main`, `s2s-backup`, `dev`
- [ ] Coordonner merge requests avec Victor et Priya

---

## 🧠 Priya Narayanan – MLOps / Backend

**Rôle** : Connexion RunPod + backend GPU  
**Pouvoir spécial** : 🧬 Async API Mastery + Polling raffiné

- [ ] Créer endpoint `/api/generate` (proxy sécurisé)
- [ ] Connexion aux GPU nodes (RunPod API)
- [ ] Gérer la file de rendus (queue, polling)
- [ ] Optimiser les coûts GPU / temps d’attente

---

## 💰 Daniel Nguyen – RevOps / FinOps

**Rôle** : Budget, coût GPU, métriques backend  
**Pouvoir spécial** : 📊 Calcul mental + alertes coût

- [ ] Calculer coût GPU RunPod + requêtes Supabase
- [ ] Créer scripts de suivi CPU/GPU
- [ ] Exporter dashboard de monitoring
- [ ] Suivre les usages dans `admin/metrics`

---

## 💬 Camille Gagnon – Modération FR/EN

**Rôle** : Contrôle qualité Discord / Reddit  
**Pouvoir spécial** : 🛡️ Bouclier d’éthique + macros multilingues

- [ ] Mettre en place macros Discord/Reddit
- [ ] Créer journal d’incident
- [ ] Rédiger rapport hebdo d’intervention
- [ ] Vérifier conformité “no IP tierce”

---

## 🌏 Wei-Ming Tan – Modération APAC

**Rôle** : Suivi temps réel et modération zone UTC+8  
**Pouvoir spécial** : 🌐 Vigilance permanente

- [ ] Soutien forums APAC (Discord/Reddit)
- [ ] Traductions rapides si besoin
- [ ] Rédiger résumés hebdo pour équipe globale
- [ ] Gestion horaire pour support asynchrone

---

## 🧪 Lara Santos – Support Tier 1

**Rôle** : Tests QA et retour utilisateurs  
**Pouvoir spécial** : 🧼 Chasseuse de bugs

- [ ] Tester le flux utilisateur : /create → /generate
- [ ] Vérifier animations et responsive
- [ ] Créer template de bug-report (Markdown)
- [ ] Répertorier les suggestions d’amélioration

---

## 🔁 Instructions Générales

- Toutes les équipes peuvent utiliser `/docs`, `/s2s-backup`, ou les README pour consignes.
- Chaque tâche complétée = cochez la case ✅ et faites un commit `"feat(agent): [tâche]"`.
- Format recommandé : `AGENT-NAME-TODO.md` pour chaque suivi individuel si besoin.

---

🧭 _Let’s build something magical. Powered by GodinVerse._

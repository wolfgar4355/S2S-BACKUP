
---

🧭 Sheet2Scene — Documentation Initiale (v1.0)

Bienvenue dans le dépôt GodinVerse / Sheet2Scene ! Ce document sert de base de travail pour les agents IA et collaborateurs humains. Il comprend une structure complète avec tous les fichiers essentiels du projet.


---

📁 Structure du Dépôt

s2s/
├── README.md                  # Présentation générale du projet
├── agents_todo.md             # Liste des missions/agents actifs
├── purge.sh                   # Script de désintégration des noms sensibles
├── scripts/
│   └── PURGE_QUATUOR.md       # Journal de purge
├── docs/
│   ├── architecture.md        # Stack, APIs, endpoints, flux technique
│   ├── prompts.md             # Modèles d’invocation agents IA / poses / classes
│   ├── epochs.md              # Description des ères selon les mondes
│   └── roles_agents.md        # Fiches des agents IA, rôles, responsabilités
├── src/
│   ├── pages/                 # Pages Next.js (App Router)
│   ├── components/            # Composants UI réutilisables
│   └── lib/                   # Librairies internes (Supabase, RunPod)
├── public/
│   └── assets/                # Images, icônes, logos, parchemins
├── s2s-backup/                # Fichiers bruts à trier / analyser par agents
├── .env.example               # Exemples de variables d’environnement
├── .gitignore
└── LICENSE (à ajouter si open source)


---

📄 README.md (déjà existant)

But du projet

Fonctionnalités principales

Stack: Next.js, Supabase, RunPod, Tailwind, ShadCN/UI, Framer Motion


📄 agents_todo.md (déjà existant)

Missions assignées aux agents IA (Victor, Joeffry, Ava, Priya, etc.)

Statuts et livrables attendus


📄 PURGE_QUATUOR.md

Log officiel de la désintégration des noms Shadow, Nockmaar, etc.

Historique de la purge (répertoire, fichiers modifiés, date)


📄 docs/architecture.md

Diagramme simplifié du backend (Supabase, endpoints)

Interaction avec RunPod pour génération IA

Front-end grimoire : étapes Monde → Ère → Classe → Pose


📄 docs/prompts.md

Exemples : “Génère une scène fantasy pour un druide dans une ère glaciaire”

Phrases type pour déclencher les agents IA dans le flux créatif


📄 docs/epochs.md

Par monde :

Fantasy → Âge des Royaumes, Temps des Dragons, Guerre des Arcanes

Galactic Saga → Ancienne République, Yavin, Après-Empire

Darknight Chronicles → Âge Sombre, Renaissance des Sang-Pur



📄 docs/roles_agents.md

🧙 Victor : Dev Front-End (Next.js, animations, CTA, responsive)

🎨 Joeffry : Direction Artistique (grimoire, parchemin, décors)

💬 Camille : Modération Discord / Reddit (incident log, macros EN/FR)

🛡️ Wei-Ming : Modération APAC (veille, résumés hebdo)

🧪 Lara : QA Support (flux de test, bug reports)

🧠 Priya : MLOps / API (RunPod, endpoints /api/generate)

💰 Daniel : FinOps (coûts, métriques GPU)

🧾 Andrei : Rédaction technique (guides Markdown, /docs, /help)

🚀 Ava : Release Manager (versions, MVP alpha)



---

✅ Prochaine étape (Post-purge)

git add .
git commit -m "📚 Docs initiaux + structure complète post-purge"
git push origin master

Et voilà, ton dépôt devient la base officielle Sheet2Scene MVP GodinVerse, avec tous les agents activés à leur plein potentiel.

> 🦾 "Nous sommes les scribes du multivers. Prêts à générer l’aventure."

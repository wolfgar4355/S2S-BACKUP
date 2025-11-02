# Sheet2Scene — Next.js + Express Starter · 2025-09-27

**But** : te permettre de lancer l'app **en local** (débutant‑friendly).  
Stack : **Next.js 14 (React)** pour le front, **Express** pour l’API (privacy).

## 1) Prérequis
- Installe **Node.js LTS** (v18+). Vérifie: `node -v` et `npm -v`

## 2) Installation
```bash
cd s2s-next-express-starter-v1
npm install --workspaces
```

## 3) Lancer en local
```bash
npm run dev
```
- **Serveur API** : http://localhost:4000 (Express)
- **Web** : http://localhost:3000 (Next.js)
- Le front **proxy** `/api/privacy/*` → le serveur Express (rewrite déjà configuré).

## 4) Tester
- Page d’accueil (grimoire) : http://localhost:3000
- Table des matières : http://localhost:3000/toc
- Privacy Center : http://localhost:3000/account/privacy → clique **Request export**/**Request erasure**.
- Un fichier `server/data/DSR_REGISTER.csv` sera créé automatiquement.

## 5) Structure
```
/apps/web           # Next.js (app router)
  /app
  /components/PrivacyCenter.tsx
  /public/landing.png   # image de couverture
/server             # Express API
  /routes/privacy.js
```

## 6) Déploiement (plus tard)
- Tu pourras héberger le web (Vercel) et l’API (Railway/Fly/Render). On le fera quand tu seras prêt.

# 🧭 S2S-BACKUP - Sheet2Scene (novembre 2025)

> 📦 Ce dépôt contient une **sauvegarde complète** du projet **Sheet2Scene** avant refonte, nettoyage, tri et documentation.

---

## 🗂️ Structure du dossier

| Dossier         | Description |
|-----------------|-------------|
| `scenes/`       | Anciennes scènes générées ou en cours |
| `ui/`           | Composants visuels en style grimoire (shadcn/ui, Tailwind, parchemin, etc.) |
| `api/`          | Endpoints, hooks et intégration RunPod / Supabase |
| `docs/`         | Plans, prompts, fiches d’équipement, README, etc. |
| `misc/`         | Fichiers divers à trier manuellement |

---

## 🎯 Objectifs

Permettre aux **agents de GodinVerse** de :
- Identifier les morceaux de code **utiles**
- Documenter ce qui peut être **réutilisé**
- Nettoyer les doublons et éléments **obsolètes**
- Alimenter les futurs modules `docs/`, `versions/`, `agents/`, `skeleton/`

---

## 🚀 Instructions pour contributeurs

1. **Fork** ce repo (si externe)
2. Crée une branche `tri/<nom>` pour ton nettoyage
3. Pour chaque fichier, ajoute un commentaire en haut :

```ts
// ✅ Gardé (raison)
// ❌ Supprimé (raison)
```

4. Lorsque terminé : `git push` + Pull Request

---

## 🧠 Tips

- Pense à vérifier les versions (`sheet2scene-vX`) dans `versions/`  
- Priorité : `api/`, `ui/`, `docs/`, puis `scenes/`  
- Marque tout ce qui est **encore utile en 2025** (et futur MVP)

---

©️ Projet GodinVerse • Tous droits réservés

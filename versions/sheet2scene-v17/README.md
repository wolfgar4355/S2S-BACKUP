
# Sheet2Scene V1.6
- **Anonymous login (Invité)**: `POST /api/auth/anon` (token localStorage) — pour le palier gratuit sans créer de compte.
- **CMP pubs** (gratuit): consentement basique côté client pour les catégories liées aux RPG.
- **Générateurs** (non-marqués): PNJ, Quêtes, Monstres, Loot (API stubs).
- **Facturation & caps**: plans USD/CAD, devis Party, cap/jour par plan (usage API).
- **Exports**: Foundry-like + UVTT (JSON), Roll20 (PNG). 
- **Marketplace CC0**: listing/téléchargement de packs (icônes POI, textures parchemin).
- **Client**: `client/index.html` (complet) et `client-react/index.html` (grimoire React simplifié).

## Lancer l'API
```bash
cd server
npm i
npm run dev
# API sur http://localhost:8787
```
Ouvrir ensuite `client/index.html` ou `client-react/index.html` via un serveur statique.


## V1.7 Additions — Party Policy
- **Création** : réservée à un **propriétaire en plan PARTY**.
- **Adhésion** : **NPC autorisé** si l’utilisateur **accepte sa part** (agreeShare=true). **GUEST interdit**.
- **API** : `/api/party/create`, `/api/party/join`, `/api/party/get` (stockage en mémoire).
- **Client React** : nouvel onglet **Party** (Créer/Rejoindre) + rappel de la **politique** et du partage égal.

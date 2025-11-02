# VTT Starter (Sheet2Scene)

## Lancer
1) API (ouvre un terminal) :
```bash
npm run start:mock
```

2) Web (autre terminal) :
```bash
cd apps/web
# si besoin, personnalise l'URL du WS (par défaut ws://127.0.0.1:4001/vtt)
echo NEXT_PUBLIC_VTT_WS_URL=ws://127.0.0.1:4001/vtt >> .env.local
npm run dev
```

3) Ouvre `http://localhost:3000/vtt/ma-salle` dans **2 onglets** pour tester en temps réel.
- Ajoute des tokens, déplace-les (clic + glisser), lance `/roll` et envoie du chat.
- Tout est synchronisé via WebSocket.

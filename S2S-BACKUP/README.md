# Sheet2Scene (starter FULL)

- Next.js 14 (App Router, TS)
- Mondes: Classic, Galactic Fight, + World of Shadows (6)
- Grimoire: ouverture + flips + **fermeture avec poussière discrète**
- Sons inclus (`apps/web/public/sounds`): `book-open.wav`, `page-flip.wav`, `book-close.wav`
- API proxy `/api/generate` vers serveur local (mock inclus)

## Démarrage (Windows PowerShell)
```powershell
cd apps/web
npm install
echo S2S_API_URL=http://127.0.0.1:4001 > .env.local
npm run dev

# autre terminal:
cd ../../server
$env:HOST="127.0.0.1"; $env:PORT="4001"
node index.cjs
```
Ouvre http://localhost:3000

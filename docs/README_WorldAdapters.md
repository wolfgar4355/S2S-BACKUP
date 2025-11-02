# World Adapters (Multi-mondes)

- Client: `apps/web/config/worldsRules.ts` (grille, presets de dés, barres, etc.)
- Serveur: `server/modules/worlds/<id>/rules.cjs` (placeholders fournis).

## Lancer
- API: `npm run start:mock` (expose aussi WS /vtt)
- Web: `apps/web` → `.env.local` avec `NEXT_PUBLIC_VTT_WS_URL=ws://127.0.0.1:4001/vtt` puis `npm run dev`
- Ouvre `http://localhost:3000/vtt/ma-salle?world=galactic`

## Notes
- La grille utilise `rules.grid.size` si présent, sinon la valeur d'état.
- Un indicateur **HP** s'affiche sous les tokens si `hp`/`hpMax` sont définis.

# UX additions

## Créer une room
- Page: `/vtt/new` → choisis un monde, clique **Créer**.
- Côté serveur, `POST /vtt/room` accepte `{ worldId }` et retourne `{ id }`.

## Ajouter un PJ comme token
- Sur la fiche personnage (`/worlds/[id]/new`), clique **🧩 Ajouter au VTT** et saisis l'ID de la room.
- Ça appelle `POST /vtt/room/:id/token` via l'API Next proxy.

## VTT
- `?world=<id>` dans l'URL applique les règles (grille, préréglages de dés).
- Menu **Préréglages dés** pour lancer rapidement un `/roll`.

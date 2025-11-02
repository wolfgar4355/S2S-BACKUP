# Sheet2Scene — MERGED (All-In-One)

## Démarrage
```bash
cd app-next
npm i
npm run dev
```

## Pages
- `/characters/new` — éditeur parchemin + portrait IA
- `/portraits` — galerie (download + delete)
- `/admin` — provider (mock/openai/runpod), Mode Éco
- `/settings` — BYO-Key (clés OpenAI/RunPod par utilisateur)
- `/s/{slug}` — fiche publique lecture seule

## Env
```
S2S_IMAGE_PROVIDER=mock
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE=...
NEXT_PUBLIC_BASE_URL=http://localhost:3000
# OPENAI_API_KEY=...
# RUNPOD_ENDPOINT=...
# RUNPOD_API_KEY=...
# SUPABASE_BUCKET=portraits
```

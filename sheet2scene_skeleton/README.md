# Sheet2Scene – Beta Skeleton (Docker + Caddy + Orchestrator)

This repo gives you a ready-to-run **prelaunch** stack for `beta.sheet2scene.ca`:
- **Caddy** (auto HTTPS) as reverse proxy
- **web/** Node.js (Express) app on port 3000
- **orchestrator/** Python (FastAPI) service on port 8080
- `/agents/*` routes proxied to the orchestrator
- Minimal "world generators" (world, biome, npc, quest) returning JSON

## Quick start

1) Copy `.env.example` to `.env` and fill the values (Supabase, Postmark, Redis Upstash, S3 if any).
2) Edit `proxy/Caddyfile` to set your domain (already set to `beta.sheet2scene.ca`).
3) Run:
```bash
docker compose build
docker compose up -d
docker compose logs -f
```
4) Open https://beta.sheet2scene.ca

## Health endpoints
- Web: `GET /healthz` → `{status:"ok"}`
- Orchestrator: `GET /agents/healthz` → `{status:"ok"}`

## Jobs API (orchestrator)
- `POST /agents/jobs` with JSON body:
```json
{
  "type": "worldgen|biome|npc|quest",
  "lang": "fr|en",
  "params": { "seed": 123, "size": "M" }
}
```
Returns a simulated JSON result immediately if no Redis is configured,
or enqueues/executes using Redis (Upstash) if `REDIS_URL` is provided.

## Notes
- This skeleton is intentionally minimal; plug in your real logic/models later.
- Keep ports 80/443 open publicly; all other ports closed.
- Caddy handles TLS certificates automatically.

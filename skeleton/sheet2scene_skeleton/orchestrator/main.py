import os, json, time, random
from typing import Optional, Literal, Dict, Any
from fastapi import FastAPI, HTTPException
try:
    import redis
except Exception:
    redis = None

app = FastAPI(title="Sheet2Scene Orchestrator", version="0.1.0")

REDIS_URL = os.getenv("REDIS_URL")
AGENT_DEFAULT_LANG = os.getenv("AGENT_DEFAULT_LANG","fr")

r = None
if REDIS_URL and redis:
    try:
        r = redis.from_url(REDIS_URL, decode_responses=True, ssl=True if REDIS_URL.startswith("rediss") else False)
    except Exception as e:
        r = None

@app.get("/agents/healthz")
def healthz():
    return {"status":"ok","service":"orchestrator","queue":"redis" if r else "inline"}

@app.post("/agents/jobs")
def create_job(payload: Dict[str, Any]):
    job_type = payload.get("type")
    lang = payload.get("lang", AGENT_DEFAULT_LANG)
    params = payload.get("params", {})

    if job_type not in {"worldgen","biome","npc","quest"}:
        raise HTTPException(status_code=400, detail="invalid job type")

    job = {
        "id": random.randint(10_000, 99_999),
        "type": job_type,
        "lang": lang,
        "params": params,
        "status": "queued"
    }

    if r:
        # enqueue
        r.lpush("jobs", json.dumps(job))
        return {"queued": True, "job": job}
    else:
        # inline simulate work
        result = run_job(job_type, lang, params)
        job["status"] = "done"
        return {"queued": False, "job": job, "result": result}

def run_job(job_type: str, lang: str, params: dict):
    # simulated workload
    time.sleep(0.4)
    if job_type == "worldgen":
        return {
            "seed": params.get("seed", random.randint(1, 999999)),
            "size": params.get("size","M"),
            "rules": ["survival","crafting"],
            "lang": lang
        }
    if job_type == "biome":
        return {
            "biomes": ["forest","desert","tundra","swamp"],
            "rarity": {"forest":0.4,"desert":0.2,"tundra":0.2,"swamp":0.2},
            "lang": lang
        }
    if job_type == "npc":
        return {
            "factions":[{"name":"Wardens","rep":70},{"name":"Smugglers","rep":-10}],
            "npcs":[{"name":"Alya","role":"scout"},{"name":"Bor","role":"blacksmith"}],
            "lang": lang
        }
    if job_type == "quest":
        return {
            "objectives":[{"step":1,"task":"find_ore"},{"step":2,"task":"forge_blade"}],
            "rewards":{"xp":150,"items":["blade"]},
            "lang": lang
        }
    return {"ok": True}

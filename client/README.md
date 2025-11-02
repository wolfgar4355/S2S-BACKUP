# Sheet2Scene — VFX Client (PixiJS + WS-ready)

Open `index.html` to run. Keys **1–4** switch spells:
- 1 Fireball
- 2 Ice Lance
- 3 Chain Lightning
- 4 Healing Wave

If the WebSocket server is running at `ws://127.0.0.1:8081`, clicks will broadcast to all connected clients in room `playtest-1`.
If not, the client runs **offline** (local-only).
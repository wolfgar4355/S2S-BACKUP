# Sheet2Scene — VFX + WebSocket Kit

This kit contains a PixiJS client (spells + VFX) and a tiny Node WebSocket server
to broadcast spell events between multiple clients (same "room").

## Structure
```
Sheet2Scene_VFX_WS_Kit/
  client/
    index.html
    src/
      app.js          # Pixi app + WS hookup + offline fallback
      net.js          # tiny WS client
      spellPlayer.js  # plays pipelines (spawn/travel/impact/debris)
      spellPresets.js # 4 spells: Fireball, Ice Lance, Chain Lightning, Healing Wave
      spellTypes.js
    assets/
      particle_soft.png, orb_fire.png, orb_ice.png, orb_lightning.png, orb_heal.png
  server/
    package.json
    index.js          # Node "ws" server with rooms, rate-limit, heartbeat
```

## Run — Windows PowerShell (localhost)
### 1) Start the server
```powershell
cd .\server
npm install
npm start
# => ws://127.0.0.1:8081
```

### 2) Open the client
- Double-click `client\index.html` (offline fallback if server not running)
- OR serve locally:
```powershell
cd .\client
python -m http.server 8080
# then browse http://localhost:8080
```

### 3) Use it
- Keys **1–4** to select the spell
- **Click** to cast
- Open the client in **two browser windows** to see broadcast in action
- To use a specific "table" (room): change `room: 'playtest-1'` in `src/net.js` on both clients

## Notes
- Server only validates & rebroadcasts minimal events (no rendering).
- Client renders with PixiJS (GPU), deterministic via seed when needed.
- Safe to extend with new stages (aura, decal, light) and new presets.

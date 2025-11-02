import { WebSocketServer } from 'ws';
import { nanoid } from 'nanoid';

const PORT = process.env.PORT || 8081;
const PING_INTERVAL_MS = 30000;
const MAX_MSG_SIZE = 32 * 1024;
const MIN_CAST_INTERVAL_MS = 120;

const rooms = new Map(); // roomId -> Set(ws)

function joinRoom(ws, roomId = 'default') {
  if (!rooms.has(roomId)) rooms.set(roomId, new Set());
  rooms.get(roomId).add(ws);
  ws.roomId = roomId;
}

function leaveRoom(ws) {
  const set = rooms.get(ws.roomId);
  if (set) {
    set.delete(ws);
    if (!set.size) rooms.delete(ws.roomId);
  }
}

const wss = new WebSocketServer({ port: PORT, maxPayload: MAX_MSG_SIZE }, () => {
  console.log(`[WS] Listening on ws://127.0.0.1:${PORT}`);
});

wss.on('connection', (ws, req) => {
  ws.id = nanoid(8);
  ws.isAlive = true;
  ws.lastCastAt = 0;

  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    joinRoom(ws, url.searchParams.get('room') || 'default');
  } catch {
    joinRoom(ws, 'default');
  }

  ws.on('pong', () => { ws.isAlive = true; });

  ws.on('message', (buf) => {
    let msg;
    try { msg = JSON.parse(buf.toString('utf8')); } catch { return; }

    if (msg?.type === 'HELLO') {
      ws.name = String(msg.name || `anon-${ws.id}`).slice(0, 24);
      return;
    }

    if (msg?.type === 'SPELL_CAST') {
      const now = Date.now();
      if (now - ws.lastCastAt < MIN_CAST_INTERVAL_MS) return;
      ws.lastCastAt = now;

      if (typeof msg.spellId !== 'string') return;
      if (!Array.isArray(msg.origin) || !Array.isArray(msg.target)) return;

      const evt = {
        type: 'SPELL_CAST',
        spellId: msg.spellId,
        casterId: ws.id,
        origin: msg.origin,
        target: msg.target,
        seed: Number.isFinite(msg.seed) ? msg.seed : Math.floor(Math.random()*1e9),
        timestamp: Date.now(),
        meta: msg.meta ?? {}
      };

      const peers = rooms.get(ws.roomId) || new Set();
      for (const peer of peers) {
        if (peer.readyState === 1) peer.send(JSON.stringify(evt));
      }
      return;
    }
  });

  ws.on('close', () => { leaveRoom(ws); });
});

const interval = setInterval(() => {
  for (const ws of wss.clients) {
    if (!ws.isAlive) { try { ws.terminate(); } catch {}; continue; }
    ws.isAlive = false;
    try { ws.ping(); } catch {}
  }
}, PING_INTERVAL_MS);

wss.on('close', () => clearInterval(interval));

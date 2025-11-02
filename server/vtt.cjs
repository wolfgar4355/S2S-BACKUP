const { WebSocketServer } = require('ws');
const { randomUUID } = require('crypto');

function makeState() {
  return {
    scene: { id: 'default', name: 'Scene', bgUrl: '', grid: { size: 50, visible: true } },
    tokens: {}, // id -> {id,name,x,y,img,hp,owner}
    fog: { enabled: false, revealed: [] },
    turn: { order: [], index: 0 },
  };
}

const ROOMS = new Map(); // roomId -> { state, clients:Set<{ws, name, role, id}> }

function getRoom(roomId) {
  if (!ROOMS.has(roomId)) {
    ROOMS.set(roomId, { state: makeState(), clients: new Set() });
  }
  return ROOMS.get(roomId);
}

function broadcast(room, msg) {
  const data = JSON.stringify(msg);
  for (const c of room.clients) {
    try { c.ws.send(data); } catch {}
  }
}

function applyPatch(obj, ops=[]) {
  for (const op of ops) {
    const path = String(op.path||'').split('.');
    let ref = obj;
    for (let i=0;i<path.length-1;i++){
      const key = path[i];
      if (!(key in ref)) ref[key] = {};
      ref = ref[key];
    }
    ref[path[path.length-1]] = op.value;
  }
}

function rollExpr(expr) {
  try{
    const m = /^(\d+)d(\d+)([+\-]\d+)?$/i.exec(expr.trim());
    if(!m) return null;
    const n = parseInt(m[1],10), faces = parseInt(m[2],10), mod = m[3]? parseInt(m[3],10) : 0;
    let total = 0; const rolls=[];
    for(let i=0;i<n;i++){ const r = 1 + Math.floor(Math.random()*faces); rolls.push(r); total+=r; }
    total += mod;
    return { total, rolls, mod };
  }catch{ return null; }
}

function attachVtt(server, pathname='/vtt'){
  const wss = new WebSocketServer({ noServer: true });

  server.on('upgrade', (req, socket, head) => {
    try{
      const url = new URL(req.url, 'http://localhost');
      if (url.pathname !== pathname) return;
      wss.handleUpgrade(req, socket, head, (ws) => { wss.emit('connection', ws, req); });
    }catch{
      socket.destroy();
    }
  });

  wss.on('connection', (ws, req) => {
    const url = new URL(req.url, 'http://localhost');
    const roomId = url.searchParams.get('room') || 'lobby';
    const name = url.searchParams.get('name') || 'Anon';
    const role = url.searchParams.get('role') || 'player';
    const clientId = randomUUID();
    const room = getRoom(roomId);
    const client = { ws, name, role, id: clientId };
    room.clients.add(client);

    // Send current state
    ws.send(JSON.stringify({ t: 'state', state: room.state }));

    ws.on('message', (data) => {
      let msg = null; try{ msg = JSON.parse(String(data)); }catch{ return; }
      if (!msg || typeof msg !== 'object') return;

      if (msg.t === 'patch' && Array.isArray(msg.ops)) {
        applyPatch(room.state, msg.ops);
        broadcast(room, { t: 'patch', ops: msg.ops });
        return;
      }

      if (msg.t === 'chat' && typeof msg.text === 'string') {
        broadcast(room, { t:'chat', from: name, text: msg.text.slice(0, 500) });
        return;
      }

      if (msg.t === 'roll' && typeof msg.expr === 'string') {
        const r = rollExpr(msg.expr);
        broadcast(room, { t:'roll', from: name, expr: msg.expr, result: r });
        return;
      }

      if (msg.t === 'token' && msg.action === 'add') {
        const id = randomUUID();
        const token = { id, name: msg.name || 'Token', x: msg.x||100, y: msg.y||100, img: msg.img||'', owner: clientId, hp: msg.hp||null };
        room.state.tokens[id] = token;
        broadcast(room, { t:'patch', ops:[{ path: `tokens.${id}`, value: token }] });
        return;
      }
    });

    ws.on('close', () => {
      room.clients.delete(client);
    });
  });

  console.log('[vtt] WebSocket ready on /vtt');
}

module.exports = { attachVtt, ROOMS };

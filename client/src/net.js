export function connectWS({ room = 'default', onEvent, onOpen, onClose }) {
  const url = `ws://127.0.0.1:8081/?room=${encodeURIComponent(room)}`;
  const ws = new WebSocket(url);

  ws.addEventListener('open', () => {
    try { ws.send(JSON.stringify({ type: 'HELLO', name: 'tester' })); } catch {}
    onOpen?.();
    console.log('[WS] connected');
  });

  ws.addEventListener('message', (ev) => {
    try { const msg = JSON.parse(ev.data); onEvent?.(msg); }
    catch {}
  });

  ws.addEventListener('close', () => { onClose?.(); console.log('[WS] closed'); });
  ws.addEventListener('error', (e) => console.log('[WS] error', e));
  return ws;
}

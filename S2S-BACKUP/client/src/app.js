import * as PIXI from 'https://unpkg.com/pixi.js@7.4.0/dist/pixi.mjs';
import { playSpell } from './spellPlayer.js';
import {
  FIREBALL_DEF, ICE_LANCE_DEF, CHAIN_LIGHTNING_DEF, HEALING_WAVE_DEF, PRESETS
} from './spellPresets.js';
import { connectWS } from './net.js';

/** Setup PIXI **/
const canvas = document.getElementById('stage');
const app = new PIXI.Application({
  view: canvas,
  resizeTo: window,
  antialias: true,
  background: 0x0b0c10,
  powerPreference: 'high-performance',
});
window.__PIXI_APP__ = app;

const loader = PIXI.Assets;
await loader.load([
  './assets/particle_soft.png',
  './assets/orb_fire.png',
  './assets/orb_ice.png',
  './assets/orb_lightning.png',
  './assets/orb_heal.png'
]);

/** Spell selection **/
const SPELLS = [
  FIREBALL_DEF,         // 1
  ICE_LANCE_DEF,        // 2
  CHAIN_LIGHTNING_DEF,  // 3
  HEALING_WAVE_DEF      // 4
];
let current = 0;
const SPELL_INDEX = Object.fromEntries(SPELLS.map(s => [s.id, s]));

function currentSpell(){ return SPELLS[current]; }

/** HUD **/
const hud = document.getElementById('hud');
function updateHUD(status='offline'){
  hud.innerHTML = `
    <div><span class="dot"></span><b>Click</b> to cast <i>${currentSpell().name}</i>. (Keys: 1 Fire, 2 Ice, 3 Lightning, 4 Heal)</div>
    <div>Mode: <b>${status}</b> — Client render with <b>PixiJS</b>. Server only broadcasts events.</div>
  `;
}
updateHUD();

window.addEventListener('keydown', (e) => {
  if (e.key === '1') current = 0;
  if (e.key === '2') current = 1;
  if (e.key === '3') current = 2;
  if (e.key === '4') current = 3;
  updateHUD(ws?.readyState === 1 ? 'online' : 'offline');
});

/** Connect WS (fallback to offline) **/
let ws = null;
try {
  ws = connectWS({
    room: 'playtest-1',
    onEvent: (msg) => {
      if (msg?.type === 'SPELL_CAST') {
        const def = SPELL_INDEX[msg.spellId] || FIREBALL_DEF;
        playSpell(app, msg, def, PRESETS);
      }
    },
    onOpen: () => updateHUD('online'),
    onClose: () => updateHUD('offline')
  });
} catch (e) {
  console.warn('[WS] not connected, offline mode');
  updateHUD('offline');
}

/** Seed helper **/
function seed() { return Math.floor(Math.random()*1e9); }

/** On click: send over WS if connected, else play locally (offline mode) **/
window.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left, y = e.clientY - rect.top;
  const evt = {
    type: 'SPELL_CAST',
    spellId: currentSpell().id,
    origin: [64, app.renderer.height/2],
    target: [x, y],
    seed: seed(),
    timestamp: Date.now(),
    meta: { radius: 64 }
  };
  if (ws && ws.readyState === 1) {
    try { ws.send(JSON.stringify(evt)); } catch {}
  } else {
    // offline fallback
    playSpell(app, evt, currentSpell(), PRESETS);
  }
});

/** Idle glow / background **/
const bg = new PIXI.Graphics();
app.stage.addChild(bg);
app.ticker.add(() => {
  bg.clear();
  bg.beginFill(0xffffff, 0.01);
  bg.drawRect(0,0,app.renderer.width, app.renderer.height);
  bg.endFill();
});

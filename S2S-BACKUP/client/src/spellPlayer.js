import * as PIXI from 'https://unpkg.com/pixi.js@7.4.0/dist/pixi.mjs';

function tween(node, to, ms, ease='linear') {
  const from = { x: node.x, y: node.y, alpha: node.alpha };
  const t0 = performance.now();
  return new Promise(res => {
    function lerp(a,b,t){ return a+(b-a)*t; }
    function easeFn(t){ return ease==='quadOut' ? 1-(1-t)*(1-t) : (ease==='quadInOut'? (t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2) : t); }
    function step(now){
      const t = Math.min(1, (now - t0)/ms);
      const e = easeFn(t);
      if(to.x!==undefined) node.x = lerp(from.x, to.x, e);
      if(to.y!==undefined) node.y = lerp(from.y, to.y, e);
      if(to.alpha!==undefined) node.alpha = lerp(from.alpha, to.alpha, e);
      if(t<1) requestAnimationFrame(step); else res();
    }
    requestAnimationFrame(step);
  });
}

const pool = {
  sprites: [],
  get(tex){ return this.sprites.pop() || new PIXI.Sprite(tex); },
  put(s){ s.parent && s.parent.removeChild(s); this.sprites.push(s); }
};

function cameraShake(app, amp=6, dur=250){
  const t0 = performance.now();
  const base = { x: app.stage.x, y: app.stage.y };
  function step(now){
    const t = now - t0;
    if(t<dur){
      const k = (1 - t/dur);
      app.stage.x = base.x + (Math.random()*2-1)*amp*k;
      app.stage.y = base.y + (Math.random()*2-1)*amp*k;
      requestAnimationFrame(step);
    } else {
      app.stage.x = base.x; app.stage.y = base.y;
    }
  }
  requestAnimationFrame(step);
}

function hex(color){ return Number(color.replace('#','0x')); }

export function playSpell(app, evt, def, presets){
  for(const stage of def.pipeline){
    runStage(app, evt, stage, presets);
  }
}

function runStage(app, evt, stage, presets){
  switch(stage.fx){
    case 'emitter': return emitter(app, evt.origin, stage, presets);
    case 'projectile': return projectile(app, evt, stage, presets);
    case 'explosion': return explosion(app, evt.target, stage, presets);
    case 'emit': return emitDebris(app, evt.target, stage, presets);
    default: break;
  }
}

function emitter(app, pos, stage, presets){
  const p = presets[stage.preset] || {};
  const tex = PIXI.Texture.from(p.texture || './assets/particle_soft.png');
  const count = p.count || 24;
  for(let i=0;i<count;i++){
    const s = pool.get(tex);
    const a = Math.random()*Math.PI*2;
    const r = (p.radius||20) * Math.random();
    s.x = pos[0] + Math.cos(a)*r;
    s.y = pos[1] + Math.sin(a)*r;
    s.alpha = 0.6 + Math.random()*0.4;
    s.tint = p.tint ? hex(p.tint) : 0xffffff;
    s.anchor.set(0.5);
    const life = (stage.duration || 400) * (0.6 + Math.random()*0.8);
    app.stage.addChild(s);
    tween(s, { alpha: 0 }, life, 'linear').then(()=> pool.put(s));
  }
}

function projectile(app, evt, stage, presets){
  const p = presets[stage.model] || {};
  const tex = PIXI.Texture.from(p.texture || './assets/orb_fire.png');
  const s = pool.get(tex);
  s.anchor.set(0.5);
  s.x = evt.origin[0]; s.y = evt.origin[1];
  s.alpha = 1.0;
  app.stage.addChild(s);
  const dx = evt.target[0] - evt.origin[0];
  const dy = evt.target[1] - evt.origin[1];
  const dist = Math.hypot(dx,dy);
  const ms = dist / (stage.speed || 12) * 1000;
  tween(s, { x: evt.target[0], y: evt.target[1] }, ms, stage.ease || 'quadOut')
    .then(()=> { pool.put(s); explosion(app, evt.target, { preset: 'burst_fire', shake:{amp:6,dur:250}}, presets); });
}

function explosion(app, pos, stage, presets){
  const p = presets[stage.preset] || {};
  const tex = PIXI.Texture.from(p.texture || './assets/particle_soft.png');
  const count = p.count || 42;
  for(let i=0;i<count;i++){
    const s = pool.get(tex);
    s.anchor.set(0.5);
    s.x = pos[0]; s.y = pos[1];
    s.alpha = 1.0;
    s.scale.set(0.6 + Math.random()*0.8);
    s.tint = p.tint ? hex(p.tint) : 0xffaa55;
    app.stage.addChild(s);
    const a = Math.random()*Math.PI*2;
    const r = (p.radius||60) * (0.4 + Math.random()*0.7);
    const tx = pos[0] + Math.cos(a)*r;
    const ty = pos[1] + Math.sin(a)*r;
    const life = 400 + Math.random()*400;
    tween(s, { x: tx, y: ty, alpha: 0 }, life, 'linear').then(()=> pool.put(s));
  }
  cameraShake(app, stage.shake?.amp || 5, stage.shake?.dur || 250);
}

function emitDebris(app, pos, stage, presets){
  const p = presets[stage.preset] || {};
  const tex = PIXI.Texture.from(p.texture || './assets/particle_soft.png');
  const count = p.count || 20;
  for(let i=0;i<count;i++){
    const s = pool.get(tex);
    s.anchor.set(0.5);
    s.x = pos[0]; s.y = pos[1];
    s.alpha = 0.7;
    s.scale.set(0.3 + Math.random()*0.5);
    s.tint = p.tint ? hex(p.tint) : 0xffddaa;
    app.stage.addChild(s);
    const a = Math.random()*Math.PI*2;
    const r = (p.radius||40) * Math.random();
    const tx = pos[0] + Math.cos(a)*r;
    const ty = pos[1] + Math.sin(a)*r;
    const life = (stage.duration||800) * (0.6 + Math.random()*0.8);
    tween(s, { x: tx, y: ty, alpha: 0 }, life, 'linear').then(()=> pool.put(s));
  }
}

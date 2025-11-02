// Presets and spells
export const PRESETS = {
  // generic
  mote_base:   { texture: './assets/particle_soft.png', count: 18, radius: 22, tint: '#ffffff' },
  // fire
  mote_fire:   { texture: './assets/particle_soft.png', count: 18, radius: 24, tint: '#ff9b3a' },
  orb_fire:    { texture: './assets/orb_fire.png' },
  burst_fire:  { texture: './assets/particle_soft.png', count: 46, radius: 72, tint: '#ff7a2a' },
  embers:      { texture: './assets/particle_soft.png', count: 24, radius: 48, tint: '#ffcc66' },
  // ice
  mote_ice:    { texture: './assets/particle_soft.png', count: 18, radius: 24, tint: '#9ed6ff' },
  orb_ice:     { texture: './assets/orb_ice.png' },
  burst_ice:   { texture: './assets/particle_soft.png', count: 42, radius: 64, tint: '#c8ecff' },
  shards_ice:  { texture: './assets/particle_soft.png', count: 22, radius: 56, tint: '#b0e6ff' },
  // lightning
  mote_light:  { texture: './assets/particle_soft.png', count: 20, radius: 26, tint: '#c7d3ff' },
  orb_light:   { texture: './assets/orb_lightning.png' },
  burst_light: { texture: './assets/particle_soft.png', count: 38, radius: 68, tint: '#a6b8ff' },
  // heal
  mote_heal:   { texture: './assets/particle_soft.png', count: 20, radius: 26, tint: '#d7ffb0' },
  orb_heal:    { texture: './assets/orb_heal.png' },
  bloom_heal:  { texture: './assets/particle_soft.png', count: 40, radius: 80, tint: '#fff3b0' },
  leaves:      { texture: './assets/particle_soft.png', count: 24, radius: 54, tint: '#c8ffb8' }
};

export const FIREBALL_DEF = {
  id: 'fireball.v1',
  name: 'Fireball',
  pipeline: [
    { stage: 'spawn',  fx: 'emitter',   preset: 'mote_fire',   duration: 350 },
    { stage: 'travel', fx: 'projectile', model: 'orb_fire',     speed: 14.0, ease: 'quadOut' },
    { stage: 'impact', fx: 'explosion',  preset: 'burst_fire',  radius: 64, shake: { amp: 6, dur: 250 } },
    { stage: 'debris', fx: 'emit',       preset: 'embers',      duration: 900, fadeOut: 500 }
  ],
  style: { post: { bloom: true, heatHaze: true } }
};

export const ICE_LANCE_DEF = {
  id: 'ice_lance.v1',
  name: 'Ice Lance',
  pipeline: [
    { stage: 'spawn',  fx: 'emitter',    preset: 'mote_ice',   duration: 300 },
    { stage: 'travel', fx: 'projectile', model: 'orb_ice',     speed: 16.0, ease: 'quadOut' },
    { stage: 'impact', fx: 'explosion',  preset: 'burst_ice',  radius: 56 },
    { stage: 'debris', fx: 'emit',       preset: 'shards_ice', duration: 700 }
  ],
  style: { post: { bloom: true } }
};

export const CHAIN_LIGHTNING_DEF = {
  id: 'chain_lightning.v1',
  name: 'Chain Lightning',
  pipeline: [
    { stage: 'spawn',  fx: 'emitter',     preset: 'mote_light',  duration: 240 },
    { stage: 'travel', fx: 'projectile',  model: 'orb_light',    speed: 22.0, ease: 'quadOut' },
    { stage: 'impact', fx: 'explosion',   preset: 'burst_light', radius: 48, shake: { amp: 8, dur: 220 } }
  ],
  style: { post: { bloom: true } }
};

export const HEALING_WAVE_DEF = {
  id: 'healing_wave.v1',
  name: 'Healing Wave',
  pipeline: [
    { stage: 'spawn',  fx: 'emitter',    preset: 'mote_heal',  duration: 300 },
    { stage: 'travel', fx: 'projectile', model: 'orb_heal',    speed: 10.0, ease: 'quadOut' },
    { stage: 'impact', fx: 'explosion',  preset: 'bloom_heal', radius: 72 },
    { stage: 'debris', fx: 'emit',       preset: 'leaves',     duration: 1100 }
  ],
  style: { post: { bloom: true } }
};

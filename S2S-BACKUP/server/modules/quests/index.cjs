const path = require('path');

function avg(arr){ if(!arr?.length) return 1; const n = arr.reduce((s,x)=> s + (Number(x.level)||1), 0) / arr.length; return Math.max(1, Math.round(n)); }
function tierByLevel(lvl){ if(lvl<=4) return 1; if(lvl<=8) return 2; if(lvl<=12) return 3; if(lvl<=16) return 4; return 5; }
function pick(list){ return list[Math.floor(Math.random()*list.length)] }

function loadTheme(worldId){
  const map = { classic:'fantasy', galactic:'galactic', nightblood:'nightblood', moonborn:'moonborn', awakened:'awakened', veilbound:'veilbound', dreamshapers:'dreamshapers', vigilants:'vigilants' };
  const key = map[worldId] || 'fantasy';
  return require(path.join(__dirname, 'themes', key + '.cjs'));
}

function assemble({ world='classic', pcs=[], followers=0, season='any', types=[], description='' }){
  const theme = loadTheme(world);
  const avgLevel = avg(pcs);
  const tier = tierByLevel(avgLevel);
  const tone = pick(theme.tones || ['aventure']);
  const hook = pick(theme.hooks || ['Une rumeur étrange circule...']);
  const location = pick(theme.locations || ['Lieu indéfini']);
  const npc = pick(theme.npcs || [{name:'Inconnu', role:'contact', trait:'secret-eux'}]);
  const threatPool = (theme.threats && (theme.threats[String(tier)] || theme.threats['1'])) || ['Menace mineure'];
  const threat = pick(threatPool);
  const twist = pick(theme.twists || ['Quelque chose ne colle pas...']);
  const reward = pick(theme.rewards || ['Récompense modeste']);

  const titleTypes = (types||[]).slice(0,2).join(' / ') || 'Aventure';
  const title = `Quête (${theme.worldName}) — ${titleTypes} T${tier}`;

  const summary = [
    `Ambiance: ${tone}`,
    `${pcs.length} PJ (Niv ${avgLevel})${followers? ', ' + followers + ' PNJ alliés' : ''}`,
    season && season!=='any' ? `Saison: ${season}` : null,
    description ? `Pitch: ${description}` : null
  ].filter(Boolean).join(' · ');

  return {
    ok: true, title, summary,
    hooks: [hook, ...(theme.extraHooks||[])].slice(0,3),
    locations: [location, ...(theme.extraLocations||[])].slice(0,3),
    npcs: [npc, ...(theme.extraNpcs||[])].slice(0,3),
    challenges: [`Confronter: ${threat}`, ...(theme.extraChallenges||[])].slice(0,3),
    twists: [twist, ...(theme.extraTwists||[])].slice(0,3),
    rewards: [reward, ...(theme.extraRewards||[])].slice(0,3),
    meta: { world, tier, avgLevel, tone }
  };
}

if (require.main === module && process.argv.includes('--demo')){
  console.log(JSON.stringify(assemble({ world:'classic', pcs:[{level:3},{level:5}], types:['exploration','mystère']}), null, 2));
}

module.exports = { generateQuest: assemble };

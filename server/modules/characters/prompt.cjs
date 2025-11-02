function safe(v){ return (v ?? "").toString().trim(); }
function segment(title, value){
  const t = safe(value);
  return t ? `${title}: ${t}` : "";
}
function compressStats(stats = {}){
  const { level, str, dex, con, int, wis, cha } = stats;
  const parts = [];
  if (level) parts.push(`level ${level}`);
  const six = [str,dex,con,int,wis,cha].every(x => typeof x === "number");
  if (six) parts.push(`STR ${str} DEX ${dex} CON ${con} INT ${int} WIS ${wis} CHA ${cha}`);
  return parts.join(" · ");
}
function worldStyle(world){
  switch(world){
    case "classic": return "fantasy, detailed, painterly, soft rim light, medieval attire";
    case "galactic": return "space opera, cinematic, starfield bokeh, hard rim light, scifi outfit";
    case "nightblood": return "gothic horror, chiaroscuro, moody lighting, baroque details";
    case "moonborn": return "primal, moonlit, feral grace, nature textures";
    case "awakened": return "mystic modern, arcane glyphs, neon/paradox glows";
    case "veilbound": return "occult noir, fog, subtle grain, candlelight accents";
    case "dreamshapers": return "surreal, dreamlike, soft bloom, impossible geometry";
    case "vigilants": return "street-level hero, urban rain, gritty contrast";
    default: return "neutral, studio portrait";
  }
}
function buildPrompt(sheet = {}){
  const {
    world = "classic",
    name = "Unknown",
    concept, class: cls, origin,
    stats = {}, appearance = {}, equipment = {}, personality = {}
  } = sheet;
  const parts = [
    `full body or 3/4 portrait of ${name}`,
    segment("concept", concept), segment("class", cls), segment("origin", origin),
    segment("species", appearance.species), segment("gender", appearance.gender), segment("age", appearance.age),
    segment("build", appearance.build), segment("height", appearance.height),
    segment("hair", appearance.hair), segment("eyes", appearance.eyes), segment("skin", appearance.skin),
    segment("outfit", appearance.outfit), segment("palette", appearance.colors), segment("marks", appearance.notableMarks),
    segment("main weapon", equipment.weaponMain), segment("offhand", equipment.weaponOff),
    segment("armor", equipment.armor), segment("accessories", equipment.accessories),
    segment("pack", equipment.pack), segment("other", equipment.other),
    segment("personality", personality.traits), segment("ideals", personality.ideals),
    segment("bonds", personality.bonds), segment("flaws", personality.flaws),
    compressStats(stats), `style: ${worldStyle(world)}`,
    "composition centered, highly detailed, depth of field, sharp focus"
  ].filter(Boolean);
  const filtered = parts.map(p => p.replace(/^[a-z ]+: *$/i, "").trim()).filter(Boolean);
  return filtered.join(", ");
}
module.exports = { buildPrompt };

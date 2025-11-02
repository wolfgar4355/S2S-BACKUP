module.exports = function monsterSvg({ name, rarity, biome }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 120">
    <text x="20" y="30">name: ${name||''}</text>
    <text x="20" y="60">rarity: ${rarity||''}</text>
    <text x="20" y="90">biome: ${biome||''}</text>
  </svg>`;
};

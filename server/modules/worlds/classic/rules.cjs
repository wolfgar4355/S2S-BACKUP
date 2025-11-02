module.exports = {
  id: "classic",
  name: "Fantasy",
  grid: { size: 50 },
  dice: { presets: { atk: "1d20+5" } },
  bars: [{ key: "hp", label: "HP", color: "#e74c3c", maxFrom: (sheet)=> sheet?.stats?.hpMax ?? 10 }],
  tokenFromSheet(sheet) {
    return {
      name: sheet?.name || "PJ",
      img: sheet?.portraitUrl || "",
      bars: { hp: sheet?.stats?.hp ?? 10 },
      aura: "#2ecc71"
    };
  }
};

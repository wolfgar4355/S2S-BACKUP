export const metadata = {
  title: "Galactic Fight · Sheet2Scene",
  description: "Générateurs Space-Opéra : personnages, monstres, loot, cartes, quêtes.",
};
export default function GalacticHome() {
  return (
    <main style={{padding: 24, fontFamily: "system-ui"}}>
      <h1 style={{fontSize: 32, marginBottom: 8}}>🌌 Galactic Fight</h1>
      <p style={{opacity: 0.85, marginBottom: 24}}>
        Bienvenue dans le monde Space-Opéra : crée des héros, aliens, vaisseaux et quêtes interstellaires.
      </p>
      <div style={{display: "grid", gap: 16}}>
        <a href="/worlds/galactic/characters" style={cardStyle}>👤 Personnages / Aliens</a>
        <a href="/worlds/galactic/monsters"    style={cardStyle}>👾 Monstres / Drones</a>
        <a href="/worlds/galactic/weapons"     style={cardStyle}>🔫 Armes / Implants</a>
        <a href="/worlds/galactic/maps"        style={cardStyle}>🛰️ Cartes (vaisseaux, stations)</a>
        <a href="/worlds/galactic/quests"      style={cardStyle}>📜 Quêtes & missions</a>
      </div>
    </main>
  );
}
const cardStyle: React.CSSProperties = {
  display: "block",
  padding: 16,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.15)",
  background: "linear-gradient(180deg, rgba(102,51,153,0.2), rgba(0,0,0,0))",
  textDecoration: "none",
  color: "inherit",
  fontWeight: 600,
};

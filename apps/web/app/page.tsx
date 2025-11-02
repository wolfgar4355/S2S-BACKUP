import Link from "next/link";
export default function Home(){return(<main><h1>📜 Sheet2Scene</h1><p style={{opacity:.8}}>Choisis un univers pour créer ton personnage et générer des quêtes.</p><div style={{display:'flex',gap:12,flexWrap:'wrap'}}><Link className="card" href="/worlds">🌌 Voir les mondes</Link></div></main>)}

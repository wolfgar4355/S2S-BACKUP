import Link from "next/link";
import { WORLDS } from "../config/worlds";

export default function WorldsPage() {
  return (
    <main style={{padding: 24}}>
      <h1 style={{fontSize: 28, marginBottom: 12}}>🌍 Mondes Fantasy reliés</h1>
      <ul style={{display:"grid", gap:12, listStyle:"none", padding:0}}>
        {WORLDS.map(w => (
          <li key={w.id}>
            <Link href={`/worlds/${w.id}/new`} style={{textDecoration:"none", fontWeight:700, color:w.color}}>
              <span style={{marginRight:8}}>{w.emoji}</span>{w.name}
            </Link>
            <p style={{margin:"4px 0 0", opacity:0.8}}>{w.summary}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

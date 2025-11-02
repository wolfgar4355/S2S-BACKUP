"use client";
import { WORLDS } from "@/config/worlds";
import { useBookNav } from "@/hooks/useBookNav";
export default function WorldsList(){ const { goToWorld } = useBookNav(null); return (<main><h1>🌌 Mondes</h1><ul className="list">{WORLDS.map(w=>(<li key={w.id}><button className="card" onClick={()=>goToWorld(w.id)}><div style={{fontWeight:700,fontSize:18}}>{w.emoji} {w.name}</div><div style={{opacity:.8,marginTop:6}}>{w.summary}</div></button></li>))}</ul></main>); }

"use client";
import Link from "next/link";
import { WORLDS } from "@/config/worlds";
import { bookAudio } from "@/utils/bookSounds";
import { useEffect } from "react";
import { useBookNav } from "@/hooks/useBookNav";
export default function WorldPage({ params }:{ params:{ id:string }}){ const w=WORLDS.find(x=>x.id===params.id); const { goHome } = useBookNav(params.id); useEffect(()=>{ bookAudio.flip(); },[params.id]); if(!w) return <main><p>Monde introuvable.</p></main>; return (<main><h1>{w.emoji} {w.name}</h1><p style={{opacity:.8}}>{w.summary}</p><div style={{display:'flex',gap:12,flexWrap:'wrap'}}><Link className="card" href={`/worlds/${w.id}/new`}>+ Nouveau personnage</Link><Link className="card" href={`/worlds/${w.id}/quests`}>🗺️ Générer une quête</Link><button className="card" onClick={goHome}>⤺ Retour à la couverture</button></div></main>); }

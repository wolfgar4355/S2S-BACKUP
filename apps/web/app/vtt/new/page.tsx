"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { WORLDS_RULES } from "@/config/worldsRules";

export default function NewRoom(){
  const router = useRouter();
  const [world, setWorld] = useState<string>("classic");
  const [loading, setLoading] = useState(false);

  async function createRoom(){
    try{
      setLoading(true);
      const r = await fetch("/api/vtt/room", { method:"POST", headers:{ "content-type":"application/json" }, body: JSON.stringify({ worldId: world }) });
      const j = await r.json();
      if(j.ok){
        router.push(`/vtt/${j.id}?world=${world}`);
      }else{
        alert(j.error || "Erreur de création");
      }
    }finally{ setLoading(false); }
  }

  return (
    <main>
      <h1>Créer une table</h1>
      <div className="card" style={{display:"grid", gap:12, maxWidth:420}}>
        <label>
          Monde
          <select value={world} onChange={e=>setWorld(e.target.value)} style={{display:"block",width:"100%",padding:8,marginTop:6}}>
            {Object.values(WORLDS_RULES).map(w=> <option key={w.id} value={w.id}>{w.name}</option>)}
          </select>
        </label>
        <button onClick={createRoom} disabled={loading}>{loading? "Création..." : "Créer"}</button>
      </div>
    </main>
  );
}

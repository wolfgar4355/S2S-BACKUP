"use client";
import { useMemo, useState } from "react";
import { WORLDS } from "@/config/worlds";
import { COMMON_FIELDS, DEFAULT_STATS, CharacterSheet } from "@/config/character";

type FieldProps = { label:string; value?:string|number; onChange:(v:any)=>void; type?:string };
const Input = ({label,value,onChange,type="text"}:FieldProps)=>(
  <label style={{display:'grid',gap:6,marginBottom:10}}>
    <span style={{fontWeight:600}}>{label}</span>
    <input type={type} value={value as any || ""} onChange={e=>onChange(type==="number"? Number(e.target.value||0): e.target.value)} style={{padding:8,border:'1px solid #ddd',borderRadius:8}}/>
  </label>
);

export default function NewCharacter({ params }:{ params:{ id:string }}) {
  const world = useMemo(()=>WORLDS.find(w=>w.id===params.id),[params.id]);
  const [name,setName]=useState(""); const [concept,setConcept]=useState("");
  const [cls,setCls]=useState(""); const [origin,setOrigin]=useState("");
  const [stats,setStats]=useState<any>({...DEFAULT_STATS});
  const [appearance,setAppearance]=useState<any>({});
  const [equipment,setEquipment]=useState<any>({});
  const [personality,setPersonality]=useState<any>({});
  const [img,setImg]=useState<string|undefined>(); const [prompt,setPrompt]=useState<string>("");

  if(!world) return <main><p>Monde introuvable.</p></main>;

  function onNum(id:string, v:number){ setStats((s:any)=>({...s,[id]:v})); }
  function onApp(id:string, v:string){ setAppearance((a:any)=>({...a,[id]:v})); }
  function onEq(id:string, v:string){ setEquipment((a:any)=>({...a,[id]:v})); }
  function onPer(id:string, v:string){ setPersonality((a:any)=>({...a,[id]:v})); }

  async function saveBasic(e:React.FormEvent){
    e.preventDefault();
    await fetch("/api/characters",{method:"POST",headers:{"content-type":"application/json"},
      body: JSON.stringify({ world: world.id, data: { name, concept, class: cls, origin, stats, appearance, equipment, personality }})});
    alert("Fiche enregistrée (mock).");
  }

  async function renderFromSheet(){
    const sheet: CharacterSheet = { world: world.id, name, concept, class: cls, origin, stats, appearance, equipment, personality };
    const r = await fetch("/api/characters/render", { method:"POST", headers:{ "content-type":"application/json" }, body: JSON.stringify(sheet) });
    const j = await r.json();
    if(j.ok){ setImg(j.imageUrl); setPrompt(j.prompt); } else { alert(j.error || "Erreur"); }
  }

  return (
    <main>
      <h1>Fiche PJ — {world.emoji} {world.name}</h1>

      <form onSubmit={saveBasic} className="card">
        <h2>Identité</h2>
        <Input label="Nom" value={name} onChange={setName}/>
        <Input label="Concept" value={concept} onChange={setConcept}/>
        <Input label="Classe / Archétype" value={cls} onChange={setCls}/>
        <Input label="Origine" value={origin} onChange={setOrigin}/>
        <div style={{display:'flex',gap:8,marginTop:8}}>
          <button type="submit">Enregistrer</button>
          <button type="button" onClick={renderFromSheet}>🎨 Générer l'image depuis la fiche</button>
        </div>
      </form>

      <section className="card">
        <h2>Stats</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(7, minmax(90px,1fr))',gap:10}}>
          {COMMON_FIELDS.stats.map((f:any)=>(
            <Input key={f.id} label={f.label} type="number"
              value={(stats as any)[f.id] ?? ""}
              onChange={(v:number)=>onNum(f.id, v)}
            />
          ))}
        </div>
      </section>

      <section className="card">
        <h2>Apparence</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3, minmax(160px,1fr))',gap:10}}>
          {COMMON_FIELDS.appearance.map((f:any)=>(
            <Input key={f.id} label={f.label} value={appearance[f.id]||""} onChange={(v:any)=>onApp(f.id,v)} />
          ))}
        </div>
      </section>

      <section className="card">
        <h2>Équipement</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2, minmax(220px,1fr))',gap:10}}>
          {COMMON_FIELDS.equipment.map((f:any)=>(
            <Input key={f.id} label={f.label} value={equipment[f.id]||""} onChange={(v:any)=>onEq(f.id,v)} />
          ))}
        </div>
      </section>

      <section className="card">
        <h2>Personnalité</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2, minmax(220px,1fr))',gap:10}}>
          {COMMON_FIELDS.personality.map((f:any)=>(
            <Input key={f.id} label={f.label} value={personality[f.id]||""} onChange={(v:any)=>onPer(f.id,v)} />
          ))}
        </div>
      </section>

      {prompt && (
        <section className="card">
          <h2>Prompt d'image généré</h2>
          <pre style={{whiteSpace:"pre-wrap"}}>{prompt}</pre>
        </section>
      )}

      {img && <img src={img} alt="portrait" style={{maxWidth:'100%',borderRadius:12,border:"1px solid #ddd",marginTop:12}}/>}
    </main>
  );
}

"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Field, SelectOption } from "../../../config/worlds";
import { WORLDS, BASE_FIELDS } from "../../../config/worlds";

function Select({
  id, label, options, required, value, onChange,
}:{
  id:string; label:string; options:SelectOption[]; required?:boolean;
  value?:string; onChange:(v:string)=>void
}) {
  return (
    <label style={{display:"block", marginBottom:12}}>
      <div style={{fontWeight:600, marginBottom:4}}>
        {label}{required ? " *" : ""}
      </div>
      <select
        value={value||""}
        onChange={e=>onChange(e.target.value)}
        required={required}
        style={{width:"100%", padding:8, border:"1px solid #ddd", borderRadius:8}}
      >
        <option value="">— Choisir —</option>
        {options.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
      </select>
    </label>
  );
}

function Input({
  id, label, placeholder, required, value, onChange,
}:{
  id:string; label:string; placeholder?:string; required?:boolean;
  value?:string; onChange:(v:string)=>void
}) {
  return (
    <label style={{display:"block", marginBottom:12}}>
      <div style={{fontWeight:600, marginBottom:4}}>
        {label}{required ? " *" : ""}
      </div>
      <input
        value={value||""}
        onChange={e=>onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        style={{width:"100%", padding:8, border:"1px solid #ddd", borderRadius:8}}
      />
    </label>
  );
}

function Textarea({
  id, label, rows=4, value, onChange,
}:{ id:string; label:string; rows?:number; value?:string; onChange:(v:string)=>void }) {
  return (
    <label style={{display:"block", marginBottom:12}}>
      <div style={{fontWeight:600, marginBottom:4}}>{label}</div>
      <textarea
        rows={rows}
        value={value||""}
        onChange={e=>onChange(e.target.value)}
        style={{width:"100%", padding:8, border:"1px solid #ddd", borderRadius:8}}
      />
    </label>
  );
}

export default function NewCharacter({ params }: { params:{ id:string }}) {
  const world = useMemo(()=>WORLDS.find(w=>w.id===params.id),[params.id]);
  const router = useRouter();
  const [data, setData] = useState<Record<string,string>>({});
  const [status, setStatus] = useState<"idle"|"saving"|"done"|"error">("idle");
  const [preview, setPreview] = useState<string>("");

  if (!world) return <main style={{padding:24}}><p>Monde introuvable.</p></main>;

  // Champs = BASE_FIELDS + origine spécifique au monde
  const fields: Field[] = (BASE_FIELDS as Field[]).map(f=>{
    if (f.kind==="select" && f.id==="race")  return {...f, options: world.sheet.races};
    if (f.kind==="select" && f.id==="class") return {...f, options: world.sheet.classes};
    return f;
  }).concat([
    { kind:"select", id: world.sheet.origins.id, label: world.sheet.origins.label, options: world.sheet.origins.options }
  ]);

  const onChange = (id:string, v:string)=> setData(d=>({...d,[id]:v}));

  async function onSubmit(e:React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    try {
      const res = await fetch("/api/characters", {
        method:"POST",
        headers:{ "content-type":"application/json" },
        body: JSON.stringify({ world: world.id, data })
      });
      const json = await res.json();

      const style = world.template?.styleHints?.join(", ");
      const prompt = `${world.template?.basePrompt ?? world.name}, portrait de ${data.name} (${data.race} ${data.class}) — ${data.concept}. Style: ${style ?? "illustration fantasy"}.`;
      setPreview(prompt);

      if (!res.ok) throw new Error(json?.error || "Erreur");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main style={{padding:24, maxWidth:720, margin:"0 auto"}}>
      <button onClick={()=>router.back()} style={{marginBottom:12}}>← Retour</button>
      <h1 style={{fontSize:28, marginBottom:4}}>
        {world.emoji} Nouveau personnage — {world.name}
      </h1>
      <p style={{opacity:.8, marginBottom:16}}>{world.summary}</p>

      <form onSubmit={onSubmit}>
        {fields.map(f=>{
          if (f.kind==="text")
            return <Input key={f.id} {...f} value={data[f.id]} onChange={v=>onChange(f.id,v)} />;
        if (f.kind==="select")
            return <Select key={f.id} {...f} value={data[f.id]} onChange={v=>onChange(f.id,v)} />;
          return <Textarea key={f.id} {...f} value={data[f.id]} onChange={v=>onChange(f.id,v)} />;
        })}

        <button disabled={status==="saving"} style={{padding:"10px 16px", borderRadius:10, border:"1px solid #ddd"}}>
          {status==="saving" ? "Enregistrement…" : "Créer le personnage"}
        </button>
      </form>

      {preview && (
        <section style={{marginTop:24}}>
          <h3 style={{fontWeight:700}}>🎨 Prompt d’image (aperçu)</h3>
          <pre style={{whiteSpace:"pre-wrap", background:"#fafafa", padding:12, borderRadius:8, border:"1px solid #eee"}}>{preview}</pre>
          <p style={{opacity:.8}}>Quand l’API d’image sera branchée, on renverra ici l’URL.</p>
        </section>
      )}
    </main>
  );
}

import Link from "next/link";
import { WORLDS } from "../../config/worlds";

export default function WorldPage({ params }:{params:{id:string}}){
  const w = WORLDS.find(x=>x.id===params.id);
  if(!w) return <main style={{padding:24}}>Monde introuvable.</main>;
  return (
    <main style={{padding:24}}>
      <h1 style={{fontSize:28}}>{w.emoji} {w.name}</h1>
      <p style={{opacity:.8,margin:"8px 0 16px"}}>{w.summary}</p>
      <Link href={`/worlds/${w.id}/new`}
        style={{padding:"10px 14px",border:"1px solid #ddd",borderRadius:10,fontWeight:600}}>
        ➕ Nouveau personnage
      </Link>
    </main>
  );
}

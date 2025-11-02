import Link from 'next/link';

export default function WorldPage({ params }:{ params:{ slug:string } }){
  const world = decodeURIComponent(params.slug);
  return (
    <div style={{minHeight:'100vh', background:'#f6efe6', padding:'20px'}}>
      <Link href="/toc">← Back</Link>
      <h1 style={{marginTop:8}}>{world.toUpperCase()}</h1>
      <div style={{display:'grid', gap:12, gridTemplateColumns:'repeat(auto-fit, minmax(260px,1fr))', maxWidth:1100}}>
        {['World','Character/NPC','Monsters','Maps','Quests'].map(g=>(
          <a key={g} href={`/world/${world}/${g.toLowerCase().replace('/','-')}`} style={{display:'block', background:'#fff', border:'1px solid #e4d8c4', borderRadius:12, padding:16, textDecoration:'none', color:'#111'}}>{g} Generator</a>
        ))}
      </div>
    </div>
  );
}

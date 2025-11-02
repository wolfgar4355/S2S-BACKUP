export default function ToC(){
  const worlds = [
    {name:'Fantasy', color:'#b02a37'},
    {name:'Space Opera', color:'#1f5fff'},
    {name:'Modern', color:'#00a884'},
    {name:'Horror', color:'#6f42c1'}
  ];
  return (
    <div style={{minHeight:'100vh', background:'#f6efe6', padding:'40px 20px'}}>
      <h1 style={{textAlign:'center'}}>Grimoire — Table of Contents</h1>
      <p style={{textAlign:'center'}}>Select a world (ribbon bookmarks)</p>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:16, maxWidth:1100, margin:'20px auto'}}>
        {worlds.map(w=>(
          <a key={w.name} href={`/world/${encodeURIComponent(w.name.toLowerCase())}`} style={{display:'block', borderRadius:16, padding:20, background:'#fff', border:'1px solid #e4d8c4', textDecoration:'none', color:'#111', position:'relative'}}>
            <span style={{position:'absolute', top:-12, left:20, background:w.color, color:'#fff', padding:'4px 10px', borderRadius:6}}>Ribbon</span>
            <h3>{w.name}</h3>
            <ul>
              <li>World generator</li>
              <li>Character/NPC</li>
              <li>Monsters</li>
              <li>Maps</li>
              <li>Quests</li>
            </ul>
          </a>
        ))}
      </div>
    </div>
  )
}

'use client'
export default function TabsRibbons({tab, setTab}:{tab:string,setTab:(t:string)=>void}) {
  const tabs = ['identite','stats','sorts','inventaire','historique']
  return (
    <nav className="flex flex-wrap gap-2">
      {tabs.map(t=>(
        <button key={t}
          onClick={()=>setTab(t)}
          className={`px-3 py-1 rounded-md border text-sm ${tab===t?'bg-white/10 border-white/40':'border-white/20 hover:bg-white/5'}`}>
          {t[0].toUpperCase()+t.slice(1)}
        </button>
      ))}
    </nav>
  )
}

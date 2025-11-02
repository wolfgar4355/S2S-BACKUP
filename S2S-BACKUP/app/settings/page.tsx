'use client'
import { useEffect, useState } from 'react'

type Provider = 'mock'|'openai'|'runpod'
type Cfg = { provider?: Provider; eco?: boolean; openaiKey?: string; runpodUrl?: string; runpodKey?: string }

export default function SettingsPage(){
  const [cfg, setCfg] = useState<Cfg>({ provider:'mock', eco:false })
  useEffect(()=>{
    const u = localStorage.getItem('s2s_user')
    if (u) setCfg(JSON.parse(u))
  },[])
  const save = () => {
    localStorage.setItem('s2s_user', JSON.stringify(cfg || {}))
    alert('Clés BYO-Key enregistrées dans ce navigateur.')
  }
  return (
    <main className="min-h-screen p-6 text-white bg-[#0B0C10]">
      <div className="max-w-2xl mx-auto space-y-4">
        <h1 className="text-2xl font-semibold">Paramètres — BYO-Key</h1>
        <label className="block">Provider
          <select className="mt-1 bg-black/30 border border-white/20 rounded px-2 py-1"
            value={cfg.provider||'mock'} onChange={e=>setCfg({...cfg, provider: e.target.value as Provider})}>
            <option value="mock">mock</option>
            <option value="openai">openai</option>
            <option value="runpod">runpod</option>
          </select>
        </label>
        <label className="block">
          <input type="checkbox" className="mr-2" checked={!!cfg.eco} onChange={e=>setCfg({...cfg, eco: e.target.checked})} />
          Mode Éco
        </label>
        <div className="grid md:grid-cols-2 gap-3">
          <label className="block">OpenAI API Key
            <input className="mt-1 w-full bg-black/30 border border-white/20 rounded px-2 py-1" placeholder="sk-..." 
              value={cfg.openaiKey||''} onChange={e=>setCfg({...cfg, openaiKey:e.target.value})}/>
          </label>
          <label className="block">RunPod Endpoint URL
            <input className="mt-1 w-full bg-black/30 border border-white/20 rounded px-2 py-1" placeholder="https://api.runpod.ai/v2/ENDPOINT/runsync" 
              value={cfg.runpodUrl||''} onChange={e=>setCfg({...cfg, runpodUrl:e.target.value})}/>
          </label>
          <label className="block">RunPod API Key
            <input className="mt-1 w-full bg-black/30 border border-white/20 rounded px-2 py-1" placeholder="runpod_xxx" 
              value={cfg.runpodKey||''} onChange={e=>setCfg({...cfg, runpodKey:e.target.value})}/>
          </label>
        </div>
        <button onClick={save} className="rounded border border-white/30 px-3 py-1 hover:bg-white/10">Enregistrer (BYO‑Key)</button>
        <p className="text-sm text-white/70">Les clés sont stockées en local dans ce navigateur (localStorage).</p>
      </div>
    </main>
  )
}

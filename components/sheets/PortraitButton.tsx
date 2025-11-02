'use client'
import { useState } from 'react'

export default function PortraitButton({characterId}:{characterId?:string}){
  const [busy, setBusy] = useState(false)
  const run = async () => {
    setBusy(true)
    try{
      const adminCfg = JSON.parse(localStorage.getItem('s2s_admin') || '{}')
      const userCfg  = JSON.parse(localStorage.getItem('s2s_user')  || '{}')
      const cfg = { ...adminCfg, ...userCfg }
      const headers: Record<string,string> = { 'Content-Type':'application/json' }
      if (cfg.provider) headers['x-s2s-provider'] = String(cfg.provider)
      if (cfg.eco)      headers['x-s2s-mode'] = 'eco'
      if (cfg.openaiKey) headers['x-s2s-openai-key'] = String(cfg.openaiKey)
      if (cfg.runpodUrl) headers['x-s2s-runpod-url'] = String(cfg.runpodUrl)
      if (cfg.runpodKey) headers['x-s2s-runpod-key'] = String(cfg.runpodKey)

      const res = await fetch('/api/portrait', { method:'POST', headers, body: JSON.stringify({ characterId }) })
      const j = await res.json()
      if (!res.ok || !j?.url) throw new Error(j?.error || 'Échec génération')
      alert('Portrait généré !')
    }catch(e:any){ alert(e.message || 'Erreur') }
    finally{ setBusy(false) }
  }
  return <button className="rounded border px-3 py-1 text-sm" onClick={run} disabled={busy}>
    {busy?'Génération…':'Générer portrait IA'}
  </button>
}

"use client";

import { useMemo, useState } from "react";
import { WORLDS } from "@/config/worlds";
import { useBookNav } from "@/hooks/useBookNav";

type PCInput = { cls: string; level: number };
const QUEST_TYPES = ["horreur", "suspense", "investigation", "exploration", "guerre", "intrigue", "survie", "mythes"];
const SEASONS = ["printemps", "été", "automne", "hiver", "any"];

export default function WorldQuests({ params }: { params: { id: string } }) {
  const world = useMemo(() => WORLDS.find(w => w.id === params.id), [params.id]);
  const { goHome } = useBookNav(params.id);

  const [pcs, setPcs] = useState<PCInput[]>([{ cls: "", level: 1 }]);
  const [followers, setFollowers] = useState<number>(0);
  const [season, setSeason] = useState<string>("any");
  const [types, setTypes] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  if (!world) return <main><p>Monde introuvable.</p></main>;

  const avgLevel = Math.max(1, Math.round(pcs.reduce((s, p) => s + (Number(p.level) || 1), 0) / Math.max(1, pcs.length)));

  function updatePC(i: number, patch: Partial<PCInput>) {
    setPcs(prev => prev.map((p, idx) => (idx === i ? { ...p, ...patch } : p)));
  }
  function addPC() { setPcs(prev => [...prev, { cls: "", level: 1 }]); }
  function delPC(i: number) { setPcs(prev => prev.filter((_, idx) => idx !== i)); }

  function toggleType(t: string) {
    setTypes(prev => (prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]));
  }

  async function generateQuest() {
    setLoading(true);
    try {
      const res = await fetch("/api/quests/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ world: world.id, pcs, followers, season, types, description, avgLevel }),
      });
      const j = await res.json();
      setResult(j);
    } catch (e: any) {
      alert(e?.message || "Erreur réseau");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>🗺️ Générateur de quêtes — {world.emoji} {world.name}</h1>
      <p style={{ opacity: .8, marginTop: -6 }}>Champs universels (applicables à tous les mondes).</p>

      <section className="card">
        <h2>🎭 Personnages joueurs</h2>
        {pcs.map((pc, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 120px auto", gap: 8, alignItems: "center", marginBottom: 8 }}>
            <input placeholder="Classe (ex: Guerrier, Mage…)" value={pc.cls} onChange={(e) => updatePC(i, { cls: e.target.value })} />
            <input type="number" min={1} max={20} value={pc.level} onChange={(e) => updatePC(i, { level: Number(e.target.value) || 1 })} />
            <button type="button" onClick={() => delPC(i)} disabled={pcs.length <= 1}>Supprimer</button>
          </div>
        ))}
        <div style={{ display: "flex", gap: 8 }}>
          <button type="button" onClick={addPC}>+ Ajouter un PJ</button>
          <div style={{ opacity: .7, paddingLeft: 8 }}>Niveau moyen estimé: <strong>{avgLevel}</strong></div>
        </div>
      </section>

      <section className="card">
        <h2>🧭 Paramètres</h2>
        <div style={{ display: "grid", gap: 8 }}>
          <label>PNJ alliés qui suivent le groupe
            <input type="number" min={0} value={followers} onChange={(e) => setFollowers(Number(e.target.value) || 0)} />
          </label>
          <label>Saison
            <select value={season} onChange={(e) => setSeason(e.target.value)}>
              {SEASONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
          <div>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>Type(s) de quête</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {QUEST_TYPES.map(t => (
                <label key={t} style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
                  <input type="checkbox" checked={types.includes(t)} onChange={() => toggleType(t)} /> {t}
                </label>
              ))}
            </div>
          </div>
          <label>Description / pitch perso
            <textarea rows={4} placeholder="Contexte, ambiance, contraintes ou idées du MJ…" value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>
        </div>
      </section>

      <div style={{ display: "flex", gap: 8 }}>
        <button type="button" onClick={generateQuest} disabled={loading}>{loading ? "Génération…" : "⚡ Générer la quête"}</button>
        <button type="button" className="card" onClick={goHome}>⤺ Retour à la couverture</button>
      </div>

      {result?.ok && (
        <section className="card" style={{ marginTop: 14 }}>
          <h2>📜 {result.title}</h2>
          <p style={{ opacity: .85 }}>{result.summary}</p>
          {result.hooks?.length ? (<>
            <h3>Accroches</h3>
            <ul>{result.hooks.map((h: string, i: number) => <li key={i}>{h}</li>)}</ul>
          </>) : null}
          {result.locations?.length ? (<>
            <h3>Lieux</h3>
            <ul>{result.locations.map((h: string, i: number) => <li key={i}>{h}</li>)}</ul>
          </>) : null}
          {result.npcs?.length ? (<>
            <h3>PNJ</h3>
            <ul>{result.npcs.map((n: any, i: number) => <li key={i}><strong>{n.name}</strong> — {n.role}, {n.trait}</li>)}</ul>
          </>) : null}
          {result.challenges?.length ? (<>
            <h3>Défis</h3>
            <ul>{result.challenges.map((c: string, i: number) => <li key={i}>{c}</li>)}</ul>
          </>) : null}
          {result.twists?.length ? (<>
            <h3>Rebondissements</h3>
            <ul>{result.twists.map((c: string, i: number) => <li key={i}>{c}</li>)}</ul>
          </>) : null}
          {result.rewards?.length ? (<>
            <h3>Récompenses</h3>
            <ul>{result.rewards.map((c: string, i: number) => <li key={i}>{c}</li>)}</ul>
          </>) : null}
        </section>
      )}
    </main>
  );
}

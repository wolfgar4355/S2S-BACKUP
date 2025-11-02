"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useVtt } from "@/hooks/useVtt";

function useName(){
  const [name, setName] = useState<string>("");
  useEffect(()=>{ const n = localStorage.getItem("playerName") || `Joueur-${Math.floor(Math.random()*1000)}`; setName(n); },[]);
  useEffect(()=>{ if(name) localStorage.setItem("playerName", name); },[name]);
  return { name, setName };
}

type Camera = { x:number; y:number; scale:number };

export default function VttRoom({ params }:{ params:{ room:string } }){
  const { name, setName } = useName();
  const { state, messages, patch, chat, roll, addToken } = useVtt(params.room, name || "Anon", "gm");
  const canvasRef = useRef<HTMLCanvasElement|null>(null);
  const [dragId, setDragId] = useState<string|null>(null);
  const [snap, setSnap] = useState<boolean>(true);
  const [cam, setCam] = useState<Camera>({ x: 0, y: 0, scale: 1 });
  const [panning, setPanning] = useState<boolean>(false);
  const panStart = useRef<{x:number;y:number;cx:number;cy:number}|null>(null);

  const gridSize = state?.scene.grid?.size ?? 50;

  // Render
  useEffect(()=>{
    const c = canvasRef.current; if(!c || !state) return;
    const ctx = c.getContext("2d")!;
    const DPR = window.devicePixelRatio || 1;
    const W = c.clientWidth * DPR, H = c.clientHeight * DPR;
    c.width = W; c.height = H;
    ctx.clearRect(0,0,W,H);

    // bg
    ctx.fillStyle = "#1b1f2a";
    ctx.fillRect(0,0,W,H);

    // camera
    ctx.save();
    ctx.translate(cam.x * DPR, cam.y * DPR);
    ctx.scale(cam.scale, cam.scale);

    // grid
    if (state.scene.grid?.visible) {
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 1;
      const step = gridSize;
      const maxX = Math.ceil((W / DPR - cam.x) / cam.scale);
      const maxY = Math.ceil((H / DPR - cam.y) / cam.scale);
      for (let x=0; x<maxX; x+=step) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,maxY); ctx.stroke(); }
      for (let y=0; y<maxY; y+=step) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(maxX,y); ctx.stroke(); }
    }

    // tokens
    for (const id in state.tokens) {
      const t = state.tokens[id];
      const x = t.x, y = t.y;
      // token circle
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI*2);
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.fill();
      ctx.strokeStyle = "rgba(0,0,0,0.4)";
      ctx.lineWidth = 2 / cam.scale;
      ctx.stroke();
      // label
      ctx.fillStyle = "#111";
      ctx.font = `${12 / cam.scale}px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(t.name || id, x, y + (38 / cam.scale));
    }

    ctx.restore();
  }, [state, cam, gridSize]);

  // Coordinate transforms
  function screenToWorld(c: HTMLCanvasElement, sx:number, sy:number){
    const rect = c.getBoundingClientRect();
    const x = (sx - rect.left) - cam.x;
    const y = (sy - rect.top) - cam.y;
    const w = x / cam.scale;
    const h = y / cam.scale;
    return { x: w, y: h };
  }

  // Mouse handlers (drag tokens + pan)
  useEffect(()=>{
    const c = canvasRef.current; if(!c) return;

    const onDown = (e:MouseEvent)=>{
      if (!state) return;
      if (e.button === 1 || (e.button === 0 && e.altKey)) {
        // start panning
        setPanning(true);
        panStart.current = { x: e.clientX, y: e.clientY, cx: cam.x, cy: cam.y };
        return;
      }
      const pt = screenToWorld(c, e.clientX, e.clientY);
      let found: string | null = null;
      for (const id in state.tokens) {
        const t = state.tokens[id];
        const dx = t.x - pt.x, dy = t.y - pt.y;
        if (Math.hypot(dx,dy) <= 24) { found = id; break; }
      }
      setDragId(found);
    };

    const onMove = (e:MouseEvent)=>{
      if (panning && panStart.current) {
        const dx = e.clientX - panStart.current.x;
        const dy = e.clientY - panStart.current.y;
        setCam(prev => ({ ...prev, x: panStart.current!.cx + dx, y: panStart.current!.cy + dy }));
        return;
      }
      if (!dragId) return;
      const pt = screenToWorld(c, e.clientX, e.clientY);
      let x = Math.round(pt.x), y = Math.round(pt.y);
      if (snap) {
        const s = gridSize;
        x = Math.round(x / s) * s;
        y = Math.round(y / s) * s;
      }
      patch([{ path: `tokens.${dragId}.x`, value: x }, { path: `tokens.${dragId}.y`, value: y }]);
    };

    const onUp = ()=> { setDragId(null); setPanning(false); panStart.current = null; };

    const onWheel = (e:WheelEvent)=>{
      e.preventDefault();
      const delta = -e.deltaY;
      const factor = Math.exp(delta * 0.0015);
      const rect = c.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      // zoom around mouse
      setCam(prev => {
        const nx = (mx - prev.x) / prev.scale;
        const ny = (my - prev.y) / prev.scale;
        const ns = Math.min(3, Math.max(0.3, prev.scale * factor));
        const nx2 = (mx - nx * ns);
        const ny2 = (my - ny * ns);
        return { x: nx2, y: ny2, scale: ns };
      });
    };

    c.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove, { passive: false });
    window.addEventListener("mouseup", onUp);
    c.addEventListener("wheel", onWheel, { passive: false });

    return ()=>{ 
      c.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      c.removeEventListener("wheel", onWheel);
    };
  }, [state, dragId, snap, gridSize, cam, panning, patch]);

  // Chat UI
  const [chatInput, setChatInput] = useState("");
  function sendChat(){
    const text = chatInput.trim();
    if(!text) return;
    chat(text);
    setChatInput("");
  }

  return (
    <main>
      <h1>VTT — Salle {params.room}</h1>

      <div className="card" style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
        <label>Nom&nbsp;<input value={name} onChange={(e)=>setName(e.target.value)} /></label>
        <label style={{display:"inline-flex",alignItems:"center",gap:6}}>
          <input type="checkbox" checked={snap} onChange={(e)=>setSnap(e.target.checked)} /> Snap to grid
        </label>
        <button onClick={()=>addToken({ name: "PJ", x: 120, y: 120 })}>+ Token PJ</button>
        <button onClick={()=>addToken({ name: "PNJ", x: 200, y: 200 })}>+ Token PNJ</button>
        <button onClick={()=>roll("1d20+5")}>/roll 1d20+5</button>
      </div>

      <div style={{display:"grid", gridTemplateColumns:"1fr 340px", gap:10, alignItems:"stretch"}}>
        <div className="card" style={{height: "70vh", overflow: "hidden"}}>
          <canvas ref={canvasRef} style={{width:"100%",height:"100%", display:"block", cursor: panning ? "grabbing" : "default"}} />
          <div style={{position:"absolute", right:20, top:20, background:"rgba(0,0,0,.55)", color:"#fff", padding:"6px 10px", borderRadius:8}}>
            Zoom: {(cam.scale*100|0)}%
          </div>
        </div>

        <div className="card" style={{display:"grid", gridTemplateRows:"1fr auto", height:"70vh"}}>
          <div style={{overflow:"auto", paddingRight:6}}>
            {messages.map((m, i)=>(
              <div key={i} style={{marginBottom:8}}>
                {m.t === "chat" && (<div><strong>{m.from}</strong>: {m.text}</div>)}
                {m.t === "roll" && (
                  <div>
                    🎲 <strong>{m.from}</strong> jette <em>{m.expr}</em> → <strong>{m.result?.total ?? "?"}</strong>
                    {m.result?.rolls ? <span style={{opacity:.7}}> ({m.result.rolls.join(", ")}{m.result.mod? (m.result.mod>0? ` + ${m.result.mod}` : ` ${m.result.mod}`) : ""})</span> : null}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{display:"flex", gap:6}}>
            <input value={chatInput} onChange={(e)=>setChatInput(e.target.value)} placeholder="Message ou /roll 2d6+1" style={{flex:1}} 
                   onKeyDown={(e)=>{ if(e.key==='Enter'){ if(chatInput.trim().startsWith('/roll')){ roll(chatInput.trim().slice(1)); setChatInput(''); } else { sendChat(); } } }} />
            <button onClick={()=>{ if(chatInput.trim().startsWith('/roll')){ roll(chatInput.trim().slice(1)); setChatInput(''); } else { sendChat(); } }}>Envoyer</button>
          </div>
        </div>
      </div>
    </main>
  );
}
